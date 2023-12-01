const apiFetch = $fetch.create({
  baseURL: process.env.NUXT_PUBLIC_API_URL,
  credentials: 'include',
  headers: {
    Accept: 'application/json'
  }
})

export default apiFetch
