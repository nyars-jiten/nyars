<script setup lang="ts">
import { object, string } from 'yup'

const toast = useToast()

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

  // login/register сами кладут пользователя в стор и запускают сессию
  const { error } = isRegister.value
    ? await auth.register({ login, password })
    : await auth.login({ login, password })

  if (error) {
    toast.error(error.message || 'Не удалось войти')
    return
  }

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
          <LegacyButton icon="ic:baseline-discord" color="discord">
            <span>{{ t('pages.login.discordOAuth') }}</span>
          </LegacyButton>
        </NuxtLink>

        <div>
          или
        </div>

        <UiBlock>
          <form class="space-y-8" @submit="submit">
            <section class="space-y-4">
              <div>
                <LegacyInput v-model="login.value.value" type="text" autocomplete="username">
                  <template #hint>
                    {{ t('pages.login.login') }}
                  </template>
                </LegacyInput>

                <div class="text-start px-2 text-rose-300">
                  {{ errors.login }}
                </div>
              </div>

              <div>
                <LegacyInput v-model="password.value.value" type="password" autocomplete="current-password">
                  <template #hint>
                    {{ t('pages.login.password') }}
                  </template>
                </LegacyInput>

                <div class="text-start px-2 text-rose-300">
                  {{ errors.password }}
                </div>
              </div>
            </section>

            <section class="flex justify-between items-center gap-4">
              <LegacyButton type="submit" :disabled="Object.keys(errors).length > 0">
                {{ t(isRegister ? 'pages.login.titleRegister' : 'pages.login.titleLogin') }}
              </LegacyButton>

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
