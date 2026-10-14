<script setup lang="ts">
// Произношение: кнопка аудио, чтение по морам с линией высокого тона и засечкой падения,
// номер ударения в кружке (пунктир с «?» — ударение не размечено).
const props = defineProps<{
  items: Pronunciation[]
}>()

const { getAudioUrl } = useJpnApi()

// если хоть у одного чтения есть аудио, строки без него получают пустое место под кнопку — колонки выровнены
const hasAudio = computed(() => props.items.some(item => item.audio))
// подсказка про редукцию и носовые — только если они встречаются в чтениях
const marks = computed(() => pronunciationMarks(props.items))

let audio: HTMLAudioElement | null = null
const playing = ref<number | null>(null)

function play(index: number) {
  const item = props.items[index]
  if (!item?.audio)
    return
  audio?.pause()
  audio = new Audio(getAudioUrl(item.audio).toString())
  playing.value = index
  audio.addEventListener('ended', () => {
    playing.value = null
  })
  audio.play().catch(() => {
    playing.value = null
  })
}

onBeforeUnmount(() => audio?.pause())

// слово переносится только по «・»: части не рвутся, а перенесённые строки сдвинуты вправо
function segments(item: Pronunciation) {
  const result: { mora: PitchMora, split: boolean }[][] = [[]]
  for (const mora of item.mora) {
    result.at(-1)!.push({ mora, split: mora.split })
    if (mora.split)
      result.push([])
  }
  return result.filter(part => part.length)
}

function describe(item: Pronunciation) {
  const parts = [item.reading, item.accent === null ? 'ударение не размечено' : `ударение ${item.accent}, ${item.type}`]
  for (const mora of item.mora) {
    if (mora.silent)
      parts.push(`редукция ${mora.source ?? mora.text}`)
    if (mora.nasal)
      parts.push(`носовое ${mora.source ?? mora.text}`)
  }
  return parts.join(', ')
}

function moraTitle(mora: PitchMora) {
  if (mora.long)
    return `долгий гласный (${mora.source})`
  if (mora.nasal)
    return 'носовое [ŋ]'
  if (mora.silent)
    return 'гласный не произносится'
  return undefined
}

// кружок вокруг моры — редукция; маленький кружок справа сверху — носовое (как ゜)
const silentMark = 'text-muted before:pointer-events-none before:absolute before:top-[calc(50%+2px)] before:left-1/2 before:size-[1.2em] before:-translate-1/2 before:rounded-full before:border-[1.5px] before:border-dotted before:border-current before:content-[\'\']'
const nasalMark = 'before:pointer-events-none before:absolute before:top-[3px] before:-right-px before:size-[.3em] before:rounded-full before:border-[1.5px] before:border-current before:content-[\'\']'

function badgeTitle(item: Pronunciation) {
  return item.accent === null
    ? 'Ударение не размечено'
    : `Ударение ${item.accent} — ${item.type}`
}
</script>

<template>
  <div>
    <ul class="m-0 list-none p-0">
      <li v-for="(item, i) in items" :key="i" class="flex items-center gap-2.5 py-[5px]">
        <button
          v-if="item.audio"
          type="button"
          class="flex size-[34px] shrink-0 cursor-pointer items-center justify-center rounded-ctl border border-line bg-surf text-strong transition-colors hover:border-acc hover:bg-acc hover:text-onacc focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong"
          :aria-label="`Прослушать ${item.reading}`"
          :title="`Прослушать ${item.reading}`"
          @click="play(i)"
        >
          <Icon :name="playing === i ? 'tabler:volume' : 'tabler:volume-2'" size="18px" />
        </button>
        <span v-else-if="hasAudio" class="size-[34px] shrink-0" aria-hidden="true" />

        <span lang="ja" class="flex min-w-0 flex-wrap items-end pl-4 font-jm text-[19px] leading-none" :aria-label="describe(item)" role="img">
          <span v-for="(part, p) in segments(item)" :key="p" class="inline-flex items-end whitespace-nowrap" :class="p === 0 && '-ml-4'">
            <template v-for="({ mora, split }, m) in part" :key="m">
              <span
                aria-hidden="true"
                class="relative inline-block border-t-2 px-px pt-[5px] pb-0.5"
                :title="moraTitle(mora)"
                :class="[
                  mora.high ? 'border-strong' : 'border-transparent',
                  mora.drop && 'after:absolute after:-top-0.5 after:-right-px after:h-2.5 after:border-r-2 after:border-strong after:content-[\'\']',
                  mora.silent && silentMark,
                  mora.nasal && nasalMark,
                ]"
              >{{ mora.text }}</span>
              <span v-if="split" aria-hidden="true" class="inline-block pt-[5px] pb-0.5 text-line">・</span>
            </template>
          </span>
        </span>

        <span
          aria-hidden="true"
          :title="badgeTitle(item)"
          class="inline-flex h-5 min-w-5 shrink-0 translate-y-0.5 cursor-help items-center justify-center rounded-full border-[1.5px] px-[5px] text-[11.5px] leading-none font-extrabold"
          :class="item.accent === null ? 'border-dashed border-muted text-muted' : 'border-strong text-strong'"
        >{{ item.accent ?? '?' }}</span>
      </li>
    </ul>

    <p v-if="marks.silent || marks.nasal" class="m-0 mt-1.5 flex flex-wrap gap-x-[18px] gap-y-1 text-[12.5px] text-muted">
      <span v-if="marks.silent" class="inline-flex items-center gap-1.5">
        <span lang="ja" class="relative inline-block px-px py-0.5 font-jm text-sm leading-none" :class="silentMark" aria-hidden="true">ひ</span>
        гласный не произносится (редукция)
      </span>
      <span v-if="marks.nasal" class="inline-flex items-center gap-1.5">
        <span lang="ja" class="relative inline-block px-px py-0.5 font-jm text-sm leading-none before:top-0!" :class="nasalMark" aria-hidden="true">か</span>
        носовое [ŋ] (бидакуон)
      </span>
    </p>
  </div>
</template>
