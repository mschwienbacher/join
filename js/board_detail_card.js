/**
 * this function opens the detail card for tasks to do
 * 
 * @param {number} x 
 */
function openDetailCardToDo(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksToDo[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardToDo(x);
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksToDo[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardToDo(x, j);
    };
    renderSubtaksInDetailCardToDo(x);
}

/**
 * this function renders the subtasks on the detail card for tasks to do
 * 
 * @param {number} x 
 */
function renderSubtaksInDetailCardToDo(x) {
    document.getElementById('subtasks').innerHTML = '';
    for (let j = 0; j < tasksToDo[x]['subtasks'].length; j++) {
        if (tasksToDo[x]['alreadyDone'][j] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        };
        document.getElementById('subtasks').innerHTML +=
            htmlTemplateSubtasksDetailCardToDo(x, j, checkedStatus);
    }
}

/**
 * this function opens the detail card for tasks in progress
 * 
 * @param {number} x 
 */
function openDetailCardInProgress(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksInProgress[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardInProgress(x);
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksInProgress[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardInProgress(x, j);
    };
    renderSubtaksInDetailCardInProgress(x);
}

/**
 * this function renders the subtasks on the detail card for tasks in progress
 * 
 * @param {number} x 
 */
function renderSubtaksInDetailCardInProgress(x) {
    document.getElementById('subtasks').innerHTML = '';
    for (let j = 0; j < tasksInProgress[x]['subtasks'].length; j++) {
        if (tasksInProgress[x]['alreadyDone'][j] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        };
        document.getElementById('subtasks').innerHTML +=
            htmlTemplateSubtasksDetailCardInProgress(x, j, checkedStatus);
    }
}

/**
 * this function opens the detail card for tasks await feedback
 * 
 * @param {number} x 
 */
function openDetailCardAwaitFeedback(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksAwaitFeedback[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardAwaitFeedback(x);
    for (let j = 0; j < tasksAwaitFeedback[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardAwaitFeedback(x, j);
    };
    renderSubtaksInDetailCardAwaitFeedback(x);
}

/**
 * this function renders the subtasks on the detail card for tasks await feedback
 * 
 * @param {number} x 
 */
function renderSubtaksInDetailCardAwaitFeedback(x) {
    document.getElementById('subtasks').innerHTML = '';
    for (let j = 0; j < tasksAwaitFeedback[x]['subtasks'].length; j++) {
        if (tasksAwaitFeedback[x]['alreadyDone'][j] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        };
        document.getElementById('subtasks').innerHTML +=
            htmlTemplateSubtasksDetailCardAwaitFeedback(x, j, checkedStatus);
    }
}

/**
 * this function opens the detail card for tasks done
 * 
 * @param {number} x 
 */
function openDetailCardDone(x) {
    document.getElementById('details').classList.remove('d-none');
    let category = tasksDone[x]['category'];
    getCategoryColor(`${category}`);
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardDone(x);
    for (let j = 0; j < tasksDone[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardDone(x, j);
    };
    renderSubtaksInDetailCardDone(x);
}

/**
 * this function renders the subtasks on the detail card for tasks done
 * 
 * @param {number} x 
 */
function renderSubtaksInDetailCardDone(x) {
    document.getElementById('subtasks').innerHTML = '';
    for (let j = 0; j < tasksDone[x]['subtasks'].length; j++) {
        if (tasksDone[x]['alreadyDone'][j] == 1) {
            checkedStatus = 'checked';
        } else {
            checkedStatus = '';
        };
        document.getElementById('subtasks').innerHTML +=
            htmlTemplateSubtasksDetailCardDone(x, j, checkedStatus);
    }
}

/**
 * this function closes the detail card
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 */
function closeDetailCard(taskStatus, x) {
    let inputElements = document.getElementsByClassName('sutaskCheckbox');
    getCheckedCheckBoxes(inputElements);
    updateCheckboxChecked(taskStatus, x, checkboxChecked);
    document.getElementById('details').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
}

/**
 * this function checks which checkboxes are checked
 * 
 * @param {string} inputElements 
 */
function getCheckedCheckBoxes(inputElements){
    checkboxChecked = [];
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxChecked.push(1);
        } else {
            checkboxChecked.push(0);
        }
    };
}

/**
 * this function registers which checkboxes are checked
 * 
 * @param {string} taskStatus 
 * @param {number} x 
 * @param {Array} checkboxChecked 
 */
function updateCheckboxChecked(taskStatus, x, checkboxChecked){
    switch (taskStatus) {

        case 'tasksToDo':
            tasksToDo[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksToDo[x]['alreadyDone'].push(checkboxChecked[i]);
            };
            break;

        case 'tasksInProgress':            
            tasksInProgress[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksInProgress[x]['alreadyDone'].push(checkboxChecked[i]);
            }
            break;

        case 'tasksAwaitFeedback':
            tasksAwaitFeedback[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksAwaitFeedback[x]['alreadyDone'].push(checkboxChecked[i]);
            };
            break;

        case 'tasksDone':
            tasksDone[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksDone[x]['alreadyDone'].push(checkboxChecked[i]);
            };
    }
}

/**
 * this function deletes the selected task
 * 
 * @param {string} taskToDelete 
 * @param {number} x 
 */
function deleteTask(taskToDelete, x) {
    const isGoodValue = val => val && val !== '-' && val !== 'N/A'; /* check for empty arrays*/
    switch (taskToDelete) {
        case 'tasksToDo':
            delete tasksToDo[x];
            tasksToDo = tasksToDo.filter(isGoodValue);
            break;

        case 'tasksInProgress':
            delete tasksInProgress[x];
            tasksInProgress = tasksInProgress.filter(isGoodValue);
            break;

        case 'tasksAwaitFeedback':
            delete tasksAwaitFeedback[x];
            tasksAwaitFeedback = tasksAwaitFeedback.filter(isGoodValue);
            break;

        case 'tasksDone':
            delete tasksDone[x];
            tasksDone = tasksDone.filter(isGoodValue);
            break;
    }
    closeDetailCard();
    saveTasksToBackend();
    renderBoard();
}