<script setup lang="ts">
import Header from "./components/Header.vue"
import MemoForm from "./components/MemoForm.vue"
</script>

<template>
    <div class="app-background">
      <Header />
      <MemoForm />
    </div>
</template>

<style>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
}
.app-background{
    background-color: rgb(232, 207, 159, 0.6);
    min-height: 100vh;
    width: 100%;
}
</style>
