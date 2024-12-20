<script setup lang="ts">
import type { Furigana, V2Tag } from '~/types/models/articles/jpn'

interface Props {
  tags: V2Tag[]
}

const props = defineProps<Props>()

// TODO: заменить true на проверку N-тегов, что они есть
const sidebar = computed(() => props.tags.length > 0 || true)

const tagsMap = {
  'jlpt-n5': { name: 'n5', class: 'bg-green-400' },
  'jlpt-n4': { name: 'n4', class: 'bg-lime-400' },
  'jlpt-n3': { name: 'n3', class: 'bg-amber-400' },
  'jlpt-n2': { name: 'n2', class: 'bg-orange-400' },
  'jlpt-n1': { name: 'n1', class: 'bg-red-400' },
  // 'iK': { name: '🡳', class: 'text-violet-400 p-0' },
} as Record<V2Tag['engShort'], { name: string, class: string }>
</script>

<template>
  <span>
    <span v-show="sidebar" class="inline-flex align-text-top gap-1.5 py-1">

      <!-- Tags that doesn't exist in map -->
      <small
        v-for="(tag, tagIndex) of tags.filter(tag => !tagsMap[tag.engShort])"
        :key="tagIndex"
        class="group cursor-help relative size-fit rounded-sm text-xs leading-none"
      >
        <span class="font-bold uppercase text-fuchsia-500">
          {{ tag.engShort }}
        </span>
        <UiTooltip>
          {{ tag.rus }}
        </UiTooltip>
      </small>

      <small
        v-for="(tag, tagIndex) of tags.filter(tag => tagsMap[tag.engShort])"
        :key="tagIndex"
        class="group relative size-fit cursor-pointer rounded-sm p-0.5 text-xs leading-none "
        :class="tagsMap[tag.engShort].class"
      >
        <span class="font-bold uppercase text-neutral-900">
          {{ tagsMap[tag.engShort].name }}
        </span>
        <UiTooltip>
          {{ tag.rus }}
        </UiTooltip>
      </small>
    </span>
  </span>
</template>
