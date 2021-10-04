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

export const archiveItem = async function(itemId) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id: itemId});
    const response = await fetch(BASE_URL + "/archive", options);
    return response.json();
}

export const deleteItem = async function(itemId) {
    const options = { ...POST_OPTIONS };
    options.body = JSON.stringify({id: itemId});
    const response = await fetch(BASE_URL + "/delete", options);
    return response.json();
}
