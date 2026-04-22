import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import MemoPage from '@/pages/MemoPage.vue';
import WelcomePage from '@/pages/WelcomePage.vue'

const myAppRoutes = [
    {
        path: '/',
        name: 'memo',
        component: MemoPage
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: WelcomePage
    },
];
const router = createRouter({
  history: createWebHistory(),
  routes: myAppRoutes,
});

export default router;
