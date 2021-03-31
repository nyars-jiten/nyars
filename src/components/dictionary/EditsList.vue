<template>
  <div class="edits-list">
    <v-expansion-panels
      v-model="panelIndexLocal"
      :key="getPanelKey"
      accordion
      flat
      tile
    >
      <!-- class="" -->
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
                :to="{ name: 'view-jp', params: { wid: edit.identifier } }"
                v-if="edit.identifier"
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
                <span class="author-name">{{ edit.author.username }}</span>
              </v-row>
            </div>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row no-gutters justify="space-between" v-if="checkForNewPanel(edit.id)">
            Обоснование: {{editCompare[edit.id].comment}}
            <v-col md="11">
              <div class="diff">
                <div class="side">
                  <template
                    v-for="(source, sourceIndex) of editCompare[edit.id].source"
                  >
                    <template v-if="source.isDiffered">
                      <div
                        class="removed"
                        :key="sourceIndex"
                        v-text="source.value"
                      />
                    </template>
                    <template v-else>{{ source.value }}</template>
                  </template>
                </div>
                <div class="arrow">⟶</div>
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
              </div>
            </v-col>
            <!-- <v-spacer></v-spacer> -->
            <v-col md="1" v-if="edit.status == 1">
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
                  v-if="userHasRights(4)"
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
export default {
  computed: {
    ...mapGetters(["editCompare", "currentUser", "userHasRights"]),
    checkForNewPanel() {
      return (editId) => {
        return Object.prototype.hasOwnProperty.call(this.editCompare, editId);
      };
    },
    getPanelKey() {
      return this.lastEdits.length > 0 ? this.lastEdits[0].id : 0;
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
      switch (type) {
        case 0:
          return "яп-ру";
        default:
          return "—";
      }
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
    };
  },
  props: {
    lastEdits: Array,
  },
  async mounted() {
    this.getLastEdits();
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
  color: inherit;
  cursor: pointer;

  &:hover {
    // color: rgba(77, 77, 77, 0.7);
  }
}

.title-wrap,
.title {
  display: inline-block;
}

.diff {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 6vw;
}

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
