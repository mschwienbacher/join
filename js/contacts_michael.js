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
 * This function is used to save first the contact details into the backend and then call download them
 * @returns {Promise<void>}
 */
async function initContactBackend() {
    saveContactsToBackend();
    await downloadFromServer();
}

/**
 * This function is used to save contacts into the backend
 * @returns {Promise<void>}
 */
async function saveContactsToBackend() {
    let contactsAsString = JSON.stringify(contacts);
    await backend.setItem("userContacts", contactsAsString);
}

/**
 * This function is used to load the whole contact list
 */
async function loadContactList() {
    let contactList = document.getElementById("contact-list");
    contacts = contacts.sort((a, b) => {if (a.name < b.name) {return -1;}}); // Sort the contacts by name
    let lastInitial = "";
    for(let i = 0; i < contacts.length; i++) {
        let singleContact = contacts[i];
        contactList.innerHTML += drawSmallSingleContact(singleContact, i);
    }
}

/**
 * This function is used to draw the single contact list
 * @param singleContact - Every single contact
 * @param i - counter
 * @returns {string} - returns the HTML structure
 */
function drawSmallSingleContact(singleContact, i) {
    let nameInitials = singleContact.name.charAt(0);
    let surnameInitials = singleContact.surname.charAt(0);
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
    container.innerHTML += drawSingleContact(singleContact);
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

function drawSingleContact(singleContact) {
    let nameInitials = singleContact.name.charAt(0);
    let surnameInitials = singleContact.surname.charAt(0);
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
                    <a href="javascript:void(0);" onclick="alert('Noch zu machen');">
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