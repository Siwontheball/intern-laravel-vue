<script setup lang="ts">

import PlusSvg from "@/components/svgs/PlusSvg.vue";
</script>

<template>
    <div class="card-title">
        <PlusSvg class="card-title-icon" />
        <h3>新しいメモ</h3>
    </div>
</template>


<style scoped>
.card-title{
    margin-left: 5%;
    margin-top: 5%;
    display: flex;
    gap: 12px;
    font-size: 20px;
    align-self: flex-start;
}
.card-title-icon{
    width: 28px;
    height: 28px;
}
</style>
