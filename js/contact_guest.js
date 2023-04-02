// list of contacts

let contacts = [
    {
        "name": "Tim",
        "second-name": "Mellentin",
        "email": "tim.spiele1@freenet.de",
        "tel": "0491094309434"
    },
    {
        "name": "Max",
        "second-name": "Mustermann",
        "email": "max.mannmuster@freenet.de",
        "tel": "049109454345"
    },
    {
        "name": "Freddy",
        "second-name": "Mercury",
        "email": "antotherone@bite-the-dust.de",
        "tel": "04919461991"
    },
    {
        "name": "Marianen",
        "second-name": "Graben",
        "email": "Marianen@freenet.de",
        "tel": "04924002500"
    },
    {
        "name": "Ti",
        "second-name": "Anic",
        "email": "ti.tanic@freenet.de",
        "tel": "04910031912"
    },
    {
        "name": "Andi",
        "second-name": "Myer",
        "email": "andi.myer@freenet.de",
        "tel": "049100345345"
    },
    {
        "name": "Rudolf",
        "second-name": "Rentier",
        "email": "rudolf.coKG@freenet.de",
        "tel": "049100334532"
    }
]


// render the contacts
function renderTheQuestContacts() {
    sortedContacts = sortContactsAndSave(sortedContacts)
    document.getElementById('show-contacts-quest').innerHTML = ``
    for (i = 0; i < sortedContacts.length; i++) {
        document.getElementById('show-contacts-quest').innerHTML += `
        ${letterSortSet(i)}
    <div id="contact${i}" onclick="showDetail(${i})" class="contact-card-quest">
        <div class="embleme-designe">
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
    <div class="name-and-embleme-container">
        <div class="detail-embleme">
            <span>${getTheFirstLetterOfName(j)}</span>
        </div>
        <div>
            <p class="detail-name"><span>${sortedContacts[j]['name']}</span><span> ${sortedContacts[j]['second-name']}</span></p>
            <p class="add-task-desgine">Add Task</p>
        </div>
    </div>
    <div>
        <p><span class="contact-information-designe">Contact Information</span><span class="clickable" onclick="openEdit(${j})"><img src="assets/img/edit-contact.svg" alt=""></span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Email</span><span class="add-task-desgine">${sortedContacts[j]['email']}</span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Mobil</span><span>${sortedContacts[j]['tel']}</span></p>
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
        <p class="embleme-edit ">${getTheFirstLetterOfName(o)}</p>
        <form>
        <div class="input-container"><input id="nameInputEdit${o}" placeholder="Name" type="text"><img src="assets/img/contact-dummy-name.svg" alt=""></div>
        <div class="input-container"><input id="emailInputEdit${o}" placeholder="Email" type="email"><img src="assets/img/email-contacts.svg" alt=""></div>
        <div class="input-container"><input id="phoneInputEdit${o}" placeholder="Phone" type="number"><img src="assets/img/telephone-contacts.svg" alt=""></div>
    </form>
        <p onclick="saveTheEdit(${o})" class="save-edit-btn" id="save-edit-btn">Save</p>
    </div>`
    document.getElementById('edit-window').style.left = '0';
    fillEditInput(o);
}

function fillEditInput(x) {
    document.getElementById(`nameInputEdit${x}`).value = `${sortedContacts[x]['name'].concat(" ") + sortedContacts[x]['second-name']}`
    document.getElementById(`emailInputEdit${x}`).value = `${sortedContacts[x]['email']}`
    document.getElementById(`phoneInputEdit${x}`).value = `${sortedContacts[x]['tel']}`
}

function saveTheEdit(x) {
    letterCounter = [];
    sortedContacts[x]['name'] = document.getElementById(`nameInputEdit${x}`).value
    sortedContacts[x]['email'] = document.getElementById(`emailInputEdit${x}`).value
    sortedContacts[x]['tel'] = document.getElementById(`phoneInputEdit${x}`).value
    firstAndSecondNameUpdate(document.getElementById(`nameInputEdit${x}`).value , x)
    closeEdit();
    renderTheQuestContacts(); 
    showDetail(x);
}


function closeEdit() {
    document.getElementById('edit-window').style.left = '-50vw'
}


// change the background of the s
let chosenContactCounter;
function showChosenContact(c) {
    chosenContactCounter = c;
    document.getElementById('detail-information-screen').style.padding = '58px 65px';
    removeBackgroundFromUnchosed(c);
}


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
}

// close the add contact window
function closeAdd() {
    document.getElementById('add-window').style.left = '-50vw';
}


let sortedContacts = sortContactsAndSave(contacts);
renderTheQuestContacts();


function splitWords(inputValue) {
    const wordsArray = inputValue.split(" ");
    const firstWord = wordsArray[0];
    const secondWord = wordsArray[1];
    const resultArray = [firstWord, secondWord];
    return resultArray;
}

function firstAndSecondNameUpdate(inputVal , number) {
    const input = inputVal;
    const result = splitWords(input);
    sortedContacts[number]['name'] = result[0]
    sortedContacts[number]['second-name'] = result[1]
}
