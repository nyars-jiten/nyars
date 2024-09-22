<script setup lang="ts">
  useHead({
    titleTemplate: (pageTitle) => {
      return pageTitle ? `НЯРС — ${pageTitle}` : 'НЯРС'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'application/manifest+json', href: '/manifest.json' }
    ],
    noscript: [{ children: 'This app requires javascript to work' }],
    htmlAttrs: {
      lang: 'ru'
    },
    bodyAttrs: {
      class: 'min-h-screen select-none bg-ns-gray-100 text-ns-gray-700 dark:bg-ns-gray-900 dark:text-ns-gray-300'
    }
  })
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#6aa3ab" :height="2" :throttle="0" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <LazyNotifications />
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

  .page-enter-active {
    animation: Up 300ms ease-out;
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(5px);
  }

  .page-enter-to {
    opacity: 1;
    transform: translateY(0);
  }

  .page-leave-active {
    animation: Down 150ms ease-in;
  }

  .page-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(5px);
  }
</style>
