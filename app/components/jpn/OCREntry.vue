<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { searchPagesByWid } = useOcrRepo()

const { data: ocrPages } = useAsyncData(`jpn-ocr-${props.wid}`, () => searchPagesByWid(props.wid))
</script>

<template>
  <div v-if="ocrPages && ocrPages.length > 0">
    <div
      v-for="page in ocrPages"
      :key="page.id"
      class="py-2 border-b-1 border-neutral-800"
    >
      <div class="text-[#6aa3ab]">
        [{{ page.prefix }}] {{ page.title }}
      </div>
      <img
        v-if="page.file"
        :src="`https://nyars.moe/static/ocr/${page.prefix}/${page.file}`"
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
