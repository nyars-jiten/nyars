<script setup lang="ts">
// Область всплывающих уведомлений, один раз в app.vue. Всегда в DOM (в том числе при SSR, пустая):
// скринридеры подписываются на live-регионы заранее. Карточки сами не live — о каждом новом
// уведомлении сообщают два скрытых региона (status для обычных, alert для ошибок).
// Alt+T переводит фокус в область, Esc в ней закрывает уведомление и возвращает фокус.
const toaster = useToast()
const reduced = usePreferredReducedMotion()
const visibility = useDocumentVisibility()

const root = useTemplateRef('root')
const hovered = ref(false)
const focused = ref(false)
const paused = computed(() => hovered.value || focused.value || visibility.value === 'hidden')

// --- анимация: высота карточки сворачивается через margin-top, соседи съезжают плавно
const EASE = 'cubic-bezier(.2, .8, .2, 1)'

function onEnter(el: Element, done: () => void) {
  const node = el as HTMLElement
  const h = node.offsetHeight
  const frames = reduced.value === 'reduce'
    ? [{ opacity: 0 }, { opacity: 1 }]
    : [
        { opacity: 0, transform: 'translateY(8px)', marginTop: `${-h}px` },
        { opacity: 1, transform: 'none', marginTop: '8px' },
      ]
  const anim = node.animate(frames, { duration: 250, easing: EASE })
  anim.onfinish = done
  anim.oncancel = done
}

function onLeave(el: Element, done: () => void) {
  const node = el as HTMLElement
  const h = node.offsetHeight
  const frames = reduced.value === 'reduce'
    ? [{ opacity: 1 }, { opacity: 0 }]
    : [
        { opacity: 1, transform: 'none', marginTop: '8px' },
        { opacity: 0, transform: 'scale(.96)', marginTop: `${-h}px` },
      ]
  const anim = node.animate(frames, { duration: 220, easing: EASE, fill: 'forwards' })
  anim.onfinish = done
  anim.oncancel = done
}

// --- диктор
const polite = ref('')
const assertive = ref('')
const announced = new Set<string>()

watch(() => toaster.visible.map(t => `${t.uid}:${t.epoch}:${t.tone}`).join('|'), async () => {
  const fresh = toaster.visible.filter(t => !announced.has(`${t.uid}:${t.epoch}:${t.tone}`))
  if (!fresh.length)
    return
  for (const t of fresh)
    announced.add(`${t.uid}:${t.epoch}:${t.tone}`)
  const say = (list: readonly UiToast[]) => list
    .map(t => `${TONE_LABEL[t.tone]}: ${t.title}.${t.description ? ` ${t.description}` : ''}`)
    .join(' ')
  const loud = fresh.filter(t => t.tone === 'danger')
  const quiet = fresh.filter(t => t.tone !== 'danger')
  polite.value = ''
  assertive.value = ''
  await nextTick()
  polite.value = say(quiet)
  assertive.value = say(loud)
})

// --- клавиатура
let returnFocus: HTMLElement | null = null

useEventListener('keydown', (e: KeyboardEvent) => {
  if (e.altKey && e.code === 'KeyT') {
    e.preventDefault()
    if (!root.value?.contains(document.activeElement))
      returnFocus = document.activeElement as HTMLElement | null
    root.value?.focus()
  }
})

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && returnFocus && toaster.visible.length <= 1) {
    returnFocus.focus()
    returnFocus = null
  }
}

function onFocusout(e: FocusEvent) {
  if (!root.value?.contains(e.relatedTarget as Node | null))
    focused.value = false
}
</script>

<template>
  <section
    ref="root"
    aria-label="Уведомления"
    tabindex="-1"
    class="pointer-events-none fixed right-4 bottom-4 z-[60] w-[340px] outline-none max-[640px]:inset-x-2.5 max-[640px]:right-auto max-[640px]:bottom-[calc(10px+env(safe-area-inset-bottom))] max-[640px]:w-auto"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="focused = true"
    @focusout="onFocusout"
    @keydown="onKeydown"
  >
    <TransitionGroup tag="ol" :css="false" class="m-0 flex list-none flex-col p-0" @enter="onEnter" @leave="onLeave">
      <li v-for="toast of toaster.visible" :key="toast.uid" class="pointer-events-auto mt-2">
        <UiToast :toast="toast" :paused="paused" @close="toaster.dismiss(toast.uid)" />
      </li>
    </TransitionGroup>

    <div class="sr-only" role="status" aria-live="polite">
      {{ polite }}
    </div>
    <div class="sr-only" role="alert" aria-live="assertive">
      {{ assertive }}
    </div>
  </section>
</template>
