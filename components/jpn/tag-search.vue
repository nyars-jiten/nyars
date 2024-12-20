<script setup lang="ts">
defineEmits(['clickInsert'])

const query = ref('')

const { tagList } = useJpnArticles()
const tags = ref([] as V2Tag[])

const updateTags = async function () {
  tags.value = await tagList(query.value, 20)
}

await updateTags()

watch(query, updateTags)
</script>

<template>
  <section>
    <h1 class="pb-8 text-center text-4xl md:hidden">
      Теги
    </h1>

    <UiBlock class="space-y-4">
      <h1 class="text-center text-2xl max-md:hidden">
        Теги
      </h1>
      <UiInput v-model="query" type="text">
        <template #hint>
          Поиск
        </template>
      </UiInput>
      <div>
        <div v-for="tag in tags" :key="tag.engShort" class="cursor-pointer" @click="$emit('clickInsert', [tag.rusShort, ''])">
          <span>
            {{ tag.rusShort }}
          </span>
          <span>
            {{ tag.rus }}
          </span>
        </div>
      </div>
    </UiBlock>
  </section>
</template>
