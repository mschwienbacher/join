let ellpises = ['assets/img/ellipse-lightblue.svg', 'assets/img/ellipse-green.svg', 'assets/img/ellipse-red.svg', 'assets/img/ellipse-blue.svg', 'assets/img/ellipse-orange.svg'];
let categories = ['Backoffice', 'Design', 'Marketing', 'Media', 'Sales'];
let priority = 'low';
let category = '';
let nbOfSubtasks = 0;
let data ='';

async function addTask() {
    getCategory();
    let title = document.getElementById('task-title').value;
    let text = document.getElementById('task-description').value;
    getAssignedTo()
    let dueDate = document.getElementById('due-date').value;
    getSubTasks();  
    await pushTask(title, text, dueDate);
    window.location.href = "board.html";
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
        priorityByName: `${priority}`,
        subtasks: [],
        alreadyDone: []
    };
    getInCharge();    
    getSubtasksForm();   
    getSubtasksChecked()
    tasksToDo.push(data);
    await saveTasksToBackend();
}

function getInCharge(){
    for (let i = 0; i < assignedTo.length; i++){
        data['inCharge'].push(assignedTo[i]);
        data['initials'].push(initials[i]);
    }
}

function getSubtasksForm(){
    for ( let i = 0; i < subtasks.length; i++){
        data['subtasks'].push(subtasks[i]);
    } 
}

function getSubtasksChecked(){
    let checkboxChecked = [];
    let inputElements = document.getElementsByClassName('checkbox-subtask');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxChecked.push(1);
        }else{
            checkboxChecked.push(0);
        }
    }
    for (let i = 0; i < checkboxChecked.length; i++){
        data['alreadyDone'].push(checkboxChecked[i]);
    }    
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
            initials.push(contacts[i]['name'].charAt(0)+contacts[i]['second-name'].charAt(0));
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
    loadTasksFromBackend();
    /* renderListAssignedTo();
    renderListTaskCategory(); */
}

function renderListAssignedTo() {
    let content = document.getElementById('checkbox-list-assigned-to');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++)
        content.innerHTML +=
            htmlTemplateListAssignedTo(i);
}


function renderListTaskCategory() {
    content = document.getElementById('category-row').innerHTML = '';
    for (let i = 0; i < categories.length; i++){
        categoryToRender = categories[i];
        ellipseToRender = ellpises[i];
        document.getElementById('category-row').innerHTML +=
            htmlTemplateCategory(categoryToRender, ellipseToRender)  
    }
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
    resetPriorityBtn();
    switch (string){
        
        case 'low':
            document.getElementById('low-btn').style = ("background-color:#7AE229");
            document.getElementById('low-btn-img').src = "assets/img/low-white.svg";
            break;

        case 'medium':
            document.getElementById('medium-btn').style = ("background-color:#FFA800");  
            document.getElementById('medium-btn-img').src = "assets/img/medium-white.svg";
            break;

        case 'urgent':
            document.getElementById('urgent-btn').style = ("background-color:#FF3D00");
            document.getElementById('urgent-btn-img').src ="assets/img/urgent-white.svg";
            break;
    }
}

function resetPriorityBtn(){
    document.getElementById('urgent-btn').style = ("background-color:#f9f9f9");
    document.getElementById('medium-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn-img').src = "assets/img/low.svg";
    document.getElementById('medium-btn-img').src = "assets/img/medium.svg";
    document.getElementById('urgent-btn-img').src ="assets/img/urgent.svg";
}

async function saveTasksToBackend() {
    await backend.setItem('tasksToDo', JSON.stringify(tasksToDo));
    await backend.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    await backend.setItem('tasksAwaitFeedback', JSON.stringify(tasksAwaitFeedback));
    await backend.setItem('tasksDone', JSON.stringify(tasksDone));
}