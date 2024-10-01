<script setup lang="ts">
import type UiInput from '~/components/ui/ui-input.vue'

definePageMeta({
  layout: 'desktop',
  name: 'Editor',
})

const { create, preview } = useJpnArticles()

const writing = ref('')
const reading = ref('')
const body = ref('')

const { data: previewData, execute: previewExecute } = useAsyncData(() => preview({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
  lazy: true,
  server: false,
  default: () => ({
    wid: '0000',
    status: {
      isReviewed: false,
      isUnconfirmed: false,
      isArchaic: false,
      isDialect: false,
      isProper: false,
    },
    externalEntry: '',
    title: '',
    tags: [],
    words: [],
    meanings: [],
  } as V2EntryJp),
})

watchDebounced([writing, reading, body], async () => {
  await previewExecute()

  if ('code' in previewData.value) {
    console.log(previewData.value.code, previewData.value.message)
  }
}, { debounce: 250 })

const { data, execute } = useAsyncData('changes-preview', () => create({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
  lazy: true,
  server: false,

  default: () => ({
    code: 0,
    message: '',
  }),
})

async function save() {
  await execute()

  console.log(data.value.code, data.value.message)
}

const writingRef = ref()
const readingRef = ref()
const bodyRef = ref()
</script>

<template>
  <section class="grid h-full grow grid-cols-2 gap-8">
    <div class="flex h-full flex-col gap-4">
      <section class="flex justify-between gap-4">
        <div class="inline-flex flex-wrap gap-2">
          
        <!-- italic -->
        <UiButton type="button" icon="ic:format-italic" />

        <!-- works same as italic -->
        <UiButton type="button" >[p]</UiButton>

        <!-- sub -->
        <UiButton type="button" icon="ic:subscript" >sub</UiButton>

        <!-- sup -->
        <UiButton type="button" icon="ic:superscript" >sup</UiButton>

        <!-- comp1 -->
        <UiButton type="button">{~suru}</UiButton>
        <UiButton type="button">{~to...na}</UiButton>

        <!-- bracket-одна -->
        <UiButton type="button">⌈</UiButton>

        <!-- кавычки -->
        <UiButton type="button">« »</UiButton>

        <!-- ударение -->
        <UiButton type="button" icon="ic:format-letter-spacing-wide-rounded">accent</UiButton>

        <!-- tag -->
        <UiButton type="button" icon="ic:tag" >tag</UiButton>
        </div>

        <div>
          <UiButton type="button" icon="ic:save" @click="save">
            save
          </UiButton>
        </div>
      </section>

      <div :active="false" class="flex grow flex-col gap-4">
        <UiInput ref="writingRef" id="texta-writing" v-model="writing" :multiline="true" :rows="1">
          <template #hint>
            writing
          </template>
        </UiInput>

        <UiInput ref="readingRef" id="reading-writing" v-model="reading" :multiline="true" :rows="1">
          <template #hint>
            reading
          </template>
        </UiInput>

        <UiInput ref="bodyRef" id="body-writing" v-model="body" :multiline="true" class="grow">
          <template #hint>
            body
          </template>
        </UiInput>
      </div>
    </div>

    <UiBlock class="space-y-4">
      <h1 class="text-4xl">
        Preview
      </h1>

      <JpnEntry v-if="!('code' in previewData)" :jpn-entry="previewData" />
    </UiBlock>
  </section>
</template>
