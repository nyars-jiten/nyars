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
      i: 'italic text-muted text-sm',
      p: 'italic',
      comp: 'bg-soft px-1 py-0.5 rounded-tag text-sm whitespace-nowrap',
      // comp: 'font-bold text-strong',
      hide: 'hidden',
      hw: 'font-bold text-strong', // заглавное слово в примере
      lat: 'text-dial', // italic ? латинские названия
    } as Record<string, string>,
  },
})
</script>

<template>
  <span class="leading-none" :class="{ 'whitespace-pre-line': breakLine }">
    <template v-for="({ t, v, c, p }, i) in data" :key="i">
      <Content v-if="c && t !== 'ruby'" :data="c" :class="style({ t })" :break-line="breakLine" />

      <sup v-if="t === 'sup'">{{ v }}</sup>

      <sub v-else-if="t === 'sub'">{{ v }}</sub>

      <template v-else-if="t === 'ref'">
        <NuxtLink v-if="allowExternal && p" :to="p" external target="_blank" class="text-strong no-underline hover:underline">
          {{ v }}
        </NuxtLink>
        <NuxtLink v-else :to="{ name: 'dict-jpn', query: { q: v } }" class="text-strong no-underline hover:underline">
          {{ v }}
        </NuxtLink>
        <!-- <span class="text-strong no-underline hover:underline">
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
