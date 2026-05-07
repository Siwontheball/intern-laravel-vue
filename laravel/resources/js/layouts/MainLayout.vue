<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import DocumentSvg from "@/assets/svgs/DocumentSvg.vue";
import { computed } from 'vue';
import useUserStore from "@/store/user";
import axiosClient from "@/axios";
import { useRouter } from 'vue-router';
import iconImage from '@/assets/person.jpg';

const router = useRouter();
const userStore = useUserStore();
const user = computed(()=>userStore.user);

const navigation = [
    { name: '使い方ガイド', to: {name: 'Home'}},
    { name: 'メモを取る', to: {name: 'Memos'}},
]

function logout() {
    axiosClient.post('/logout')
        .then((response) => {
            userStore.clearUser();
            router.push('/auth/login')
        })
        .catch(error => {
            console.error("ログアウトに失敗しました", error);
        });
}

</script>

<template>
    <Disclosure as="nav" class="relative bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400
                    hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block size-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex shrink-0 items-center">
                        <DocumentSvg />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <RouterLink v-for="item in navigation"
                                        :key="item.name"
                                        :to="item.to"
                                        :class="[
                                   $route.name === item.to.name ? 'bg-gray-900 ' +
                                    'text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium']"
                                        :aria-current="$route.name === item.to.name ? 'page' : undefined">
                                {{ item.name }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                    <!-- Profile dropdown -->
                    <Menu as="div" class="relative ml-3">
                        <MenuButton class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            <span class="absolute -inset-1.5"></span>
                            <span class="sr-only">Open user menu</span>
                            <img class="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10" :src="iconImage" />
                        </MenuButton>

                        <transition enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform scale-100"
                                    leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5">
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        :to="{ name: 'Profile' }"
                                       :class="[active ? 'bg-gray-100 outline-hidden' : '',
                                       'block px-4 py-2 text-sm text-gray-700']">プロフィール編集</RouterLink>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <button @click="logout"
                                            :class="[active ? 'bg-gray-100 outline-hidden' : '',
                                            'block px-4 py-2 text-sm text-gray-700']">ログアウト</button>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton v-for="item in navigation"
                                  :key="item.name" as="template">
                    <RouterLink :to="item.to" :class="
                                  [$route.name === item.to.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                                :aria-current="$route.name === item.to.name ?
                                  'page' : undefined">{{ item.name }}</RouterLink>
                </DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>

    <main>
        <RouterView />
    </main>
</template>

<style scoped>

</style>
