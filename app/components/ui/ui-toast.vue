<script setup lang="ts">
// Всплывающее уведомление: печать тона, заголовок, пояснение, действие, крестик и полоска таймера.
// Таймер живёт здесь: на паузе (paused) останавливается и продолжается с остатка,
// при повторе или обновлении (epoch) начинается заново. Закрытие — событие close.
const props = defineProps<{
  toast: UiToast
  paused: boolean
}>()

const emit = defineEmits<{ close: [] }>()

let timer: ReturnType<typeof setTimeout> | undefined
let remaining = props.toast.duration
let startedAt = 0
let running = false

function arm() {
  clearTimeout(timer)
  running = false
  if (!Number.isFinite(remaining) || props.paused)
    return
  running = true
  startedAt = Date.now()
  timer = setTimeout(() => emit('close'), remaining)
}

watch(() => props.toast.epoch, () => {
  remaining = props.toast.duration
  arm()
}, { immediate: true })

watch(() => props.paused, (paused) => {
  if (paused) {
    clearTimeout(timer)
    if (running)
      remaining -= Date.now() - startedAt
    running = false
  }
  else {
    arm()
  }
})

onBeforeUnmount(() => clearTimeout(timer))

function runAction() {
  const action = props.toast.action
  emit('close')
  action?.run()
}
</script>

<template>
  <div
    class="relative flex w-full gap-3 overflow-hidden rounded-panel border border-line bg-surf py-3 pr-2.5 pl-3 text-ink shadow-lg"
    @keydown.esc="emit('close')"
  >
    <UiSeal :tone="toast.tone" />

    <div class="flex min-w-0 flex-1 flex-col gap-0.5 pt-px">
      <p class="m-0 flex flex-wrap items-center gap-x-1.5 text-sm leading-snug font-bold">
        {{ toast.title }}
        <UiCount v-if="toast.count > 1" :value="`×${toast.count}`" pill :aria-label="`повторов: ${toast.count}`" />
      </p>
      <p v-if="toast.description" class="m-0 text-[13px] leading-snug text-muted">
        {{ toast.description }}
      </p>
      <div v-if="toast.action" class="-ml-2 mt-1">
        <UiButton variant="link" size="sm" @click="runAction">
          {{ toast.action.label }}
        </UiButton>
      </div>
    </div>

    <UiIconButton
      v-if="toast.tone !== 'loading'"
      class="-mt-0.5"
      size="sm"
      icon="tabler:x"
      label="Закрыть"
      @click="emit('close')"
    />

    <span
      v-if="Number.isFinite(toast.duration)"
      :key="toast.epoch"
      class="ui-toast-timer pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left opacity-55"
      :class="{
        'bg-ok': toast.tone === 'ok',
        'bg-danger': toast.tone === 'danger',
        'bg-warn': toast.tone === 'warn',
        'bg-strong': toast.tone === 'info' || toast.tone === 'loading',
      }"
      :style="{ animationDuration: `${toast.duration}ms`, animationPlayState: paused ? 'paused' : 'running' }"
    />
  </div>
</template>
