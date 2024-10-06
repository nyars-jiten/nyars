<script setup lang="ts">
const request = useRouteSearchRequest()
const api = useJpnArticles()

definePageMeta({
  layout: 'desktop',
})

const { data, execute } = useAsyncData('search-request', () => api.search(request.value, 0, 0), {
  default: () => ({ result: [] }),
  lazy: false,
  dedupe: 'defer',
})

// TODO: debounce
watch(request, () => execute)

const wid = useRouteArticle()
watch(wid, () => window.scrollTo(0, 0))

function getArticle() {
  const result = data.value?.result.find(x => x.wid === wid.value)
  if (result) {
    return Promise.resolve(result)
  }

  if (wid.value) {
    return api.get(wid.value)
  }

  return Promise.resolve(null)
}

const { data: article } = useAsyncData(getArticle, { watch: [wid] })

const config = useRuntimeConfig()
const url = computed(() => article.value ? new URL(`jpn/${article.value.wid}`, config.public.baseUrl) : null)

const clipboard = useClipboard()
const { start, stop, isPending } = useTimeout(1000, { controls: true, immediate: false })

watch(wid, stop)

function copy() {
  clipboard.copy(url.value?.toString() ?? '')
  start()
}
</script>

<template>
  <div class="grid grow items-start gap-8 md:grid-cols-[1fr_2fr]">
    <div class="space-y-4">
      <SearchResult v-for="result of data?.result" :key="result.wid" :article="result" />
    </div>

    <section v-if="article" class="space-y-4">
      <section class="flex gap-4">
        <!-- todo copied -->
        <UiButton icon="ic:baseline-content-copy" :active="isPending" @click="copy" />

        <!-- TODO: new block with caption -->
        <UiButton class="grow justify-center truncate" :active="isPending" @click="copy">
          <template v-if="isPending">
            copied!
          </template>

          <template v-else>
            {{ url }}
          </template>
        </UiButton>

        <NuxtLink :to="{ name: 'editor', query: { wid: article.wid } }">
          <UiButton icon="ic:baseline-edit">
            <!-- edit -->
          </UiButton>
        </NuxtLink>
      </section>

      <UiBlock>
        <JpnEntry :jpn-entry="article" />
      </UiBlock>
    </section>
  </div>
</template>
