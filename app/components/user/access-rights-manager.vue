<script setup lang="ts">
import { Access } from '~/types/models/user/access'

interface Props {
  userAccess: number
}

interface Emits {
  (e: 'update:userAccess', value: number): void
  (e: 'save'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const accessRights = [
  {
    key: Access.Autoapprove,
    title: 'Автоаппрув',
    description: 'Автоматическое принятие правок',
  },
  {
    key: Access.Wiki,
    title: 'Вики',
    description: 'Редактирование документации сайта (пока ничего не делает)',
  },
  {
    key: Access.Edits,
    title: 'Правки',
    description: 'Принятие, отклонение, редактирование чужих правок ',
  },
  {
    key: Access.ProfileEdit,
    title: 'Редактирование профиля',
    description: '(пока ничего не делает)',
  },
  {
    key: Access.Satellites,
    title: 'Сателлиты',
    description: 'Доступ к просмотру скрытых сателлитов',
  },
  {
    key: Access.TagEdit,
    title: 'Теги',
    description: 'Редактирование/добавление тегов',
  },
  {
    key: Access.Ocr,
    title: 'OCR',
    description: 'Доступ к редактированию OCR',
  },
]

function hasAccess(access: number) {
  return (props.userAccess & access) === access
}

function toggleAccess(access: number) {
  const newAccess = hasAccess(access)
    ? props.userAccess & ~access
    : props.userAccess | access
  emit('update:userAccess', newAccess)
  // Сразу сохраняем изменения на сервер
  emit('save')
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium text-white">
        Права доступа
      </h3>
    </div>

    <div class="space-y-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label
          v-for="right in accessRights"
          :key="right.key"
          class="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/30 hover:bg-neutral-800/50 cursor-pointer"
        >
          <input
            type="checkbox"
            :checked="hasAccess(right.key)"
            class="rounded border-neutral-600 bg-neutral-700 text-blue-500 focus:ring-blue-500"
            @change="toggleAccess(right.key)"
          >
          <div>
            <div class="text-white font-medium">
              {{ right.title }}
            </div>
            <div class="text-sm text-neutral-400">
              {{ right.description }}
            </div>
          </div>
        </label>
      </div>
    </div>

    <div class="text-sm text-neutral-400">
      Текущие права: {{ userAccess }}
    </div>
  </div>
</template>
