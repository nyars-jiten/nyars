<script lang="ts" setup>
import CalHeatmap from 'cal-heatmap'
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel'
import LegendLite from 'cal-heatmap/plugins/Legend'
import Tooltip from 'cal-heatmap/plugins/Tooltip'

import 'cal-heatmap/cal-heatmap.css'

interface Props {
  id: string
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

const cal: CalHeatmap = new CalHeatmap()

function paintCalendar() {
  cal.paint(
    {
      data: {
        source: `${config.public.apiUrl}/users/${props.id}/heatmap`,
        type: 'json',
        dataType: 'json',
        x: 'date',
        y: 'value',
      },
      date: { start: new Date('2025-01-01') },
      range: 12,
      scale: {
        color: {
          type: 'threshold',
          range: ['#14432a', '#166b34', '#37a446', '#4dd05a'],
          domain: [10, 20, 30],
        },
      },
      domain: {
        type: 'month',
        gutter: 4,
        label: { text: 'MMM', textAlign: 'start', position: 'top' },
      },
      subDomain: { type: 'ghDay', radius: 2, width: 11, height: 11, gutter: 4 },
      itemSelector: '#ex-ghDay',
    },
    [
      [
        Tooltip,
        {
          text(date, value, dayjsDate) {
            return (
              `${value || 'No'
              } contributions on ${
                dayjsDate.format('dddd, MMMM D, YYYY')}`
            )
          },
        },
      ],
      [
        LegendLite,
        {
          includeBlank: true,
          itemSelector: '#ex-ghDay-legend',
          radius: 2,
          width: 11,
          height: 11,
          gutter: 4,
        },
      ],
      [
        CalendarLabel,
        {
          width: 30,
          textAlign: 'start',
          text: () => '',
          padding: [25, 0, 0, 0],
        },
      ],
    ],
  )
}

onMounted(() => paintCalendar())
</script>

<template>
  <div class="bg-neutral-800/50 text-neutral-300 rounded-lg p-6 overflow-hidden backdrop-blur-sm">
    <div id="ex-ghDay" class="mb-6" />

    <div class="flex items-center justify-between">
      <div class="flex gap-2">
        <button
          class="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          @click="cal.previous()"
        >
          <Icon name="ic:baseline-chevron-left" size="1rem" />
          Предыдущий
        </button>

        <button
          class="bg-neutral-700 hover:bg-neutral-600 text-white text-sm px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          @click="cal.next()"
        >
          Следующий
          <Icon name="ic:baseline-chevron-right" size="1rem" />
        </button>
      </div>

      <div class="flex items-center gap-2 text-sm">
        <span class="text-neutral-400">Меньше</span>
        <div id="ex-ghDay-legend" class="inline-block" />
        <span class="text-neutral-400">Больше</span>
      </div>
    </div>
  </div>
</template>
