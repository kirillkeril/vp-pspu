<template>
    <!-- <BoxPage></BoxPage> -->
    <div class="header">
        <PaginationUI />
        <div class="logo"><img src="@/images/logo.png" alt="лого"></div>
    </div>
    <div class="main-title">
        <div class="line"></div>
        <h1>Коробки</h1>
    </div>
    
    <main>
        <BoxList :boxes="boxes"></BoxList>
        <div class="button_container">
            <ButtonUI @click="e => {
                e.preventDefault();
                openCreatingBox();
            }">
                Добавить коробку?
            </ButtonUI>
        </div>
    </main>
    <ModalScreen box-id="addBox" :visibility="isAddingBox" @close="closeCreatingBox"> 
        <div class="container row p-3">
            <h3>Добавить новую коробку?</h3>
            <div class="input-group mb-3">
                <input
                    class="form-control" 
                    placeholder="Категория сортировки"
                    v-model="newBox.description"/> 
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
import ButtonUI from '@/components/new/ButtonUI.vue';
import PaginationUI from '@/components/new/PaginationUI.vue';
import store from '@/store.js';
import ModalScreen from './components/new/modalScreen.vue';


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
    components: { BoxList, ButtonUI, PaginationUI, ModalScreen },
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
*, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
}
@media (max-width:350px) {
    html {font-size: 11px;}
}
body, .main-title > h1 {
    background-color: #FF4200;
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
        background-color: #ff4400c4; 
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
</style>