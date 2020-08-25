import './asset/css/reset.css';
import Vue from 'vue';
import axios from './config/http.js';
import router from './router/index.js';
import ElementUI from 'element-ui';
import './asset/css/flex.less';
import 'element-ui/packages/theme-chalk/lib/reset.css';
import 'element-ui/packages/theme-chalk/lib/index.css';
import entry from './view/index.vue';
import language from './asset/libs/languages/index.js';
import Vuex from 'vuex';
import localStore from './store/index.js';
// npm install --sava url-search-params
// import URLSearchParams from 'url-search-params';
// if(!window.URLSearchParams) {
//     window.URLSearchParams = URLSearchParams;
//     URLSearchParams.prototype.add = function(params) {
//         if (params instanceof Object) {
//             for (let key in params) {
//                 this.delete(key);
//                 this.append(key, params[key]);
//             }
//         }
//     };
// }
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
