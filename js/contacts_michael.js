let contacts = [
    {
        name: "Michael",
        surname: "Schwienbacher",
        email: "me@schwim.me",
        phone: "+39 3389877282"
    },
    {
        name: "Jörg",
        surname: "Benz",
        email: "joergbetz@web.de",
        phone: "+49 0000000001"
    },
    {
        name: "Jörg2",
        surname: "Benz2",
        email: "joergbetz@web.de2",
        phone: "+49 0000000003"
    },
    {
        name: "Tim",
        surname: "Mellentin",
        email: "timmellentin@freenet.de",
        phone: "+49 0000000002"
    }
];

async function saveContactsToBackend() {
    let contactsAsString = JSON.stringify(contacts);
    await backend.setItem("userContacts", contactsAsString);
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
        contactList.innerHTML += drawSingleContact(singleContact, i);
    }
}

/**
 * This function is used to draw the single contact list
 * @param singleContact - Every single contact
 * @param i - counter
 * @returns {string} - returns the HTML structure
 */
function drawSingleContact(singleContact, i) {
    let nameInitials = singleContact.name.charAt(0);
    let surnameInitials = singleContact.surname.charAt(0);
    //TODO Breadcrumb nur 1x anzeigen wenn die Anfangsbuchstaben vom Namen identisch sind
    // 1. return `
    // 2.     ${nameInitials == lastInitial ?
    // 3.     `<div class="letter-breadcrumb">${nameInitials}</div>`
    // 4.     : 'Nein'}`

    return `
        <div class="single-contact">
            <a href="javascript:void(0);" class="contact-mail">
                <span class="contact-initial ${nameInitials.toLowerCase()}${surnameInitials.toLowerCase()}">${nameInitials}${surnameInitials}</span>
                <span class="contact-names">
                    ${singleContact.name} ${singleContact.surname} <br><strong>${singleContact.email}</strong>
                </span>
            </a>
        </div>
    `;
}