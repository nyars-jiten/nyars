<script lang="ts" setup>
const routeId = useRoute('ocr-id').params.id

const { getPage } = useOcrRepo()
const pageData = await getPage(routeId)
const page = ref(pageData ? { ...pageData } : null)
</script>

<template>
  <div>
    {{ page }}

    <h3 class="text-[#6aa3ab]">
      [{{ page?.prefix }}] {{ page?.title }}
    </h3>
    <div>
      {{ page?.description }}
    </div>
    <img
      v-if="page?.file"
      :src="`https://nyars.moe/static/ocr/${page?.prefix}/${page?.file}`"
      alt="page image"
      class="w-[70%] mt-2 mb-2"
    >
    <div>
      Raw: <span>{{ page?.rawLine }}</span>
    </div>
    <div v-if="page" class="flex flex-wrap gap-4 mt-4">
      <div class="flex-1 min-w-[350px]">
        <UiInput v-model="page.word" class="w-full">
          <template #hint>
            word
          </template>
        </UiInput>
      </div>

      <div class="flex-1 min-w-[350px]">
        <UiInput v-model="page.reading" class="w-full">
          <template #hint>
            reading
          </template>
        </UiInput>
      </div>

      <div class="flex-1 min-w-[350px]">
        <UiInput v-model="page.meaningRu" class="w-full" :multiline="true">
          <template #hint>
            meaningRu
          </template>
        </UiInput>
      </div>

      <div class="flex-1 min-w-[350px]">
        <UiInput v-model="page.meaningEn" class="w-full" :multiline="true">
          <template #hint>
            meaningEn
          </template>
        </UiInput>
      </div>
    </div>
  </div>
</template>
