<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { getEditsByWid } = useEditRepo()

const { data: editsList } = useAsyncData(`jpn-edits-${props.wid}`, () => getEditsByWid(props.wid))

const { t } = useI18n()
</script>

<template>
  <div>
    <div v-if="editsList && editsList.length > 0">
      <ShortEdit 
        v-for="edit in editsList" 
        :edit 
        :key="edit.id"
      />
    </div>
    <div v-else class="italic font-extralight">
      {{ t('models.edit.tabNoData') }}
    </div>
  </div>
</template>
