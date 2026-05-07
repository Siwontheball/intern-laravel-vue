<script setup lang="ts">
import AuthCard from "@/components/auth/AuthCard.vue";
import DocumentSvg from "@/assets/svgs/DocumentSvg.vue";
import { ref } from 'vue';
import axiosClient from "@/axios";
import router from "@/router";
import { RouterLink } from 'vue-router';
import useUserStore from "@/store/user";

const userStore = useUserStore();

const data = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const isSubmitting = ref(false);
const errorMessage = ref('');
const inputClasses = 'block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-[#f35434] sm:text-sm/6';

async function submit() {
    errorMessage.value = '';

    if (data.value.password !== data.value.password_confirmation) {
        errorMessage.value = "パスワードが一致しません";
        return;
    }

    isSubmitting.value = true;

    try {
        await axiosClient.get('/sanctum/csrf-cookie');
        const response = await axiosClient.post('/register', data.value);
        userStore.setUser(response.data.user);
        router.push({name: "Home"})
    } catch (error) {
        console.error('エラーが発生しました', error);
        errorMessage.value = '入力内容を確認してください。パスワードは8文字以上で入力してください。';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <AuthCard>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <DocumentSvg class="mx-auto h-10 w-auto" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-[#f35434]">新規登録</h2>
        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent = "submit" class="space-y-6" action="#" method="POST">
                <div>
                    <label for="氏名" class="block text-sm/6 font-medium text-black">氏名</label>
                    <div class="mt-2">
                        <input type="name"
                               name="name"
                               id="name"
                               autocomplete="name"
                               required=""
                               v-model="data.name"
                               :class="inputClasses"
                               placeholder="田中花子"/>
                    </div>
                </div>

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
                    </div>
                    <div class="mt-2">
                        <input type="password"
                               name="password"
                               id="password"
                               autocomplete="current-password"
                               required=""
                               minlength="8"
                               v-model="data.password"
                               :class="inputClasses"
                               placeholder="password123"/>
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-black">パスワード確認用</label>
                    </div>
                    <div class="mt-2">
                        <input type="password"
                               name="password_confirmation"
                               id="password_confirmation"
                               autocomplete="current-password"
                               required=""
                               minlength="8"
                               v-model="data.password_confirmation"
                               :class="inputClasses"
                               placeholder="password123"/>
                    </div>
                </div>

                <p v-if="errorMessage" class="text-sm font-medium text-red-600">{{ errorMessage }}</p>

                <div>
                    <button type="submit" :disabled="isSubmitting" class="flex w-full justify-center rounded-md bg-[#f35434] px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f35434]">新規登録</button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm/6 text-black">
                既にアカウントをお持ちですか？
                {{ ' ' }}
                <RouterLink :to="{ name: 'Login' }" class="font-semibold text-orange-400 hover:text-[#f35434]">ログインする</RouterLink>
            </p>
        </div>
    </AuthCard>
</template>

<style scoped>

</style>
