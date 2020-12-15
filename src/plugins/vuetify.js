import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#ff0000',
                accent: '#ff0000',
                secondary: '#ff0000',
                success: '#ff0000',
                info: '#ff0000',
                warning: '#ff0000',
                error: '#ff0000'
            }
        }
    },
});
