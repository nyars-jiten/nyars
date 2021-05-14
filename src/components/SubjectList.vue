<template>
  <div class="subject-block">
    <v-card class="" elevation="2" outlined tile>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="subject-body">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr
                v-for="subject in subjects"
                :key="subject.id"
                @click="subjLink(subject.tag)"
              >
                <!-- <td>{{ subject }}</td> -->
                <!-- <router-link :to="subjLink(subject.tag)"></router-link> -->
                <td class="subj-title">{{ subject.tag.rus }}</td>
                <td>{{ subject.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    subjLink(tag) {
      this.$router
        .push({ path: "/search", query: { r: `#${tag.engShort}` } })
        .catch(() => {});
    },
  },
  props: {
    subjects: Array,
    title: String,
  },
};
</script>

<style lang="scss">
.subj-title {
  &::first-letter {
    text-transform: capitalize;
  }
}

.subject-body {
  tr {
    cursor: pointer;
  }
}
</style>
