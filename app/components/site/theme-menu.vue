<script setup lang="ts">
// Компактный выбор палитры: кнопка-значок и выпадающий список
</script>

<template>
  <UiDropdown>
    <template #trigger="{ toggle, attrs, open }">
      <UiIconButton icon="tabler:palette" label="Тема оформления" :class="{ 'bg-soft text-strong': open }" v-bind="attrs" @click="toggle" />
    </template>

    <ThemePicker />
  </UiDropdown>
</template>
