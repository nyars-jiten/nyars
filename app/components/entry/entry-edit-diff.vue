<script setup lang="ts">
// Компактное сравнение правки «Было | Стало» для истории статьи: только изменённые строки,
// удалённые напротив добавленных, изменённые куски подсвечены. Между блоками — «⋯».
const props = defineProps<{
  lines: EditDiffLine[]
}>()

type Pair = { gap: true } | { gap?: false, del: DiffRow | null, add: DiffRow | null }

const pairs = computed(() => {
  const out: Pair[] = []
  let i = 0
  const list = props.lines
  while (i < list.length) {
    const line = list[i]!
    if (line.kind === 'gap') {
      out.push({ gap: true })
      i++
      continue
    }
    const dels: DiffRow[] = []
    const adds: DiffRow[] = []
    while (i < list.length && list[i]!.kind === 'del') dels.push(list[i++] as DiffRow)
    while (i < list.length && list[i]!.kind === 'add') adds.push(list[i++] as DiffRow)
    for (let k = 0; k < Math.max(dels.length, adds.length); k++)
      out.push({ del: dels[k] ?? null, add: adds[k] ?? null })
  }
  return out
})

function segments(text: DiffRow['text']): DiffSegment[] {
  return typeof text === 'string' ? [{ text }] : text
}

const ln = 'select-none py-0.5 pr-2 text-right font-mono text-[11.5px] leading-[1.95] text-muted'
const tx = 'min-w-0 px-3 py-0.5 [overflow-wrap:anywhere] whitespace-pre-wrap'
const none = 'bg-[repeating-linear-gradient(135deg,transparent_0_6px,var(--line)_6px_7px)]'
</script>

<template>
  <div class="overflow-x-auto rounded-tag shadow-[inset_0_0_0_1px_var(--line)]">
    <div class="min-w-[440px] font-ui text-sm leading-[1.6]">
      <div class="grid grid-cols-2 border-b border-line text-[11px] font-extrabold tracking-[.08em] text-muted uppercase">
        <span class="py-1.5 pr-3 pl-[52px]">Было</span>
        <span class="border-l border-line py-1.5 pr-3 pl-[52px]">Стало</span>
      </div>

      <template v-for="(pair, p) in pairs" :key="p">
        <div v-if="pair.gap" class="border-y border-line/60 py-0.5 text-center text-xs leading-4 text-muted" aria-label="Строки без изменений">
          ⋯
        </div>
        <div v-else class="grid grid-cols-[40px_minmax(0,1fr)_40px_minmax(0,1fr)]">
          <span :class="ln">{{ pair.del?.old }}</span>
          <span v-if="!pair.del" :class="[tx, none]" />
          <span v-else :class="tx" class="bg-danger-soft">
            <span class="inline-block w-4 font-extrabold text-danger" aria-hidden="true">−</span>
            <span class="sr-only">удалено:</span>
            <template v-for="(seg, s) in segments(pair.del.text)" :key="s">
              <span v-if="seg.hl" class="rounded-[3px] bg-danger px-px text-surf">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </span>

          <span :class="ln" class="border-l border-line">{{ pair.add?.new }}</span>
          <span v-if="!pair.add" :class="[tx, none]" />
          <span v-else :class="tx" class="bg-soft">
            <span class="inline-block w-4 font-extrabold text-strong" aria-hidden="true">+</span>
            <span class="sr-only">добавлено:</span>
            <template v-for="(seg, s) in segments(pair.add.text)" :key="s">
              <span v-if="seg.hl" class="rounded-[3px] bg-acc px-px text-onacc">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
