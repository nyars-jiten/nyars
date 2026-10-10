<script setup lang="ts">
const canvas = ref<HTMLCanvasElement>()
const hw = ref<Handwriting>(new Null())
const proposals = ref<string[]>([])

const { refresh } = useSuggestionsStore()
const { searchQuery } = storeToRefs(useSearchStore())

const update = useDebounceFn(async () => {
  const response = await hw.value.getProposals()
  proposals.value = response[1][0][1]
}, 100)

function clear() {
  proposals.value = []
  hw.value.clear()
}

async function onSelect(q: string) {
  searchQuery.value += q
  clear()
  await refresh()
}

async function onEnd() {
  hw.value.onEnd()

  await update()
}

async function undo() {
  hw.value.undo()

  await update()
}

const lineWidth = computed({
  get: () => hw.value.lineWidth,
  set: value => (hw.value.lineWidth = value),
})

onMounted(() => {
  if (!canvas.value) {
    throw new Error('element must be a canvas')
  }

  hw.value = new Canvas(canvas.value)
})

const { ctrl, z, c } = useMagicKeys()

watchEffect(() => {
  if (ctrl?.value && z?.value) {
    undo()
  }
})

watchEffect(() => {
  if (ctrl?.value && c?.value) {
    clear()
  }
})
</script>

<template>
  <section class="flex max-w-full flex-wrap gap-4 rounded-panel border border-line bg-surf p-3.5 shadow-lg">
    <div class="flex flex-col gap-3">
      <canvas
        ref="canvas"
        width="320"
        height="320"
        class="size-80 max-w-full cursor-crosshair touch-none rounded-ctl border border-line bg-field"
        aria-label="Поле для рукописного ввода"
        @mousemove="hw.onDraw"
        @mousedown="hw.onStart"
        @touchmove="hw.onDraw"
        @touchstart="hw.onStart"
        @mouseup="onEnd"
        @mouseleave="onEnd"
        @touchend="onEnd"
      />

      <div class="flex items-center gap-1">
        <input
          v-show="hw.maxLineWidth > 0"
          v-model="lineWidth"
          class="mr-2 w-full accent-strong"
          type="range"
          aria-label="Толщина линии"
          :step="hw.step"
          :min="hw.minLineWidth"
          :max="hw.maxLineWidth"
        >

        <UiIconButton icon="tabler:arrow-back-up" label="Отменить штрих (Ctrl+Z)" @click="undo" />
        <UiIconButton icon="tabler:eraser" label="Очистить (Ctrl+C)" @click="clear" />
      </div>
    </div>

    <div class="flex w-28 flex-col gap-2">
      <UiCaption class="mb-0">
        Варианты
      </UiCaption>

      <p v-if="!proposals.length" class="m-0 text-[13px] text-muted">
        Нарисуйте иероглиф — здесь появятся варианты.
      </p>

      <div v-else class="grid grid-cols-2 content-start gap-1.5">
        <button
          v-for="proposal of proposals"
          :key="proposal"
          type="button"
          class="flex h-11 cursor-pointer items-center justify-center rounded-ctl border border-line bg-bg font-jp text-xl text-ink transition-colors hover:border-strong hover:text-strong focus-visible:outline-2 focus-visible:outline-strong"
          @click="onSelect(proposal)"
        >
          {{ proposal }}
        </button>
      </div>
    </div>
  </section>
</template>
