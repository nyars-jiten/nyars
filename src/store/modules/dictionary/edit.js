import Vue from 'vue';
const axios = require('axios');

export default {
    actions: {
        async getLastEdits(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'edits?n=25&p=0&statuses=')
                .then(response => (ctx.commit('updateLastEdits', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getEditCompare(ctx, id) {
            axios
                .get(process.env.VUE_APP_API + `edits/${id}/compare`)
                .then(response => (ctx.commit('updateEditCompare', { editCompare: response.data, id })))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        updateLastEdits(state, lastEdits) {
            state.lastEdits = lastEdits;
        },
        updateEditCompare(state, { editCompare, id }) {
            Vue.set(state.editCompare, id, editCompare);
        }
    },
    state: {
        lastEdits: [],
        editCompare: []
    },
    getters: {
        lastEdits(state) {
            return state.lastEdits;
        },
        editCompare(state) {
            return state.editCompare;
        }
    },
};
