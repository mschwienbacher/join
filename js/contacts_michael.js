let contacts = [];
function createContact() {
    let name = document.getElementById("create-name");
    let surname = document.getElementById("create-surname");
    let email = document.getElementById("create-mail");
    let phone = document.getElementById("create-phone");

    contacts.push({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value
    });
    if(contacts) {
        saveUsersToBackend();
        setTimeout(function() {
            toggleSideBarContainer('p-container', 'hide');
            window.location.href = "contacts_michael.html";
            }, 1000);
    }
}

async function saveContactsToBackend() {
    let contactsToString = JSON.stringify(contacts);
    await backend.setItem("userContacts", contactsToString);
}

function toggleSideBarContainer(elementToModify, action) {
    let element = document.getElementById(elementToModify);
    if(action == "show") {
        element.style.display = "block";
    } else if (action == "hide") {
        element.style.display = "none";
    }
}