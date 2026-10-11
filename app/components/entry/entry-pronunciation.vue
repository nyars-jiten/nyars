<script setup lang="ts">
// Произношение: кнопка аудио, чтение по морам с линией высокого тона и засечкой падения,
// номер ударения в кружке (пунктир с «?» — ударение не размечено).
const props = defineProps<{
  items: Pronunciation[]
}>()

const { getAudioUrl } = useJpnApi()

// если хоть у одного чтения есть аудио, строки без него получают пустое место под кнопку — колонки выровнены
const hasAudio = computed(() => props.items.some(item => item.audio))

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

function describe(item: Pronunciation) {
  return item.accent === null
    ? `${item.reading}, ударение не размечено`
    : `${item.reading}, ударение ${item.accent}, ${item.type}`
}

function badgeTitle(item: Pronunciation) {
  return item.accent === null
    ? 'Ударение не размечено'
    : `Ударение ${item.accent} — ${item.type}`
}
</script>

<template>
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

      <span lang="ja" class="flex min-w-0 flex-wrap items-end font-jm text-[19px] leading-none" :aria-label="describe(item)" role="img">
        <template v-for="(mora, m) in item.mora" :key="m">
          <span
            aria-hidden="true"
            class="relative inline-block border-t-2 px-px pt-[5px] pb-0.5"
            :class="[
              mora.high ? 'border-strong' : 'border-transparent',
              mora.drop && 'after:absolute after:-top-0.5 after:-right-px after:h-2.5 after:border-r-2 after:border-strong after:content-[\'\']',
              mora.silent && 'text-muted',
              mora.nasal && 'underline decoration-dotted underline-offset-4',
            ]"
          >{{ mora.text }}</span>
          <span v-if="mora.split" aria-hidden="true" class="inline-block pt-[5px] pb-0.5 text-line">・</span>
        </template>
      </span>

      <span
        aria-hidden="true"
        :title="badgeTitle(item)"
        class="inline-flex h-5 min-w-5 shrink-0 cursor-help items-center justify-center rounded-full border-[1.5px] px-[5px] text-[11.5px] leading-none font-extrabold"
        :class="item.accent === null ? 'border-dashed border-muted text-muted' : 'border-strong text-strong'"
      >{{ item.accent ?? '?' }}</span>
    </li>
  </ul>
</template>
