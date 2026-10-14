<script setup lang="ts">
import { tv } from 'tailwind-variants'

interface Props {
  edit: EditResponse
}

const props = defineProps<Props>()

const { userAccess, user } = storeToRefs(useUserStore())
const { approveEditAsReviewed, approveEditAsUnreviewed, declineEdit } = useEditActions()
const toast = useToast()

const { t } = useI18n()

const isTypeCreate = computed(() => props.edit.type === EditType.Create)

const preview = tv({
  base: 'py-2',
})

function approveAsReviewed() {
  approveEditAsReviewed(props.edit.id)
  toast.ok(t('models.edit.actions.approved'))
}

function reject() {
  declineEdit(props.edit.id)
  toast.ok(t('models.edit.actions.rejected'))
}

function approveAsUnreviewed() {
  approveEditAsUnreviewed(props.edit.id)
  toast.ok(t('models.edit.actions.approved'))
}

const showRaw = ref(false)

function showEntryRef(edit: EditResponse): boolean {
  return edit.wid !== '' && !(edit.status === EditStatus.Accepted && edit.type === EditType.Delete)
}
</script>

<template>
  <section class="flex flex-col gap-3">
    {{ edit.entryStatus }}

    <div v-if="edit.comment.length > 0" class="bg-zinc-500/5 p-2 whitespace-pre-line">
      {{ edit.comment }}
    </div>

    <div class="inline-flex gap-2 flex-wrap flex-row-reverse">
      <!-- <NuxtLink :to="{ name: 'edits-id', params: { id: edit.id } }">
        <LegacyButton class="text-gray-500" icon="ic:outline-info" title="Инфо">
          Инфо
        </LegacyButton>
      </NuxtLink> -->

      <NuxtLink v-if="showEntryRef(edit)" :to="{ name: 'dict-jpn-wid', params: { wid: edit.wid } }" prefetch>
        <LegacyButton class="text-gray-500" icon="ic:outline-open-in-new" title="Открыть статью">
          <!-- Открыть статью -->
        </LegacyButton>
      </NuxtLink>

      <LegacyButton v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))" class="text-red-500" icon="ic:baseline-close" title="Отклонить" @click="reject()">
        <!-- Отклонить -->
      </LegacyButton>

      <LegacyButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-green-500" icon="ic:baseline-done-all" title="Принять как отредактированную" @click="approveAsReviewed()">
        <!-- Принять как отредактированную -->
      </LegacyButton>

      <LegacyButton v-if="edit.status === EditStatus.New && userAccess.hasAccessEdits" class="text-yellow-500" icon="ic:baseline-done" title="Принять как неотредактированную" @click="approveAsUnreviewed()">
        <!-- Принять как неотредактированную -->
      </LegacyButton>

      <template v-if="edit.status === EditStatus.New && (userAccess.hasAccessEdits || (user && user.id === edit.author?.id))">
        <NuxtLink :to="{ name: 'edits-id-editor', params: { id: edit.id } }">
          <LegacyButton class="text-blue-500" icon="ic:baseline-edit" title="Отредактировать">
            <!-- Отредактировать -->
          </LegacyButton>
        </NuxtLink>
      </template>
    </div>

    <!-- <div v-if="edit.comment.length > 0" class="break-words border-l-2 border-neutral-200 pl-2 dark:border-neutral-700">
      {{ t('components.editGroup.changesPreview.comment') }} {{ edit.comment }}
    </div> -->

    <div class="grid sm:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-2">
      <template v-if="!isTypeCreate">
        <div :class="preview()">
          <span
            v-for="(text, index) of edit.diffSrc"
            :key="index"
            :class="`whitespace-pre-wrap ${text.d ? 'text-red-500' : ''}`"
          >
            {{ text.c }}
          </span>
        </div>

        <div class="flex flex-col items-center justify-evenly max-sm:border-y sm:border-x p-2 border-neutral-800">
          <div class="after:content-['↓'] sm:after:content-['⟶']" />
        </div>
      </template>

      <div :class="[{ 'col-span-full': isTypeCreate }, preview()]">
        <span
          v-for="(text, index) of (showRaw ? edit.diffRawDst : edit.diffDst)"
          :key="index"
          :class="`whitespace-pre-wrap ${text.c.length > 25 ? 'break-all' : ''} ${text.d ? 'text-green-500' : ''}`"
        >
          {{ text.c }}
        </span>
      </div>
    </div>
  </section>
</template>
