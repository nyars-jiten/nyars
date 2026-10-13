<script setup lang="ts">
// Раздел японско-русского словаря: поиск (index) и страницы статей ([wid]).
// Дочерние страницы объявляют layout: false — шаблон подключается здесь один раз.
</script>

<template>
  <!-- корень — элемент: <Transition> страниц не умеет анимировать компонент-корень (NuxtLayout) -->
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
