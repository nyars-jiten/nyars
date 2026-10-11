<script setup lang="ts">
// История правок статьи: строка на правку — статус, пометка «новая статья» / «удаление», дата, автор, кто принял или отклонил,
// справа «+N −M» строк. Строка раскрывается: сравнение «Было | Стало» и ссылка на правку.
// По умолчанию все свёрнуты. Сначала шесть последних, остальные — по кнопке.
const props = defineProps<{
  summary: EntryEditSummary
  pending?: boolean
}>()

const VISIBLE = 6

const { getUserAvatarUrl } = useUserProfile()

const all = ref(false)
const shown = computed(() => all.value ? props.summary.list : props.summary.list.slice(0, VISIBLE))
const hidden = computed(() => props.summary.list.length - VISIBLE)

const STATUS_LABEL: Record<UiStatusKind, string> = {
  pend: 'не проверено',
  ok: 'принята',
  work: 'доработка',
  rej: 'отклонена',
}
const REVIEW_VERB: Partial<Record<UiStatusKind, string>> = {
  ok: 'принял',
  rej: 'отклонил',
  work: 'вернул',
}

const avatar = (user: ShortUser | null) => user?.avatar ? getUserAvatarUrl(user.avatar).href : undefined

const rows = computed(() => shown.value.map((edit) => {
  const status = editStatusKind(edit.status)
  // автопринятые правки и правки на проверке без проверяющего
  const reviewer = edit.status !== EditStatus.AutoAccepted && edit.status !== EditStatus.New ? edit.approver : null
  return {
    edit,
    status,
    label: STATUS_LABEL[status],
    date: shortDateTime(edit.createdAt),
    full: fullDate(edit.createdAt),
    author: edit.author?.username ?? 'гость',
    authorAvatar: avatar(edit.author),
    reviewer: reviewer?.username,
    reviewerAvatar: avatar(reviewer),
    verb: REVIEW_VERB[status] ?? '',
    title: [editTypeLabel(edit.type), edit.comment?.trim()].filter(Boolean).join(': '),
    diff: editLineDiff(edit),
    kind: EDIT_KIND_TAG[edit.type],
  }
}))

// раскрытые строки по id правки; по умолчанию все свёрнуты
const open = ref<Record<string, boolean>>({})

function toggle(id: string) {
  open.value = { ...open.value, [id]: !open.value[id] }
}

const baseId = useId()

const item = 'before:mx-2.5 before:text-muted before:content-[\'·\']'
</script>

<template>
  <div>
    <div v-if="pending" aria-hidden="true">
      <div v-for="i in 3" :key="i" class="flex animate-pulse items-center gap-3 border-b border-line px-1.5 py-3">
        <div class="size-4 rounded-tag bg-soft" />
        <div class="h-[22px] w-24 rounded-tag bg-soft" />
        <div class="h-4 w-64 max-w-full rounded-tag bg-soft" />
      </div>
    </div>

    <p v-else-if="!summary.list.length" class="m-0 py-2 text-[14.5px] text-muted">
      Правок пока не было.
    </p>

    <template v-else>
      <ol class="m-0 flex list-none flex-col p-0">
        <li v-for="(row, r) in rows" :key="row.edit.id" class="border-b border-line">
          <button
            type="button"
            class="flex w-full cursor-pointer flex-wrap items-center gap-y-1 py-2.5 pr-1.5 pl-0.5 text-left text-[14.5px] text-ink transition-colors hover:bg-soft/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong"
            :aria-expanded="!!open[row.edit.id]"
            :aria-controls="`${baseId}-${r}`"
            :title="row.title"
            @click="toggle(row.edit.id)"
          >
            <Icon
              name="tabler:chevron-right"
              size="16px"
              class="mr-2 shrink-0 text-muted transition-transform duration-150"
              :class="{ 'rotate-90': open[row.edit.id] }"
            />
            <UiStatus :status="row.status" size="sm">
              {{ row.label }}
            </UiStatus>
            <UiTag v-if="row.kind" outline :tone="row.kind.tone" size="xs" class="ml-1.5">
              {{ row.kind.label }}
            </UiTag>
            <time
              :datetime="new Date(row.edit.createdAt).toISOString()"
              :title="row.full"
              class="text-[13.5px] whitespace-nowrap text-muted tabular-nums"
              :class="item"
            >{{ row.date }}</time>
            <span class="inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap" :class="item">
              <UiAvatar :name="row.author" :src="row.authorAvatar" size="sm" />
              <b class="truncate font-semibold">{{ row.author }}</b>
            </span>
            <span v-if="row.reviewer" class="inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap text-muted" :class="item">
              {{ row.verb }}
              <UiAvatar :name="row.reviewer" :src="row.reviewerAvatar" size="sm" />
              <b class="truncate font-semibold text-ink">{{ row.reviewer }}</b>
            </span>
            <span
              v-if="row.diff.plus || row.diff.minus"
              class="ml-auto pl-3.5 text-[13px] whitespace-nowrap tabular-nums"
              title="Строк добавлено / удалено"
            >
              <DiffStat :plus="row.diff.plus" :minus="row.diff.minus" />
            </span>
          </button>

          <div v-if="open[row.edit.id]" :id="`${baseId}-${r}`" class="pb-3.5 pl-[26px]">
            <EntryEditDiff v-if="row.diff.lines.length" :lines="row.diff.lines" />
            <p v-else class="m-0 text-sm text-muted">
              Текст статьи не изменился.
            </p>
            <NuxtLink
              :to="{ name: 'edits-id', params: { id: row.edit.id } }"
              class="mt-2 inline-block text-[13.5px] text-strong no-underline hover:underline hover:underline-offset-[3px]"
            >
              Открыть правку →
            </NuxtLink>
          </div>
        </li>
      </ol>

      <UiButton
        v-if="hidden > 0"
        variant="link"
        size="sm"
        icon="tabler:chevron-down"
        class="mt-2 -ml-2"
        @click="all = !all"
      >
        {{ all ? 'Свернуть' : `Показать все ${summary.list.length}` }}
      </UiButton>
    </template>
  </div>
</template>
