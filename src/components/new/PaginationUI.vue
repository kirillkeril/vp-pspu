<template>
<div v-if="this.type === 'goto'" role="navigation" class="pag_container">
    <div class="pag-pages" @click="e => {
        if(!isSettingPage) {
            isSettingPage = true;
        }
    }">
        <svg v-if="!isSettingPage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" height="48" width="48"><path d="M7.5 34q-.65 0-1.075-.425Q6 33.15 6 32.5q0-.65.425-1.075Q6.85 31 7.5 31q.65 0 1.075.425Q9 31.85 9 32.5q0 .65-.425 1.075Q8.15 34 7.5 34Zm0-8.5q-.65 0-1.075-.425Q6 24.65 6 24q0-.65.425-1.075Q6.85 22.5 7.5 22.5q.65 0 1.075.425Q9 23.35 9 24q0 .65-.425 1.075-.425.425-1.075.425Zm0-8.5q-.65 0-1.075-.425Q6 16.15 6 15.5q0-.65.425-1.075Q6.85 14 7.5 14q.65 0 1.075.425Q9 14.85 9 15.5q0 .65-.425 1.075Q8.15 17 7.5 17Zm7 17v-3H42v3Zm0-8.5v-3H42v3Zm0-8.5v-3H42v3Z"/></svg>
        <span v-if="isSettingPage">
            <input :value="currentPage" id="pag-input" @change.prevent="handlePagInput"/>/{{maxPage}}
        </span>
</div>
<!--    <div class="pag-left" @click="prevPage">-->
<!--        <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <rect width="43.0244" height="42" fill="white"/>-->
<!--            <path d="M11.9393 18.9393C11.3536 19.5251 11.3536 20.4749 11.9393 21.0607L21.4853 30.6066C22.0711 31.1924 23.0208 31.1924 23.6066 30.6066C24.1924 30.0208 24.1924 29.0711 23.6066 28.4853L15.1213 20L23.6066 11.5147C24.1924 10.9289 24.1924 9.97918 23.6066 9.3934C23.0208 8.80761 22.0711 8.80761 21.4853 9.3934L11.9393 18.9393ZM34 18.5L13 18.5L13 21.5L34 21.5L34 18.5Z" fill="black"/>-->
<!--        </svg>-->
<!--    </div>-->
<!--    <div class="pag-pages">-->
<!--        <span>-->
<!--            <input :value="currentPage" id="pag-input" @change.prevent="handlePagInput"/>/{{maxPage}}-->
<!--        </span>-->
<!--    </div>-->
<!--    <div class="pag-right" @click="nextPage">-->
<!--        <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <rect width="43.0244" height="42" fill="white"/>-->
<!--            <path d="M34.0607 22.0607C34.6464 21.4749 34.6464 20.5251 34.0607 19.9393L24.5147 10.3934C23.9289 9.80761 22.9792 9.80761 22.3934 10.3934C21.8076 10.9792 21.8076 11.9289 22.3934 12.5147L30.8787 21L22.3934 29.4853C21.8076 30.0711 21.8076 31.0208 22.3934 31.6066C22.9792 32.1924 23.9289 32.1924 24.5147 31.6066L34.0607 22.0607ZM12 22.5L33 22.5L33 19.5L12 19.5L12 22.5Z" fill="black"/>-->
<!--        </svg>-->
<!--    </div>-->
</div>

<div v-if="this.type === 'list'" role="navigation" class="pag_container">
    <div class="pages-group" v-for="pageGroup in this.getPagesList()" :key="pageGroup">
        <span
            v-for="page in pageGroup" :key="page"
            :class="'pag-pages' + (page === this.$store.state.currentPage ? ' current-page' : '')"
            @click.prevent="(e) => {
                setPage(page);
            }"
        >
            {{ page }}
        </span>
    </div>
</div>
</template>

<script>
import store from '@/store.js';
import {calcPages} from "@/services/services";

export default {
    data () {
        return {
            isSettingPage: false,
        }
    },
    props: {
        type: {required: true}
    },
    methods: {
        handlePagInput(e) {
            let page = e.target.value;
            this.isSettingPage = true;
            if(page <= store.state.maxPage && page !== 0) {
                this.setPage(page);
                this.isSettingPage = false;
            }
        },

        setPage(page) {
            store.commit('changePage', page);
            store.commit('get');
        },

        prevPage() {
            this.setPage(store.state.currentPage - 1);
        },
        nextPage() {
            this.setPage(store.state.currentPage + 1);
        },
        getPagesList() {
            const basePagesList = calcPages(store.state.maxPage);
            let firstGroup = [];
            let lastGroup = [];
            let aroundGroup = [];
            const GROUP_SIZE = 3;
            basePagesList.map(i => {
                if (i <= GROUP_SIZE) firstGroup.push(i);
                if (basePagesList.length - i < GROUP_SIZE) lastGroup.push(i);
                if (Math.abs(i - store.state.currentPage) <= Math.floor((GROUP_SIZE - 1) / 2) && !firstGroup.includes(i) && !lastGroup.includes(i)) {
                    aroundGroup.push(i);
                }
            });
            return [firstGroup, aroundGroup, lastGroup];
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
    justify-content: center;
    align-items: center;
}

.pag-pages svg path {
    fill: var(--colorMainWhite);
}
.pag-pages svg {
    width: 70%;
}
.pag-left, .pag-right {
    //background: url('@/images/arrow-left.svg');
    width: 44px;
    height: 42px;
}
.pag-left svg rect, .pag-right svg rect {
    fill: var(--colorMainGray);
}
.pag-left svg path, .pag-right svg path {
    fill: var(--colorMainWhite);
}

.pag-pages {
    width: 44px;
    height: 44px;
    background: var(--colorMainGray);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
}
.pag-pages.current-page {
    background: var(--colorMainBlue);
}
.pag-pages > span {
    display: flex;
    justify-content: center;
    align-items: baseline;
}
#pag-input {
    width: 1rem;
    border: none;
    background: transparent;
    transform: translate(-1%, -5%);
    text-align: center;
}
.pages-group {
    display: flex;
    flex-shrink: 0;
}
.pages-group:not(:last-child) {
    margin-right: 0.5rem;
}
</style>