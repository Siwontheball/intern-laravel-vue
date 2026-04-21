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
const emit = defineEmits(['seeNewMemo'])
const postMemo = async () => {
    const response = await axios({
        method: 'post',
        url: '/api/memo',
        data: { content: text.value }
    });
    alert('保存完了');
    emit('seeNewMemo', response.data);
    text.value = '';
};

</script>

<template>
    <div class = "card">
        <Title />
        <form v-on:submit.prevent="postMemo" class="inside-card">
            <TextareaForm @keydown.enter.prevent="postMemo" v-model="text" />
            <SaveButton :isButtonDisabled="isDisabled" />
        </form>
    </div>
</template>

<style scoped>
.card{
    border-radius: 16px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    margin-top: 5%;
    height:400px;
    width: 100%;
}
.inside-card{
    display:flex;
    flex-direction: column;
    align-items: center;
}
</style>
