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

export const addItem = async function(title) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({title});
    const response = await fetch(BASE_URL + "/create", options);
    return response.json();
}

export const updateItem = async function(itemId, title) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id: itemId, title});
    const response = await fetch(BASE_URL + "/update", options);
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
