<template>
    <!-- <BoxPage></BoxPage> -->
    <div class="header">
        <PaginationUI type="goto" />
        <div>
        </div>
        <div
            class="createNewBox"
            @click.prevent="(e) => {
                openCreatingBox();
            }"
        >
            <svg viewBox="0 0 48 48" class="addBoxIcon" height="48" width="48">
                <path d="M22.5 38V25.5H10v-3h12.5V10h3v12.5H38v3H25.5V38Z"/>
            </svg>
        </div>
    </div>
    <div class="main-title">
        <div class="line"></div>
        <h1>Коробки</h1>
    </div>
    <sort-selector/>

    <main v-if="boxes.length > 0">
        <BoxList :boxes="this.boxes"></BoxList>
    </main>
    <main v-else>
        <h2 style="margin-top: 5rem;">Ничего нет...</h2>
    </main>
    <PaginationUI type="list"/>
    <ModalScreen box-id="addBox" :visibility="isAddingBox" @close="closeCreatingBox">
        <div class="container row p-3">
            <h3>Добавить новую коробку?</h3>
            <div class="input-group mb-3">
                <select v-model="newBox.description" class="form-select" style="color: var(--colorMainGray)">
                    <option value="ВЕРХНЯЯ ОДЕЖДА ЖЕНСКАЯ">ВЕРХНЯЯ ОДЕЖДА ЖЕНСКАЯ</option>
                    <option value="ВЕРХНЯЯ ОДЕЖДА МУЖСКАЯ">ВЕРХНЯЯ ОДЕЖДА МУЖСКАЯ</option>
                    <option value="ВЕРХНЯЯ ОДЕЖДА ДЕТСКАЯ">ВЕРХНЯЯ ОДЕЖДА ДЕТСКАЯ</option>

                    <option value="ОБУВЬ ЖЕНСКАЯ">ОБУВЬ ЖЕНСКАЯ</option>
                    <option value="ОБУВЬ МУЖСКАЯ">ОБУВЬ МУЖСКАЯ</option>
                    <option value="ОБУВЬ ДЕТСКАЯ">ОБУВЬ ДЕТСКАЯ</option>

                    <option value="ПОВСЕДНЕВНАЯ ОДЕЖДА ЖЕНСКАЯ">ПОВСЕДНЕВНАЯ ОДЕЖДА ЖЕНСКАЯ</option>
                    <option value="ПОВСЕДНЕВНАЯ ОДЕЖДА МУЖСКАЯ">ПОВСЕДНЕВНАЯ ОДЕЖДА МУЖСКАЯ</option>
                    <option value="ПОВСЕДНЕВНАЯ ОДЕЖДА ДЕТСКАЯ">ПОВСЕДНЕВНАЯ ОДЕЖДА ДЕТСКАЯ</option>

                    <option value="БЕЛЬЕ ЖЕНСКОЕ">БЕЛЬЕ ЖЕНСКОЕ</option>
                    <option value="БЕЛЬЕ МУЖСКОЕ">БЕЛЬЕ МУЖСКОЕ</option>

                    <option value="ПОСТЕЛЬНОЕ БЕЛЬЕ">ПОСТЕЛЬНОЕ БЕЛЬЕ</option>

                    <option value="КНИГИ">КНИГИ</option>

                    <option value="КАНЦЕЛЯРИЯ">КАНЦЕЛЯРИЯ</option>

                    <option value="ДЕТСКИЕ ИГРУШКИ">ДЕТСКИЕ ИГРУШКИ</option>

                    <option value="ДЕТСКИЕ ТОВАРЫ">ДЕТСКИЕ ТОВАРЫ</option>

                    <option value="ДЕТСКИЕ ПАМПЕРСЫ">ДЕТСКИЕ ПАМПЕРСЫ</option>
                    <option value="ПАМПЕРСЫ ДЛЯ ВЗРОСЛЫХ">ПАМПЕРСЫ ДЛЯ ВЗРОСЛЫХ</option>

                    <option value="ЛЕКАРСТВА">ЛЕКАРСТВА</option>

                    <option value="ПРОДУКТЫ ПИТАНИЯ">ПРОДУКТЫ ПИТАНИЯ</option>
                    <option value="ПРОДУКТЫ ПИТАНИЯ ДЕТСКИЕ">ПРОДУКТЫ ПИТАНИЯ ДЕТСКИЕ</option>

                    <option value="ПОСУДА">ПОСУДА</option>

                    <option value="ПРЕДМЕТЫ ГИГИЕНЫ">ПРЕДМЕТЫ ГИГИЕНЫ</option>

                    <option value="БЫТОВАЯ ХИМИЯ">БЫТОВАЯ ХИМИЯ</option>

                    <option value="ХОЗТОВАРЫ">ХОЗТОВАРЫ</option>

                </select>
            </div>
            <div class="container mt-3">!!!Обратите внимание, что содержимое коробки должно соответствовать категории сортировки (см. сортировочный лист)</div>
            <footer>
                <div class="buttons_container">
                    <button
                        class="button"
                        @click="e => {
                            e.preventDefault();
                            this.createBox();
                        }"
                    >Добавить</button>
                </div>
            </footer>
        </div>
    </ModalScreen>
</template>

<script>
import BoxList from '@/components/new/BoxList.vue';
import PaginationUI from '@/components/new/PaginationUI.vue';
import store from '@/store.js';
import ModalScreen from './components/new/modalScreen.vue';
import SortSelector from "@/components/new/sortSelector.vue";


export default {
    setup() {
        store.state.data = store.commit('get');
    },
    data() {
        return {
            isAddingBox: false,
            newBox: {
                description: '',
            }
        }
    },
    methods: {
        openCreatingBox() {
            this.isAddingBox = true;
        },
        closeCreatingBox() {
            this.isAddingBox = false;
        },
        async createBox() {
            await store.commit('createBox', this.newBox);
            await store.commit('get');
            this.closeCreatingBox();
        }
    },
    components: {SortSelector, BoxList,  PaginationUI, ModalScreen },
    computed: {
        status() {
            return store.state.status;
        },
        boxes() {
            return store.state.boxes;
        }
    }
}
console.log(store.state.currentPage);
</script>

<style>
:root {
    --mainBackgroundColor: rgb(33,34,60);
    --mainColorTransparent: rgba(255,255,255,60);
    --colorMainWhite: rgb(255,255,255);

    --colorMainBlue: rgb(28,117,225);
    --colorDarkBlue: rgb(5, 38, 79);
    --colorLightBlue: rgb(7, 64, 133);

    --colorMainOrange: rgb(225, 98, 23);
    --colorDarkOrange: rgb(93, 36, 3);
    --colorLightOrange: rgb(138, 57, 10);

    --colorMainRed: rgb(225, 57, 23);
    --colorMainGray: rgb(63, 65, 103);
}
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    color: var(--colorMainWhite);
}
@media (max-width:350px) {
    html {font-size: 11px;}
}
body, .main-title > h1 {
    background-color: var(--mainBackgroundColor);
}
.button_container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 70%;
}
.main-title {
    width: 100%;
    position: relative;
    text-align: center;
    margin-top: -100px;
}
@media (max-width: 600px) {
    .main-title{margin-top: 0;}
}
.main-title > h1 {
    z-index: 25;
    padding: 0 2rem;
    display: inline-block;
    position: relative;
    margin-top: 100px;
    font-size: 5rem;
    color: white;
    text-shadow: 0 0 2px black;
}
@supports(-webkit-text-stroke: 1px black) {
    .main-title {
        -webkit-text-stroke: 1px black;
    }
}
.header {
    width: 100vw;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    /* position: fixed; */
    z-index: 100;
    /*background-color: #FF4200;*/
}
@media (max-width: 600px) {
    .header {
        position: fixed;
        background-color: var(--mainBackgroundColor);
        border-radius: 0 0 1rem 1rem;
    }
}
.line {
    position: absolute;
    top: 150px;
    left: 0;
    height: 1px;
    width: 100%;
    border: 2px solid #FFF;
    z-index: 20;
}
.text-input {
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 0.5rem;
    background: transparent;
    color: white;
    padding: 0.5rem;
}
.button {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: white;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border-radius: 1rem;
}
.addBoxIcon {
    transform: translate(20%);
    width: 70%;
}
.addBoxIcon path {
    fill: var(--colorMainWhite);
}
.createNewBox {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--colorMainGray);
}
</style>