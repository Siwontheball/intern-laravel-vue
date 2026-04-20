<script setup lang="ts">
import { ref} from 'vue';
import TrashSvg from '@/components/svgs/TrashSvg.vue';

const props = defineProps({
    memos: Array
});
const emit = defineEmits(["remove"]);
function requestRemove(id: number){
    emit('remove', id);
};
</script>

<template>
    <ul>
        <li v-for="memo in memos" :key="memo.id" class="list-card">
            {{ memo.text }}
            <button @click="requestRemove(memo.id)" class="trash-box"><TrashSvg /></button>
            <br>
            <p>{{ memo.date }}</p>
        </li>
    </ul>
</template>

<style scoped>
.list-card{
    background-color: white;
    border-radius: 12px;
    margin-top: 30px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 5%;
}
.trash-box{
    opacity: 0%;
}
.trash-box:hover{
    opacity: 70%;
}
</style>
