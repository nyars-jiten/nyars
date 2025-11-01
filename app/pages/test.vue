<script lang="ts" setup>
const { data: user } = useUserData().getCurrentUser()
</script>

<template>
  <div>
    {{ user }}
  </div>
</template>
