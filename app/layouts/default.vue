<script lang="ts" setup>
import { version } from '~~/package.json'

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
  <div class="grid min-h-dvh grid-cols-[auto_1fr] max-sm:grid-cols-1 gap-4 px-4">
    <section class="space-y-4 sticky h-[calc(100dvh-var(--spacing)*8)] top-4 bg-neutral-900 max-sm:hidden">
      <UiButton :outline="false" type="button" @click="menuState = !menuState">
        <Icon v-if="menuState" size="1.5rem" name="ic:baseline-close" />
        <Icon v-else size="1.5rem" name="ic:baseline-menu" />
      </UiButton>

      <LayoutMenu class="inset-y-24" />
    </section>

    <LayoutMenu class="inset-y-24 z-50 pt-4" secondary />

    <div class="space-y-4 flex flex-col">
      <div class="sticky top-0 py-4 z-40 flex items-center justify-between gap-x-4 bg-neutral-900/95">
        <NuxtLink
          to="/"
          class="flex items-center gap-x-2"
          @click="headerStore.closeHamburgerMenu"
        >
          <div class="size-9 mt-1 rounded-full bg-cover invert" style="background-image: url('/favicon-logo.svg');" />

          <span class="text-xl leading-snug">
            <span class="text-neutral-500 dark:text-white">Н</span>
            <span class="text-[#6aa3ab]">Я</span>
            <span class="text-neutral-500 dark:text-white">РС</span>

            <small class="text-xs align-top">
              v{{ version }}
            </small>
          </span>
        </NuxtLink>

        <Search class="w-1/2 max-xl:w-3/5 max-lg:w-3/4" />

        <ProfileMenu />
      </div>

      <slot />
    </div>
  </div>
</template>
