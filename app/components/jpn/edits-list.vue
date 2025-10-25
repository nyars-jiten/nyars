<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { getEditsByWid } = useEditsData()

const { data: editsList } = getEditsByWid(props.wid)

const { t } = useI18n()
</script>

<template>
  <div>
    <div v-if="editsList && editsList.length > 0">
      <ShortEdit
        v-for="edit in editsList"
        :key="edit.id"
        :edit
      />
    </div>
    <div v-else class="italic font-extralight">
      {{ t('models.edit.tabNoData') }}
    </div>
  </div>
</template>
