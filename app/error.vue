<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })

const config = useRuntimeConfig()
</script>

<template>
  <NuxtLayout class="dark">
    <div class="flex text-gray-300 bg-neutral-900 min-h-full select-text flex-col items-center justify-center gap-4">
      <span class="text-4xl font-extralight">{{ error?.statusCode }}: Error occured</span>
      <!-- <span>{{ t('pages.development.text') }}</span> -->
      <button @click="handleError" class="cursor-pointer underline">Return to the main page</button>
      <div>
        <h2 class="text-xl font-semibold mt-4">Please report this issue:</h2>
        <ul class="list-disc list-inside text-gray-400">
          <li>
            Open an issue on our 
            <a href="https://github.com/nyars-jiten/nyars/issues" target="_blank" class="text-sky-600 font-bold hover:underline">GitHub Issue Tracker</a>
          </li>
          <li>
            Send a report in our 
            <a :href="config.public.discordUrl" target="_blank" class="text-discord font-bold hover:underline">Discord Server</a>
          </li>
        </ul>
      </div>
      <pre>{{ error?.message }}</pre>
      <pre class="bg-gray-900 text-rose-600 p-4 rounded-md mt-4 overflow-auto max-w-full break-all whitespace-pre-wrap">{{ error?.stack }}</pre>
      <img
        src="@/assets/img/under-construction-1000.png"
        alt="under-dev-image"
        class="w-1/4"
      >
    </div>
  </NuxtLayout>
</template>
