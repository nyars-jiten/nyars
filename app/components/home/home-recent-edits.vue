<script setup lang="ts">
// Последние правки: те же карточки EditItem, что и на странице /edits.
const LIMIT = 6

const { getEdits } = useEditsData()
const { data, status } = getEdits({ n: LIMIT })
const { patched, act } = useEditModeration()

const list = computed(() => (data.value ?? []).map(edit => patched.value[edit.id] ?? edit))
const open = ref<Record<string, boolean>>({})
</script>

<template>
  <section class="grid gap-3 rounded-panel bg-surf px-[26px] pt-6 pb-[26px] max-sm:px-4" aria-labelledby="home-edits">
    <div class="flex items-baseline gap-3">
      <UiCaption id="home-edits" as="h2" class="!mb-0 flex-1">
        Последние правки
      </UiCaption>
      <NuxtLink :to="{ name: 'edits' }" class="text-sm font-bold text-strong no-underline hover:underline hover:underline-offset-[3px]">
        Все правки →
      </NuxtLink>
    </div>

    <template v-if="list.length">
      <EditItem
        v-for="edit in list"
        :key="edit.id"
        v-model:open="open[edit.id]"
        :edit="edit"
        :act="act"
      />
    </template>

    <template v-else-if="status === 'pending'">
      <div v-for="i in LIMIT" :key="i" class="h-[72px] rounded-panel bg-soft" aria-hidden="true" />
    </template>

    <p v-else class="m-0 text-sm text-muted">
      Правок пока нет.
    </p>
  </section>
</template>
