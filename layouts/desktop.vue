<script lang="ts" setup>
import { tv } from 'tailwind-variants'

const { user, menuState } = storeToRefs(useUserStore())
// const avatar = computed(() => useAvatar(user.value?.avatar ?? '').href)
const avatar = 'https://next.nyars.moe/upload/avatars/6bf3488d-da95-4936-880a-c66fb4bf3070.jpg'

const styles = tv({
  base: 'inline-block w-full px-8 py-3 text-center leading-none transition-colors hover:bg-zinc-800 hover:text-zinc-300',
})

const [userMenu, toggleUserMenu] = useToggle()

const userMenuRef = useTemplateRef('userMenuRef')
onClickOutside(userMenuRef, () => toggleUserMenu(false))
</script>

<template>
  <div class="grid min-h-dvh grid-cols-[auto_1fr] gap-4 p-4">
    <section class="space-y-4 sticky h-[calc(100dvh-theme('spacing.8'))] top-4 bg-neutral-900 overflow-x-hidden overflow-y-auto max-sm:hidden">
      <button type="button" @click="menuState = !menuState">
        x
      </button>

      <LayoutMenu class="inset-y-24" />
    </section>

    <LayoutMenu class="inset-y-24 z-50" secondary />

    <div class="space-y-4">
      <div class="sticky top-0 z-40 flex items-center justify-between gap-x-4 bg-neutral-900/95">
        <button type="button" class="sm:hidden" @click="menuState = !menuState">
          x
        </button>

        <div>
          <img src="/favicon-dark-96x96.png" alt="logo" class="size-12">
        </div>

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

                <button type="button" :class="styles()">
                  settings
                </button>

                <button type="button" :class="styles()">
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
