<template>
  <div class="user-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile v-if="currentUser">
            <v-card-title>
              {{ currentUser.username }}
            </v-card-title>
            <v-card-text>
              <v-img
                :lazy-src="avatarLink(currentUser.avatar)"
                max-height="150"
                max-width="150"
                :src="avatarLink(currentUser.avatar)"
              ></v-img>
              <v-file-input
                label="Аватарка"
                placeholder="Выбрать аватарку"
                show-size
                accept="image/png, image/jpeg, image/bmp"
                truncate-length="25"
                prepend-icon="mdi-file-image-outline"
                v-model="file"
              ></v-file-input>
              <p>.png/.jpeg/.jpg, 150x150, 100kb</p>
              <v-btn color="primary" outlined @click="fileUpload"
                >Загрузить</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { sendPostRequest } from "@/core/apiRequests.js";
export default {
  data() {
    return {
      file: undefined,
    };
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    avatarLink(img) {
      return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
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
};
</script>>
