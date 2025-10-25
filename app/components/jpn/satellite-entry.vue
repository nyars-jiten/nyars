<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { getSatellites } = useJpnEntries()

const { data: satelliteEntries } = getSatellites(props.wid)

// const maxSatelliteSize = 10

// const opened = ref([] as string[])

// const getSatBody = function(text: string) {
//   try {
//     return JSON.parse(text)
//   } catch(e) {
//     strData.value = props.body
//   }
// }
</script>

<template>
  <div v-if="satelliteEntries && satelliteEntries.length > 0">
    <div
      v-for="satellite in satelliteEntries?.sort((a, b) => a.title > b.title ? 1 : -1)"
      :key="satellite.id"
      class="py-2 border-b-1 border-neutral-800"
    >
      <span class="text-[#6aa3ab]">
        {{ satellite.title }}
      </span>
      <div
        v-for="(sat, si) in satellite.body"
        :key="si"
        class="py-2"
      >
        <!-- first-line:bg-neutral-700 -->
        <StructuredContent class="whitespace-pre-wrap" :body="sat.text" />
        <!-- <span class="text-rose-300">{{ sat.text }}</span> -->
        <!-- <template v-if="sat.lines > maxSatelliteSize && !opened.find(x => x === satellite.id + si)">
          <span class="whitespace-pre-wrap" v-html="sat.text.split('\n').slice(0,maxSatelliteSize).join('\n')" /> -->
        <!-- <div class="text-gray-500 cursor-pointer ml-2 mb-2" @click="opened.push(satellite.id + si)">
            Раскрыть...
          </div> -->
        <!-- </template>
        <span v-else class="whitespace-pre-wrap " v-html="sat.text" /> -->
      </div>
    </div>
  </div>
  <div v-else class="italic font-extralight">
    {{ t('models.satellite.tabNoData') }}
  </div>
</template>
