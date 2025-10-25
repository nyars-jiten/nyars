<script setup lang="ts">
const { getEntry, getEntrySource } = useJpnEntries()
const { t } = useI18n()

const routeWid = useRoute('dict-jpn-wid').params.wid

const srcData = getEntrySource(routeWid)
const rawEntry = getEntry(routeWid)

const disabled = computed(() => {
  return srcData.status.value !== 'success' || rawEntry.status.value !== 'success' || rawEntry.data.value?.status.isDeleted
})

function actionOnSave() {
  useNotificationStore().createNotification(t('pages.editor.notification.success'), NyarsNotificationType.Success)
  useRouter().back()
}

definePageMeta({
  layout: false,
})
</script>

<template>
  <JpnEditor
    v-if="srcData.data.value"
    :entry="srcData.data.value"
    :disabled="disabled"
    :wid="routeWid"
    collapse-menu
    @save="actionOnSave"
    @remove="actionOnSave"
  />
</template>
