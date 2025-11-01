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
      [LLMStatus.PENDING]: 'text-gray-400',
      [LLMStatus.PROCESSING]: 'text-blue-400',
      [LLMStatus.COMPLETED]: 'text-green-400',
      [LLMStatus.FAILED]: 'text-red-400',
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
  <div v-if="llmData" class="space-y-4">
    <!-- Status Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <div class="flex space-x-1 text-sm">
          <div class="text-gray-400">
            Status:
          </div>
          <div :class="statusStyles.variants.status[llmData.status]" class="font-medium">
            {{ t(`components.llmEntry.status.${llmData.status}`) }}
          </div>
          <Icon
            class="cursor-pointer"
            :class="{ 'animate-spin': status === 'pending' }"
            size="1.3rem"
            name="mdi:restart"
            @click="refresh()"
          />
          <div v-if="llmData.status === LLMStatus.PENDING || llmData.status === LLMStatus.PROCESSING">
            <span class="text-gray-400">| Started:</span> {{ startedTimeAgo }}
          </div>
        </div>
        <div v-if="llmData.model" class="text-xs text-gray-500">
          <span class="bg-slate-700 px-2 py-1 rounded">
            {{ llmData.model }}
          </span>
        </div>
      </div>
    </div>

    <!-- Message Display -->
    <div v-if="llmData.msg" class="p-3 rounded-lg" :class="llmData.status === 3 ? 'bg-red-900/20 border border-red-600/30 text-red-200' : 'bg-blue-900/20 border border-blue-600/30 text-blue-200'">
      {{ llmData.msg }}
    </div>

    <!-- LLM Data Content (only shown when status === 2) -->
    <div v-if="llmData.status === 2 && llmData.body" class="space-y-4">
      <!-- Word Header -->
      <div class="space-x-2">
        <h3 class="inline text-xl font-semibold text-white mb-2">
          {{ llmData.body.word }}
        </h3>
        <div class="inline text-sm text-gray-400">
          <span class="bg-slate-700 px-2 py-1 rounded">
            {{ llmData.body.pos_hint }}
          </span>
        </div>
      </div>

      <!-- Values/Meanings -->
      <div class="space-y-4">
        <div
          v-for="(value, valueId) in llmData.body.values"
          :key="valueId"
          class="bg-neutral-900 rounded-lg p-4 space-y-3"
        >
          <!-- Translation and Forms -->
          <div class="flex items-start justify-between">
            <div>
              <div class="space-x-2">
                <span class="min-w-[30px] text-center align-top text-violet-300">
                  {{ valueId + 1 }}
                </span>
                <div class="inline">
                  {{ value.canonical_translation }}
                </div>
                <div class="inline text-sm text-gray-400 mt-1">
                  <span v-for="(form, index) in value.japanese_forms" :key="index">
                    <span class="text-blue-300">{{ form }}</span>
                    <span v-if="index < value.japanese_forms.length - 1" class="mx-1">•</span>
                  </span>
                </div>
                <div class="inline text-sm font-mono p-0.5" :class="value.confidence > 0.9 ? 'text-green-400' : value.confidence > 0.8 ? 'text-yellow-400' : 'text-red-400'">
                  {{ formatConfidence(value.confidence) }}
                </div>
              </div>

              <div class="text-sm text-neutral-500 italic">
                {{ value.gloss }}
              </div>
            </div>
          </div>

          <!-- Examples -->
          <div v-if="value.examples?.length > 0" class="space-y-2 ml-6">
            <div v-for="(example, exampleIndex) of value.examples" :key="exampleIndex" class="mb-3 border-l-2 border-blue-200/50 pl-2">
              <div class="block pb-1">
                <div class="inline">
                  {{ example.ja }}
                </div>

                <span class="group cursor-help relative size-fit rounded-sm text-xs leading-none">
                  <span class="align-top text-blue-300">[{{ example.source_id }}]</span>
                  <UiTooltip>
                    {{ getSourceName(example.source_id) }}
                  </UiTooltip>
                </span>
              </div>
              <div class="text-sm block text-neutral-500">
                {{ example.ru }}
              </div>
            </div>
          </div>

          <!-- Collocations -->
          <div v-if="value.collocations?.length > 0">
            <div class="inline text-sm font-semibold text-gray-400 mb-2">
              Collocations:
            </div>
            <div class="inline-flex flex-wrap gap-2">
              <div
                v-for="(collocation, index) in value.collocations"
                :key="index"
                class="inline bg-slate-700 px-2 py-1 rounded text-sm text-gray-300"
              >
                {{ collocation }}
              </div>
            </div>
          </div>

          <!-- Grammatical Notes -->
          <div v-if="value.grammatical_note" class="text-sm text-gray-400">
            <strong>Grammar:</strong> {{ value.grammatical_note }}
          </div>

          <!-- domain -->
          <div v-if="value.domain_register" class="text-sm text-gray-400">
            <strong>Domain:</strong> {{ value.domain_register }}
          </div>

          <!-- Raw -->
          <div v-if="value.raw_evidence" class="text-sm text-gray-400">
            <strong>Raw:</strong> {{ value.raw_evidence }}
          </div>

          <!-- Sources -->
          <div v-if="value.sources.length > 0" class="text-xs text-gray-500">
            <strong>Sources:</strong>
            <span v-for="(source, index) in value.sources" :key="index">
              <!-- Source {{ getSourceName(source.source_id) }} -->
              --//--
              <span v-if="source.fragment" class="text-gray-400">({{ source.fragment }})</span>
              <span v-if="index < value.sources.length - 1">, </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Conflicts -->
      <div v-if="llmData.body.conflicts.length > 0" class="border-t border-neutral-800 space-y-2 pt-4">
        <h4 class="font-semibold text-yellow-400 mb-3">
          Conflicts & Recommendations
        </h4>
        <div
          v-for="(conflict, index) in llmData.body.conflicts"
          :key="index"
          class="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 space-y-2"
        >
          <div class="text-yellow-200">
            <strong>Issue:</strong> {{ conflict.issue }}
          </div>
          <div class="text-yellow-300 text-sm">
            <strong>Sources:</strong>
            <ul class="list-disc list-inside ml-2">
              <li v-for="(source, sIndex) in conflict.sources" :key="sIndex">
                {{ source }}
              </li>
            </ul>
          </div>
          <div v-if="conflict.recommendation" class="text-yellow-100 text-sm">
            <strong>Recommendation:</strong> {{ conflict.recommendation }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-gray-400 text-center py-8">
    <div>{{ t('pages.jpnEntry.llmDataNotAvailable') }}</div>
  </div>

  <div v-if="!llmData || llmData.status === LLMStatus.FAILED || llmData.status === LLMStatus.COMPLETED" class="text-center">
    <UiButton class="mt-4 text-blue-300" icon="ic:outline-cloud-sync" @click="handleLLMRequest">
      {{ t('components.llmEntry.requestLLMData') }}
    </UiButton>
  </div>
</template>
