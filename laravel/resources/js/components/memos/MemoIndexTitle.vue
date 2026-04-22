<script setup lang="ts">

import DocumentSvg from "@/components/svgs/DocumentSvg.vue";
</script>

<template>
    <div class="index-title-group">
        <DocumentSvg class="index-title-icon" />
        <p class="index-title-text">保存されたメモ</p>
    </div>
</template>

<style scoped>
.index-title-group{
    display: flex;
    gap: 12px;
}
.index-title-icon{
    width: 28px;
    height: 28px;
}
.index-title-text{
    font-size: 20px;
}
</style>
