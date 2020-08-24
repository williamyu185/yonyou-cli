import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './zh-CN.js';
import tw from './zh-TW.js';
import en from './en-US.js';

Vue.use(VueI18n);

let language = '';
if(window.WEB_DIWORK_GLOBAL_CONFIG) {
    language = window.WEB_DIWORK_GLOBAL_CONFIG.lang ? (window.WEB_DIWORK_GLOBAL_CONFIG.lang).toLocaleLowerCase().replace('_', '-') : 'zh-cn';
}else {
    language = (window.navigator.userLanguage || window.navigator.language).toLocaleLowerCase();
}
let i18nLocalLanguage = 'zh';
let currentLocale = zh;
// 英文:en-US  中文/中文简体:zh-CN   繁体:zh-TW
if (language.indexOf('en') >= 0) {
    language = 'en';
    i18nLocalLanguage = 'en';
    currentLocale = en;
} else if (language == 'zh-tw') {
    language = 'zh-tw';
    i18nLocalLanguage = 'tw';
    currentLocale = tw;
} else {
    language = 'zh-cn';
    i18nLocalLanguage = 'zh';
    currentLocale = zh;
}
window.globalCurrentBrowserLanguage = i18nLocalLanguage;

const i18n = new VueI18n({
    locale: i18nLocalLanguage,
    messages: {
        zh,
        tw,
        en,
    }
});
export default {
    i18n,
    locale: currentLocale,
    YYZoneLocale
};