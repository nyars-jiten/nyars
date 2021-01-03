<template>
  <div class="gallery">
    <div class="gallery-popup">
      <v-dialog v-model="imagePopup" max-width="600px"
        ><v-img :src="imagePopupSrc" class="gallery-img">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img></v-dialog>
    </div>
    <v-card class="" elevation="2" outlined tile v-if="editMode || currentImages.length > 0">
      <v-card-title>Галерея</v-card-title>
      <!-- {{ currentImages }} -->

      <div class="gallery-body">
        <v-container fluid>
          <v-row>
            <v-col cols="12" md="2" sm="4" xs="6" v-for="(img, imgId) in currentImages" :key="imgId">
              <v-img :src="img.link" class="gallery-img" @click="showPopup(img.link)">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="image-edit" v-if="editMode">
                <v-btn icon x-small @click="removeImage(imgId)" color="red"><v-icon>mdi-close</v-icon></v-btn>
                <v-text-field label="Заголовок" v-model="img.title"></v-text-field>
                <v-text-field label="Ссылка" v-model="img.link"></v-text-field>
              </div>
              <div class="image-title" v-else>
                {{ img.title }}
              </div>
            </v-col>
          </v-row>
        </v-container>
        <v-btn text outlined small @click="addNewImage" color="primary" v-if="editMode">
          <v-icon>mdi-plus</v-icon> изображение
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
// import DictionaryIcon from "@/components/dictionary/DictionaryIcon.vue";
// import GalleryDialog from "@/components/dictionary/editor/GalleryDialog.vue";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    imagePopup: false,
    imagePopupSrc: ""
  }),
  methods: {
    showPopup(src) {
      this.imagePopup = true;
      this.imagePopupSrc = src;
    },
    addNewImage() {
      // this.$store.commit("addNewImage");
      this.currentImages.push({ link: "", title: "" });
    },
    removeImage(imgId) {
      this.currentImages.splice(imgId, 1);
    }
  },
  computed: {
    ...mapGetters(["currentImages"])
  },
  props: {
    editMode: Boolean
  },
  components: {
    //
  }
};
</script>

<style lang="scss">
.gallery-img {
  cursor: pointer;
}

.gallery-body {
  padding-left: 10px;
  padding-bottom: 10px;
}
</style>
