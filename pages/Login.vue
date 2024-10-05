<script setup lang="ts">
import { object, string } from 'yup'

definePageMeta({
  layout: 'desktop',
  name: 'Login',
  path: '/login',
})

const notificationStore = useNotificationStore()
const userStore = useUserStore()

const isRegister = ref(false)

const schema = object({
  login: string().min(3).default('').required(),
  password: string().min(3).default('').required(),
})

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(schema),
})

const submit = handleSubmit(async ({ login, password }) => {
  const auth = useAuth()

  const user: User | null = null
  const authError: AuthError | null = null

  try {
    if (isRegister.value) {
    /* const { data, error } = */ await auth.register({ login, password })
    // user = data
    // authError = error
    }

    else {
    /* const { data, error } = */await auth.login({ login, password })
    // user = data
    // authError = error
    }

    if (authError !== null) {
    // notificationStore.createNotification(authError.text)
    // return
    }
  }
  catch {
    notificationStore.createNotification('An error occurred')
    return
  }

  userStore.user.value = user
  await navigateTo('/')
})

const { t } = useI18n()

const login = useField('login')
const password = useField('password')
</script>

<template>
  <section class="flex justify-center">
    <UiBlock class="w-1/3 space-y-8">
      <span class="flex items-center justify-between gap-4">
        <h1 class="text-xl font-semibold">
          {{ t(isRegister ? 'pages.login.titleRegister' : 'pages.login.titleLogin') }}
        </h1>

        <NuxtLink
          to="/api/users/auth/discord"
          external
        >
          <UiButton icon="ic:baseline-discord" color="discord">
            <span>{{ t('pages.login.discordOAuth') }}</span>
          </UiButton>
        </NuxtLink>
      </span>

      <form class="space-y-8" @submit="submit">
        <span class="space-y-4">
          <UiInput v-model="login.value.value" type="text" autocomplete="username">
            <template #hint>
              {{ t('pages.login.login') }}
            </template>
          </UiInput>

          <UiInput v-model="password.value.value" type="password" autocomplete="current-password">
            <template #hint>
              {{ t('pages.login.password') }}
            </template>
          </UiInput>
        </span>

        <section v-show="Object.keys(errors).length > 0" class="grid grid-cols-[auto_1fr] gap-2 px-8">
          <template v-for="value, path in errors" :key="path">
            <p class="text-rose-300">
              {{ path }}
            </p>

            <p>
              {{ value }}
            </p>
          </template>
        </section>

        <section class="flex justify-between">
          <UiButton type="submit">
            save
          </UiButton>

          <div class="flex gap-2">
            <span v-show="!isRegister">
              {{ $t('pages.login.noAccount') }}
            </span>

            <span
              class="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-ns-500"
              @click="isRegister = !isRegister"
            >
              {{ $t(isRegister ? 'pages.login.titleLogin' : 'pages.login.titleRegister') }}
            </span>
          </div>
        </section>
      </form>
    </UiBlock>
  </section>
</template>
