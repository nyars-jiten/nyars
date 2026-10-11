<script setup lang="ts">
// Двойной ползунок «от — до». Значения в диапазоне min…max, v-model — кортеж [от, до].
const props = withDefaults(defineProps<{
  min?: number
  max?: number
  step?: number
  /** подписи для скринридеров */
  labelFrom?: string
  labelTo?: string
}>(), {
  min: 0,
  max: 100,
  step: 1,
  labelFrom: 'От',
  labelTo: 'До',
})

const model = defineModel<[number, number]>({ required: true })

const percent = (value: number) => ((value - props.min) / (props.max - props.min)) * 100
const lo = computed(() => Math.min(...model.value))
const hi = computed(() => Math.max(...model.value))

function update(index: 0 | 1, event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  const next: [number, number] = [...model.value]
  next[index] = value
  // ползунки не перескакивают друг через друга
  if (index === 0 && value > next[1])
    next[0] = next[1]
  if (index === 1 && value < next[0])
    next[1] = next[0]
  model.value = next
}

const thumb = [
  'absolute inset-x-0 top-0 m-0 h-[30px] w-full cursor-pointer appearance-none bg-transparent pointer-events-none',
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none',
  '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-strong',
  '[&::-webkit-slider-thumb]:bg-surf [&::-webkit-slider-thumb]:cursor-grab',
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:rounded-full',
  '[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-strong [&::-moz-range-thumb]:bg-surf',
  '[&::-moz-range-track]:bg-transparent',
  'focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-offset-2 focus-visible:[&::-webkit-slider-thumb]:outline-strong',
]
</script>

<template>
  <div class="relative mt-1.5 h-[30px]">
    <div class="absolute inset-x-[9px] top-3 h-1.5 rounded-[3px] bg-soft" aria-hidden="true">
      <div
        class="absolute inset-y-0 rounded-[3px] bg-strong"
        :style="{ left: `${percent(lo)}%`, right: `${100 - percent(hi)}%` }"
      />
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="model[0]"
      :aria-label="labelFrom"
      :class="thumb"
      @input="update(0, $event)"
    >
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="model[1]"
      :aria-label="labelTo"
      :class="thumb"
      @input="update(1, $event)"
    >
  </div>
</template>
