<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const props = defineProps<{ wid: string }>()

const { t } = useI18n()

const { getLLMData, sendLLMRequest } = useJpnEntries()
const { data: llmData, refresh, status } = getLLMData(props.wid)

const startedTimeAgo = computed(() => llmData.value ? useTime(new Date(llmData.value?.created_at)) : '—')

function formatConfidence(confidence: number) {
  return `${Math.round(confidence * 100)}%`
}

const statusStyles = tv({
  variants: {
    status: {
      [LLMStatus.PENDING]: 'text-muted',
      [LLMStatus.PROCESSING]: 'text-strong',
      [LLMStatus.COMPLETED]: 'text-strong',
      [LLMStatus.FAILED]: 'text-sec',
    },
  },
})

async function handleLLMRequest() {
  await sendLLMRequest(props.wid)
  refresh()
}

function getSourceName(sourceId: number): string {
  return llmData.value?.sources[sourceId] || `Source ${sourceId}`
}
</script>

<template>
  <div v-if="llmData" class="space-y-4 text-[14.5px]">
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-muted">Status:</span>
        <span :class="statusStyles.variants.status[llmData.status]" class="font-semibold">
          {{ t(`components.llmEntry.status.${llmData.status}`) }}
        </span>
        <button
          type="button"
          class="inline-flex cursor-pointer border-0 bg-transparent p-0 text-strong"
          :title="'Обновить'"
          @click="refresh()"
        >
          <Icon
            :class="{ 'animate-spin': status === 'pending' }"
            size="1.25rem"
            name="mdi:restart"
          />
        </button>
        <span
          v-if="llmData.status === LLMStatus.PENDING || llmData.status === LLMStatus.PROCESSING"
          class="text-muted"
        >
          · {{ startedTimeAgo }}
        </span>
      </div>
      <span v-if="llmData.model" class="hz-tag hz-tag-ghost inline-flex h-5! text-[11px]!">
        {{ llmData.model }}
      </span>
    </div>

    <div
      v-if="llmData.msg"
      class="rounded-[10px] px-3 py-2"
      :class="llmData.status === 3 ? 'bg-secsoft text-sec' : 'bg-soft text-strong'"
    >
      {{ llmData.msg }}
    </div>

    <div v-if="llmData.status === 2 && llmData.body" class="space-y-4">
      <div class="space-x-2">
        <h3 class="m-0 inline text-xl font-semibold text-ink normal-case! tracking-normal!">
          {{ llmData.body.word }}
        </h3>
        <span class="hz-tag hz-tag-ghost inline-flex h-5! text-[11px]!">
          {{ llmData.body.pos_hint }}
        </span>
      </div>

      <div class="space-y-3">
        <div
          v-for="(value, valueId) in llmData.body.values"
          :key="valueId"
          class="hz-ex space-y-2"
        >
          <div>
            <span class="mr-2 font-extrabold text-strong">{{ valueId + 1 }}</span>
            <span>{{ value.canonical_translation }}</span>
            <span class="ml-2 text-[13.5px] text-muted">
              <span v-for="(form, index) in value.japanese_forms" :key="index">
                <span class="text-strong">{{ form }}</span>
                <span v-if="index < value.japanese_forms.length - 1" class="mx-1">·</span>
              </span>
            </span>
            <span
              class="ml-2 font-mono text-[13px]"
              :class="value.confidence > 0.9 ? 'text-strong' : value.confidence > 0.8 ? 'text-muted' : 'text-sec'"
            >
              {{ formatConfidence(value.confidence) }}
            </span>
            <div class="mt-1 text-[13.5px] text-muted italic">
              {{ value.gloss }}
            </div>
          </div>

          <div v-if="value.examples?.length > 0" class="space-y-2 pl-4">
            <div
              v-for="(example, exampleIndex) of value.examples"
              :key="exampleIndex"
              class="border-l-2 border-line pl-2"
            >
              <div>
                {{ example.ja }}
                <span class="text-[12px] text-strong">[{{ example.source_id }}]</span>
                <UiTooltip>
                  {{ getSourceName(example.source_id) }}
                </UiTooltip>
              </div>
              <div class="text-[13.5px] text-muted">
                {{ example.ru }}
              </div>
            </div>
          </div>

          <div v-if="value.collocations?.length > 0" class="flex flex-wrap items-center gap-2">
            <span class="text-[13px] font-semibold text-muted">Collocations:</span>
            <span
              v-for="(collocation, index) in value.collocations"
              :key="index"
              class="hz-tag hz-tag-ghost inline-flex h-5! text-[11px]!"
            >
              {{ collocation }}
            </span>
          </div>

          <div v-if="value.grammatical_note" class="text-[13.5px] text-muted">
            <strong class="text-ink">Grammar:</strong> {{ value.grammatical_note }}
          </div>

          <div v-if="value.domain_register" class="text-[13.5px] text-muted">
            <strong class="text-ink">Domain:</strong> {{ value.domain_register }}
          </div>

          <div v-if="value.raw_evidence" class="text-[13.5px] text-muted">
            <strong class="text-ink">Raw:</strong> {{ value.raw_evidence }}
          </div>
        </div>
      </div>

      <div v-if="llmData.body.conflicts.length > 0" class="space-y-2 border-t border-line pt-4">
        <h4 class="m-0 font-semibold text-sec normal-case! tracking-normal!">
          Conflicts & Recommendations
        </h4>
        <div
          v-for="(conflict, index) in llmData.body.conflicts"
          :key="index"
          class="space-y-2 rounded-[10px] bg-secsoft px-3 py-3 text-ink"
        >
          <div><strong>Issue:</strong> {{ conflict.issue }}</div>
          <div class="text-[13.5px]">
            <strong>Sources:</strong>
            <ul class="ml-2 list-inside list-disc">
              <li v-for="(source, sIndex) in conflict.sources" :key="sIndex">
                {{ source }}
              </li>
            </ul>
          </div>
          <div v-if="conflict.recommendation" class="text-[13.5px]">
            <strong>Recommendation:</strong> {{ conflict.recommendation }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="py-2 text-[14.5px] text-muted italic">
    {{ t('pages.jpnEntry.llmDataNotAvailable') }}
  </div>

  <div
    v-if="!llmData || llmData.status === LLMStatus.FAILED || llmData.status === LLMStatus.COMPLETED"
    class="mt-3"
  >
    <button type="button" class="hz-btn-pri" @click="handleLLMRequest">
      {{ t('components.llmEntry.requestLLMData') }}
    </button>
  </div>
</template>
