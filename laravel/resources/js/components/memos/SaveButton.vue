<script setup lang="ts">
const props = defineProps({
    isButtonDisabled: Boolean
})

</script>

<template>
    <button :disabled="isButtonDisabled"
            class="save-button"
            :class="{'disabled-button': isButtonDisabled, 'enabled-button': !isButtonDisabled}">
        ＋　メモを保存
    </button>
</template>

<style scoped>
.save-button{
    color: white;
    border: none;
    border-radius: 10px;
    padding: 12px;
    font-weight: bold;
    width: 90%;
}
.enabled-button{
    background-color: chocolate;
}
.disabled-button{
    background-color: gray;
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
