<script setup lang="ts">
import { object, string } from 'yup'

const notificationStore = useNotificationStore()

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
  const user = useUserStore()

  // const user: User | null = null
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
    notificationStore.createNotification('An error occurred', NyarsNotificationType.Error)
    return
  }

  // userStore.user.value = user
  await user.$refresh()
  await navigateTo('/')
})

const { t } = useI18n()

const login = useField('login')
const password = useField('password')
</script>

<template>
  <section class="flex justify-center">
    <div class="min-lg:w-1/3 space-y-16">
      <div class="space-y-4">
        <h1 class="text-center">
          {{ t(isRegister ? 'pages.login.titleRegister' : 'pages.login.titleLogin') }}
        </h1>
      </div>

      <div class="space-y-4 text-center">
        <NuxtLink
          class="block"
          to="/api/auth/discord"
          external
        >
          <UiButton icon="ic:baseline-discord" color="discord">
            <span>{{ t('pages.login.discordOAuth') }}</span>
          </UiButton>
        </NuxtLink>

        <div>
          или
        </div>

        <UiBlock>
          <form class="space-y-8" @submit="submit">
            <section class="space-y-4">
              <div>
                <UiInput v-model="login.value.value" type="text" autocomplete="username">
                  <template #hint>
                    {{ t('pages.login.login') }}
                  </template>
                </UiInput>

                <div class="text-start px-2 text-rose-300">
                  {{ errors.login }}
                </div>
              </div>

              <div>
                <UiInput v-model="password.value.value" type="password" autocomplete="current-password">
                  <template #hint>
                    {{ t('pages.login.password') }}
                  </template>
                </UiInput>

                <div class="text-start px-2 text-rose-300">
                  {{ errors.password }}
                </div>
              </div>
            </section>

            <section class="flex justify-between items-center gap-4">
              <UiButton type="submit" :disabled="Object.keys(errors).length > 0">
                {{ t(isRegister ? 'pages.login.titleRegister' : 'pages.login.titleLogin') }}
              </UiButton>

              <div class="flex gap-4 items-center">
                <span v-show="!isRegister">
                  {{ t('pages.login.noAccount') }}
                </span>

                <span
                  class="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-neutral-500"
                  @click="isRegister = !isRegister"
                >
                  {{ t(isRegister ? 'pages.login.titleLogin' : 'pages.login.titleRegister') }}
                </span>
              </div>
            </section>
          </form>
        </UiBlock>
      </div>
    </div>
  </section>
</template>
