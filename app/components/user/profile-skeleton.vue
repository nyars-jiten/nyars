<script setup lang="ts">
import { tv } from 'tailwind-variants'

const skeletonStyles = tv({
  base: 'animate-pulse bg-neutral-700 rounded',
  variants: {
    size: {
      'sm': 'h-4',
      'md': 'h-6',
      'lg': 'h-8',
      'xl': 'h-12',
      '2xl': 'h-16',
      '3xl': 'h-20',
    },
    width: {
      'full': 'w-full',
      '3/4': 'w-3/4',
      '1/2': 'w-1/2',
      '1/3': 'w-1/3',
      '1/4': 'w-1/4',
    },
  },
})
</script>

<template>
  <div class="space-y-8">
    <!-- Hero Section Skeleton -->
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
        <!-- Avatar Skeleton -->
        <div class="relative">
          <div class="size-32 md:size-40 rounded-2xl bg-neutral-700" />
          <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-neutral-700 rounded-full border-4 border-neutral-900" />
        </div>

        <!-- User Info Skeleton -->
        <div class="flex-1 space-y-4">
          <div class="space-y-2">
            <div :class="skeletonStyles({ size: '2xl', width: '1/2' })" />
            <div class="flex gap-3">
              <div :class="skeletonStyles({ size: 'sm', width: '1/4' })" />
              <div :class="skeletonStyles({ size: 'sm', width: '1/3' })" />
            </div>
          </div>

          <!-- Key Stats Skeleton -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="i in 4" :key="i" class="bg-neutral-800/50 rounded-lg p-4">
              <div :class="skeletonStyles({ size: 'lg', width: 'full' })" />
              <div :class="skeletonStyles({ size: 'sm', width: '1/2' })" class="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Grid Skeleton -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Contribution Breakdown Skeleton -->
      <div class="col-span-1 md:col-span-2 bg-neutral-800/50 rounded-lg p-6">
        <div :class="skeletonStyles({ size: 'lg', width: '1/3' })" class="mb-4" />
        <div class="space-y-4">
          <div v-for="i in 4" :key="i" class="space-y-2">
            <div class="flex justify-between">
              <div :class="skeletonStyles({ size: 'md', width: '1/4' })" />
              <div :class="skeletonStyles({ size: 'md', width: '1/6' })" />
            </div>
            <div class="w-full bg-neutral-700 rounded-full h-3" />
          </div>
        </div>
      </div>

      <!-- Quick Stats Skeleton -->
      <div class="bg-neutral-800/50 rounded-lg p-6">
        <div :class="skeletonStyles({ size: 'lg', width: '1/2' })" class="mb-4" />
        <div class="space-y-3">
          <div v-for="i in 6" :key="i" class="flex justify-between">
            <div :class="skeletonStyles({ size: 'sm', width: '2/3' })" />
            <div :class="skeletonStyles({ size: 'sm', width: '1/6' })" />
          </div>
        </div>
      </div>
    </section>

    <!-- Activity Heatmap Skeleton -->
    <section>
      <div class="bg-neutral-800/50 rounded-lg p-6">
        <div class="flex items-center justify-between mb-6">
          <div :class="skeletonStyles({ size: 'lg', width: '1/4' })" />
          <div :class="skeletonStyles({ size: 'sm', width: '1/8' })" />
        </div>
        <div class="bg-neutral-700 rounded-lg h-32" />
        <div class="flex justify-between mt-4">
          <div class="flex gap-2">
            <div :class="skeletonStyles({ size: 'md', width: '1/6' })" />
            <div :class="skeletonStyles({ size: 'md', width: '1/6' })" />
          </div>
          <div :class="skeletonStyles({ size: 'sm', width: '1/4' })" />
        </div>
      </div>
    </section>

    <!-- Registration Info Skeleton -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-neutral-800/50 rounded-lg p-6">
        <div :class="skeletonStyles({ size: 'lg', width: '1/3' })" class="mb-4" />
        <div class="space-y-3">
          <div v-for="i in 3" :key="i" class="flex justify-between">
            <div :class="skeletonStyles({ size: 'sm', width: '1/2' })" />
            <div :class="skeletonStyles({ size: 'sm', width: '1/3' })" />
          </div>
        </div>
      </div>

      <div class="bg-neutral-800/50 rounded-lg p-6">
        <div :class="skeletonStyles({ size: 'lg', width: '1/2' })" class="mb-4" />
        <div class="space-y-3">
          <div v-for="i in 4" :key="i" class="flex items-center gap-2">
            <div :class="skeletonStyles({ size: 'md', width: '1/12' })" />
            <div :class="skeletonStyles({ size: 'sm', width: '1/2' })" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
