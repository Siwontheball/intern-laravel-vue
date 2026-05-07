<script setup lang="ts">

import PlusSvg from "@/assets/svgs/PlusSvg.vue";
</script>

<template>
    <div class="card-title">
        <PlusSvg class="card-title-icon" />
        <h3 class="card-title-text">新しいメモ</h3>
    </div>
</template>


<style scoped>
.card-title{
    display: flex;
    gap: 12px;
    margin-top: 3%;
    margin-left: 5%;
}
.card-title-icon{
    width: 28px;
    height: 28px;
}
.card-title-text{
    font-size: 20px;
}
</style>
