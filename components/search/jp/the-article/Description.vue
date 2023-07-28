<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { DeepReadonly } from 'vue'
import { Reference } from '@/api/dictionary/jp/types/reference'
import { bbCodesProcess } from '@/utils/text/bb-code'
import { RoutesNames } from '@/router/routes-names'

import { type EntryJp } from '@/api/dictionary/jp/types'

import { useSearch } from '@/stores/search'
import { SearchType } from '@/api/types/search/search-type'
import { MessagesNames } from '@/locale/messages-names'
import PanelBody from '../../PanelBody.vue'

type Variants = 'short' | 'full'
type Props = {
  meanings: DeepReadonly<EntryJp['entry']['meanings']>
  details: boolean
}

defineProps<Props>()

const { t } = useI18n()
const { searchResults } = useSearch()

function path({ type, tag, v }: { type: string; tag: string; v: Variants }) {
  const p = MessagesNames.ArticleTagName
  return `${p}.${type.toLocaleLowerCase()}.${tag.toLocaleLowerCase()}.${v}`
}

function exists({ target }: Reference) {
  return target && target.length < 1
}
</script>

<template>
  <div>
    <template v-for="(mean, meanId) of meanings">
      <Transition
        enter-active-class="duration-150 ease-out"
        enter-from-class="transform opacity-0 -translate-y-4"
        enter-to-class="opacity-100"
        leave-active-class="duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0 -translate-y-4"
        mode="out-in"
      >
        <div
          v-show="details && mean.pos.length > 0"
          class="mb-2 border-b border-gray-200 pb-2 pl-4 text-sm dark:border-gray-700"
        >
          <span
            v-for="tag of mean.pos"
            class="pl-1 font-bold uppercase after:content-[','] first:pl-0 last:after:content-none"
          >
            {{ t(path({ type: 'pos', tag, v: 'full' })) }}
          </span>
        </div>
      </Transition>

      <div class="grid grid-cols-[auto_min-content_1fr] items-start">
        <template v-for="(lang, langId) of mean.langMeanings">
          <span
            class="mr-2 h-full border-r border-dotted border-gray-200 px-2 text-gray-400 dark:border-gray-700 dark:text-gray-400"
            :style="{ 'grid-row': `span ${lang.senses.length}` }"
          >
            <div class="text-xs font-medium uppercase leading-6">
              {{ t(`${MessagesNames.SearchShortLangName}.${lang.lang}`) }}
            </div>
          </span>

          <template v-for="(sense, senseId) of lang.senses">
            <span
              class="col-start-2 mr-2 whitespace-nowrap rounded-md text-center text-gray-400 dark:text-gray-400"
            >
              <template v-if="lang.senses.length > 1">
                {{ 1 + senseId }}
              </template>
            </span>

            <div class="col-start-3 pr-2">
              <span
                v-show="sense.tags.some((e) => e.type == 'Fld' && e.values.length)"
                class="italic text-green-600"
              >
                <template v-for="{ type, values } of sense.tags.filter((e) => e.type == 'Fld')">
                  <template v-for="tag of values">
                    {{ t(path({ tag, type, v: 'short' })) }}
                  </template>
                </template>
                &#8203;
              </span>

              <span class="whitespace-pre-wrap" v-html="bbCodesProcess(sense.value)" />

              <span
                v-show="sense.tags.some((e) => e.type != 'Fld' && e.values.length)"
                class="italic text-gray-400 dark:text-gray-400"
              >
                &#8203;

                <template v-for="{ type, values } of sense.tags.filter((e) => e.type != 'Fld')">
                  <template v-for="tag of values">
                    {{ t(path({ tag, type, v: 'full' })) }}
                  </template>
                </template>
                &#8203;
              </span>

              <Transition
                enter-active-class="duration-150 ease-out"
                enter-from-class="transform opacity-0 translate-x-4"
                enter-to-class="opacity-100"
                leave-active-class="duration-150 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="transform opacity-0 translate-x-4"
                mode="out-in"
              >
                <PanelBody v-show="details && sense.examples.length > 0" class="mx-6 my-2">
                  <p v-for="{ value, translation } of sense.examples">
                    {{ value }}
                    <span v-html="bbCodesProcess(translation)" />
                  </p>
                </PanelBody>
              </Transition>

              <div v-show="details" class="pl-5">
                <ul v-for="ref of sense.references">
                  <li class="italic">
                    <span class="text-xs">⇒</span>
                    {{ t(`${MessagesNames.ArticleAbbr}.${ref.referenceType}`) }}

                    <RouterLink
                      v-if="exists(ref)"
                      :to="{
                        name: RoutesNames.DictJpArticle,
                        params: { articleId: ref.target }
                      }"
                      class="text-indigo-500 underline decoration-dotted underline-offset-4 hover:text-accent-500"
                    >
                      {{ ref.value }}
                    </RouterLink>

                    <span
                      v-else
                      class="cursor-pointer text-indigo-500 underline decoration-dotted underline-offset-4 hover:text-accent-500"
                      @click="
                        searchResults({
                          request: ref.value,
                          mode: SearchType.Jpn
                        })
                      "
                    >
                      {{ ref.value }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </template>

          <div v-show="mean.langMeanings.length != langId + 1" class="col-span-full h-4" />
        </template>
      </div>

      <div
        v-show="meanings.length != meanId + 1"
        class="col-span-full my-2 h-px bg-gray-200 dark:bg-gray-700"
      />
    </template>
  </div>
</template>
