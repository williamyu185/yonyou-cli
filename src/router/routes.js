import index from '../components/index.vue';

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
    }
];