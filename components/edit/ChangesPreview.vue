<script setup lang="ts">
  interface Props {
    editId: number
  }

  const props = defineProps<Props>()

  const api = useApi()

  const { data: compare } = await useLazyAsyncData(
    'compare',
    () => api.editRepository.getCompare(props.editId),
    {
      default: (): EditCompare => {
        return {
          source: [],
          result: [],
          comment: ''
        }
      }
    }
  )
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="grid grid-cols-[1fr_auto_1fr] gap-4 px-2">
      <PanelBody>
        <span
          v-for="(text, index) of compare.source"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.isDiffered ? 'text-red-500':''}`"
        >
          {{ text.value }}
        </span>
      </PanelBody>
      <div class="flex flex-col justify-evenly">
        <div>⟶</div>
      </div>
      <PanelBody>
        <span
          v-for="(text, index) of compare.result"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.isDiffered ? 'text-green-500':''}`"
        >
          {{ text.value }}
        </span>
      </PanelBody>
    </div>
    <div v-if="compare.comment.length > 0" class="mx-2 select-text overflow-hidden border-l-2 border-ns-gray-200 px-4 dark:border-ns-gray-700">
      Обоснование: {{ compare.comment }}
    </div>
  </section>
</template>
