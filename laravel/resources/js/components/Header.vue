<script setup lang="ts">
import { ref } from 'vue'
import DocumentSvg from "./svgs/DocumentSvg.vue"
const icon = ref(DocumentSvg)

</script>

<template>
    <header class="header-container">
        <h1 class="first">
            <icon class="title-icon" />
            <span><strong>かんたんメモ</strong></span>
        </h1>
        <p class="sec">思いついたことをサッと記録しよう</p>
    </header>
</template>

<style scoped>
.header-container{
    background-color: white;
    width: 100%;
    padding: 30px 0px;
}

.first{
    color: chocolate;
    font-size: 32px;
    justify-content: center;
    display: flex;
    gap: 12px;
}

.title-icon{
    width: 32px;
    height: 32px;
}

.sec{
    text-align: center;
    color: black;
    font-size: 15px;
}
</style>
