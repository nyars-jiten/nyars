<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { getSatellites } = useJpnRepo()

const { data: satelliteEntries } = useAsyncData(`jpn-satellites-${props.wid}`, () => getSatellites(props.wid))
</script>

<template>
  <UiBlock v-if="satelliteEntries && satelliteEntries.length > 0">
    <div>
      <div
        v-for="satellite in satelliteEntries?.sort((a, b) => a.title > b.title ? 1 : -1)"
        :key="satellite.id"
        class="py-3 border-b-1 border-neutral-800"
      >
        <span class="text-[#6aa3ab]">
          {{ satellite.title }}
        </span>
        <div
          v-for="(sat, si) in satellite.body"
          :key="si"
          class=""
        >
          <span class="whitespace-pre-wrap " v-html="sat" />
        </div>
      </div>
    </div>
  </UiBlock>
</template>
