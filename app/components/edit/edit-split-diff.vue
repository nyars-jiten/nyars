<script setup lang="ts">
// Сравнение правки «рядом»: слева было, справа стало, удалённые строки напротив добавленных.
// Строки без изменений между фрагментами свёрнуты в «⋯ N строк без изменений» (см. editSplitDiff).
const props = defineProps<{
  lines: readonly EditSplitLine[]
  oldLabel?: string
  newLabel?: string
}>()

interface Cell {
  /** номер строки на своей стороне */
  num?: number
  /** null — строки на этой стороне нет */
  row: DiffRow | null
  side: 'old' | 'new'
}

const view = computed(() => props.lines.map(line => !('old' in line)
  ? { fold: line.fold, cells: [] as Cell[] }
  : {
      fold: 0,
      cells: [
        { side: 'old', num: line.old?.old, row: line.old },
        { side: 'new', num: line.new?.new, row: line.new },
      ] as Cell[],
    }))

function segments(text: DiffRow['text']): DiffSegment[] {
  return typeof text === 'string' ? [{ text }] : text
}

const ln = 'select-none bg-bg py-0.5 pr-2 text-right font-mono text-[11.5px] leading-[1.95] text-muted'
const tx = 'min-w-0 px-3 py-0.5 [overflow-wrap:anywhere] whitespace-pre-wrap'
const txKind = {
  ctx: 'bg-bg',
  del: 'bg-danger-soft',
  add: 'bg-soft',
} as const
const hlKind = {
  ctx: '',
  del: 'rounded-[3px] bg-danger px-px text-surf',
  add: 'rounded-[3px] bg-acc px-px text-onacc',
} as const
// штриховка — общий фон всех строк, а не каждой ячейки: так полосы стыкуются между строками разной высоты.
// Поэтому ячейки с текстом непрозрачные, а пустая сторона прозрачная.
const hatch = 'bg-bg bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--line)_6px_7px)]'
</script>

<template>
  <div class="overflow-x-auto rounded-panel border border-line">
    <div class="min-w-[560px] font-ui text-sm leading-[1.6]">
      <div class="grid grid-cols-2 bg-bg text-xs font-extrabold tracking-[.06em] text-muted uppercase">
        <span class="py-2 pr-3.5 pl-14">{{ oldLabel ?? 'Было' }}</span>
        <span class="border-l border-line py-2 pr-3.5 pl-14">{{ newLabel ?? 'Стало' }}</span>
      </div>

      <div class="border-t border-line" :class="hatch">
        <template v-for="(line, i) in view" :key="i">
          <div
            v-if="line.fold"
            class="flex min-h-7 items-center border-line bg-bg pr-3.5 pl-14 text-[12.5px] font-semibold text-muted not-first:border-t not-last:border-b"
          >
            ⋯ {{ line.fold }} {{ pluralRu(line.fold, 'строка', 'строки', 'строк') }} без изменений
          </div>

          <div v-else class="grid grid-cols-[44px_minmax(0,1fr)_44px_minmax(0,1fr)]">
            <template v-for="cell in line.cells" :key="cell.side">
              <span :class="[ln, cell.side === 'new' && 'border-l border-line']">{{ cell.num }}</span>
              <span v-if="!cell.row" :class="tx" />
              <span v-else :class="[tx, txKind[cell.row.kind]]">
                <span v-if="cell.row.kind !== 'ctx'" class="sr-only">{{ cell.side === 'old' ? 'удалено:' : 'добавлено:' }}</span>
                <template v-for="(seg, s) in segments(cell.row.text)" :key="s">
                  <span v-if="seg.hl" :class="hlKind[cell.row.kind]">{{ seg.text }}</span>
                  <template v-else>{{ seg.text }}</template>
                </template>
              </span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
