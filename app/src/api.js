const BASE_URL = "http://localhost:5000";
const HEADERS = {
    "Access-Control-Allow-Origin": '*',
    "Content-Type": "application/json"
}
const POST_OPTIONS = {
    method: 'POST',
    headers: HEADERS
}

const GET_OPTIONS = {
    method: 'GET',
    headers: HEADERS
}

export const getList = async function () {
    const response = await fetch(BASE_URL + "/", GET_OPTIONS);
    return response.json();
}

export const getFridgeList = async function () {
    const response = await fetch(BASE_URL + "/fridge", GET_OPTIONS);
    return response.json();
}

export const getFood = async function (search) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({search_term: search});
    const response = await fetch(BASE_URL + "/food", options);
    return response.json();
}

export const addItem = async function(name, quantity, unit) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({name, quantity, unit});
    const response = await fetch(BASE_URL + "/add_shopping", options);
    return response.json();
}

export const addFridgeItem = async function(name, quantity, unit, expire_date, bought_date) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({name, quantity, unit, expire_date, bought_date});
    const response = await fetch(BASE_URL + "/add_fridge", options);
    return response.json();
}

export const editShopping = async function(id, name, quantity, unit) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id, name, quantity, unit});
    const response = await fetch(BASE_URL + "/edit_shopping", options);
    return response.json();
}

export const editFridge = async function(id, name, quantity, unit, expire) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id, name, quantity, unit, expire});
    const response = await fetch(BASE_URL + "/edit_fridge", options);
    return response.json();
}

export const finishShopping = async function(itemIds) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({ids: itemIds});
    const response = await fetch(BASE_URL + "/finish_shopping", options);
    return response.json();
}

export const deleteItem = async function(itemId) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id: itemId});
    const response = await fetch(BASE_URL + "/delete_shopping", options);
    return response.json();
}

export const deleteFridgeItem = async function(itemId) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id: itemId});
    const response = await fetch(BASE_URL + "/delete_fridge", options);
    return response.json();
}
