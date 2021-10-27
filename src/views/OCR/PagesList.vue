<template>
  <div class="search-result">
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="12" md="12">
          <v-card class="mx-auto" tile>
            <v-card-title v-if="pagesList != null">
                {{ pagesList.title }}
            </v-card-title>
            <v-card-text>

              <div class="page-line" v-for="page in pagesList" :key="page.id">
                    <router-link :to="'/ocr/'+page.ocrBook.id+'/page/'+page.id">
                        <span :class="statusClass(page.status)">[{{page.innerIndex}}] {{page.word}}</span>
                        <span class="user ma-2" v-if="page.user">
                          <v-avatar size="20px" class="avatar">
                            <img :src="avatarLink(page.user.avatar)" />
                          </v-avatar>
                          {{page.user.username}}
                        </span>
                    </router-link>
              </div>
            </v-card-text>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["getPagesList"]),
    avatarLink(img) {
      return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
    },
    statusClass(status) {
      return {
        newpage: status == 0,
        workingpage: status == 1,
        completedpage: status == 2,
      };
    }
  },
  computed: {
    ...mapGetters(["pagesList", "userHasRights"]),
    currentBookid() {
      return this.$route.params.bookid;
    },
  },
  async mounted() {
    if (!this.userHasRights(3)) this.$router.push({ path: '/' }).catch(() => {});
    this.getPagesList(this.currentBookid);
  },
};
</script>

<style lang="scss">
.newpage, .user {
  color: grey;
}

.workingpage {
  color: orange;
}

.completedpage {
  color: var(--v-edit-new-color-base);
}
</style>
