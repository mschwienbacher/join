setURL('https://gruppenarbeit-503-join.developerakademie.net/backend');
let users = [];

/**
 * This function is used to INIT the backend.
 *
 * @returns {JSON} - Will return a JSON of all saved elements
 */

async function initBackend() {
    await downloadFromServer();
}

/**
 * This function is used to SAVE the users into the backend
 * @returns {Promise<void>}
 */

async function saveUsersToBackend() {
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem("registeredUsers", allUsersAsString);
}

/**
 * This function is used to GET all the users from the backend
 * @returns {Promise<void>}
 */

function getSavedUsersFromBackend() {
    users = JSON.parse(backend.getItem('registeredUsers')) || [];
}

/**
 *  This function RETURNS all registered users as an ARRAY
 * @returns {array} - All registred users
 */

function getUsersAsArray() {
    return JSON.parse(backend.getItem("registeredUsers"));
}


/**
 * This function is used to reset the values of the passed input fields
 * @param element01 - field 01
 * @param element02 - field 01
 */

function emptyValues(element01, element02) {
    element01.value = "";
    element02.value = "";
}


/**
 * This function is used to get the parameter of the URL
 * @param param - "email" or "success" parameters
 * @returns {string} - returns the value of the URL
 */
function getUrlParameters(param) {
    let urlParams = new URLSearchParams(window.location.search);
    let success = urlParams.get(param);
    return success;
}