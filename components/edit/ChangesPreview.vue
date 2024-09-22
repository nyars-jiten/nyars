<script setup lang="ts">
  interface Props {
    editId: number
    isTypeCreate: boolean
  }

  const props = defineProps<Props>()

  const { getCompare } = useApi(editRepository)

  const { data: compare } = await useLazyAsyncData(
    `compare-${props.editId}`,
    () => getCompare(props.editId),
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
  <section class="m-2 flex flex-col gap-3">
    <div v-if="compare.comment.length > 0" class="select-text break-words border-l-2 border-ns-gray-200 pl-2 dark:border-ns-gray-700">
      {{ $t('components.editGroup.changesPreview.comment') }} {{ compare.comment }}
    </div>
    <div :class="`grid grid-rows-1 gap-5 ${isTypeCreate ? 'sm:grid-cols-1' : 'sm:grid-cols-[1fr_auto_1fr]'} sm:gap-2 md:gap-4`">
      <div v-if="!isTypeCreate" class="select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600">
        <span
          v-for="(text, index) of compare.source"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.value.length > 25 ? 'break-all':''} ${text.isDiffered ? 'text-red-500':''}`"
        >
          {{ text.value }}
        </span>
      </div>
      <div v-if="!isTypeCreate" class="flex flex-col items-center justify-evenly">
        <div class="after:content-['↓'] sm:after:content-['⟶']"></div>
      </div>
      <div class="select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600">
        <span
          v-for="(text, index) of compare.result"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.value.length > 25 ? 'break-all':''} ${text.isDiffered ? 'text-green-500':''}`"
        >
          {{ text.value }}
        </span>
      </div>
    </div>
  </section>
</template>
