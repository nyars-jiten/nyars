<script setup lang="ts">
  interface Props {
    content: V2Content[]
  }

  const tagsMap: Record<string, string> = {
    i: 'italic',
    p: 'italic',
    comp: 'font-bold italic',
    hide: 'hidden',
    ref: 'text-indigo-300' // TODO: routing logic
  }

  function getStyle(tag: string): string {
    return tagsMap[tag] ?? ''
  }

  defineProps<Props>()
</script>

<template>
  <span>
    <template v-for="(item, i) in content" :key="i">
      <Content v-if="item.content" :content="item.content" :class="getStyle(item.tag)" />
      <sup v-else-if="item.tag === 'sup'">{{ item.value }}</sup>
      <sub v-else-if="item.tag === 'sub'">{{ item.value }}</sub>
      <br v-else-if="item.tag === 'br'">
      <span v-else :class="getStyle(item.tag)">
        {{ item.value }}
      </span>
    </template>
  </span>
</template>
