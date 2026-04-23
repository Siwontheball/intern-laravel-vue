<script setup lang="ts">
import MemoIndexTitle from "@/components/memos/MemoIndexTitle.vue";
import MemoForm from "@/components/memos/MemoForm.vue";
import MemoIndex from "@/components/memos/MemoIndex.vue"
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface Memo {
    id:number;
    memo:string;
    created_at: string;
};
const memoList = ref<Memo[]>([]);

const handleSave = async(content: string) => {
    const response = await axios.post('/api/memo', { content });
    memoList.value.push(response.data);
    alert('保存完了');
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
        <MemoForm @saveNewMemo="handleSave" />
        <div class=indexTitle>
            <MemoIndexTitle />
            <p class="badge">{{ totalMemo }}件</p>
        </div>
        <MemoIndex :memos="memoList" @remove="handleRemove"/>
        <p class="bottom-text">💡Enterキーで素早く保存できます</p>
    </div>
</template>

<style scoped>
.indexTitle{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 3%;
}
.overview{
    display: flex;
    flex-direction: column;
    width: 70%;
    margin: 0 auto;
}
.bottom-text{
    font-size: 15px;
    color: gray;
    opacity: 80%;
    margin-top: 3%;
    margin-bottom: 3%;
    text-align: center;
}
.badge{
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    padding: 10px;
}
</style>
