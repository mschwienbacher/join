let titleEdit;
let textEdit;
let dueDateEdit;
let priorityEdit;
let assignedToEdit;

/**
 * this function gets the values who can be changed
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function editTask(taskStatus, x) {
    switch (taskStatus) {
        case 'tasksToDo':
            titleEdit = tasksToDo[x]['titel'];
            textEdit = tasksToDo[x]['text'];
            dueDateEdit = tasksToDo[x]['dueDate'];
            priorityEdit = tasksToDo[x]['priorityByName'];
            assignedToEdit = tasksToDo[x]['initials'];
            subtasksToEdit = tasksToDo[x]['subtasks'];
            subtasksToEditAlreadyDone = tasksToDo[x]['alreadyDone'];
            break;

        case 'tasksInProgress':
            titleEdit = tasksInProgress[x]['titel'];
            textEdit = tasksInProgress[x]['text'];
            dueDateEdit = tasksInProgress[x]['dueDate'];
            priorityEdit = tasksInProgress[x]['priorityByName'];
            assignedToEdit = tasksInProgress[x]['initials'];
            subtasksToEdit = tasksInProgress[x]['subtasks'];
            subtasksToEditAlreadyDone = tasksInProgress[x]['alreadyDone'];
            break;

        case 'tasksAwaitFeedback':
            titleEdit = tasksAwaitFeedback[x]['titel'];
            textEdit = tasksAwaitFeedback[x]['text'];
            dueDateEdit = tasksAwaitFeedback[x]['dueDate'];
            priorityEdit = tasksAwaitFeedback[x]['priorityByName'];
            assignedToEdit = tasksAwaitFeedback[x]['initials'];
            subtasksToEdit = tasksAwaitFeedback[x]['subtasks'];
            subtasksToEditAlreadyDone = tasksAwaitFeedback[x]['alreadyDone'];
            break;

        case 'tasksDone':
            titleEdit = tasksDone[x]['titel'];
            textEdit = tasksDone[x]['text'];
            dueDateEdit = tasksDone[x]['dueDate'];
            priorityEdit = tasksDone[x]['priorityByName'];
            assignedToEdit = tasksDone[x]['initials'];
            subtasksToEdit = tasksDone[x]['subtasks'];
            subtasksToEditAlreadyDone = tasksDone[x]['alreadyDone'];
            break;
    }
    renderEditTaskCard(taskStatus, titleEdit, textEdit, dueDateEdit, subtasksToEdit, subtasksToEditAlreadyDone, x);
    setPriority(`${priorityEdit}`);
}

/**
 * this function opens and renders the task to edit while it closes the detail card
 * 
 * @param {string} taskStatus 
 * @param {string} titleEdit 
 * @param {string} textEdit 
 * @param {date} dueDateEdit 
 * @param {Array} subtasksToEdit 
 * @param {Array} subtasksToEditAlreadyDone 
 * @param {number} x 
 */
function renderEditTaskCard(taskStatus, titleEdit, textEdit, dueDateEdit, subtasksToEdit, subtasksToEditAlreadyDone, x){
    let year = dueDateEdit.substring(0, 4);
    let month = dueDateEdit.substring(5, 7);
    let day = dueDateEdit.substring(8, 10);
    document.getElementById('details').classList.add('d-none');
    document.getElementById('edit-task').classList.remove('d-none');
    document.getElementById('edit-task-popup').innerHTML = '';
    document.getElementById('edit-task-popup').innerHTML +=
        htmlTemplateTaskToEdit(titleEdit, year, month, day, taskStatus, x);
    document.getElementById('textarea-edit').value = textEdit;
    document.getElementById('subtask-to-edit').innerHTML = '';
    renderSubtasksEditTaskCard(subtasksToEdit, subtasksToEditAlreadyDone);
}

/**
 * this function renders the subtasks on the edit card
 * 
 * @param {Array} subtasksToEdit 
 * @param {Array} subtasksToEditAlreadyDone 
 */
function renderSubtasksEditTaskCard(subtasksToEdit, subtasksToEditAlreadyDone){
    for (let i = 0; i < subtasksToEdit.length; i++) {
        if (subtasksToEditAlreadyDone[i] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        }
        document.getElementById('subtask-to-edit').innerHTML +=
            htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus);
    }
    renderAssignedToEditTaskCard(assignedToEdit);
}

/**
 * this function renders the people the task is assigned to
 * 
 * @param {Array} assignedToEdit 
 */
function renderAssignedToEditTaskCard(assignedToEdit){
    document.getElementById('persons-to-edit').innerHTML = '';
    for (let j = 0; j < assignedToEdit.length; j++) {
        document.getElementById('persons-to-edit').innerHTML +=
            htmlTemplateAssignedToEdit(assignedToEdit, j);
    }
}

/**
 * this function registers the added subtask on the edit card
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function renderAddedSubtask(taskStatus, x) {
    let i = 0;
    let subtasksToPush = document.getElementById('task-subtask-edit').value;
    document.getElementById('task-subtask-edit').value = '';
    switch (taskStatus) {
        case 'tasksToDo':
            tasksToDo[x]['subtasks'].push(subtasksToPush);
            i = tasksToDo[x]['subtasks'].length - 1;
            subtasksToEdit = tasksToDo[x]['subtasks'];
            break;
        case 'tasksInProgress':
            tasksInProgress[x]['subtasks'].push(subtasksToPush);
            i = tasksInProgress[x]['subtasks'].length - 1;
            subtasksToEdit = tasksInProgress[x]['subtasks'];
            break;
        case 'tasksAwaitFeedback':
            tasksAwaitFeedback[x]['subtasks'].push(subtasksToPush);
            i = tasksAwaitFeedback[x]['subtasks'].length - 1;
            subtasksToEdit = tasksAwaitFeedback[x]['subtasks'];
            break;
        case 'tasksDone':
            tasksDone[x]['subtasks'].push(subtasksToPush);
            i = tasksDone[x]['subtasks'].length - 1;
            subtasksToEdit = tasksDone[x]['subtasks'];
            break;
    }
    executeRenderingAddedSubtask(subtasksToEdit, i);
}

/**
 * this function renders the added subtask on the edit card
 * 
 * @param {Array} subtasksToEdit 
 * @param {number} i 
 */
function executeRenderingAddedSubtask(subtasksToEdit, i){
    checkedStatus = '';
    document.getElementById('subtask-to-edit').innerHTML +=
        htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus);
}

/**
 * this function updates the edited task
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function closeEdit(taskStatus, x) {
    let inputElements = document.getElementsByClassName('edited-subtasks');
    getCheckedCheckBoxes(inputElements);
    switch (taskStatus) {
        case 'tasksToDo':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            tasksToDo[x]['titel'] = document.getElementById('edited-title').value;
            tasksToDo[x]['text'] = document.getElementById('textarea-edit').value;
            tasksToDo[x]['dueDate'] = document.getElementById('due-date-edit').value;
            break;

        case 'tasksInProgress':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            tasksInProgress[x]['titel'] = document.getElementById('edited-title').value;
            tasksInProgress[x]['text'] = document.getElementById('textarea-edit').value;
            tasksInProgress[x]['dueDate'] = document.getElementById('due-date-edit').value;
            break;

        case 'tasksAwaitFeedback':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            tasksAwaitFeedback[x]['titel'] = document.getElementById('edited-title').value;
            tasksAwaitFeedback[x]['text'] = document.getElementById('textarea-edit').value;
            tasksAwaitFeedback[x]['dueDate'] = document.getElementById('due-date-edit').value;
            break;

        case 'tasksDone':
            updateCheckboxChecked(taskStatus, x, checkboxChecked);
            tasksDone[x]['titel'] = document.getElementById('edited-title').value;
            tasksDone[x]['text'] = document.getElementById('textarea-edit').value;
            tasksDone[x]['dueDate'] = document.getElementById('due-date-edit').value;
            break;
    }
    closeEditedCard();
}

/**
 * this function closes the edit card 
 * 
 */
function closeEditedCard(){
    document.getElementById('edit-task').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
}

/**
 * this function chooses the priority symbol 
 * 
 * @param {string} level 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function editPriority(level, taskStatus, x) {
    switch (level) {
        case 'urgent':
            symbol = "assets/img/urgent.svg";
            break;
        case 'medium':
            symbol = "assets/img/medium.svg";
            break;
        case 'low':
            symbol = "assets/img/low.svg";
            break;
    }
    changePriority(taskStatus, x, symbol, level);
}

/**
 * this function pushes the priority level and symbol into the specific array
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 * @param {string} symbol 
 * @param {string} level 
 */
function changePriority(taskStatus, x, symbol, level) {
    switch (taskStatus) {
        case 'tasksToDo':
            tasksToDo[x]['priority'] = symbol;
            tasksToDo[x]['priorityByName'] = level;
            break;
        case 'tasksInProgress':
            tasksInProgress[x]['priority'] = symbol;
            tasksInProgress[x]['priorityByName'] = level;
            break;
        case 'tasksAwaitFeedback':
            tasksAwaitFeedback[x]['priority'] = symbol;
            tasksAwaitFeedback[x]['priorityByName'] = level;
            break;
        case 'tasksDone':
            tasksDone[x]['priority'] = symbol;
            tasksDone[x]['priorityByName'] = level;
            break;
    }
    saveTasksToBackend();
}

/**
 * this function prevents that the popups are closed by clicking on them
 * 
 * @param {event} event 
 */
function stopPropagation(event) {
    event.stopPropagation();
}