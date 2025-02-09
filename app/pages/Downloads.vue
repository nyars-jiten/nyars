<script setup lang="ts">
const { getDownloads } = useJpnRepo()

const { data: downloads } = await useAsyncData(() => getDownloads())

const getExportPath = function (file: string) {
  return `/static/export/${file}`
}

const computeSize = function (size: number) {
  const units = ['b', 'kb', 'Mb', 'Gb', 'Tb']
  let unit = 0
  while (size > 1024) {
    size /= 1024
    unit++
  }
  return `${size.toFixed(2)} ${units[unit]}`
}

const dlData = [
  {
    type: 'json',
    title: 'JSON',
    msg: 'Исходные данные в формате JSON',
    icon: 'json.png',
    data: downloads.value?.find(dl => dl.type === 'json'),
  },
  {
    type: 'dsl',
    title: 'DSL',
    msg: 'Для программ Lingvo и GoldenDict',
    icon: 'lingvo.png',
    data: downloads.value?.find(dl => dl.type === 'dsl'),
  },
  {
    type: 'yomitan',
    title: 'Yomitan',
    msg: 'Для браузерного плагина Yomitan',
    icon: 'yomitan.png',
    data: downloads.value?.find(dl => dl.type === 'yomitan'),
  },
]

const faqData = [
  {
    id: 1,
    question: 'В каком формате выгружены данные?',
    answer: 'JSON',
  },
  {
    id: 2,
    question: 'Какие данные выгружаются?',
    answer: 'JSON',
  },
  {
    id: 3,
    question: 'Какие данные выгружаются?',
    answer: 'JSON',
  },
  {
    id: 4,
    question: 'Какие данные выгружаются?',
    answer: 'JSON',
  },
  {
    id: 5,
    question: 'Какие данные выгружаются?',
    answer: 'JSON',
  },
  {
    id: 6,
    question: 'Какие данные выгружаются?',
    answer: 'JSON',
  },
]
</script>

<template>
  <section class="space-y-16">
    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          Скачать
        </h1>

        <p>
          Выгружено 20 статей
        </p>
      </div>

      <div class="inline-grid grid-cols-[auto_auto] gap-4 items-center">
        <template v-for="(dl) in dlData.filter(x => x.data)" :key="dl.type">
          <a v-if="dl.data" :href="getExportPath(dl.data.filepath)" class="flex gap-2 outline-1 outline-zinc-700 shadow-md hover:bg-zinc-800 transition-colors hover:outline-transparent rounded-md p-2 items-center">
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
                Обновлено {{ useTime(dl.data.createdAt) }}
              </small>
            </span>
          </a>

          <div>
            <h2 class="text-2xl">
              {{ dl.title }}
            </h2>

            <p>
              {{ dl.msg }}
            </p>
          </div>
        </template>
      </div>
    </section>

    <section class="space-y-4">
      <div class="text-center leading-16">
        <h1>
          faq
        </h1>
      </div>

      <ul class="space-y-4">
        <li v-for="faq in faqData" :key="faq.id" class="last:border-0 last:pb-0 border-neutral-800 border-b pb-4">
          <h2 class="text-2xl">
            {{ faq.question }}
          </h2>

          <p>
            {{ faq.answer }}
          </p>
        </li>
      </ul>
    </section>
  </section>
</template>
