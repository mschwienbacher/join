let contacts = [
    {
        name: "Michael",
        surname: "Schwienbacher",
        email: "me@schwim.me",
        phone: "+39 3389877282"
    },
    {
        name: "Jürgen",
        surname: "Lanza",
        email: "j.lanz@yahoo.de",
        phone: "+49 0000000005"
    },
    {
        name: "Jörg",
        surname: "Benz",
        email: "joergbetz@web.de",
        phone: "+49 0000000003"
    },
    {
        name: "Tim",
        surname: "Mellentin",
        email: "timmellentin@freenet.de",
        phone: "+49 0000000002"
    }
    ,
    {
        name: "Manuel",
        surname: "Desomma",
        email: "desomma@tim.it",
        phone: "+39 0000000005"
    }
];

/**
 * This function is used to save contacts into the backend
 * @returns {Promise<void>}
 */
async function saveContactsToBackend() {
    let contactsAsString = JSON.stringify(contacts);
    await backend.setItem("userContacts", contactsAsString) || [];
}

/**
 * This function is used to GET all the contacts from the backend
 * @returns {Promise<void>}
 */

function getSavedContactsFromBackend() {
    contacts = JSON.parse(backend.getItem('userContacts')) || [];
}

/**
 * This function is used to load the whole contact list
 */
function loadContactList() {
    let contactList = document.getElementById("contact-list");
    contacts = contacts.sort((a, b) => {if (a.name < b.name) {return -1;}}); // Sort the contacts by name

    let lastInitial = "";
    for(let i = 0; i < contacts.length; i++) {
        let singleContact = contacts[i];
        contactList.innerHTML += drawSmallSingleContact(singleContact, i);
    }
}

function updateContact(id){
    let theName = document.getElementById("change-name");
    let theSurname = document.getElementById("change-surname");
    let theEmail = document.getElementById("change-mail");
    let thePhone = document.getElementById("change-phone");

    contacts[id] = {
        name: theName.value,
        surname: theSurname.value,
        email: theEmail.value,
        phone: thePhone.value

    };
    saveContactsToBackend();
    closePopUp('p-container');
    showContact(id);
}

/**
 * This function is used to draw the single contact list
 * @param singleContact - Every single contact
 * @param i - counter
 * @returns {string} - returns the HTML structure
 */
function drawSmallSingleContact(singleContact, i) {
    let nameInitials = getInitials(singleContact.name);
    let surnameInitials = getInitials(singleContact.surname);

    //TODO Breadcrumb nur 1x anzeigen wenn die Anfangsbuchstaben vom Namen identisch sind
    // 1. return `
    // 2.     ${nameInitials == lastInitial ?
    // 3.     `<div class="letter-breadcrumb">${nameInitials}</div>`
    // 4.     : 'Nein'}`

    return `
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

function showContact(id) {
    toggleClass(".contact-mail");
    let container = document.getElementById("the-contact");
    container.innerHTML = "";
    let singleContact = contacts[id];
    container.innerHTML += drawSingleContact(singleContact, id);
}

/**
 * This function is used to toggle a class
 * @param theClass - The class to search
 */
function toggleClass(theClass) {
    const allLinks = document.querySelectorAll(theClass);
    allLinks.forEach((link, index) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            let currentActiveLink = document.querySelector('.active');
            if (currentActiveLink) {
                currentActiveLink.classList.remove('active');
            }
            link.classList.add('active');
        });
        if (index === 0 && !document.querySelector('.active')) {
            link.classList.add('active');
        }
    });
}

/**
 * This functions is used to get the Initials of an element
 * @param element - The element to get the initials
 * @returns {string} - Returns the string
 */
function getInitials(element) {
    return element.charAt(0);
}

/**
 * This function is used to open/show a container/element
 * @param containerToOpen - The element to show
 */

function showPopUp(containerToOpen) {
    let element = document.getElementById(containerToOpen);
    element.style.display = "block";
}

/**
 * This function is used to close/hide a container/element
 * @param containerToClose - The element to close
 */

function closePopUp(containerToClose) {
    let element = document.getElementById(containerToClose);
    element.style.display = "none";
}


function editContact(id) {
    let mainContainer = document.getElementById("contact-popup");
    showPopUp("p-container");
    mainContainer.innerHTML = "";
    mainContainer.innerHTML += drawModifyContactTemplate(id);
}

/**
 * This function is used to draw the single contact
 * @param singleContact - The single contact
 * @returns {string}
 */

function drawSingleContact(singleContact, id) {
    let nameInitials = getInitials(singleContact.name);
    let surnameInitials = getInitials(singleContact.surname);
    return `
    <div class="the-user">
        <div class="the-user-head">
            <div class="the-user-img">
                <span class="contact-initial ${nameInitials.toLowerCase()}${surnameInitials.toLowerCase()}">${nameInitials}${surnameInitials}</span>
            </div>
            <div class="the-user-names">
                <div class="the-user-name">${singleContact.name} ${singleContact.surname}</div>
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
                <a href="mailto:${singleContact.email}">${singleContact.email}</a><br>
                <strong>Phone</strong> <br>
                ${singleContact.phone}
            </div>
        </div>
    </div>
`;
}

function drawModifyContactTemplate(id) {
    let theContact = contacts[id];
    return `
    <div class="contact-popup-header">
        <img src="assets/img/close.svg" width="31" height="31" alt="Close" class="close-it" onclick="closePopUp('p-container');">
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

function addContact() {
    alert("hi");
}