<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  secondary?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  secondary: false,
})

const { t } = useI18n()

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
    onClickOutside(menu, () => {
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
    <li v-if="secondary" class="px-0">
      <UiButton :outline="false" type="button" @click="menuState = !menuState">
        <Icon size="1.5rem" name="ic:baseline-close" />
      </UiButton>
    </li>

    <li class="space-y-2">
      <NuxtLink :to="{ name: 'Home' }" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-home" />
        <span>{{ t('components.header.navigation[0].pages.home') }}</span>
      </NuxtLink>

      <NuxtLink :to="{ name: 'edits' }" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-plus-minus-alt" />
        <span>{{ t('components.header.navigation[0].pages.edits') }}</span>
      </NuxtLink>

      <NuxtLink to="/dev" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-auto-graph" />
        <span>{{ t('components.header.navigation[0].pages.statistics') }}</span>
      </NuxtLink>

      <NuxtLink to="/dev" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-menu-book" />
        <span>{{ t('components.header.navigation[0].pages.documentation') }}</span>
      </NuxtLink>
    </li>

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

      <NuxtLink to="/dev" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="ic:baseline-download" />
        <span>{{ t('components.header.navigation[0].pages.download') }}</span>
      </NuxtLink>
    </li>

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

      <!-- <NuxtLink to="/" :class="styles({state: menuState})" class="text-amber-300 transition-colors">
        <Icon size="1.5rem" name="ic:baseline-plus" />

        <span class="text-xs font-semibold uppercase">
          {{ t('components.header.navigation[1].pages.exampleEditor') }}
        </span>
      </NuxtLink>

      <NuxtLink to="/" :class="styles({state: menuState})" class="text-rose-300 transition-colors">
        <Icon size="1.5rem" name="ic:baseline-plus" />

        <span class="text-xs font-semibold uppercase">
          {{ t('components.header.navigation[1].pages.kanjiEditor') }}
        </span>
      </NuxtLink> -->
    </li>

    <li>
      <hr class="border-neutral-800">
    </li>

    <li class="space-y-1">
      <NuxtLink :to="{ name: 'dict-jpn-wid', params: { wid: 0 } }" :class="links({ state: menuState, secondary })">
        <Icon size="1.5rem" name="uil:github" />
        <span>suda</span>
      </NuxtLink>
    </li>

    <!--
    <li v-show="user?.role" class="group relative space-y-1">
      <NuxtLink to="/" class="flex items-center [@media(hover:none)]:pointer-events-none">
        <span class="group-hover:text-ns-500">{{ t('components.header.navigation[2].title') }}</span>
        <IconChevronDown class="!m-0 text-xl text-ns-gray-400 duration-[0.2s] ease-out group-hover:-rotate-180 group-hover:text-ns-500" />
      </NuxtLink>
      <div class="absolute left-1/2 ml-[-90px] hidden w-[180px] pt-2 group-hover:inline">
        <div class="flex flex-col gap-1 rounded-md border border-ns-gray-200 bg-white p-2 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
          <NuxtLink to="/" :class="link()">
            <span>{{ t('components.header.navigation[2].pages.ocr') }}</span>
          </NuxtLink>
          <NuxtLink to="/" :class="link()">
            <span>{{ t('components.header.navigation[2].pages.tags') }}</span>
          </NuxtLink>
          <NuxtLink to="/" :class="link()">
            <span>{{ t('components.header.navigation[2].pages.fields') }}</span>
          </NuxtLink>
        </div>
      </div>
    </li> -->
  </ul>
</template>
