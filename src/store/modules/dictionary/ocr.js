// import Vue from 'vue';
const axios = require('axios');

export default {
    actions: {
        async getBooksList(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'ocr', { withCredentials: true })
                .then(response => (ctx.commit('updateBooksList', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getPagesList(ctx, id) {
            axios
                .get(process.env.VUE_APP_API + `ocr/books/${id}`, { withCredentials: true })
                .then(response => (ctx.commit('updatePagesList', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getPage(ctx, { bookid, pageid }) {
            axios
                .get(process.env.VUE_APP_API + `ocr/books/${bookid}/pages/${pageid}`, { withCredentials: true })
                .then(response => (ctx.commit('updatePage', response.data)))
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mutations: {
        updateBooksList(state, booksList) {
            state.booksList = booksList;
        },
        updatePagesList(state, pagesList) {
            state.pagesList = pagesList;
        },
        updatePage(state, page) {
            state.page = page;
        }
    },
    state: {
        booksList: [],
        pagesList: [],
        page: []
    },
    getters: {
        booksList(state) {
            return state.booksList;
        },
        pagesList(state) {
            return state.pagesList;
        },
        page(state) {
            return state.page;
        }
    },
};
