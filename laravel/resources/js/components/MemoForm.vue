<script setup lang="ts">
import PlusSvg from "./svgs/PlusSvg.vue"
import Title from "./memos/Title.vue"
import TextareaForm from "./memos/TextareaForm.vue"
import SaveButton from "./memos/SaveButton.vue"
import {ref} from "vue";

const text = ref('')
</script>

<template>
    <div class = "card">
        <Title />
        <TextareaForm v-model="text" />
        <SaveButton :disabled="text.length == 0" />
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
