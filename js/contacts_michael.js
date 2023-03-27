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
        // TODO hier problem, showFullContact übergibt ein Object...ändern
        container.innerHTML += `
            <div class="letter-breadcrumb">${nameInitials}</div>
            <div class="single-contact"> 
                <a href="javascript:void(0);" onclick="showFullContact(${singleContact}, ${i});" class="contact-mail" id="showed-${i}" title="${singleContact.name} ${singleContact.surname}">
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

function showFullContact(singleContact, id) {
    console.log(singleContact, id);
    toggleClass(".contact-mail");
    let container = document.getElementById("the-contact");
    container.innerHTML = "";

    //TODO hier problem, singleContact ist leer....
    let theContact = singleContact[id];
    console.log(theContact);
    let nameInitials = getInitials(theContact.name);
    let surnameInitials = getInitials(theContact.surname);

    container.innerHTML += `
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