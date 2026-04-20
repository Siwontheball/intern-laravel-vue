<script setup lang="ts">
import ListTitle from "@/components/ListTitle.vue";
import MemoForm from "@/components/MemoForm.vue";
import tempCardList from "@/components/tempCardsList.vue"
import { ref, computed } from 'vue';
let id = 0

const newMemo = ref("");
const memoList = ref([
    { id: id++, text: 'Vue.jsの基本構文を復習する', date: "2024-07-30 10:30" },
    { id: id++, text: 'Laravelのルーティングについて調べる', date: "2024-07-30 09:15" },
    { id: id++, text: '明日のプレゼン資料を準備する', date: "2024-07-29 16:45" },
]);
const handleAddMemo = (newText: string) => {
    memoList.value.push(
        {id: id ++, text:newText}
    );
};
const totalMemo = computed(()=> memoList.value.length);

const handleRemove = (targetId: number) => {
    memoList.value = memoList.value.filter(memo => memo.id !== targetId);
};
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
