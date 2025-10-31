<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { searchPagesByWid } = useOcrData()
const { ocrImageUrl } = useOcrUtils()
const { userAccess } = storeToRefs(useUserStore())

const { data: ocrPages } = searchPagesByWid(props.wid)
</script>

<template>
  <div v-if="ocrPages && ocrPages.length > 0">
    <div
      v-for="page in ocrPages"
      :key="page.id"
      class="group py-2 border-b border-neutral-800"
    >
      <div class="flex items-center gap-2">
        <div class="text-blue-300">
          [{{ page.prefix }}] {{ page.title }}
        </div>
        <UiButton v-if="userAccess.hasAccessOcr" icon="ic:baseline-edit" color="edit" class="w-min opacity-0 group-hover:opacity-100 transition-opacity" :outline="false" @click="navigateTo(`/ocr/${page.id}`)" />
      </div>
      <img
        v-if="page.file"
        :src="ocrImageUrl(page.prefix, page.file).href"
        alt="page image"
        class="w-md mt-2 mb-2"
      >
      <div>
        {{ page.word }} {{ page.meaningRu }} {{ page.meaningEn }}
      </div>
      <div class="text-gray-400 italic">
        {{ page.rawLine }}
      </div>
    </div>
  </div>
  <div v-else class="italic font-extralight">
    {{ t('components.uiKit.noData') }}
  </div>
</template>
