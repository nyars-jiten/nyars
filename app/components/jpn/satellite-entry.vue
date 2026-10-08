<script lang="ts" setup>
const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { getSatellites } = useJpnEntries()

const { data: satelliteEntries } = getSatellites(props.wid)

const sorted = computed(() =>
  [...(satelliteEntries.value ?? [])].sort((a, b) => (a.title > b.title ? 1 : -1)),
)
</script>

<template>
  <div v-if="sorted.length > 0" class="flex flex-col gap-2.5">
    <div
      v-for="satellite in sorted"
      :key="satellite.id"
      class="hz-ex"
    >
      <span class="hz-tag hz-tag-ghost inline-flex h-5! text-[11px]!">
        {{ satellite.title }}
      </span>
      <div
        v-for="(sat, si) in satellite.body"
        :key="si"
        class="mt-1.5 font-mono text-[13.5px] whitespace-pre-wrap"
      >
        <StructuredContent :body="sat.text" />
      </div>
    </div>
  </div>
  <div v-else class="py-2 text-[14.5px] text-muted italic">
    {{ t('models.satellite.tabNoData') }}
  </div>
</template>
