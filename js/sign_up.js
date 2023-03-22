/**
 * This MAIN function is used to verify if the login details are existing/correct
 */

function login() {
    let email = document.getElementById("login-mail");
    let password = document.getElementById("login-password");
    let allUsersAsArray = getUsersAsArray();

    if(allUsersAsArray != null) { // If there users existing
        let userCanLogin = allUsersAsArray.find(u => u.email == email.value && u.password == password.value);
        let noUserFound = allUsersAsArray.find(us => us.email != email.value);
        if(userCanLogin) {
            window.location.href = "summary.html";
        } else if(noUserFound) {
            printErrorMessage("No user was found!");
            emptyValues(email, password);
        } else {
            printErrorMessage("Credentials incorrect!");
            emptyValues(email, password);
        }
    } else {
        printErrorMessage("No user was found!");
        emptyValues(email, password);
    }
}

/**
 * This MAIN function is used to push all the sign-up information in an ARRAY.
 */

async function register() {
    let name = document.getElementById("signup-name");
    let email = document.getElementById("signup-mail");
    let password = document.getElementById("signup-password");
    users.push({
        name: name.value,
        email: email.value,
        password: password.value
    });
    if(users) {
        await saveUsersToBackend(); //PROBLEM: Es speichert mir immer nur 1nen User in das Backend
        window.location.href = "index.html?success=You have registered successfully";
    }
}

/**
 * This function is used to save all the user information in the backend
 * @returns {Promise<void>}
 */

async function saveUsersToBackend() {
    let allUsersAsString = JSON.stringify(users);
    await backend.setItem("registeredUsers", allUsersAsString);
}

/**
 * This function is to reset the values of the input fields
 * @param element01
 * @param element02
 */

function emptyValues(element01, element02) {
    element01.value = "";
    element02.value = "";
}

/**
 *  This function returns all registered users as an array and must be saved in a variable
 * @returns {array}
 */

function getUsersAsArray() {
    return JSON.parse(backend.getItem("registeredUsers"));
}

/**
 * This function prints an error message
 * @return {string}
 * @param msg - The message to show
 */

function printErrorMessage(msg) {
    let errorMessage = document.getElementById("success");
    errorMessage.innerHTML = `<p class="red">${msg}</p>`;
    setTimeout(()=>{errorMessage.innerHTML = "";},3000);
}

/**
 * This function is used to check if you can recover your password
 */

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
    formElement.submit();
}

/**
 * This functions checks if you are allowed to stay on the page
 */

function validatePermission() {
    let email = getUrlParameters("email");
    if(!email) {
        printErrorMessage("You are not allowed to stay here!");
        readOnlyPwInputs();
        setTimeout(function() {
            window.location.href = "index.html";
        }, 3000)
    }
}

/**
 * This function is used to check if the user can reset the PW or not
 */

function userCanReset() {
    let email = getUrlParameters("email");
    let checked = checkPasswordIdentity(email);
    if(checked) {
        finalResetPw(email, checked[1]);
    } else {
        printErrorMessage("The passwords do not match, please retry!");
    }
}

/**
 * This function is used to check IF the user was found and the insert PWs are the same
 * @param email - The value of the parameter of the URL (The email address)
 */
function checkPasswordIdentity(email) {
    let firstPwField = document.getElementById("new-password");
    let secondPwField = document.getElementById("confirm-password");
    let allUsersAsArray = getUsersAsArray();
    let emailIdentity = allUsersAsArray.find(u => u.email == email);

    if(emailIdentity && firstPwField.value == secondPwField.value) {
        return [true, firstPwField.value];
    } else {
        return false;
    }
}

/**
 * This function is used to reset definitely your password
 */

async function finalResetPw(email, newPw) {
    let allUsersAsArray = getUsersAsArray();
    let userToReset = allUsersAsArray.find(u => u.email == email);

    userToReset.password = newPw;
    users.push(userToReset); // PUSH the new values in ARRAY
    await saveUsersToBackend();
    window.location.href = "index.html?success=Password changed correctly";
}

/**
 * This function is used to set the PW inputs to read only
 */

function readOnlyPwInputs() {
    let pwInput01 = document.getElementById("new-password");
    let pwInput02 = document.getElementById("confirm-password");
    pwInput01.readOnly = true;
    pwInput02.readOnly = true;
}