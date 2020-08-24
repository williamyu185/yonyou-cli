import supervise from './supervise';
import createLogger from 'vuex/dist/logger';

let store = {
        modules: {
            supervise
        },
        plugins: (__ENV__ == 'development' ? [createLogger()] : [])
};

export default store;