<script setup lang="ts">
const { getDownloads } = useJpnDownloads()

const { data: downloads } = getDownloads()

function getExportPath(file: string) {
  return `/static/export/${file}`
}

function computeSize(size: number) {
  const units = ['b', 'kb', 'Mb', 'Gb', 'Tb']
  let unit = 0
  while (size > 1024) {
    size /= 1024
    unit++
  }
  return `${size.toFixed(2)} ${units[unit]}`
}

const { t, tm, rt } = useI18n()

const dlData = computed(() => [
  {
    type: 'json',
    title: 'JSON',
    icon: 'json.png',
    data: downloads.value?.find(dl => dl.type === 'json'),
  },
  {
    type: 'dsl',
    title: 'DSL',
    icon: 'lingvo.png',
    data: downloads.value?.find(dl => dl.type === 'dsl'),
  },
  {
    type: 'yomitan',
    title: 'Yomitan',
    icon: 'yomitan.png',
    data: downloads.value?.find(dl => dl.type === 'yomitan'),
  },
  {
    type: 'yomichan-legacy',
    title: 'Yomichan Legacy',
    icon: 'yomichan-legacy.png',
    data: downloads.value?.find(dl => dl.type === 'yomichan-legacy'),
  },
])
</script>

<template>
  <section class="space-y-16">
    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          {{ t('pages.downloads.title') }}
        </h1>

        <p>
          {{ t('pages.downloads.count', dlData.find(x => x.data?.type === 'json')?.data?.count ?? 0) }}
        </p>
      </div>

      <div class="inline-grid grid-cols-[auto_auto] gap-4 items-center">
        <template v-for="(dl) in dlData.filter(x => x.data)" :key="dl.type">
          <a v-if="dl.data" :href="getExportPath(dl.data.filepath)" class="flex gap-2 outline-1 outline-zinc-700 shadow hover:bg-zinc-800 transition-colors hover:outline-transparent rounded-md p-2 items-center">
            <img :src="`/download/${dl.icon}`" class="w-12 h-12">

            <span>
              <div>
                <span>
                  {{ dl.data.filepath }}
                </span>

                <span>
                  ({{ computeSize(dl.data.size) }})
                </span>
              </div>

              <small class="text-neutral-300">
                {{ t('pages.downloads.updated', [useTime(dl.data.createdAt).value]) }}
              </small>
            </span>
          </a>

          <div>
            <h2 class="text-2xl">
              {{ dl.title }}
            </h2>

            <p>
              {{ t(`pages.downloads.dictionary.${dl.type}`) }}
            </p>
          </div>
        </template>
      </div>
    </section>

    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          {{ t('pages.downloads.faq') }}
        </h1>
      </div>

      <ul class="space-y-4">
        <li v-for="(faq, fi) in tm('pages.downloads.faqList') as any[]" :key="fi" class="last:border-0 last:pb-0 border-neutral-800 border-b pb-4">
          <h2 class="text-2xl">
            {{ rt(faq.q) }}
          </h2>

          <p>
            {{ rt(faq.a) }}
          </p>
        </li>
      </ul>
    </section>
  </section>
</template>
