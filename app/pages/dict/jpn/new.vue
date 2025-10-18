<script setup lang="ts">
const { t } = useI18n()

const newEntry = {
  spelling: '',
  reading: '',
  body: '=((сущ))\n- новое значение',
  comment: '',
  status: {
    isUnreviewed: false,
    isUnconfirmed: false,
    isArchaic: false,
    isDialect: false,
    isProper: false,
    isDeleted: false,
  },
} satisfies EditorTxtEntryJp

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
    :is-new="true"
    :entry="newEntry"
    wid=""
    redirect-if-anonymous
    collapse-menu
    @save="actionOnSave"
  />
</template>
