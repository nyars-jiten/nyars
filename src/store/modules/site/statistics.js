const axios = require('axios');

export default {
    actions: {
        async getLastStats(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/stats')
                .then(response => (ctx.commit('updateSiteStats', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getLastUserStats(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/stats-user')
                .then(response => (ctx.commit('updateUserStats', response.data)))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        updateSiteStats(state, stats) {
            state.stats = stats;
        },
        updateUserStats(state, stats) {
            state.userStats = stats;
        }
    },
    state: {
        stats: Array,
        userStats: Array
    },
    getters: {
        lastSiteStats(state) {
            return state.stats;
        },
        lastUserStats(state) {
            return state.userStats;
        },
    },
};
