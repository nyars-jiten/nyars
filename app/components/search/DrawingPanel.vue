<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const hw = ref<Handwriting>(new Null())
const proposals = ref<string[]>([])

const { refresh } = useSuggestionsStore()
const { request } = useSearchRequest()

const update = useDebounceFn(async () => {
  const response = await hw.value.getProposals()
  proposals.value = response[1][0][1]
}, 100)

function clear() {
  proposals.value = []
  hw.value.clear()
}

async function onSelect(q: string) {
  request.value += q
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
  if (ctrl.value && z.value) {
    undo()
  }
})

watchEffect(() => {
  if (ctrl.value && c.value) {
    clear()
  }
})
</script>

<template>
  <section class="bg-neutral-900 p-4 outline outline-1 outline-neutral-800 shadow-md rounded-md flex gap-4">
    <div class="flex flex-col gap-4">
      <canvas
        ref="canvas"
        class="h-80 w-80 cursor-crosshair bg-neutral-800 rounded-md"
        @mousemove="hw.onDraw"
        @mousedown="hw.onStart"
        @touchmove="hw.onDraw"
        @touchstart="hw.onStart"
        @mouseup="onEnd"
        @mouseleave="onEnd"
        @touchend="onEnd"
      />

      <div class="flex items-center gap-4">
        <input
          v-show="hw.maxLineWidth > 0"
          v-model="lineWidth"
          class="h-2 w-full appearance-none rounded bg-white dark:bg-gray-600"
          type="range"
          :step="hw.step"
          :min="hw.minLineWidth"
          :max="hw.maxLineWidth"
        >

        <UiButton type="button" icon="mdi:eraser-variant" @click="clear" />
        <UiButton type="button" icon="mdi:undo-variant" @click="undo" />
      </div>
    </div>

    <div
      v-show="proposals.length"
      class="grid grid-cols-2 content-start gap-2"
    >
      <UiButton
        v-for="proposal of proposals"
        :key="proposal"
        type="button"
        @click="onSelect(proposal)"
      >
        {{ proposal }}
      </UiButton>
    </div>
  </section>
</template>
