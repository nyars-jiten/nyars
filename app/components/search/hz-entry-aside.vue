<script setup lang="ts">
const props = defineProps<{
  entry: EntryJp
  showLemmas?: boolean
}>()

const emit = defineEmits<{
  copy: []
  switchFurigana: []
  toggleLemmas: []
}>()

const { t } = useI18n()
const { getAudioUrl } = useJpnApi()
const config = useRuntimeConfig()

const pitchRows = computed(() => {
  const rows: { reading: string, pitch: Pitch }[] = []
  for (const word of props.entry.words) {
    for (const reading of word.readings) {
      const label = reading.transcription?.kana || reading.value
      for (const pitch of reading.pitch) {
        rows.push({ reading: label, pitch })
      }
    }
  }
  return rows
})

const entryTags = computed(() => {
  return props.entry.tags
    .map(tag => tag.rusShort || tag.rus || tag.engShort)
    .filter(Boolean)
    .slice(0, 8)
})

const statusLabel = computed(() => {
  const s = props.entry.status
  if (s.isDeleted)
    return t('pages.jpnEntry.entryWasDeleted')
  if (s.isUnconfirmed)
    return t('pages.search.status.isUnconfirmed')
  if (s.isUnreviewed)
    return t('pages.search.status.isUnreviewed')
  if (s.isArchaic)
    return t('pages.search.status.isArchaic')
  if (s.isDialect)
    return t('pages.search.status.isDialect')
  if (s.isProper)
    return t('pages.search.status.isProper')
  return 'Проверена'
})

const statusKind = computed(() => {
  const s = props.entry.status
  if (s.isUnconfirmed || s.isUnreviewed || s.isDeleted)
    return 'sec' as const
  return '' as const
})

function playAudio(audio: string) {
  const audioElement = new Audio(getAudioUrl(audio).toString())
  audioElement.play()
}

const editLink = computed(() => ({
  name: 'dict-jpn-wid-editor' as const,
  params: { wid: props.entry.wid },
}))

const reportUrl = computed(() => config.public.discordUrl || '#')
</script>

<template>
  <aside
    id="hz-entry-meta"
    class="w-full max-w-[310px] flex-[1_1_280px] sticky top-4 self-start rounded-2xl bg-surf px-5.5 py-5"
    aria-label="Сведения о статье"
  >
    <div v-if="pitchRows.length" class="border-b border-line pb-3.5">
      <p class="hz-cap">
        Произношение
      </p>
      <div class="flex flex-col gap-2">
        <div
          v-for="(row, i) in pitchRows"
          :key="i"
          class="flex items-center gap-2.5"
        >
          <button
            v-if="row.pitch.audio.length > 0"
            type="button"
            class="flex cursor-pointer items-center justify-start rounded-md text-xl transition-colors hover:text-violet-300/50"
            :aria-label="`Прослушать ${row.reading}`"
            @click="playAudio(row.pitch.audio)"
          >
            <Icon name="ic:baseline-volume-up" />
          </button>

          <div class="min-w-0">
            <span class="inline-flex flex-wrap items-center gap-2">
              <span>
                <span
                  v-for="(accent, ai) in row.pitch.diagram"
                  :key="ai"
                  class="border-violet-300/50"
                  :class="{
                    'border-b-2 border-t-2 border-t-transparent': accent.s === 0 || accent.s === 2,
                    'border-t-2 border-b-2 border-b-transparent': accent.s === 1 || accent.s === 3,
                    'border-r-2': accent.s === 2 || accent.s === 3,
                    'text-red-400/80': accent.sl,
                    'underline decoration-wavy decoration-red-400/80': accent.n,
                    'after:content-[\'・\'] after:text-gray-500': accent.sp,
                  }"
                >
                  {{ accent.m }}
                </span>
              </span>
              <small class="rounded-sm bg-slate-700 px-1 py-0.5 text-xs leading-none font-bold shadow">
                {{ row.pitch.pitchNum }}
              </small>
            </span>
            <div class="hz-jm mt-0.5 text-[13.5px] text-muted" lang="ja">
              {{ row.reading }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="entryTags.length" class="border-b border-line py-3.5">
      <p class="hz-cap">
        Метки
      </p>
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="(label, i) in entryTags"
          :key="i"
          class="hz-tag"
        >{{ label }}</span>
      </div>
    </div>

    <div class="border-b border-line py-3.5">
      <p class="hz-cap">
        Частотность
      </p>
      <div class="flex items-center gap-2.5">
        <UiBadgeFrequency v-if="entry.frequency > 0" :value="entry.frequency" />
        <span v-else class="text-[14.5px] text-muted">{{ t('pages.search.frequencyNoData') }}</span>
      </div>
    </div>

    <div class="border-b border-line py-3.5">
      <p class="hz-cap">
        Статус
      </p>
      <span
        class="hz-tag inline-flex h-6.5!"
        :class="{ 'hz-tag-sec': statusKind === 'sec' }"
      >{{ statusLabel }}</span>
    </div>

    <div class="border-b border-line py-3.5">
      <p class="hz-cap">
        История
      </p>
      <dl class="m-0 space-y-1 text-[14px]">
        <div class="flex justify-between gap-2.5">
          <dt class="text-muted">
            ID
          </dt>
          <dd class="m-0 font-mono text-[13px]">
            {{ entry.wid }}
          </dd>
        </div>
      </dl>
    </div>

    <div class="flex flex-col gap-2 pt-3.5">
      <NuxtLink
        :to="editLink"
        class="hz-btn-pri w-full"
      >
        Править статью
      </NuxtLink>

      <div class="flex gap-1.5">
        <button
          type="button"
          class="hz-btn flex-1"
          disabled
          title="скоро"
        >
          ★ Избранное
        </button>
        <button
          type="button"
          class="hz-btn flex-1"
          disabled
          title="скоро"
        >
          Anki
        </button>
      </div>

      <div class="flex flex-col gap-1.5">
        <button
          type="button"
          class="hz-switch w-full"
          role="switch"
          :aria-checked="!!showLemmas"
          title="Леммы"
          @click="emit('toggleLemmas')"
        >
          <span>Леммы</span>
          <span class="hz-switch-track" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="hz-switch w-full"
          role="switch"
          :aria-checked="!!entry.preferFurigana"
          title="Фуригана"
          @click="emit('switchFurigana')"
        >
          <span>Фуригана</span>
          <span class="hz-switch-track" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="hz-btn w-full"
          @click="emit('copy')"
        >
          Постоянная ссылка
        </button>
        <a
          :href="reportUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hz-btn w-full"
        >
          Сообщить об ошибке
        </a>
      </div>
    </div>
  </aside>
</template>
