let priority = '';
let category = '';
let nbOfSubtasks = 0;

function addTask() {
    getCategory();
    let title = document.getElementById('task-title').value;
    let text = document.getElementById('task-description').value;
    getAssignedTo()
    let dueDate = document.getElementById('due-date').value;
    getSubTasks();
    nbOfSubtasks = 0;
}

function getCategory() {
    let checkedValue = null;
    let inputElements = document.getElementsByClassName('messageCheckbox');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue = inputElements[i].value;
            category = categories[i];
            break;
        }
    }
}

function getAssignedTo() {
    let checkedValue = null;
    let inputElements = document.getElementsByClassName('checkbox-contacts');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkedValue = inputElements[i].value;
            assignedTo.push(contacts[i]['name'] + contacts[i]['second-name']);
            console.log(assignedTo);
        }
    }
}

function getSubTasks() {
    let checkedValue = null;
    let inputElements = document.getElementsByClassName('checkbox-subtask');
    for (let i = 0; inputElements[i]; ++i) {
        subtask = document.getElementById(`${i}`).innerHTML;
        subtasks.push(subtask);
        }
    }


function openContactsToAssign() {
    document.getElementById('list-assigned-to').classList.toggle('d-none');
}


function openTaskCategory() {
    document.getElementById('list-task-category').classList.toggle('d-none');
}


function renderAddTask() {
    renderListAssignedTo();
    renderListTaskCategory();
}

function renderListAssignedTo() {
    let content = document.getElementById('checkbox-list-assigned-to');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++)
        content.innerHTML +=
            htmlTemplateListAssignedTo(i);
}


function renderListTaskCategory() {
    content = document.getElementById('list-task-category');
    content.innerHTML = '';
    content.innerHTML =
        htmlTemplateCategory();
}


function renderSubtasks() {
    let content = document.getElementById('task-subtask');
    newtaskSubtask = content.value;
    if (newtaskSubtask.length > 0) {
        document.getElementById('ckeckbox-subtasks').innerHTML +=
            htmlTemplateSubtasks(newtaskSubtask, nbOfSubtasks)
            nbOfSubtasks++;
    }
    content.value = '';
}

function clearAddTaskForm() {
    document.getElementById('task-title').value = '';
    renderListAssignedTo();
    document.getElementById('due-date').value = "";
    renderListTaskCategory();
    setPriority('');
    document.getElementById('task-description').value = '';
    document.getElementById('ckeckbox-subtasks').innerHTML = '';
    nbOfSubtasks = 0;
}

function setPriority(string) {
    priority = string;
}