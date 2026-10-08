<script setup lang="ts">
const props = defineProps<{
  article: EntryJp
}>()

const { searchQuery } = storeToRefs(useSearchStore())
const { user } = storeToRefs(useUserStore())
const { t } = useI18n()

interface ShortenedSenses {
  data: Sense[]
  hidden: number
}

const shortenedSenses = computed(() => {
  const res = { data: [] as Sense[], hidden: 0 } as ShortenedSenses
  for (const curMeaning of props.article.meanings) {
    for (const curSense of curMeaning.senses) {
      if (!props.article.hideRare || (!curSense.isRare && res.data.length < 5)) {
        res.data.push(curSense)
      }
      else {
        ++res.hidden
      }
    }
  }
  return res
})

const entryLink = computed(() => ({
  name: 'dict-jpn-wid' as const,
  params: { wid: `${props.article.wid}-${props.article.title}` },
  query: { q: searchQuery.value },
}))

const editLink = computed(() => ({
  name: 'dict-jpn-wid-editor' as const,
  params: { wid: props.article.wid },
  query: { q: searchQuery.value },
}))
</script>

<template>
  <article class="border-t border-line py-5.5 first:border-t-0">
    <NuxtLink
      :to="entryLink"
      class="block text-ink! no-underline! hover:[&_.hz-jp]:underline"
      :class="{ 'opacity-40': article.status.isDeleted }"
    >
      <div v-if="article.status.isDeleted" class="mb-1 text-rose-400">
        {{ t('pages.jpnEntry.entryWasDeleted') }}
      </div>
      <Words class="hz-jp" :jpn-entry="article" :preview="true" />
    </NuxtLink>

    <ol class="mt-2.5 grid list-none grid-cols-[22px_minmax(0,1fr)] gap-x-1.5 gap-y-1.25 p-0">
      <template v-for="(sense, sIndex) of shortenedSenses.data" :key="sIndex">
        <li class="contents">
          <span
            v-if="shortenedSenses.data.length > 1"
            class="pt-px text-[13.5px] font-extrabold text-strong"
          >
            {{ sIndex + 1 }}
          </span>
          <span v-else />
          <span>
            <span v-if="sense.fieldTags.length > 0">
              <span
                v-for="(tag, i) of sense.fieldTags"
                :key="i"
                class="group relative cursor-help"
              >
                <span class="text-sm text-green-600 italic">
                  <template v-if="i > 0">,&nbsp;</template>{{ tag.rusShort }}
                </span>
                <UiTooltip>
                  {{ tag.rus }}
                </UiTooltip>
              </span>
              <span>&nbsp;</span>
            </span>
            <Content :data="sense.content" :break-line="false" />
          </span>
        </li>
      </template>
    </ol>

    <small
      v-if="shortenedSenses.hidden > 0"
      class="mt-3 block rounded-md bg-orange-700/30 py-2 text-center italic"
    >
      {{ t('components.searchGroup.general.hiddenSenses', shortenedSenses.hidden) }}
    </small>

    <div class="mt-2.5 flex flex-wrap gap-x-4.5 gap-y-1 text-[13px] text-muted">
      <span v-if="article.frequency > 0">частотность № {{ article.frequency }}</span>
      <span class="flex-1" />
      <NuxtLink v-if="user" :to="editLink">
        Править
      </NuxtLink>
      <NuxtLink :to="entryLink" class="font-bold">
        Открыть статью →
      </NuxtLink>
    </div>
  </article>
</template>
