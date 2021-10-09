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
        async getUserProfile(ctx, username) {
            axios
                .get(process.env.VUE_APP_API + 'users/get/' + username)
                .then(response => (ctx.commit('updateUserProfile', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async updateUserRights(ctx, {userId, accessId}) {
            axios
                .post(process.env.VUE_APP_API + `users/change-rights?userId=${userId}&type=${accessId}`, {})
                .then(response => (ctx.commit('updateUserProfile', response.data)))
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
        updateUserProfile(state, userProfile) {
            state.userProfile = userProfile;
        },
        clearCurrentUser(state) {
            state.currentUser = {};
        },
        updateDarkMode(state, isDarkMode) {
            state.darkMode = isDarkMode;
        },
        updateCurrentDownloads(state, dls) {
            state.downloads = dls;
        }
    },
    state: {
        currentUser: [],
        darkMode: false,
        userProfile: Object,
        downloads: []
    },
    getters: {
        currentDownloads(state) {
            return state.downloads;
        },
        darkModeState(state) {
            return state.darkMode;
        },
        userProfile(state) {
            return state.userProfile;
        },
        currentUser(state) {
            return state.currentUser;
        },
        selectedUserRights(state) {
            const rights = state.userProfile.access.toString(2).padStart(20,"0");
            return rights;
        },
        userHasRights: state => (rightsId) => {
            if (state.currentUser.role === 'Admin') return true;
            if(typeof(state.currentUser.access) != "undefined" && state.currentUser.access !== null) {
                const rights = state.currentUser.access.toString(2).padStart(20,"0")
                return rights[rightsId] === '1';
            }
            return false;
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
