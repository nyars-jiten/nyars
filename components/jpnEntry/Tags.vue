<script setup lang="ts">
  interface Tag {
    name: string
    level: string
    full: string
  }

  interface Props {
    tags: string[]
  }

  const props = defineProps<Props>()

  const searchStore = useSearchStore()

  const tags: Tag[] = props.tags.map((fullTag) => {
    const [name, ...rest] = fullTag.split('-')
    return {
      name,
      level: rest.join('-'),
      full: fullTag
    }
  })

  const search = (tag: string) => {
    searchStore.searchQuery = `#${tag}`
    searchStore.mode = 'words'
    navigateTo({ name: 'search-JpnEntries', query: { r: `#${tag}` } })
  }
</script>

<template>
  <div v-if="props.tags.length > 0" class="flex flex-wrap items-start gap-2">
    <button
      v-for="tag of tags"
      :key="tag.full"
      type="button"
      :class="`flex overflow-hidden whitespace-nowrap rounded-md border border-ns-tag-${tag.name}-500 text-xs leading-6 hover:opacity-75`"
      @click="search(tag.full)"
    >
      <span :class="`px-2 font-medium uppercase text-ns-tag-${tag.name}-500`">
        {{ $t(`models.tags.${tag.name}.short`) }}
      </span>
      <span v-if="tag.level" :class="`border-l border-ns-tag-${tag.name}-500 text-ns-tag-${tag.name}-500 px-2 uppercase`">
        {{ tag.level }}
      </span>
    </button>
  </div>
</template>
