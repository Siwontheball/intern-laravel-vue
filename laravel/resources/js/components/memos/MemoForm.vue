<script setup lang="ts">
import InputTitle from './parts/InputTitle.vue';
import SaveButton from './parts/SaveButton.vue';
import InputTextarea from './parts/InputTextarea.vue';
import { ref, computed } from "vue";
import axios from 'axios';

const text = ref('');
const isDisabled = computed(() => {
    return text.value.length === 0;
});
const emit = defineEmits(['saveNewMemo'])
const requestSave = () => {
    emit('saveNewMemo', text.value);
    text.value = '';
};

</script>

<template>
    <div class = "card">
        <InputTitle />
        <form v-on:submit.prevent="requestSave" class="inside-card">
            <InputTextarea @keydown.enter.prevent="requestSave" v-model="text" />
            <SaveButton :isButtonDisabled="isDisabled" />
        </form>
    </div>
</template>

<style scoped>
.card{
    border-radius: 16px;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.1);
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
