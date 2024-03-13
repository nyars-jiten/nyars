<script setup lang="ts">
  const api = useApi()

  const { user } = storeToRefs(useUserStore())

  const logout = async () => {
    await api.userRepository.clientLogout()

    user.value = null

    navigateTo('/')
  }
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 text-base">
    <div class="group relative">
      <NuxtLink to="/" class="flex items-center gap-2 rounded-md p-1.5 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700 [@media(hover:none)]:pointer-events-none">
        <img
          v-if="user"
          class="size-9 rounded-full object-center"
          :src="useAvatar(user.avatar).href"
          :alt="user.username"
        >
        <IconAccount v-else class="!m-0 text-3xl" />
        <span class="inline-block max-w-20 overflow-hidden text-ellipsis min-[380px]:max-w-32 sm:max-w-40">
          {{ user ? user.username : $t('components.header.profileMenu.unknownUser') }}
        </span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:rotate-[-180deg]" />
      </NuxtLink>
      <div class="absolute right-0 hidden w-[180px] group-hover:inline lg:left-1/2 lg:ml-[-90px]">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.profileMenu.profile') }}</span>
          </NuxtLink>
          <NuxtLink to="/" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.profileMenu.settings') }}</span>
          </NuxtLink>
          <NuxtLink v-if="!user" :to="{name: 'Login'}" class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700">
            <span>{{ $t('components.header.profileMenu.login') }}</span>
          </NuxtLink>
          <button
            v-else
            type="button"
            class="flex items-center justify-center rounded-md p-1 hover:bg-ns-gray-100 dark:hover:bg-ns-gray-700"
            @click="logout"
          >
            <span>{{ $t('components.header.profileMenu.exit') }}</span>
          </button>
          <div class="border-t border-ns-gray-300 pt-2 dark:border-ns-gray-600">
            <ThemeSwitcher class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
