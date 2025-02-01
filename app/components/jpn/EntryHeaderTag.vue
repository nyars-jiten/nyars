<script setup lang="ts">
interface Props {
  tags: Tag[]
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
} as Record<Tag['engShort'], { name: string, class: string }>
</script>

<template>
  <span>
    <span v-show="sidebar" class="inline-flex gap-1.5 py-1 align-top">

      <!-- Tags that doesn't exist in map -->
      <small
        v-for="(tag, tagIndex) of tags.filter(tag => !tagsMap[tag.engShort])"
        :key="tagIndex"
        class="rounded-xs group relative size-fit cursor-help text-xs leading-none"
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
        class="rounded-xs group relative size-fit cursor-pointer p-0.5 text-[10px] leading-none "
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
