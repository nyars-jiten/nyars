<script lang="ts" setup>
const { t } = useI18n()

const { tagList } = useJpnRepo()
const tags = ref({} as Record<string, Tag[]>) as Ref<Record<string, Tag[]>>

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
      <div>
        {{ tags }}
      </div>
    </section>
  </section>
</template>
