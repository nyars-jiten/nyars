<template>
  <div class="stats-site">
    <v-simple-table class="stats-table" v-if="resultStats">
      <tr>
        <td>Всего статей</td>
        <td>{{ this.resultStats.jap }}</td>
      </tr>
      <tr>
        <td>Проверено</td>
        <td>{{ this.resultStats.japRev }} ({{ quality() }} %)</td>
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
    }
  },
  computed: {
    ...mapGetters(["lastSiteStats"]),
    resultStats() {
      let lastStats = this.lastSiteStats[1];
      return lastStats ? lastStats.totalStats : false;
    },
  },
  async created() {
    // await this.getLastStats();
  },
};
</script>
