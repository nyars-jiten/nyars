import type { $Fetch, NitroFetchRequest } from 'nitropack'

export function useApi<T>(repositoryFn: <K>(fetch: $Fetch<K, NitroFetchRequest>) => T) {
  const { $apiFetch } = useNuxtApp()

  return repositoryFn($apiFetch)
}
