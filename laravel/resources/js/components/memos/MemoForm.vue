<script setup lang="ts">
import InputTitle from './parts/InputTitle.vue';
import SaveButton from './parts/SaveButton.vue';
import InputTextarea from './parts/InputTextarea.vue';
import { ref, computed, onMounted, watch } from "vue";
import { debounce } from 'lodash-es';
import useUserStore from "@/store/user";

const userStore = useUserStore();
const text = ref('');
const storageKey = computed(() => `memo_draft_${userStore.user?.id ?? 'guest'}`);

onMounted(() => {
    const savedData = localStorage.getItem(storageKey.value);
    if (savedData) {
        text.value = savedData;
    }
});
const updateLocalStorage = debounce((value: string) => {
    localStorage.setItem(storageKey.value, value);
}, 500);

watch(text, (newVal) => {
    updateLocalStorage(newVal);
});

const isDisabled = computed(() => {
    return text.value.trim().length === 0;
});
const emit = defineEmits(['saveNewMemo'])
const requestSave = () => {
    if (isDisabled.value) {
        return;
    }

    emit('saveNewMemo', text.value);
    text.value = '';
    localStorage.removeItem(storageKey.value);
    updateLocalStorage.cancel();
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
