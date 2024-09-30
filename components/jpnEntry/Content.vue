<script setup lang="ts">
interface Props {
  content: V2Content[]
  breakLine?: boolean
}

withDefaults(defineProps<Props>(), {
  breakLine: true,
})

const tagsMap: Record<string, string> = {
  i: 'italic text-gray-500 text-sm',
  p: 'italic',
  comp: 'font-bold italic',
  hide: 'hidden',
  ref: 'text-indigo-300', // TODO: routing logic
}

function getStyle(tag: string): string {
  return tagsMap[tag] ?? ''
}
</script>

<template>
  <span>
    <template v-for="(item, i) in content" :key="i">
      <Content v-if="item.content" :content="item.content" :class="getStyle(item.tag)" :break-line="breakLine" />

      <sup v-else-if="item.tag === 'sup'">{{ item.value }}</sup>

      <sub v-else-if="item.tag === 'sub'">{{ item.value }}</sub>

      <template v-else-if="item.tag === 'br'">
        <br v-if="breakLine">
      </template>

      <span v-else :class="getStyle(item.tag)">
        {{ item.value }}
      </span>
    </template>
  </span>
</template>
