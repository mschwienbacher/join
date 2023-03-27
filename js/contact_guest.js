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
    }
]

// render the contacts
function renderTheQuestContacts() {
    document.getElementById('show-contacts-quest').innerHTML = ``
    for (i = 0; i < sortedContacts.length; i++) {
        document.getElementById('show-contacts-quest').innerHTML += `
    <div onclick="showDetail(${i})" class="contact-card-quest">
        <div class="embleme-designe">
            <span>${getTheFirstLetterOfName(i)}</span>
        </div>
        <div class="contact-container-name-email-designe">
            <span class="contact-card-guest-name">${sortedContacts[i]['name']} ${sortedContacts[i]['second-name']}</span>
            <span class="email-card-quest-designe">${sortedContacts[i]['email']}</span>
        </div>
    </div>`}
}


// function for render the first letter of the firstname and the surename
function getTheFirstLetterOfName(x) {
    let firstname = sortedContacts[x]['name'].charAt(0).toUpperCase()
    let surename = sortedContacts[x]['second-name'].charAt(0).toUpperCase()
    let firstletterFullName = firstname + surename
    return firstletterFullName
}


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


function showDetail(j) {
    document.getElementById('detail-information-screen').style.padding = '58px 65px'
    document.getElementById('detail-information-screen').innerHTML = `
    <div class="name-and-embleme-container">
        <div class="detail-embleme">
            <span>A</span>
            <span>A</span>
        </div>
        <div>
            <p class="detail-name"><span>${sortedContacts[j]['name']}</span><span> ${sortedContacts[j]['second-name']}</span></p>
            <p class="add-task-desgine">Add Task</p>
        </div>
    </div>
    <div>
        <p><span class="contact-information-designe">Contact Information</span><span>Edit Contact</span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Email</span><span class="add-task-desgine">${sortedContacts[j]['email']}</span></p>
        <p class="detail-email-designe"><span class="email-mobile-designe">Mobil</span><span>${sortedContacts[j]['tel']}</span></p>
    </div>`
}

let sortedContacts = sortContactsAndSave(contacts);
renderTheQuestContacts();