// TODO 1) Filter contacts by initials, more contacts with the same initials - create Breadcrumb

/**
 * Onload function: This function is used to save all existing contacts in the database to the Array allContacts and to load the contactlist
 * @returns {Promise<void>}
 */
async function initContactBackend() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    loadContactList();
    includeHTML();
}

/**
 * This function is used to SAVE the contacts into the backend
 * @returns {Promise<void>}
 */
async function saveContactsToBackend() {
    let contactsToString = JSON.stringify(allContacts);
    await backend.setItem("contacts", contactsToString) || [];
}

/**
 * This function is used to GET all the contacts from the backend
 * @returns {Promise<void>}
 */
async function getSavedContactsFromBackend() {
    allContacts = await JSON.parse(backend.getItem('contacts')) || [];
}

/**
 * This function RETURNS all registered contacts as an ARRAY
 * @returns {any}
 */
function getContactsAsArray() {
    return JSON.parse(backend.getItem('contacts'));
}

/**
 * This function is used to create a new contact
 * @returns {Promise<void>}
 */
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

/**
 * This function is used to decide if show or hide the sidebar
 * @param elementToModify - The DIV to show/hide
 * @param action - The ACTION (show or hide)
 */
function toggleSideBarContainer(elementToModify, action) {
    let element = document.getElementById(elementToModify);
    if(action == "show") {
        element.style.display = "block";
    } else if (action == "hide") {
        element.style.display = "none";
    }
}

/**
 * This function is used to load the small contact list
 */
function loadContactList() {
    let container = document.getElementById("contact-list");
    if(allContacts.length > 0) {
        sortArray();
        container.innerHTML = "";
        for(let i = 0; i < allContacts.length ;i++) {
            let singleContact = allContacts[i];
            container.innerHTML += smallSingleContactTemplate(i, singleContact);
        }
    } else {
        container.innerHTML = "No contacts available, add a new one!";
    }
}

/**
 * This function is used to show the whole details of the contact
 * @param id
 */
function showFullContact(id) {
    toggleClass(id, ".contact-mail");
    let container = document.getElementById("the-contact");
    container.innerHTML = "";
    getSavedContactsFromBackend();
    sortArray();
    let theContact = allContacts[id];
    container.innerHTML += bigSingleContactTemplate(id, theContact);
}

/**
 * This function is used to show the template of a new contact
 */
function showContactCreation() {
    let mainContainer = document.getElementById("contact-popup");
    toggleSideBarContainer('p-container', 'show');
    mainContainer.innerHTML = "";
    mainContainer.innerHTML += contactCreationTemplate();
}

/**
 * This function is used to show the template to modify a contact
 * @param id
 */
function editContact(id) {
    let mainContainer = document.getElementById("contact-popup");
    toggleSideBarContainer('p-container', 'show');
    sortArray();
    let theContact = allContacts[id];
    mainContainer.innerHTML = "";
    mainContainer.innerHTML += editContactTemplate(id, theContact);
}

/**
 * This function is used to sort the Array
 */
function sortArray() {
    allContacts = allContacts.sort((a, b) => {if (a.name < b.name) {return -1;}});
}

/**
 * This function is used to update a contact
 * @param id
 */
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
    toggleSideBarContainer('p-container', 'hide');
    getSavedContactsFromBackend();
    saveContactsToBackend();
    loadContactList();
    showFullContact(id);
}

/**
 * This function is used to toggle a class
 * @param id
 * @param theClass
 */
function toggleClass(id, theClass) {
    let items = document.querySelectorAll(theClass);
    for(let i = 0; i < items.length ; i++) {
        items[i].classList.remove('active');
    }
    items[id].classList.add('active');
}

/**
 * This function is used to clear the input fields
 */
function clearInputs() {
    let theName = document.getElementById("create-name");
    let theSurname = document.getElementById("create-surname");
    let theEmail = document.getElementById("create-mail");
    let thePhone = document.getElementById("create-phone");
    theName.value = ""; theSurname.value = ""; theEmail.value = ""; thePhone.value = "";
}

/**
 * This function is used to get the initials of the name
 * @param element
 * @returns {string}
 */
function getInitials(element) {
    return element.charAt(0);
}

/**
 * The template of the small single contact
 * @param i
 * @param singleContact
 * @returns {string}
 */
function smallSingleContactTemplate(i, singleContact) {
    let nameInitials = getInitials(singleContact.name);
    let surnameInitials = getInitials(singleContact.surname);
    return `
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

/**
 * The template of the big single contact
 * @param id
 * @param theContact
 * @returns {string}
 */
function bigSingleContactTemplate(id, theContact) {
    let nameInitials = getInitials(theContact.name);
    let surnameInitials = getInitials(theContact.surname);
    return `
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

/**
 * The template of the contact modify mask
 * @param id
 * @param theContact
 * @returns {string}
 */
function editContactTemplate(id, theContact) {
    return `
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

/**
 * The template of the contact creation mask
 * @returns {string}
 */
function contactCreationTemplate() {
    return `
    <div class="contact-popup-header bluelight">
        <img src="assets/img/close.svg" width="31" height="31" alt="Close" class="close-it" onclick="toggleSideBarContainer('p-container', 'hide');">
        <div class="small-logo"><img src="assets/img/logo-join-small.svg" width="47" height="58" alt="JOIN"></div>
        <div class="contact-popup-title">
        <p>Add contact</p>
        </div>
        <div class="contact-popup-description">Tasks are better with a team!</div>
    </div>
    <div class="contact-popup-content newContact">
        <form onsubmit="createContact(); return false;" id="edit-form">
        <div class="input name">
          <input type="text" id="create-name" placeholder="Name" placeholder="Name" required>
        </div>
        <div class="input surname">
          <input type="text" id="create-surname" placeholder="Surname" placeholder="Surname" required>
        </div>
        <div class="input email">
          <input type="email" id="create-mail" placeholder="E-Mail" placeholder="Email" required>
        </div>
        <div class="input phone">
          <input type="tel" id="create-phone" placeholder="Phone" placeholder="Phone" required>
        </div>
        <div class="the-buttons">
          <a href="javascript:void(0);" onclick="clearInputs(); toggleSideBarContainer('p-container', 'hide');"><span>Clear</span><img src="assets/img/close-gray.svg" width="15" height="15" alt="Close"></a>
          <button id="create-button" class="cta">Create contact<img src="assets/img/ok.svg" width="36" height="24" alt="Create"></button>
        </div>
        </form>
    </div>
    `;
}