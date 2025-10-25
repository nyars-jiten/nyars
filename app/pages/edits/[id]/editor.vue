<script setup lang="ts">
const routeId = useRoute('edits-id-editor').params.id

const { getEditTxt, getEdit } = useEditsData()
const { userAccess, user } = storeToRefs(useUserStore())
const { t } = useI18n()

const edit = getEdit(routeId)
const srcData = getEditTxt(routeId)

function actionOnSave() {
  useNotificationStore().createNotification(t('pages.editor.notification.success'), NyarsNotificationType.Success)
  useRouter().back()
}

const disabled = computed(() => {
  if (srcData.status.value !== 'success' && edit.status.value !== 'success') {
    return true
  }

  // check if user is not logged in
  if (user.value === null) {
    return true
  }

  // check rights
  if (!userAccess.value.hasAccessEdits && user.value?.id !== edit.data.value?.author?.id) {
    return true
  }

  // check edit status
  if (edit.data.value?.status !== EditStatus.New) {
    return true
  }

  return false
})
</script>

<template>
  <JpnEditor v-if="srcData.data.value" :entry="srcData.data.value" :disabled="disabled" is-edit collapse-menu :wid="edit.data.value?.wid || ''" @save="actionOnSave" />
</template>
