<script setup lang="ts">
withDefaults(defineProps<{
  fromLabel?: string
  toLabel?: string
}>(), {
  fromLabel: 'с',
  toLabel: 'по',
})

/** даты в формате YYYY-MM-DD */
const from = defineModel<string>('from', { default: '' })
const to = defineModel<string>('to', { default: '' })
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <label class="grid min-w-0 gap-[3px]">
      <span class="text-xs font-semibold text-muted">{{ fromLabel }}</span>
      <UiInput v-model="from" type="date" :max="to || undefined" class="tabular-nums" />
    </label>

    <label class="grid min-w-0 gap-[3px]">
      <span class="text-xs font-semibold text-muted">{{ toLabel }}</span>
      <UiInput v-model="to" type="date" :min="from || undefined" class="tabular-nums" />
    </label>
  </div>
</template>
