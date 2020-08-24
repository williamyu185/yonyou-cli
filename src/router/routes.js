import index from '../components/index.vue';
import delay from '../components/supervise/delay.vue';
import stop from '../components/supervise/stop.vue';
import setting from '../components/supervise/setting.vue';
import registerList from '../components/supervise/registerList.vue';
import registerDetail from '../components/supervise/registerDetail.vue';
import handle from '../components/supervise/handle.vue';
import speedOfProgress from '../components/supervise/speedOfProgress.vue';
import urgeRecord from '../components/supervise/urgeRecord.vue';
import empower from '../components/supervise/empower.vue';
import iframeContainer from '../components/supervise/iframeContainer.vue';
import search from '../components/supervise/search.vue';

export default [
    {
        path: '/',
        redirect: {
            name: 'index'
        },
    },
    {
        name: 'index',
        path: '/index',
        component: index,
        redirect: {
            name: 'registerList'
        },
        children: [
            {
                name: 'registerList',
                path: 'registerList',
                component: registerList, 
            }, {
                name: 'setting',
                path: 'setting',
                component: setting,
            }, {   
                name: 'delay',
                path: 'delay',
                component: delay,
            }, {
                name: 'stop',
                path: 'stop',
                component: stop,
            }, {
                name: 'registerDetail',
                path: 'registerDetail',
                component: registerDetail,
                children: [
                    {
                        name: 'speedOfProgress',
                        path: 'speedOfProgress',
                        component: speedOfProgress, 
                    },
                    {
                        name: 'urgeRecord',
                        path: 'urgeRecord',
                        component: urgeRecord, 
                    },
                    {
                        name: 'empower',
                        path: 'empower',
                        component: empower, 
                    },
                    {
                        name: 'iframeContainer',
                        path: 'iframeContainer',
                        component: iframeContainer, 
                    }
                ]
            }, {
                name: 'handle',
                path: 'handle',
                component: handle,
            }, {
                name: 'search',
                path: 'search',
                component: search
            }
        ]
    }
];