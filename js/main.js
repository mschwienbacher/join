setURL('https://michael-schwienbacher.developerakademie.net/modul-10/backend');
let users = [];
/**
 * This function is used to init the backend.
 *
 * @returns {JSON} - Will return a JSON of all elements
 */

async function initBackend() {
    await downloadFromServer();
}
checkIfUserIsRegistered();

/**
 * This function is used to show the success message after registration and will be hidden after 5 seconds
 */

function checkIfUserIsRegistered() {
    let success = getUrlParameters("success");
    printSuccessMessage(success);
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

/**
 * This function prints the success message if the users register successfully
 * @param success - URL parameter "success"
 */

function printSuccessMessage(success) {
    let successMsg = document.getElementById("success");
    if(success) {
        successMsg.innerHTML = "<p>" + success + "</p>";
        setTimeout(()=>{successMsg.style.display="none";},3000);
    }
}