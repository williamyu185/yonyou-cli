import './asset/css/reset.css';
import Vue from 'vue';
import router from './router/index.js';
// 如需使用element-ui,请将下列几行代码取消注释
// import 'element-ui/packages/theme-chalk/lib/reset.css';
// import 'element-ui/packages/theme-chalk/lib/index.css';
// import ElementUI from 'element-ui';
import './asset/css/coordination-cli.less';
import entry from './view/index.vue';
import language from './asset/libs/languages/index.js';
import Vuex from 'vuex';
import localStore from './store/index.js';
import axios from './config/http.js';

Vue.prototype.$http = axios;
// 如需使用element-ui,请将下列几行代码取消注释
// Vue.use(ElementUI, {
//     locale: language.locale
// });
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
