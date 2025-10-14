<script lang="ts" setup>
const tagKeys = ['rusShort', 'rus', 'engShort', 'eng', 'priority'] as (keyof Tag)[]
const [isEditing, toggleEditing] = useToggle(false)

const tag = defineModel<Tag>({ required: true })
const editable = ref({ ...tag.value })

const notificationStore = useNotificationStore()
const { userAccess } = storeToRefs(useUserStore())

const { updateTag } = useJpnRepo()
const loading = ref(false)

async function saveTag() {
  loading.value = true
  try {
    await updateTag(tag.value.id, editable.value)
    tag.value = editable.value
    notificationStore.createNotification($t('models.tag.actions.update-success'), NyarsNotificationType.Success)
  }
  catch {
    editable.value = { ...tag.value }
    notificationStore.createNotification($t('models.tag.actions.update-error'), NyarsNotificationType.Error)
  }
  finally {
    isEditing.value = false
    loading.value = false
  }
}

function cancelTag() {
  editable.value = { ...tag.value }
  isEditing.value = false
}
</script>

<template>
  <tr class="group odd:bg-neutral-800/50">
    <td v-for="key in tagKeys" :key="key" class="p-2">
      <ui-input v-if="isEditing" v-model="editable[key]" class="w-full" :disabled="loading" />
      <template v-else>
        <NuxtLink
          v-if="key === 'rusShort' || key === 'engShort'"
          external
          target="_blank"
          :to="{ name: 'dict-jpn', query: { q: `#${tag[key]}` } }"
          class="text-indigo-300"
        >
          #{{ tag[key] }}
        </NuxtLink>
        <span v-else>
          {{ tag[key] }}
        </span>
      </template>
    </td>

    <td class="opacity-0 group-hover:opacity-100 transition-opacity">
      <section v-if="userAccess.hasAccessTagEdit" class="flex gap-2">
        <ui-button v-if="!isEditing" icon="ic:baseline-edit" color="edit" class="w-min" :outline="false" :disabled="loading" @click="toggleEditing()" />
        <template v-else>
          <ui-button icon="ic:baseline-cancel" color="cancel" class="w-min" :outline="false" :disabled="loading" @click="cancelTag()" />
          <ui-button icon="ic:baseline-save" color="save" class="w-min" :outline="false" :disabled="loading" @click="saveTag()" />
        </template>
      </section>
    </td>
  </tr>
</template>
