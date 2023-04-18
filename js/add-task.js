let ellipses = ['assets/img/ellipse-lightblue.svg', 'assets/img/ellipse-green.svg', 'assets/img/ellipse-red.svg', 'assets/img/ellipse-blue.svg', 'assets/img/ellipse-orange.svg', 'assets/img/ellipse-violet.svg'];
let ellipsesColors = ['#8AA4FF', '#2AD300', '#FF0000', '#0038FF', '#FF8A00', '#E200BE'];
/* let categories = ['Backoffice', 'Design', 'Marketing', 'Media', 'Sales'];
let categoriesBackground = ['lightblue', 'green', 'red', 'blue', 'orange'];
let categoryColors = ['assets/img/ellipse-lightblue.svg', 'assets/img/ellipse-green.svg', 'assets/img/ellipse-red.svg', 'assets/img/ellipse-blue.svg', 'assets/img/ellipse-orange.svg']; */
let priority = 'low';
let category = '';
let nbOfSubtasks = 0;
let data = '';


/**
 * This function adds a task to the board's To Do list
 * 
 */
async function addTask() {
    let title = document.getElementById('task-title').value;
    let text = document.getElementById('task-description').value;
    let dueDate = document.getElementById('due-date').value;
    getSubTasks();
    await pushTask(title, text, dueDate);
    window.location.href = "board.html";
}

/**
 * This function pushes all data of a new task in the array taskToDo and sves them in the backend
 * 
 * @param {string} title 
 * @param {string} text 
 * @param {date} dueDate 
 */
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
    getCheckboxes()
    await saveNewTaskinFolder(data);
}

/**
 * this function searchs for checked ckeckboxes
 * 
 */
function getCheckboxes(){
    getInCharge();
    getSubtasksForm();
    getSubtasksChecked();
}

/**
 * this function pushes the new task in the choosen tasklist
 * 
 * @param {Array} data 
 */
async function saveNewTaskinFolder(data){
    switch(containerToAdd) {
        case ('toDo'):
            tasksToDo.push(data);
            break;
        case ('inProgress'):
            tasksInProgress.push(data);
            break;
        case ('awaitFeedback'):
            tasksAwaitFeedback.push(data);
            break;
        case ('done'):
            tasksDone.push(data);
            break;
    }
    await saveTasksToBackend();
}

/**
 * this function pushes the array of people assigned to the task in the data array
 * 
 */
function getInCharge() {
    for (let i = 0; i < assignedTo.length; i++) {
        data['inCharge'].push(assignedTo[i]);
        data['initials'].push(initials[i]);
    }
}

/**
 * this function registers the new added subtasks in the data array
 * 
 */
function getSubtasksForm() {
    for (let i = 0; i < subtasks.length; i++) {
        data['subtasks'].push(subtasks[i]);
    }
}

/**
 * this function checks if there are crossed subtasks
 * 
 */
function getSubtasksChecked() {
    let checkboxChecked = [];
    let inputElements = document.getElementsByClassName('checkbox-subtask');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxChecked.push(1);
        } else {
            checkboxChecked.push(0);
        }
    }
    for (let i = 0; i < checkboxChecked.length; i++) {
        data['alreadyDone'].push(checkboxChecked[i]);
    }
}

/**
 * this function registers the new task's category
 * 
 */
function getCategory() {
    let inputElements = document.getElementsByClassName('messageCheckbox');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            category = categories[i];
            break;
        }
    }
    checkEmptyCategory(category);
}

/**
 * this function checks if a category is selected
 * 
 * @param {string} category 
 */
function checkEmptyCategory(category){
    if (category == ''){
        document.getElementById('error-msg').classList.remove('d-none');
        document.getElementById('category-msg').classList.remove('d-none');
    }else{
        addTask();
    }
}

/**
 * this function registers the people who are assigned to the new task
 * 
 */
function getAssignedTo() {
    assignedTo = [];
    initials = [];
    let inputElements = document.getElementsByClassName('checkbox-contacts');
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            assignedTo.push(contacts[i]['name'] + ' ' + contacts[i]['second-name']);
            initials.push(contacts[i]['name'].charAt(0) + contacts[i]['second-name'].charAt(0));
        }
    }
    checkEmptyAssignedTo(assignedTo);
}

/**
 * this function checks if a contact is assigned to the task
 * 
 * @param {string} assignedTo 
 */
function checkEmptyAssignedTo(assignedTo){
    if (assignedTo ==''){
        document.getElementById('error-msg').classList.remove('d-none');
        document.getElementById('assignedTo-msg').classList.remove('d-none');
    }else{
        getCategory()
    }
}

/**
 * this function closes the error message if no contact or category is selected
 * 
 */
function closeErrorMsg(){
    document.getElementById('assignedTo-msg').classList.add('d-none');
    document.getElementById('category-msg').classList.add('d-none');
    document.getElementById('new-category-msg').classList.add('d-none');
    document.getElementById('color-msg').classList.add('d-none');
    document.getElementById('error-msg').classList.add('d-none');
}

/**
 * this function pushes all new subtasks in the subtasks array
 * 
 */
function getSubTasks() {
    subtasks = [];
    let inputElements = document.getElementsByClassName('checkbox-subtask');
    for (let i = 0; inputElements[i]; ++i) {
        subtask = document.getElementById(`${i}`).innerHTML;
        subtasks.push(subtask);
    }
}

/**
 * this function opens the name list container 
 * 
 */
function openContactsToAssign() {
    document.getElementById('list-assigned-to').classList.toggle('d-none');
}

/**
 * this function opens the category list
 * 
 */
function openTaskCategory() {
    document.getElementById('list-task-category').classList.toggle('d-none');
}

/**
 * this function renders the assigned to list
 * 
 */
function renderListAssignedTo() {
    let content = document.getElementById('checkbox-list-assigned-to');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++)
        content.innerHTML +=
            htmlTemplateListAssignedTo(i);
}

/**
 * this function renders the category list
 * 
 */
function renderListTaskCategory() {
    content = document.getElementById('category-row').innerHTML = 
        htmlTemplateNewCategory();
    for (let i = 0; i < categories.length; i++) {
        categoryToRender = categories[i];
        categoryColorToRender = categoryColors[i];
        document.getElementById('category-row').innerHTML +=
            htmlTemplateCategory(categoryToRender, categoryColorToRender)
    }
}

/**
 * this function renders the subtasks list
 * 
 */
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

/**
 * this function empties the add task form
 * 
 */
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

/**
 * this function sets the new task's priority and changes the color of the buttons
 * 
 * @param {string} string 
 */
function setPriority(string) {
    priority = string;
    resetPriorityBtn();
    switch (string) {

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
            document.getElementById('urgent-btn-img').src = "assets/img/urgent-white.svg";
            break;
    }
}

/**
 * this function resets the priority buttons' color
 * 
 */
function resetPriorityBtn() {
    document.getElementById('urgent-btn').style = ("background-color:#f9f9f9");
    document.getElementById('medium-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn').style = ("background-color:#f9f9f9");
    document.getElementById('low-btn-img').src = "assets/img/low.svg";
    document.getElementById('medium-btn-img').src = "assets/img/medium.svg";
    document.getElementById('urgent-btn-img').src = "assets/img/urgent.svg";
}

/**
 * this function renders the date picker with today´s date
 * 
 */
function renderDueDate(){
    let todayDate = new Date().toISOString().split('T')[0];
    document.getElementById('date-picker').innerHTML = 
        htmlTemplateDueDate(todayDate);
}

/**
 * this function saves all JSON arrays to the backend
 * 
 */
async function saveTasksToBackend() {
    await backend.setItem('tasksToDo', JSON.stringify(tasksToDo));
    await backend.setItem('tasksInProgress', JSON.stringify(tasksInProgress));
    await backend.setItem('tasksAwaitFeedback', JSON.stringify(tasksAwaitFeedback));
    await backend.setItem('tasksDone', JSON.stringify(tasksDone));
}