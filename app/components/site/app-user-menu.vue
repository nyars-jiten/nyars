<script setup lang="ts">
// Меню участника в шапке: аватар и имя, по клику — профиль, служебные разделы, тема, выход
const { t } = useI18n()
const { user, userAccess } = storeToRefs(useUserStore())
const { getUserAvatarUrl } = useUserProfile()
const { logout: userLogout } = useAuthState()

const avatar = computed(() => user.value?.avatar ? getUserAvatarUrl(user.value.avatar).href : undefined)

async function logout() {
  await userLogout()
  navigateTo('/')
}
</script>

<template>
  <UiDropdown v-if="user">
    <template #trigger="{ toggle, attrs, open }">
      <button
        type="button"
        v-bind="attrs"
        class="
          inline-flex h-10 cursor-pointer items-center gap-2 rounded-ctl px-1.5 font-semibold text-ink transition-colors
          hover:bg-soft hover:text-strong focus-visible:outline-2 focus-visible:outline-strong
        "
        :class="{ 'bg-soft text-strong': open }"
        @click="toggle"
      >
        <UiAvatar :name="user.username" :src="avatar" size="sm" />
        <span class="max-w-36 truncate max-sm:hidden">{{ user.username }}</span>
        <Icon name="tabler:chevron-down" size="14px" class="transition-transform" :class="{ 'rotate-180': open }" />
      </button>
    </template>

    <template #default="{ close }">
      <UiMenuItem icon="tabler:user" :to="{ name: 'users-username', params: { username: user.username } }">
        {{ t('components.header.profileMenu.profile') }}
      </UiMenuItem>
      <UiMenuItem icon="tabler:tag" :to="{ name: 'tags' }">
        {{ t('components.header.navigation[0].pages.tags') }}
      </UiMenuItem>
      <UiMenuItem v-if="userAccess.hasAccessOcr" icon="tabler:scan" :to="{ name: 'ocr' }">
        {{ t('components.header.navigation[0].pages.ocr') }}
      </UiMenuItem>

      <hr class="mx-1 my-1.5 border-line">
      <UiCaption class="mt-1 mb-1 px-2.5">
        Тема
      </UiCaption>
      <ThemePicker />

      <hr class="mx-1 my-1.5 border-line">
      <UiMenuItem icon="tabler:logout" @click="close(); logout()">
        {{ t('components.header.profileMenu.exit') }}
      </UiMenuItem>
    </template>
  </UiDropdown>
</template>
