<script setup lang="ts">
// Трёхпозиционный чип: нейтральный → «только» → «исключить» → нейтральный.
// Значение: undefined — без разницы, 'include' — только с этим, 'exclude' — только без этого.
const props = defineProps<{
  title?: string
}>()

const model = defineModel<TriState | undefined>()

function next() {
  model.value = model.value === undefined ? 'include' : model.value === 'include' ? 'exclude' : undefined
}

const stateLabel = computed(() => model.value === 'include' ? 'только' : model.value === 'exclude' ? 'исключено' : '')
</script>

<template>
  <button
    type="button"
    :title="props.title"
    :aria-pressed="model === undefined ? 'false' : 'true'"
    class="
      inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-ctl border px-3 text-[13.5px] whitespace-nowrap
      transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong
    "
    :class="model === 'include'
      ? 'border-acc bg-acc font-semibold text-onacc'
      : model === 'exclude'
        ? 'border-rose-500 bg-rose-500/15 font-semibold text-rose-500 line-through'
        : 'border-line bg-surf text-ink hover:border-strong'"
    @click="next"
  >
    <Icon v-if="model === 'exclude'" name="tabler:minus" size="14px" class="shrink-0" />
    <slot />
    <span v-if="stateLabel" class="sr-only">, {{ stateLabel }}</span>
  </button>
</template>
