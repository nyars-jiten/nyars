<script setup lang="ts">
// Выпадающее меню: кнопка-триггер (слот trigger) и панель (слот по умолчанию).
// Открывается по клику, закрывается кликом снаружи, Esc и при переходе на другую страницу.
withDefaults(defineProps<{
  /** к какому краю триггера прижать панель */
  align?: 'start' | 'end'
}>(), {
  align: 'end',
})

defineSlots<{
  trigger: (props: { open: boolean, toggle: () => void, attrs: Record<string, string | boolean> }) => VNode[]
  default: (props: { close: () => void }) => VNode[]
}>()

const open = ref(false)
const root = useTemplateRef('root')
const panelId = useId()

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

onClickOutside(root, close)

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    close()
    root.value?.querySelector<HTMLElement>('[aria-haspopup]')?.focus()
  }
}

const route = useRoute()
watch(() => route.fullPath, close)

const attrs = computed(() => ({
  'aria-haspopup': 'true',
  'aria-expanded': open.value,
  'aria-controls': panelId,
}))
</script>

<template>
  <div ref="root" class="relative" @keydown="onKeydown">
    <slot name="trigger" :open="open" :toggle="toggle" :attrs="attrs" />

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-75 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open"
        :id="panelId"
        class="absolute top-full z-50 mt-2 min-w-52 rounded-panel border border-line bg-surf p-1.5 text-ink shadow-lg"
        :class="align === 'end' ? 'right-0' : 'left-0'"
      >
        <slot :close="close" />
      </div>
    </Transition>
  </div>
</template>
