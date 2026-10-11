<script setup lang="ts">
// Вкладки с подчёркиванием: «История 14 · Обсуждение 2 · Сателлиты · Сканы».
// Только полоса вкладок; панели рисует родитель: role="tabpanel",
// id `${idBase}-panel-${id}` и aria-labelledby `${idBase}-tab-${id}`.
// Клавиатура: ←/→, Home/End переключают вкладку (активация сразу при фокусе).
const props = defineProps<{
  items: readonly UiTabItem[]
  /** подпись для скринридеров */
  label: string
  /** основа id: вкладка — `${idBase}-tab-${id}`, панель — `${idBase}-panel-${id}` */
  idBase: string
}>()

const model = defineModel<string>()

const refs = ref<HTMLButtonElement[]>([])

const enabled = computed(() => props.items.filter(item => !item.disabled))

function select(id: string, focus = false) {
  model.value = id
  if (focus) {
    const index = props.items.findIndex(item => item.id === id)
    refs.value[index]?.focus()
  }
}

function onKeydown(event: KeyboardEvent, id: string) {
  const list = enabled.value
  const index = list.findIndex(item => item.id === id)
  let next: UiTabItem | undefined
  if (event.key === 'ArrowRight')
    next = list[(index + 1) % list.length]
  else if (event.key === 'ArrowLeft')
    next = list[(index - 1 + list.length) % list.length]
  else if (event.key === 'Home')
    next = list[0]
  else if (event.key === 'End')
    next = list.at(-1)
  if (!next)
    return
  event.preventDefault()
  select(next.id, true)
}
</script>

<template>
  <div role="tablist" :aria-label="label" class="flex flex-wrap gap-x-[22px] border-b border-line">
    <button
      v-for="item in items"
      :id="`${idBase}-tab-${item.id}`"
      :key="item.id"
      ref="refs"
      type="button"
      role="tab"
      :aria-selected="model === item.id"
      :aria-controls="`${idBase}-panel-${item.id}`"
      :aria-disabled="item.disabled || undefined"
      :tabindex="model === item.id ? 0 : -1"
      :title="item.hint"
      class="
        group -mb-px inline-flex h-10 cursor-pointer items-center gap-1.5 border-b-2 border-transparent px-0.5
        text-[14.5px] font-semibold whitespace-nowrap text-muted transition-colors
        hover:text-ink aria-selected:border-strong aria-selected:text-strong
        aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:text-muted
        focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong
      "
      @click="!item.disabled && select(item.id)"
      @keydown="onKeydown($event, item.id)"
    >
      {{ item.label }}
      <span
        v-if="item.count !== undefined"
        class="text-xs font-semibold tabular-nums opacity-70 group-aria-selected:opacity-100"
      >{{ item.count }}</span>
    </button>
  </div>
</template>
