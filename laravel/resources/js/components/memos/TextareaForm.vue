<script setup lang="ts">
    const model = defineModel<string>()
</script>

<template>
    <textarea v-model="model" class="input-box-border"
              placeholder="メモを入力してください&#10;(Enterで保存、Shift+Enterで改行)">
    </textarea>
</template>

<style scoped>
.input-box-border{
    border-radius: 16px;
    border-color: rgba(0, 0, 0, 0.1);
    border-width: 2px;
    border-style: solid;
    width: 90%;
    height: 200px;
    padding: 15px;
    outline: none;
}
.input-box-border:focus {
    border-color: darkcyan;
}
</style>
