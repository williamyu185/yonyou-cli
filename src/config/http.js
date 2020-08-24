import axios from 'axios';
import configHost from './config.js';

axios.defaults.timeout = 2*60*1000;
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  config => {
    let url = config.url,
      apiHost = configHost.apiHost || '';
    if (!/[http|https]:\/\//gi.test(url)) {
      config.url = apiHost + url;
    }
    if(config.url.indexOf('?') != -1) {
        config.url += ('&lang=' + window.WEB_DIWORK_GLOBAL_CONFIG_APPROVE_LANG);
    }else {
        config.url += ('?lang=' + window.WEB_DIWORK_GLOBAL_CONFIG_APPROVE_LANG);
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
