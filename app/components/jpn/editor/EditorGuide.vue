<script setup lang="ts">
defineEmits<{
  (e: 'clickInsert', text: (readonly [string] | readonly [string, string])): void
}>()

const guideEvents = [
  {
    msg: 'click',
  },
  {
    msg: 'basic',
    actions: [
      {
        slot: 'tag',
        text: '(( ))',
        action: ['((', '))'],
      },
    ],
  },
  {
    msg: 'pos',
    actions: [
      {
        slot: 'tag',
        text: '=(( ))',
        action: ['=((', '))'],
      },
    ],
  },
  {
    msg: 'sense',
  },
  {
    msg: 'brackets',
    actions: [
      {
        slot: 'tag1',
        text: '[]',
        action: ['\[', '\]'],
      },
      {
        slot: 'tag2',
        text: '()',
        action: ['(', ')'],
      },
      {
        slot: 'tag3',
        text: '[i]()[/i]',
        action: ['[i](', ')[/i]'],
      },
    ],
  },
  // {
  //   msg: 'examples',
  //   actions: [
  //     {
  //       slot: 'tag',
  //       text: '[e]',
  //       action: ['[e]', '|[/e]'],
  //     },
  //   ],
  // },
  {
    msg: 'comma',
  },
  {
    msg: 'italic',
    actions: [
      {
        slot: 'tag1',
        text: '[i]',
        action: ['[i]', '[/i]'],
      },
      {
        slot: 'tag2',
        text: '[p]',
        action: ['[p]', '[/p]'],
      },
    ],
  },
  {
    msg: 'comp',
    actions: [
      {
        slot: 'suffix',
        text: '{~ }',
        action: ['{~', '}'],
      },
      {
        slot: 'prefix',
        text: '{... ~}',
        action: ['{...', '~}'],
      },
    ],
  },
  {
    msg: 'pitch',
    actions: [
      {
        slot: 'tag',
        text: '((питч: ))',
        action: ['((питч: ', '))'],
      },
    ],
  },
  {
    msg: 'refs',
    actions: [
      {
        slot: 'see',
        text: '((см: ))',
        action: ['((см: ', '))'],
      },
      {
        slot: 'also',
        text: '((см также: ))',
        action: ['((см также: ', '))'],
      },
      {
        slot: 'ant',
        text: '((ант: ))',
        action: ['((ант: ', '))'],
      },
      {
        slot: 'cf',
        text: '((ср: ))',
        action: ['((ср: ', '))'],
      },
      {
        slot: 'abbr',
        text: '((сокр: ))',
        action: ['((сокр: ', '))'],
      },
    ],
  },
  {
    msg: 'other',
    actions: [
      {
        slot: 'ext',
        text: '((ext: ))',
        action: ['((ext: ', '))'],
      },
      {
        slot: 'lang',
        text: '((язык: ))',
        action: ['((lang: ', '))'],
      },
      {
        slot: 'lat',
        text: '[lat]',
        action: ['[lat]', '[/lat]'],
      },
    ],
  },
] as const

const { t } = useI18n()
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
        <template v-for="ev, evi in guideEvents" :key="evi">
          <span class="text-end text-amber-300">
            {{ evi + 1 }}
          </span>

          <i18n-t
            v-if="'actions' in ev"
            tag="span"
            :keypath="`pages.editor.guideActions.${ev.msg}`"
            scope="global"
          >
            <template v-for="a, ai in ev?.actions" :key="ai" #[a.slot]>
              <span class="bg-zinc-800 px-1 py-0.5 rounded cursor-pointer hover:bg-zinc-700 whitespace-nowrap" @click="$emit('clickInsert', a.action)">
                {{ a.text }}
              </span>
            </template>
          </i18n-t>

          <span v-else>
            {{ t(`pages.editor.guideActions.${ev.msg}`) }}
          </span>
        </template>
      </div>
    </UiBlock>
  </section>
</template>
