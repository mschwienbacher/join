let priority = '';
let category = '';
let nbOfSubtasks = 0;
let data ='';

function addTask() {
    getCategory();
    let title = document.getElementById('task-title').value;
    let text = document.getElementById('task-description').value;
    getAssignedTo()
    let dueDate = document.getElementById('due-date').value;
    getSubTasks();  
    pushTask(title, text, dueDate);
}

async function pushTask(title, text, dueDate) {
    data =
    {
        category: `${category}`,
        titel: `${title}`,
        text: `${text}`,
        inCharge: [],
        initials: [],
        dueDate: `${dueDate}`,
        priority: `assets/img/${priority}.svg`,
        subtasks: [],
        alreadyDone: 0
    };
    data['inCharge'].push(assignedTo);
    data['initials'].push(initials);
    data['subtasks'].push(subtasks);
    tasksToDo.push(data);
    await saveTasksToBackend();
}

function getCategory() {
    let inputElements = document.getElementsByClassName('messageCheckbox');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            category = categories[i];
            break;
        }
    }
}

function getAssignedTo() {
    assignedTo = [];
    initials =[];
    let inputElements = document.getElementsByClassName('checkbox-contacts');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            assignedTo.push(contacts[i]['name'] + ' ' + contacts[i]['second-name']);
            firstInitial = contacts[i]['name'].charAt(0);
            secondInitial = contacts[i]['second-name'].charAt(0);
            initials.push(firstInitial+secondInitial);
        }
    }
}

function getSubTasks() {
    subtasks = [];
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
    document.getElementById('urgent-btn').style = ("background-color:#f9f9f9");
    document.getElementById('medium-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn').style = ("background-color:#f9f9f9");
    if (string != '') {
        document.getElementById(`${string}-btn`).style = ("background-color: darkgrey");
    }
}

async function saveTasksToBackend() {
    await backend.setItem('tasksToDo', JSON.stringify(tasksToDo));
    await backend.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    await backend.setItem('tasksAwaitFeedback', JSON.stringify(tasksAwaitFeedback));
    await backend.setItem('tasksDone', JSON.stringify(tasksDone));
}

async function loadTasksFromBackend() {
    tasksToDo = await JSON.parse(backend.getItem('tasksToDo')) || [];
    tasksInProgress = await JSON.parse(backend.getItem('tasksInProgress')) || [];
    tasksAwaitFeedback = await JSON.parse(backend.getItem('tasksAwaitFeedback')) || [];
    tasksDone = await JSON.parse(backend.getItem('tasksDone')) || [];    
}