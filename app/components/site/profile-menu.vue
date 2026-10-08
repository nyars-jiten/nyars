<script setup lang="ts">
import { tv } from 'tailwind-variants'

const { logout: userLogout } = useAuthState()

const { t } = useI18n()
const { user } = storeToRefs(useUserStore())
const { getUserAvatarUrl } = useUserProfile()

// TODO: not nullable
const avatar = computed(() => getUserAvatarUrl(user.value?.avatar ?? '').href)

async function logout() {
  await userLogout()
  navigateTo('/')
}

const styles = tv({
  variants: {
    entity: {
      menuItem: 'text-center rounded-md p-2 text-ink hover:bg-soft leading-none transition-colors',
    },
  },
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 text-base">
    <div class="group relative">
      <button
        type="button"
        class="flex items-center gap-2 rounded-md p-1.5 text-ink transition-colors hover:bg-soft"
        :aria-label="user ? user.username : 'Меню'"
      >
        <template v-if="user">
          <img
            class="size-6 rounded-full object-center transition-transform group-hover:rotate-12"
            :src="avatar"
            :alt="user.username"
          >
        </template>
        <Icon
          v-else
          size="1.5rem"
          name="ic:baseline-palette"
        />
        <Icon
          size="1.5rem"
          name="ic:baseline-keyboard-arrow-down"
          class="transition-[transform,opacity] duration-200 ease-out group-hover:-rotate-180 group-hover:opacity-10"
        />
      </button>

      <div class="invisible absolute top-full right-0 w-52 group-hover:visible">
        <div class="mt-2 flex flex-col gap-1 rounded-md bg-surf p-2 shadow outline-1 outline-line">
          <template v-if="user">
            <NuxtLink
              :to="{ name: 'users-username', params: { username: user.username } }"
              :class="styles({ entity: 'menuItem' })"
            >
              <span>{{ t('components.header.profileMenu.profile') }}</span>
            </NuxtLink>

            <button
              type="button"
              :class="styles({ entity: 'menuItem' })"
              @click="logout"
            >
              <span>{{ t('components.header.profileMenu.exit') }}</span>
            </button>

            <div class="border-t border-line pt-2">
              <PaletteSwitcher />
            </div>
          </template>

          <template v-else>
            <NuxtLink
              :to="{ name: 'users-login' }"
              :class="styles({ entity: 'menuItem' })"
            >
              <span>{{ t('components.header.profileMenu.login') }}</span>
            </NuxtLink>

            <div class="border-t border-line pt-2">
              <PaletteSwitcher />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
