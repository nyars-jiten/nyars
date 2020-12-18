<template>
  <div class="example-b">
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea
          label="Пример"
          v-model="example.value"
          rows="1"
          auto-grow
          counter
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="12">
        <v-textarea
          label="Перевод"
          v-model="example.translation"
          rows="1"
          auto-grow
          counter
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      example: this.exampleRaw,
    };
  },
  props: {
    exampleRaw: Object,
  },
};
</script>
