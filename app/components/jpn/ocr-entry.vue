<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { searchPagesByWid } = useOcrData()
const { ocrImageUrl } = useOcrUtils()
const { userAccess } = storeToRefs(useUserStore())

const { data: ocrPages } = searchPagesByWid(props.wid)
</script>

<template>
  <div v-if="ocrPages && ocrPages.length > 0" class="flex flex-col gap-5">
    <div
      v-for="page in ocrPages"
      :key="page.id"
      class="flex flex-wrap gap-[18px]"
    >
      <img
        v-if="page.file"
        :src="ocrImageUrl(page.prefix, page.file).href"
        alt="Скан страницы"
        class="h-[260px] w-[220px] flex-none rounded-md object-cover object-top"
      >

      <div class="min-w-[280px] flex-1 text-[15px]">
        <span class="hz-tag hz-tag-ghost inline-flex h-5! text-[11px]!">
          [{{ page.prefix }}] {{ page.title }}
        </span>

        <p class="mt-2 mb-0">
          <template v-if="page.word">{{ page.word }} </template>
          <template v-if="page.meaningRu">{{ page.meaningRu }} </template>
          <template v-if="page.meaningEn">{{ page.meaningEn }}</template>
        </p>

        <p v-if="page.rawLine" class="mt-2.5 mb-0 text-[13.5px] text-muted">
          {{ page.rawLine }}
        </p>

        <p v-if="userAccess.hasAccessOcr" class="mt-2.5 mb-0 text-[13.5px]">
          <NuxtLink
            :to="`/ocr/${page.id}`"
            class="font-semibold text-strong underline-offset-2 hover:underline"
          >
            Исправить распознавание
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
  <div v-else class="py-2 text-[14.5px] text-muted italic">
    {{ t('components.uiKit.noData') }}
  </div>
</template>
