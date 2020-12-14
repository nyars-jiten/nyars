<template>
  <div class="subjects-page">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="3" sm="12">
          <SubjectList :subjects="getFldSubjects" title="Тематики"/>
        </v-col>
        <v-col cols="12" md="3" sm="12">
          <SubjectList :subjects="getDialSubjects" title="Диалекты"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SubjectList from '@/components/SubjectList.vue';

export default {
  computed: {
    ...mapGetters(["getSubjects"]),
    getFldSubjects() {
      return this.getSubjects('Fld');
    },
    getDialSubjects() {
      return this.getSubjects('Dial');
    },
  },
  methods: mapActions(["fetchSubjects"]),
  async created() {
    this.fetchSubjects();
  },
  components: {
    SubjectList
  },
};
</script>
