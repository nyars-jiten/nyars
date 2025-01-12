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
      comp: 'bg-gray-300/10 px-1 py-0.5 rounded text-sm whitespace-nowrap', // bg-fuchsia-300/10
      hide: 'hidden',
      lat: 'decoration-violet-400 underline', // text-violet-300
    } as Record<string, string>,
  },
})
</script>

<template>
  <span class="leading-none">
    <template v-for="({ tag, value, content }, i) in data" :key="i">
      <Content v-if="content && tag !== 'ruby'" :data="content" :class="style({ tag })" :break-line="breakLine" />

      <sup v-if="tag === 'sup'">{{ value }}</sup>

      <sub v-else-if="tag === 'sub'">{{ value }}</sub>

      <template v-else-if="tag === 'ref'">
        <!-- <NuxtLink :to="{ name: 'search', query: { q: value } }" class="text-indigo-300">
          {{ value }}
        </NuxtLink> -->
        <span class="text-indigo-300">
          {{ value }}
        </span>
      </template>

      <template v-else-if="tag === 'br'">
        <br v-if="breakLine">
        <span v-else class="p-0.5" />
      </template>

      <ruby v-else-if="tag === 'ruby'">
        <template v-for="cont, ci in content" :key="ci">
          <rt v-if="cont.tag === 'rt'">
            {{ cont.value }}
          </rt>
          <template v-else>
            {{ cont.value }}
          </template>
        </template>
      </ruby>

      <span v-else :class="style({ tag })">
        {{ value }}
      </span>
    </template>
  </span>
</template>
