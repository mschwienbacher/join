function openDetailCardToDo(x) {
    document.getElementById('details').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardToDo(x);
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksToDo[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardToDo(x, j);
    };
    renderSubtaksInDetailCardToDo(x);
}

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

function openDetailCardInProgress(x) {
    document.getElementById('details').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardInProgress(x);
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksInProgress[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardInProgress(x, j);
    };
    renderSubtaksInDetailCardInProgress(x);
}

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


function openDetailCardAwaitFeedback(x) {
    document.getElementById('details').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardAwaitFeedback(x);
    for (let j = 0; j < tasksAwaitFeedback[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardAwaitFeedback(x, j);
    };
    renderSubtaksInDetailCardAwaitFeedback(x);
}

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

function openDetailCardDone(x) {
    document.getElementById('details').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardDone(x);
    for (let j = 0; j < tasksDone[x]['inCharge'].length; j++) {
        document.getElementById('names-container').innerHTML +=
            htmlTemplatePersonsDetailCardDone(x, j);
    };
    renderSubtaksInDetailCardDone(x);
}

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

function closeDetailCard(taskStatus, x) {
    let inputElements = document.getElementsByClassName('sutaskCheckbox');
    let checkboxChecked = [];
    for (let i = 0; inputElements[i]; ++i) {
        if (inputElements[i].checked) {
            checkboxChecked.push(1);
        } else {
            checkboxChecked.push(0);
        }
    };
    updateCheckboxChecked(taskStatus, x, checkboxChecked);
    document.getElementById('details').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
}

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