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
        }
    },
    mutations: {
        async get(state) {
            const {data, maxPages, status} = await getBoxes(state.currentPage);
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
        }
    },
})

