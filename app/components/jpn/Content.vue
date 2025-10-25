<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  data: Content[]
  breakLine?: boolean
  allowExternal?: boolean
}

withDefaults(defineProps<Props>(), {
  breakLine: true,
})

const style = tv({
  variants: {
    t: {
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
    <template v-for="({ t, v, c, p }, i) in data" :key="i">
      <Content v-if="c && t !== 'ruby'" :data="c" :class="style({ t })" :break-line="breakLine" />

      <sup v-if="t === 'sup'">{{ v }}</sup>

      <sub v-else-if="t === 'sub'">{{ v }}</sub>

      <template v-else-if="t === 'ref'">
        <NuxtLink v-if="allowExternal && p" :to="p" external target="_blank" class="text-indigo-300">
          {{ v }}
        </NuxtLink>
        <NuxtLink v-else :to="{ name: 'dict-jpn', query: { q: v } }" class="text-indigo-300">
          {{ v }}
        </NuxtLink>
        <!-- <span class="text-indigo-300">
          {{ v }}
        </span> -->
      </template>

      <template v-else-if="t === 'br'">
        <br v-if="breakLine">
        <span v-else class="p-0.5" />
      </template>

      <ruby v-else-if="t === 'ruby'">
        <template v-for="cont, ci in c" :key="ci">
          <rt v-if="cont.t === 'rt'">
            {{ cont.v }}
          </rt>
          <template v-else>
            {{ cont.v }}
          </template>
        </template>
      </ruby>

      <span v-else :class="style({ t })">
        {{ v }}
      </span>
    </template>
  </span>
</template>
