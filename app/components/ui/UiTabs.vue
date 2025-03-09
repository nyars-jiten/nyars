<script lang="ts" setup>
interface Props {
  tabs: string[]
}

const props = defineProps<Props>()

const { setActiveTab, checkActiveTab } = useUiTabsStore()

const { t } = useI18n()

const icons: Record<string, string> = {
  edits: 'ic:baseline-plus-minus-alt',
  satellites: 'ic:baseline-translate', // material-symbols:planet-outline ic:baseline-translate
  scans: 'ic:baseline-flip', // ic:outline-book
}

onMounted(() => {
  setActiveTab(props.tabs[0] ?? '')
})
</script>

<template>
  <div>
    <div class="inline-flex ml-2">
      <div
        v-for="(tab, ti) in tabs"
        :key="ti"
        class="inline-flex p-2 items-center border-b-2 justify-center cursor-pointer select-none text-lg uppercase font-extralight"
        :class="{ 'border-transparent': !checkActiveTab(tab) }"
        @click="setActiveTab(tab)"
      >
        <Icon :name="icons[tab] ?? ''" class="mx-1" size="1.3rem" />
        {{ t(`components.uiKit.tabs.${tab}`) }}
      </div>
    </div>
    <UiBlock>
      <slot />
    </UiBlock>
  </div>
</template>
