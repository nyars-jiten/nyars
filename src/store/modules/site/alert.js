export default {
    actions: {
        newAlert(ctx, {msg,type}) {
            ctx.commit('setAlert', {msg,type});
        }
    },
    mutations: {
        setAlert(state, {msg,type}) {
            let time = Date.now() / 1000;
            state.alerts.push({ msg, type, time });
        },
    },
    state: {
        alerts: [],
    },
    getters: {
        activeAlerts(state) {
            return state.alerts
        }
    },
}
