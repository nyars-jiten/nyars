<script setup lang="ts">
import { tv } from 'tailwind-variants'

const { userAccess } = storeToRefs(useUserStore())

const statusesSearch = ref({
  [EditType.Create]: false,
  [EditType.Edit]: false,
  [EditType.Delete]: false,
  [EditType.Transfer]: false,
  // [EditType.Revert]: true,
} as Record<EditStatus, boolean>)

const query = computed(() => {
  const stStr = Object.keys(statusesSearch.value).filter(key => statusesSearch.value[Number(key) as EditStatus]).join(',')
  return {
    s: stStr,
  }
})

const { getEdits } = useEditsData()
const { data: edits } = getEdits({ s: query.value.s })

// TODO: remove code repeating
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

onMounted(() => {
  if (userAccess.value.hasAccessEdits) {
    statusesSearch.value[EditStatus.New] = true
  }
})

const { t } = useI18n()

useHead({
  title: 'Правки',
})
</script>

<template>
  <section class="space-y-4">
    <div>
      <div v-for="status, si in statusesSearch " :key="si" class="inline">
        <!-- {{ status }} -->
        <span class="border-b-2 m-2 uppercase text-sm cursor-pointer select-none" :class="status ? mark({ text: si, border: si }) : { 'border-none': true }" @click="statusesSearch[si] = !status">
          {{ t(`models.edit.status.${si}`) }}
        </span>
      </div>
    </div>
    <Edit
      v-for="edit in edits"
      :key="edit.id"
      :edit="edit"
      :expanded="true"
    />
  </section>
</template>
