<script setup lang="ts">
import type { PaletteId } from '#shared/palette'
import { cookieToPalette, PALETTES } from '#shared/palette'

const { cookie, setPalette } = useSettingsCookie()

const current = computed(() => cookieToPalette(cookie.value))

function select(id: PaletteId) {
  setPalette(id)
}
</script>

<template>
  <div class="flex flex-col gap-1.5" role="group" aria-label="Палитра">
    <p class="px-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
      Палитра
    </p>
    <div class="grid grid-cols-1 gap-1">
      <button
        v-for="p in PALETTES"
        :key="p.id"
        type="button"
        class="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm leading-tight transition-colors"
        :class="current === p.id
          ? 'bg-acc text-onacc'
          : 'text-ink hover:bg-soft'"
        :aria-pressed="current === p.id"
        :title="p.desc"
        @click="select(p.id)"
      >
        <span class="flex shrink-0 overflow-hidden rounded border border-line" aria-hidden="true">
          <i class="block size-3.5" :style="{ background: p.tokens.bg }" />
          <i class="block size-3.5" :style="{ background: p.tokens.acc }" />
          <i class="block size-3.5" :style="{ background: p.tokens.sec }" />
        </span>
        <span class="min-w-0 truncate font-medium">{{ p.name }}</span>
      </button>
    </div>
  </div>
</template>
