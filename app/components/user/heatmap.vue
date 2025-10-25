<script lang="ts" setup>
import CalHeatmap from 'cal-heatmap'
import CalendarLabel from 'cal-heatmap/plugins/CalendarLabel'
import LegendLite from 'cal-heatmap/plugins/LegendLite'
import Tooltip from 'cal-heatmap/plugins/Tooltip'
import dayjs from 'dayjs'

import 'cal-heatmap/cal-heatmap.css'

interface Props {
  id: string
  year: number
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

function paintCalendar(cal: CalHeatmap, theme: 'light' | 'dark') {
  // Calculate start date based on selected year
  const isCurrentYear = props.year === new Date().getFullYear()
  const startDate = isCurrentYear ? dayjs().subtract(11, 'month') : dayjs().year(props.year).month(0).date(1)
  const endDate = dayjs().year(props.year).month(11).date(31)

  cal.paint(
    {
      theme,
      data: {
        source: `${config.public.apiUrl}/users/${props.id}/heatmap?from={{start=YYYY-MM-DD}}&to={{end=YYYY-MM-DD}}`,
        type: 'json',
        dataType: 'json',
        x: 'date',
        y: 'value',
      },
      date: {
        start: startDate.valueOf(),
        min: new Date('2020-10-01'),
        max: isCurrentYear ? new Date() : endDate.toDate(),
        highlight: isCurrentYear ? [new Date()] : [],
        locale: 'ru',
      },
      range: 12,
      scale: {
        color: {
          type: 'threshold',
          range: ['#2D333B', '#355361', '#3E7387', '#4693AD', '#4EB3D3', '#A7D9E9'],
          domain: [0, 15, 30, 80, 200, 1000],
        },
      },
      domain: {
        type: 'month',
        gutter: 5,
        label: { text: 'M月', textAlign: 'middle', position: 'bottom' },
      },
      subDomain: { type: 'day', radius: 2 },
      itemSelector: '#heatmap',
    },
    [
      [
        Tooltip,
        {
          text(timestamp: number, value: number, dayjsDate: dayjs.Dayjs) {
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
          includeBlank: false,
          itemSelector: '#cal-legend',
          radius: 2,
          width: 11,
          height: 11,
          gutter: 4,
        },
      ],
      [
        CalendarLabel,
        {
          width: 25,
          textAlign: 'start',
          text() {
            return ['月', '', '水', '', '金', '', '日']
          },
        },
      ],
    ],
  )
}

let cal: CalHeatmap

function destory(cal: CalHeatmap) {
  cal.destroy()
}

const isDark = ref(true)

watch(
  [isDark, () => props.year],
  () => {
    if (isDark.value) {
      if (cal !== undefined)
        destory(cal)
      cal = new CalHeatmap()
      paintCalendar(cal, 'dark')
    }
    else {
      if (cal !== undefined)
        destory(cal)
      cal = new CalHeatmap()
      paintCalendar(cal, 'light')
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="bg-neutral-800/50 text-neutral-300 rounded-lg p-6 overflow-hidden backdrop-blur-sm">
    <div id="heatmap" class="mb-2" />

    <div class="flex items-center gap-2 text-xs">
      <span class="text-neutral-400">Меньше</span>
      <div id="cal-legend" class="inline-block" />
      <span class="text-neutral-400">Больше</span>
    </div>
  </div>
</template>
