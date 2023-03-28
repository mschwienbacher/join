// TODO 1) User bearbeiten, NEUEN hinzufügen w3 element überschreiben
// TODO 2) Breadcrumb zusammenfassen wenn mehrere Namen mit dem selben Anfangsbuchstaben sind (includes) - Alle Initialien in ein neues Array speichern, duplikat entfernen und anzeigen
// TODO 3) Alle Kontakte löschen und testen
// TODO 4) Funktionen cleanen + beschreiben

async function initContactBackend() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContactList();
    includeHTML();
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
    setTimeout(function() {window.location.href = "contacts_michael.html";}, 500);
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
    if(allContacts.length > 0) {
        sortArray();
        container.innerHTML = "";
        for(let i = 0; i < allContacts.length ;i++) {
            let singleContact = allContacts[i];
            let nameInitials = getInitials(singleContact.name);
            let surnameInitials = getInitials(singleContact.surname);
            //TODO erster Breadcrumb filtern und dann kreiren
            container.innerHTML += `
                <div class="letter-breadcrumb">${nameInitials}</div>
                <div class="single-contact"> 
                    <a href="javascript:void(0);" onclick="showFullContact(${i});" class="contact-mail" id="showed-${i}" title="${singleContact.name} ${singleContact.surname}">
                        <span class="contact-initial ${nameInitials.toLowerCase()}${surnameInitials.toLowerCase()}">${nameInitials}${surnameInitials}</span>
                        <span class="contact-names">
                            ${singleContact.name} ${singleContact.surname} <br><strong>${singleContact.email}</strong>
                        </span>
                    </a>
                </div>
            `;
        }
    } else {
        container.innerHTML = "No contacts available, add a new one!";
    }
}

function getInitials(element) {
    return element.charAt(0);
}

function showFullContact(id) {
    toggleClass(id, ".contact-mail");
    let container = document.getElementById("the-contact");
    container.innerHTML = "";
    getSavedContactsFromBackend();
    sortArray();
    let theContact = allContacts[id];
    let nameInitials = getInitials(theContact.name);
    let surnameInitials = getInitials(theContact.surname);

    container.innerHTML += `
    <div class="the-user">
        <div class="the-user-head">
            <div class="the-user-img">
                <span class="contact-initial ${nameInitials.toLowerCase()}${surnameInitials.toLowerCase()}">${nameInitials}${surnameInitials}</span>
            </div>
            <div class="the-user-names">
                <div class="the-user-name">${theContact.name} ${theContact.surname}</div>
                <div class="user-tasks"><a href="javascript:void(0);" onclick="alert('Noch zu machen');"><img src="../assets/img/plus.svg" width="15" height="15" alt="Plus"> <span>Add tasks</span></a></div>
            </div>
        </div>
        <div class="the-user-body">
            <div class="the-user-info">
                <div class="the-user-title">Contact Information</div>
                <div class="the-user-edit">
                    <a href="javascript:void(0);" onclick="editContact(${id})">
                        <img src="../assets/img/pencil.svg" width="31" height="24" alt="Modify">
                        <span>Edit contact</span>
                    </a>
                </div>
            </div>
            <div class="the-user-contacts">
                <strong>E-Mail</strong> <br>
                <a href="mailto:${theContact.email}">${theContact.email}</a><br>
                <strong>Phone</strong> <br>
                ${theContact.phone}
            </div>
        </div>
    </div>
`;
}

function editContact(id) {
    let mainContainer = document.getElementById("contact-popup");
    toggleSideBarContainer('p-container', 'show');
    sortArray();
    let theContact = allContacts[id];

    mainContainer.innerHTML = "";
    mainContainer.innerHTML += `
    <div class="contact-popup-header">
        <img src="assets/img/close.svg" width="31" height="31" alt="Close" class="close-it" onclick="toggleSideBarContainer('p-container', 'hide');">
        <div class="small-logo"><img src="assets/img/logo-join-small.svg" width="47" height="58" alt="JOIN"></div>
        <div class="contact-popup-title">
            <p>Edit contact</p>
        </div>
    </div>
    <div class="contact-popup-content">
        <span class="contact-initial ${getInitials(theContact.name).toLowerCase()}${getInitials(theContact.surname).toLowerCase()}">${getInitials(theContact.name)}${getInitials(theContact.surname)}</span>
        <form onsubmit="return false;" id="edit-form">
            <div class="input name">
                <input type="text" id="change-name" value="${theContact.name}" placeholder="Name" required>
            </div>
            <div class="input surname">
                <input type="text" id="change-surname" value="${theContact.surname}" placeholder="Surname" required>
            </div>
            <div class="input email">
                <input type="email" id="change-mail" value="${theContact.email}" placeholder="Email" required>
            </div>
            <div class="input phone">
                <input type="tel" id="change-phone" value="${theContact.phone}" placeholder="Phone" required>
            </div>
            <button id="save-button" class="cta" onclick="updateContact(${id});">Save</button>
        </form>
    </div>
    `;
}

function sortArray() {
    allContacts = allContacts.sort((a, b) => {if (a.name < b.name) {return -1;}});
}

function updateContact(id){
    let theName = document.getElementById("change-name");
    let theSurname = document.getElementById("change-surname");
    let theEmail = document.getElementById("change-mail");
    let thePhone = document.getElementById("change-phone");
    toggleSideBarContainer('p-container', 'hide');
    allContacts[id] = {
        "name": theName.value,
        "surname": theSurname.value,
        "email": theEmail.value,
        "phone": thePhone.value

    }
    getSavedContactsFromBackend();
    saveContactsToBackend();
    loadContactList();
    showFullContact(id);
}


function toggleClass(id, theClass) {
    let items = document.querySelectorAll(theClass);
    for(let i = 0; i < items.length ; i++) {
        items[i].classList.remove('active');
    }
    items[id].classList.add('active');
}

function clearInputs() {
    let theName = document.getElementById("create-name");
    let theSurname = document.getElementById("create-surname");
    let theEmail = document.getElementById("create-mail");
    let thePhone = document.getElementById("create-phone");
    theName.value = "";
    theSurname.value = "";
    theEmail.value = "";
    thePhone.value = "";
}

function showCreateContact() {
    let page = document.getElementById("the-page");
    //let attribute = page.getAttribute("w3-include-html");
    page.setAttribute("w3-include-html", "assets/templates/add_new_contact_michael.html");
    toggleSideBarContainer('p-container', 'show');

}
