<script setup lang="ts">
// const { getEdits } = useApi(editRepository)
// const { data: edits } = await useLazyAsyncData(
//   'edits',
//   () => getEdits(),
//   {
//     default: (): Edit[] => []
//   }
// )

const edits = [
  {
    id: 144358,
    dictionary: 4,
    identifier: 'z5CW',
    title: {
      磁針航路: [
        'じしんこうろ',
      ],
    } as Record<string, string[]>,
    type: 2,
    status: 4,
    author: {
      id: 1,
      username: 'Ёко',
      banned: false,
      role: 'Admin',
      access: 0,
      avatar: 'f0eccae4-0bd2-4d77-9bc5-095cd90ba058.png',
      isBot: false,
      userRating: null,
      createdDate: new Date('2020-10-12T21:35:20.538224Z'),
    },
    approver: {
      id: 1,
      username: 'Ёко',
      banned: false,
      role: 'Admin',
      access: 0,
      avatar: 'f0eccae4-0bd2-4d77-9bc5-095cd90ba058.png',
      isBot: false,
      userRating: null,
      createdDate: new Date('2020-10-12T21:35:20.538224Z'),
    },
    commentsCount: 0,
    createdDate: new Date('2024-09-28T09:18:31.723278Z'),
    modifiedDate: new Date('2024-09-28T09:18:31.773633Z'),
  },
] as Edit[]

definePageMeta({
  name: 'Edits',
  path: '/edits',
  layout: 'desktop',
})

useHead({
  title: 'Правки',
})
</script>

<template>
  <UiBlock :active="true">
    <Edit
      v-for="edit in edits"
      :key="edit.id"
      :edit="edit"
    />
  </UiBlock>
</template>
