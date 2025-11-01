<script setup lang="ts">
const { user } = storeToRefs(useUserStore())

// Redirect if not authenticated
if (!user.value) {
  await navigateTo('/users/login')
}
</script>

<template>
  <NotImplemented v-if="true" />
  <div v-else class="min-h-screen bg-neutral-900">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold mb-2">
            Настройки
          </h1>
          <p class="text-neutral-400">
            Управление профилем, безопасностью и предпочтениями
          </p>
        </div>

        <!-- Settings Content -->
        <div class="space-y-8">
          <!-- Profile Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="ic:baseline-person" size="1.5rem" />
              <h2 class="text-2xl font-semibold">
                Профиль
              </h2>
            </div>
            <avatar-uploader />
            <username-changer />
          </div>

          <!-- Security Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="ic:baseline-security" size="1.5rem" />
              <h2 class="text-2xl font-semibold">
                Безопасность
              </h2>
            </div>
            <password-changer />
          </div>

          <!-- Preferences Section -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon name="ic:baseline-settings" size="1.5rem" />
              <h2 class="text-2xl font-semibold">
                Предпочтения
              </h2>
            </div>
            <settings-manager />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
