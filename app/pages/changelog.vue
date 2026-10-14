<script setup lang="ts">
import changelog from '~~/CHANGELOG.md?raw'
import { version as currentVersion } from '~~/package.json'

useHead({ title: 'Список изменений' })

const releases = parseChangelog(changelog)

// оформление текста из разметки: код, ссылки
const richText = '[&_a]:text-strong [&_a]:underline [&_code]:rounded-sm [&_code]:bg-line/60 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[.92em]'
</script>

<template>
  <div class="mx-auto max-w-[760px]">
    <div class="flex justify-center border-b border-line pt-8 pb-6 max-sm:pt-4">
      <img
        src="@/assets/img/under-construction-1000.png"
        alt=""
        class="h-auto w-84 max-sm:w-48"
      >
    </div>

    <header class="py-6">
      <h1 class="m-0 text-[32px] leading-[1.15] normal-case font-extrabold tracking-tight">
        Список изменений
      </h1>
      <p class="mt-2 mb-0 text-muted">
        Что нового в НЯРС.
      </p>
    </header>

    <article
      v-for="release in releases"
      :id="release.id"
      :key="release.id"
      class="scroll-mt-20 border-t border-line py-6"
      :class="richText"
    >
      <div class="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 class="m-0 text-2xl font-extrabold normal-case" :class="{ 'tabular-nums': release.version }">
          {{ release.version ? `v${release.version}` : release.title }}
        </h2>
        <UiTag v-if="release.version === currentVersion" size="xs" class="self-center">
          текущая
        </UiTag>
        <time v-if="release.date" :datetime="release.date" class="text-sm text-muted tabular-nums">{{ formatChangelogDate(release.date) }}</time>
      </div>

      <template v-for="(group, gi) in [{ title: '', blocks: release.intro }, ...release.sections]" :key="gi">
        <section v-if="group.blocks.length" class="mb-4 last:mb-0">
          <UiCaption v-if="group.title">
            {{ group.title }}
          </UiCaption>

          <template v-for="(block, bi) in group.blocks" :key="bi">
            <ul v-if="block.kind === 'list'" class="m-0 mb-3 flex list-disc flex-col gap-1.5 pl-5 last:mb-0">
              <li v-for="(item, ii) in block.items" :key="ii">
                <!-- eslint-disable-next-line vue/no-v-html -- текст экранируется в formatChangelogInline -->
                <span v-html="formatChangelogInline(item.text)" />
                <ul v-if="item.children.length" class="mt-1.5 flex list-[circle] flex-col gap-1.5 pl-5">
                  <!-- eslint-disable-next-line vue/no-v-html -- см. выше -->
                  <li v-for="(child, ci) in item.children" :key="ci" v-html="formatChangelogInline(child)" />
                </ul>
              </li>
            </ul>
            <!-- eslint-disable vue/no-v-html -- текст экранируется в formatChangelogInline -->
            <blockquote
              v-else-if="block.kind === 'quote'"
              class="m-0 mb-3 border-l-2 border-line pl-4 text-muted last:mb-0"
              v-html="formatChangelogInline(block.text)"
            />
            <p v-else class="m-0 mb-3 last:mb-0" v-html="formatChangelogInline(block.text)" />
            <!-- eslint-enable vue/no-v-html -->
          </template>
        </section>
      </template>
    </article>

    <p v-if="!releases.length" class="text-muted">
      Список изменений пока пуст.
    </p>
  </div>
</template>
