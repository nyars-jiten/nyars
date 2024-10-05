<script setup lang="ts">
interface Tag {
  name: string
  level: string
  full: string
}

interface Props {
  tags: V2Tag[]
}

const props = defineProps<Props>()

const tags: Tag[] = props.tags.map((fullTag) => {
  const [name, ...rest] = fullTag.eng.split('-')
  return {
    name,
    level: rest.join('-'),
    full: fullTag.eng,
  }
})
</script>

<template>
  <div v-if="tags.length > 0" class="flex flex-wrap items-start justify-end gap-2">
    <p
      v-for="tag of tags"
      :key="tag.full"
      type="button"
      :class="`flex overflow-hidden whitespace-nowrap rounded-md border border-ns-tag-${tag.name}-500 text-xs leading-6 hover:opacity-75`"
    >
      <span :class="`px-2 font-medium uppercase text-ns-tag-${tag.name}-500`">
        {{ tag.name }}
      </span>

      <span v-if="tag.level" :class="`border-l border-ns-tag-${tag.name}-500 text-ns-tag-${tag.name}-500 px-2 uppercase`">
        {{ tag.level }}
      </span>
    </p>
  </div>
</template>
