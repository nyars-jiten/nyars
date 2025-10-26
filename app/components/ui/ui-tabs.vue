<script lang="ts" setup>
interface Tab {
  id: string
  label?: string
  icon?: string
  disabled?: boolean
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

// Normalize tabs to consistent format
const normalizedTabs = computed(() => {
  return props.tabs.map((tab) => {
    if (typeof tab === 'string') {
      return {
        id: tab,
        label: t(`components.uiKit.tabs.${tab}`),
        icon: getDefaultIcon(tab),
        disabled: false,
      }
    }
    return {
      label: tab.label || t(`components.uiKit.tabs.${tab.id}`),
      icon: tab.icon || getDefaultIcon(tab.id),
      disabled: tab.disabled || false,
      ...tab,
    }
  })
})

// Default icons for backward compatibility
function getDefaultIcon(tabId: string): string {
  const icons: Record<string, string> = {
    edits: 'ic:baseline-plus-minus-alt',
    satellites: 'ic:baseline-translate',
    scans: 'material-symbols:scan-outline',
  }
  return icons[tabId] || ''
}

// Local tab state management
const internalActiveTab = ref('')

// Track which tabs have been loaded (for lazy loading)
const loadedTabs = ref(new Set<string>())

const activeTab = computed({
  get: () => props.modelValue ?? internalActiveTab.value,
  set: (value: string) => {
    internalActiveTab.value = value
    emit('update:modelValue', value)
    emit('change', value)
    // Mark tab as loaded when it becomes active
    loadedTabs.value.add(value)
  },
})

const isActiveTab = (tabId: string) => activeTab.value === tabId

// Check if tab has been loaded (for lazy loading)
const isTabLoaded = (tabId: string) => loadedTabs.value.has(tabId)

function setActiveTab(tabId: string) {
  const tab = normalizedTabs.value.find(t => t.id === tabId)
  if (tab && !tab.disabled) {
    activeTab.value = tabId
  }
}

// Initialize active tab
onMounted(() => {
  const firstTab = normalizedTabs.value[0]
  if (!activeTab.value && firstTab) {
    const initialTab = props.defaultTab || firstTab.id
    activeTab.value = initialTab
    // Mark initial tab as loaded
    loadedTabs.value.add(initialTab)
  }
})

// Provide functions to child components
provide('isActiveTab', isActiveTab)
provide('isTabLoaded', isTabLoaded)
provide('tabsLazyMode', props.lazy)
</script>

<template>
  <div>
    <div class="inline-flex ml-2">
      <div
        v-for="tab in normalizedTabs"
        :key="tab.id"
        class="inline-flex p-2 items-center border-b-2 justify-center cursor-pointer select-none text-lg uppercase font-extralight transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        :class="{
          'border-transparent': !isActiveTab(tab.id),
          'opacity-50 cursor-not-allowed': tab.disabled,
          'hover:border-gray-300': !isActiveTab(tab.id) && !tab.disabled,
        }"
        :disabled="tab.disabled"
        :aria-selected="isActiveTab(tab.id)"
        role="tab"
        @click="setActiveTab(tab.id)"
      >
        <Icon v-if="tab.icon" :name="tab.icon" class="mx-1" size="1.3rem" />
        {{ tab.label }}
      </div>
    </div>
    <UiBlock>
      <slot :active-tab="activeTab" :is-active-tab="isActiveTab" />
    </UiBlock>
  </div>
</template>
