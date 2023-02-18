<template>
<ui-button raised @click="open = true">Добавить</ui-button>
<ui-dialog maskClosable="true" :closable="false" v-model="open" @confirm="addItem">
    <ui-dialog-title>Добавить новый предмет</ui-dialog-title>
    <ui-dialog-content>
        <div class="container row p-3">
            <div class="input-group mb-3">
                <span class="input-group-text">Наименование: </span>
                <input 
                    class="form-control"
                    placeholder="Наименование"
                    v-model="this.newItem.title" />
            </div>
            <div class="input-group mb-1">
                <span class="input-group-text">Кол-во: </span>
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
                <span class="input-group-text">Размер</span>
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
                <span class="input-group-text">Назначение: </span>
                <input
                    class="form-control"
                    placeholder="Назначение"
                    v-model="this.newItem.appointment" />
            </div>
        
            <div
                v-if="type === 'other'" 
                class="input-group mb-3">
                <span class="input-group-text">Описание: </span>
                <input
                    class="form-control"
                    placeholder="Описание"
                    v-model="this.newItem.description" />
            </div>
        </div>
        <div id="err" v-if="this.err">
            Ошибка:
            <div v-for="(value, key) of this.err" :key="key">{{value}}</div>
        </div>
    </ui-dialog-content>
    <ui-dialog-actions :acceptText="'Добавить'" :cancelText="'Отмена'"></ui-dialog-actions>
</ui-dialog>
</template>

<script>
import {createItem} from '@/api/api';

export default {
    props: {
        boxId: {
            required: true,
        }
    },
    data() {
        return {
            newItem: {
                title: '',
                amount: null,
                weight: '0',
                box_id: this.boxId,
            }, 
            err: false,
            type: 'clothes',
            open: false,
        }
    },
    methods: {
        async addItem(confirm) {
            console.log(confirm);
            if(confirm){
                const {status, data} = await createItem(this.type, {...this.newItem, weight: this.newItem.weight.replace(',', '.')});
                console.log(status, this.err);
                if (status.toLowerCase()=='ok') {
                    this.newItem = {
                        title: '',
                        amount: null,
                        weight: '0',
                        box_id: this.boxId,
                    };
                    this.open = false;
                    this.$emit('createNewItem');
                }
                else {
                    this.err = data;
                }
            }            
        }
    }
}
</script>

<style scoped>
    
</style>