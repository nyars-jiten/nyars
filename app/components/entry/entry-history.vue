<script setup lang="ts">
// История правок статьи: версия (или статус для непринятых), автор, комментарий, дата, объём.
// Сначала пять последних, остальные — по кнопке.
const props = defineProps<{
  summary: EntryEditSummary
  pending?: boolean
}>()

const VISIBLE = 5

const all = ref(false)
const shown = computed(() => all.value ? props.summary.list : props.summary.list.slice(0, VISIBLE))
const hidden = computed(() => props.summary.list.length - VISIBLE)

const rows = computed(() => shown.value.map(edit => ({
  edit,
  version: props.summary.versions.get(edit.id),
  status: editStatusKind(edit.status),
  text: edit.comment?.trim() || editTypeLabel(edit.type),
  date: shortDate(edit.createdAt),
  full: fullDate(edit.createdAt),
  stat: editDiffStat(edit),
})))
</script>

<template>
  <div>
    <div v-if="pending" aria-hidden="true">
      <div v-for="i in 3" :key="i" class="flex animate-pulse gap-3 border-b border-line py-3">
        <div class="h-4 w-10 rounded-tag bg-soft" />
        <div class="h-4 w-72 max-w-full rounded-tag bg-soft" />
      </div>
    </div>

    <p v-else-if="!summary.list.length" class="m-0 py-2 text-[14.5px] text-muted">
      Правок пока не было.
    </p>

    <template v-else>
      <ol class="m-0 list-none p-0">
        <li
          v-for="row in rows"
          :key="row.edit.id"
          class="grid grid-cols-[52px_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-line py-[9px] text-[14.5px]"
        >
          <span v-if="row.version" class="font-bold text-muted tabular-nums">v{{ row.version }}</span>
          <span v-else class="self-center"><UiStatus :status="row.status" variant="dot" /></span>

          <span class="min-w-0">
            <NuxtLink
              v-if="row.edit.author"
              :to="{ name: 'users-username', params: { username: row.edit.author.username } }"
              class="font-bold text-ink no-underline hover:text-strong hover:underline"
            >{{ row.edit.author.username }}</NuxtLink>
            <b v-else>гость</b>
            —
            <NuxtLink :to="{ name: 'edits-id', params: { id: row.edit.id } }" class="text-ink no-underline hover:text-strong hover:underline hover:underline-offset-[3px]">
              {{ row.text }}
            </NuxtLink>
            <span class="text-muted"> · <time :datetime="new Date(row.edit.createdAt).toISOString()" :title="row.full">{{ row.date }}</time></span>
            <span v-if="!row.version" class="sr-only">, {{ row.status === 'pend' ? 'ждёт проверки' : 'отклонена' }}</span>
          </span>

          <DiffStat v-if="row.stat" :plus="row.stat.plus" :minus="row.stat.minus" class="text-[13px]" />
          <span v-else />
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
