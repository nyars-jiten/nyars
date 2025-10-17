<script setup lang="ts">
definePageMeta({
  layout: false,
  alias: '/jp/:wid',
})

const wid = useRoute('dict-jpn-wid').params.wid
const articleWid = useRouteArticle()
// const route = useRoute()
// const request = computed(() => String(route.query.q ?? ''))

const { t } = useI18n()

const { get } = useJpnRepo()

watch(articleWid, () => window.scrollTo(0, 0))

const { data: jpnEntry, status } = useAsyncData(`jpn-article-${wid}`, () => get(wid), {
  watch: [articleWid],
})

const showLemmas = ref(false)

const config = useRuntimeConfig()
const url = computed(() => jpnEntry.value ? new URL(`jp/${jpnEntry.value.wid}`, config.public.baseUrl) : null)

const clipboard = useClipboard()
const { start, stop, isPending } = useTimeout(1000, { controls: true, immediate: false })

watch(articleWid, stop)
// onBeforeUnmount(() => clear())

function copy() {
  clipboard.copy(url.value?.toString() ?? '')
  start()
}

function switchFurigana() {
  if (jpnEntry.value) {
    // force reactivity
    jpnEntry.value = { ...jpnEntry.value, preferFurigana: !jpnEntry.value.preferFurigana }
  }
}

const rawWid = computed(() => wid.split('-')[0] ?? wid)

// const showData = ref(false)
useHead({ title: jpnEntry.value?.title })
</script>

<template>
  <div class="space-y-4">
    <!-- <div v-if="request" class="space-y-4">
      <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
    </div>
    <div v-else /> -->
    <template v-if="jpnEntry">
      <section class="flex gap-4">
        <!-- todo copied -->
        <UiButton icon="mdi:link-variant" :active="isPending" @click="copy" />

        <!-- TODO: new block with caption -->
        <UiButton class="grow justify-center truncate" :active="isPending" @click="copy">
          <template v-if="isPending">
            copied!
          </template>

          <template v-else>
            {{ url }}
          </template>
        </UiButton>

        <UiButton icon="mdi:card-bulleted-outline" @click="showLemmas = !showLemmas">
        <!-- lemma-mode -->
        </UiButton>
        <UiButton icon="mdi:furigana-horizontal" @click="switchFurigana">
        <!-- furigana -->
        </UiButton>
        <NuxtLink :to="{ name: 'dict-jpn-wid-editor', params: { wid: String(jpnEntry?.wid) } }">
          <UiButton icon="ic:baseline-edit" color="edit">
          <!-- edit -->
          </UiButton>
        </NuxtLink>
      </section>
      <div v-if="jpnEntry.status.isDeleted" class="text-rose-400 pl-4">
        {{ t('pages.jpnEntry.entryWasDeleted') }}
      </div>
      <UiBlock :class="{ 'opacity-40': jpnEntry.status.isDeleted }">
        <JpnEntry :jpn-entry="jpnEntry" :show-lemmas="showLemmas" />
      </UiBlock>

      <UiTabs :tabs="['edits', 'satellites', 'scans']">
        <UiTab title="edits">
          <EditsList :wid="rawWid" />
        </UiTab>
        <UiTab title="satellites">
          <SatelliteEntry :wid="rawWid" />
        </UiTab>
        <UiTab title="scans">
          <OcrEntry :wid="rawWid" />
        </UiTab>
      </UiTabs>
    </template>
    <UiBlock v-else-if="status === 'pending'">
      <span>{{ t('pages.jpnEntry.entryIsLoading') }}</span>
    </UiBlock>
    <NotFound v-else message="pages.notFound.noEntry" />
  </div>
</template>
