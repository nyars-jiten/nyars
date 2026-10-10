<script setup lang="ts">
// Сравнение версий статьи: построчно (unified) или рядом (split).
// Блоки (hunks) сворачиваются; между блоками — кнопка «N строк без изменений — показать».
const props = withDefaults(defineProps<{
  hunks: readonly DiffHunk[]
  mode?: 'unified' | 'split'
}>(), {
  mode: 'unified',
})

const emit = defineEmits<{
  /** запросить скрытые строки после блока с индексом */
  unfold: [hunkIndex: number]
}>()

const collapsed = ref(new Set<number>())

function toggle(index: number) {
  const next = new Set(collapsed.value)
  if (next.has(index))
    next.delete(index)
  else
    next.add(index)
  collapsed.value = next
}

function segments(text: DiffRow['text']): DiffSegment[] {
  return typeof text === 'string' ? [{ text }] : text
}

type SplitPair = [DiffRow | null, DiffRow | null]

// для режима «рядом»: удалённые строки встают напротив добавленных
function pairRows(rows: readonly DiffRow[]): SplitPair[] {
  const pairs: SplitPair[] = []
  let i = 0
  while (i < rows.length) {
    const row = rows[i]!
    if (row.kind === 'ctx') {
      pairs.push([row, row])
      i++
      continue
    }
    const dels: DiffRow[] = []
    const adds: DiffRow[] = []
    while (i < rows.length && rows[i]!.kind === 'del') dels.push(rows[i++]!)
    while (i < rows.length && rows[i]!.kind === 'add') adds.push(rows[i++]!)
    for (let k = 0; k < Math.max(dels.length, adds.length); k++)
      pairs.push([dels[k] ?? null, adds[k] ?? null])
  }
  return pairs
}

const split = computed(() => props.hunks.map(hunk => pairRows(hunk.rows)))

function pluralLines(n: number) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11)
    return 'строка'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
    return 'строки'
  return 'строк'
}

const ln = 'select-none bg-bg py-0.5 pr-2 text-right font-mono text-[11.5px] leading-[1.95] text-muted'
const tx = 'min-w-0 px-3 py-0.5 break-words whitespace-pre-wrap'
const txKind = {
  ctx: '',
  del: 'bg-danger-soft',
  add: 'bg-soft',
} as const
const hlKind = {
  ctx: '',
  del: 'rounded-[3px] bg-danger px-px text-surf line-through decoration-1',
  add: 'rounded-[3px] bg-acc px-px text-onacc',
} as const
const none = 'bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--line)_6px_7px)]'
</script>

<template>
  <div class="overflow-x-auto rounded-panel shadow-[inset_0_0_0_1px_var(--line)]">
    <div class="min-w-[560px] font-ui text-sm leading-[1.6]">
      <div
        v-if="mode === 'split'"
        class="grid grid-cols-2 bg-bg text-xs font-extrabold tracking-[.06em] text-muted uppercase"
      >
        <span class="py-2 pr-3.5 pl-14">Было</span>
        <span class="border-l border-line py-2 pr-3.5 pl-14">Стало</span>
      </div>

      <template v-for="(hunk, index) in hunks" :key="index">
        <section :class="{ 'border-t border-line': index > 0 || mode === 'split' }">
          <div class="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 bg-bg py-1 pr-3 pl-1">
            <button
              type="button"
              class="flex min-h-[38px] cursor-pointer items-center gap-2 rounded-ctl px-2 text-left text-sm text-ink hover:bg-soft focus-visible:outline-2 focus-visible:outline-strong"
              :aria-expanded="!collapsed.has(index)"
              @click="toggle(index)"
            >
              <Icon
                name="tabler:chevron-right"
                size="14px"
                class="transition-transform duration-150"
                :class="{ 'rotate-90': !collapsed.has(index) }"
              />
              <b>{{ hunk.title }}</b>
            </button>

            <span v-if="hunk.range" class="font-mono text-[12.5px] text-muted">{{ hunk.range }}</span>

            <DiffStat v-if="hunk.plus !== undefined && hunk.minus !== undefined" :plus="hunk.plus" :minus="hunk.minus" class="text-[13px]" />
          </div>

          <div v-if="!collapsed.has(index)" class="border-t border-line">
            <!-- построчно -->
            <template v-if="mode === 'unified'">
              <div v-for="(row, r) in hunk.rows" :key="r" class="grid grid-cols-[44px_44px_minmax(0,1fr)]">
                <span :class="ln">{{ row.old }}</span>
                <span :class="ln">{{ row.new }}</span>
                <span :class="[tx, txKind[row.kind]]">
                  <span v-if="row.kind !== 'ctx'" class="inline-block w-4 font-extrabold" :class="row.kind === 'del' ? 'text-danger' : 'text-strong'" aria-hidden="true">{{ row.kind === 'del' ? '−' : '+' }}</span>
                  <span v-if="row.kind !== 'ctx'" class="sr-only">{{ row.kind === 'del' ? 'удалено:' : 'добавлено:' }}</span>
                  <template v-for="(seg, s) in segments(row.text)" :key="s">
                    <span v-if="seg.hl" :class="hlKind[row.kind]">{{ seg.text }}</span>
                    <template v-else>{{ seg.text }}</template>
                  </template>
                </span>
              </div>
            </template>

            <!-- рядом -->
            <template v-else>
              <div v-for="(pair, r) in split[index]" :key="r" class="grid grid-cols-[44px_minmax(0,1fr)_44px_minmax(0,1fr)]">
                <template v-for="(row, side) in pair" :key="side">
                  <span :class="[ln, side === 1 && 'border-l border-line']">{{ row ? (side === 0 ? row.old : row.new) : '' }}</span>
                  <span v-if="!row" :class="[tx, none]" />
                  <span v-else :class="[tx, txKind[row.kind]]">
                    <template v-for="(seg, s) in segments(row.text)" :key="s">
                      <span v-if="seg.hl" :class="hlKind[row.kind]">{{ seg.text }}</span>
                      <template v-else>{{ seg.text }}</template>
                    </template>
                  </span>
                </template>
              </div>
            </template>
          </div>
        </section>

        <button
          v-if="hunk.foldedAfter"
          type="button"
          class="flex min-h-9 w-full cursor-pointer items-center gap-2.5 border-t border-line bg-bg px-3.5 text-left text-[13px] font-semibold text-strong hover:bg-soft focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-strong"
          @click="emit('unfold', index)"
        >
          <Icon name="tabler:plus" size="14px" />
          {{ hunk.foldedAfter }} {{ pluralLines(hunk.foldedAfter) }} без изменений — показать
        </button>
      </template>
    </div>
  </div>
</template>
