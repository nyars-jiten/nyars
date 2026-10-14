<script setup lang="ts">
// Устройства: список активных сессий, завершение выбранной и выход на всех остальных
const { list, revoke, logoutOthers } = useSessions()
const toast = useToast()

const sessions = ref<UserSession[]>([])
const loading = ref(true)
const failed = ref(false)
const busy = ref<string | null>(null)

const hasOthers = computed(() => sessions.value.some(s => !s.current))

async function load() {
  loading.value = true
  failed.value = false
  try {
    sessions.value = await list()
  }
  catch {
    failed.value = true
  }
  finally {
    loading.value = false
  }
}

async function end(session: UserSession) {
  busy.value = session.id
  try {
    await revoke(session.id)
    sessions.value = sessions.value.filter(s => s.id !== session.id)
  }
  catch (error) {
    toast.error('Не удалось завершить сессию', {
      description: apiErrorText(error),
      action: { label: 'Повторить', run: () => end(session) },
    })
  }
  finally {
    busy.value = null
  }
}

async function endOthers() {
  busy.value = 'others'
  try {
    await logoutOthers()
    sessions.value = sessions.value.filter(s => s.current)
  }
  catch (error) {
    toast.error('Не удалось выйти на других устройствах', {
      description: apiErrorText(error),
      action: { label: 'Повторить', run: endOthers },
    })
  }
  finally {
    busy.value = null
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleString('ru-RU', { dateStyle: 'medium', timeStyle: 'short' })
}

onMounted(load)
</script>

<template>
  <section class="space-y-4">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h3 class="text-xl font-semibold">
        Устройства
      </h3>
      <UiButton v-if="hasOthers" variant="danger" :disabled="busy !== null" @click="endOthers">
        Выйти на всех остальных устройствах
      </UiButton>
    </div>

    <p v-if="loading" class="text-muted">
      Загрузка…
    </p>
    <div v-else-if="failed" class="flex items-center gap-3">
      <span class="text-muted">Не удалось загрузить список устройств</span>
      <UiButton @click="load">
        Повторить
      </UiButton>
    </div>
    <ul v-else class="space-y-2">
      <li
        v-for="session in sessions"
        :key="session.id"
        class="flex flex-wrap items-center justify-between gap-3 rounded-ctl border border-line p-3"
      >
        <div class="min-w-0 space-y-1">
          <div class="flex items-center gap-2">
            <span class="truncate font-semibold">{{ session.user_agent || 'Неизвестное устройство' }}</span>
            <span v-if="session.current" class="text-sm text-muted">· это устройство</span>
          </div>
          <div class="text-sm text-muted">
            {{ session.ip }} · последний раз {{ formatDate(session.last_used_at) }}
          </div>
        </div>
        <UiButton v-if="!session.current" :disabled="busy !== null" @click="end(session)">
          Завершить
        </UiButton>
      </li>
    </ul>
  </section>
</template>
