let contacts = [];

function createContact() {
    let name = document.getElementById("create-name");
    let surname = document.getElementById("create-surname");
    let email = document.getElementById("create-mail");
    let phone = document.getElementById("create-phone");

    getSavedContactsFromBackend();

    contacts.push({
        name: name.value,
        surname: surname.value,
        email: email.value,
        phone: phone.value
    });
    saveContactsToBackend();
    /*
    if(contacts) {
        saveContactsToBackend();
        setTimeout(function() {
            toggleSideBarContainer('p-container', 'hide');

            }, 1000);
    }
     */
}

async function saveContactsToBackend() {
    let contactsToString = JSON.stringify(contacts);
    await backend.setItem("userContacts", contactsToString);
}

async function getContactsAsArray() {
    return JSON.parse(backend.getItem("userContacts"));
}

function getSavedContactsFromBackend() {
    contacts = JSON.parse(backend.getItem('userContacts')) || [];
}

function toggleSideBarContainer(elementToModify, action) {
    let element = document.getElementById(elementToModify);
    if(action == "show") {
        element.style.display = "block";
    } else if (action == "hide") {
        element.style.display = "none";
    }
}

function loadContactList() {
}