<script setup lang="ts">
interface Props {
  isBanned: boolean
  banReason?: string
  isBanning: boolean
}

interface Emits {
  (e: 'start-ban'): void
  (e: 'confirm-ban', reason: string): void
  (e: 'cancel-ban'): void
  (e: 'unban'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const banReasonInput = ref('')

function handleStartBan() {
  emit('start-ban')
}

function handleConfirmBan() {
  if (banReasonInput.value.trim()) {
    emit('confirm-ban', banReasonInput.value.trim())
    banReasonInput.value = ''
  }
}

function handleCancelBan() {
  banReasonInput.value = ''
  emit('cancel-ban')
}

function handleUnban() {
  emit('unban')
}
</script>

<template>
  <div class="space-y-4">
    <!-- Ban/Unban Actions -->
    <div class="flex gap-2">
      <LegacyButton
        v-if="!isBanned"
        icon="ic:baseline-block"
        color="delete"
        @click="handleStartBan"
      >
        Заблокировать
      </LegacyButton>

      <LegacyButton
        v-else
        icon="ic:baseline-check-circle"
        color="save"
        @click="handleUnban"
      >
        Разблокировать
      </LegacyButton>
    </div>

    <!-- Ban Reason Input -->
    <div v-if="isBanning" class="space-y-2">
      <label class="block text-sm text-neutral-400">
        Причина блокировки:
      </label>

      <LegacyInput
        v-model="banReasonInput"
        placeholder="Введите причину блокировки..."
        class="w-full"
        @keyup.enter="handleConfirmBan"
      />

      <div class="flex gap-2">
        <LegacyButton
          color="delete"
          :disabled="!banReasonInput.trim()"
          @click="handleConfirmBan"
        >
          Подтвердить блокировку
        </LegacyButton>
        <LegacyButton
          color="cancel"
          @click="handleCancelBan"
        >
          Отмена
        </LegacyButton>
      </div>
    </div>
  </div>
</template>
