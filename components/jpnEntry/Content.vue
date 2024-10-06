<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  data: V2Content[]
  breakLine?: boolean
}

withDefaults(defineProps<Props>(), {
  breakLine: true,
})

const style = tv({
  variants: {
    tag: {
      i: 'italic text-gray-500 text-sm',
      p: 'italic',
      comp: 'font-bold italic',
      hide: 'hidden',
      ref: 'text-indigo-300', // TODO: routing logic
    } as Record<string, string>,
  },
})
</script>

<template>
  <span class="leading-none">
    <template v-for="({ tag, value, content }, i) in data" :key="i">
      <Content v-if="content" :data="content" :class="style({ tag })" :break-line="breakLine" />

      <sup v-if="tag === 'sup'">{{ value }}</sup>

      <sub v-else-if="tag === 'sub'">{{ value }}</sub>

      <template v-else-if="tag === 'br'">
        <br v-if="breakLine">
      </template>

      <span v-else :class="style({ tag })">
        {{ value }}
      </span>
    </template>
  </span>
</template>
