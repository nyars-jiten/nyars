<template>
  <div class="download-page">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="12" sm="12" xs="12">
          <v-card class="" elevation="2" outlined tile>
            <v-card-title>Скачать словарь</v-card-title>
            <v-card-text>
              Словарь предоставляется всем, кто принимал участие в его редактировании.
              <br />
              Для доступа необходимо набрать 15 недельного рейтинга. Рейтинг начисляется за работу над словарём (2
              единицы за правку, 3 единицы за новую статью).
            </v-card-text>
              <!-- {{ currentDownloads }} -->
            <div class="downloads-list">
              <div class="download-el" v-for="dl in currentDownloads" :key="dl.id">
                {{ getTitle(dl.type) }}
                <br>
                <a target="_blank" :href="getLink(dl.id)"><span class="filelink"><v-icon medium class="linkicon">mdi-download</v-icon>{{ dl.fileSize }}</span></a>
                <span class="updated">(Обновлено {{ dateFormat(dl.date) }})</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import exportsData from '@/data/exports.json';

export default {
  methods: {
    ...mapActions(["getDownloads"]),
    getTitle(type) {
      if (!this.exports[type]) return type;
      return this.exports[type].title;
    },
    getLink(id) {
      return process.env.VUE_APP_API + "users/downloads/" + id;
    },
    dateFormat(date) {
      const d = new Date(date);
      const datestring = d.getDate().toString().padStart(2, 0)  + "." + (d.getMonth()+1).toString().padStart(2, 0) + "." + d.getFullYear();
      return datestring;
    }
  },
  computed: {
    ...mapGetters(["currentDownloads"])
  },
  mounted() {
    this.getDownloads();
  },
  data: () => ({
    exports: exportsData,
  }),
};
</script>

<style lang="scss">
.downloads-list {
  padding-left: 20px;
  padding-bottom: 10px;
}

.download-el {
  padding-bottom: 10px;
}

.filelink, .linkicon {
  color: var(--v-anchor-base) !important;
  cursor: pointer;
}

.updated {
  color: var(--v-text-decoration-color-base);
  padding-left: 5px;
}
</style>
