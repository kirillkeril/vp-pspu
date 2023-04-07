<template>
<div class="box">
    <svg :class="'box_'+color" :id="'box_'+box.id" style="width: calc(1vh * 1vw * 100%); min-width: 320px;" width="381" height="268" viewBox="0 0 381 268" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="box_face" d="M2 51.7502H300.498V266.994H2V51.7502Z" stroke="white" fill="white"/>
        <path class="box_light_side" d="M2.28223 52H300.121L378.621 1.00002H79.6215L2.28223 52Z" fill="#FFD8AA" stroke="white"/>
        <path class="box_dark_side" d="M379.121 1L300.121 52L300.621 266.5L379.121 213V1Z" fill="#FCCA90" stroke="white"/>
    </svg>
    <div class="box__content">
        <h3 class="box__header">Коробка №{{box.boxNumber}}</h3>
        <div class="box__description">{{box.description}}</div>
        <div class="box__description">Вес: {{weight}}</div>
        <div class="box__description" style="margin-top: 0.2rem;">Запакована: {{box.isPacked ? 'Да' : 'Нет'}}</div>
        <div class="box__description">Отправлена: {{ box.isSent ? 'Да' : 'Нет' }}</div>
    </div>

    <div class="box__pack-btn">
        <svg v-if="box.isPacked" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M10.75 35q-.958 0-1.688-.729-.729-.729-.729-1.688V17.5q0-1 .729-1.708.73-.709 1.688-.709h2.708v-3.541q0-2.75 1.896-4.646T20 5q2.75 0 4.646 1.896t1.896 4.646v3.541h2.708q.958 0 1.688.709.729.708.729 1.708v15.083q0 .959-.729 1.688-.73.729-1.688.729Zm0-1.417h18.5q.417 0 .708-.291.292-.292.292-.709V17.5q0-.417-.292-.708-.291-.292-.708-.292h-18.5q-.417 0-.708.292-.292.291-.292.708v15.083q0 .417.292.709.291.291.708.291ZM20 27.5q1.042 0 1.75-.708.708-.709.708-1.75 0-1-.729-1.73Q21 22.583 20 22.583q-1.042 0-1.75.729-.708.73-.708 1.771 0 1 .729 1.709Q19 27.5 20 27.5Zm-5.125-12.417h10.25v-3.541q0-2.125-1.5-3.625T20 6.417q-2.125 0-3.625 1.5t-1.5 3.625Zm-5.125 18.5V16.5v17.083Z"/></svg>
        <svg v-if="!box.isPacked" xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M10.75 15.083h14.375v-3.541q0-2.125-1.5-3.625T20 6.417q-2.125 0-3.625 1.5t-1.5 3.625h-1.417q0-2.75 1.896-4.646T20 5q2.75 0 4.646 1.896t1.896 4.646v3.541h2.708q.958 0 1.688.709.729.708.729 1.708v15.083q0 .959-.729 1.688-.73.729-1.688.729h-18.5q-.958 0-1.688-.729-.729-.729-.729-1.688V17.5q0-1 .729-1.708.73-.709 1.688-.709Zm0 18.5h18.5q.417 0 .708-.291.292-.292.292-.709V17.5q0-.417-.292-.708-.291-.292-.708-.292h-18.5q-.417 0-.708.292-.292.291-.292.708v15.083q0 .417.292.709.291.291.708.291ZM20 27.5q1.042 0 1.75-.708.708-.709.708-1.75 0-1-.729-1.73Q21 22.583 20 22.583q-1.042 0-1.75.729-.708.73-.708 1.771 0 1 .729 1.709Q19 27.5 20 27.5ZM9.75 33.583V16.5v17.083Z"/></svg>
    </div>

    <div class="box__more-arrow" v-on:click="openBox">
        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40">
            <path d="M466.077 756h30.769V536h-30.769v220Zm13.905-274q9.018 0 15.249-5.931t6.231-15.3q0-9.45-6.214-15.571-6.213-6.121-15.23-6.121-9.787 0-15.633 6.121-5.847 6.121-5.847 15.571 0 9.369 6.214 15.3 6.213 5.931 15.23 5.931Zm.418 454q-75.176 0-140.294-28.339-65.119-28.34-114.247-77.422-49.127-49.082-77.493-114.213Q120 650.894 120 575.634q0-74.491 28.339-140.069 28.34-65.578 77.422-114.206 49.082-48.627 114.213-76.993Q405.106 216 480.366 216q74.491 0 140.069 28.339 65.578 28.34 114.206 76.922 48.627 48.582 76.993 114.257Q840 501.194 840 575.6q0 75.176-28.339 140.294-28.34 65.119-76.922 114.062-48.582 48.944-114.257 77.494Q554.806 936 480.4 936Zm.1-30.769q136.885 0 232.808-96.039 95.923-96.038 95.923-233.692 0-136.885-95.736-232.808Q617.76 246.769 480 246.769q-137.154 0-233.192 95.736Q150.769 438.24 150.769 576q0 137.154 96.039 233.192 96.038 96.039 233.692 96.039ZM480 576Z"/>
        </svg>
    </div>

    <ModalScreen :visibility="isOpened" :box-id="this.box.id" @close="closeBox">
        <h3>Коробка №{{box.boxNumber}} <span>({{parseFloat(weight).toFixed(3)}}кг)</span></h3>
        <details class="mb-3">
            <summary>Параметры коробки</summary>
            <div class="options">
                <div>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="changedBox.isPacked"
                        :disabled="this.box.isSent || parseFloat(weight).toFixed(3) > 10"
                    />
                    <span>Упак.</span>
                </div>
                <div>
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="changedBox.isSent"
                        :disabled="!this.changedBox.isPacked || box.isSent || parseFloat(weight).toFixed(3) > 10"
                    />
                    <span>Отправ.</span>
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
                        <p v-if="v$.newItem.title.$error">Введите наименование (не менее трех символов)</p>
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
                        <p v-if="v$.newItem.weight.$error || v$.newItem.amount.$error">Проверье кол-во предметов. <br> Проверьте корректность веса, он не должен превышать 10кг на единицу. <br> Дробное число вводится с точкой.</p>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Суммарный вес: {{!isNaN(parseFloat(this.newItem.weight.replace(',','.') * this.newItem.amount)) ? parseFloat(this.newItem.weight.replace(',','.') * this.newItem.amount).toFixed(3) : 0.000}}кг</span>
                        </div>

                        <div class="input-group mb-3">
                            <select style="color: var(--colorMainGray)" v-model="this.type" id="type-selector" class="form-select">
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
import {required, decimal, numeric, maxValue, integer, minLength} from '@vuelidate/validators';
import {useVuelidate} from '@vuelidate/core'

export default {
    setup () {
        return { v$: useVuelidate() }
    },
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
    validations () {
        return {
            newItem: {
                title: {required, minLength: minLength(3)},
                amount: {required, numeric, integer},
                weight: {required, decimal, maxValue: maxValue(10)},
            }
        }
    },
    props: {
        box: {required: true},
        color: {required: true},
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
            let res;
            const isFormCorrect = await this.v$.$validate() && parseFloat(getSumWeightFromBox(this.box)).toFixed(3) <= 10;
            console.log(isFormCorrect)
            if (isFormCorrect) {
                res = await createItem(this.type, this.newItem);

                if (res.status === 'ERROR'){
                    this.err = res.data;
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
.box svg {
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
    top: 28%;
    left: 5%;
    right: 27%;
    width: 70%;
    height: 70%;
    word-wrap: break-word;
}
.box__more-arrow {
    cursor: pointer;
    position: absolute;
    bottom: 22%;
    right: 27%;
    z-index: 10;
}
.box__more-arrow svg path {
    fill: var(--colorMainWhite);
}
.box__pack-btn {
    cursor: pointer;
    position: absolute;
    top: 25%;
    right: 27%;
}
.box__pack-btn svg path {
    fill: var(--colorMainWhite);
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
.box_blue .box_face {
    fill: var(--colorMainBlue);
}
.box_blue .box_light_side {
    fill: var(--colorLightBlue);
}
.box_blue .box_dark_side {
    fill: var(--colorDarkBlue);
}

.box_orange .box_face {
    fill: var(--colorMainOrange);
}
.box_orange .box_light_side {
    fill: var(--colorLightOrange);
}
.box_orange .box_dark_side {
    fill: var(--colorDarkOrange);
}
</style>