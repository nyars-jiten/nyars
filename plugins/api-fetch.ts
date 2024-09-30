export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    // credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
