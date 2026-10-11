<script setup lang="ts">
// Боковая колонка статьи: статус, произношение, кандзи, частотность, история и действия.
const props = defineProps<{
  entry: EntryJp
  /** текст, из которого берутся кандзи: все обычные написания */
  kanjiText: string
  edits: EntryEditSummary
  editsPending: boolean
}>()

const emit = defineEmits<{
  /** открыть вкладку «История» */
  history: []
}>()

const showLemmas = defineModel<boolean>('lemmas', { default: false })

const config = useRuntimeConfig()
const { userAccess } = storeToRefs(useUserStore())

const flags = computed(() => entryStatusFlags(props.entry.status))
const pronunciations = computed(() => entryPronunciations(props.entry))
const kanji = computed(() => entryKanji(props.kanjiText))
const frequency = computed(() => entryFrequency(props.entry))
const jlpt = computed(() => entryJlpt(props.entry))

const flagClass: Record<EntryStatusFlag['kind'], string> = {
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  dial: 'bg-dial-soft text-dial',
  neutral: 'bg-line/60 text-ink',
}

const pendingEdit = computed(() => props.edits.pending[0] ?? null)
const lastEdit = computed(() => {
  const last = props.edits.last
  if (!last)
    return '—'
  return [shortDate(last.createdAt), last.author?.username ?? 'гость'].join(', ')
})

/* ---------- избранное и ссылка ---------- */

const { isFavorite, toggle } = useFavorites()
const favorite = computed(() => isFavorite(props.entry.wid))

const url = computed(() => {
  const path = `jp/${props.entry.wid}`
  try {
    return new URL(path, config.public.baseUrl || (import.meta.client ? window.location.origin : undefined)).toString()
  }
  catch {
    return `/${path}`
  }
})
const clipboard = useClipboard({ copiedDuring: 1500 })
</script>

<template>
  <div class="flex flex-col">
    <section v-if="flags.length || pendingEdit" aria-labelledby="entry-status" class="border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiCaption id="entry-status" class="mb-2">
        Статус
      </UiCaption>
      <ul class="m-0 flex list-none flex-col items-start gap-1.5 p-0">
        <li
          v-for="flag in flags"
          :key="flag.label"
          :title="flag.hint"
          class="inline-flex h-[26px] items-center gap-1.5 rounded-tag pr-2.5 pl-2 text-[11.5px] font-extrabold tracking-[.07em] whitespace-nowrap uppercase"
          :class="flagClass[flag.kind]"
        >
          <Icon :name="flag.icon" size="16px" />
          {{ flag.label }}
        </li>
      </ul>
      <p v-if="pendingEdit" class="m-0 mt-1.5 text-[13.5px]">
        <NuxtLink :to="{ name: 'edits-id', params: { id: pendingEdit.id } }" class="text-strong no-underline hover:underline hover:underline-offset-[3px]">
          Есть правка на проверке →
        </NuxtLink>
      </p>
    </section>

    <section v-if="pronunciations.length" aria-labelledby="entry-pron" class="border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiCaption id="entry-pron" class="mb-2">
        Произношение
      </UiCaption>
      <EntryPronunciation :items="pronunciations" />
    </section>

    <section v-if="kanji.length" aria-labelledby="entry-kanji" class="border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiCaption id="entry-kanji" class="mb-2">
        Кандзи в записи · {{ kanji.length }}
      </UiCaption>
      <EntryKanji :chars="kanji" />
    </section>

    <section aria-labelledby="entry-freq" class="border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiCaption id="entry-freq" class="mb-2">
        Частотность
      </UiCaption>
      <div class="flex flex-wrap items-center gap-2.5">
        <span v-if="frequency" class="font-bold tabular-nums" :title="`Ранг по частотности — ${frequency.label}`">№ {{ frequency.rank.toLocaleString('ru-RU') }}</span>
        <span v-else class="text-muted">вне списка</span>
        <span class="flex gap-[3px]" aria-hidden="true">
          <i v-for="i in 5" :key="i" class="block h-1.5 w-3.5 rounded-[3px]" :class="i <= (frequency?.level ?? 0) ? 'bg-strong' : 'bg-soft'" />
        </span>
        <span v-if="frequency" class="sr-only">, {{ frequency.label }}</span>
        <UiTag v-if="jlpt" size="xs">
          JLPT {{ jlpt }}
        </UiTag>
      </div>
    </section>

    <section aria-labelledby="entry-hist" class="border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiCaption id="entry-hist" class="mb-2">
        История
      </UiCaption>
      <dl class="m-0 text-sm">
        <div class="flex justify-between gap-2.5 py-[3px]">
          <dt class="text-muted">
            Изменена
          </dt>
          <dd class="m-0 text-right">
            <span v-if="editsPending" class="inline-block h-3.5 w-24 animate-pulse rounded-tag bg-soft align-middle" />
            <template v-else>
              {{ lastEdit }}
            </template>
          </dd>
        </div>
        <div class="flex justify-between gap-2.5 py-[3px]">
          <dt class="text-muted">
            Правок
          </dt>
          <dd class="m-0 text-right tabular-nums">
            <span v-if="editsPending" class="inline-block h-3.5 w-6 animate-pulse rounded-tag bg-soft align-middle" />
            <a v-else href="#entry-tabs" class="text-strong no-underline hover:underline hover:underline-offset-[3px]" @click="emit('history')">{{ edits.list.length }}</a>
          </dd>
        </div>
        <div class="flex justify-between gap-2.5 py-[3px]">
          <dt class="text-muted">
            Авторов
          </dt>
          <dd class="m-0 text-right tabular-nums">
            {{ editsPending ? '…' : edits.authors }}
          </dd>
        </div>
        <div class="flex justify-between gap-2.5 py-[3px]">
          <dt class="text-muted">
            ID
          </dt>
          <dd class="m-0 text-right font-mono text-[13px]">
            {{ entry.wid }}
          </dd>
        </div>
      </dl>
    </section>

    <section aria-label="Действия" class="flex flex-col gap-2 border-t border-line py-4 first:border-t-0 first:pt-0">
      <UiButton variant="primary" icon="tabler:pencil" :to="{ name: 'dict-jpn-wid-editor', params: { wid: String(entry.wid) } }">
        Править статью
      </UiButton>
      <div class="flex gap-1.5">
        <UiButton
          class="flex-1 px-2 aria-pressed:border-strong aria-pressed:text-strong"
          :icon="favorite ? 'tabler:star-filled' : 'tabler:star'"
          :aria-pressed="favorite"
          :title="favorite ? 'Убрать из избранного' : 'Добавить в избранное (хранится в этом браузере)'"
          @click="toggle(entry.wid)"
        >
          Избранное
        </UiButton>
        <UiButton class="flex-1 px-2" icon="tabler:cards" disabled title="Экспорт в Anki появится позже">
          Anki
        </UiButton>
      </div>
      <div class="flex justify-between gap-3 text-[13.5px]">
        <button
          type="button"
          class="cursor-pointer text-strong hover:underline hover:underline-offset-[3px] focus-visible:outline-2 focus-visible:outline-strong"
          :title="url"
          @click="clipboard.copy(url)"
        >
          {{ clipboard.copied.value ? 'Скопировано' : 'Ссылка' }}
        </button>
        <span role="status" class="sr-only">{{ clipboard.copied.value ? 'Ссылка скопирована' : '' }}</span>
        <a
          v-if="config.public.discordUrl"
          :href="config.public.discordUrl"
          target="_blank"
          rel="noopener"
          class="text-strong no-underline hover:underline hover:underline-offset-[3px]"
        >Сообщить об ошибке</a>
      </div>
      <UiButton
        v-if="userAccess.hasAccessEdits"
        variant="link"
        size="sm"
        icon="tabler:list-details"
        class="self-start -ml-2"
        :aria-pressed="showLemmas"
        @click="showLemmas = !showLemmas"
      >
        {{ showLemmas ? 'Скрыть леммы' : 'Показать леммы' }}
      </UiButton>
    </section>
  </div>
</template>
