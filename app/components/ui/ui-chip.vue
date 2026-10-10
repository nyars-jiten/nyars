<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// Чип — для выбора нескольких из 2–4 коротких вариантов.
// С v-model:pressed работает как переключатель; без него — как обычная кнопка или ссылка (to).
const props = defineProps<{
  to?: RouteLocationRaw
  icon?: string
}>()

const pressed = defineModel<boolean | undefined>('pressed', { default: undefined })

function toggle() {
  if (pressed.value !== undefined)
    pressed.value = !pressed.value
}

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    class="
      inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-ctl border border-line bg-surf px-3
      text-[13.5px] text-ink no-underline whitespace-nowrap transition-colors
      hover:border-strong
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-strong
      aria-pressed:border-acc aria-pressed:bg-acc aria-pressed:font-semibold aria-pressed:text-onacc
    "
    v-bind="props.to ? { to: props.to } : { 'type': 'button', 'aria-pressed': pressed }"
    @click="toggle"
  >
    <Icon v-if="icon" :name="icon" size="14px" class="shrink-0" />
    <slot />
  </component>
</template>
