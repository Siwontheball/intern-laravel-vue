<script setup lang="ts">
import TrashSvg from '@/components/svgs/TrashSvg.vue';
const props = defineProps({
    memos: Array
});
const emit = defineEmits(["remove"]);
function requestRemove(id: number){
    emit('remove', id);
};
const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hour12: false
    }).format(new Date(date)).replace(/\//g, '-');
};
</script>

<template>
    <ul>
        <li v-for="memo in memos" :key="memo.id" class="list-card">
            <div class="card-content">
                {{ memo.memo }}
                <p class="date-text">{{ formatDate(memo.created_at) }}</p>
            </div>
            <button @click="requestRemove(memo.id)" class="trash-box"><TrashSvg /></button>
        </li>
    </ul>
</template>

<style scoped>

.list-card{
    background-color: white;
    border-radius: 12px;
    margin-top: 30px;
    width: 100%;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
}
.card-content{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.date-text{
    font-size: 12px;
    color: #888;
}
.trash-box{
    opacity: 0%;
}
.list-card:hover .trash-box{
    opacity: 50%;
}
</style>
