setURL('https://michael-schwienbacher.developerakademie.net/modul-10/backend');
let users = [];

/**
 * This function is used to INIT the backend.
 *
 * @returns {JSON} - Will return a JSON of all saved elements
 */

async function initBackend() {
    await downloadFromServer();
}