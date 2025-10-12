<script setup lang="ts">
defineEmits<{
  (e: 'clickInsert', text: [string, string]): void
}>()

const { t } = useI18n()

const query = ref('')
const hideCategories = ref([]) as Ref<string[]>

const { tagList } = useJpnRepo()
const tags = ref({} as Record<string, Tag[]>) as Ref<Record<string, Tag[]>>

async function updateTags() {
  tags.value = await tagList(query.value)
}

function toggleCategory(category: string) {
  if (hideCategories.value.includes(category)) {
    hideCategories.value = hideCategories.value.filter((c: string) => c !== category)
  }
  else {
    hideCategories.value.push(category)
  }
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
        <div v-for="(tagscat, category) in tags" :key="category">
          <div class="cursor-pointer text-slate-400" @click="toggleCategory(category)">
            {{ t(`pages.editor.tagCategories.${category}`) }} {{ hideCategories.includes(category) || tagscat.length < 5 ? '▾' : '▸' }}
          </div>
          <div v-show="hideCategories.includes(category) || tagscat.length < 5">
            <button
              v-for="{ engShort, rusShort, rus } in tagscat" :key="engShort"
              type="button"
              class="block transition-opacity hover:opacity-30 text-left space-x-2"
              @click="$emit('clickInsert', [rusShort, ''])"
            >
              <span class="text-amber-300 italic">
                {{ rusShort }}
              </span>

              <span>
                {{ rus }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </UiBlock>
  </section>
</template>
