export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Get the cookie header from the incoming request
  // This works for both SSR (server-side) and client-side requests
  const cookieHeader = getRequestHeader(event, 'cookie')

  if (!cookieHeader) {
    // Return null if no cookie is present (user not logged in)
    return null
  }

  try {
    // Forward the request to the Golang API with the cookie
    // Use private apiUrl for server-side, fallback to public if not set
    const apiUrl = config.apiUrl || config.public.apiUrl

    const response = await $fetch('/users/me', {
      baseURL: apiUrl,
      method: 'GET',
      headers: {
        // Preserve the cookie from the client request
        cookie: cookieHeader,
      },
    })

    return response
  }
  catch (error: any) {
    // Handle errors from the Golang API
    if (error.response) {
      throw createError({
        statusCode: error.response.status,
        statusMessage: error.response.statusText,
        data: error.response._data,
      })
    }

    // Handle network or other errors
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch user data',
    })
  }
})
