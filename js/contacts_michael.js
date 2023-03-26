let allContacts = [];

async function saveContactsToBackend() {
    let contactsToString = JSON.stringify(allContacts);
    await backend.setItem("contacts", contactsToString);
}

async function getSavedContactsFromBackend() {
    allContacts = await JSON.parse(backend.getItem('contacts')) || [];
}

async function getContactsAsArray() {
    return JSON.parse(backend.getItem("contacts"));
}

function createContact() {
    let theName = document.getElementById("create-name");
    let theSurname = document.getElementById("create-surname");
    let theEmail = document.getElementById("create-mail");
    let thePhone = document.getElementById("create-phone");
    getSavedContactsFromBackend();

    allContacts.push({
        name: theName.value,
        surname: theSurname.value,
        email: theEmail.value,
        phone: thePhone.value
    });
    saveContactsToBackend();
    toggleSideBarContainer('p-container', 'hide');
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