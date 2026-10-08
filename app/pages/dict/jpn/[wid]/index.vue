<script setup lang="ts">
definePageMeta({
  layout: 'hz',
  alias: '/jp/:wid',
  pageTransition: false,
})

const wid = useRoute('dict-jpn-wid').params.wid
const articleWid = useRouteArticle()

const { t } = useI18n()

const { getEntry } = useJpnEntries()
const { user } = storeToRefs(useUserStore())

watch(articleWid, () => {
  if (import.meta.client)
    window.scrollTo(0, 0)
})

const { data: jpnEntry, status } = getEntry(wid, { watch: [articleWid] })

const showLemmas = ref(false)
/** Admin-only tab — enable after mount so SSR/client markup match. */
const showLlmTab = ref(false)

const config = useRuntimeConfig()
const url = computed(() => jpnEntry.value ? new URL(`jp/${jpnEntry.value.wid}`, config.public.baseUrl) : null)

const clipboard = useClipboard()
const { start, stop, isPending } = useTimeout(1000, { controls: true, immediate: false })

watch(articleWid, stop)

onMounted(() => {
  showLlmTab.value = !!user.value?.isAdmin
})

watch(user, (current) => {
  if (!import.meta.client)
    return
  showLlmTab.value = !!current?.isAdmin
})

function copy() {
  clipboard.copy(url.value?.toString() ?? '')
  start()
}

function switchFurigana() {
  if (jpnEntry.value) {
    jpnEntry.value = { ...jpnEntry.value, preferFurigana: !jpnEntry.value.preferFurigana }
  }
}

const entryTabs = computed(() =>
  showLlmTab.value
    ? ['edits', 'satellites', 'scans', 'llm']
    : ['edits', 'satellites', 'scans'],
)

const rawWid = computed(() => wid.split('-')[0] ?? wid)

useHead({ title: jpnEntry.value?.title })
</script>

<template>
  <div>
    <template v-if="jpnEntry">
      <div class="flex flex-wrap items-start gap-8 lg:gap-12">
        <HzEntryAside
          :entry="jpnEntry"
          :show-lemmas="showLemmas"
          @copy="copy"
          @switch-furigana="switchFurigana"
          @toggle-lemmas="showLemmas = !showLemmas"
        />

        <main class="min-w-0 flex-[999_1_640px] space-y-6">
          <div v-if="isPending" class="text-[13.5px] text-muted">
            Ссылка скопирована
          </div>

          <div v-if="jpnEntry.status.isDeleted" class="text-rose-400">
            {{ t('pages.jpnEntry.entryWasDeleted') }}
          </div>

          <div :class="{ 'opacity-40': jpnEntry.status.isDeleted }">
            <JpnEntry :jpn-entry="jpnEntry" :show-lemmas="showLemmas" />
          </div>

          <div class="pt-2">
            <UiTabs :tabs="entryTabs">
              <UiTab title="edits">
                <EditsList :wid="rawWid" />
              </UiTab>
              <UiTab title="satellites">
                <SatelliteEntry :wid="rawWid" />
              </UiTab>
              <UiTab title="scans">
                <OcrEntry :wid="rawWid" />
              </UiTab>
              <UiTab v-if="showLlmTab" title="llm">
                <LlmEntry :wid="rawWid" />
              </UiTab>
            </UiTabs>
          </div>
        </main>
      </div>
    </template>

    <div v-else-if="status === 'pending'" class="py-10 text-muted">
      {{ t('pages.jpnEntry.entryIsLoading') }}
    </div>
    <NotFound v-else message="pages.notFound.noEntry" />
  </div>
</template>
