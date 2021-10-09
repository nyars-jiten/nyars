import Vue from "vue";
import Vuetify from "vuetify/lib";

import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    dark: true,
    themes: {
      light: {
        secondary: colors.grey.lighten4,
        mainText: "#8f8f8f",

        anchor: "#8c9eff",
        textDecorationColor: "#8f8f8f",

        editStatusNewColor: "#1d90b3",
        editStatusDeclinedColor: "#b31d1d",
        editStatusAcceptedColor: "#1db336",
        editStatusAutoacceptedColor: "#b3b3b3",
        editStatusRevertedColor: "#aa1db3",
        editStatusApproveNewColor: "#1d90b3",
        editStatusApproveDeclinedColor: "#b31d1d",
        editStatusApproveAcceptedColor: "#1db336",
        editStatusApproveAutoacceptedColor: "#b3b3b3",
        editStatusApproveRevertedColor: "#aa1db3",

        editNewColor: "#22b31d",
        editRemovedColor: "#e22020",

        editListTypeColor: "#8f8f8f",

        editStatusTypeNewColor: "#1db336",
        editStatusTypeEditColor: "#1d90b3",
        editStatusTypeDeleteColor: "#b31d1d",

        editSeparatorColor: "#8f8f8f",

        inlineTagFullTagsColor: "#797979",
        inlineTagShorttagfldColor: "#4f9a29",
        inlineTagShorttaginfColor: "#9c2292",

        japEntryViewWordsHeaderColor: "#000",
        japEntryViewEntrySenseColor: "#000",
        japEntryViewLangSepColor: "#8f8f8f",
        japEntryViewExampleColor: "#797979",
        japEntryViewExampleBorderColor: "#b6b6b6",
        japEntryViewLangColor: "#3d4445",
        japEntryViewPosListColor: "#282d2e",

        menuLogoBack: "#ffffff",
        menuClickHere: "#2196f3",
        menuDiscordWrapper: "#8c9eff",

        japEntryEditExampleColor: "#797979",
        japEntryEditExampleBorderColor: "#b6b6b6",
        japEntryEditLangColor: "#3d4445",
        japEntryEditPosColor: "#282d2e",

        searchResultItemEntryTextMdColor: "#1976d2",
        searchResultItemNonreviewedColor: "#fb8c00",
        searchResultItemExampleColor: "#797979",
        searchResultItemExampleBorderColor: "#b6b6b6",
        searchResultItemLangColor: "#3d4445",
        searchResultItemPosListColor: "#282d2e",

        searchResultParserPrimary: "#000000",
        searchResultParserSecondary: "#797979",

        commonTagJlptN1: "#ea2a92",
        commonTagJlptN2: "#f99717",
        commonTagJlptN3: "#84bf26",
        commonTagJlptN4: "#459f94",
        commonTagJlptN5: "#3273bb",
        commonTagCommon: colors.grey,

        svgSecondary: "#ffffff",
        svgPrimary: "#000000"
      },
      dark: {
        secondary: colors.grey.darken3,
        mainText: "#FFFFFF",

        anchor: "#8c9eff",
        textDecorationColor: "#4b4b4b",
        
        editStatusNewColor: "#1d90ca",
        editStatusDeclinedColor: "#bf1d1d",
        editStatusAcceptedColor: "#1db006",
        editStatusAutoacceptedColor: "#b3b3b3",
        editStatusRevertedColor: "#aa1db3",
        editStatusApproveNewColor: "#1d90ca",
        editStatusApproveDeclinedColor: "#bf1d1d",
        editStatusApproveAcceptedColor: "#1db006",
        editStatusApproveAutoacceptedColor: "#b3b3b3",
        editStatusApproveRevertedColor: "#aa1db3",

        editNewColor: "#22b31d",
        editRemovedColor: "#e22020",

        editListTypeColor: "#8f8f8f",

        editStatusTypeNewColor: "#1db336",
        editStatusTypeEditColor: "#1d90b3",
        editStatusTypeDeleteColor: "#b31d1d",

        editSeparatorColor: "#4b4b4b",

        inlineTagFullTagsColor: "#797979",
        inlineTagShorttagfldColor: "#4f9a29",
        inlineTagShorttaginfColor: "#9c2292",

        japEntryViewWordsHeaderColor: "#fff",
        japEntryViewEntrySenseColor: "#f1f1f1",
        japEntryViewLangSepColor: "#8f8f8f",
        japEntryViewExampleColor: "#797979",
        japEntryViewExampleBorderColor: "#b6b6b6",
        japEntryViewLangColor: "#9c9c9c",
        japEntryViewPosListColor: "#282d2e",

        menuLogoBack: "#363636",
        menuClickHere: "#2196f3",
        menuDiscordWrapper: "#8c9eff",

        japEntryEditExampleColor: "#797979",
        japEntryEditExampleBorderColor: "#b6b6b6",
        japEntryEditLangColor: "#3d4445",
        japEntryEditPosColor: "#282d2e",

        searchResultItemEntryTextMdColor: "#1976d2",
        searchResultItemNonreviewedColor: "#fb8c00",
        searchResultItemExampleColor: "#797979",
        searchResultItemExampleBorderColor: "#b6b6b6",
        searchResultItemLangColor: "#686d6e",

        searchResultItemPosListColor: "#565959",

        searchResultParserPrimary: "#ffffff",
        searchResultParserSecondary: "#a7a7a7",

        commonTagJlptN1: "#ea2a92",
        commonTagJlptN2: "#f99717",
        commonTagJlptN3: "#84bf26",
        commonTagJlptN4: "#459f94",
        commonTagJlptN5: "#3273bb",
        commonTagCommon: colors.grey,

        svgSecondary: "#000000",
        svgPrimary: "#ffffff"
      }
    }
  }
});
