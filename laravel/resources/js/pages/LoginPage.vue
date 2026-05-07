<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";
import DocumentSvg from "@/assets/svgs/DocumentSvg.vue";
import {ref} from 'vue';
import router from "@/router";
import axiosClient from "@/axios";
import useUserStore from "@/store/user";

const userStore = useUserStore();

const data = ref({
    email: '',
    password: '',
});

const isSubmitting = ref(false);
const errorMessage = ref('');
const inputClasses = 'block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#f35434] sm:text-sm/6';

async function submit(){
    errorMessage.value = '';
    isSubmitting.value = true;

    try {
        await axiosClient.get('/sanctum/csrf-cookie');
        const response = await axiosClient.post('/login', data.value);
        userStore.setUser(response.data.user);
        const redirect = router.currentRoute.value.query.redirect;
        router.push(typeof redirect === 'string' ? redirect : { name: 'Home' });
    } catch (error) {
        console.error('ログインに失敗しました', error);
        errorMessage.value = 'メールアドレスまたはパスワードを確認してください。';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <AuthCard>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <DocumentSvg class="mx-auto h-10 w-auto" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#f35434]">ログイン</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submit" class="space-y-6" action="#" method="POST">

                <div>
                    <label for="email" class="block text-sm/6 font-medium text-black">メールアドレス</label>
                    <div class="mt-2">
                        <input type="email"
                               name="email"
                               id="email"
                               autocomplete="email"
                               required=""
                               v-model="data.email"
                               :class="inputClasses"
                               placeholder="you@example.com"/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-black">パスワード</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-orange-400 hover:text-[#f35434]">パスワードをお忘れですか？</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input type="password"
                               name="password"
                               id="password"
                               autocomplete="current-password"
                               required=""
                               v-model="data.password"
                               :class="inputClasses"
                               placeholder="password123"/>
                    </div>
                </div>

                <p v-if="errorMessage" class="text-sm font-medium text-red-600">{{ errorMessage }}</p>

                <div>
                    <button type="submit" :disabled="isSubmitting" class="flex w-full justify-center rounded-md bg-[#f35434] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f35434]">ログイン</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-black">
                アカウントが未登録ですか？
                {{ ' ' }}
                <RouterLink :to="{ name: 'Signup' }" class="font-semibold text-orange-400 hover:text-[#f35434]">アカウントを作成</RouterLink>
            </p>
        </div>
    </AuthCard>
</template>

<style scoped>

</style>
