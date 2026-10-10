<script setup lang="ts">
// Участник в строке сведений: «[Y] yuki_s» или «принял kitsune_ru»
defineProps<{
  name: string
  /** подпись перед именем: «принял», «отклонил» */
  action?: string
  avatar?: boolean
  src?: string
}>()
</script>

<template>
  <span class="inline-flex items-center gap-1.5">
    <UiAvatar v-if="avatar" :name="name" :src="src" size="sm" />
    <template v-if="action">{{ action }}</template>
    <b class="font-semibold text-ink">{{ name }}</b>
  </span>
</template>
