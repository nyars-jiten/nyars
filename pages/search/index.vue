<script setup lang="ts">
  const request = useSearchRequest()
  const mode = useSearchMode()

</script>

<template>
  <section>
    <div>
      <span>
        {{ request }}
      </span>

      <span>
        {{ mode }}
      </span>

      <!-- search results -->
    </div>

    <div>
      <!-- search item result -->
    </div>
  </section>
</template>
