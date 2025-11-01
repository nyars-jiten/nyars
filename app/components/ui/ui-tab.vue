<script lang="ts" setup>
interface Props {
  title: string
  lazy?: boolean
}

const { title, lazy = true } = defineProps<Props>()

// Get functions from parent UiTabs component via provide/inject
const isActiveTab = inject<(tabId: string) => boolean>('isActiveTab', () => false)
const isTabLoaded = inject<(tabId: string) => boolean>('isTabLoaded', () => false)
const tabsLazyMode = inject<boolean>('tabsLazyMode', true)

// For lazy loading: only render content if tab has been loaded at least once
const shouldRenderContent = computed(() => {
  const useLazy = lazy !== undefined ? lazy : tabsLazyMode
  if (!useLazy)
    return true
  return isTabLoaded(title)
})
</script>

<template>
  <div v-show="isActiveTab(title)">
    <template v-if="shouldRenderContent">
      <slot />
    </template>
  </div>
</template>
