<script setup lang="ts">
import { type KanjiWord } from '@/api/dictionary/kanji/types'
import Button from '@/components/generic-button.vue'
import PanelBody from '../../PanelBody.vue'
import EditInput from './EditInput.vue'
import TextArea from './TextArea.vue'
type Props = { words: KanjiWord[]; title: string }
const props = defineProps<Props>()
function addWord() {
  props.words.push({
    wid: '',
    word: '',
    reading: '',
    meaning: '',
    nsR: false,
    nsM: false
  })
}
</script>

<template>
  <PanelBody>
    <div class="rounded-md pb-5 text-accent-500">
      {{ title }}
    </div>

    <div class="pb-2">
      <div
        v-for="(word, i) of words"
        :key="i"
        class="border-b border-gray-300 py-2 first:pt-0 last:border-b-0 dark:border-gray-600"
      >
        <div class="flex flex-col gap-2 px-2">
          <div class="flex gap-2">
            <EditInput v-model="word.wid" name="word-wid-input" placeholder="wid" />

            <EditInput v-model="word.word" name="word-word-input" placeholder="слово" />

            <EditInput v-model="word.reading" name="word-reading-input" placeholder="чтение" />
          </div>

          <TextArea
            v-model="word.meaning"
            :rows="2"
            name="word-meaning-input"
            placeholder="значение"
          />

          <div class="text-right">
            <Button type="button" @click="words.splice(i, 1)">
              <template #default> Удалить </template>

              <template #icon> X </template>
            </Button>
          </div>
        </div>
      </div>
    </div>

    <Button class="w-full font-medium" @click="addWord">+ слово</Button>
  </PanelBody>
</template>
