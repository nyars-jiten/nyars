<script setup lang="ts">
  interface Props {
    satelliteData: SatelliteData[]
    showData: boolean
  }

  const props = defineProps<Props>()

  const selectedText = useTextSelection()

  const localShowData = ref(props.showData)

  const toggleShowData = () => {
    if (selectedText.text.value.length > 0) {
      return
    }
    localShowData.value = !localShowData.value
  }

  watch(() => props.showData, (newShowData) => {
    localShowData.value = newShowData
  })
</script>

<template>
  <div
    v-if="satelliteData.length > 0"
    :class="`flex ${localShowData?'flex-col-reverse':''} gap-4 select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600`"
    @click="toggleShowData"
  >
    <div class="contents">
      <div v-if="!localShowData" class="grow">
        {{ satelliteData[0].body.split(/\n/)[0] }}
      </div>
      <div v-if="localShowData" class="grow whitespace-pre-wrap">
        <div
          v-for="satellite of satelliteData"
          :key="satellite.key"
          class="mb-3 grow whitespace-pre-wrap border-b border-ns-gray-200 pb-3 last:mb-0 last:border-none last:pb-0 dark:border-ns-gray-600"
        >
          {{ satellite.body }}
        </div>
      </div>
    </div>
    <div class="italic">
      {{ satelliteData[0].satellite.title }}
    </div>
  </div>
</template>
