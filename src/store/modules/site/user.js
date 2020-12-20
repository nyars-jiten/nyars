const axios = require('axios');

export default {
    actions: {
        async getCurrentUser(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'users/current', { withCredentials: true })
                .then(response => (ctx.commit('updateCurrentUser', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async logOut(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'users/signOut', { withCredentials: true })
                .then(() => (ctx.commit('clearCurrentUser')))
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
        }
    },
    state: {
        currentUser: [],
        darkMode: false,
    },
    getters: {
        darkModeState(state) {
            return state.darkMode
        },
        currentUser(state) {
            return state.currentUser;
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
