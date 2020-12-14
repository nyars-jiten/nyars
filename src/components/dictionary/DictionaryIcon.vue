<template>
  <div class="dict-icon">
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-icon :color="color" dark v-bind="attrs" v-on="on">
          {{ icon }}
        </v-icon>
      </template>
      <span>
          {{ tooltip }}
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    tooltip: String,
    color: String,
    icon: String
  }
}
</script>
