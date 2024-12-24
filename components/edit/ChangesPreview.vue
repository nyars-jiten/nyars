<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  edit: EditResponse
}

const props = defineProps<Props>()

const { userAccess, user } = storeToRefs(useUserStore())
const { approveEdit, approveEditStatus, declineEdit } = useApi(editRepository)
const notificationStore = useNotificationStore()

const { t } = useI18n()

const isTypeCreate = computed(() => props.edit.type === EditType.Create)

const preview = tv({
  base: 'py-2',
})

function approve() {
  approveEdit(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.approved'), NyarsNotificationType.Success)
}

function reject() {
  declineEdit(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.rejected'), NyarsNotificationType.Warning)
}

function approveStatus() {
  approveEditStatus(props.edit.id)
  notificationStore.createNotification(t('models.edit.actions.approved'), NyarsNotificationType.Success)
}
</script>

<template>
  <section class="flex flex-col gap-3">
    <div class="inline-flex gap-2 flex-wrap flex-row-reverse">
      <NuxtLink :to="{ name: 'edit-page', params: { id: edit.id } }" title="Инфо">
        <UiButton class="text-gray-500" icon="ic:outline-info">
          <!-- Инфо -->
        </UiButton>
      </NuxtLink>

      <UiButton v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))" class="text-red-500" icon="ic:baseline-close" title="Отклонить" @click="reject()">
        <!-- Отклонить -->
      </UiButton>

      <UiButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-green-500" icon="ic:baseline-done-all" title="Принять" @click="approve()">
        <!-- Принять -->
      </UiButton>

      <UiButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-yellow-500" icon="ic:baseline-done" title="Принять без смены статуса" @click="approveStatus()">
        <!-- Принять без смены статуса -->
      </UiButton>

      <UiButton v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))" class="text-blue-500" icon="ic:baseline-edit" title="Отредактировать">
        <!-- Отредактировать -->
      </UiButton>
    </div>

    <!-- <div v-if="edit.comment.length > 0" class="break-words border-l-2 border-ns-gray-200 pl-2 dark:border-ns-gray-700">
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
          v-for="(text, index) of edit.diffDst"
          :key="index"
          :class="`whitespace-pre-wrap ${text.c.length > 25 ? 'break-all' : ''} ${text.d ? 'text-green-500' : ''}`"
        >
          {{ text.c }}
        </span>
      </div>
    </div>
  </section>
</template>
