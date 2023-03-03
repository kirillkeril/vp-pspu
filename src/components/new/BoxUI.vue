<template>
<div class="box">
    <img src="@/images/box.svg"/>
    <div class="box__content">
        <h3 class="box__header">Коробка №{{box.boxNumber}} <span class="info" v-if="box.isPacked && !box.isSent">упак.</span> <span class="info" v-if="box.isSent">отправ.</span></h3>
        <p class="box__description">{{box.description}}</p>
    </div>
    <div class="box__more-arrow" v-on:click="openBox"></div>

    <ModalScreen :visibility="isOpened" :box-id="this.box.id" @close="closeBox">
        <h3>Коробка №{{box.id}} <span>({{parseFloat(weight).toFixed(3)}}кг)</span></h3>
        <details class="mb-3">
            <summary>Параметры коробки</summary>
            <div class="options">
                <div>
                    <input class="form-check-input" type="checkbox" v-model="changedBox.isPacked"/> <span>Упак.</span>
                </div>
                <div>
                    <input class="form-check-input" :disabled="!this.changedBox.isPacked" v-model="changedBox.isSent" type="checkbox"/> <span>Отправ.</span>
                </div>

                <div style="width: 50%; margin: 0 auto; display: flex; justify-content: space-around; align-items: center;">
                    <button
                        class="button"
                        @click="e => {
                            e.preventDefault();
                            this.saveBox();
                        }"
                    >
                        Сохранить
                    </button>
                    <button
                        class="button"
                        @click="e => {
                            e.preventDefault();
                            this.printBox();
                        }"
                    >
                        Распечатать
                    </button>
                </div>
            </div>
        </details>

        <h4 style="margin-bottom: 0">Список вещей</h4>

        <div v-if="isAddingNew">
            <form>
                <div class="container row p-3">
                    <div class="container row p-3">
                        <div class="input-group mb-3">
                            <input
                                class="form-control"
                                placeholder="Наименование"
                                v-model="this.newItem.title" />
                        </div>
                        <div class="input-group mb-1">
                            <input
                                class="form-control"
                                placeholder="Кол-во"
                                v-model="this.newItem.amount" />
                            <span class="input-group-text">Вес единицы</span>
                            <input
                                class="form-control"
                                placeholder="Вес в кг"
                                v-model="this.newItem.weight" />
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Суммарный вес: {{!isNaN(parseFloat(this.newItem.weight.replace(',','.') * this.newItem.amount)) ? parseFloat(this.newItem.weight.replace(',','.') * this.newItem.amount).toFixed(3) : 0.000}}кг</span>
                        </div>

                        <div class="input-group mb-3">
                            <select v-model="this.type" id="type-selector" class="form-select">
                                <option value="" selected disabled>Выберите категорию</option>
                                <option value="clothes">Одежда</option>
                                <option value="food">Еда</option>
                                <option value="medicines">Медикаменты</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>

                        <div
                            v-if="type === 'clothes'"
                            class="input-group mb-3">
                            <input
                                class="form-control"
                                placeholder="Размер"
                                v-model="this.newItem.size" />
                            <span class="input-group-text">Пол</span>
                            <select v-model="this.newItem.gender" class="form-select">
                                <option selected value="M">Муж</option>
                                <option value="F">Жен</option>
                                <option value="Uni">Уни</option>
                            </select>
                        </div>

                        <div
                            v-if="type === 'food'"
                            class="input-group mb-3">
                            <span class="input-group-text">Годен до: </span>
                            <input
                                type="date"
                                class="form-control"
                                placeholder="Годен до"
                                v-model="this.newItem.expiration_date" />
                        </div>

                        <div
                            v-if="type === 'medicines'"
                            class="input-group mb-3">
                            <input
                                class="form-control"
                                placeholder="Назначение"
                                v-model="this.newItem.appointment" />
                        </div>

                        <div
                            v-if="type === 'other'"
                            class="input-group mb-3">
                            <input
                                class="form-control"
                                placeholder="Описание"
                                v-model="this.newItem.description" />
                        </div>
                    </div>
                </div>
                <div v-if="err" class="error">
                    Ошибка:
                    <div v-for="(value, key) of this.err" :key="key">{{value}}</div>
                </div>
                <button class="button" @click="e => {
                    e.preventDefault();
                    createNewItem();
                }">
                    Сохранить
                </button>
            </form>
        </div>

        <button class="button" @click="(e) => {
            e.preventDefault();
            isAddingNew = !isAddingNew;
            this.newItem = {
                title: '',
                amount: null,
                weight: '0',
                box_id: this.box.id,
            }
            err = false;
        }">
            <span v-if="!isAddingNew">Добавить</span>
            <span v-if="isAddingNew">Показать все</span>
        </button>

        <div v-if="!isAddingNew">
            <div v-for="item in boxItems" :key="item.id">
                <details>
                    <summary><span class="title">{{item.title}}</span></summary>
                    <div class="props p-3">
                        <div class="input-group">
                            <span class="input-group-text">Кол-во</span> <input class="form-control" v-model="item.amount"/>
                        </div>

                        <div class="input-group">
                            <span class="input-group-text">Вес на единицу</span> <input class="form-control" v-model="item.weight"/>
                        </div>
            
                        <div class="input-group" v-if="item.size !== undefined">
                            <span class="input-group-text">Размер</span><input class="form-control" v-model="item.size" />
                        </div>


                        <div v-if="item.gender !== undefined" class="input-group">
                            <span class="input-group-text">Пол</span>
                            <select class="form-select" v-model="item.gender">
                                <option value="M">Мужской</option>
                                <option value="F">Женский</option>
                                <option value="Uni">Унисекс</option>
                            </select>
                        </div>

                        <div v-if="item.expiration_date !== undefined" class="input-group">
                            <span class="input-group-text">Срок годности</span> <input class="form-control" type="date" v-model="item.expiration_date"/>
                        </div>
            
                        <div v-if="item.appointment !== undefined" class="input-group">
                            <span class="input-group-text">Назначение</span> <input class="form-control" v-model="item.appointment"/>
                        </div>
            
                        <div class="input-group" v-if="item.description !== undefined">
                            <span class="input-group-text">Описание</span> <input class="form-control" v-model="item.description"/></div>
            
            
                        <div class="input-group" v-if="item.date">
                            <span class="input-group-text">Дата добавления</span> <input class="form-control" type="date" disabled :value="item.date">
                        </div>

                        <div style="width: 100%; display: flex; justify-content:space-between;">
                            <button 
                                class="button"
                                @click="(e) => {
                                    e.preventDefault();
                                    updateItem(item);
                                }"
                            >
                                Сохранить
                            </button>
                            <button
                                class="button"
                                style="border: none;"
                                @click="e => {
                                    e.preventDefault();
                                    deleteItem(item);
                                }"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </ModalScreen>
</div>
</template>

<script>
import ModalScreen from './modalScreen.vue';
import { getItemsFromBox } from '../../services/services';
import store from '@/store.js';
import {getSumWeightFromBox} from '../../services/services';
import {createItem, printBox} from '../../api/api';

export default {
    data() {
        return {
            isOpened: false,
            isAddingNew: false,
            boxItems: getItemsFromBox(this.box),
            type: '',
            newItem: {
                title: '',
                amount: null,
                weight: '0',
                box_id: this.box.id,
            },
            err: false,
            changedBox: {
                id: this.box.id,
                isSent: this.box.isSent,
                isPacked: this.box.isPacked,
            }
        };
    },
    props: {
        box: {required: true}
    },
    components: { ModalScreen },
    methods: {
        openBox() {
            this.isOpened = true;
        },
        closeBox() {
            this.isOpened = false;

        },
        async updateItem(item) {
            await store.commit('update', item);
            await store.commit('get');
        },
        async deleteItem(item) {
            await store.commit('delete', item);
            await store.commit('get');
            this.closeBox();
            location.reload();
        },
        async createNewItem() {
            const res = await createItem(this.type, this.newItem);
            if (res.status == 'ERROR'){
                this.err = res.data;
                console.log(res.data);
            } else {
                this.newItem = {
                    title: '',
                    amount: null,
                    weight: '0',
                    box_id: this.box.id,
                },
                this.closeBox();
                store.commit('get');
            }
        },
        async saveBox() {
            await store.commit('changeBox', this.changedBox);
            await store.commit('get');
        },
        printBox() {
            const url = printBox(this.box);
            window.open(url);
        }
    },
    computed: {
        weight () {
            return getSumWeightFromBox(this.box);
        }
    }
}
</script>

<style scoped>
.info {
    color: #ff4900ee;
}
.box {
    position: relative;
    margin: 1rem 0.2rem 0.2rem;
    max-width: 350px;
}
.box img {
    object-position: center;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
}
.box__content {
    position: absolute;
    z-index: 10;
    top: 23%;
    left: 5%;
    right: 27%;
    word-wrap: break-word;
}
.box__more-arrow {
    opacity: 0;
    cursor: pointer;
    width: 9%;
    height: 13%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.144);
    bottom: 5%;
    right: 25%;
}
.title {
    font-size: 1.5rem;
}
.button {
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.6);
    color: white;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    border-radius: 1rem;
}
.props {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
.props > div {
    margin-top: 0.5rem;
}
.options {
    display: flex;
    flex-direction: column;
}
.options > input[type="checkbox"] {

}
</style>