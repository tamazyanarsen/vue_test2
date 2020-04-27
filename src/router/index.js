import Vue from 'vue'
import VueRouter from 'vue-router'
import Dialogs from '../views/Dialogs'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/all'
    },
    {
        path: '/:id',
        name: 'Dialogs',
        component: Dialogs,
        // component: () => import('../views/Dialogs')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
