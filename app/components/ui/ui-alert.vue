<script setup lang="ts">
// Статичное сообщение на подложке тона с печатью: лента объявлений под шапкой (banner)
// и предупреждения внутри форм и страниц (inline). Не всплывает, висит, пока не уйдёт причина.
// Для ошибки формы вешайте role="alert" снаружи.
import { tv } from 'tailwind-variants'

withDefaults(defineProps<{
  tone: UiTone
  title?: string
  /** banner — во всю ширину под шапкой · inline — панель в потоке страницы */
  variant?: 'banner' | 'inline'
  /** показывает крестик; событие dismiss */
  dismissible?: boolean
  dismissLabel?: string
}>(), {
  variant: 'inline',
  dismissLabel: 'Скрыть',
})

defineEmits<{ dismiss: [] }>()

defineSlots<{
  default?: () => VNode[]
  /** кнопки справа от текста */
  actions?: () => VNode[]
}>()

const alert = tv({
  base: 'text-ink',
  variants: {
    tone: {
      ok: 'bg-ok-soft',
      danger: 'bg-danger-soft',
      warn: 'bg-warn-soft',
      info: 'bg-soft',
    },
    variant: {
      banner: 'border-b',
      inline: 'rounded-panel',
    },
  },
  compoundVariants: [
    { variant: 'banner', tone: 'ok', class: 'border-ok/30' },
    { variant: 'banner', tone: 'danger', class: 'border-danger/30' },
    { variant: 'banner', tone: 'warn', class: 'border-warn/30' },
    { variant: 'banner', tone: 'info', class: 'border-strong/30' },
  ],
})
</script>

<template>
  <div :class="alert({ tone, variant })">
    <div
      class="flex items-start gap-3"
      :class="variant === 'banner' ? 'mx-auto max-w-[1320px] px-8 py-2.5 max-[900px]:px-4' : 'px-3.5 py-3'"
    >
      <UiSeal :tone="tone" size="sm" />

      <p class="m-0 min-w-0 flex-1 pt-[3px] text-sm leading-snug">
        <b v-if="title" class="font-bold">{{ title }}</b>
        <template v-if="title && $slots.default">
          {{ ' ' }}
        </template>
        <slot />
      </p>

      <div v-if="$slots.actions" class="-my-1 flex shrink-0 items-center">
        <slot name="actions" />
      </div>

      <UiIconButton
        v-if="dismissible"
        class="-my-0.5 -mr-1.5 hover:bg-ink/10"
        size="sm"
        icon="tabler:x"
        :label="dismissLabel"
        @click="$emit('dismiss')"
      />
    </div>
  </div>
</template>
