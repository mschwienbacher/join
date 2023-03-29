let counter = 0;
let tasks = [{}];
let taskUsers = [];

let category = [
    {
        name: "Backoffice",
        color: "#1FD7C1"
    },
    {
        name: "Design",
        color: "#FF7A00"
    },
    {
        name: "Sales",
        color: "#FC71FF"
    }
];

let colorPalette = ["#ffb5ba", "#fae5da", "#bbded7", "#8bc6d2"]

async function initTasks() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    await includeHTML();
    loadExistingContacts();
    loadCategories();
}

async function loadExistingContacts() {
    let container = document.getElementById("opener-contacts");
    allContacts.sort((a, b) => {if (a.name < b.name) {return -1;}});
    if(allContacts.length > 0) {
        for(let i = 0; i < allContacts.length; i++) {
            let theContact = allContacts[i];
            container.innerHTML += `
                <label class="flex" for="contact-${i}"> ${theContact.name} ${theContact.surname} <input type="checkbox" name="${theContact.name} ${theContact.surname}" id="contact-${i}" class="users"></label>
            `;
        }
    } else {
        container.innerHTML += `
                <label class="flex red">There are no contacts in the database!</label>
        `;
    }
    container.innerHTML += `<label class="flex"><a href="contacts_michael.html" title="Invite">Invite a new contact</a></label>`;
}

function loadCategories() {
    let container = document.getElementById("opener-category");
    container.innerHTML = "";
    if(category.length > 0) {
        for(let i = 0; i < category.length; i++) {
            let theCategory = category[i];
            container.innerHTML += `
                <span class="flex" id="category-${i}" onclick="selectedCategory(${i});">${theCategory.name} <span class="circle" style="background: ${theCategory.color} ;"></span>
            `;
        }
    }
    container.innerHTML += `<span class="flex" id="new-category"><a href="javascript:void(0);" title="Add a new category" onclick="generateColorPalette();">Add a new category</a></span>`;
}

function selectedCategory(i) {
    let items = document.querySelectorAll("span.flex");
    for(let i = 0; i < items.length ; i++) {
        items[i].classList.remove('selected');
    }
    let clickedElement = document.getElementById("category-" + i);
    clickedElement.classList.add("selected");
    showSelectDetails('opener-category');
    let textContainer = document.getElementById("selectedText");
    textContainer.innerHTML = `${category[i].name} <span class="circle" style="background:${category[i].color}"></span>`;
}

function showSelectDetails(element) {
    let theElement = document.getElementById(element);
    if(theElement.classList.contains('show-me')) {
        theElement.classList.remove("show-me");
    } else {
        theElement.classList.add("show-me");
    }
}

function generateColorPalette() {
    let colorContainer = document.getElementById("opener-category");
    colorContainer.innerHTML = `Select the color of the new category`;
    for(let i = 0; i < colorPalette.length; i++) {
        let singleCircle = colorPalette[i];
        colorContainer.innerHTML += `<span class="circle inline-block" id="thecircle-${i}" style="background:${singleCircle};" onclick="addNewCategory(${i});"></span>`;
    }
}

function addNewCategory(i) {
    let activeColor = document.getElementById("thecircle-" + i);
    let items = document.querySelectorAll("span.inline-block");
    let mainContainer = document.getElementById("form-opener-category");

    for(let i = 0; i < items.length ; i++) {
        items[i].classList.remove('selected');
    }
    activeColor.classList.add("selected");
    mainContainer.removeAttribute("onclick");
    mainContainer.innerHTML = `
        <input type="text" name="add-new-category" placeholder="New category name..." id="add-new-category">
        <span class="circle newone" style="background:${colorPalette[i]}"></span><span class="divider"></span><img src="assets/img/close.svg" onclick="clearCategory();" width="25" height="25" class="blueone" alt=""><span class="divider"></span><img src="assets/img/ok.svg" onclick="addCategoryToList(${i});" width="25" height="25" class="blueone" alt="">
    `;
}

function addCategoryToList(i) {
    let newCategoryToAdd = document.getElementById("add-new-category");
        if(!newCategoryToAdd.value == "") {
        category.push({
            "name": newCategoryToAdd.value,
            "color": colorPalette[i]
        })
        clearCategory();
    } else {
            alert("Your category needs a name!");
        }
    // TODO - SAVE TO BACKEND!
}

function clearCategory() {
    let mainContainer = document.getElementById("form-opener-category");
    mainContainer.setAttribute("onclick", "showSelectDetails('opener-category')");
    mainContainer.innerHTML = `<span id="selectedText">Select task category <span class="circle"></span></span> <img src="assets/img/arrow-down.svg" alt="Arrow">`;
    loadCategories();
}

function selectedElement(id) {
    let items = document.querySelectorAll("button");
    for(let i = 0; i < items.length ; i++) {
        items[i].classList.remove('selected');
    }
    let clickedElement = document.getElementById("status-" + id);
    clickedElement.classList.add("selected");
}

function addSubTaskToList() {
    let theSubTask = document.getElementById("add-subtask"); // to get the value
    let subTaskContainer = document.getElementById("opener-subtasks");
    subTaskContainer.classList.add("show-me");
    if(theSubTask.value != "") {
        subTaskContainer.innerHTML += `
            <label class="flex subt" for="subtask-${counter}"><input checked type="checkbox" name="${theSubTask.value}" id="subtask-${counter}"> ${theSubTask.value}</label>
        `;
        theSubTask.value = "";
        counter++;
    } else {
        alert("Your subtask need a name!");
    }

}

function clearSubTask() {
    let theSubTask = document.getElementById("add-subtask");
    theSubTask.value = "";
}

function saveTheTask() {
    let taskTitle = document.getElementById("task-title");
    getUsersForTasks();

    // TODO: Daten sammeln, weiter mit DATE
    let taskDate = document.getElementById("task-date");
    let formattedTaskDate = taskDate.getDate() + '-' + (taskDate.getMonth() + 1) + '-' + taskDate.getFullYear();
    console.log(formattedTaskDate);
}

function getUsersForTasks() {
    let theUsers = document.querySelectorAll("input.users");
    for(let i = 0; i < theUsers.length; i++) {
        let singleUser = theUsers[i];
        if(singleUser.checked == true) {
            console.log(singleUser.name);
            taskUsers.push(singleUser.name);
        }
    }

}