<script setup lang="ts">
// Сателлиты: статьи других словарей (Яркси, JMdict…) для сверки, как есть.
const props = defineProps<{
  satellites: EntryJpSatellite[]
  pending?: boolean
}>()

const sorted = computed(() => [...props.satellites].sort((a, b) => a.title.localeCompare(b.title)))
</script>

<template>
  <div>
    <div v-if="pending" class="h-20 animate-pulse rounded-panel bg-surf" aria-hidden="true" />

    <p v-else-if="!sorted.length" class="m-0 py-2 text-[14.5px] text-muted">
      В других словарях статей не найдено.
    </p>

    <div v-else class="flex flex-col gap-2.5">
      <section v-for="satellite in sorted" :key="satellite.id" class="rounded-panel bg-surf px-3.5 py-2.5" :aria-label="satellite.title">
        <UiTag tone="neutral" outline size="xs" class="text-muted">
          {{ satellite.title }}
        </UiTag>
        <div
          v-for="(body, i) in satellite.body"
          :key="i"
          class="mt-1.5 overflow-x-auto text-sm leading-normal whitespace-pre-wrap"
        >
          <StructuredContent :body="body.text" />
        </div>
      </section>
    </div>
  </div>
</template>
