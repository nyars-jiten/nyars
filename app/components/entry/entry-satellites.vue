<script setup lang="ts">
// Сателлиты: статьи других словарей (Яркси, JMdict…) для сверки.
// Каждая — раскрывающаяся карточка: свёрнутая показывает источник и начало текста одной строкой.
// Первая раскрыта; «Развернуть все» / «Свернуть все» — справа сверху.
const props = defineProps<{
  satellites: EntryJpSatellite[]
  pending?: boolean
}>()

const sorted = computed(() => [...props.satellites].sort((a, b) => a.title.localeCompare(b.title)))

/** Текст тела без разметки: тело бывает обычным текстом или JSON со структурированной статьёй */
function plain(text: string): string {
  const walk = (node: unknown): string => {
    if (typeof node === 'string')
      return node
    if (Array.isArray(node))
      return node.map(walk).join(' ')
    if (node && typeof node === 'object' && 'content' in node)
      return walk((node as { content: unknown }).content)
    return ''
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  }
  catch {
    return text
  }
  return parsed && typeof parsed === 'object' ? walk(parsed) : text
}

function isStructured(text: string) {
  try {
    const parsed = JSON.parse(text)
    return Boolean(parsed) && typeof parsed === 'object'
  }
  catch {
    return false
  }
}

const items = computed(() => sorted.value.map(satellite => ({
  satellite,
  preview: satellite.body.map(body => plain(body.text)).join(' ').replace(/\s+/g, ' ').trim(),
  bodies: satellite.body.map(body => ({ text: body.text, structured: isStructured(body.text) })),
})))

// раскрытые карточки по id; по умолчанию — первая
const open = ref<Record<string, boolean>>({})
watch(sorted, (list) => {
  open.value = list[0] ? { [list[0].id]: true } : {}
}, { immediate: true })

const allOpen = computed(() => items.value.length > 0 && items.value.every(item => open.value[item.satellite.id]))

function toggleAll() {
  const value = !allOpen.value
  open.value = Object.fromEntries(items.value.map(item => [item.satellite.id, value]))
}

function toggle(id: string) {
  open.value = { ...open.value, [id]: !open.value[id] }
}

const baseId = useId()
</script>

<template>
  <div>
    <div v-if="pending" class="flex flex-col gap-2" aria-hidden="true">
      <div v-for="i in 2" :key="i" class="h-[46px] animate-pulse rounded-panel bg-soft" />
    </div>

    <p v-else-if="!items.length" class="m-0 py-2 text-[14.5px] text-muted">
      В других словарях статей не найдено.
    </p>

    <div v-else class="flex flex-col gap-2">
      <div v-if="items.length > 1" class="flex justify-end">
        <UiButton variant="link" size="sm" @click="toggleAll">
          {{ allOpen ? 'Свернуть все' : 'Развернуть все' }}
        </UiButton>
      </div>

      <section
        v-for="({ satellite, preview, bodies }, i) in items"
        :key="satellite.id"
        class="rounded-panel shadow-[inset_0_0_0_1px_var(--line)]"
        :aria-label="satellite.title"
      >
        <button
          type="button"
          class="flex min-h-[46px] w-full cursor-pointer items-center gap-2.5 rounded-panel pr-3.5 pl-2.5 text-left text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong"
          :aria-expanded="!!open[satellite.id]"
          :aria-controls="`${baseId}-${i}`"
          @click="toggle(satellite.id)"
        >
          <Icon
            name="tabler:chevron-right"
            size="16px"
            class="shrink-0 text-muted transition-transform duration-150"
            :class="{ 'rotate-90': open[satellite.id] }"
          />
          <span class="shrink-0 text-sm font-bold">{{ satellite.title }}</span>
          <span v-if="!open[satellite.id]" lang="ja" class="min-w-0 flex-1 truncate text-[13.5px] text-muted">{{ preview }}</span>
        </button>

        <div v-if="open[satellite.id]" :id="`${baseId}-${i}`" lang="ja" class="flex flex-col gap-2 pr-4 pb-3.5 pl-9">
          <div
            v-for="(body, b) in bodies"
            :key="b"
            class="overflow-x-auto text-[13.5px] leading-[1.6] [overflow-wrap:anywhere] whitespace-pre-wrap"
            :class="!body.structured && 'font-mono'"
          >
            <StructuredContent :body="body.text" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
