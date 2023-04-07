<template>

<form class="sortSelector">
    <label for="typeSelector">
        Тип
        <select
            id="typeSelector"
            class="form-select"
            v-model="type"
            @change="e => {
                this.setType();
            }"
        >
            <option value="">Все</option>
            <option value="unpacked">Открытые</option>
            <option value="packed">Готовые к отправке</option>
            <option value="sent">Отправленные</option>
        </select>
    </label>
    <label for="dateSelector">
        <span style="font-size: 0.7rem;">Прошлый месяц (по умолч.)</span>
        <input
            id="dateSelector"
            class="form-control"
            type="date"
            v-model="dateString"
            @change="e => {
                setDate();
            }"
        />
    </label>
</form>

</template>

<script>
import store from "@/store";
import {getLastDateString} from "@/services/services";
export default {
    name: "sortSelector",
    mounted() {
        console.log(getLastDateString())
        this.dateString = getLastDateString();
    },
    data() {
        return {
            type: store.state.sortType,
            dateString: '2023-03-30'
        }
    },
    methods: {
        setType() {
            console.log()
            store.state.sortType = this.type;
            store.commit('get');
        },
        setDate() {
            const [year, month, ] = this.dateString.split("-");
            store.state.date.month = month;
            store.state.date.year = year;
            store.commit('get');
        }
    },
}
</script>

<style scoped>
.sortSelector {
    display: flex;
    align-items: flex-end;
}
.sortSelector > *:not(:last-child) {
    margin-right: 1rem;
}
@media (max-width:550px) {
    .sortSelector{
        flex-direction: column;
        align-items: center;
    }
    .sortSelector > *:not(:last-child) {
        margin-bottom: 1rem;
    }
}
</style>