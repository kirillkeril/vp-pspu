<template>
    <div style="width:100%; display:flex; flex-direction: column; justify-content: center; align-items:center">
        <h2 class="my-3">Коробки</h2>
        <div class="container-fluid row align-items-center flex-column">
            <div v-if="boxes.length > 0" class="accordion col-sm-8 col-lg-4">
                <BoxItem @box-updated="() => getBoxes(this.currentPage)" v-for="box in boxes" :key="box.id+box.food.length+box.clothes.length+box.medicines.length+box.other.length" :box="box"/>
            </div>
            <div v-else class="row align-items-center flex-column">Ничего нет...</div>
            
        </div>
        <div class="my-5">
            <ui-button raised @click="open = true">Добавить коробку</ui-button>
            <ui-dialog v-model="open" @confirm="createBox">
                <ui-dialog-title>Добавить новую коробку?</ui-dialog-title>
                <ui-dialog-content>
                    <p style="text-align:center;" id="completed"></p>
                </ui-dialog-content>
                <ui-dialog-actions :acceptText="'Добавить'" :cancelText="'Отмена'"></ui-dialog-actions>
            </ui-dialog>
        </div>
    </div>   

    <nav class="col-sm-8 col-md-6" style="display: flex; justify-content: center;">
        <div
            v-for="page in maxPages"
            style="cursor:pointer;"
            :style="{
                'color': page == this.currentPage ? '#ff2600' : 'black'
            }"
            class="text-center p-2"
            :key="page"
            @click="() => changePage(page)"
        >
            {{page}}
        </div>
    </nav> 
</template>

<script>
import {getBoxes, createBox} from '@/api/api.js';
import BoxItem from '@/components/BoxItem.vue';

export default {
    mounted() {
        this.getBoxes(this.currentPage);
    },
    data() {
        return {
            boxes: [],
            status: '',
            currentPage: 1,
            maxPages: 1,
            open: false,
        }
    }, 
    components: {
        BoxItem
    },
    methods: {
        async getBoxes(page) {
            const {status, data, maxPages} = await getBoxes(page);
            this.boxes = data;
            this.status = status;
            this.maxPages = maxPages;
        },
        async createBox(confirm) {
            if(confirm){
                await createBox({description: 'Hdksdjalhi', isPacked: false});
                await this.getBoxes(this.currentPage);
            }
        },
        async changePage(page) {
            this.currentPage = page;
            await this.getBoxes(this.currentPage);
        },
    }
}
</script>

<style>
button {
    background: #FF4600 !important;
    color: white !important;
    transition: background .3s;
}
button:hover {
    background: whitesmoke;
    color: #FF4600;
    transition: background .3s;
}
button:active{
    color: #FF4600 !important;
}
</style>