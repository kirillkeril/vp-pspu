<template>
<ui-collapse ripple>
    <template #toggle>
        <div class="py-1 px-3">{{ currItem.title }}</div>
    </template>
    <div class="row">
        <div class="input-group mb-3">
            <span class="input-group-text">Наименование: </span>
            <input 
                class="form-control"
                placeholder="Наименование"
                v-model="currItem.title" />
        </div>
        <div class="input-group mb-1">
            <span class="input-group-text">Кол-во: </span>
            <input 
                class="form-control"
                placeholder="Кол-во"
                v-model="currItem.amount" />
            <span class="input-group-text">Вес единицы</span>
            <input 
                class="form-control"
                placeholder="Вес в кг"
                v-model="currItem.weight" />
        </div>
        <div class="input-group mb-3 ">
            <span class="input-group-text">Суммарный вес: {{parseFloat(currItem.weight * currItem.amount).toFixed(3)}}кг</span>
        </div>

        <div 
            v-if="item.size"
            class="input-group mb-3"
        >
            <span class="input-group-text">Размер</span>
            <input 
                class="form-control"
                placeholder="Размер"
                v-model="currItem.size" />
            <span class="input-group-text">Пол</span>
            <select v-model="currItem.gender" class="form-select">
                <option selected value="M">Муж</option>
                <option selected value="F">Жен</option>
                <option selected value="Uni">Уни</option>
            </select>
        </div>

        <div
            v-if="item.expiration_date" 
            class="input-group mb-3">
            <span class="input-group-text">Годен до: </span>
            <input 
                type="date"
                class="form-control"
                placeholder="Годен до"
                v-model="currItem.expiration_date" />
        </div>
    
        <div
            v-if="item.appointment" 
            class="input-group mb-3">
            <span class="input-group-text">Назначение: </span>
            <input
                class="form-control"
                placeholder="Назначение"
                v-model="currItem.appointment" />
        </div>

        <div
            v-if="item.description" 
            class="input-group mb-3">
            <span class="input-group-text">Описание: </span>
            <input
                class="form-control"
                placeholder="Описание"
                v-model="currItem.description" />
        </div>
        
        <div class="mt-3">Дата получения: {{currItem.date}}</div>

        <div class="error_list mt-3" v-if="!!this.err">
            Ошибка: 
            <div class="error_item" v-for="(value, key) of this.err" :key="key">{{value}}</div>
        </div>

        <div class="mt-3" style="display:flex; justify-content:space-around;">
            <ui-button raised @click="openSave = true">Сохранить</ui-button>
            <ui-dialog maskClosable="true" v-model="openSave" @confirm="updateItem">
                <ui-dialog-title>Подтвердите сохранение</ui-dialog-title>
                <ui-dialog-content>
                    <p style="text-align:center;" id="completed"></p>
                </ui-dialog-content>
                <ui-dialog-actions :acceptText="'Сохранить'" :cancelText="'Отмена'"></ui-dialog-actions>
            </ui-dialog>

            <ui-button raised @click="openDel = true">Удалить</ui-button>
            <ui-dialog maskClosable="true" v-model="openDel" @confirm="deleteItem">
                <ui-dialog-title>Подтвердите удаление</ui-dialog-title>
                <ui-dialog-content>
                    <p style="text-align:center;" id="completed"></p>
                </ui-dialog-content>
                <ui-dialog-actions :acceptText="'Удалить'" :cancelText="'Отмена'"></ui-dialog-actions>
            </ui-dialog>
        </div>
    </div>
</ui-collapse>
</template>

<script>
import { parseDate } from '@/services/services';
import { updateItem } from '@/api/api';
import { deleteItem } from '../api/api';

export default {
    props: {
        item: {
            required: true
        }
    },
    data() {
        return {
            currItem: {
                ...this.item,
                date: parseDate(this.item.date),
                expiration_date: this.item.expiration_date == undefined ? undefined : parseDate(this.item.expiration_date),
            },
            type: this.calcType(),
            openDel: false,
            openSave: false,
            err: false,
        };
    },
    methods: {
        async updateItem(confirm) {
            if(confirm){
                const {status, data} = await updateItem(this.type, this.currItem);
                console.log(status.toLowerCase());
                if (status.toLowerCase() == 'ok') {
                    this.err = false;
                    this.openSave = false;
                    this.$emit('updateItem');
                }
                else {
                    this.err = data;
                    console.log(!!this.err);
                }
                
            }
        },
        async deleteItem(confirm) {
            if(confirm) {
                deleteItem(this.type, this.currItem);
                this.$emit('updateItem');
            }
        },
        calcType() {
            if(this.item.size) return 'clothes';
            if(this.item.expiration_date) return 'food';
            if(this.item.appointment) return 'medicines';
            if(this.item.description) return 'other';
        }
    },
    components: {  }
}
</script>

<style scoped>
</style>