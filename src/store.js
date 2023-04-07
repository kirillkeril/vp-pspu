import {createStore} from 'vuex';
import {deleteItem, updateItem, createItem, createBox, fetchData, getBoxes, updateBox} from '@/api/api';

export default createStore({
    state() {
        return {
            boxes: [],
            currentPage: 1,
            maxPage: 18,
            data: {},
            status: '',
            error: '',
            sortType: '',
            date: {month: new Date().getMonth().toString(), year: new Date().getFullYear().toString()},
        }
    },
    mutations: {
        async get(state) {
            let options = "";
            if (state.sortType !== "" && state.date.month && state.date.year) {
                options += `type=${state.sortType}`
                options += `&month=${state.date.month}&year=${state.date.year}`
            }
            const {data, maxPages, status} = await getBoxes(state.currentPage, options);
            state.boxes = data;
            state.maxPage = maxPages;
            state.status = status;
        },
        delete(state, item) {
            deleteItem(item);
        },
        update(state, item) {
            updateItem(item);
        },
        create(state, options) {
            createItem(options.type, options.item);
        },
        createBox(state, newBox) {
            createBox(newBox);
        },
        changeBox(state, newBox) {
            updateBox(newBox);
        },
        getData(state, options) {
            state.data = fetchData(options.type, options.currentPage);
        },
        changePage(state, page) {
            if(page > 0 && page <= state.maxPage){
                state.currentPage = page;
            }
        },
        setError(state, err) {
            state.error = err;
        },
    },
})

