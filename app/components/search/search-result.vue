<script setup lang="ts">
const props = defineProps<Props>()

interface Props {
  article: EntryJp
}

interface ShortenedSenses {
  data: Sense[]
  hidden: number
}

// Shorten the senses to show only the first 5 non-rare senses
// and count the number of hidden senses
const shortenedSenses = computed(() => {
  const res = {
    data: [] as Sense[],
    hidden: 0,
  } as ShortenedSenses
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

// const route = useRoute()

const { searchQuery } = useSearchStore()

const { t } = useI18n()

const newBorder = ref('')

const articleWid = useRouteArticle()

const active = computed(() => articleWid.value === props.article.wid)
</script>

<template>
  <NuxtLink :to="{ name: 'dict-jpn-wid-title', params: { wid: article.wid, title: article.title }, query: { q: searchQuery } }" class="block shadow">
    <UiBlock :hover="active === false" :class="newBorder">
      <template #default>
        <section class="space-y-2">
          <Words :jpn-entry="article" :preview="true" />

          <section class="space-x-2">
            <UiBadge v-if="article.status.isDeleted" color="danger" icon="ic:outline-cancel" :text="t('pages.jpnEntry.entryWasDeleted')" />
            <UiBadgeWarning v-if="article.status.isUnreviewed" :text="t('pages.search.status.isUnreviewed')" />
            <UiBadgeFrequency v-if="article.frequency > 0" :value="article.frequency" />
          </section>

          <div class="grid grid-cols-[auto_1fr] gap-x-2">
            <template v-for="sense, sIndex of shortenedSenses.data" :key="sIndex">
              <span v-if="shortenedSenses.data.length > 1" class="text-end text-violet-300">
                {{ 1 + sIndex }}
              </span>

              <span>
                <span v-if="sense.fieldTags.length > 0">
                  <span v-for="(tag, i) of sense.fieldTags" :key="i" class="r-1 cursor-help group relative">
                    <span class="italic text-green-600 text-sm">
                      <template v-if="i > 0">,&nbsp;</template>
                      {{ tag.rusShort }}
                    </span>

                    <UiTooltip>
                      {{ tag.rus }}
                    </UiTooltip>
                  </span>
                  <span>&nbsp;</span>
                </span>

                <Content :data="sense.content" :break-line="false" />
              </span>
            </template>

            <small
              v-show="shortenedSenses.hidden > 0"
              class="col-span-2 mt-4 rounded-md bg-orange-700/30 py-2 text-center italic  transition-opacity group-hover/block:opacity-100"
              :class="{ 'opacity-30': active === false }"
            >
              <span>{{ t('components.searchGroup.general.hiddenSenses', shortenedSenses.hidden) }}</span>
            </small>
          </div>
        </section>
      </template>
    </UiBlock>
  </NuxtLink>
</template>
