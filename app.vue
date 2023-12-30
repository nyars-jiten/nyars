<template>
  <div>
    <NuxtLoadingIndicator color="#6aa3ab" :height="2" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@keyframes Up {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes Down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(5px);
  }
}

.page-enter-active  {
  animation: Up 300ms ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.page-enter-to  {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-active  {
  animation: Down 150ms ease-in;
}

.page-leave-from  {
  opacity: 1;
  transform: translateY(0);
}

.page-leave-to  {
  opacity: 0;
  transform: translateY(5px);
}
</style>
