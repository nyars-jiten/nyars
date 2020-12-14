<template>
  <v-app>
    <Menu />

    <!-- Sizes your content based upon application components -->
    <v-main class="grey lighten-2">
      <!-- Provides the application the proper gutter -->
      <router-view />
      <Alert />
    </v-main>

    <!-- <v-footer app>
    </v-footer> -->
  </v-app>
</template>

<script>
import Menu from "@/components/Menu";
import Alert from "@/components/Alert"
export default {
  components: {
    Menu, Alert
  },
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: 'Rubik', "Noto Sans JP", HanaMinA, HanaMinB, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  a {
    text-decoration: none; /* Убираем подчеркивание у ссылок */
    color: rgba(0,0,0,.87);
    &:hover {
      color: rgba(77, 77, 77, 0.7);
    }
}
}



// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
