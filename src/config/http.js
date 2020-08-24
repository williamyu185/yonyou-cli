import axios from 'axios';
import configHost from './config.js';
let globalENVObj = require('../asset/utils/globalENVObj.js');

let globalCurrentBrowserLanguage = globalENVObj.globalYonyouCliTopLevelObj.globalCurrentBrowserLanguage;
axios.defaults.timeout = 2*60*1000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use((config) => {
    let url = config.url;
    let apiHost = configHost.apiHost || '';
    if (!/[http|https]:\/\//gi.test(url)) {
      config.url = apiHost + url;
    }
    if(config.url.indexOf('?') != -1) {
        config.url += ('&lang=' + globalCurrentBrowserLanguage);
    }else {
        config.url += ('?lang=' + globalCurrentBrowserLanguage);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
