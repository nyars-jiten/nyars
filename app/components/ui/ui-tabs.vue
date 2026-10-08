<script lang="ts" setup>
interface Tab {
  id: string
  label?: string
  icon?: string
  disabled?: boolean
  count?: number | string
}

interface Props {
  tabs: (string | Tab)[]
  defaultTab?: string
  modelValue?: string
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: undefined,
  modelValue: undefined,
  lazy: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [activeTab: string]
}>()

const { t } = useI18n()

const normalizedTabs = computed(() => {
  return props.tabs.map((tab) => {
    if (typeof tab === 'string') {
      return {
        id: tab,
        label: t(`components.uiKit.tabs.${tab}`),
        disabled: false,
        count: undefined as number | string | undefined,
      }
    }
    return {
      id: tab.id,
      label: tab.label || t(`components.uiKit.tabs.${tab.id}`),
      disabled: tab.disabled || false,
      count: tab.count,
    }
  })
})

function resolveInitialTab() {
  if (props.modelValue)
    return props.modelValue
  if (props.defaultTab)
    return props.defaultTab
  return normalizedTabs.value[0]?.id || ''
}

const internalActiveTab = ref(resolveInitialTab())
const loadedTabs = ref(new Set<string>(internalActiveTab.value ? [internalActiveTab.value] : []))

const activeTab = computed({
  get: () => props.modelValue ?? internalActiveTab.value,
  set: (value: string) => {
    internalActiveTab.value = value
    emit('update:modelValue', value)
    emit('change', value)
    loadedTabs.value.add(value)
  },
})

watch(
  () => normalizedTabs.value.map(t => t.id).join('|'),
  () => {
    if (!activeTab.value || !normalizedTabs.value.some(t => t.id === activeTab.value)) {
      const next = resolveInitialTab()
      if (next)
        activeTab.value = next
    }
  },
)

const isActiveTab = (tabId: string) => activeTab.value === tabId
const isTabLoaded = (tabId: string) => loadedTabs.value.has(tabId)

function setActiveTab(tabId: string) {
  const tab = normalizedTabs.value.find(t => t.id === tabId)
  if (tab && !tab.disabled)
    activeTab.value = tabId
}

provide('isActiveTab', isActiveTab)
provide('isTabLoaded', isTabLoaded)
provide('tabsLazyMode', props.lazy)
</script>

<template>
  <section class="hz-tabs-panel" aria-label="История, сателлиты, сканы">
    <div
      role="tablist"
      class="flex flex-wrap gap-1"
    >
      <button
        v-for="tab in normalizedTabs"
        :key="tab.id"
        type="button"
        role="tab"
        class="hz-tab"
        :class="{ 'hz-tab-on': isActiveTab(tab.id) }"
        :disabled="tab.disabled"
        :aria-selected="isActiveTab(tab.id)"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
        <span
          v-if="tab.count !== undefined && tab.count !== null"
          class="hz-tab-count"
        >{{ tab.count }}</span>
      </button>
    </div>

    <div class="hz-tabs-panel-body">
      <slot :active-tab="activeTab" :is-active-tab="isActiveTab" />
    </div>
  </section>
</template>
