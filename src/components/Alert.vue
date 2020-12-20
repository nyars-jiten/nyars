<template>
  <div class="alerts">
    <div class="alert" v-for="alert in activeAlerts" :key="alert.time">
      <v-alert
        class="text-center"
        :value="curTime - alert.time < 3"
        :type="alert.type"
        colored-border
        border="left"
        elevation="2"
        dismissible
        transition="fade-transition"
      >
        {{ alert.msg }}
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["activeAlerts"]),
  data() {
    return {
      curTime: 0,
    };
  },
  updated() {
    setTimeout(() => {
      this.curTime = Date.now() / 1000;
    }, 3000);
  },
};
</script>

<style lang="scss">
.alerts {
  position: fixed;
  bottom: 0;
  right: 5%;
  width: 280px;
  z-index: 10;
}
</style>
