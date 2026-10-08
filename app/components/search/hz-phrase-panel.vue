<script setup lang="ts">
import type { Token } from '~/types/models/jpn/search'
import { toPhraseTokens } from '#shared/hz-search'

const props = defineProps<{
  tokens: Token[]
}>()

const selectedIndex = defineModel<number>({ default: -1 })

const ruby = ref(true)

const vms = computed(() =>
  toPhraseTokens(props.tokens, {
    ruby: ruby.value,
    selectedIndex: selectedIndex.value,
  }),
)

function pick(index: number, searchable: boolean) {
  if (!searchable)
    return
  selectedIndex.value = index
}
</script>

<template>
  <section
    class="rounded-2xl bg-surf px-5 py-4"
    aria-label="Разбор фразы"
  >
    <div class="mb-2 flex flex-wrap items-center gap-2.5">
      <p class="hz-cap m-0!">
        Разбор фразы · {{ tokens.length }} токенов
      </p>
      <span class="flex-1" />
      <button
        type="button"
        class="hz-chip h-7! text-[12.5px]!"
        :aria-pressed="ruby"
        @click="ruby = !ruby"
      >
        Чтения
      </button>
    </div>

    <div lang="ja" class="flex flex-wrap items-end gap-x-0 gap-y-0.5">
      <button
        v-for="(tok, i) in vms"
        :key="i"
        type="button"
        class="hz-tok"
        :class="{ 'hz-tok-ph': tok.ph }"
        :aria-pressed="tok.selected"
        :disabled="tok.ph"
        @click="pick(i, tok.searchable)"
      >
        <span class="hz-tok-rt">{{ tok.reading }}</span>
        <span class="hz-jp text-[23px] leading-[1.15] font-bold">{{ tok.surface }}</span>
        <span class="hz-tok-bf">{{ tok.hint }}</span>
      </button>
    </div>
  </section>
</template>
