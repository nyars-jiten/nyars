import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: { customProperties: true },
        dark: true,
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

                'jap-entry-view-entry-text-md-color': '#1976d2',
                'jap-entry-view-lang-sep-color': '#8f8f8f',
                'jap-entry-view-example-color': '#797979',
                'jap-entry-view-example-border-color': '#b6b6b6',
                'jap-entry-view-lang-color': '#3d4445',
                'jap-entry-view-pos-list-color': '#282d2e',

                'menu-click-here': '#2196f3',
                'menu-discord-wrapper': '#8c9eff',

                'jap-entry-edit-example-color': '#797979',
                'jap-entry-edit-example-border-color': '#b6b6b6',
                'jap-entry-edit-lang-color': '#3d4445',
                'jap-entry-edit-pos-color': '#282d2e',

                'search-result-item-entry-text-md-color': '#1976d2',
                'search-result-item-nonreviewed-color': '#fb8c00',
                'search-result-item-example-color': '#797979',
                'search-result-item-example-border-color': '#b6b6b6',
                'search-result-item-lang-color': '#3d4445',
                'search-result-item-pos-list-color': '#282d2e',
            },
            dark: {
                'text-decoration-color': '#4b4b4b',

                'edit-status-new-color': '#1d90ca',
                'edit-status-declined-color': '#bf1d1d',
                'edit-status-accepted-color': '#1db006',
                'edit-status-autoaccepted-color': '#b3b3b3',
                'edit-status-reverted-color': '#aa1db3',
                'edit-status-approve-new-color': '#1d90ca',
                'edit-status-approve-declined-color': '#bf1d1d',
                'edit-status-approve-accepted-color': '#1db006',
                'edit-status-approve-autoaccepted-color': '#b3b3b3',
                'edit-status-approve-reverted-color': '#aa1db3',

                'edit-new-color': '#22b31d',
                'edit-removed-color': '#e22020',

                'edit-list-type-color': '#8f8f8f',

                'edit-status-type-new-color': '#1db336',
                'edit-status-type-edit-color': '#1d90b3',
                'edit-status-type-delete-color': '#b31d1d',

                'edit-separator-color': '#4b4b4b',

                'inline-tag-full-tags-color': '#797979',
                'inline-tag-shorttagfld-color': '#4f9a29',
                'inline-tag-shorttaginf-color': '#9c2292',

                'jap-entry-view-entry-text-md-color': '#1976d2',
                'jap-entry-view-lang-sep-color': '#8f8f8f',
                'jap-entry-view-example-color': '#797979',
                'jap-entry-view-example-border-color': '#b6b6b6',
                'jap-entry-view-lang-color': '#3d4445',
                'jap-entry-view-pos-list-color': '#282d2e',

                'menu-click-here': '#2196f3',
                'menu-discord-wrapper': '#8c9eff',

                'jap-entry-edit-example-color': '#797979',
                'jap-entry-edit-example-border-color': '#b6b6b6',
                'jap-entry-edit-lang-color': '#3d4445',
                'jap-entry-edit-pos-color': '#282d2e',

                'search-result-item-entry-text-md-color': '#1976d2',
                'search-result-item-nonreviewed-color': '#fb8c00',
                'search-result-item-example-color': '#797979',
                'search-result-item-example-border-color': '#b6b6b6',
                'search-result-item-lang-color': '#3d4445',
                'search-result-item-pos-list-color': '#565959',
            }
        }
    },
});
