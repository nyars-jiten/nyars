<script setup lang="ts">
// Правка в списке /edits: карточка EditCard, в раскрытой — комментарий, сравнение «рядом»,
// участники и действия модератора (принять, отклонить, исправить).
// Чего нет на бэкенде («На доработку», обсуждение, причина отклонения) — выключено, см. docs/backend-edits.md.
const props = defineProps<{
  edit: EditResponse
  /** выполнить действие над правкой; список обновит её сам */
  act: (edit: EditResponse, action: 'approve' | 'approve-unreviewed' | 'decline') => Promise<void>
}>()

const open = defineModel<boolean>('open', { default: false })

const { user, userAccess } = storeToRefs(useUserStore())
const { getUserAvatarUrl } = useUserProfile()
const notifications = useNotificationStore()

const REVIEW_VERB: Partial<Record<UiStatusKind, string>> = { ok: 'принял', rej: 'отклонил', work: 'вернул' }
const REVIEW_LINE: Partial<Record<UiStatusKind, string>> = { ok: 'принята', rej: 'отклонена', work: 'возвращена' }

const status = computed(() => editStatusKind(props.edit.status))
const isNew = computed(() => props.edit.status === EditStatus.New)
const isCreate = computed(() => props.edit.type === EditType.Create)
const isDelete = computed(() => props.edit.type === EditType.Delete)

const avatar = (person: ShortUser | null) => person?.avatar ? getUserAvatarUrl(person.avatar).href : undefined

const author = computed(() => props.edit.author?.username ?? 'гость')
// автопринятая правка «принята» самим автором — проверяющего не показываем
const reviewer = computed(() => !isNew.value && props.edit.status !== EditStatus.AutoAccepted ? props.edit.approver : null)

// удалённую статью открыть нельзя
const entryLink = computed(() => props.edit.wid && !(isDelete.value && status.value === 'ok')
  ? { name: 'dict-jpn-wid' as const, params: { wid: props.edit.wid } }
  : undefined)

const stat = computed(() => editDiffStat(props.edit))

/* ---------- сравнение ---------- */

// по умолчанию статья целиком; строки без изменений можно свернуть
const hideUnchanged = ref(false)
// строки считаем только у раскрытой правки
const rows = computed(() => open.value ? editLineRows(props.edit) : [])
const lines = computed(() => editSplitDiff(rows.value, hideUnchanged.value ? 1 : Infinity))
const oldLabel = computed(() => isCreate.value ? 'Было · статьи не было' : 'Было')
const newLabel = computed(() => isDelete.value ? 'Стало · статья удалена' : 'Стало')

/* ---------- действия ---------- */

const canModerate = computed(() => isNew.value && Boolean(userAccess.value.hasAccessEdits))
const isOwn = computed(() => isNew.value && Boolean(user.value) && user.value?.id === props.edit.author?.id)

const rejectOpen = ref(false)
const busy = ref(false)

async function run(action: 'approve' | 'approve-unreviewed' | 'decline') {
  busy.value = true
  try {
    await props.act(props.edit, action)
    rejectOpen.value = false
    notifications.createNotification(
      action === 'decline' ? 'Правка отклонена' : 'Правка принята',
      action === 'decline' ? NyarsNotificationType.Warning : NyarsNotificationType.Success,
    )
  }
  catch {
    notifications.createNotification('Не удалось выполнить действие', NyarsNotificationType.Error)
  }
  finally {
    busy.value = false
  }
}

const formId = useId()
</script>

<template>
  <EditCard
    v-model:open="open"
    :status="status"
    :headword="edit.title || '—'"
    :lang="edit.dictionary === DictionaryType.Rus ? 'ru' : 'ja'"
    :to="entryLink"
    :date="shortDateTime(edit.createdAt)"
    :datetime="new Date(edit.createdAt).toISOString()"
  >
    <template v-if="EDIT_KIND_TAG[edit.type]" #tags>
      <UiTag outline :tone="EDIT_KIND_TAG[edit.type]!.tone" size="md">
        {{ EDIT_KIND_TAG[edit.type]!.label }}
      </UiTag>
    </template>

    <template #meta>
      <span>{{ editDictionaryLabel(edit.dictionary) }}</span>
      <DiffStat v-if="stat" :plus="stat.plus" :minus="stat.minus" title="Знаков добавлено / удалено" />
      <UiPerson :name="author" :src="avatar(edit.author)" avatar />
      <UiPerson v-if="reviewer" :name="reviewer.username" :src="avatar(reviewer)" :action="REVIEW_VERB[status]" avatar />
    </template>

    <p v-if="edit.comment.trim()" class="m-0 text-[15px] whitespace-pre-line">
      «{{ edit.comment.trim() }}»
    </p>

    <template v-if="lines.length">
      <div class="flex justify-end">
        <UiSwitch v-model="hideUnchanged">
          Скрыть строки без изменений
        </UiSwitch>
      </div>
      <EditSplitDiff :lines="lines" :old-label="oldLabel" :new-label="newLabel" />
    </template>
    <p v-else class="m-0 text-sm text-muted">
      Текст статьи не изменился.
    </p>

    <!-- отклонение: причину бэкенд пока не принимает -->
    <form
      v-if="rejectOpen"
      :aria-labelledby="formId"
      class="flex flex-col gap-2.5 rounded-panel bg-bg p-3.5 shadow-[inset_0_0_0_1px_var(--line)]"
      @submit.prevent="run('decline')"
    >
      <b :id="formId">{{ isOwn && !canModerate ? 'Отозвать свою правку?' : 'Отклонить правку?' }}</b>
      <span class="-mt-1.5 text-[13.5px] text-muted">
        Правка закроется со статусом «Отклонена». Написать автору причину можно будет, когда это появится на сервере.
      </span>
      <div class="flex flex-wrap items-center justify-end gap-2">
        <UiButton @click="rejectOpen = false">
          Отмена
        </UiButton>
        <UiButton type="submit" variant="danger" :disabled="busy">
          Отклонить правку
        </UiButton>
      </div>
    </form>

    <div class="flex flex-wrap items-center gap-x-6 gap-y-3.5 border-t border-line pt-3.5">
      <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
        <div class="flex min-w-0 items-center gap-2.5">
          <UiAvatar :name="author" :src="avatar(edit.author)" size="lg" class="size-[34px]" />
          <div>
            <div class="text-[12.5px] leading-[1.3] text-muted">
              {{ isCreate ? 'статья создана' : 'создана' }} {{ shortDateTime(edit.createdAt) }}
            </div>
            <div class="text-[14.5px] leading-[1.35] font-bold">
              {{ author }}
            </div>
          </div>
        </div>

        <div v-if="reviewer" class="flex min-w-0 items-center gap-2.5">
          <UiAvatar :name="reviewer.username" :src="avatar(reviewer)" size="lg" class="size-[34px]" />
          <div>
            <div class="text-[12.5px] leading-[1.3] text-muted">
              {{ REVIEW_LINE[status] }} {{ shortDateTime(edit.updatedAt) }}
            </div>
            <div class="text-[14.5px] leading-[1.35] font-bold">
              {{ reviewer.username }}
            </div>
          </div>
        </div>
      </div>

      <span class="flex-1" />

      <div v-if="canModerate || isOwn" class="flex flex-wrap items-center gap-1.5">
        <UiButton icon="tabler:pencil" :to="{ name: 'edits-id-editor', params: { id: edit.id } }">
          Исправить
        </UiButton>
        <UiButton
          v-if="canModerate"
          disabled
          title="Появится, когда статус «Нужна доработка» будет на сервере"
        >
          На доработку
        </UiButton>
        <UiButton
          variant="danger"
          :aria-expanded="rejectOpen"
          :disabled="busy"
          @click="rejectOpen = !rejectOpen"
        >
          {{ isOwn && !canModerate ? 'Отозвать' : 'Отклонить' }}
        </UiButton>

        <div v-if="canModerate" class="flex items-center">
          <UiButton variant="primary" :disabled="busy" class="rounded-r-none" @click="run('approve')">
            Принять
          </UiButton>
          <UiDropdown>
            <template #trigger="{ toggle, attrs, open: menuOpen }">
              <UiButton
                v-bind="attrs"
                variant="primary"
                :disabled="busy"
                class="rounded-l-none border-l-onacc/20 px-2"
                :aria-label="menuOpen ? 'Скрыть варианты принятия' : 'Другие варианты принятия'"
                @click="toggle"
              >
                <Icon name="tabler:chevron-down" size="15px" />
              </UiButton>
            </template>
            <template #default="{ close }">
              <UiMenuItem icon="tabler:check" @click="close(); run('approve')">
                Принять — статья проверена
              </UiMenuItem>
              <UiMenuItem icon="tabler:clock-check" @click="close(); run('approve-unreviewed')">
                Принять, статья останется непроверенной
              </UiMenuItem>
            </template>
          </UiDropdown>
        </div>
      </div>
    </div>
  </EditCard>
</template>
