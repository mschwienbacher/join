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
    await backend.setItem("registeredUsers", allUsersAsString);
    window.location.href = "index.html?success=You have registered successfully";
}

/**
 * This function is used to verify if the login details are existing
 */
function loginUser() {
    let email = document.getElementById("login-mail");
    let password = document.getElementById("login-password");
    let allUsersAsArray = getUsersAsArray();
    let singleUser = allUsersAsArray.find(u => u.email == email.value && u.password == password.value);
    if(singleUser) {
        window.location.href = "summary.html";
    } else {
        printErrorMessage();
    }
}

/**
 *  This function returns all registered users as an array and saved in a variable
 * @returns {array}
 */
function getUsersAsArray() {
    return JSON.parse(backend.getItem("registeredUsers"));
}

/**
 * This function prints the error message that no users is found
 */
function printErrorMessage() {
    let errorMessage = document.getElementById("success");
    errorMessage.innerHTML = `<p class="red">No user found!</p>`;
    setTimeout(()=>{errorMessage.style.display="none";},3000);
}