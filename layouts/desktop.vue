<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const { user, menuState } = storeToRefs(useUserStore())
const { clientLogout } = useApi(userRepository)
// const avatar = computed(() => useAvatar(user.value?.avatar ?? '').href)
const avatar = 'https://next.nyars.moe/upload/avatars/6bf3488d-da95-4936-880a-c66fb4bf3070.jpg'

const styles = tv({
  base: 'inline-block w-full px-8 py-3 text-center leading-none transition-colors hover:bg-zinc-800 hover:text-zinc-300',
})

async function logout() {
  await clientLogout()
  user.value = null
  await navigateTo('/')
}

const { t } = useI18n()
const headerStore = useHeaderStore()
const [userMenu, toggleUserMenu] = useToggle()

const userMenuRef = useTemplateRef('userMenuRef')
onClickOutside(userMenuRef, () => toggleUserMenu(false))

onMounted(() => {
  if (import.meta.client) {
    if (window.innerWidth < 1280) {
      menuState.value = false
    }
  }
})
</script>

<template>
  <div class="grid min-h-dvh grid-cols-[auto_1fr] gap-4 p-4">
    <section class="space-y-4 sticky h-[calc(100dvh-theme('spacing.8'))] top-4 bg-neutral-900 overflow-x-hidden overflow-y-auto max-sm:hidden">
      <UiButton type="button" @click="menuState = !menuState">
        <Icon v-if="menuState" size="1.5rem" name="ic:baseline-close" />
        <Icon v-else size="1.5rem" name="ic:baseline-menu" />
      </UiButton>

      <LayoutMenu class="inset-y-24" />
    </section>

    <LayoutMenu class="inset-y-24 z-50" secondary />

    <div class="space-y-4">
      <div class="sticky top-0 z-40 flex items-center justify-between gap-x-4 bg-neutral-900/95">
        <!-- <UiButton type="button" class="sm:hidden" @click="menuState = !menuState">
          <Icon size="1.5rem" name="ic:baseline-close" />
        </UiButton> -->

        <NuxtLink
          to="/"
          class="flex items-center gap-x-2"
          @click="headerStore.closeHamburgerMenu"
        >
          <div class="size-9 rounded-full bg-ns-logo-light bg-cover dark:bg-ns-logo-dark" />

          <span>
            <span class="text-xl leading-snug text-ns-500 dark:text-white">
              {{ t('components.header.nyars') }}
            </span>

            <small class="text-xs align-super">
              v11.1
            </small>
          </span>
        </NuxtLink>

        <Search class="w-1/2 max-xl:w-3/5 max-lg:w-3/4" />

        <div>
          <span v-if="user" ref="userMenuRef" class="relative flex items-center gap-1.5">
            <button type="button" @click="toggleUserMenu()">
              <img :src="avatar" :alt="user.username" class="inline-flex size-12 rounded-full border border-neutral-800 object-center shadow-md transition-transform hover:rotate-12">
            </button>

            <section v-if="userMenu" class="absolute right-full top-0 pr-2">
              <div class="space-y-2 overflow-hidden rounded-md bg-zinc-900 leading-none outline outline-1 outline-zinc-800">
                <NuxtLink :to="{ name: 'user-profile', params: { username: user.username } }" :class="styles()" @click="toggleUserMenu()">
                  profile
                </NuxtLink>

                <NuxtLink to="/dev" type="button" :class="styles()">
                  settings
                </NuxtLink>

                <button type="button" :class="styles()" @click="logout()">
                  logout
                </button>
              </div>
            </section>
          </span>

          <NuxtLink v-else to="/login">
            login
          </NuxtLink>
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>
