<script setup lang="ts">
const { login, register } = useAuth()
const route = useRoute()
const router = useRouter()

const credentials = ref({
  login: '',
  password: '',
})

const loading = ref(false)
const error = ref('')
const isRegisterMode = ref(false)

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value
  error.value = ''
}

async function handleSubmit() {
  error.value = ''
  loading.value = true

  try {
    const result = isRegisterMode.value
      ? await register(credentials.value)
      : await login(credentials.value)

    if (result.error) {
      error.value = result.error.message || 'Authentication failed. Please try again.'
    }
    else if (result.data) {
      // Success! Redirect to the page they were trying to access, or home
      const redirectTo = route.query.redirect as string || '/'
      await router.push(redirectTo)
    }
  }
  catch (err: any) {
    error.value = err.message || 'An unexpected error occurred.'
  }
  finally {
    loading.value = false
  }
}

// Prevent accessing this page if already logged in
const { isAuthenticated } = useAuthState()
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div>
        <h2 class="text-center text-3xl font-bold text-gray-900 dark:text-white">
          {{ isRegisterMode ? 'Create Account' : 'Sign In' }}
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="login" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              id="login"
              v-model="credentials.login"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              :disabled="loading"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              :disabled="loading"
            >
          </div>
        </div>

        <div v-if="error" class="text-red-600 dark:text-red-400 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Please wait...' : (isRegisterMode ? 'Create Account' : 'Sign In') }}
          </button>
        </div>

        <div class="text-center">
          <button
            type="button"
            class="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
            :disabled="loading"
            @click="toggleMode"
          >
            {{ isRegisterMode ? 'Already have an account? Sign in' : "Don't have an account? Create one" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
