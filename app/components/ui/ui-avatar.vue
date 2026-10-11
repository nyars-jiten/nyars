<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = withDefaults(defineProps<{
  /** имя пользователя: из него берётся первая буква и alt */
  name?: string
  /** свой знак вместо первой буквы, например 花 */
  text?: string
  /** картинка аватара */
  src?: string
  /** sm 22 · md 28 · lg 32 */
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md',
})

const failed = ref(false)
watch(() => props.src, () => failed.value = false)

// картинка из SSR могла не загрузиться ещё до гидрации — тогда событие error уже пропущено
const img = useTemplateRef('img')
onMounted(() => {
  if (img.value?.complete && !img.value.naturalWidth)
    failed.value = true
})

const letter = computed(() => props.text ?? props.name?.trim().charAt(0).toUpperCase() ?? '?')
const empty = computed(() => !props.text && !props.name && !props.src)

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden leading-none font-extrabold select-none',
  variants: {
    size: {
      sm: 'size-[22px] rounded-tag text-[11px]',
      md: 'size-7 rounded-ctl text-xs',
      lg: 'size-8 rounded-ctl font-jp text-[15px] font-bold',
    },
    empty: {
      true: 'bg-transparent text-muted shadow-[inset_0_0_0_1.5px_var(--line)]',
      false: 'bg-soft text-strong',
    },
  },
})
</script>

<template>
  <span :class="avatar({ size, empty })" :title="name">
    <img v-if="src && !failed" ref="img" :src="src" :alt="name ?? ''" class="size-full object-cover" @error="failed = true">
    <span v-else :aria-hidden="name ? 'true' : undefined">{{ letter }}</span>
  </span>
</template>
