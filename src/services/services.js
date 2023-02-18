export const parseDate = (date) => {
    const t = new Date(date);
    return `${t.getFullYear().toString().padStart(2, '0')}-${(t.getMonth()+1).toString().padStart(2, '0')}-${t.getDate().toString().padStart(2, '0')}`
}

export const calcPages = (pageCount) => {
    const pages = []
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    return pages;
}

export const getItemsFromBox = (box) => {
    return [...box.clothes, ...box.food, ...box.medicines, ...box.other];
}

export const getSumWeightFromBox = (box) => {
    const items = getItemsFromBox(box);
    let sum = 0;
    items.forEach(item => {
        sum += parseFloat(item.weight) * parseFloat(item.amount);
    });
    return sum;
}