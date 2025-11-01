<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { updatePassword } = useUserProfile()

const isChanging = ref(false)
const showSuccess = ref(false)

// Form validation schema
const schema = yup.object({
  currentPassword: yup.string().required('Текущий пароль обязателен'),
  newPassword: yup
    .string()
    .min(3, 'Пароль должен содержать минимум 3 символа')
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    //   'Пароль должен содержать строчную букву, заглавную букву и цифру',
    // )
    .required('Новый пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Пароли не совпадают')
    .required('Подтверждение пароля обязательно'),
})

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: schema,
})

const [currentPassword, currentPasswordAttrs] = defineField('currentPassword')
const [newPassword, newPasswordAttrs] = defineField('newPassword')
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword')

// Password visibility toggles
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  try {
    isChanging.value = true

    await updatePassword(values.currentPassword, values.newPassword)

    showSuccess.value = true
    resetForm()

    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }
  catch (error) {
    console.error('Failed to change password:', error)
  }
  finally {
    isChanging.value = false
  }
})

function togglePasswordVisibility(field: 'current' | 'new' | 'confirm') {
  switch (field) {
    case 'current':
      showCurrentPassword.value = !showCurrentPassword.value
      break
    case 'new':
      showNewPassword.value = !showNewPassword.value
      break
    case 'confirm':
      showConfirmPassword.value = !showConfirmPassword.value
      break
  }
}
</script>

<template>
  <UiBlock>
    <template #default>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">
            Изменение пароля
          </h2>
        </div>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <Icon name="ic:baseline-check-circle" />
            Пароль успешно изменен
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <!-- Current Password -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Текущий пароль
            </label>
            <div class="relative">
              <UiInput
                v-model="currentPassword"
                v-bind="currentPasswordAttrs"
                :type="showCurrentPassword ? 'text' : 'password'"
                placeholder="Введите текущий пароль"
                :class="{ 'border-red-500': errors.currentPassword }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                @click="togglePasswordVisibility('current')"
              >
                <Icon
                  :name="showCurrentPassword ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'"
                  size="1.25rem"
                />
              </button>
            </div>
            <p v-if="errors.currentPassword" class="mt-1 text-sm text-red-400">
              {{ errors.currentPassword }}
            </p>
          </div>

          <!-- New Password -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Новый пароль
            </label>
            <div class="relative">
              <UiInput
                v-model="newPassword"
                v-bind="newPasswordAttrs"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="Введите новый пароль"
                :class="{ 'border-red-500': errors.newPassword }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                @click="togglePasswordVisibility('new')"
              >
                <Icon
                  :name="showNewPassword ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'"
                  size="1.25rem"
                />
              </button>
            </div>
            <p v-if="errors.newPassword" class="mt-1 text-sm text-red-400">
              {{ errors.newPassword }}
            </p>
            <div class="mt-2 text-xs text-neutral-400">
              Пароль должен содержать минимум 8 символов, включая строчную букву, заглавную букву и цифру.
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Подтверждение пароля
            </label>
            <div class="relative">
              <UiInput
                v-model="confirmPassword"
                v-bind="confirmPasswordAttrs"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Подтвердите новый пароль"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                @click="togglePasswordVisibility('confirm')"
              >
                <Icon
                  :name="showConfirmPassword ? 'ic:baseline-visibility-off' : 'ic:baseline-visibility'"
                  size="1.25rem"
                />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <UiButton
              type="submit"
              color="save"
              :disabled="isChanging"
            >
              <Icon v-if="isChanging" name="ic:baseline-hourglass-empty" class="animate-spin" />
              <Icon v-else name="ic:baseline-lock" />
              {{ isChanging ? 'Изменение...' : 'Изменить пароль' }}
            </UiButton>
          </div>
        </form>
      </div>
    </template>
  </UiBlock>
</template>
