<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  title: string
  value: string | number
  subtitle?: string
  icon?: string
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow' | 'neutral'
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

withDefaults(defineProps<Props>(), {
  color: 'neutral',
  trend: 'neutral',
})

const cardStyles = tv({
  base: 'bg-neutral-800/50 rounded-lg p-4 backdrop-blur-sm transition-all duration-200 hover:bg-neutral-800/70',
  variants: {
    color: {
      blue: 'border-l-4 border-blue-500',
      green: 'border-l-4 border-green-500',
      purple: 'border-l-4 border-purple-500',
      orange: 'border-l-4 border-orange-500',
      red: 'border-l-4 border-red-500',
      yellow: 'border-l-4 border-yellow-500',
      neutral: 'border-l-4 border-neutral-500',
    },
  },
})

const valueStyles = tv({
  base: 'text-2xl font-bold',
  variants: {
    color: {
      blue: 'text-blue-400',
      green: 'text-green-400',
      purple: 'text-purple-400',
      orange: 'text-orange-400',
      red: 'text-red-400',
      yellow: 'text-yellow-400',
      neutral: 'text-white',
    },
  },
})

const trendStyles = tv({
  base: 'flex items-center gap-1 text-sm',
  variants: {
    trend: {
      up: 'text-green-400',
      down: 'text-red-400',
      neutral: 'text-neutral-400',
    },
  },
})
</script>

<template>
  <div :class="cardStyles({ color })">
    <div class="flex items-start justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <Icon v-if="icon" :name="icon" class="text-neutral-400" size="1.25rem" />
          <h3 class="text-sm font-medium text-neutral-400">
            {{ title }}
          </h3>
        </div>
        <div :class="valueStyles({ color })">
          {{ typeof value === 'number' ? value.toLocaleString() : value }}
        </div>
        <div v-if="subtitle" class="text-xs text-neutral-500 mt-1">
          {{ subtitle }}
        </div>
      </div>
      <div v-if="trend !== 'neutral' && trendValue" :class="trendStyles({ trend })">
        <Icon
          :name="trend === 'up' ? 'ic:baseline-trending-up' : 'ic:baseline-trending-down'"
          size="1rem"
        />
        <span>{{ trendValue }}</span>
      </div>
    </div>
  </div>
</template>
