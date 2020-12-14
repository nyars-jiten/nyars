import Vue from 'vue'
import Vuex from 'vuex'
import edit from './modules/dictionary/edit'
import user from './modules/site/user'
import alert from './modules/site/alert'
import statistics from './modules/site/statistics'
import entry from './modules/dictionary/entry'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        edit,
        user,
        alert,
        entry,
        statistics
    }
})
