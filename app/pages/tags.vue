<script lang="ts" setup>
const { t } = useI18n()

const { getTags } = useJpnTags()
const { data: tags } = getTags('')
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
              <h2 class="text-4xl uppercase font-extralight text-center m-4">
                {{ t(`pages.editor.tagCategories.${category}`) }}
              </h2>
            </td>
          </tr>

          <TagsItem v-for="_, tagIndex in list" :key="tagIndex" v-model="list[tagIndex]!" />
        </tbody>
      </table>
    </section>
  </section>
</template>
