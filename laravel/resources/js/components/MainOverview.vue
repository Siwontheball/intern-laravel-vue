<script setup lang="ts">
import ListTitle from "@/components/ListTitle.vue";
import MemoForm from "@/components/MemoForm.vue";
import tempCardList from "@/components/tempCardsList.vue"
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface Memo {
    id:number;
    memo:string;
    created_at: string;
};
const memoList = ref<Memo[]>([]);
const handleAddMemo = (savedObject: Memo) => {
    memoList.value.push(savedObject);
};
const fetchMemos = async() =>{
    const response = await axios.get('/api/memo');
    memoList.value = response.data;
};
const totalMemo = computed(()=> memoList.value.length);

const handleRemove = async (targetId: number) => {
    await axios.delete(`/api/memo/${targetId}`);
    memoList.value = memoList.value.filter(memo => memo.id !== targetId);
};
onMounted(() => {
    fetchMemos();
});
</script>

<template>
    <div class="overview">
        <MemoForm @seeNewMemo="handleAddMemo" />
        <div class=listTitle>
            <ListTitle />
            <p class="badge">{{ totalMemo }}件</p>
        </div>
        <tempCardList :memos="memoList" @remove="handleRemove"/>
        <p class="bottom-text">💡Enterキーで素早く保存できます</p>
    </div>
</template>

<style scoped>
.listTitle{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 3%;
}
.overview{
    display: flex;
    flex-direction: column;
    width: 70%;
    align-items: center;
    margin: 0 auto;
}
.bottom-text{
    font-size: 15px;
    color: gray;
    opacity: 80%;
    margin-top: 3%;
    margin-bottom: 3%;
}
.badge{
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 10px;
}
</style>
