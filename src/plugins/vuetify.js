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

                'edit-status-new-color': colors.red,
                'edit-status-declined-color': colors.red,
                'edit-status-accepted-color': colors.red,
                'edit-status-autoaccepted-color': colors.red,
                'edit-status-reverted-color': colors.red,
                'edit-status-approve-new-color': colors.red,
                'edit-status-approve-declined-color': colors.red,
                'edit-status-approve-accepted-color': colors.red,
                'edit-status-approve-autoaccepted-color': colors.red,
                'edit-status-approve-reverted-color': colors.red,

                'edit-new-color': colors.red,
                'edit-removed-color': colors.red,

                'edit-status-type-new-color': colors.red,
                'edit-status-type-edit-color': colors.red,
                'edit-status-type-delete-color': colors.red,

                'edit-separator-color': colors.red,

                'inline-tag-tags-color': colors.red,
                'inline-tag-shorttagfld-color': colors.red,
                'inline-tag-shorttaginf-color': colors.red,

                'jap-entry-view-lang-sep-color': colors.red,
                'jap-entry-view-example-color': colors.red,
                'jap-entry-view-example-border-color': colors.red,
                'jap-entry-view-lang-color': colors.red,
                'jap-entry-view-pos-list-color': colors.red,
                'jap-entry-view-entry-text-md-color': colors.red,

                'menu-click-here': colors.red,
                'menu-discord-wrapper': colors.red,

                'edit-list-type-color': colors.red,

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
