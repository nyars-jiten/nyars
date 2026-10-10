<script setup lang="ts">
import { version } from '~~/package.json'

const { t } = useI18n()
const config = useRuntimeConfig()

const link = 'text-muted no-underline hover:text-strong'

const repo = 'https://github.com/nyars-jiten/nyars'
const sha = config.public.buildSha as string
const builtAt = config.public.buildTime ? new Date(config.public.buildTime as string) : null

// фиксированный часовой пояс — одинаковый текст на сервере и в браузере
const MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
const builtAtText = computed(() => {
  if (!builtAt || Number.isNaN(builtAt.getTime()))
    return ''
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Moscow',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(builtAt).map(p => [p.type, p.value]))
  return `сборка ${Number(parts.day)} ${MONTHS[Number(parts.month) - 1]} ${parts.year}, ${parts.hour}:${parts.minute}`
})
</script>

<template>
  <footer class="mx-auto box-border w-full max-w-[1320px] px-8 max-[900px]:px-4">
    <div class="mt-14 grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-6 border-t border-line pt-7 pb-10 text-sm text-muted max-md:grid-cols-2 max-sm:grid-cols-1">
      <div>
        <p class="m-0 font-serif text-base font-semibold tracking-[.07em] text-ink">
          НЯРС
        </p>
        <p class="mt-1.5 mb-0 max-w-80">
          Открытый японско-русский словарь. Статьи пишут и проверяют участники сообщества.
        </p>
        <p class="mt-3.5 mb-0 inline-flex flex-wrap items-center gap-x-2 text-[12.5px] tabular-nums" aria-label="Сведения о сборке">
          <a :href="`${repo}/releases/tag/v${version}`" target="_blank" :class="link" :title="`Список изменений версии ${version}`">v{{ version }}</a>
          <template v-if="sha">
            <span class="text-line" aria-hidden="true">·</span>
            <a :href="`${repo}/commit/${sha}`" target="_blank" class="font-mono text-xs" :class="link" :title="`Коммит ${sha.slice(0, 7)} на GitHub`">{{ sha.slice(0, 7) }}</a>
          </template>
          <template v-if="builtAtText">
            <span class="text-line" aria-hidden="true">·</span>
            <time :datetime="builtAt!.toISOString()" title="Время сборки">{{ builtAtText }}</time>
          </template>
        </p>
      </div>

      <div>
        <UiCaption>Словарь</UiCaption>
        <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
          <li>
            <NuxtLink :to="{ name: 'edits' }" :class="link">
              {{ t('components.header.navigation[0].pages.edits') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ name: 'tags' }" :class="link">
              {{ t('components.header.navigation[0].pages.tags') }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <UiCaption>Данные</UiCaption>
        <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
          <li>
            <NuxtLink to="/downloads" :class="link">
              Скачать словарь
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div>
        <UiCaption>Сообщество</UiCaption>
        <ul class="m-0 flex list-none flex-col gap-1.5 p-0">
          <li v-if="config.public.discordUrl">
            <a :href="config.public.discordUrl" target="_blank" :class="link">Discord</a>
          </li>
          <li>
            <a href="https://github.com/nyars-jiten/nyars" target="_blank" :class="link">GitHub</a>
          </li>
          <li>
            <a href="https://github.com/nyars-jiten/nyars/issues" target="_blank" :class="link">
              {{ t('components.header.navigation[0].pages.github') }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
