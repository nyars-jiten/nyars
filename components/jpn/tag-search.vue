<script setup lang="ts">
defineEmits(['clickInsert'])

const query = ref('')

const { tagList } = useJpnArticles()
const tags = ref([] as V2Tag[])

const updateTags = async function () {
  tags.value = await tagList(query.value, 5)
}

await updateTags()

watchDebounced(query, updateTags, { debounce: 350 })
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

      <div class="flex flex-col gap-2">
        <button v-for="{ engShort, rusShort, rus } in tags" :key="engShort" type="button" class="transition-opacity hover:opacity-30 text-left space-x-2" @click="$emit('clickInsert', [rusShort, ''])">
          <span class="text-amber-300 italic">
            {{ rusShort }}
          </span>

          <span>
            {{ rus }}
          </span>
        </button>
      </div>
    </UiBlock>
  </section>
</template>
