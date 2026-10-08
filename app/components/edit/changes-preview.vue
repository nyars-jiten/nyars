<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  edit: EditResponse
}

const props = defineProps<Props>()

const { userAccess, user } = storeToRefs(useUserStore())
const { approveEditAsReviewed, approveEditAsUnreviewed, declineEdit } = useEditActions()
const notificationStore = useNotificationStore()

const { t } = useI18n()

const isTypeCreate = computed(() => props.edit.type === EditType.Create)

const preview = tv({
  base: 'py-2',
})

function approveAsReviewed() {
  approveEditAsReviewed(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.approved'), NyarsNotificationType.Success)
}

function reject() {
  declineEdit(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.rejected'), NyarsNotificationType.Warning)
}

function approveAsUnreviewed() {
  approveEditAsUnreviewed(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.approved'), NyarsNotificationType.Success)
}

const showRaw = ref(false)

function showEntryRef(edit: EditResponse): boolean {
  return edit.wid !== '' && !(edit.status === EditStatus.Accepted && edit.type === EditType.Delete)
}
</script>

<template>
  <section class="flex flex-col gap-3 text-[14.5px]">
    <div
      v-if="edit.comment.length > 0"
      class="rounded-[10px] bg-soft px-3 py-2 whitespace-pre-line text-ink"
    >
      {{ edit.comment }}
    </div>

    <div class="inline-flex flex-row-reverse flex-wrap gap-2">
      <NuxtLink v-if="showEntryRef(edit)" :to="{ name: 'dict-jpn-wid', params: { wid: edit.wid } }" prefetch>
        <UiButton class="text-muted" icon="ic:outline-open-in-new" title="Открыть статью" />
      </NuxtLink>

      <UiButton
        v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))"
        class="text-sec"
        icon="ic:baseline-close"
        title="Отклонить"
        @click="reject()"
      />

      <UiButton
        v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits"
        class="text-strong"
        icon="ic:baseline-done-all"
        title="Принять как отредактированную"
        @click="approveAsReviewed()"
      />

      <UiButton
        v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits"
        class="text-muted"
        icon="ic:baseline-done"
        title="Принять как неотредактированную"
        @click="approveAsUnreviewed()"
      />

      <NuxtLink
        v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))"
        :to="{ name: 'edits-id-editor', params: { id: edit.id } }"
      >
        <UiButton class="text-strong" icon="ic:baseline-edit" title="Отредактировать" />
      </NuxtLink>
    </div>

    <div class="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-2">
      <template v-if="!isTypeCreate">
        <div :class="preview()">
          <span
            v-for="(text, index) of edit.diffSrc"
            :key="index"
            class="whitespace-pre-wrap"
            :class="text.d ? 'font-semibold text-sec' : 'text-ink'"
          >
            {{ text.c }}
          </span>
        </div>

        <div class="flex flex-col items-center justify-evenly border-line p-2 max-sm:border-y sm:border-x">
          <div class="text-muted after:content-['↓'] sm:after:content-['⟶']" />
        </div>
      </template>

      <div :class="[{ 'col-span-full': isTypeCreate }, preview()]">
        <span
          v-for="(text, index) of (showRaw ? edit.diffRawDst : edit.diffDst)"
          :key="index"
          class="whitespace-pre-wrap"
          :class="[
            text.c.length > 25 ? 'break-all' : '',
            text.d ? 'font-semibold text-strong' : 'text-ink',
          ]"
        >
          {{ text.c }}
        </span>
      </div>
    </div>
  </section>
</template>
