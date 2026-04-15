<script setup lang="ts">
defineProps<{
    disabled: boolean
}>()
</script>

<template>
    <button :disabled="disabled"
            class="save-button"
            :class="{'disabled-button': disabled}">
        ＋　メモを保存
    </button>
</template>

<style scoped>
.save-button{
    background-color: chocolate;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px;
    font-weight: bold;
    width: 90%;
}

.save-button.disabled-button{
    background-color: gray;
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
