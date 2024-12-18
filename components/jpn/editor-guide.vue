<script setup lang="ts">
defineEmits(['clickInsert'])

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
        text: '((pitch: ))',
        action: ['((pitch: ', '))'],
      },
    ],
  },
  {
    msg: 'refs',
    actions: [
      {
        slot: 'see',
        text: '((see: ))',
        action: ['((see: ', '))'],
      },
      {
        slot: 'also',
        text: '((also: ))',
        action: ['((also: ', '))'],
      },
      {
        slot: 'ant',
        text: '((ant: ))',
        action: ['((ant: ', '))'],
      },
      {
        slot: 'cf',
        text: '((cf: ))',
        action: ['((cf: ', '))'],
      },
      {
        slot: 'abbr',
        text: '((abbr: ))',
        action: ['((abbr: ', '))'],
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
        text: '((lang: ))',
        action: ['((lang: ', '))'],
      },
      {
        slot: 'lat',
        text: '[lat]',
        action: ['[lat]', '[/lat]'],
      },
    ],
  },
]
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
            tag="span"
            :keypath="`pages.editor.guideActions.${ev.msg}`"
            scope="global"
          >
            <template v-for="a, ai in ev.actions" :key="ai" #[a.slot]>
              <span class="bg-zinc-800 px-1 py-0.5 rounded cursor-pointer hover:bg-zinc-700 whitespace-nowrap" @click="$emit('clickInsert', a.action)">
                {{ a.text }}
              </span>
            </template>
          </i18n-t>
        </template>
        <div>
          <!-- <div class="grid grid-cols-[auto_1fr] gap-4 leading-relaxed">
        <template v-for="x of 10" :key="x">
          <span class="text-end text-amber-300">
            {{ x }}
          </span>

          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <span @click="$emit('clickInsert', ['[pre]', '[/[pre]]'])">
              click me
            </span>
            Commodi deleniti ratione ad recusandae laudantium quidem ex eaque!
          </span>
        </template>
      </div> -->
        </div>
      </div>
    </UiBlock>
  </section>
</template>
