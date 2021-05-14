<template>
  <div class="user-page">
    <v-container fluid v-if="userProfile.username">
      <v-row>
        <v-col cols="12" md="4" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title>
              {{ userProfile.username }}
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4" sm="4" xs="12">
                  <v-img
                    :lazy-src="avatarLink(userProfile.avatar)"
                    :src="avatarLink(userProfile.avatar)"
                    max-height="150"
                    max-width="150"
                  ></v-img>
                </v-col>
                <v-col cols="12" md="8" sm="8" xs="12">
                  <div class="access-rights" v-if="currentUser.role === 'Admin'">
                    <!-- {{selectedUserRights}} -->
                    <span class="role">Роль: {{userProfile.role}}</span>
                    <div class="access-right" v-for="(right, rightId) in rights" :key="rightId">
                      {{ right }}
                      <v-icon
                        small
                        class="mr-2"
                        :class="{ 'access-denied': !hasRights(rightId), 'access-granted': hasRights(rightId)}"
                        @click="changeAccessRight(rightId)"
                      >
                        {{ hasRights(rightId) ? 'mdi-check' : 'mdi-close' }}
                      </v-icon>
                    </div>
                  </div>
                  <div class="avatar-upload" v-if="currentUser.username == userProfile.username">
                    <v-file-input
                      label="Аватарка"
                      placeholder="Выбрать аватарку"
                      show-size
                      accept="image/png, image/jpeg"
                      truncate-length="25"
                      prepend-icon="mdi-file-image-outline"
                      v-model="file"
                    ></v-file-input>
                    <p>.png/.jpeg/.jpg, 150x150, 100kb</p>
                    <v-btn color="primary" outlined @click="fileUpload"
                      >Загрузить</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title>
              Статистика
            </v-card-title>
            <template>
              <v-data-table
                :headers="headers"
                :items="resultItems"
                hide-default-footer
              ></v-data-table>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <div v-else class="not-found">
      <p>Пользователь не найден</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { sendPostRequest } from "@/core/apiRequests.js";
import accessRights from "@/data/accessRights.json";

export default {
  data() {
    return {
      file: undefined,
      headers: [
        {text: "", value: "type"},
        {text: "ЯП-новые", value: "japNew"},
        {text: "ЯП-прав.", value: "japEdit"},
      ],
      rights: accessRights
    };
  },
  computed: {
    ...mapGetters(["userProfile", "currentUser", "selectedUserRights"]),
    currentUsername() {
      return this.$route.params.username;
    },
    resultItems() {
      var resItems = [];
      if (!this.userProfile.userRating) return resItems;
      for (const [key, value] of Object.entries(this.userProfile.userRating.summary)) {
        value.type = this.getTypeTitle(key);
        resItems.push(value);
      }
      return resItems;
    },
    metaTitle() {
      return this.userProfile.username + ' — профиль пользователя';
    },
  },
  methods: {
    ...mapActions(["getUserProfile", "updateUserRights"]),
    avatarLink(img) {
      console.log(img);
      return 'https://nyars.org/upload/avatars/bd008f72-a4de-4fb3-b1e3-edd775f445f3.png';
      // return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
    },
    hasRights(num) {
      return this.selectedUserRights[num] == 1;
    },
    async changeAccessRight(rightId) {
      await this.updateUserRights({userId: this.userProfile.id, accessId: rightId});
    },
    getTypeTitle(type) {
      switch(type) {
        case 'alltime':
          return 'За всё время';

        case 'month':
          return 'За месяц';

        case 'week':
          return 'За неделю';

        case 'today':
          return 'Сегодня';

        default:
          return ''
      }
    },
    async fileUpload() {
      if (!this.file) return;
      // const convertedFile = getBase64(this.file);
      // console.log(convertedFile);
      var reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = async function () {
        const resp = await sendPostRequest("users/uploadAvatar", {
          data: reader.result,
        });
        if (resp.status == 200) {
          //
        }
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
  },
  async mounted() {
    this.getUserProfile(this.currentUsername);
  },
  metaInfo() {
    return {
      title: this.metaTitle,
      meta: [{
          property: 'og:title',
          content: `${this.metaTitle}`,
          vmid: 'og:title'
        },
        {
          property: 'og:description',
          content: `Японско-русский словарь | НЯРС`,
          vmid: 'og:description'
        }
      ]
    }
  }
};
</script>>

<style lang="scss">
.role {
  font-weight: 700;
}

.access-granted {
  color: green !important;
}

.access-denied {
  color: red !important;
}
</style>
