<script lang="ts" setup>
const { t } = useI18n()

const { tagList } = useJpnRepo()
const tags = ref({} as Record<string, { uuid: string, tags: Tag[] }>)

const tagKeys = ['eng', 'engShort', 'rus', 'rusShort', 'priority'] as (keyof Tag)[]
async function updateTags() {
  tags.value = await tagList('').then(e => Object.fromEntries(Object.entries(e).map(([key, value]) => [key, { uuid: crypto.randomUUID(), tags: value }])))
}

await updateTags()
</script>

<template>
  <section class="space-y-16">
    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          {{ t('pages.tags.title') }}
        </h1>
      </div>

      <table class="w-full">
        <tbody v-for="(list, category) of tags" :key="category">
          <tr class="sticky top-10 bg-neutral-900/95 text-indigo-300/80">
            <td colspan="100%">
              <h2 class="col-span-full text-4xl font-extralight text-center">
                {{ category }}
              </h2>
            </td>
          </tr>

          <tr v-for="tag, tagIndex in list.tags" :key="tagIndex" class="group odd:bg-neutral-800/50">
            <td v-for="key in tagKeys" :key="key" class="p-2">
              {{ tag[key] }}
            </td>

            <td class="opacity-0 group-hover:opacity-100 transition-opacity">
              <ui-button icon="ic:baseline-edit" color="edit" class="w-min" :outline="false" />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
