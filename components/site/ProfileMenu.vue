<script setup lang="ts">
import { tv } from 'tailwind-variants'

const { clientLogout } = useApi(userRepository)

const { t } = useI18n()
const { user } = storeToRefs(useUserStore())

// TODO: not nullable
const avatar = computed(() => useAvatar(user.value?.avatar ?? '').href)

async function logout() {
  await clientLogout()
  user.value = null
  navigateTo('/')
}

const styles = tv({
  variants: {
    entity: {
      menuItem: 'text-center rounded-md p-2 hover:bg-zinc-800 hover:text-zinc-400 leading-none transition-colors',
    },
  },
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 text-base">
    <div v-if="user" class="group relative">
      <button type="button" class="flex items-center gap-2 rounded-md p-1.5 hover:bg-zinc-800 hover:text-zinc-400 transition-colors">
        <img
          class="size-6 rounded-full object-center group-hover:rotate-12 transition-transform"
          :src="avatar"
          :alt="user.username"
        >
        <Icon size="1.5rem" name="ic:baseline-keyboard-arrow-down" class="group-hover:-rotate-180 duration-200 ease-out transition-[transform,opacity] group-hover:opacity-10" />
      </button>

      <div class="absolute right-0 invisible top-full w-44 group-hover:visible">
        <div class="flex flex-col gap-1 rounded-md mt-2 p-2 shadow-md outline outline-1 outline-neutral-800 bg-neutral-900">
          <NuxtLink
            :to="{ name: 'users-username', params: { username: user.username } }"
            :class="styles({ entity: 'menuItem' })"
          >
            <span>{{ t('components.header.profileMenu.profile') }}</span>
          </NuxtLink>

          <!-- <NuxtLink to="/" :class="styles({ entity: 'menuItem' })">
            <span>{{ t('components.header.profileMenu.settings') }}</span>
          </NuxtLink> -->

          <button
            type="button"
            :class="styles({ entity: 'menuItem' })"
            @click="logout"
          >
            <span>{{ t('components.header.profileMenu.exit') }}</span>
          </button>

          <!-- <div class="border-t border-ns-gray-300 pt-2 dark:border-ns-gray-600">
            <ThemeSwitcher class="w-full" />
          </div> -->
        </div>
      </div>
    </div>

    <NuxtLink v-else :to="{ name: 'users-login' }" type="button">
      <UiButton :title="t('components.header.profileMenu.login')" icon="ic:baseline-account-circle" />
    </NuxtLink>
  </div>
</template>
