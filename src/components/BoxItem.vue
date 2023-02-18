<template>
<ui-collapse with-icon ripple>
    <template #toggle>
        <div class="py-2">Коробка {{this.box.boxNumber}}</div>
    </template>
    <div class="row">
        Содержимое:
        <ItemElem @updateItem="() => onUpdateBoxState()" v-for="item in this.boxItems" :key="item.title+item.id" :item="item" />

        <div class="mt-3">
            <ItemForm @createNewItem="() => onUpdateBoxState()" :box-id="this.box.id"/>
        </div>
        
        <div style="display:flex; justify-content:center;" class="mt-5"> 
            <a :href="this.printBoxHref" target="_blank" class="btn btn-primary">Печать</a>
        </div>
    </div>
</ui-collapse>
</template>

<script>
import {printBox} from '@/api/api'
import ItemElem from './ItemElem.vue';
import ItemForm from './ItemForm.vue';

export default {
    props: {
        box: {
            reqired: true
        }
    },
    data() {
        return {
            boxItems: [...this.box.clothes, ...this.box.food, ...this.box.medicines, ...this.box.other],
            currBox: {...this.box},
            printBoxHref: printBox(this.$props.box),
        };
    },
    methods: {
        printBox() {
            printBox();
        },
        onUpdateBoxState() {
            this.$emit('box-updated');
        }
    },
    components: { ItemElem, ItemForm }
}
</script>