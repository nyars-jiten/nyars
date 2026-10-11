<script setup lang="ts">
// Шапка сайта: логотип, строка поиска, разделы и меню участника.
// На узких экранах строка поиска уходит на вторую строку, разделы — в меню «☰».
const { t } = useI18n()
const { user } = storeToRefs(useUserStore())
// на главной своя крупная строка поиска
const route = useRoute()
const isHome = computed(() => route.name === 'Home')

const link = 'text-strong no-underline hover:underline hover:underline-offset-[3px] aria-[current=page]:underline aria-[current=page]:underline-offset-[5px] aria-[current=page]:decoration-2'
</script>

<template>
  <header class="mx-auto box-border flex w-full max-w-[1320px] flex-wrap items-center gap-x-[26px] gap-y-3 px-8 pt-[18px] pb-3.5 max-[900px]:px-4 max-[900px]:pt-3">
    <NuxtLink to="/" class="flex items-center text-ink no-underline" aria-label="НЯРС — на главную">
      <AppLogo />
    </NuxtLink>

    <SearchBar v-if="!isHome" class="min-w-0 flex-[1_1_480px] max-md:order-last max-md:basis-full" />
    <span v-else class="flex-1" />

    <nav aria-label="Разделы" class="flex items-center gap-5 font-semibold max-md:ml-auto max-md:gap-1">
      <NuxtLink :to="{ name: 'edits' }" :class="link" class="max-md:hidden">
        {{ t('components.header.navigation[0].pages.edits') }}
      </NuxtLink>
      <NuxtLink to="/downloads" :class="link" class="max-md:hidden">
        {{ t('components.header.navigation[0].pages.download') }}
      </NuxtLink>

      <UiButton v-if="user" size="sm" icon="tabler:plus" :to="{ name: 'dict-jpn-new' }" class="max-lg:hidden">
        {{ t('components.header.menu.addWord') }}
      </UiButton>
      <NuxtLink v-else :to="{ name: 'users-login' }" :class="link" class="max-md:hidden">
        {{ t('components.header.profileMenu.login') }}
      </NuxtLink>

      <div class="flex items-center gap-1">
        <ThemeMenu v-if="!user" />
        <AppUserMenu />

        <!-- узкие экраны: разделы в меню -->
        <UiDropdown class="lg:hidden" :class="{ 'md:hidden': !user }">
          <template #trigger="{ toggle, attrs, open }">
            <UiIconButton icon="tabler:menu-2" label="Меню" :class="{ 'bg-soft text-strong': open }" v-bind="attrs" @click="toggle" />
          </template>

          <UiMenuItem v-if="user" icon="tabler:plus" :to="{ name: 'dict-jpn-new' }">
            {{ t('components.header.menu.addWord') }}
          </UiMenuItem>
          <UiMenuItem icon="tabler:plus-minus" :to="{ name: 'edits' }" class="md:hidden">
            {{ t('components.header.navigation[0].pages.edits') }}
          </UiMenuItem>
          <UiMenuItem icon="tabler:download" to="/downloads" class="md:hidden">
            {{ t('components.header.navigation[0].pages.download') }}
          </UiMenuItem>
          <UiMenuItem v-if="!user" icon="tabler:login-2" :to="{ name: 'users-login' }" class="md:hidden">
            {{ t('components.header.profileMenu.login') }}
          </UiMenuItem>
        </UiDropdown>
      </div>
    </nav>
  </header>
</template>
