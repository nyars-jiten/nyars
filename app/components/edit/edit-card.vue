<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

// Карточка правки, вариант E: без заливки, рамка и полоса цвета статуса слева.
// Свёрнутая показывает статус, слово, дату и строку сведений (слот meta);
// раскрытая — ещё и содержимое по умолчанию: комментарий, сравнение, кнопки модератора.
const props = defineProps<{
  status: UiStatusKind
  /** заглавное слово статьи */
  headword: string
  /** ссылка на статью */
  to?: RouteLocationRaw
  /** дата для показа: «сегодня, 14:20» */
  date?: string
  /** машиночитаемая дата для <time> */
  datetime?: string
}>()

defineSlots<{
  meta?: () => VNode[]
  default?: () => VNode[]
}>()

const open = defineModel<boolean>('open', { default: false })

const STRIPE: Record<UiStatusKind, string> = {
  pend: 'var(--strong)',
  ok: 'var(--ok)',
  work: 'var(--warn)',
  rej: 'var(--danger)',
}

const contentId = useId()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <article
    :aria-label="`Правка: ${headword}`"
    class="rounded-panel transition-shadow"
    :class="open
      ? 'shadow-[inset_3px_0_0_var(--sc),inset_0_0_0_1.5px_var(--strong)]'
      : 'shadow-[inset_3px_0_0_var(--sc),inset_0_0_0_1px_var(--line)]'"
    :style="{ '--sc': STRIPE[props.status] }"
  >
    <div class="grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-2.5 gap-y-1 py-3.5 pr-[18px] pl-2.5">
      <UiIconButton
        icon="tabler:chevron-right"
        :expanded="open"
        :label="open ? 'Свернуть правку' : 'Развернуть правку'"
        :aria-controls="contentId"
        @click="open = !open"
      />

      <div class="flex min-w-0 flex-col gap-1.5 pt-1">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <UiStatus :status="status" />

          <component
            :is="to ? NuxtLink : 'span'"
            :to="to"
            lang="ja"
            class="hw text-2xl no-underline hover:text-strong"
          >
            {{ headword }}
          </component>

          <span class="flex-1" />

          <time v-if="date" :datetime="datetime" class="text-[13px] text-muted">{{ date }}</time>
        </div>

        <UiMeta v-if="$slots.meta">
          <slot name="meta" />
        </UiMeta>
      </div>
    </div>

    <div
      v-if="open"
      :id="contentId"
      class="flex flex-col gap-3.5 pr-[22px] pb-5 pl-16 max-[900px]:px-4 max-[900px]:pb-[18px]"
    >
      <slot />
    </div>
  </article>
</template>
