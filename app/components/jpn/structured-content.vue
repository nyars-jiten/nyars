<script lang="ts" setup>
const props = defineProps<{ body?: string, obj?: any }>()

const objData = computed(() => {
  if (props.obj) {
    return props.obj
  }
  try {
    return JSON.parse(props?.body ?? '')
  }
  catch {
    return null
  }
})

const strData = computed(() => {
  if (props.obj) {
    return null
  }
  return props?.body ?? ''
})
</script>

<template>
  <span class="">
    <template v-if="objData">
      <span v-if="typeof objData === 'string'">
        {{ objData }}
      </span>
      <component
        :is="objData.tag ?? 'div'"
        v-else-if="objData.content"
        v-bind="objData.attrs"
        :style="objData.style ?? '{}'"
        :class="{ 'pl-8': objData.tag === 'ul' }"
      >
        <StructuredContent v-if="objData.content" :obj="objData.content" />
      </component>
      <template v-else>
        <!-- <img v-if="objData.tag === 'img'" :src="objData.path" :alt="objData.title"> -->
        <span v-if="objData.tag === 'img'">{{ objData.title }}</span>

        <template v-else>
          <component
            :is="c.tag ?? 'span'"
            v-for="(c, cix) in objData"
            :key="cix"
            :style="c.style ?? '{}'"
            :class="{ 'pl-8': c.tag === 'ul' }"
          >
            <StructuredContent v-if="c.content" :obj="c.content" />
            <span v-else-if="typeof c === 'string'" class="whitespace-pre-wrap">
              {{ c }}
            </span>
          </component>
        </template>
      </template>
    </template>
    <template v-else>
      {{ strData }}
    </template>
  </span>
</template>
