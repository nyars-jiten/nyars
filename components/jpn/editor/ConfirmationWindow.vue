<script setup lang="ts">
interface Props {
  type: string
}

defineProps<Props>()

const emit = defineEmits(['return', 'send', 'delete'])

const { entry } = storeToRefs(useEditorEntryStore())

const { t } = useI18n()
const emptyIsUnreviewed = { isUnreviewed: true } as V2Status
const emptyIsUnconfirmed = { isUnconfirmed: true } as V2Status
</script>

<template>
  <UiBlock>
    <div class="space-y-6">
      <h1 class="text-xl">
        {{ t(`pages.editor.confirmation.header.${type}`) }}
      </h1>
      <section>
        <div>
          {{ t(`pages.editor.confirmation.comment.${type}`) }}
        </div>
        <UiInput ref="spellingRef" v-model="entry.comment" class="mt-2" :multiline="true">
          <!-- <template #hint>
            Обоснование
          </template> -->
        </UiInput>
      </section>
      <section v-if="type === 'edit'" class="space-y-2">
        <div>Статус:</div>
        <div class="flex space-x-2 content-center">
          <input id="checkbox" v-model="entry.status.isUnreviewed" type="checkbox">
          <EntryFlagBadge :statuses="emptyIsUnreviewed" hint />
          <span>{{ t('pages.editor.confirmation.statusisUnreviewed') }}</span>
        </div>
        <div class="flex space-x-2 content-center">
          <input id="checkbox" v-model="entry.status.isUnconfirmed" type="checkbox">
          <EntryFlagBadge :statuses="emptyIsUnconfirmed" hint />
          <span>{{ t('pages.editor.confirmation.statusisUnconfirmed') }}</span>
        </div>
      </section>
      <section class="inline-flex gap-2">
        <UiButton class="text-slate-400" icon="ic:baseline-replay" :title="t('pages.editor.confirmation.return')" @click="emit('return')">
          {{ t('pages.editor.confirmation.return') }}
        </UiButton>
        <UiButton v-if="type === 'edit'" class="text-lime-300" icon="ic:baseline-check" :title="t('pages.editor.confirmation.send')" @click="emit('send')">
          {{ t('pages.editor.confirmation.send') }}
        </UiButton>
        <UiButton v-else-if="type === 'delete'" class="text-rose-400" icon="ic:baseline-check" :title="t('pages.editor.confirmation.delete')" @click="emit('delete')">
          {{ t('pages.editor.confirmation.delete') }}
        </UiButton>
      </section>
    </div>
  </UiBlock>
</template>
