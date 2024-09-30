<script setup lang="ts">
definePageMeta({
  name: 'Login',
  path: '/login',
})

const { clientRegister, clientLogin } = useApi(userRepository)

const notificationStore = useNotificationStore()
const userStore = useUserStore()

const isRegister = ref(false)

const login = ref('')
const password = ref('')

async function clickAuth() {
  if (login.value === '' || password.value === '') {
    return
  }

  let user: User | null = null
  let authError: AuthError | null = null

  if (isRegister.value) {
    const { data, error } = await clientRegister(login.value, password.value)
    user = data
    authError = error
  }
  else {
    const { data, error } = await clientLogin(login.value, password.value)
    user = data
    authError = error
  }
  if (authError !== null) {
    notificationStore.createNotification(authError.text)
    return
  }
  userStore.user = user
  navigateTo('/')
}
</script>

<template>
  <div class="flex select-text flex-col items-center justify-center gap-4 rounded-md border border-ns-gray-100 bg-white px-2 py-6 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800 sm:px-5 md:px-8">
    <span class="text-xl font-semibold dark:font-bold">
      {{ isRegister ? $t('pages.login.titleRegister') : $t('pages.login.titleLogin') }}
    </span>
    <div class="flex flex-col items-center justify-center gap-5">
      <input
        v-model="login"
        class="w-56 rounded-md border border-ns-gray-300 bg-transparent px-3 py-2 text-xl shadow-md outline-none dark:border-ns-gray-600"
        type="text"
        :placeholder="$t('pages.login.login')"
      >
      <input
        v-model="password"
        class="w-56 rounded-md border border-ns-gray-300 bg-transparent px-3 py-2 text-xl shadow-md outline-none dark:border-ns-gray-600"
        type="password"
        :placeholder="$t('pages.login.password')"
      >
      <div class="flex gap-2">
        <span v-show="!isRegister">{{ $t('pages.login.noAccount') }}</span>
        <span
          class="cursor-pointer underline decoration-dotted underline-offset-4 hover:text-ns-500"
          @click="isRegister = !isRegister"
        >
          {{ isRegister ? $t('pages.login.titleLogin') : $t('pages.login.titleRegister') }}
        </span>
      </div>
      <button
        class="rounded-md bg-ns-gray-100 px-6 py-1 hover:opacity-75 dark:bg-ns-gray-700"
        @click="clickAuth"
      >
        <span>{{ isRegister ? $t('pages.login.buttonRegister') : $t('pages.login.buttonLogin') }}</span>
      </button>
      <div v-show="!isRegister" class="flex flex-col items-center justify-center gap-4">
        <div class="relative after:absolute after:top-1/2 after:ml-2 after:w-24 after:border-t after:border-ns-gray-200 after:content-[''] after:dark:border-ns-gray-600">
          <span class="uppercase after:absolute after:right-full after:top-1/2 after:mr-2 after:w-24 after:border-t after:border-ns-gray-200 after:content-[''] after:dark:border-ns-gray-600">
            {{ $t('pages.login.or') }}
          </span>
        </div>
        <NuxtLink
          to="/api/users/auth/discord"
          external
          class="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-800 shadow-md outline-none hover:bg-gray-200 dark:border-[#5865F2] dark:bg-[#5865F2] dark:text-white dark:hover:opacity-75"
        >
          <IconDiscord class="!m-0 text-[24px] text-[#5865F2] dark:text-white" />
          <span>{{ $t('pages.login.discordOAuth') }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
