// Очередь всплывающих уведомлений: только на клиенте, поэтому состояние не утекает между SSR-запросами
export default defineNuxtPlugin(() => ({
  provide: { toast: createToaster() },
}))
