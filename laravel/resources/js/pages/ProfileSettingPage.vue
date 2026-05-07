<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useUserStore from "@/store/user";
import axiosClient from "@/axios";

const userStore = useUserStore();
const form = ref({
    name: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: ''
});

const errors = ref<any>({});
const message = ref('');

// 初期値のセット
onMounted(() => {
    if (userStore.user) {
        form.value.name = userStore.user.name;
        form.value.email = userStore.user.email;
    }
});

async function updateProfile() {
    errors.value = {};
    message.value = '';

    try {
        const response = await axiosClient.put('/api/profile', form.value);
        // Storeのユーザー情報を更新
        userStore.setUser(response.data.user);
        message.value = "プロフィールを更新しました。";
        // パスワード欄をクリア
        form.value.current_password = '';
        form.value.password = '';
        form.value.password_confirmation = '';
    } catch (error: any) {
        if (error.response && error.response.status === 422) {
            errors.value = error.response.data.errors;
        }
    }
}
</script>

<template>
    <!-- py-10 を少し詰めて py-6 に調整 -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div class="max-w-3xl mx-auto bg-white/40 p-8 rounded-xl shadow-sm backdrop-blur-sm">
            <!-- フォーム全体を薄い白背景で囲むと、より見やすくなります -->

            <form @submit.prevent="updateProfile">
                <div class="space-y-8">
                    <div class="border-b border-gray-900/10 pb-6">
                        <h2 class="text-xl font-bold text-gray-900">プロフィール編集</h2>
                        <p class="mt-1 text-sm text-gray-600">ログイン情報と氏名をここで編集できます。</p>

                        <!-- メッセージの色を成功時(緑)に見やすく修正 -->
                        <div v-if="message" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm border border-green-200">
                            {{ message }}
                        </div>

                        <!-- 間隔を mt-10 から mt-6 に詰める -->
                        <div class="mt-6 grid grid-cols-1 gap-y-5 sm:grid-cols-6">

                            <!-- 氏名 -->
                            <div class="sm:col-span-4">
                                <label for="name" class="block text-sm font-semibold text-gray-700">氏名</label>
                                <div class="mt-1">
                                    <!--
                                      bg-white (しっかり白)
                                      ring-gray-300 (薄いグレーの枠線)
                                      text-gray-900 (文字色を黒に)
                                    -->
                                    <input v-model="form.name" id="name" type="text"
                                           class="block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                                    <p v-if="errors.name" class="text-red-600 text-xs mt-1">{{ errors.name[0] }}</p>
                                </div>
                            </div>

                            <!-- メールアドレス -->
                            <div class="sm:col-span-4">
                                <label for="email" class="block text-sm font-semibold text-gray-700">メールアドレス</label>
                                <div class="mt-1">
                                    <input v-model="form.email" id="email" type="email"
                                           class="block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                                    <p v-if="errors.email" class="text-red-600 text-xs mt-1">{{ errors.email[0] }}</p>
                                </div>
                            </div>

                            <div class="sm:col-span-6 border-t border-gray-200 pt-4 mt-2">
                                <p class="text-sm font-bold text-gray-900">パスワード変更</p>
                                <p class="text-xs text-gray-500">変更しない場合は空欄のままにしてください。</p>
                            </div>

                            <!-- 現在のパスワード -->
                            <div class="sm:col-span-4">
                                <label for="current_password" class="block text-sm font-semibold text-gray-700">現在のパスワード</label>
                                <div class="mt-1">
                                    <input v-model="form.current_password" id="current_password" type="password"
                                           class="block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                                    <p v-if="errors.current_password" class="text-red-600 text-xs mt-1">{{ errors.current_password[0] }}</p>
                                </div>
                            </div>

                            <!-- 新しいパスワード -->
                            <div class="sm:col-span-4">
                                <label for="password" class="block text-sm font-semibold text-gray-700">新しいパスワード</label>
                                <div class="mt-1">
                                    <input v-model="form.password" id="password" type="password"
                                           class="block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                                    <p v-if="errors.password" class="text-red-600 text-xs mt-1">{{ errors.password[0] }}</p>
                                </div>
                            </div>

                            <!-- 確認用 -->
                            <div class="sm:col-span-4">
                                <label for="password_confirmation" class="block text-sm font-semibold text-gray-700">新しいパスワード（確認）</label>
                                <div class="mt-1">
                                    <input v-model="form.password_confirmation" id="password_confirmation" type="password"
                                           class="block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- ボタンの上の余白を mt-10 から mt-6 に短縮 -->
                <div class="mt-6 flex items-center justify-end">
                    <button type="submit" class="rounded-md bg-orange-400 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-indigo-600 transition">
                        設定を保存する
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>

</style>
