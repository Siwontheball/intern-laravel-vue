<script setup lang="ts">
import Title from './memos/Title.vue';
import SaveButton from './memos/SaveButton.vue';
import TextareaForm from './memos/TextareaForm.vue';
import { ref, computed } from "vue";
import axios from 'axios';

const text = ref('');
const isDisabled = computed(() => {
    return text.value.length === 0;
});


const postMemo = async () => {
    await axios({
        method: 'post',
        url: '/api/memo',
        data: { content: text.value }
    });
    text.value = '';
    alert('保存完了');

};

</script>

<template>
    <div class = "card">
        <Title />
        <form v-on:submit.prevent="postMemo" v-on:keyup.enter="postMemo" method="post">
            <TextareaForm v-model="text" name="content"/>
            <SaveButton :isButtonDisabled="isDisabled" />
        </form>
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
