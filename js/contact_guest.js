let contacts = []
let sortedContacts = sortContactsAndSave(contacts);

async function loadContactFromBackEnd() {
    setTimeout(() => {
        let contactsTransform = backend.getItem('contacts') || []
        sortedContacts = JSON.parse(contactsTransform) || []
        renderTheQuestContacts();
    }, 300)
}

loadContactFromBackEnd()


// render the contacts
function renderTheQuestContacts() {
    sortedContacts = sortContactsAndSave(sortedContacts)
    document.getElementById('show-contacts-quest').innerHTML = ``
    for (i = 0; i < sortedContacts.length; i++) {
        document.getElementById('show-contacts-quest').innerHTML += `
        ${letterSortSet(i)}
    <div id="contact${i}" onclick="showDetail(${i})" class="contact-card-quest">
        <div id="userBackgroundId${i}" style="background-color: ${getRandomColor()};" class="embleme-designe">
            <span>${getTheFirstLetterOfName(i)}</span>
        </div>
        <div class="contact-container-name-email-designe">
            <span class="contact-card-guest-name">${sortedContacts[i]['name']} ${sortedContacts[i]['second-name']}</span>
            <span class="email-card-quest-designe">${sortedContacts[i]['email']}</span>
        </div>
    </div>`}
}

// function for giving back the first letter of the firstname and the surename
function getTheFirstLetterOfName(x) {
    let firstname = sortedContacts[x]['name'].charAt(0).toUpperCase()
    let surename = sortedContacts[x]['second-name'].charAt(0).toUpperCase()
    let firstletterFullName = firstname + surename
    return firstletterFullName
}

// sorting the contacts
function sortContactsAndSave(contacts) {
    let sortedContacts = contacts.slice();
    sortedContacts.sort(function (a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return sortedContacts;
}

// showing the details of a contact: full name, email, telephone number
function showDetail(j) {
    showChosenContact(j);
    document.getElementById('detail-information-screen').innerHTML = `
    <img onclick="closeDetail()" id="close-detail-arrow" src="assets/img/arrow-back.svg" alt="">
    <div class="name-and-embleme-container">
        <div style="background-color:${getBackgroundColor(document.getElementById(`userBackgroundId${j}`))};" class="detail-embleme">
            <span>${getTheFirstLetterOfName(j)}</span>
        </div>
        <div>
            <p class="detail-name"><span>${sortedContacts[j]['name']}</span><span> ${sortedContacts[j]['second-name']}</span></p>
            <p onclick="openAddTask(${j})" class="add-task-desgine clickable">Add Task</p>
        </div>
    </div>
    <div id="contact-information-info-container">
        <p><span class="contact-information-designe">Contact Information</span><span class="clickable" onclick="openEdit(${j})"><img class="edit-pic" src="assets/img/edit-contact.svg" alt=""></span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Email</span><span class="add-task-desgine">${sortedContacts[j]['email']}</span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Mobil</span><span>${sortedContacts[j]['tel']}</span></p>
        <div onclick="openEdit(${j})" id="edit-smartphone-button">
            <img src="assets/img/edit-button.svg" alt="">
        </div>
    </div>`

}


function openEdit(o) {
    document.getElementById('edit-window').innerHTML = `
    <div id="close-container">
        <p onclick="closeEdit()" id="close-edit-btn">
            <img src="assets/img/close-btn-edit.svg" alt="close-btn">
        </p>
    </div>
    <div class="edit-join-symbol-and-text">
        <img src="assets/img/logo-join-small.svg" alt="join symbol">
        <p>Edit contact</p>
    </div>
    <div class="embleme-and-input">
        <p style="background-color:${getBackgroundColor(document.getElementById(`userBackgroundId${o}`))};" class="embleme-edit ">${getTheFirstLetterOfName(o)}</p>
        <form>
        <div id="edit-input-field" class="input-container"><input id="nameInputEdit${o}" placeholder="Name" type="text"><img src="assets/img/contact-dummy-name.svg" alt=""></div>
        <div class="input-container"><input id="emailInputEdit${o}" placeholder="Email" type="email"><img src="assets/img/email-contacts.svg" alt=""></div>
        <div class="input-container"><input id="phoneInputEdit${o}" placeholder="Phone" type="number"><img src="assets/img/telephone-contacts.svg" alt=""></div>
    </form>
        <p onclick="saveTheEdit(${o})" class="save-edit-btn" id="save-edit-btn">Save</p>
    </div>`
    document.getElementById('edit-window').style.left = '0';
    fillEditInput(o);
    closeAdd()
}


function closeDetail() {
    if (window.innerWidth > 1340 && activShowingContact == true) {
        activShowingContact = false;
        document.getElementById('detail-information-screen').style.padding = '58px 1865px';
        document.getElementById('close-detail-arrow').style.position = 'initial';
    }
    else if (window.innerWidth < 1340 && activShowingContact == true) {
        activShowingContact = false;
        document.getElementById('detail-information-screen').style.right = '-100vw';
        document.getElementById('close-detail-arrow').style.position = 'initial';
    }
}


function fillEditInput(x) {
    document.getElementById(`nameInputEdit${x}`).value = `${sortedContacts[x]['name'].concat(" ") + sortedContacts[x]['second-name']}`
    document.getElementById(`emailInputEdit${x}`).value = `${sortedContacts[x]['email']}`
    document.getElementById(`phoneInputEdit${x}`).value = `${sortedContacts[x]['tel']}`
}


function saveTheEdit(x) {
    if (containsTwoWords(document.getElementById(`nameInputEdit${x}`).value) === true) {
        letterCounter = [];
        sortedContacts[x]['name'] = document.getElementById(`nameInputEdit${x}`).value
        sortedContacts[x]['email'] = document.getElementById(`emailInputEdit${x}`).value
        sortedContacts[x]['tel'] = document.getElementById(`phoneInputEdit${x}`).value
        document.getElementById(`edit-input-field`).style.borderColor = 'black';
        firstAndSecondNameUpdate(document.getElementById(`nameInputEdit${x}`).value, x)
        closeEdit();
        addContactToBackend()
        renderTheQuestContacts();
        showDetail(x);
    }
    else {
        openWarning();
    }
}


function closeEdit() {
    if (window.innerWidth > 1100) {
        document.getElementById('edit-window').style.left = '-50vw'
    }
    else if (window.innerWidth < 1100) {
        document.getElementById('edit-window').style.left = '-100vw'
    }
}


window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) {
        document.getElementById('edit-window').style.left = '-50vw'
        document.getElementById('add-window').style.left = '-50vw'
    }
    else if (window.innerWidth < 1100) {
        document.getElementById('edit-window').style.left = '-100vw'
        document.getElementById('add-window').style.left = '-100vw'
    }
})


// change the background of the s
let chosenContactCounter = 0;
let activShowingContact = null;
function showChosenContact(c) {
    activShowingContact = true;
    chosenContactCounter = c;
    document.getElementById('detail-information-screen').style.padding = '58px 65px';
    removeBackgroundFromUnchosed(c);
    if (window.innerWidth < 1340) {
        document.getElementById('detail-information-screen').style.padding = '0';
        document.getElementById('detail-information-screen').style.right = '0';
    }
}


window.addEventListener('resize', () => {
    if (window.innerWidth > 1340 && activShowingContact == true) {
        document.getElementById('detail-information-screen').style.padding = 'unset';
        document.getElementById('detail-information-screen').style.right = 'unset';
        document.getElementById('detail-information-screen').style.padding = '58px 65px';
    }
    else if (window.innerWidth < 1340 && activShowingContact == true) {
        document.getElementById('detail-information-screen').style.padding = '0';
        document.getElementById('detail-information-screen').style.right = '0';
    }
    else if (window.innerWidth < 1340 && activShowingContact == false) {
        document.getElementById('detail-information-screen').style.padding = '0';
        document.getElementById('detail-information-screen').style.right = '-100vw';
    }
    else if (window.innerWidth > 1340 && activShowingContact == false) {
        document.getElementById('detail-information-screen').style.padding = '58px 1865px';
        document.getElementById('detail-information-screen').style.right = 'unset';
    }
})

// the function remove and add the blue background in the contact list
function removeBackgroundFromUnchosed(k) {
    for (let index = 0; index < sortedContacts.length; index++) {
        if (index == chosenContactCounter) {
            document.getElementById(`contact${k}`).classList.add('chosed-contact')
        }
        else {
            document.getElementById(`contact${index}`).classList.remove('chosed-contact')
        }
    }
}
// load the letters of the first name into an array and return the letter
// if the letter counter bigger than 1 he return nothing
let letterCounter = [];
function letterSortSet(l) {
    let firstname = sortedContacts[i]['name'].charAt(0).toUpperCase()
    letterCounter.push(firstname)
    if (countLetter(letterCounter, firstname) < 2) {
        return `<div class="firstLetterSort">${firstname}<hr></div>`
    }
    else {
        return ``
    }
}

// this function giving back the amount of a letter
function countLetter(arr, letter) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === letter) {
            count++;
        }
    }
    return count;
}

// open the add contact window
function openAdd() {
    document.getElementById('add-window').style.left = '0';
    closeEdit()
}

// close the add contact window
function closeAdd() {
    if (window.innerWidth > 1100) {
        document.getElementById('add-window').style.left = '-50vw';
    }
    else if (window.innerWidth < 1099) {
        document.getElementById('add-window').style.left = '-100vw';
    }
    document.getElementById('addNameInput').value = ``;
    document.getElementById('addEmailInput').value = ``;
    document.getElementById('addTelephoneInput').value = ``;
}


function splitWords(inputValue) {
    const wordsArray = inputValue.split(" ");
    const firstWord = wordsArray[0];
    const secondWord = wordsArray[1];
    const resultArray = [firstWord, secondWord];
    return resultArray;
}


function firstAndSecondNameUpdate(inputVal, number) {
    const input = inputVal;
    const result = splitWords(input);
    sortedContacts[number]['name'] = result[0]
    sortedContacts[number]['second-name'] = result[1]
}

// save button for adding a new contact
function addNewContact() {
    if (containsTwoWords(document.getElementById('addNameInput').value) === true) {
        let nameAdd = splitWords(document.getElementById('addNameInput').value)
        let emailAdd = document.getElementById('addEmailInput').value
        let telephoneAdd = document.getElementById('addTelephoneInput').value
        let newContact = { "name": `${nameAdd[0]}`, "second-name": `${nameAdd[1]}`, "email": `${emailAdd}`, "tel": `${telephoneAdd}` }
        console.log(nameAdd)
        sortedContacts.push(newContact)
        letterCounter = [];
        addContactToBackend()
        renderTheQuestContacts()
        clearTheAddInput();
        closeAdd();
    }
    else {
        openWarning()
    }
}


async function addContactToBackend() {
    await backend.setItem('contacts', JSON.stringify(sortedContacts))
}


function clearTheAddInput() {
    nameAdd = document.getElementById('addNameInput').value = ``
    emailAdd = document.getElementById('addEmailInput').value = ``
    telephoneAdd = document.getElementById('addTelephoneInput').value = ``
}


function closeAddTaskContact() {
    document.getElementById('add-task-to-contact-container').style.width = '0px'
}


function openAddTask() {
    if (window.innerWidth > 600) {
        document.getElementById('add-task-to-contact-container').style.width = '600px'
    }
    else {
        document.getElementById('add-task-to-contact-container').style.width = '100%'
    }
}

// check for two words in the string
function containsTwoWords(inputString) {
    const words = inputString.trim().split(' ');
    return words.length === 2 && !words.includes('');
}


function getRandomColor() {
    const colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9", "#01FF70", "#F012BE", "#85144b", "#7FDBFF", "#001f3f", "#39CCCC", "#3D9970", "#2ECC40", "#01FF70", "#FFDC00", "#FF4136", "#85144b", "#F012BE", "#111111"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


function getBackgroundColor(element) {
    const style = window.getComputedStyle(element);
    const backgroundColor = style.getPropertyValue("background-color");

    if (backgroundColor.indexOf("rgb") !== -1) {
        return backgroundColor;
    } else {
        const hexColor = rgbToHex(backgroundColor);
        return hexColor;
    }
}


function rgbToHex(rgbColor) {
    const rgbArray = rgbColor.substring(4, rgbColor.length - 1).split(",");
    const hexArray = [];

    for (let i = 0; i < rgbArray.length; i++) {
        const hexValue = parseInt(rgbArray[i]).toString(16);
        hexArray.push(hexValue.length === 1 ? "0" + hexValue : hexValue);
    }
    return "#" + hexArray.join("");
}


function openWarning() {
    document.getElementById('warning-full-name').style.display = 'flex';
}


function closeWarningContact() {
    document.getElementById('warning-full-name').style.display = 'none';
}