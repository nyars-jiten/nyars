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
  <section class="flex flex-col gap-3">
    {{ edit.entryStatus }}

    <div v-if="edit.comment.length > 0" class="bg-zinc-500/5 p-2 whitespace-pre-line">
      {{ edit.comment }}
    </div>

    <div class="inline-flex gap-2 flex-wrap flex-row-reverse">
      <!-- <NuxtLink :to="{ name: 'edits-id', params: { id: edit.id } }">
        <UiButton class="text-gray-500" icon="ic:outline-info" title="Инфо">
          Инфо
        </UiButton>
      </NuxtLink> -->

      <NuxtLink v-if="showEntryRef(edit)" :to="{ name: 'dict-jpn-wid', params: { wid: edit.wid } }" prefetch>
        <UiButton class="text-gray-500" icon="ic:outline-open-in-new" label="Открыть статью">
          <!-- Открыть статью -->
        </UiButton>
      </NuxtLink>

      <UiButton v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))" class="text-red-500" icon="ic:baseline-close" label="Отклонить" @click="reject()">
        <!-- Отклонить -->
      </UiButton>

      <UiButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-green-500" icon="ic:baseline-done-all" label="Принять как отредактированную" @click="approveAsReviewed()">
        <!-- Принять как отредактированную -->
      </UiButton>

      <UiButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-yellow-500" icon="ic:baseline-done" label="Принять как неотредактированную" @click="approveAsUnreviewed()">
        <!-- Принять как неотредактированную -->
      </UiButton>

      <template v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))">
        <NuxtLink :to="{ name: 'edits-id-editor', params: { id: edit.id } }">
          <UiButton class="text-blue-500" icon="ic:baseline-edit" label="Отредактировать">
            <!-- Отредактировать -->
          </UiButton>
        </NuxtLink>
      </template>
    </div>

    <!-- <div v-if="edit.comment.length > 0" class="break-words border-l-2 border-neutral-200 pl-2 dark:border-neutral-700">
      {{ t('components.editGroup.changesPreview.comment') }} {{ edit.comment }}
    </div> -->

    <div class="grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-2">
      <template v-if="!isTypeCreate">
        <div :class="preview()">
          <span
            v-for="(text, index) of edit.diffSrc"
            :key="index"
            :class="`whitespace-pre-wrap ${text.d ? 'text-red-500' : ''}`"
          >
            {{ text.c }}
          </span>
        </div>

        <div class="flex flex-col items-center justify-evenly max-sm:border-y sm:border-x p-2 border-neutral-800">
          <div class="after:content-['↓'] sm:after:content-['⟶']" />
        </div>
      </template>

      <div :class="[{ 'col-span-full': isTypeCreate }, preview()]">
        <span
          v-for="(text, index) of (showRaw ? edit.diffRawDst : edit.diffDst)"
          :key="index"
          :class="`whitespace-pre-wrap ${text.c.length > 25 ? 'break-all' : ''} ${text.d ? 'text-green-500' : ''}`"
        >
          {{ text.c }}
        </span>
      </div>
    </div>
  </section>
</template>
