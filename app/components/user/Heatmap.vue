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
  <div class="bg-gray-800 text-gray-300 rounded-md p-4 overflow-hidden">
    <div id="ex-ghDay" class="mb-4" />

    <button
      class="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded mt-2"
      @click="cal.previous()"
    >
      ← Previous
    </button>

    <button
      class="bg-gray-600 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded mt-2 ml-2"
      @click="cal.next()"
    >
      Next →
    </button>

    <div class="float-right text-xs">
      <span class="text-gray-400">Less</span>
      <div id="ex-ghDay-legend" class="inline-block mx-1" />
      <span class="text-gray-400 text-xs">More</span>
    </div>
  </div>
</template>
