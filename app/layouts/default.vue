<script lang="ts" setup>
import { version } from '@/../package.json'
import { tv } from 'tailwind-variants'

// user,
const { menuState } = storeToRefs(useUserStore())
// const { clientLogout } = useUserRepo()
// const avatar = computed(() => useAvatar(user.value?.avatar ?? '').href)

// const styles = tv({
//   base: 'inline-block w-full px-8 py-3 text-center leading-none transition-colors hover:bg-zinc-800 hover:text-zinc-300',
// })

// async function logout() {
//   await clientLogout()
//   user.value = null
//   await navigateTo('/')
// }

// const { t } = useI18n()
const headerStore = useHeaderStore()
// const [userMenu, toggleUserMenu] = useToggle()

// const userMenuRef = useTemplateRef('userMenuRef')
// onClickOutside(userMenuRef, () => toggleUserMenu(false))

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
    <section class="sticky top-4 h-[calc(100dvh-theme('spacing.8'))] space-y-4 overflow-y-auto overflow-x-hidden bg-neutral-900 max-sm:hidden">
      <UiButton :outline="false" type="button" @click="menuState = !menuState">
        <Icon v-if="menuState" size="1.5rem" name="ic:baseline-close" />
        <Icon v-else size="1.5rem" name="ic:baseline-menu" />
      </UiButton>

      <LayoutMenu class="inset-y-24" />
    </section>

    <LayoutMenu class="inset-y-24 z-50 pt-4" secondary />

    <div class="flex flex-col space-y-4">
      <div class="sticky top-0 z-40 flex items-center justify-between gap-x-4 bg-neutral-900/95">
        <NuxtLink
          to="/"
          class="flex items-center gap-x-2"
          @click="headerStore.closeHamburgerMenu"
        >
          <div class="mt-1 size-9 rounded-full bg-cover invert" style="background-image: url('/favicon-logo.svg');" />

          <span class="text-xl leading-snug">
            <span class="text-ns-500 dark:text-white">Н</span>
            <span class="text-ns-500 dark:text-ns-500">Я</span>
            <span class="text-ns-500 dark:text-white">РС</span>

            <small class="align-top text-xs">
              v{{ version }}
            </small>
          </span>
        </NuxtLink>

        <Search class="w-1/2 max-xl:w-3/5 max-lg:w-3/4" />

        <div>
          <ProfileMenu />
        </div>
      </div>

      <slot />
    </div>
  </div>
</template>
