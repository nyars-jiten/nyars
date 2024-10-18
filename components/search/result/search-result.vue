<script setup lang="ts">
import { tv } from 'tailwind-variants'

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
        ++res.hidden
      }
    }
  }
  return res
})

const wid = useRouteArticle()
const request = useSearchRequest()

const { t } = useI18n()

const statusStyle = tv({
  variants: {
    border: {
      true: '',
      false: '',
    },

    text: {
      true: '',
      false: '',
    },

    isReviewed: {
      true: '',
      false: '',
    },
    isUnconfirmed: {
      true: '',
      false: '',
    },
    isArchaic: {
      true: '',
      false: '',
    },
    isDialect: {
      true: '',
      false: '',
    },
    isProper: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    /*
     * border
     */

    { isReviewed: true, border: true, class: 'border-l-2 border-l-amber-700' },
    { isUnconfirmed: true, border: true, class: 'border-l-2 border-l-red-700' },
    { isArchaic: true, border: true, class: 'border-l-2 border-l-fuchsia-500' },
    { isDialect: true, border: true, class: 'border-l-2 border-l-fuchsia-500' },
    { isProper: true, border: true, class: 'border-l-2 border-l-fuchsia-500' },

    /*
     * text
     */

    { text: true, isReviewed: true, class: 'text-amber-300' },
    { text: true, isUnconfirmed: true, class: 'text-red-300' },
    { text: true, isArchaic: true, class: 'text-fuchsia-300' },
    { text: true, isDialect: true, class: 'text-fuchsia-300' },
    { text: true, isProper: true, class: 'text-fuchsia-300' },
  ],
})

const iconList = {
  isReviewed: {
    value: false,
    path: 'mdi:warning-outline',
  },
  isArchaic: {
    value: true,
    path: 'mdi:feather',
  },
  isDialect: {
    value: true,
    path: 'mdi:translate',
  },
  isUnconfirmed: {
    value: true,
    path: 'mdi:magnify-scan',
  },
  isProper: {
    value: true,
    path: 'mdi:bacteria-outline',
  },

} as Record<keyof V2Status, { value: boolean, path: string }>

const statusIconList = computed(() => {
  const res = [] as { key: keyof V2Status, path: string } []

  for (const key of Object.keys(iconList) as (keyof V2Status)[]) {
    if (iconList[key].value === props.article.status[key]) {
      res.push({ key, path: iconList[key].path })
    }
  }

  return res
})

const border = computed(() => {
  if (statusIconList.value.length > 0) {
    return statusStyle({ border: true, [statusIconList.value[0].key]: true })
  }

  return ''
})

const active = computed(() => wid === props.article.wid)
</script>

<template>
  <NuxtLink :to="{ name: 'search', query: { q: request.request.value, wid: article.wid } }" class="w-full" :class="{ 'cursor-default': active }" @click="wid = article.wid">
    <UiBlock :hover="active === false" :class="border">
      <template #default>
        <section class="space-y-2">
          <header class="text-2xl">
            <span v-for="furigana, wIndex of article.furigana.toSorted((a, b) => a.isMarked ? -1 : 1)" :key="wIndex" class="after:content-['・'] last:after:content-none dark:after:text-gray-700">
              <Furigana :furigana="furigana" />
            </span>
          </header>

          <div class="grid grid-cols-[auto_1fr] gap-x-2">
            <template v-for="sense, sIndex of shortenedSenses.data" :key="sIndex">
              <span v-if="shortenedSenses.data.length > 1" class="text-end text-violet-300">
                {{ 1 + sIndex }}
              </span>

              <span>
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

      <template #footer>
        <section class="flex w-full flex-wrap items-center justify-between gap-2 px-2 leading-none">
          <span class="inline-flex flex-wrap items-center gap-2 text-xl">
            <span class="inline-flex flex-wrap items-center gap-4">
              <span v-for="tag in article.tags" :key="tag.eng" class="rounded-md text-xs uppercase text-violet-300 underline underline-offset-4">
                {{ tag.engShort }}
              </span>
            </span>

            <!-- <span class="text-neutral-700">
              ⌁
            </span> -->

            <span class="inline-flex flex-wrap items-center gap-2">
              <span v-for="status in statusIconList" :key="status.key" class="inline-flex items-center gap-2" :class="statusStyle({ text: true, [status.key]: true })">
                <Icon :name="status.path" />

                <span class="text-xs uppercase">
                  {{ t(`pages.search.status.${status.key}`) }}
                </span>
              </span>
            </span>
          </span>

          <MiscFreq :value="article.frequency" />
        </section>
      </template>
    </UiBlock>
  </NuxtLink>
</template>
