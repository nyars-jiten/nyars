const axios = require('axios');
axios.defaults.withCredentials = true;

export default {
    actions: {
        async getCurrentUser(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'users/current')
                .then(response => (ctx.commit('updateCurrentUser', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async logOut(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'users/signOut')
                .then(() => (ctx.commit('clearCurrentUser')))
                .catch(error => {
                    console.log(error);
                });
        },
        getDownloads(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'users/downloads')
                .then(response => (ctx.commit('updateCurrentDownloads', response.data)))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        updateCurrentUser(state, currentUser) {
            state.currentUser = currentUser;
        },
        clearCurrentUser(state) {
            state.currentUser = {};
        },
        changeDarkMode(state, mode) {
            state.darkMode = mode
        },
        updateCurrentDownloads(state, dls) {
            state.downloads = dls
        }
    },
    state: {
        currentUser: [],
        darkMode: false,
        downloads: []
    },
    getters: {
        currentDownloads(state) {
            return state.downloads;
        },
        darkModeState(state) {
            return state.darkMode;
        },
        currentUser(state) {
            return state.currentUser;
        },
        userHasRights: state => (rightsId) => {
            // if (state.currentUser.role === 'Admin') return true;
            const rights = state.currentUser.access.toString(2).padEnd(20,"0")
            return rights[rightsId] === '1';
        },
        userRoleId(state) {
            // if (!state.currentUser.role) return 0;
            switch (state.currentUser.role) {
                case 'User':
                    return 1;
                case 'Moderator':
                    return 2;
                case 'Admin':
                    return 3;
                default:
                    return 0;
            }
        }
    },
};
