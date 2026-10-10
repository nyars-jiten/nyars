<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  /** pend — не проверено, ok — принята, work — нужна доработка, rej — отклонена; all — «все» (только точка) */
  status: 'pend' | 'ok' | 'work' | 'rej' | 'all'
  /** pill — метка с иконкой, dot — цветная точка */
  variant?: 'pill' | 'dot'
  size?: 'sm' | 'md'
}>(), {
  variant: 'pill',
  size: 'md',
})

defineSlots<{ default?: () => VNode[] }>()

const LABELS: Record<UiStatusKind | 'all', string> = {
  all: 'Все',
  pend: 'Не проверено',
  ok: 'Принята',
  work: 'Нужна доработка',
  rej: 'Отклонена',
}

const label = computed(() => LABELS[props.status])

const pill = tv({
  base: 'inline-flex items-center rounded-tag font-bold leading-none whitespace-nowrap',
  variants: {
    status: {
      all: 'bg-line/60 text-ink',
      pend: 'bg-soft text-strong',
      ok: 'bg-ok-soft text-ok',
      work: 'bg-warn-soft text-warn',
      rej: 'bg-danger-soft text-danger',
    },
    size: {
      md: 'h-[26px] gap-1.5 pr-2.5 pl-2 text-[12.5px]',
      sm: 'h-[22px] gap-[5px] pr-2 pl-1.5 text-xs',
    },
  },
})

const dot = tv({
  base: 'inline-block size-2 shrink-0 rounded-full',
  variants: {
    status: {
      all: 'shadow-[inset_0_0_0_1.5px_var(--line)]',
      pend: 'bg-strong',
      ok: 'bg-ok',
      work: 'bg-warn',
      rej: 'bg-danger',
    },
  },
})
</script>

<template>
  <i v-if="variant === 'dot'" :class="dot({ status })" role="img" :aria-label="label" :title="label" />

  <span v-else :class="pill({ status, size })">
    <svg
      v-if="status !== 'all'"
      :width="size === 'md' ? 13 : 12"
      :height="size === 'md' ? 13 : 12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="shrink-0"
    >
      <template v-if="status === 'ok'">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </template>
      <template v-else-if="status === 'pend'">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </template>
      <template v-else-if="status === 'work'">
        <path d="M9 14L4 9l5-5" />
        <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
      </template>
      <template v-else-if="status === 'rej'">
        <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
      </template>
    </svg>

    <slot>{{ label }}</slot>
  </span>
</template>
