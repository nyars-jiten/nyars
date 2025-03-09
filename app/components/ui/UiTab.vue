<script lang="ts" setup>
interface Props {
  title: string
}

defineProps<Props>()

const { checkActiveTab } = useUiTabsStore()
</script>

<template>
  <div>
    <div v-lazy-show="checkActiveTab(title)">
      <slot />
    </div>
  </div>
</template>
