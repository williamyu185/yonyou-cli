import coordination from './coordination';
import createLogger from 'vuex/dist/logger';

let store = {
        modules: {
            coordination
        },
        plugins: (__ENV__ == 'development' ? [createLogger()] : [])
};

export default store;