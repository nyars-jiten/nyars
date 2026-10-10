<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// Пункт выпадающего меню: ссылка (to) или кнопка
const props = defineProps<{
  to?: RouteLocationRaw
  external?: boolean
  target?: string
  icon?: string
  danger?: boolean
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="props.to ? NuxtLink : 'button'"
    v-bind="props.to ? { to: props.to, external: props.external, target: props.target } : { type: 'button' }"
    class="
      flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-ctl px-2.5 text-left text-sm font-semibold
      no-underline transition-colors hover:bg-soft
      focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong
    "
    :class="danger ? 'text-danger' : 'text-ink hover:text-strong'"
  >
    <Icon v-if="icon" :name="icon" size="17px" class="shrink-0 text-muted" />
    <span class="grow truncate"><slot /></span>
    <slot name="end" />
  </component>
</template>
