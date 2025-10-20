<script setup lang="ts">
interface ContributionItem {
  label: string
  value: number
  color: string
}

interface Props {
  data: ContributionItem[]
  total: number
}

const props = defineProps<Props>()

function getProgressWidth(value: number) {
  if (props.total === 0)
    return 0
  return Math.max((value / props.total) * 100, 2) // Minimum 2% for visibility
}

function getColorClass(color: string) {
  return color.replace('text-', 'bg-')
}
</script>

<template>
  <div class="space-y-4">
    <div v-for="item in data" :key="item.label" class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-neutral-300 font-medium">{{ item.label }}</span>
        <div class="flex items-center gap-2">
          <span :class="item.color" class="font-semibold text-lg">
            {{ item.value.toLocaleString() }}
          </span>
          <span class="text-neutral-500 text-sm">
            ({{ Math.round((item.value / total) * 100) }}%)
          </span>
        </div>
      </div>

      <div class="relative">
        <div class="w-full bg-neutral-700 rounded-full h-3 overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-700 ease-out"
            :class="getColorClass(item.color)"
            :style="{ width: `${getProgressWidth(item.value)}%` }"
          />
        </div>

        <!-- Animated fill effect -->
        <div
          class="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full transition-all duration-1000 ease-out"
          :style="{
            width: `${getProgressWidth(item.value)}%`,
            animation: 'shimmer 2s infinite',
          }"
        />
      </div>
    </div>

    <div v-if="data.length === 0" class="text-center py-8">
      <Icon name="ic:baseline-bar-chart" class="text-neutral-600 mx-auto mb-2" size="2rem" />
      <p class="text-neutral-500">
        Пока нет данных о вкладе
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
