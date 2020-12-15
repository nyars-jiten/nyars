import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        dark: false,
        themes: {
            light: {
                secondary: colors.grey.lighten4,

                'text-decoration-color': '#8f8f8f',

                'edit-status-new-color': '#1d90b3',
                'edit-status-declined-color': '#b31d1d',
                'edit-status-accepted-color': '#1db336',
                'edit-status-autoaccepted-color': '#b3b3b3',
                'edit-status-reverted-color': '#aa1db3',
                'edit-status-approve-new-color': '#1d90b3',
                'edit-status-approve-declined-color': '#b31d1d',
                'edit-status-approve-accepted-color': '#1db336',
                'edit-status-approve-autoaccepted-color': '#b3b3b3',
                'edit-status-approve-reverted-color': '#aa1db3',

                'edit-new-color': '#22b31d',
                'edit-removed-color': '#e22020',

                'edit-list-type-color': '#8f8f8f',

                'edit-status-type-new-color': '#1db336',
                'edit-status-type-edit-color': '#1d90b3',
                'edit-status-type-delete-color': '#b31d1d',

                'edit-separator-color': '#8f8f8f',

                'inline-tag-full-tags-color': '#797979',
                'inline-tag-shorttagfld-color': '#4f9a29',
                'inline-tag-shorttaginf-color': '#9c2292',

                'jap-entry-view-entry-text-md-color': colors.red,
                'jap-entry-view-lang-sep-color': colors.red,
                'jap-entry-view-example-color': colors.red,
                'jap-entry-view-example-border-color': colors.red,
                'jap-entry-view-lang-color': colors.red,
                'jap-entry-view-pos-list-color': colors.red,

                'menu-click-here': colors.red,
                'menu-discord-wrapper': colors.red,

                'jap-entry-edit-example-color': colors.red,
                'jap-entry-edit-example-border-color': colors.red,
                'jap-entry-edit-lang-color': colors.red,
                'jap-entry-edit-pos-color': colors.red,

                'search-result-item-entry-text-md-color': colors.red,
                'search-result-item-nonreviewed-color': colors.red,
                'search-result-item-example-color': colors.red,
                'search-result-item-example-border-color': colors.red,
                'search-result-item-lang-color': colors.red,
                'search-result-item-pos-list-color': colors.red,
            },
            dark: {
                // backgroundColor: colors.grey.darken4
            }
        }
    },
});
