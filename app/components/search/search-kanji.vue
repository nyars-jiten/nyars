<script setup lang="ts">
// Кандзи из запроса (dict=kanji, до 25)
defineProps<{
  items: readonly StoreKanjiItem[]
  query: string
}>()
</script>

<template>
  <ul v-if="items.length" class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3 p-0">
    <li v-for="item in items" :key="item.kanji" class="rounded-panel bg-surf p-4">
      <p lang="ja" class="m-0 font-jp text-5xl leading-none">
        {{ item.kanji }}
      </p>
      <p v-if="item.strokes" class="m-0 mt-2 text-sm text-muted">
        {{ item.strokes }} {{ pluralRu(item.strokes, 'черта', 'черты', 'черт') }}
      </p>
      <p v-if="item.components?.length" lang="ja" class="m-0 mt-1 font-jp text-sm text-muted">
        {{ item.components.join(' ') }}
      </p>
    </li>
  </ul>
  <p v-else class="m-0 text-muted">
    Кандзи в запросе не найдено<template v-if="query">
      («{{ query }}»)
    </template>.
  </p>
</template>
