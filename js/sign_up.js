/**
 * This function is used to get all values of the registration part and to push all the information in an ARRAY.
 */
function registerUser() {
    let name = document.getElementById("signup-name");
    let email = document.getElementById("signup-mail");
    let password = document.getElementById("signup-password");
    users.push({
        name: name.value,
        email: email.value,
        password: password.value
    });
    if(users) {
        saveUsersToBackend();
    }
}

/**
 * This function is used to save all the user information in the backend and to redirect to the login page
 * @returns {Promise<void>}
 */
async function saveUsersToBackend() {
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem("allUsers", allUsersAsString);
    window.location.href = "index.html?success=You have registered successfully";
}