<script setup lang="ts">
interface Props {
  edit: EditResponse
}

const props = defineProps<Props>()

const isTypeCreate = computed(() => props.edit.type === EditType.Create)

const { t } = useI18n()
</script>

<template>
  <section class="m-2 flex flex-col gap-3">
    <div>
      <template v-if="useAccess(Access.Edits)">
        <button class="border rounded text-green-500">
          <Icon size="1.5rem" name="ic:baseline-done-all" />
          Принять
        </button>
        <button class="border rounded text-yellow-500">
          <Icon size="1.5rem" name="ic:baseline-done" />
          Принять без смены статуса
        </button>
        <button class="border rounded text-red-500">
          <Icon size="1.5rem" name="ic:baseline-close" />
          Отклонить
        </button>
      </template>
      <button class="border rounded text-blue-500">
        <Icon size="1.5rem" name="ic:baseline-edit" />
        Отредактировать
      </button>
      <button class="border rounded text-gray-500">
        <Icon size="1.5rem" name="ic:outline-info" />
        Инфо
      </button>
    </div>
    <div v-if="edit.comment.length > 0" class="select-text break-words border-l-2 border-ns-gray-200 pl-2 dark:border-ns-gray-700">
      {{ t('components.editGroup.changesPreview.comment') }} {{ edit.comment }}
    </div>

    <div :class="`grid grid-rows-1 gap-5 ${isTypeCreate ? 'sm:grid-cols-1' : 'sm:grid-cols-[1fr_auto_1fr]'} sm:gap-2 md:gap-4`">
      <div v-if="!isTypeCreate" class="select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600">
        <span
          v-for="(text, index) of edit.diffSrc"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.c.length > 25 ? 'break-all' : ''} ${text.d ? 'text-red-500' : ''}`"
        >
          {{ text.c }}
        </span>
      </div>
      <div v-if="!isTypeCreate" class="flex flex-col items-center justify-evenly">
        <div class="after:content-['↓'] sm:after:content-['⟶']" />
      </div>
      <div class="select-text rounded-md border border-ns-gray-200 px-4 py-2 dark:border-ns-gray-600">
        <span
          v-for="(text, index) of edit.diffDst"
          :key="index"
          :class="`select-text whitespace-pre-wrap ${text.c.length > 25 ? 'break-all' : ''} ${text.d ? 'text-green-500' : ''}`"
        >
          {{ text.c }}
        </span>
      </div>
    </div>
  </section>
</template>
