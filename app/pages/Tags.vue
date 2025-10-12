<script lang="ts" setup>
const { t } = useI18n()

const { tagList } = useJpnRepo()
const tags = ref({} as Record<string, Tag[]>)

async function updateTags() {
  tags.value = await tagList('')
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
              <h2 class="text-4xl font-extralight text-center m-4">
                {{ category }}
              </h2>
            </td>
          </tr>

          <tags-item v-for="_, tagIndex in list" :key="tagIndex" v-model="list[tagIndex]" />
        </tbody>
      </table>
    </section>
  </section>
</template>
