<script setup lang="ts">
interface Props {
  article: V2EntryJp
}

const props = defineProps<Props>()

interface ShortenedSenses {
  data: V2Sense[]
  hidden: number
}

// Shorten the senses to show only the first 5 non-rare senses
// and count the number of hidden senses
const shortenedSenses = computed(() => {
  const res = {
    data: [] as V2Sense[],
    hidden: 0,
  } as ShortenedSenses
  for (let i = 0; i < props.article.meanings.length; i++) {
    const curMeaning = props.article.meanings[i]
    for (let j = 0; j < curMeaning.senses.length; j++) {
      const curSense = curMeaning.senses[j]
      if (!curSense.isRare && res.data.length < 5) {
        res.data.push(curSense)
      }
      else {
        res.hidden++
      }
    }
  }
  return res
})

const wid = defineModel<string | null>({ required: true })
</script>

<template>
  <button type="button" class="w-full text-left" @click="wid = article.wid">
    <UiBlock :hover="true" class="space-y-2">
      <header class="grid grid-cols-[1fr_auto] items-center justify-between gap-4 text-2xl">
        <span class="grow truncate">
          <span v-for="{ furigana }, wIndex of article.words" :key="wIndex">
            <span v-for="f, fIndex of furigana" :key="fIndex" class="after:content-['・'] last:after:content-none dark:after:text-gray-700">
              <Furigana :furigana="f" />
            </span>
          </span>
        </span>

        <Tags :tags="article.tags" />
      </header>

      <section class="grid grid-cols-[auto_1fr] gap-x-2">
        <template v-for="sense, sIndex of shortenedSenses.data" :key="sIndex">
          <span v-if="shortenedSenses.data.length > 1" class="text-end text-violet-300">
            {{ 1 + sIndex }}
          </span>

          <span class="space-x-1">
            <small v-for="(tag, i) of sense.fieldTags" :key="i" class="italic text-green-600">
              <span class="group relative after:content-[\',\'] last:after:content-none">
                {{ tag.engShort }}

                <div class="invisible absolute bottom-full left-1/2 z-20 -translate-x-1/2 pb-1 group-hover:visible">
                  <div class="flex items-center justify-center rounded-md bg-neutral-800/80 px-3 py-1.5 leading-4 shadow-md outline outline-1 outline-neutral-700 backdrop-blur-md">
                    {{ tag.ru }}
                  </div>
                </div>
              </span>
            </small>

            <Content :content="sense.content" :break-line="false" />
          </span>
        </template>
      </section>

      <span v-if="shortenedSenses.hidden > 0" class="text-sm italic text-gray-500">
        <span>{{ $t('components.searchGroup.general.hiddenSenses', shortenedSenses.hidden) }}</span>
      </span>
    </UiBlock>
  </button>
</template>
