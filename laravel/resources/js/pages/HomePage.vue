<script setup lang="ts">
import myAppImage from '@/assets/my-app.jpg';
</script>

<template>
    <div class="bg-white">
        <div class="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
            <div class="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                <svg viewBox="0 0 1024 1024" class="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                    <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                            <stop stop-color="#7775D6" />
                            <stop offset="1" stop-color="#E935C1" />
                        </radialGradient>
                    </defs>
                </svg>
                <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                    <h2 class="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">忘れる前に一言残す。</h2>
                    <p class="mt-6 text-lg/8 text-pretty text-gray-300">あなたの記憶の拡張として、一生使い続けられるメモアプリ。</p>
                    <div class="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <RouterLink :to="{ name: 'Memos' }" class="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"> 今すぐ思考を整理する</RouterLink>
                    </div>
                </div>
                <div class="relative mt-16 flex items-center justify-center lg:mt-0 lg:flex-1">
                    <img class="w-full max-w-md rounded-xl shadow-lg ring-1 ring-white/10" :src="myAppImage" alt="App screenshot" width="1824" height="1080" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
