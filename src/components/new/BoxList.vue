<template>
    <div class="box-list">
        <BoxUI v-for="item in boxes" :key="item.id" :box="item" :color="item.boxNumber % 2 === 0 ? 'blue' : 'orange'"></BoxUI>


    </div>
</template>

<script>
import BoxUI from '@/components/new/BoxUI.vue';

export default {
    props: {
        boxes: {
            required: true,
        }
    },
    components: { BoxUI }
}
</script>

<style>
.box-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1280px;
    padding: 0 3rem;
    margin-bottom: 3.5rem;
}
@media(max-width: 870px) {
    .box-list {
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
}
</style>