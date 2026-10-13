<script setup lang="ts">
// Спутники (dict=sat): статьи справочных словарей-спутников
defineProps<{
  items: readonly SatEntry[]
  query: string
}>()
</script>

<template>
  <ul v-if="items.length" class="m-0 list-none p-0">
    <li v-for="item in items" :key="item.id" class="border-t border-line py-4 first:border-t-0">
      <p lang="ja" class="hw m-0 text-2xl text-strong">
        {{ item.title }}
      </p>
      <p v-if="item.body" class="m-0 mt-1.5 whitespace-pre-line">
        {{ item.body }}
      </p>
    </li>
  </ul>
  <p v-else class="m-0 text-muted">
    В спутниках ничего не найдено<template v-if="query">
      по запросу «{{ query }}»
    </template>.
  </p>
</template>
