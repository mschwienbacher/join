async function initContactBackend() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContactList();
}

async function saveContactsToBackend() {
    let contactsToString = JSON.stringify(allContacts);
    await backend.setItem("contacts", contactsToString) || [];
}

async function getSavedContactsFromBackend() {
    allContacts = await JSON.parse(backend.getItem('contacts')) || [];
}

function getContactsAsArray() {
    return JSON.parse(backend.getItem('contacts'));
}

async function createContact() {
    let theName = document.getElementById("create-name");
    let theSurname = document.getElementById("create-surname");
    let theEmail = document.getElementById("create-mail");
    let thePhone = document.getElementById("create-phone");

    await getSavedContactsFromBackend();
    allContacts.push({
        name: theName.value,
        surname: theSurname.value,
        email: theEmail.value,
        phone: thePhone.value
    });
    await saveContactsToBackend();
    toggleSideBarContainer('p-container', 'hide');
    console.log(allContacts);
    //setTimeout(function() {window.location.href = "contacts_michael.html";}, 500)
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
    let container = document.getElementById("contact-list");
    container.innerHTML = "";
    for(let i = 0; i < allContacts.length ;i++) {
        let singleContact = allContacts[i];
        let nameInitials = getInitials(singleContact.name);
        let surnameInitials = getInitials(singleContact.surname);
        //TODO Hier gehts weiter zum bearbeiten
        container.innerHTML += `
            <div class="letter-breadcrumb">${nameInitials}</div>
            <div class="single-contact"> 
                <a href="javascript:void(0);" onclick="showContact(${i});" class="contact-mail" id="showed-${i}" title="${singleContact.name} ${singleContact.surname}">
                    <span class="contact-initial ${nameInitials.toLowerCase()}${surnameInitials.toLowerCase()}">${nameInitials}${surnameInitials}</span>
                    <span class="contact-names">
                        ${singleContact.name} ${singleContact.surname} <br><strong>${singleContact.email}</strong>
                    </span>
                </a>
            </div>
        `;
    }
}

function getInitials(element) {
    return element.charAt(0);
}