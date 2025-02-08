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
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        Скачать
      </h1>
    </div>
    <div class="space-y-4">
      <div v-for="(dl, dli) in dlData.filter(x => x.data)" :key="dli">
        <div class="flex items-center space-x-4">
          <img :src="`/download/${dl.icon}`" class="w-12 h-12">
          <div>
            <h2 class="text-xl font-bold">
              {{ dl.title }}
              <a :href="getExportPath(dl.data?.filepath ?? '')">
                <Icon size="1.5rem" name="ic:baseline-download" />
              </a>
              <span>
                ({{ computeSize(dl.data?.size ?? 0) }})
              </span>
            </h2>
            <p>
              {{ dl.msg }} (Обновлено {{ useTime(dl.data?.createdAt ?? new Date()) }})
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
