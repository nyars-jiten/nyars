<template>
  <div class="stats-site">
    <v-simple-table class="stats-table" v-if="resultStats">
      <tr>
        <td>Всего статей</td>
        <td>
          {{ resultStats.jap }}
          <span :class="newStatsClass(newStatsTotal)">
            {{getSign(newStatsTotal) + newStatsTotal}}
          </span>
        </td>
      </tr>
      <tr>
        <td>Проверено</td>
        <td>
          {{ resultStats.japRev }}
          <span :class="newStatsClass(newStatsRev)">
            {{getSign(newStatsRev) + newStatsRev}}
          </span>
          ({{ quality() }}%)
        </td>
      </tr>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getLastStats"]),
    quality() {
      return (this.resultStats.japRev / this.resultStats.jap * 100).toFixed(3) ;
    },
    getSign(stats) {
      if (stats < 0) return '';
      return '+';
    },
    newStatsClass(stats) {
      return {
        'plus-stats': stats > 0,
        'minus-stats': stats < 0
      }
    }
  },
  computed: {
    ...mapGetters(["lastSiteStats"]),
    resultStats() {
      let lastStats = this.lastSiteStats[1];
      return lastStats ? lastStats.totalStats : false;
    },
    prevStats() {
      let prevStats = this.lastSiteStats[0];
      return prevStats ? prevStats.totalStats : false;
    },
    newStatsTotal() {
      return this.resultStats.jap - this.prevStats.jap;
    },
    newStatsRev() {
      return this.resultStats.japRev - this.prevStats.japRev;
    }
  },
  async created() {
    // await this.getLastStats();
  },
};
</script>

<style lang="scss">
.plus-stats {
  color: green;
}

.minus-stats {
  color: red;
}
</style>
