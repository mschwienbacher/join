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
        printErrorMessage("No user found!");
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

function printErrorMessage(msg) {
    let errorMessage = document.getElementById("success");
    errorMessage.innerHTML = `<p class="red">${msg}</p>`;
    setTimeout(()=>{errorMessage.style.display="none";},3000);
}

function recoverPassword() {
    let email = document.getElementById("password-reset-email");
    if(email) {
        let allUsersAsArray = getUsersAsArray();
        let userExists = allUsersAsArray.find(u => u.email == email.value);
        if(userExists) {
            startPwChangeAnimation(email);
            setTimeout(function() {
                redirectToPwChange(email.value);
            }, 3000)
        } else {
            printErrorMessage("Email does not exist!");
        }
    }
}

/**
 * This function starts the animation that the email was sent. Manipulation of several elements
 * @param email - Get the element of the email input field
 */

function startPwChangeAnimation(email) {
    let formElement = document.getElementById("forgot-pw-form");
    let popup = document.getElementById("emailSuccess");
    let popupcontainer = document.getElementById("successMsgEmail");
    email.readOnly = true;
    formElement.removeAttribute("onsubmit");
    popup.style.display, popupcontainer.style.display = "block";
}

/**
 * This function is redirecting to the page to recreate the password
 */
function redirectToPwChange(email) {
    let formElement = document.getElementById("forgot-pw-form");
    console.log(email);
    formElement.submit(); //TODO submit form
    //window.location.href = "index.html";
    //alert("hi");
}