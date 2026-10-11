<script setup lang="ts">
// Боковое меню: словари, статусы, разделы профиля.
// Пункты с to — ссылки (активность по роуту), без to — кнопки с v-model.
defineProps<{
  items: readonly UiSideNavItem[]
  /** подпись меню для скринридеров */
  label: string
}>()

const model = defineModel<string>()

const item = [
  'group -ml-px flex h-[38px] cursor-pointer items-center justify-between gap-3 border-l-2 border-transparent',
  'bg-transparent pr-2.5 pl-3.5 text-left text-[14.5px] font-semibold text-muted no-underline transition-colors',
  'hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong',
  'data-active:border-strong data-active:bg-linear-to-r data-active:from-soft data-active:to-transparent data-active:to-85% data-active:text-strong',
]
</script>

<template>
  <nav :aria-label="label" class="flex flex-col gap-0.5 border-l border-line">
    <template v-for="entry in items" :key="entry.id">
      <NuxtLink v-if="entry.to" v-slot="{ href, navigate, isExactActive }" :to="entry.to" custom>
        <a
          :href="href"
          :class="item"
          :data-active="isExactActive || model === entry.id || undefined"
          :aria-current="isExactActive || model === entry.id ? 'page' : undefined"
          @click="navigate"
        >
          <span class="inline-flex min-w-0 items-center gap-2">
            <UiStatus v-if="entry.status" :status="entry.status" variant="dot" />
            <span class="truncate">{{ entry.label }}</span>
          </span>
          <UiCount v-if="entry.count !== undefined" :value="entry.count" class="group-data-active:text-strong" />
        </a>
      </NuxtLink>

      <button
        v-else
        type="button"
        :class="[item, entry.disabled && 'cursor-not-allowed opacity-50 hover:text-muted']"
        :data-active="model === entry.id || undefined"
        :aria-current="model === entry.id ? 'true' : undefined"
        :aria-disabled="entry.disabled || undefined"
        :title="entry.hint"
        @click="!entry.disabled && (model = entry.id)"
      >
        <span class="inline-flex min-w-0 items-center gap-2">
          <UiStatus v-if="entry.status" :status="entry.status" variant="dot" />
          <span class="truncate">{{ entry.label }}</span>
        </span>
        <UiCount v-if="entry.count !== undefined" :value="entry.count" class="group-data-active:text-strong" />
        <span v-else-if="entry.disabled" class="text-[12.5px] text-muted" aria-hidden="true">—</span>
      </button>
    </template>
  </nav>
</template>
