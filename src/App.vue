<template>
  <v-app>
    <Menu />

    <v-main>
      <router-view />
      <Alert />
    </v-main>
  </v-app>
</template>

<script>
import Menu from "@/components/Menu";
import Alert from "@/components/Alert";
export default {
  components: {
    Menu,
    Alert,
  },
  metaInfo: {
    title: 'НЯРС — Новый Японско-Русский Словарь',
    // all titles will be injected into this template
    titleTemplate: '%s' // | НЯРС
  },
  created () {
    const isDarkTheme = this.$store.state.user.darkMode;
    this.$vuetify.theme.dark = isDarkTheme;
  },
  mounted () {
    this.$meta().refresh();
  }
};
</script>

<style lang="scss">
@import "@/styles/reset.scss";

$color-pack: false;
$body-font-family: "Rubik", "Noto Sans JP", HanaMinA, HanaMinB, Helvetica, Arial,
  sans-serif;

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  a {
    text-decoration: none; /* Убираем подчеркивание у ссылок */
    // color: rgba(0, 0, 0, 0.87);
    // &:hover {
    //   // color: rgba(77, 77, 77, 0.7);
    // }
  }

  rt {
    user-select: none;
  }
}

// .theme--dark .v-main {
//   background-color: #424242;
// }

// .theme--light .v-main {
//   background-color: #f5f5f5;
// }
</style>
