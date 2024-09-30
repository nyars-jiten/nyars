<script setup lang="ts">
definePageMeta({
  layout: 'desktop',
  name: 'Editor',
})

const { create } = useJpnArticles()

const writing = ref('')
const reading = ref('')
const body = ref('')

const { data, execute } = useLazyAsyncData(() => create({
  body: body.value,
  reading: reading.value,
  writing: writing.value,
}), {
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
</script>

<template>
  <section class="grid h-full grid-cols-2 gap-8">
    <div class="flex h-full flex-col gap-4">
      <section class="flex justify-between gap-4">
        <div class="space-x-2">
          <UiButton v-for="x of 10" :key="x" type="button" icon="ic:save" />
        </div>
        <div>
          <UiButton type="button" icon="ic:save" @click="save">
            save
          </UiButton>
        </div>
      </section>

      <div :active="false" class="flex grow flex-col gap-4">
        <UiInput v-model="writing" :multiline="true" :rows="1">
          <template #hint>
            writing
          </template>
        </UiInput>

        <UiInput v-model="reading" :multiline="true" :rows="1">
          <template #hint>
            reading
          </template>
        </UiInput>

        <UiInput v-model="body" :multiline="true" class="grow">
          <template #hint>
            body
          </template>
        </UiInput>
      </div>
    </div>

    <UiBlock>
      <h1 class="text-4xl">
        Preview
      </h1>
    </UiBlock>
  </section>
</template>
