<script setup lang="ts">
import type { MaybeElementRef } from '@vueuse/core'
import { tv } from 'tailwind-variants'

interface Props {
  secondary?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  secondary: false,
})

const { t } = useI18n()

const { user } = storeToRefs(useUserStore())

const links = tv({
  base: 'flex items-center justify-start gap-4 rounded-md px-2 py-1.5 leading-none transition-colors hover:bg-zinc-800 hover:text-zinc-400',
  variants: {
    state: {
      false: '',
    },
    secondary: {
      true: '',
      false: 'max-xl:[&>span:nth-child(2)]:hidden',
    },
  },

  compoundVariants: [
    {
      state: false,
      secondary: false,
      class: '[&>span:nth-child(2)]:hidden',
    },
  ],
})

const block = tv({
  base: 'space-y-4 transition-[transform,opacity]',
  variants: {
    secondary: {
      true: 'fixed top-0 left-0 p-4 bg-neutral-900 h-dvh overflow-y-auto xl:hidden border-r border-neutral-800 shadow-md',
      false: '',
    },
    state: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    {
      secondary: true,
      state: false,
      class: '-translate-x-full opacity-0',
    },
  ],
})

const { menuState } = storeToRefs(useUserStore())

onMounted(() => {
  if (props.secondary) {
    const menu = useTemplateRef('menuRef')
    onClickOutside(menu as MaybeElementRef, () => {
      const width = window.innerWidth

      // tailwind xl
      if (width < 1280) {
        menuState.value = false
      }
    })
  }
})
</script>

<template>
  <ul ref="menuRef" :class="block({ state: menuState, secondary })">
    <li v-if="secondary">
      <UiButton :outline="false" type="button" @click="menuState = !menuState">
        <Icon size="1.5rem" name="ic:baseline-close" />
      </UiButton>
    </li>

    <li class="space-y-2">
      <NuxtLink to="/" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-home" />
        <span>{{ t('components.header.navigation[0].pages.home') }}</span>
      </NuxtLink>

      <NuxtLink :to="{ name: 'edits' }" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-plus-minus-alt" />
        <span>{{ t('components.header.navigation[0].pages.edits') }}</span>
      </NuxtLink>

      <!-- <NuxtLink to="/dev" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-auto-graph" />
        <span>{{ t('components.header.navigation[0].pages.statistics') }}</span>
      </NuxtLink> -->
    </li>

    <template v-if="user">
      <li>
        <hr class="border-neutral-800">
      </li>

      <li class="space-y-1">
        <NuxtLink :to="{ name: 'dict-jpn-new' }" :class="links({ state: menuState, secondary })" class="text-lime-300 transition-colors">
          <Icon size="1.5rem" name="ic:baseline-plus" />

          <span class="text-xs font-semibold uppercase">
            {{ t('components.header.menu.addWord') }}
          </span>
        </NuxtLink>
      </li>
    </template>

    <li>
      <hr class="border-neutral-800">
    </li>

    <li class="space-y-1">
      <NuxtLink
        to="https://github.com/nyars-jiten/nyars/issues"
        :class="links({ state: menuState, secondary })"
        target="_blank"
        external
      >
        <!-- mdi:antivirus-outline -->
        <!-- mdi:space-invaders -->
        <!-- mdi:virus-outline -->
        <!-- ic:outline-pest-control -->
        <!-- mdi:bacteria-outline -->
        <Icon size="1.5rem" name="mdi:virus-outline" />
        <span>{{ t('components.header.navigation[0].pages.github') }}</span>
      </NuxtLink>

      <!-- <NuxtLink to="/dev" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-menu-book" />
        <span>{{ t('components.header.navigation[0].pages.documentation') }}</span>
      </NuxtLink> -->

      <NuxtLink to="/downloads" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-download" />
        <span>{{ t('components.header.navigation[0].pages.download') }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
