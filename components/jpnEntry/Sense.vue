<script setup lang="ts">
interface Props {
  sense: V2Sense
  ix: string
  isPreview: boolean
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-2">
    <div class="space-x-2">
      <span v-if="ix !== ''" class="min-w-[30px] text-center text-ns-gray-400">
        {{ ix }}
      </span>

      <span v-for="(tag, i) of sense.fieldTags" :key="i" class="italic text-green-600">
        <span class="group relative cursor-pointer after:content-[\',\'] last:after:content-none">
          {{ tag.engShort }}

          <div class="absolute bottom-full left-1/2 z-20 hidden -translate-x-1/2 pb-1 group-hover:block">
            <div class="flex items-center justify-center rounded-md border border-ns-gray-200 bg-white px-3 py-1.5 shadow-md dark:border-ns-gray-700 dark:bg-ns-gray-800">
              <span class="text-wrap pb-[4px] text-center leading-tight xl:text-nowrap xl:leading-[75%]">
                {{ tag.ru }}
              </span>
            </div>
          </div>
        </span>
      </span>

      <Content :content="sense.content" />

      <span class="space-x-2 italic">
        <span
          v-for="(tag, i) of sense.metaTags.concat(sense.dialectTags)"
          :key="i"
          class="after:content-[','] first:before:content-['('] last:after:content-[')']"
        >
          {{ tag.ru }}
        </span>
      </span>
    </div>

    <!--  -->

    <div v-if="!isPreview && sense.intRefs.length > 0" class="ml-7">
      <ul v-for="(reference, referenceIndex) of sense.intRefs" :key="referenceIndex">
        <li>
          <span class="text-xs">
            ⇒
          </span>

          <span class="ml-1 mr-2 italic">
            {{ $t(`models.jpnEntry.referenceType.${reference.referenceType}`) }}
          </span>

          <NuxtLink
            v-if="reference.target !== null && reference.target.length === 4"
            :to="{ name: 'jpn-wid', params: { wid: reference.target } }"
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
        <Content :content="example.sentence" />
        <Content :content="example.translation" />
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
