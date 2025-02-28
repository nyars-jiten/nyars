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
  <NuxtLink
    :to="{ name: 'dict-jpn-wid', params: { wid: `${article.wid}-${article.title}` }, query: { q: searchQuery } }"
    class="w-full"
    :class="{ 'cursor-default': active, 'opacity-40': article.status.isDeleted }"
  >
    <UiBlock :hover="active === false" :class="newBorder">
      <template #default>
        <section class="space-y-2">
          <div v-if="article.status.isDeleted" class="text-rose-400 pl-4">
            {{ t('pages.jpnEntry.entryWasDeleted') }}
          </div>
          <Words :jpn-entry="article" :preview="true" />

          <div class="flex flex-wrap items-center gap-2">
            <UiTag v-if="article.frequency > 0" kind="freq">
              <MiscFreq :value="article.frequency" />
            </UiTag>

            <EntryFlagBadge :statuses="article.status" @change-border="(cl: string) => { newBorder = cl }" />
          </div>

          <div class="grid grid-cols-[auto_1fr] gap-x-2">
            <template v-for="sense, sIndex of shortenedSenses.data" :key="sIndex">
              <span v-if="shortenedSenses.data.length > 1" class="text-end text-violet-300">
                {{ 1 + sIndex }}
              </span>

              <span>
                <small v-for="(tag, i) of sense.fieldTags" :key="i" class="italic text-green-600">
                  <span class="group relative after:content-[\',\'] last:after:content-none">
                    {{ tag.rusShort }}

                    <div class="invisible absolute bottom-full left-1/2 z-20 -translate-x-1/2 pb-1 group-hover:visible">
                      <div class="flex items-center justify-center rounded-md bg-neutral-800/80 px-3 py-1.5 leading-4 shadow-md outline-1 outline-neutral-700 backdrop-blur-md">
                        {{ tag.rus }}
                      </div>
                    </div>
                  </span>
                </small>

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
