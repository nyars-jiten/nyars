<script setup lang="ts">
interface Props {
  edit: EditResponse
  expanded?: boolean
}

const props = defineProps<Props>()

const { userAccess } = storeToRefs(useUserStore())

const [showChanges, toggleChanges] = useToggle(
  props.expanded
  && props.edit.status === EditStatus.New
  && userAccess.value.hasAccessEdits,
)

const createdAt = computed(() => props.edit.createdAt)
const createdDate = useTime(createdAt)

const { t } = useI18n()

const plusCount = computed(() =>
  props.edit.diffDst.filter(x => x.d).reduce((n, x) => n + x.c.length, 0),
)

const minusCount = computed(() =>
  props.edit.diffSrc.filter(x => x.d).reduce((n, x) => n + x.c.length, 0),
)

const authorName = computed(() => props.edit.author?.username || 'анонимно')
</script>

<template>
  <div>
    <button
      type="button"
      class="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-3 border-b border-line py-2.5 text-left text-[14.5px] text-ink"
      @click="toggleChanges()"
    >
      <span class="min-w-13 font-bold text-muted">
        {{ t(`models.edit.type.${edit.type}`) }}
      </span>

      <span class="min-w-0">
        <b>{{ authorName }}</b>
        — {{ t(`models.edit.status.${edit.status}`) }}
        <span class="text-muted">· {{ createdDate }}</span>
      </span>

      <span class="whitespace-nowrap text-[13px]">
        <span class="font-bold text-strong">+{{ plusCount }}</span>
        <span class="ml-1 font-bold text-sec">−{{ minusCount }}</span>
      </span>
    </button>

    <div v-if="showChanges" class="border-b border-line py-3">
      <ChangesPreview :edit="edit" />
    </div>
  </div>
</template>
