<script setup lang="ts">
interface Props {
  sense: V2Sense
  ix: string
  isPreview: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()

const miscTagsLine = computed(() => {
  const tags = props.sense.metaTags.map(t => t.ru)
    .concat(props.sense.dialectTags.map(t => t.ru))
    .concat(props.sense.loanSources.map(ls => `${ls.lang}. ${ls.word}`))
  if (tags.length === 0)
    return ''
  return `— ${tags.join(', ')}`
})
</script>

<template>
  <div class="space-y-2">
    <div class="space-x-2">
      <span v-if="ix !== ''" class="min-w-[30px] text-center align-top text-violet-300">
        {{ ix }}
      </span>

      <div class="inline-block w-11/12">
        <!-- <span v-if="sense.fieldTags.length > 0" class="space-x-2 pr-2">
          <template v-for="(tag, i) of sense.fieldTags" :key="i">
            <UiTag kind="sense" class="group relative cursor-pointer">
              {{ tag.ruShort.replaceAll('.', '') }}

              <UiTooltip>
                {{ tag.ru }}
              </UiTooltip>
            </UiTag>
          </template>
        </span> -->
        <small v-for="(tag, i) of sense.fieldTags" :key="i" class="pr-1 italic text-green-600">
          <span class="group relative after:content-[\',\'] last:after:content-none">
            {{ tag.ruShort }}

            <div class="invisible absolute bottom-full left-1/2 z-20 -translate-x-1/2 pb-1 group-hover:visible">
              <div class="flex items-center justify-center rounded-md bg-neutral-800/80 px-3 py-1.5 leading-4 shadow-md outline outline-1 outline-neutral-700 backdrop-blur-md">
                {{ tag.ru }}
              </div>
            </div>
          </span>
        </small>

        <Content :data="sense.content" />

        <span class="ml-1 space-x-2 text-base italic text-gray-500">
          {{ miscTagsLine }}
        </span>
        <span v-if="sense.extRefs.length > 0" class="group relative cursor-pointer align-top text-xs text-ns-500 underline decoration-dotted underline-offset-4">
          [*]
          <UiTooltip class="text-base text-ns-gray-400">
            <span v-for="(extRef, extRefIx) in sense.extRefs" :key="extRefIx">
              {{ extRef.target }}: {{ extRef.value }}
            </span>
          </UiTooltip>
        </span>
      </div>
    </div>

    <!--  -->

    <div v-if="!isPreview && sense.intRefs.length > 0" class="ml-7">
      <ul v-for="(reference, referenceIndex) of sense.intRefs" :key="referenceIndex">
        <li>
          <span class="text-xs">
            ⇒
          </span>

          <span class="ml-1 mr-2 italic">
            {{ t(`models.jpnEntry.referenceType.${reference.referenceType}`) }}
          </span>

          <NuxtLink
            v-if="reference.target !== null && reference.target.length === 4"
            :to="{ name: 'dict-jpn-wid', params: { wid: reference.target } }"
            class="text-ns-500 underline decoration-dotted underline-offset-4"
          >
            {{ reference.value }}
          </NuxtLink>

          <NuxtLink
            v-else
            :to="{ name: 'search-JpnEntries', query: { r: reference.value } }"
            class="text-ns-500 underline decoration-dotted underline-offset-4"
          >
            {{ reference.value }}
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- <div v-if="!isPreview && sense.examples?.length" :class="`${meaning.senses.length > 1 ? 'ml-8':'ml-1'}`"> -->
    <div v-if="!isPreview && sense.examples?.length" class="ml-8">
      <div v-for="(example, exampleIndex) of sense.examples" :key="exampleIndex" class="space-x-2 border-l-2 border-ns-gray-200 pl-2 text-neutral-500  dark:border-ns-gray-700">
        <Content :data="example.sentence" />
        <Content :data="example.translation" />
      </div>
    </div>

    <Sense
      v-for="(subsense, subsenseIndex) of sense.subSenses"
      :key="subsenseIndex"
      :sense="subsense"
      :ix="`${ix}.${subsenseIndex + 1}`"
      :is-preview="isPreview"
      class="ml-6 flex flex-col"
    />
  </div>
</template>
