import type { Toaster } from '~/utils/toaster'

/**
 * Всплывающие уведомления: useToast().ok('Сохранено'), .error(...), .warn(...), .info(...),
 * .loading(...), .promise(p, { loading, ok, error }), .update(id, ...), .dismiss(id?).
 * На сервере очередь не работает: уведомления отвечают на действия пользователя в браузере.
 */
export function useToast(): Toaster {
  return (useNuxtApp().$toast as Toaster | undefined) ?? createToaster()
}
