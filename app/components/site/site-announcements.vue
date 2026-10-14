<script setup lang="ts">
// Лента объявлений с сервера под шапкой («Сайт закроется на профилактику…»).
// Сворачивается при скрытии; объявления без dismissible остаются, пока не закончатся.
const { announcements, dismiss } = useAnnouncements()
const reduced = usePreferredReducedMotion()

const closing = ref(new Set<string>())

function close(id: string) {
  closing.value = new Set(closing.value).add(id)
  setTimeout(() => dismiss(id), reduced.value === 'reduce' ? 0 : 200)
}

const isExternal = (url: string) => /^https?:\/\//i.test(url)
</script>

<template>
  <section v-if="announcements.length" aria-label="Объявления">
    <div
      v-for="a of announcements"
      :key="a.id"
      class="grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
      :class="closing.has(a.id) ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'"
    >
      <div class="min-h-0 overflow-hidden">
        <UiAlert
          variant="banner"
          :tone="a.tone"
          :title="a.title"
          :dismissible="a.dismissible"
          dismiss-label="Скрыть объявление"
          @dismiss="close(a.id)"
        >
          {{ a.body }}
          <template v-if="a.link" #actions>
            <UiButton
              variant="link"
              size="sm"
              :to="a.link.url"
              :external="isExternal(a.link.url)"
              :target="isExternal(a.link.url) ? '_blank' : undefined"
            >
              {{ a.link.label }}
            </UiButton>
          </template>
        </UiAlert>
      </div>
    </div>
  </section>
</template>
