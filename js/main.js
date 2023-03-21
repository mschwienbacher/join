setURL('https://michael-schwienbacher.developerakademie.net/modul-10/backend');
/**
 * This function is used to init the backend.
 *
 * @returns {JSON} - Will return a JSON of all elements
 */
async function initBackend() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    console.log(users);
}