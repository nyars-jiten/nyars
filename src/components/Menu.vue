<template>
  <div>
    <v-dialog v-model="dialog" max-width="400">
      <v-card class="">
        <v-card-title class="headline">
          {{ authmode ? "Войти" : "Регистрация" }}
        </v-card-title>

        <v-card-text>
          <a
            class="discord-wrapper"
            href="/api/users/auth/discord"
            v-if="authmode"
          >
            <div class="discord">
              <div class="text">Вход через<br />сувенирную лавку</div>
              <img src="@/assets/discord-logo-png-7622.png" height="60" />
            </div>
          </a>
          <template>
            <div class="auth-form">
              <v-text-field label="Логин" v-model="login"></v-text-field>
              <v-text-field
                type="password"
                label="Пароль"
                v-model="password"
              ></v-text-field>
              <p>
                Для {{ authmode ? "регистрации" : "входа" }} нажмите
                <span class="click-here" @click="authmode = !authmode">
                  здесь
                </span>
              </p>
              <!-- <p>Пароль любой кроме пустого</p> -->
            </div>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey darken-1" text @click="dialog = false">
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="auth">
            {{ authmode ? "Войти" : "Зарегистрироваться" }}
          </v-btn>

          <!-- <v-btn
            color="grey darken-1"
            text
            @click="dialog = false"
          >
            Создать
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer app v-model="drawer">
      <router-link class="titles-link" :to="{ name: 'Home' }">
        <div class="menu-logo-wrapper">
          <!-- <img class="menu-logo-back" src="@/assets/menu-logo-back.png" /> -->
          <img class="menu-logo" src="@/assets/menu-logo.png" />
        </div>
      </router-link>
      <!-- <v-img class="menu-logo" src="menu-logo.png" /> -->
      <v-list nav>
        <v-list-item-group color="primary" v-model="selection">
          <div v-for="category in menu" :key="category.id">
            <v-subheader
              v-if="
                category.category.length > 0 && userRoleId >= category.rights
              "
              >{{ category.category }}</v-subheader
            >

            <div
              class="menu-element-list"
              v-for="(link, i) in category.links"
              :key="i"
              @click="clear"
            >
              <v-list-item
                v-if="linkHasRights(link)"
                @click.middle="handleFunctionCall(link.action, true)"
                @click="handleFunctionCall(link.action)"
              >
                <v-list-item-icon>
                  <v-icon v-text="link.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="link.title"
                    class="menu-element-text"
                  ></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
          </div>
        </v-list-item-group>
      </v-list>

      <div class="bootom-menu-block">
        <v-list nav>
          <v-list-item-group color="primary" v-model="selection">
            <div>
              <v-subheader></v-subheader>

              <div class="menu-element-list">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon v-text="'mdi-weather-night'"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="darkMode ? 'Светлая тема' : 'Тёмная тема'"
                      class="menu-element-text"
                      @click="darkMode = !darkMode"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </div>
          </v-list-item-group>
        </v-list>
        <v-divider class="user-profile-divider"></v-divider>
        <!-- <template v-slot:prepend> -->
        <div class="user-profile">
          <div class="authorized" v-if="currentUser.username">
            <router-link :to="{ name: 'user' }">
              <v-list-item two-line>
                <v-list-item-avatar>
                  <img :src="avatarLink(currentUser.avatar)" />
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{
                    currentUser.username
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    currentUser.role
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </div>
          <div class="unauthorized" v-else>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>unauthorized</v-list-item-title>
                <v-list-item-subtitle>—</v-list-item-subtitle>
                <v-btn color="primary" dark outlined @click.stop="dialog = true"
                  >Авторизоваться
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
        <!-- </template> -->
      </div>
    </v-navigation-drawer>

    <v-app-bar app absolute>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-row>
        <v-col cols="12" md="12">
          <SearchBar />
        </v-col>
      </v-row>

      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import menuData from "@/data/menu.json";
import SearchBar from "@/components/SearchBar.vue";
import { sendPostRequest } from "@/core/apiRequests.js";

export default {
  computed: mapGetters([
    "currentUser",
    "userRoleId",
    "darkModeState",
    "userHasRights",
  ]),
  methods: {
    ...mapMutations(["changeDarkMode"]),
    ...mapActions(["getCurrentUser", "logOut"]),
    clear() {
      this.selection = null;
    },
    linkHasRights(link) {
      let accessRights = true;
      if (typeof link.access != "undefined" && link.access !== null) {
        accessRights = this.userHasRights(link.access);
      }
      return this.userRoleId >= link.rights && accessRights;
    },
    async auth() {
      const request = { username: this.login, password: this.password };
      if (this.authmode) {
        const resp = await sendPostRequest("users/auth", request);
        if (resp.status == 200) {
          this.getCurrentUser();
        }
      } else {
        const resp = await sendPostRequest("users/register", request);
        if (resp.status == 200) {
          this.getCurrentUser();
        }
      }
      this.dialog = false;
    },
    navigate(params) {
      if (params.external) {
        var win = window.open(params.path, "_blank");
        win.focus();
      } else {
        this.$router.push({ path: params.path }).catch(() => {});
      }
    },
    avatarLink(img) {
      return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
    },
    logout() {
      this.logOut();
    },
    handleFunctionCall(functionObj, isMiddleMouseButton = false) {
      this[functionObj.name]({
        external: isMiddleMouseButton,
        ...functionObj.params,
      });
    },
  },
  watch: {
    darkMode() {
      this.changeDarkMode(this.darkMode);
      this.$vuetify.theme.dark = this.darkMode;
    },
  },
  components: { SearchBar },
  async mounted() {
    this.$vuetify.theme.dark = this.darkModeState;
    this.darkMode = this.darkModeState;
    this.getCurrentUser();
  },
  data: () => ({
    drawer: true,
    selection: null,
    dialog: false,
    menu: menuData.menuList,
    login: "",
    password: "",
    authmode: true,
    darkMode: false,
  }),
};
</script>

<style lang="scss">
.auth-form {
  padding-top: 30px;
}

.click-here {
  cursor: pointer;
  color: var(--v-menu-click-here-base);
}

.discord-wrapper {
  outline: none;
  text-decoration: none;
  margin-top: 24px;
  display: grid;
  justify-content: center;
  border: 1px solid var(--v-menu-discord-wrapper-base);

  color: inherit;

  &:hover {
    // color: var(--v-link-color-base);
    box-shadow: 0 0 10px var(--v-menu-discord-wrapper-base);
  }

  .discord {
    text-align: center;
    display: inline-grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 10px;
  }
}

.menu-logo-wrapper {
  // position: relative;
  // overflow: hidden;
}

// .menu-logo-back {
//   top: 0;
//   position: absolute;
//   background-color: red;
// }

.menu-logo {
  width: 80%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 10px;
  // opacity: 1 !important;
}

.v-navigation-drawer__content::before {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  background-color: var(--v-menu-logo-back-base);
  opacity: 0.95;
}

.titles-link {
  z-index: 1;
}

.v-navigation-drawer__content {
  position: relative;
  background-size: 100%;
  // background-color: rgba(var(--v-menu-logo-back-base), 1);
  // $c: var(--v-menu-logo-back-base);
  // $g: linear-gradient(to right, $c 0 100%);
  // $g,
  background-image: url("~@/assets/menu-logo-back.png");
  background-repeat: no-repeat;
  // background-blend-mode: lighten;
  background-position-x: 120px;
  background-position-y: -140px;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.v-list {
  background: none !important;
}

.bootom-menu-block {
  width: 100%;
}

// .user-profile {
//   position: fixed;
//   bottom: 0;
//   // padding: 8px 16px;
// }
</style>
