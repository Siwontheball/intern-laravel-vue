<script setup lang="ts">
import MemoIndexTitle from "@/components/memos/MemoIndexTitle.vue";
import MemoForm from "@/components/memos/MemoForm.vue";
import MemoIndex from "@/components/memos/MemoIndex.vue"
import { ref, computed, onMounted } from 'vue';
import axiosClient from "@/axios";

interface Memo {
    id:number;
    memo:string;
    created_at: string;
};

const currentPage = ref(1);
const perPage = 10;
const displayedMemos = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return memoList.value.slice(start, end);
});
const maxPage = computed(() => Math.ceil(memoList.value.length / perPage));
const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < maxPage.value) currentPage.value++; };

const memoList = ref<Memo[]>([]);

const handleSave = async(content: string) => {
    const response = await axiosClient.post('/api/memo', { content });
    memoList.value.unshift(response.data);
    currentPage.value = 1;
    alert('保存されました！');
};
const fetchMemos = async() =>{
    const response = await axiosClient.get('/api/memo');
    memoList.value = response.data;
};
const totalMemo = computed(()=> memoList.value.length);

const handleRemove = async (targetId: number) => {
    //wait axios.delete(`/api/memo/${targetId}`);
    await axiosClient.delete(`/api/memo/${targetId}`);
    memoList.value = memoList.value.filter(memo => memo.id !== targetId);

    if (displayedMemos.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
    }
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
        <MemoIndex :memos="displayedMemos" @remove="handleRemove"/>

        <div v-if="maxPage > 1" class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1" class="page-btn">＜</button>
            <span class="page-info">{{ currentPage }} / {{ maxPage }}</span>
            <button @click="nextPage" :disabled="currentPage === maxPage" class="page-btn">＞</button>
        </div>

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
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
}
.page-btn {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 5px 15px;
    cursor: pointer;
    transition: 0.2s;
}
.page-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
}
.page-btn:not(:disabled):hover {
    background-color: orange;
    color: white;
    border-color: darkorange;
}
.page-info {
    font-size: 14px;
    color: #666;
}
</style>
