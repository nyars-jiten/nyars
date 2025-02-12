<script setup lang="ts">
interface Props {
  entry: EditorTxtEntryJp
  isNew?: boolean
  isEdit?: boolean
  disabled?: boolean
  wid: string
}

const props = defineProps<Props>()
const { t } = useI18n()
const api = useJpnRepo()
const { updateEdit } = useEditRepo()

const { $reset: userReset } = useUserStore()
const { menuState, user } = storeToRefs(useUserStore())
const notificationStore = useNotificationStore()

onBeforeMount(() => {
  userReset() // update user state
  menuState.value = false
  if (!user.value && props.isNew) {
    navigateTo('/users/login')
  }
})

const { entry } = storeToRefs(useEditorEntryStore())

entry.value.spelling = ''
const spellingRows = computed(() => Math.min(5, Math.max(1, entry.value.spelling.split('\n').length)))

entry.value.reading = ''
const readingRows = computed(() => Math.min(5, Math.max(1, entry.value.reading.split('\n').length)))

entry.value.body = ''
entry.value.comment = props.entry.comment
entry.value.status = props.entry.status

entry.value.spelling = props.entry.spelling
entry.value.reading = props.entry.reading
entry.value.body = props.entry.body

const showConfimationWindow = ref('')

const callPreview = async function () {
  return await api.preview(entry.value)
}

const preview = ref(await callPreview())

const callCheckDuplicates = async function () {
  return (await api.checkDuplicates(entry.value)).filter(x => x.wid !== props.wid)
}

const duplicates = ref(await callCheckDuplicates())

// const changes = computed(() => 'code' in preview.data.value ? null : preview.data.value)

const spellingComp = computed(() => entry.value.spelling)
const readingComp = computed(() => entry.value.reading)
const bodyComp = computed(() => entry.value.body)

watchDebounced([bodyComp], async () => preview.value = await callPreview(), { debounce: 250, immediate: true })

watchDebounced([spellingComp, readingComp], async () => {
  preview.value = await callPreview()
  duplicates.value = await callCheckDuplicates()
}, { debounce: 250, immediate: true })

async function save() {
  if (props.isNew) {
    await api.create(entry.value)
  }
  else if (props.isEdit) {
    const routeId = useRoute('edits-id-editor').params.id
    await updateEdit(routeId, entry.value)
  }
  else {
    await api.edit(props.wid, entry.value)
  }

  notificationStore.createNotification(t('pages.editor.notification.success'), NyarsNotificationType.Success)
}

async function remove() {
  // body is still required, so we can save meta data
  await api.remove(`${props.wid}`, entry.value)
  notificationStore.createNotification(t('pages.editor.notification.success'), NyarsNotificationType.Success)
}

const spellingRef = useTemplateRef('spellingRef')
const readingRef = useTemplateRef('readingRef')
const bodyRef = useTemplateRef('bodyRef')

const element = ref({
  target: ref('' as string),
  selection: {
    start: 0,
    end: 0,
  },
})

function insert(open: string, close?: string) {
  let result = ''
  const curValue = entry.value[element.value.target as keyof typeof entry.value] as string

  result = curValue.slice(0, element.value.selection.start)
  result += open

  if (close) {
    result += curValue.slice(element.value.selection.start, element.value.selection.end)
    result += close
    result += curValue.slice(element.value.selection.end)
  }
  else {
    result += curValue.slice(element.value.selection.start)
  }

  // @ts-expect-error TODO
  entry.value[element.value.target as keyof typeof entry.value] = result
}

onMounted(() => {
  if (!showConfimationWindow.value) {
    const refs = [
      [spellingRef, 'spelling'],
      [readingRef, 'reading'],
      [bodyRef, 'body'],
    ]

    for (const [r, v] of refs) {
      // @ts-expect-error TODO
      const { focused } = useFocus(r.value.inputRef)

      watch(focused, (focused) => {
        // blur
        if (focused === false) {
          element.value = {
            // @ts-expect-error TODO
            target: v,
            selection: {
              // @ts-expect-error TODO
              start: r.value.inputRef.selectionStart,
              // @ts-expect-error TODO
              end: r.value.inputRef.selectionEnd,
            },
          }
        }
      })
    }
  }
})

interface Button {
  icon?: string
  name?: string
  click: [string] | [string, string]
  title: string
}

function buttons() {
  return [
    [
      // italic
      {
        icon: 'material-symbols:format-italic',
        click: ['[i]', '[/i]'],
        title: 'italic',
      },
      // works same as italic
      {
        name: '[p]',
        click: ['[p]', '[/p]'],
        title: 'abbreviation',
      },
      // sub
      {
        icon: 'material-symbols:subscript',
        click: ['[sub]', '[/sub]'],
        title: 'sub',
      },
      // sup
      {
        icon: 'material-symbols:superscript',
        click: ['[sup]', '[/sup]'],
        title: 'sup',
      },
      // comp1
      {
        icon: 'uil:brackets-curly',
        click: ['{~', '}'],
        title: 'comp1',
      },
      // кавычки
      {
        icon: 'tabler:quotes',
        click: ['«', '»'],
        title: 'quotes',
      },
    ],
    [
      // bracket-одна
      {
        name: '[e]',
        click: ['[e]', ' | [/e]'],
        title: 'example',
      },
      // bracket-одна
      {
        icon: 'tabler:brackets-contain-start',
        click: ['⌈'],
        title: 'single-bracket',
      },
      // ударение
      {
        // accent mark
        icon: 'ooui:bigger',
        click: ['\u0301'],
        title: 'accent',
      },
    ],
    // {
    //   icon: 'material-symbols:tag',
    //   click: [],
    // title: 'tag',
    // }
  ] as Button[][]
}

function supButtons() {
  return [
    [
      {
        name: '(( ))',
        click: ['((', '))'],
        title: '',
      },
      {
        name: '=(( ))',
        click: ['((', '))'],
        title: '',
      },
      {
        name: '[i]( )[/i]',
        click: ['[i](', ')[/i]'],
        title: '',
      },
    ],
    [
      {
        name: 'см',
        click: ['((см: ', '))'],
        title: '',
      },
      {
        name: 'см.т',
        click: ['((см также: ', '))'],
        title: '',
      },
      {
        name: 'ант',
        click: ['((ант: ', '))'],
        title: '',
      },
      {
        name: 'ср',
        click: ['((ср: ', '))'],
        title: '',
      },
      {
        name: 'сокр',
        click: ['((сокр: ', '))'],
        title: '',
      },
    ],
    [
      {
        name: 'питч',
        click: ['((питч: ', '))'],
        title: '',
      },
      {
        name: 'ext',
        click: ['((ext: ', '))'],
        title: '',
      },
      {
        name: 'язык',
        click: ['((язык: ', '))'],
        title: '',
      },
      {
        name: 'lat',
        click: ['[lat]', '[/lat]'],
        title: '',
      },
    ],
  ] as Button[][]
}

const [stateEditorHelp, toggleEditorHelp] = useToggle()
const [stateTagSearch, toggleTagSearch] = useToggle()
const [stateSupButtons, toggleSupButtons] = useToggle()
</script>

<template>
  <ConfirmationWindow
    v-if="showConfimationWindow !== ''"
    :type="showConfimationWindow"

    @return="showConfimationWindow = ''"
    @send="save(); showConfimationWindow = ''"
    @delete="remove(); showConfimationWindow = ''"
  />
  <section v-else class="grid grow gap-8 xl:h-full xl:grid-cols-[2fr_1fr] overflow-hidden p-1">
    <EditorGuide v-if="stateEditorHelp" class="md:hidden" @click-insert="(text) => insert(text[0], text[1])" />
    <TagSearch v-if="stateTagSearch" class="md:hidden" @click-insert="(text) => insert(text[0], text[1])" />

    <h1 class="text-center text-4xl md:hidden">
      Редактор
    </h1>

    <div class="flex h-full flex-col gap-4">
      <div v-if="!user" class="text-amber-300 flex gap-2">
        <Icon name="ic:baseline-warning-amber" size="1.5rem" />
        Вы не вошли в аккаунт. Правка будет создана анонимно.
      </div>
      <section class="flex items-start justify-between gap-4 max-sm:flex-col bg-neutral-900/95">
        <div class="inline-flex flex-wrap gap-x-8 gap-y-2">
          <span v-for="group, index in buttons()" :key="index" class="gap-2 grid" :style="{ gridTemplateColumns: `repeat(${group.length}, 1fr)` }">
            <UiButton v-for="{ name, icon, title, click } in group" :key="title" type="button" :icon="icon" :title="t(`pages.editor.button.${title}`)" :disabled="disabled" class="inline-flex justify-center" @click="insert.apply(null, click)">
              {{ name }}
            </UiButton>
          </span>
          <span class="gap-2 grid">
            <UiButton type="button" icon="mdi:arrow-expand-down" :title="t(`pages.editor.button.addition`)" :disabled="disabled" class="inline-flex justify-center" @click="toggleSupButtons()">
              <!-- -->
            </UiButton>
          </span>
        </div>

        <div class="max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4 sm:space-x-2">
          <UiButton class="max-sm:w-full" type="button" icon="mdi:hashtag-box-outline" color="amber" :disabled="disabled" :active="stateTagSearch" :title="t('pages.editor.tags')" @click="toggleTagSearch(); toggleEditorHelp(false)">
            <!-- теги -->
          </UiButton>
          <UiButton class="max-sm:w-full" type="button" icon="ic:baseline-help-outline" color="sky" :disabled="disabled" :active="stateEditorHelp" :title="t('pages.editor.guide')" @click="toggleEditorHelp(); toggleTagSearch(false)">
            <!-- справка -->
          </UiButton>

          <!-- <UiButton class="items-start justify-center text-center max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" :disabled="disabled" @click="save">
            {{ t('pages.editor.save') }}
          </UiButton> -->
        </div>
      </section>

      <section v-if="stateSupButtons" class="flex items-start justify-left gap-x-8 gap-y-2 max-sm:flex-col bg-neutral-900/95">
        <span v-for="group, index in supButtons()" :key="index" class="gap-2 grid" :style="{ gridTemplateColumns: `repeat(${group.length}, 1fr)` }">
          <UiButton v-for="{ name, icon, title, click } in group" :key="title" type="button" :icon="icon" :title="t(`pages.editor.button.${title}`)" :disabled="disabled" class="inline-flex justify-center" @click="insert.apply(null, click)">
            {{ name }}
          </UiButton>
        </span>
      </section>

      <section class="flex grow gap-8 max-md:flex-col" :class="{ 'md:grid md:grid-cols-2': stateEditorHelp || stateTagSearch }">
        <div class="flex shrink grow flex-col gap-4">
          <UiInput ref="spellingRef" v-model="entry.spelling" :multiline="true" :rows="spellingRows" :disabled="disabled" :placeholder="isNew ? t('pages.editor.placeholder.spelling') : ''">
            <template #hint>
              {{ t('pages.editor.spelling') }}
            </template>
            <template #description>
              {{ t('pages.editor.hint.spelling') }}
            </template>
          </UiInput>

          <UiInput ref="readingRef" v-model="entry.reading" :multiline="true" :rows="readingRows" :disabled="disabled" :placeholder="isNew ? t('pages.editor.placeholder.reading') : ''">
            <template #hint>
              {{ t('pages.editor.reading') }}
            </template>
            <template #description>
              {{ t('pages.editor.hint.reading') }}
            </template>
          </UiInput>

          <UiInput ref="bodyRef" v-model="entry.body" :multiline="true" class="grow flex items-stretch" :disabled="disabled">
            <template #hint>
              {{ t('pages.editor.body') }}
            </template>
          </UiInput>
        </div>

        <EditorGuide v-if="stateEditorHelp" class="mt-2.5 max-md:hidden" @click-insert="(text) => insert(text[0], text[1])" />
        <TagSearch v-else-if="stateTagSearch" class="mt-2.5 max-md:hidden" @click-insert="(text) => insert(text[0], text[1])" />
      </section>
    </div>

    <div class="space-y-8 max-xl:hidden flex flex-col">
      <div class="max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4 sm:space-x-2">
        <UiButton v-if="!isNew && !isEdit" class="max-sm:w-full" type="button" icon="material-symbols:delete" color="delete" :title="t('pages.editor.delete')" :disabled="disabled" @click="showConfimationWindow = 'delete'">
          {{ t('pages.editor.delete') }}
        </UiButton>

        <UiButton class="max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" :disabled="disabled" @click="showConfimationWindow = 'edit'">
          {{ t('pages.editor.save') }}
        </UiButton>
      </div>

      <div class="grow flex flex-col h-0 overflow-y-auto">
        <h1 class="text-center text-4xl pb-4">
          {{ t('pages.editor.preview') }}
        </h1>

        <JpnEntry v-if="preview" :jpn-entry="preview.entry" :show-lemmas="false" />

        <div v-if="duplicates.length > 0" class="space-y-4 mt-8">
          <h1 class="text-center text-4xl mb-4">
            {{ t('pages.editor.duplicates') }}
          </h1>

          <SearchResult v-for="dupentry of duplicates" :key="dupentry.wid" class="space-y-4" :article="dupentry" />
        </div>
      </div>
      <!--
      <i v-else class="block text-neutral-800">
        Пусто тут как-то...
      </i> -->
    </div>

    <!-- :class="{ hidden: hasData === false }" -->
    <span class="space-y-8 xl:hidden">
      <h1 class="text-center text-4xl">
        {{ t('pages.editor.preview') }}
      </h1>

      <div class="max-sm:grid max-sm:w-full max-sm:grid-cols-2 max-sm:gap-4 sm:space-x-2">
        <UiButton class="max-sm:w-full" type="button" icon="material-symbols:delete" color="delete" :title="t('pages.editor.delete')" :disabled="disabled" @click="showConfimationWindow = 'delete'">
          {{ t('pages.editor.delete') }}
        </UiButton>

        <UiButton class="max-sm:w-full" type="button" icon="material-symbols:save" color="lime" :title="t('pages.editor.save')" :disabled="disabled" @click="showConfimationWindow = 'edit'">
          {{ t('pages.editor.save') }}
        </UiButton>
      </div>

      <UiBlock>
        <JpnEntry v-if="preview" :jpn-entry="preview.entry" :show-lemmas="false" />
      </UiBlock>
    </span>
  </section>
</template>
