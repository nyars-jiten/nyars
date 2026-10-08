<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

const config = useRuntimeConfig()
</script>

<template>
  <NuxtLayout>
    <div class="flex min-h-full select-text flex-col items-center justify-center gap-4 bg-bg text-ink">
      <span class="text-4xl font-extralight">{{ error?.statusCode }}: Error occured</span>
      <!-- <span>{{ t('pages.development.text') }}</span> -->
      <button class="cursor-pointer text-strong underline" @click="handleError">
        Return to the main page
      </button>
      <div>
        <h2 class="mt-4 text-xl font-semibold">
          Please report this issue:
        </h2>
        <ul class="list-inside list-disc text-muted">
          <li>
            Open an issue on our
            <a href="https://github.com/nyars-jiten/nyars/issues" target="_blank" class="font-bold text-strong hover:underline">GitHub Issue Tracker</a>
          </li>
          <li>
            Send a report in our
            <a :href="config.public.discordUrl" target="_blank" class="font-bold text-discord hover:underline">Discord Server</a>
          </li>
        </ul>
      </div>
      <pre>{{ error?.message }}</pre>
      <pre class="mt-4 max-w-full overflow-auto rounded-md bg-surf p-4 text-sec break-all whitespace-pre-wrap">{{ error?.stack }}</pre>
      <img
        src="@/assets/img/under-construction-1000.png"
        alt="under-dev-image"
        class="w-1/4"
      >
    </div>
  </NuxtLayout>
</template>
