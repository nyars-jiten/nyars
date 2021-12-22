const axios = require('axios');
import Vue from 'vue';
import { sendPostRequest } from '@/core/apiRequests.js';

export default {
    actions: {
        async startSearch(ctx, { request, page, subSearch }) {
            ctx.commit('updateLoadingState', true);
            ctx.commit('updateSearchState', {});
            if (!subSearch)  {
                ctx.commit('updateParserState', []);
                ctx.commit('updateCurrentSearchRequest', request);
            }
            const encodedreq = request.replace('#', '%23');
            axios
                .get(process.env.VUE_APP_API + 'search/jap?r=' +
                encodedreq +
                '&p=' + (page - 1) +
                '&exact=' + ctx.state.exactSearch)
                .then(response => {
                    ctx.commit('updateSearchState', response.data);
                    if (!subSearch)
                        ctx.commit('updateParserState', response.data.info);
                })
                .catch(error => {
                    console.log(error);
                })
                .then(() => {
                    ctx.commit('updateLoadingState', false);
                });
        },
        async startOCRSearch(ctx, { request }) {
            ctx.commit('updateLoadingState', true);
            ctx.commit('updateSearchState', {});
            const encodedreq = request.replace('#', '%23');
            axios
                .get(process.env.VUE_APP_API + 'search/jap?r=' +
                encodedreq +
                '&p=0' +
                '&exact=false&hasParser=false')
                .then(response => {
                    ctx.commit('updateSearchState', response.data);
                })
                .catch(error => {
                    console.log(error);
                })
                .then(() => {
                    ctx.commit('updateLoadingState', false);
                });
        },
        async startRandomSearch(ctx, paramsList) {
            ctx.commit('updateLoadingState', true);
            ctx.commit('updateRndSearchState', {});
            axios
                .post(process.env.VUE_APP_API + 'dictionary/jap/entry/random', paramsList)
                .then(response => (ctx.commit('updateRndSearchState', response.data)))
                .catch(error => {
                    console.log(error);
                })
                .then(() => {
                    ctx.commit('updateLoadingState', false);
                });
        },
        async startDublicatesSearch(ctx) {
            if (!ctx.state.currentEntry.entry) return;
            ctx.commit('updateLoadingState', true);
            ctx.commit('updateDublesSearchState', {});
            const currentEntry = { japEntry: ctx.state.currentEntry.entry };
            axios
                .post(process.env.VUE_APP_API + 'search/search-jap-doubles', currentEntry)
                .then(response => (ctx.commit('updateDublesSearchState', response.data)))
                .catch(error => {
                    console.log(error);
                })
                .then(() => {
                    ctx.commit('updateLoadingState', false);
                });
        },
        async getCurrentEntry(ctx, route) {
            ctx.commit('updateCurrentEntry', {});
            axios
                .get(process.env.VUE_APP_API + route)//'dictionary/jap/entries/' + wid
                .then(response => (ctx.commit('updateCurrentEntry', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getCurrentEditEntry(ctx, id) {
            // ctx.commit('updateCurrentEditEntry', {});
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/get-editdata/' + id)
                .then(response => {
                    ctx.commit('updateCurrentEditEntry', response.data);
                    // ctx.dispatch('startDublicatesSearch');
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async fetchTags(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/tags')
                .then(response => (ctx.commit('updateTags', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async fetchSubjects(ctx) {
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/subjects')
                .then(response => (ctx.commit('updateSubjects', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getCurrentSounds(ctx, wid) {
            ctx.commit('updateCurrentSounds', []);
            axios
                .get(process.env.VUE_APP_API + 'dictionary/jap/vcrequest/' + wid)
                .then(response => (ctx.commit('updateCurrentSounds', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getCurrentImages(ctx, wid) {
            ctx.commit('updateCurrentImages', []);
            axios
                .get(process.env.VUE_APP_API + 'kotoba/entry-images?dict=0&id=' + wid)
                .then(response => (ctx.commit('updateCurrentImages', response.data)))
                .catch(error => {
                    console.log(error);
                });
        },
        async getEntryText(ctx) {
            const resp = await sendPostRequest('dictionary/jap/serialize', ctx.state.currentEntry.entry);
            ctx.commit('updateTextEntry', resp.data.body);
        },
        async deserializeEntry(ctx) {
            const resp = await sendPostRequest('dictionary/jap/deserialize', { body: ctx.state.currentTextEntry });
            ctx.commit('serializeTextEntry', resp.data);
        },
        // async editExistingTag(ctx, tag) {
        //     const res = sendPostRequest(process.env.VUE_APP_API + 'dictionary/jap/tags/' + tag.id, tag);
        //     if (res) {
        //         this.$store.actions.newAlert("Тег отредактирован", "success");
        //     }
        // }
    },
    mutations: {
        updateCurrentSearchRequest(state, request) {
            state.searchRequest = request;
        },
        updateCurrentEditEntry(state, entry) {
            state.currentEntry = { entry: entry.result.japEntry };
            state.currentImages = entry.result.images;
            state.editComment = entry.result.comment ? entry.result.comment : "" ;
        },
        updateCurrentImages(state, images) {
            if (!images) state.currentImages = [];
            else state.currentImages = images;
        },
        updateEditComment(state, comment) {
            state.editComment = comment;
        },
        updateLoadingState(state, status) {
            state.searchLoading = status;
        },
        updateTextEntry(state, entry) {
            state.currentTextEntry = entry;
        },
        serializeTextEntry(state, entry) {
            state.currentEntry.entry = entry;
        },
        updateSearchState(state, searchResult) {
            state.searchResult = searchResult;
        },
        updateParserState(state, parsedGrammar) {
            state.parsedGrammar = parsedGrammar;
        },
        updateRndSearchState(state, searchResult) {
            state.searchRndResult = searchResult;
        },
        updateDublesSearchState(state, searchResult) {
            state.searchDblResult = searchResult;
        },
        updateCurrentEntry(state, currentEntry) {
            state.currentEntry = currentEntry;
        },
        updateExactSearchState(state, exactSearch) {
            state.exactSearch = exactSearch;
        },
        updateTags(state, tags) {
            state.tags = tags;
        },
        updateSubjects(state, subjects) {
            state.subjects = subjects;
        },
        updateCurrentSounds(state, currentSounds) {
            state.currentSounds = currentSounds;
        },
        addNewWord(state) {
            const emptyWord = { writings: [], readings: [] };
            state.currentEntry.entry.words.push(emptyWord);
        },
        updateEditorDialState(state, { dialog, index }) {
            Vue.set(state.dialogModel, dialog, true);
            Vue.set(state.dialogIndex, dialog, index);
            // console.log(dialog, index);
        },
        editorUpdateNote(state, { index, note }) {
            state.currentEntry.entry.meanings[index[0]].langMeanings[index[1]].note = note;
        },
        editorRemoveSense(state, { index }) {
            state.currentEntry.entry.meanings[index[0]].langMeanings[index[1]].senses.splice(index[2], 1);
        },
        editorRemoveWord(state, { index }) {
            state.currentEntry.entry.words.splice(index, 1);
        },
        editorRemovePosBlock(state, { index }) {
            state.currentEntry.entry.meanings.splice(index, 1);
        },
        editorRemoveLang(state, { posIndex, lmIndex }) {
            state.currentEntry.entry.meanings[posIndex].langMeanings.splice(lmIndex, 1);
        },
        editorAddSense(state, { posIndex, lmIndex }) {
            //tags value examples
            const emptySense = { tags: [], value: "новое значение", examples: [], references: [], loanSources: null };
            state.currentEntry.entry.meanings[posIndex].langMeanings[lmIndex].senses.push(emptySense);
        },
        editorAddLang(state, { lang, posIndex }) {
            const emptySense = { tags: [], value: "новое значение", examples: [], references: [], loanSources: null };
            const newLang = { lang, senses: [emptySense], note: "" };
            state.currentEntry.entry.meanings[posIndex].langMeanings.push(newLang);
        },
        editorAddPos(state) {
            const emptyPos = { pos: ['unc'], langMeanings: [] };
            state.currentEntry.entry.meanings.push(emptyPos);
        },
        resetDial(state) {
            state.dialogIndex = [-1, -1, -1, [-1, -1, -1], [-1, -1]];
            state.dialogModel = [false, false, false, false, false, false];
        }
    },
    state: {
        currentEntry: { type: Object, default: {} },
        currentTextEntry: String,
        currentSounds: Array,
        tags: Array,
        subjects: Array,
        // word, pos, lang, sense, note
        dialogIndex: [-1, -1, -1, [-1, -1, -1], [-1, -1]],
        dialogModel: [false, false, false, false, false, false],
        searchResult: Object,
        parsedGrammar: Object,
        searchRndResult: Object,
        searchDblResult: { type: Array, default: [] },
        searchLoading: false,
        searchRequest: String,
        currentImages: Array,
        editComment: "",
        exactSearch: Boolean,
        // currentEditEntry: Object
    },
    getters: {
        currentTextEntry(state) {
            return state.currentTextEntry;
        },
        currentRandomSearchResult(state) {
            return state.searchRndResult;
        },
        currentImages(state) {
            return state.currentImages;
        },
        currentEditComment(state) {
            return state.editComment;
        },
        currentDoublesSearchResult(state) {
            if (state.searchDblResult.length === undefined) return state.searchDblResult;
            return state.searchDblResult.filter(x => x.id != state.currentEntry.id);
        },
        currentSearchRequest(state) {
            return state.searchRequest;
        },
        currentSearchResult(state) {
            return state.searchResult;
        },
        currentParsedGrammar(state) {
            return state.parsedGrammar;
        },
        currentLoadingState(state) {
            return state.searchLoading;
        },
        currentEntry(state) {
            return state.currentEntry;
        },
        // currentEditEntry(state) {
        //     return state.currentEditEntry
        // },
        currentNote(state) {
            // if (typeof index === 'undefined') return "";
            // console.log(state.currentEntry.entry.meanings[index[0]].langMeanings[index[1]].note);
            const index = state.dialogIndex[5];
            if (!index || index[0] < 0) return "";
            return state.currentEntry.entry.meanings[index[0]].langMeanings[index[1]].note;
        },
        existingLangs: state => (index) => {
            if (typeof state.currentEntry.entry.meanings[index] === 'undefined') return [];
            return state.currentEntry.entry.meanings[index].langMeanings.map(lm => lm.lang);
        },
        dialogIndex: state => (dial) => {
            if (!state.dialogIndex) return false;
            return state.dialogIndex[dial];
        },
        dialogModel: state => (dial) => {
            if (!state.dialogModel) return false;
            return state.dialogModel[dial];
        },
        currentSounds(state) {
            return state.currentSounds;
        },
        getTags(state) {
            return state.tags;
        },
        getSubjectTags: state => (subject) => {
            if (state.tags.constructor.name != "Array" || !subject) return [];
            return state.tags.filter(tag => tag.category == subject);
        },
        getSubjects: state => (subject) => {
            if (state.subjects.constructor.name != "Array" || !subject) return [];
            return state.subjects.filter(tag => tag.tag.category == subject);
        },
        getTag: state => (tag, lang) => {
            let defaultRes = { short: tag, full: "—" };
            if (state.tags.constructor.name != "Array") return defaultRes;
            let fRes = state.tags.find((curTag) => curTag.engShort == tag);
            if (!fRes) return defaultRes;

            switch (lang) {
                case "eng":
                    defaultRes.short = fRes.engShort;
                    defaultRes.full = fRes.eng;
                    break;

                default:
                    defaultRes.short = fRes.rusShort;
                    defaultRes.full = fRes.rus;
                    break;
            }

            return defaultRes;
        },
    },
};
