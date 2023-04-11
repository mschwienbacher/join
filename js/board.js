let nbDone;

function renderBoard() {
    renderTasksToDo();
    renderTasksInProgress();
    renderTasksAwaitFeedback();
    renderTasksDone();
}

function renderTasksToDo() {
    let toDo = document.getElementById('to-do-container');
    toDo.innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++) {
        checkDoneTasks(i, 'tasksToDo');
        const widthProgressBar = nbDone / tasksToDo[i]['subtasks'].length * 100;
        toDo.innerHTML +=
            htmlTemplateTasksToDo(i, widthProgressBar, nbDone);
        renderSelectedPersonToDo(i);
    }
}

function renderSelectedPersonToDo(i) {
    let selectedPerson = document.getElementById(`selected-person-to-do${i}`);
    let nbOfInCharge = tasksToDo[i]['inCharge'].length;
    if (nbOfInCharge > 2){
        countTo = 3;
    }else{
        countTo = nbOfInCharge
    }
    selectedPerson.innerHTML = '';
    for (let j = 0; j < countTo; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonToDo(i, j)
    }
    fxNbOfInCharge(nbOfInCharge, selectedPerson);
}


function renderTasksInProgress() {
    let inProgress = document.getElementById('in-progress-container');
    inProgress.innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        checkDoneTasks(i, 'tasksInProgress');
        const widthProgressBar = nbDone / tasksInProgress[i]['subtasks'].length * 100;
        inProgress.innerHTML +=
            htmlTemplateTasksInProgress(i, widthProgressBar, nbDone);
        renderSelectedPersonInProgress(i);
    }
}

function renderSelectedPersonInProgress(i) {
    let selectedPerson = document.getElementById(`selected-person-in-progress${i}`);
    let nbOfInCharge = tasksInProgress[i]['inCharge'].length;
    if (nbOfInCharge > 2){
        countTo = 3;
    }else{
        countTo = nbOfInCharge
    }
    selectedPerson.innerHTML = '';
    for (let j = 0; j < countTo; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonInProgress(i, j)
    }
    fxNbOfInCharge(nbOfInCharge, selectedPerson);
}

function renderTasksAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback-container');
    awaitFeedback.innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        checkDoneTasks(i, 'tasksAwaitFeedback');
        const widthProgressBar = nbDone / tasksAwaitFeedback[i]['subtasks'].length * 100;
        awaitFeedback.innerHTML +=
            htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone);
        renderSelectedPersonAwaitFeedback(i);
    }
}

function renderSelectedPersonAwaitFeedback(i) {
    let selectedPerson = document.getElementById(`selected-person-await-feedback${i}`);
    let nbOfInCharge = tasksAwaitFeedback[i]['inCharge'].length;
    if (nbOfInCharge > 2){
        countTo = 3;
    }else{
        countTo = nbOfInCharge
    }
    selectedPerson.innerHTML = '';
    for (let j = 0; j < countTo; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonAwaitFeedback(i, j)
    }
    fxNbOfInCharge(nbOfInCharge, selectedPerson);
}


function renderTasksDone() {
    let doneContainer = document.getElementById('done-container');
    doneContainer.innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        checkDoneTasks(i, 'tasksDone');
        const widthProgressBar = nbDone / tasksDone[i]['subtasks'].length * 100;
        doneContainer.innerHTML +=
            htmlTemplateTasksDone(i, widthProgressBar, nbDone);
        renderSelectedPersonDone(i);
    }
}

function checkDoneTasks(i, taskStatus) {
    nbDone = 0;
    switch (taskStatus) {
        case 'tasksToDo':
            for (let j = 0; j < tasksToDo[i]['alreadyDone'].length; j++) {
                done = tasksToDo[i]['alreadyDone'][j];
                nbDone = nbDone + done;
            };
            break;
        case 'tasksInProgress':
            for (let j = 0; j < tasksInProgress[i]['alreadyDone'].length; j++) {
                done = tasksInProgress[i]['alreadyDone'][j];
                nbDone = nbDone + done;
            };
            break;
        case 'tasksAwaitFeedback':
            for (let j = 0; j < tasksAwaitFeedback[i]['alreadyDone'].length; j++) {
                done = tasksAwaitFeedback[i]['alreadyDone'][j];
                nbDone = nbDone + done;
            };
            break;
        case 'tasksDone':
            for (let j = 0; j < tasksDone[i]['alreadyDone'].length; j++) {
                done = tasksDone[i]['alreadyDone'][j];
                nbDone = nbDone + done;
            };
            break;
    }   
}

function renderSelectedPersonDone(i) {
    let selectedPerson = document.getElementById(`selected-person-done${i}`);
    let nbOfInCharge = tasksDone[i]['inCharge'].length;
    if (nbOfInCharge > 2){
        countTo = 3;
    }else{
        countTo = nbOfInCharge
    }
    selectedPerson.innerHTML = '';
    for (let j = 0; j < countTo; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonDone(i, j)
    }
    fxNbOfInCharge(nbOfInCharge, selectedPerson);
}

function fxNbOfInCharge(nbOfInCharge, selectedPerson){
    if (nbOfInCharge > 2){
        nbMore = nbOfInCharge-3;
        selectedPerson.innerHTML +=`
        <div class="initials-icon bg3">+${nbMore}</div>`;
    }
}

function filter() {
    let search = document.getElementById('search').value; /*nimmtText aus Input Feld*/
    search = search.toLowerCase();
    filterToDo(search);
    filterInProgress(search);
    filterAwaitFeedback(search);
    filterDone(search);
}

function filterToDo(search) {
    document.getElementById('to-do-container').innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++) {
        if (tasksToDo[i]['titel'].toLowerCase().includes(search)) {
            checkDoneTasks(i, 'tasksToDo');
            const widthProgressBar = nbDone / tasksToDo[i]['subtasks'].length * 100;
            document.getElementById('to-do-container').innerHTML +=
                htmlTemplateTasksToDo(i, widthProgressBar, nbDone);
            renderSelectedPersonToDo(i);
        }
    }
}

function filterInProgress(search) {
    document.getElementById('in-progress-container').innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        if (tasksInProgress[i]['titel'].toLowerCase().includes(search)) {
            checkDoneTasks(i, 'tasksInProgress');
            const widthProgressBar = nbDone / tasksInProgress[i]['subtasks'].length * 100;
            document.getElementById('in-progress-container').innerHTML +=
                htmlTemplateTasksInProgress(i, widthProgressBar, nbDone);
            renderSelectedPersonInProgress(i);
        }
    }
}

function filterAwaitFeedback(search) {
    document.getElementById('await-feedback-container').innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        if (tasksAwaitFeedback[i]['titel'].toLowerCase().includes(search)) {
            checkDoneTasks(i, 'tasksAwaitFeedback');
            const widthProgressBar = nbDone / tasksAwaitFeedback[i]['subtasks'].length * 100;
            document.getElementById('await-feedback-container').innerHTML +=
                htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone);
            renderSelectedPersonAwaitFeedback(i);
        }
    }
}

function filterDone(search) {
    document.getElementById('done-container').innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        if (tasksDone[i]['titel'].toLowerCase().includes(search)) {
            checkDoneTasks(i, 'tasksDone');
            const widthProgressBar = nbDone / tasksDone[i]['subtasks'].length * 100;
            document.getElementById('done-container').innerHTML +=
                htmlTemplateTasksDone(i, widthProgressBar, nbDone);
            renderSelectedPersonDone(i);
        }
    }
}

function openAddTaskPopup() {
    document.getElementById('add-task-popup-container').classList.remove('d-none');
}

function closeAddTask() {
    document.getElementById('add-task-popup-container').classList.add('d-none');
    document.getElementById('list-task-category').classList.add('d-none');
    document.getElementById('list-assigned-to').classList.add('d-none');
}