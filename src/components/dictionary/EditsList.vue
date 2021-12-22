<template>
  <div class="edits-list">
    <v-expansion-panels
      v-model="panelIndexLocal"
      :key="getPanelKey"
      accordion
      flat
      tile
    >
      <v-expansion-panel class="" v-for="edit in lastEdits" :key="edit.id">
        <v-expansion-panel-header
          hide-actions
          v-bind:class="computeEditClass(edit.status)"
          class="header"
          style="padding: 10px"
        >
          <div class="titles">
            <v-row no-gutters align="center">
              <router-link
                class="titles-link"
                :to="{ name: 'dict-entry', params: { id: edit.identifier, type: getDictTypeIdent(edit.dictionary) } }"
                v-if="edit.identifier && !(edit.type == 3 && (edit.status == 4 || edit.status == 3))"
              >
                <EditTitle v-bind:edit="edit" />
              </router-link>
              <EditTitle v-bind:edit="edit" v-else />
              <v-spacer></v-spacer>
              <div
                class="approveStatus"
                v-bind:class="computeApproveClass(edit.status)"
              >
                {{ computeApproveText(edit.status) }}
              </div>
              <div class="approver" v-if="edit.status != 4 && edit.status != 1">
                <v-avatar size="22px" class="avatar">
                  <img :src="avatarLink(edit.approver.avatar)" />
                </v-avatar>
                <span class="author-name">{{ edit.approver.username }}</span>
              </div>
            </v-row>
            <div class="subheader">
              <v-row no-gutters align="center">
                <span class="edit-id">#{{ edit.id }}</span>
                <span class="dict-type"
                  >{{ getDictType(edit.dictionary) }},</span
                >
                <span
                  class="edit-type"
                  v-bind:class="computeEditTypeClass(edit.type)"
                  >{{ getEditType(edit.type) }}</span
                >
                <v-spacer></v-spacer>
                <span class="time"
                  >создана {{ timeDif(edit.createdDate) }}</span
                >
                <v-avatar size="22px" class="avatar">
                  <img :src="avatarLink(edit.author.avatar)" />
                </v-avatar>
                <router-link :to="{ name: 'user', params: { username: edit.author.username } }">
                  <span class="author-name">{{ edit.author.username }}</span>
                </router-link>
              </v-row>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content style="line-break: anywhere">
          <div class="difference-block">
          <v-row no-gutters justify="space-between" v-if="editCompare[edit.id]">
            <v-col cols="12" md="10" sm="12">
              <v-row>
                <v-col cols="12" md="10">
                  <span class="comment-line" style="overflow-wrap: break-word; width: 100%; overflow:hidden;">
                    Обоснование: {{editCompare[edit.id].comment}}
                  </span>
                </v-col>
                <v-col cols="12" md="5" sm="12">
                  <div class="side">
                  <template
                    v-for="(source, sourceIndex) of editCompare[edit.id].source"
                  >
                    <template v-if="source.isDiffered">
                      <div
                        class="removed"
                        :key="sourceIndex"
                        v-text="source.value"
                      /></template>
                    <template v-else>{{ source.value }}</template>
                  </template>
                </div>
                </v-col>
                <v-col cols="12" md="1" sm="12">
                  <div class="arrow">⟶</div>
                </v-col>
                <v-col cols="12" md="5" sm="12">
                  <div class="side">
                  <template
                    v-for="(result, resultIndex) of editCompare[edit.id].result"
                  >
                    <template v-if="result.isDiffered">
                      <div
                        class="new"
                        :key="resultIndex"
                        v-text="result.value"
                      />
                    </template>
                    <template v-else>{{ result.value }}</template>
                  </template>
                </div>
                </v-col>
              </v-row>
              </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col cols="12" md="2" sm="12" v-if="edit.status == 1">
              <div class="btns">
                <v-btn
                  class="ma-2"
                  outlined
                  fab
                  x-small
                  color="green"
                  v-if="userHasRights(4)"
                  v-on:click="acceptEdit(edit.id)"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  fab
                  x-small
                  color="red"
                  v-if="canUserEdit(edit)"
                  v-on:click="declineEdit(edit.id)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn
                  class="ma-2"
                  outlined
                  fab
                  x-small
                  color="primary"
                  v-if="canUserEdit(edit)"
                  v-on:click="openEditEditor(edit.id)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </v-col>
            </v-row>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import sc from "@/core/scriptConverter.js";
import { sendPostRequest } from "@/core/apiRequests.js";
import tdif from "@/core/timeDifference.js";
import EditTitle from "@/components/dictionary/EditTitleComponent.vue";
import { mapGetters, mapActions } from "vuex";

import dictTypesData from "@/data/dictionaryTypes.json";

export default {
  computed: {
    ...mapGetters(["editCompare", "currentUser", "userHasRights"]),
    getPanelKey() {
      const key = this.lastEdits.length > 0 ? this.lastEdits.at(-1).id : 0;
      return key;
    },
  },
  methods: {
    ...mapActions(["getEditCompare", "newAlert", "getLastEdits"]),
    async acceptEdit(editId) {
      const resp = await sendPostRequest(`edits/${editId}/approve`, {});
      if (resp.status == 200) {
        this.newAlert({ msg: `Правка #${editId} принята`, type: "success" });
      }
    },
    avatarLink(img) {
      return `${process.env.VUE_APP_BASE}upload/avatars/${img}`;
    },
    canUserEdit(edit) {
      return (
        this.userHasRights(4) ||
        (edit.author.id == this.currentUser.id)
      );
    },
    openEditEditor(editId) {
      this.$router.push({ path: "/jp/edt/" + editId }).catch(() => {});
    },
    async declineEdit(editId) {
      const resp = await sendPostRequest(`edits/${editId}/decline`, {});
      if (resp.status == 200) {
        this.newAlert({ msg: `Правка #${editId} отклонена`, type: "warning" });
      }
    },
    computeEditClass(type) {
      return {
        "edit-status-new": type === 1,
        "edit-status-declined": type === 2,
        "edit-status-accepted": type === 3,
        "edit-status-autoaccepted": type === 4,
        "edit-status-reverted": type === 5,
      };
    },
    computeEditTypeClass(type) {
      return {
        "edit-status-type-new": type === 1,
        "edit-status-type-edit": type === 2,
        "edit-status-type-delete": type === 3,
      };
    },
    computeApproveClass(type) {
      return {
        "edit-status-approve-new": type === 1,
        "edit-status-approve-declined": type === 2,
        "edit-status-approve-accepted": type === 3,
        "edit-status-approve-autoaccepted": type === 4,
        "edit-status-approve-reverted": type === 5,
      };
    },
    computeApproveText(type) {
      switch (type) {
        case 1:
          return "не проверено";
        case 2:
          return "отклонено";
        case 3:
          return "принято";
        case 4:
          return "принято автоматически";
        case 5:
          return "восстановлено";
        default:
          return "—";
      }
    },
    getDictType(type) {
      return this.dictTypes[type].ru;
    },
    getDictTypeIdent(type) {
      return this.dictTypes[type].identifier;
    },
    getEditType(type) {
      switch (type) {
        case 1:
          return "новая";
        case 2:
          return "исправление";
        case 3:
          return "удаление";
        default:
          return "—";
      }
    },
    convertR(raw) {
      return sc.scriptConvert(raw);
    },
    convertSc(raw) {
      var converted = raw.map(function (reading) {
        return sc.scriptConvert(reading);
      });
      return converted.join("・");
    },
    timeDif(previous) {
      var current = new Date();
      return tdif.timeDifference(current, Date.parse(previous));
    },
  },
  data() {
    return {
      panelIndexLocal: -9,
      dictTypes: dictTypesData
    };
  },
  props: {
    lastEdits: Array,
  },
  async mounted() {
    this.getLastEdits();
    this.$store.commit('clearEditCompare');
  },
  watch: {
    panelIndexLocal: function () {
      if (typeof this.panelIndexLocal !== "undefined") {
        let id = this.lastEdits[this.panelIndexLocal].id;
        this.getEditCompare(id);
      }
    },
  },
  components: {
    EditTitle,
  },
};
</script>

<style lang="scss">
.titles {
  // color: rgba(0,0,0,.7);
}

a.titles-link {
  text-decoration: none;
  // color: inherit;
  cursor: pointer;
  color: unset !important;

  &:hover {
    // color: rgba(77, 77, 77, 0.7);
  }
}

.title-wrap,
.title,
.edits-list {
  display: inline-block;
}

.edits-list {
  width: 100%;
}

// .diff {
//   display: grid;
//   grid-template-columns: 1fr auto 1fr;
//   gap: 6vw;
// }

.side {
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.arrow {
  font-size: 22px;
  align-self: center;
}

.new {
  display: inline;
  color: var(--v-edit-new-color-base);
}

.removed {
  display: inline;
  color: var(--v-edit-removed-color-base);
}

// .subheader {
//   align-items: center;
// }

// .avatar {
//     // gap: 10px;
// }

.dict-type,
.edit-type {
  color: var(--v-edit-list-type-color-base);
  font-style: italic;
}

.dict-type {
  padding-right: 3px;
}

.time {
  padding-right: 10px;
}

.approver {
  padding-left: 10px;
}

.edit-status-type-new {
  color: var(--v-edit-status-type-new-color-base);
}

.edit-status-type-edit {
  color: var(--v-edit-status-type-edit-color-base);
}

.edit-status-type-delete {
  color: var(--v-edit-status-type-delete-color-base);
}

.separator {
  content: "・";
  color: var(--v-edit-separator-color-base);
  margin: 0px 10px;
}

.author-name {
  color: var(--v-main-text-base);
  // color: #8f8f8f;
}

.edit-id,
.author-name {
  &::before {
    content: "「";
  }

  &::after {
    content: "」";
  }
}

.edit-status-new {
  border-left: 2px solid var(--v-edit-status-new-color-base);
}

.edit-status-declined {
  border-left: 2px solid var(--v-edit-status-declined-color-base);
}

.edit-status-accepted {
  border-left: 2px solid var(--v-edit-status-accepted-color-base);
}

.edit-status-autoaccepted {
  border-left: 2px solid var(--v-edit-status-autoaccepted-color-base);
}

.edit-status-reverted {
  border-left: 2px solid var(--v-edit-status-reverted-color-base);
}

.edit-status-approve-new {
  color: var(--v-edit-status-approve-new-color-base);
}

.edit-status-approve-declined {
  color: var(--v-edit-status-approve-declined-color-base);
}

.edit-status-approve-accepted {
  color: var(--v-edit-status-approve-accepted-color-base);
}

.edit-status-approve-autoaccepted {
  color: var(--v-edit-status-approve-autoaccepted-color-base);
}

.edit-status-approve-reverted {
  color: var(--v-edit-status-approve-reverted-color-base);
}
</style>
