export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl,
    credentials: 'include',
    headers: useRequestHeaders(['cookie']),
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
