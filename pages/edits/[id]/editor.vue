<script setup lang="ts">
const routeId = useRoute('edits-id-editor').params.id

const { getEditTxt } = useApi(editRepository)
const { get } = useApi(editRepository)
const { userAccess, user } = storeToRefs(useUserStore())

const edit = await useAsyncData(() => get(routeId))
const srcData = await useAsyncData(() => getEditTxt(routeId))

const disabled = computed(() => {
  if (srcData.status.value !== 'success' && edit.status.value !== 'success') {
    return true
  }

  // check if user is not logged in
  if (user.value === null) {
    return true
  }

  // check rights
  if (!userAccess.value.hasAccessEdits && user.value.id !== edit.data.value?.author?.id) {
    return true
  }

  // check edit status
  if (edit.data.value?.status !== EditStatus.New) {
    return true
  }

  return false
})

definePageMeta({
  layout: 'desktop',
})
</script>

<template>
  <JpnEditor v-if="srcData.data.value" :entry="srcData.data.value" :disabled="disabled" is-edit :wid="edit.data.value?.wid || ''" />
</template>
