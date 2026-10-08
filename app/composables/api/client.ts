import type { $Fetch, NitroFetchRequest } from 'nitropack'

/**
 * Base API client configuration
 */
export interface ApiClientConfig {
  baseURL?: string
  timeout?: number
  credentials?: RequestCredentials
}

/**
 * Create a typed API client with proper error handling
 */
export function useApiClient() {
  const { $apiFetch } = useNuxtApp()
  
  return {
    /**
     * Typed fetch method with error handling
     */
    fetch: $apiFetch as $Fetch<any, NitroFetchRequest>,
    
    /**
     * Make a request with automatic error handling
     */
    async request<T>(
      url: string,
      options?: Parameters<$Fetch<T, NitroFetchRequest>>[1]
    ): Promise<T> {
      try {
        return await $apiFetch<T>(url, options)
      }
      catch (error: any) {
        // Plain Error (not createError): callers catch these; createError trips Nuxt's
        // fatal error overlay even when handled, and Nuxt 4.2 crashes on non-HTML bodies.
        if (error?.response) {
          const err = new Error(error.response.statusText || 'Request failed') as Error & {
            statusCode?: number
            data?: unknown
          }
          err.statusCode = error.response.status
          err.data = error.response._data
          throw err
        }

        const err = new Error(error?.message || 'Network error') as Error & {
          statusCode?: number
          data?: unknown
        }
        err.statusCode = 500
        err.data = { message: error?.message }
        throw err
      }
    },
    
    /**
     * GET request helper
     */
    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
      return await this.request<T>(url, {
        method: 'GET',
        params,
      })
    },
    
    /**
     * POST request helper
     */
    async post<T>(url: string, body?: any, params?: Record<string, any>): Promise<T> {
      return await this.request<T>(url, {
        method: 'POST',
        body,
        params,
      })
    },
    
    /**
     * PUT request helper
     */
    async put<T>(url: string, body?: any): Promise<T> {
      return await this.request<T>(url, {
        method: 'PUT',
        body,
      })
    },
    
    /**
     * DELETE request helper
     */
    async delete<T>(url: string, body?: any): Promise<T> {
      return await this.request<T>(url, {
        method: 'DELETE',
        body,
      })
    },
  }
}

/**
 * Composable for making API requests with automatic caching
 */
export function useApiQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: {
    watch?: any[]
    lazy?: boolean
    immediate?: boolean
  }
) {
  return useAsyncData<T>(key, fetcher, options)
}

/**
 * Composable for making POST/PUT/DELETE requests
 */
export function useApiMutation<T, R = T>(
  fetcher: (data: R) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void
    onError?: (error: any) => void
  }
) {
  const pending = ref(false)
  const error = ref<any>(null)
  
  const execute = async (data: R): Promise<T | null> => {
    try {
      pending.value = true
      error.value = null
      
      const result = await fetcher(data)
      
      if (options?.onSuccess) {
        options.onSuccess(result)
      }
      
      return result
    }
    catch (err: any) {
      error.value = err
      
      if (options?.onError) {
        options.onError(err)
      }
      
      return null
    }
    finally {
      pending.value = false
    }
  }
  
  return {
    execute,
    pending: readonly(pending),
    error: readonly(error),
  }
}


