<script setup lang="ts">
  interface Props {
    satelliteData: SatelliteData
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
    :class="`flex ${localShowData?'flex-col-reverse':''} gap-4 select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600`"
    @click="toggleShowData"
  >
    <div class="contents">
      <div v-if="!localShowData" class="grow">
        {{ satelliteData.body.split(/\n/)[0] }}
      </div>
      <div v-if="localShowData" class="grow whitespace-pre-wrap">
        {{ satelliteData.body }}
      </div>
    </div>
    <div class="italic">
      {{ satelliteData.satellite.title }}
    </div>
  </div>
</template>
