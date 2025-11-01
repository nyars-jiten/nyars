<script setup lang="ts">
const articleWid = useRouteArticle()

const { getEntry } = useJpnEntries()

watch(articleWid, () => window.scrollTo(0, 0))

const { data: article } = getEntry(articleWid.value, {
  watch: [articleWid],
})

const config = useRuntimeConfig()
const url = computed(() => article.value ? new URL(`jpn/${article.value.wid}`, config.public.baseUrl) : null)

const clipboard = useClipboard()
const { start, stop, isPending } = useTimeout(1000, { controls: true, immediate: false })

watch(articleWid, stop)

function copy() {
  clipboard.copy(url.value?.toString() ?? '')
  start()
}
</script>

<template>
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

      <NuxtLink :to="{ name: 'dict-jpn-wid-editor', query: { wid: article.wid } }">
        <UiButton icon="ic:baseline-edit">
          <!-- edit -->
        </UiButton>
      </NuxtLink>
    </section>

    <UiBlock>
      <JpnEntry :jpn-entry="article" :show-lemmas="false" />
    </UiBlock>
  </section>
</template>
