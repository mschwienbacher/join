let counter = 0;
let tasks = [];
let taskUsers = [];
let taskSubTasks = [];

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

/**
 * This function is used to save the Tasks in the backend
 * @returns {Promise<void>}
 */
async function saveTasksToBackend() {
    let tasksToString = JSON.stringify(tasks);
    await backend.setItem("tasks", tasksToString) || [];
}

async function saveCategoriesToBackend() {
    let categoriesToString = JSON.stringify(category);
    await backend.setItem("category", categoriesToString) || [];
}

/**
 * This function is called on body load
 * @returns {Promise<void>}
 */
async function initTasks() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    category = JSON.parse(backend.getItem('category')) || [];
    saveCategoriesToBackend();
    await includeHTML();
    loadExistingContacts();
    loadCategories();
}

/**
 * This function is used to show the existing contacts in the contact selection field
 * @returns {Promise<void>}
 */
async function loadExistingContacts() {
    let container = document.getElementById("opener-contacts");
    allContacts.sort((a, b) => {if (a.name < b.name) {return -1;}}); // Sort the contacts
    if(allContacts.length > 0) {
        for(let i = 0; i < allContacts.length; i++) {
            let theContact = allContacts[i];
            container.innerHTML += templateLoadContacts(i, theContact);
        }
    } else {
        container.innerHTML += `<label class="flex red">There are no contacts in the database!</label>`;
    }
    container.innerHTML += `<label class="flex"><a href="contacts_michael.html" title="Invite">Invite a new contact</a></label>`;
}

/**
 * This function is used to load the already existing categories
 */
function loadCategories() {
    let container = document.getElementById("opener-category");
    container.innerHTML = "";
    if(category.length > 0) {
        for(let i = 0; i < category.length; i++) {
            let theCategory = category[i];
            container.innerHTML += templateLoadCategories(i, theCategory);
        }
    }
    container.innerHTML += `<span class="flex" id="new-category"><a href="javascript:void(0);" title="Add a new category" onclick="generateColorPalette();">Add a new category</a></span>`;
}

/**
 * This function is used to show the selected category in the textfield
 * @param i
 */
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

/**
 * Open/Close element
 * @param element
 */
function showSelectDetails(element) {
    let theElement = document.getElementById(element);
    if(theElement.classList.contains('show-me')) {
        theElement.classList.remove("show-me");
    } else {
        theElement.classList.add("show-me");
    }
}

/**
 * This function is used to show the color palette
 */
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
    mainContainer.innerHTML = templateAddNewCategory(i, colorPalette);

}

function addCategoryToList(i) {
    let newCategoryToAdd = document.getElementById("add-new-category");
        if(!newCategoryToAdd.value == "") {
        category.push({
            "name": newCategoryToAdd.value,
            "color": colorPalette[i]
        });
        clearCategory();
    } else {
            alert("Your category needs a name!");
    }
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
            <label class="flex subt" for="subtask-${counter}"><input checked="true" onclick="checkCheckbox('subtask-', ${counter});" type="checkbox" name="${theSubTask.value}" id="subtask-${counter}"> ${theSubTask.value}</label>
        `;
        theSubTask.value = "";
        counter++;
    } else {
        alert("Your subtask need a name!");
    }
}

function checkCheckbox(element, id) {
    var checkBox = document.getElementById(element + id);
    if (checkBox.getAttribute("checked") == null || checkBox.getAttribute("checked") == "false"){
        checkBox.setAttribute("checked", true);
    } else {
        checkBox.removeAttribute("checked");
    }
}

function clearSubTask() {
    let theSubTask = document.getElementById("add-subtask");
    theSubTask.value = "";
}

function saveTheTask() {
    let taskTitle = document.getElementById("task-title");
    getUsersForTasks();
    let taskDate = getTaskDate();
    let theTaskCategory = getTaskCategory();
    let taskPriority = getPriorityValue();
    let taskDescription = document.getElementById("task-decription");
    getTaskSubTasks();
    tasks.push({
        "title": taskTitle.value,
        "users": taskUsers,
        "date": taskDate,
        "category": theTaskCategory,
        "priority": taskPriority,
        "description": taskDescription.value,
        "subtasks": taskSubTasks,
        "status": "ToDo"
    });
    saveCategoriesToBackend();
    saveTasksToBackend();
    setTimeout(function() {window.location.href = "add_task_michael.html";}, 500);
}

function getTaskCategory() {
    let categoryDiv = document.getElementById("selectedText");
    if(categoryDiv.textContent != "Select task category") {
        return categoryDiv.textContent;
    } else {
        return "";
        alert("Selecting the category is required!");
    }
}

function getPriorityValue() {
    let buttons = document.querySelectorAll("button.priority");
    let isSelected = false;
    for(let i = 0; i < buttons.length ; i++) {
        if (buttons[i].classList.contains("selected")) {
            isSelected = true;
            return buttons[i].name;
            break;
        }
    }
    if (!isSelected) {
        alert("Please select the priority of the task");
        return "";
    }
}

function getTaskDate() {
    let taskDate = document.getElementById("task-date").value;
    const dateObj = new Date(Date.parse(taskDate));
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

function getUsersForTasks() {
    let theUsers = document.querySelectorAll("input.users");
    let isSelected = false;
    let fullUsers = [];
        for(let i = 0; i < theUsers.length; i++) {
            let singleUser = theUsers[i];
                if(singleUser.checked == true) {
                    isSelected = true;
                    fullUsers.push(singleUser.name);
                } else {
                    taskUsers = [];
                }
        }
        taskUsers.push(fullUsers);
        if (!isSelected) {
            alert("Please select a contact to assign the task");
        }
}


function getTaskSubTasks() {
    // TODO: Wenn ich mehrere Aktionen durchführen macht es Probleme
    let subtasks = document.querySelectorAll("label.subt input");
    let subTaskList = [];
        for(let i = 0; i < subtasks.length; i++) {
            let subtask = subtasks[i];
            if(subtask.checked == true) {
                subTaskList.push(subtask.name);
            } else {
                taskSubTasks = [];
            }
        }
        taskSubTasks.push(subTaskList);
}

/**
 * Template for loading the contacts
 * @param i
 * @param theContact
 * @returns {string}
 */
function templateLoadContacts(i, theContact) {
    return `<label class="flex" for="contact-${i}"> ${theContact.name} ${theContact.surname} <input type="checkbox" onclick="checkCheckbox('contact-', ${i});" name="${theContact.name} ${theContact.surname}" id="contact-${i}" class="users"></label>`;
}

/**
 * Template for loading the categories
 */
function templateLoadCategories(i, theCategory) {
    return `<span class="flex" id="category-${i}" onclick="selectedCategory(${i});">${theCategory.name} <span class="circle" style="background: ${theCategory.color} ;"></span>`;
}


/**
 * Template for adding new category
 * @param i
 * @param colorPalette
 * @returns {string}
 */
function templateAddNewCategory(i, colorPalette) {
    return `
        <input type="text" name="add-new-category" placeholder="New category name..." id="add-new-category">
        <span class="circle newone" style="background:${colorPalette[i]}"></span><span class="divider"></span><img src="assets/img/close.svg" onclick="clearCategory();" width="25" height="25" class="blueone" alt=""><span class="divider"></span><img src="assets/img/ok.svg" onclick="addCategoryToList(${i});" width="25" height="25" class="blueone" alt="">
    `;
}