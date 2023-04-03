import axios from "axios";

export const config = {
    url: 'https://vp-pspu.cf/'
}

export const fetchData = async (type, currentPage) => {
    let res;
    try {
        res = await axios.get(`${config.url}/api/get/${type.toString().toLowerCase().trim()}/${currentPage}/`);
        return {data: res.data.data, pages: res.data.pageCount, status: res.data.status};
    } catch (error) {
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const createItem = async (type, item) => {
    let res;
    console.log(item);
    try{
        res = await axios.put(`${config.url}/api/new/${type}/`, item);
        console.log(res);
        return {status: res.data.status, data: res.data.data};
    } catch(error) {
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const updateItem = async (item) => {
    let res;
    let type = '';
    for (let key in item) {
        item[key] = item[key].toString();
    }
    try {
        if(item.size)
            type = 'clothes';
        else if(item.expiration_date)
            type = 'food';
        else if (item.appointment)
            type = 'medicines';
        else
            type = 'other';
        res = await axios.patch(`${config.url}/api/update/${type}/${item.id}/`, {...item, id:undefined});
        return {data: res.data.data, status: res.data.status}
    } catch (error) {
        console.log(error);
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const deleteItem = async (item) => {
    let res;
    let type = '';
    for (let key in item) {
        item[key] = item[key].toString();
    }
    try {
        if(item.size)
            type = 'clothes';
        else if(item.expiration_date)
            type = 'food';
        else if (item.appointment)
            type = 'medicines';
        else
            type = 'other';
        res = await axios.delete(`${config.url}/api/delete/${type}/${item.id}/`, {...item, id:undefined});
        return {data: res.data.data, status: res.data.status}
    } catch (error) {
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const getBoxes = async (page) => {
    let res;
    try {
        res = await axios.get(`${config.url}/api/get/box/${page}/`);
        return {status: res.data.status, data: res.data.data, maxPages: res.data.maxPages};
    } catch (error) {
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const createBox = async (box) => {
    let res;
    for (let key in box) {
        box[key] = box[key].toString();
    }
    try {
        console.log(box);
        res = await axios.put(`${config.url}/api/new/box/`, box);
        return {status: res.data.status, data: res.data.data};
    } catch (error) {
        console.error(error)
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const updateBox = async (box) => {
    let res;
    try {
        res = await axios.patch(`${config.url}/api/update/box/${box.id}/`, {...box, id: undefined, packDate: undefined});
        return {status: res.data.status, data: res.data.data};
    } catch (error) {
        return {status: 'ERROR', data: `Неизвестная ошибка: ${error.toString()}`}
    }
}

export const printBox = (box) => `${config.url}/api/print_box/${box.id}/`