<script setup lang="ts">
import { faker } from '@faker-js/faker'
</script>

<template>
  <section>
    <h1 class="pb-8 text-center text-4xl md:hidden">
      Справка
    </h1>

    <UiBlock class="space-y-4">
      <h1 class="text-center text-2xl max-md:hidden">
        Справка
      </h1>

      <div class="grid grid-cols-[auto_1fr] gap-4 leading-relaxed">
        <template v-for="x of 10" :key="x">
          <span class="text-end text-amber-300">
            {{ x }}
          </span>

          <span>
            {{ faker.lorem.sentence() }}
          </span>
        </template>
      </div>
    </UiBlock>
  </section>
</template>
