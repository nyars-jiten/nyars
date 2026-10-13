<script setup lang="ts">
// Выбор тегов: сверху поле поиска, ниже бейджи. Клик — «только», ещё клик — «исключить» (красный), ещё — сброс.
// Выбранные бейджи всегда видны первыми. Используется для тегов и частей речи.
const props = withDefaults(defineProps<{
  tags: readonly SearchTag[]
  /** сколько невыбранных бейджей показывать без ввода */
  limit?: number
  placeholder?: string
  /** без поля поиска — для коротких списков (JLPT) */
  noSearch?: boolean
}>(), {
  limit: 24,
  placeholder: 'Найти тег',
})

const model = defineModel<Record<number, TriState>>({ required: true })

const text = ref('')
const expanded = ref(false)
/** свёрнуто по умолчанию: видны только выбранные теги */
const collapsed = ref(true)

function label(tag: SearchTag) {
  return tag.rus || tag.rusShort || tag.engShort || tag.eng
}

const selected = computed(() => props.tags.filter(tag => model.value[tag.id]))

const rest = computed(() => {
  const q = text.value.trim().toLowerCase()
  const list = props.tags.filter(tag => !model.value[tag.id]
    && (!q || [tag.rus, tag.rusShort, tag.eng, tag.engShort].some(s => s?.toLowerCase().includes(q))))
  return q || expanded.value || props.noSearch ? list : list.slice(0, props.limit)
})

const hidden = computed(() => {
  if (text.value.trim() || expanded.value || props.noSearch)
    return 0
  return props.tags.filter(tag => !model.value[tag.id]).length - rest.value.length
})

function set(id: number, value: TriState | undefined) {
  const next = { ...model.value }
  if (value)
    next[id] = value
  else
    delete next[id]
  model.value = next
}
</script>

<template>
  <div class="space-y-2">
    <button
      v-if="!noSearch"
      type="button"
      class="inline-flex cursor-pointer items-center gap-1 text-[13px] font-semibold text-strong hover:underline"
      :aria-expanded="!collapsed"
      @click="collapsed = !collapsed"
    >
      <Icon name="tabler:chevron-right" size="14px" class="transition-transform" :class="{ 'rotate-90': !collapsed }" />
      {{ collapsed ? 'Развернуть' : 'Свернуть' }}
      <span v-if="collapsed && selected.length" class="text-muted">· выбрано {{ selected.length }}</span>
    </button>
    <UiInput v-if="!noSearch && !collapsed" v-model="text" type="search" :placeholder="placeholder" :aria-label="placeholder" />
    <div class="flex flex-wrap gap-1.5">
      <UiTriChip
        v-for="tag in selected"
        :key="tag.id"
        :model-value="model[tag.id]"
        :title="tag.eng"
        @update:model-value="set(tag.id, $event)"
      >
        {{ label(tag) }}
      </UiTriChip>
      <UiTriChip
        v-for="tag in collapsed && !noSearch ? [] : rest"
        :key="tag.id"
        :model-value="undefined"
        :title="tag.eng"
        @update:model-value="set(tag.id, $event)"
      >
        {{ label(tag) }}
      </UiTriChip>
    </div>
    <button v-if="hidden > 0 && !collapsed" type="button" class="cursor-pointer text-[13px] text-strong hover:underline" @click="expanded = true">
      Показать ещё {{ hidden }}
    </button>
    <p v-if="!collapsed && text.trim() && !rest.length && !selected.length" class="m-0 text-sm text-muted">
      Ничего не найдено
    </p>
  </div>
</template>
