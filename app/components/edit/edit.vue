<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  edit: EditResponse
  expanded?: boolean
}

const props = defineProps<Props>()

const { userAccess } = storeToRefs(useUserStore())

// const route = useRoute('dict-jpn-wid')

// const isEntryPage = Boolean(route.params.wid)

const [showChanges, toggleChanges] = useToggle(props.expanded && props.edit.status === EditStatus.New && userAccess.value.hasAccessEdits)

const mark = tv({
  variants: {
    border: {
      [EditStatus.None]: '',
      [EditStatus.New]: 'border-sky-500',
      [EditStatus.Declined]: ' border-red-500',
      [EditStatus.Accepted]: 'border-lime-500',
      [EditStatus.AutoAccepted]: 'border-gray-500',
      [EditStatus.Reverted]: 'border-purple-500',
    },
    text: {
      [EditStatus.None]: '',
      [EditStatus.New]: 'text-sky-300',
      [EditStatus.Declined]: ' text-red-300',
      [EditStatus.Accepted]: 'text-lime-300',
      [EditStatus.AutoAccepted]: 'text-gray-300',
      [EditStatus.Reverted]: 'text-purple-300',
    },
  },
})

const typeColors = tv({
  variants: {
    text: {
      [EditType.None]: '',
      [EditType.Create]: 'text-lime-300',
      [EditType.Edit]: ' text-sky-300',
      [EditType.Delete]: 'text-red-300',
      [EditType.Transfer]: 'text-gray-300',
      [EditType.Revert]: 'text-purple-300',
    },
  },
})

// TODO: reactivity test
const createdAt = computed(() => props.edit.createdAt)
const createdDate = useTime(createdAt)

const showApprover = computed(() => props.edit.status !== EditStatus.AutoAccepted)

const { t } = useI18n()
</script>

<template>
  <section class="space-y-4 rounded-md border-l-2 px-4 py-2 leading-none shadow-md outline-dashed outline-1 outline-neutral-800 transition-colors" :class="mark({ border: edit.status })">
    <div class="flex flex-col items-center gap-3 hover:cursor-pointer md:grid md:grid-cols-[40%_60%] md:gap-0" @click="toggleChanges()">
      <span class="text-2xl">
        {{ edit.title }}
      </span>

      <div class="order-3 flex gap-3 md:order-none md:justify-end">
        <span class="whitespace-nowrap text-right" :class="mark({ text: edit.status })">
          {{ t(`models.edit.status.${edit.status}`) }}
        </span>

        <user-badge-profile v-if="showApprover && edit.approver" :user="edit.approver" />
      </div>

      <div class="flex items-center gap-2">
        <i class="text-neutral-500 text-center align-middle">
          {{ t(`models.edit.dictionary.${edit.dictionary}`) }}
        </i>

        <span class="italic" :class="typeColors({ text: edit.type })">
          {{ t(`models.edit.type.${edit.type}`) }}
        </span>
      </div>

      <div class="order-4 flex items-center gap-1.5 max-[490px]:flex-col-reverse md:order-none md:justify-end lg:gap-3">
        <span>
          {{ t('models.edit.createdDate') }}
          {{ createdDate }}
        </span>

        <user-badge-profile v-if="edit.author != null" :user="edit.author" />
        <span v-else>анонимно</span>
      </div>
    </div>

    <ChangesPreview v-if="showChanges" :edit="edit" />
  </section>
</template>
