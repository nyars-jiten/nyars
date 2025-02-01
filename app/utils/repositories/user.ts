export function useUser() {
  return useApi((fetch) => {
    const path = '/users'

    const current = () => useAsyncData(() => fetch</* ApiError | */ ExtendedUser>(`${path}/me`, {
      // method: 'GET',
      // credentials: 'include',
      headers: useRequestHeaders(['cookie']),
    }), {
      server: false,
    })

    return { current }
  });
}
