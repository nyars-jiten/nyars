<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const { user } = storeToRefs(useUserStore())
const { changeUsername } = useSettings()

const isChanging = ref(false)
const showSuccess = ref(false)

// Form validation schema
const schema = yup.object({
  username: yup
    .string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .max(20, 'Имя пользователя не должно превышать 20 символов')
    .matches(
      /^[\w-]+$/,
      'Имя пользователя может содержать только латинские буквы, цифры, дефисы и подчеркивания',
    )
    .required('Имя пользователя обязательно'),
})

const { handleSubmit, defineField, errors, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    username: user.value?.username || '',
  },
})

const [username, usernameAttrs] = defineField('username')

// Watch for user changes to update form
watch(user, (newUser) => {
  if (newUser) {
    username.value = newUser.username
  }
}, { immediate: true })

// Submit handler using new composable
const onSubmit = handleSubmit(async (values) => {
  try {
    isChanging.value = true

    const result = await changeUsername(values.username)

    if (result.success) {
      showSuccess.value = true
      resetForm()

      // Hide success message after 3 seconds
      setTimeout(() => {
        showSuccess.value = false
      }, 3000)
    }
    else {
      console.error('Failed to change username:', result.error)
    }
  }
  catch (error) {
    console.error('Failed to change username:', error)
  }
  finally {
    isChanging.value = false
  }
})

// Check if username has changed
const hasChanges = computed(() => {
  return username.value !== user.value?.username
})
</script>

<template>
  <UiBlock>
    <template #default>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-white">
            Визуальное имя пользователя
          </h3>
        </div>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="bg-green-900/20 border border-green-800 text-green-400 px-4 py-3 rounded-lg"
        >
          <div class="flex items-center gap-2">
            <Icon name="ic:baseline-check-circle" />
            Визуальное имя успешно изменено
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="onSubmit">
          <!-- Current Username Display -->
          <div class="bg-neutral-800/30 rounded-lg p-4">
            <div class="text-sm text-neutral-400 mb-1">
              Текущее визуальное имя:
            </div>
            <div class="text-white font-medium">
              {{ user?.username }}
            </div>
            <div class="text-xs text-neutral-500 mt-1">
              Логин для входа: {{ user?.login }}
            </div>
          </div>

          <!-- Username Input -->
          <div>
            <label class="block text-sm font-medium text-white mb-2">
              Новое визуальное имя
            </label>
            <UiInput
              v-model="username"
              v-bind="usernameAttrs"
              placeholder="Введите новое визуальное имя"
              :class="{ 'border-red-500': errors.username }"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-red-400">
              {{ errors.username }}
            </p>
            <div class="mt-2 text-xs text-neutral-400">
              Визуальное имя может содержать только латинские буквы, цифры, дефисы и подчеркивания.
              Длина: от 3 до 20 символов. Это имя будет отображаться в профиле и комментариях.
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <UiButton
              type="submit"
              color="save"
              :disabled="isChanging || !hasChanges"
            >
              <Icon v-if="isChanging" name="ic:baseline-hourglass-empty" class="animate-spin" />
              <Icon v-else name="ic:baseline-person" />
              {{ isChanging ? 'Изменение...' : 'Изменить визуальное имя' }}
            </UiButton>
          </div>
        </form>

        <!-- Warning -->
        <div class="bg-amber-900/20 border border-amber-800 text-amber-400 px-4 py-3 rounded-lg">
          <div class="flex items-start gap-2">
            <Icon name="ic:baseline-warning" class="mt-0.5 flex-shrink-0" />
            <div class="text-sm">
              <div class="font-medium mb-1">
                Важно:
              </div>
              <ul class="space-y-1 text-xs">
                <li>• Изменение визуального имени повлияет на все ваши правки и комментарии</li>
                <li>• Ссылка на ваш профиль изменится</li>
                <li>• Другие пользователи смогут найти вас по новому имени</li>
                <li>• Логин для входа останется прежним</li>
                <li>• Это действие нельзя отменить</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UiBlock>
</template>
