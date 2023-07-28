<script setup lang="ts">
import { groupBy } from 'lodash'
import { useI18n } from 'vue-i18n'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

import ChevronIcon from 'vue-material-design-icons/ChevronDown.vue'
import { type KanjiIndex } from '@/api/dictionary/kanji/types'

import { MessagesNames } from '@/locale/messages-names'

type Props = { indices: KanjiIndex[] }

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <div>
    <template v-for="(index, indexId) of groupBy(indices, (e) => e.type)">
      <Disclosure
        v-slot="{ open }"
        as="div"
        class="border-l-2 border-gray-400 dark:border-gray-500"
      >
        <DisclosureButton
          class="flex w-full justify-between px-3 py-2 text-gray-400 hover:opacity-75"
        >
          <span>{{ t(`${MessagesNames.KanjiIndexTypeName}.${indexId}`) }}</span>
          <ChevronIcon :class="open ? 'transform rotate-180' : ''" />
        </DisclosureButton>
        <DisclosurePanel>
          <table class="w-full text-left text-sm text-gray-500">
            <thead class="bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="p-3 font-normal">
                  {{ t(MessagesNames.Index) }}
                </th>
                <th scope="col" class="p-3 font-normal">
                  {{ t(MessagesNames.Source) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry of index"
                class="border-b bg-white last:border-none dark:border-gray-700 dark:bg-gray-800"
              >
                <td class="w-20 p-3">
                  {{ entry.value }}
                </td>
                <td scope="row">
                  <span class="box-decoration-clone p-3 font-medium text-gray-900 dark:text-white">
                    {{ t(`${MessagesNames.IndexSourceAbbr}.${entry.source}`) }}
                  </span>
                  <span v-if="entry.note" class="text-gray-400 dark:text-gray-400">
                    {{ entry.note }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </DisclosurePanel>
      </Disclosure>
    </template>
  </div>
</template>
