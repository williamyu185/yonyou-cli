import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zh from './zh-CN.js';
import tw from './zh-HK.js';
import en from './en-US.js';
import enLocale from 'element-ui/lib/locale/lang/en';
import cnLocale from 'element-ui/lib/locale/lang/zh-CN';
import twLocale from 'element-ui/lib/locale/lang/zh-TW';

Vue.use(VueI18n);

let language = '';
if(window.WEB_DIWORK_GLOBAL_CONFIG) {
    language = window.WEB_DIWORK_GLOBAL_CONFIG.lang ? (window.WEB_DIWORK_GLOBAL_CONFIG.lang).toLocaleLowerCase().replace('_', '-') : 'zh-cn';
}else {
    language = (window.navigator.userLanguage || window.navigator.language).toLocaleLowerCase();
}
let i18nLocalLanguage = 'zh';
let currentLocale = cnLocale;
let YYZoneLocale = 'zhs';

if (language.indexOf('en') >= 0) {
    language = 'en';
    i18nLocalLanguage = 'en';
    currentLocale = enLocale;
    YYZoneLocale = 'en';
} else if (language == 'zh-tw') {
    language = 'zh-tw';
    i18nLocalLanguage = 'tw';
    currentLocale = twLocale;
    YYZoneLocale = 'zht';
} else {
    language = 'zh-cn';
    i18nLocalLanguage = 'zh';
    currentLocale = cnLocale;
    YYZoneLocale = 'zhs';
}
window.WEB_DIWORK_GLOBAL_CONFIG_APPROVE_LANG = i18nLocalLanguage;

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