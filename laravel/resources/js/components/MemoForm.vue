<script setup lang="ts">
import Title from './memos/Title.vue';
import SaveButton from './memos/SaveButton.vue';
import TextareaForm from './memos/TextareaForm.vue';
import { ref, computed } from "vue";

const text = ref('');
const isDisabled = computed(() => {
    return text.value.length === 0;
});


</script>

<template>
    <div class = "card">
        <Title />
        <TextareaForm v-model="text"/>
        <SaveButton :isButtonDisabled="isDisabled" />
    </div>
</template>

<style scoped>
.card{
    width:70%;
    height:400px;
    border-radius: 16px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 30px auto;
    align-items: center;
    gap: 30px;
}
</style>
