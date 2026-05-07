import { createRouter, createWebHistory, type RouteRecordRaw} from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import MainLayout from '@/layouts/MainLayout.vue';
import MemoPage from "@/pages/MemoPage.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ProfileSettingPage from "@/pages/ProfileSettingPage.vue";
import useUserStore from "@/store/user";

const myAppRoutes: RouteRecordRaw[] = [
    //ログイン前 '/'に変える
    {
        path: '/auth',
        component: AuthLayout,
        meta: { guest: true },
        children: [
            {path: 'login', name:'Login', component:LoginPage},
            {path: 'signup', name:'Signup', component:SignupPage}
        ]
    },
    {
        //ログイン後
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            {path: '', name:'Home', component:HomePage},
            {path: 'memos', name:'Memos', component:MemoPage},
            {path: 'profile', name:'Profile', component:ProfileSettingPage}
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
    }
];
const router = createRouter({
  history: createWebHistory(),
  routes: myAppRoutes,
});
router.beforeEach(async (to) => {
    const userStore = useUserStore();

    if (!userStore.hasCheckedAuth) {
        await userStore.fetchUser();
    }

    if (to.meta.requiresAuth && !userStore.user) {
        return {
            name: 'Login',
            query: { redirect: to.fullPath },
        };
    }

    if (to.meta.guest && userStore.user) {
        return { name: 'Home' };
    }
});

export default router;
