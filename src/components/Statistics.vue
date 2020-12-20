<template>
  <!-- <v-data-table
    :headers="headers"
    :items="desserts"
    hide-default-header
    hide-default-footer
    class="elevation-1"
  ></v-data-table> -->
  <div class="statistics">
    <!-- {{lastSiteStats}} -->
    <!-- {{lastUserStats}} -->
    <v-simple-table class="stats-table" v-if="resultStats">
      <tr>
        <td>Новые статьи</td>
        <td>{{ resultStats.editsStats.japNew }}</td>
      </tr>
      <tr>
        <td>Исправления</td>
        <td>{{ resultStats.editsStats.japEdit }}</td>
      </tr>
    </v-simple-table>
    <v-divider class="divider-stats"></v-divider>
    <table class="user-stats-table" v-if="resultStats">
      <thead>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td align="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Р.</span>
              </template>
              <span>Суммарный рейтинг</span>
            </v-tooltip>
          </td>
          <td align="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">Н.</span>
              </template>
              <span>Новые статьи</span>
            </v-tooltip>
          </td>
          <td align="center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">И.</span>
              </template>
              <span>Исправления статей</span>
            </v-tooltip>
          </td>
        </tr>
      </thead>
      <tr v-for="(user, index) in lastUserStats" :key="user.id">
        <td>{{ index + 1 }}.</td>
        <td>
          <v-avatar size="26px" class="avatar">
            <img :src="avatarLink(user.avatar)" />
          </v-avatar>
        </td>
        <td class="stats-username">
          <span>{{ user.username }}</span>
        </td>
        <td align="center">{{ user.userRating.weekRating }}</td>
        <td align="center">{{ user.userRating.summary.week.japNew }}</td>
        <td align="center">{{ user.userRating.summary.week.japEdit }}</td>
        <!-- <td>{{ resultStats.editsStats.japNew }}</td> -->
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getLastStats", "getLastUserStats"]),
    avatarLink(img) {
      return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
    },
  },
  computed: {
    ...mapGetters(["lastSiteStats", "lastUserStats"]),
    sourceStats() {
      return this.lastSiteStats[0];
    },
    resultStats() {
      return this.lastSiteStats[1];
    },
    // japNew() {
    //   return this.resultStats.editsStats.japNew - this.sourceStats.editsStats.japNew;
    // },
    // japEdit() {
    //   return this.resultStats.editsStats.japEdit - this.sourceStats.editsStats.japEdit;
    // }
  },
  async created() {
    await this.getLastStats();
    await this.getLastUserStats();
  },
};
</script>

<style lang="scss">
.stats-username {
  // display: block;
  // max-width: 100%;
  max-width: 0;
  width: 30%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.divider-stats {
  padding: 5px 0px;
}

.statistics {
  overflow: hidden;
}

.user-stats-table {
  font-size: 120%;
  width: 100%;
}

.user-stats-table tr td + td {
  padding-left: 10px;
}

.stats-table {
  font-size: 120%;
  width: min-content;
  white-space: nowrap;
  // align-content: center;
  // padding-left: 10px;
}
.stats-table tr td + td {
  padding-left: 10px;
}
</style>
