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
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    let successMsg = document.getElementById("success");
    if(success) {
        successMsg.innerHTML = "<p>" + success + "</p>";
        setTimeout(()=>{successMsg.style.display="none";},5000);
    }
}