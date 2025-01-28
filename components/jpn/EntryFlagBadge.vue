<script setup lang="ts">
import { tv } from 'tailwind-variants'

const props = defineProps<Props>()

const emit = defineEmits(['changeBorder'])

interface Props {
  statuses: EntryStatus
  hint?: boolean
}

const { t } = useI18n()

const statusStyle = tv({
  variants: {
    border: {
      true: '',
      false: '',
    },

    text: {
      true: '',
      false: '',
    },

    isUnreviewed: {
      true: '',
      false: '',
    },
    isUnconfirmed: {
      true: '',
      false: '',
    },
    isArchaic: {
      true: '',
      false: '',
    },
    isDialect: {
      true: '',
      false: '',
    },
    isProper: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    /*
     * border
     */

    { isUnreviewed: true, border: true, class: 'border-l-2 border-l-amber-700' },
    { isUnconfirmed: true, border: true, class: 'border-l-2 border-l-red-700' },
    { isArchaic: true, border: true, class: 'border-l-2 border-l-indigo-500' },
    { isDialect: true, border: true, class: 'border-l-2 border-l-fuchsia-500' },
    { isProper: true, border: true, class: 'border-l-2 border-l-slate-500' },

    /*
     * text
     */

    { text: true, isUnreviewed: true, class: 'text-amber-300' },
    { text: true, isUnconfirmed: true, class: 'text-red-300' },
    { text: true, isArchaic: true, class: 'text-indigo-300' },
    { text: true, isDialect: true, class: 'text-fuchsia-300' },
    { text: true, isProper: true, class: 'text-slate-300' },
  ],
})

const iconList = {
  isUnreviewed: {
    value: true,
    path: 'mdi:warning-outline',
  },
  isArchaic: {
    value: true,
    path: 'mdi:feather',
  },
  isDialect: {
    value: true,
    path: 'mdi:translate',
  },
  isUnconfirmed: {
    value: true,
    path: 'mdi:warning-octagon-outline',
  },
  isProper: {
    value: true,
    path: 'ic:baseline-group',
  },

} as Record<keyof EntryStatus, { value: boolean, path: string }>

const statusIconList = computed(() => {
  const res = [] as { key: keyof EntryStatus, path: string } []
  
  for (const key of Object.keys(iconList) as (keyof EntryStatus)[]) {
    if (iconList[key].value === props.statuses[key]) {
      res.push({ key, path: iconList[key].path })
    }
  }

  borderCheck(res)
  return res
})

function borderCheck(stIconList: { key: keyof EntryStatus, path: string }[]) {
  if (stIconList?.length > 0) {
    const newBorder = statusStyle({ border: true, [stIconList[0].key]: true })
    emit('changeBorder', newBorder)
  }
}

// watch(props.statuses, () => {
//   if (statusIconList.value.length > 0) {
//     const newBorder = statusStyle({ border: true, [statusIconList.value[0].key]: true })
//     emit('changeBorder', newBorder)
//   }
// }, { immediate: true })
</script>

<template>
  <span class="inline-flex flex-wrap items-center gap-2">
    <span v-for="status in statusIconList" :key="status.key" class="inline-flex items-center gap-2" :class="statusStyle({ text: true, [status.key]: true })">
      <Icon class="size-6" :name="status.path" />

      <span v-if="hint" class="text-xs uppercase ">
        {{ t(`pages.search.status.${status.key}`) }}
      </span>
    </span>
  </span>
</template>
