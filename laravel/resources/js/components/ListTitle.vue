<script setup lang="ts">

import DocumentSvg from "@/components/svgs/DocumentSvg.vue";
</script>

<template>
    <div class="list-title-group">
        <DocumentSvg class="list-title-icon" />
        <p class="list-title-text">保存されたメモ</p>
    </div>
</template>

<style scoped>
.list-title-group{
    display: flex;
    gap: 12px;
}
.list-title-icon{
    width: 28px;
    height: 28px;
}
.list-title-text{
    font-size: 20px;
}
</style>
