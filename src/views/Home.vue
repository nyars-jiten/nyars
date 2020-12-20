<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8" sm="12">
        <v-card elevation="2" outlined tile>
          <v-card-title>Добро пожаловать</v-card-title>
          <v-card-text>
              <Readme />
          </v-card-text>
        </v-card>
        <v-card elevation="2" outlined tile>
          <v-card-title>Активность</v-card-title>
          <v-card-text>
            <template>
              <v-row justify="center">
                <EditsList v-bind:lastEdits="lastEdits" />
              </v-row>
            </template>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col cols="12" md="4" sm="12">
        <v-card class="" elevation="2" outlined tile>
          <v-card-title><span style="word-break: keep-all">Статистика за 7 дней</span></v-card-title>
          <v-card-text>
            <template>
              <!-- <v-row justify="center"> -->
                <Statistics />
              <!-- </v-row> -->
            </template>
          </v-card-text>
        </v-card>
        <v-card elevation="2" outlined tile>
          <v-card-title><span style="word-break: keep-all">Статистика сайта</span></v-card-title>
          <v-card-text>
            <template>
              <!-- <v-row justify="center"> -->
                <StatisticsSite />
              <!-- </v-row> -->
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditsList from '@/components/dictionary/EditsList.vue';
import Statistics from '@/components/Statistics.vue';
import Readme from '@/components/readme/Readme.vue';
import StatisticsSite from '@/components/StatisticsSite.vue';
import sc from "@/core/scriptConverter.js"
export default {
  computed: mapGetters(["lastEdits"]),
  methods: {
    ...mapActions(["getLastEdits"]),
    computeEditClass(type) {
      return {
        "edit-status-new": type === 1,
        "edit-status-declined": type === 2,
        "edit-status-accepted": type === 3,
        "edit-status-autoaccepted": type === 4,
        "edit-status-reverted": type === 5,
      };
    },
    convertSc (raw) {
      var converted = raw.map(function(reading) {
        return sc.scriptConvert(reading);
      });
      return converted.join('・');
    }
  },
  async mounted() {
    this.getLastEdits();
  },
  components: {
    EditsList, Statistics, StatisticsSite, Readme
  },
};
</script>

<style lang="scss">

</style>
