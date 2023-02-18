<template>
<div role="navigation" class="pag_container">
    <div class="pag-left" @click="prevPage"></div>
    <div class="pag-pages">{{currentPage}}/{{maxPage}}</div>
    <div class="pag-right" @click="nextPage"></div>
</div>
</template>

<script>
import store from '@/store.js';

export default {
    methods: {
        prevPage() {
            store.commit('changePage', store.state.currentPage-1);
            store.commit('get');
        },
        nextPage() {
            store.commit('changePage', store.state.currentPage+1);
            store.commit('get');
        }
    },
    computed: {
        currentPage () {
            return store.state.currentPage;
        },
        maxPage () {
            return store.state.maxPage;
        }
    }
}
</script>

<style scoped>
.pag_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.pag_container > :not(:last-child) {
    margin-right: 11px;
}
.pag-left {
    background: url('@/images/arrow-left.svg');
    width: 44px;
    height: 42px;
}
.pag-right {
    background: url('@/images/arrow-right.svg');
    width: 44px;
    height: 42px;
}
.pag-pages {
    width: 44px;
    height: 42px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1rem;
}
</style>