import './asset/css/reset.css';
import Vue from 'vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import './asset/css/coordination-cli.less';
import 'element-ui/packages/theme-chalk/lib/reset.css';
import 'element-ui/packages/theme-chalk/lib/index.css';
import entry from './view/index.vue';
import language from './asset/libs/languages/index.js';
import Vuex from 'vuex';
import localStore from './store/index.js';
import axios from './config/http.js';

// 如需使用用友web端ui库yyzone进行开发,请将下列几行代码取消注释
// api地址:https://imoss.yonyoucloud.com/suite/cooperation/develop/yyzone/index.html#/home
// import 'yyzone/dist/styles/yyzone.min.css';
// import YYZone from 'yyzone/dist/yyzone.js';
// Vue.use(YYZone, {
//     locale: language.YYZoneLocale
// });

// 如需使用用友移动端ui库yy-mui进行开发,请将下列几行代码取消注释,默认命名空间为yymui,可自行更改
// api地址:https://www.yuque.com/gbzke1/vpzlvk/gu2dga
// import yyMui from 'yy-mui';
// import 'yy-mui/lib/yy-mui.css';
// Vue.use(yyMui, {
//     locale: language.YYMuiLocale,
//     prefix: 'yymui'
// });

Vue.prototype.$http = axios;
Vue.use(ElementUI, {
    locale: language.locale
});
Vue.use(Vuex);
let store = new Vuex.Store(localStore);
new Vue({
    el: '#app',
    router,
    i18n: language.i18n,
    store,
    render: function (h) {
        return h(entry)
    },
    data: {
        eventHub: new Vue()
    }
});
