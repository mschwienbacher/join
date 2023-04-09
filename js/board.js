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
        let nbDone = 0;
        for (let j = 0; j < tasksToDo[i]['alreadyDone'].length; j++) {
            done = tasksToDo[i]['alreadyDone'][j];
            nbDone = nbDone + done;
        };
        const widthProgressBar = nbDone / tasksToDo[i]['subtasks'].length * 100;
        toDo.innerHTML +=
            htmlTemplateTasksToDo(i, widthProgressBar, nbDone);
        renderSelectedPersonToDo(i);
    }
}

function renderSelectedPersonToDo(i) {
    let selectedPerson = document.getElementById(`selected-person-to-do${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksToDo[i]['inCharge'].length; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonToDo(i, j)
    }
}


function renderTasksInProgress() {
    let inProgress = document.getElementById('in-progress-container');
    inProgress.innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        let nbDone = 0;
        for (let j = 0; j < tasksInProgress[i]['alreadyDone'].length; j++) {
            done = tasksInProgress[i]['alreadyDone'][j];
            nbDone = nbDone + done;
        };
        const widthProgressBar = nbDone / tasksInProgress[i]['subtasks'].length * 100;
        inProgress.innerHTML +=
            htmlTemplateTasksInProgress(i, widthProgressBar, nbDone);
        renderSelectedPersonInProgress(i);
    }
}

function renderSelectedPersonInProgress(i) {
    let selectedPerson = document.getElementById(`selected-person-in-progress${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksInProgress[i]['inCharge'].length; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonInProgress(i, j)
    }
}


function renderTasksAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback-container');
    awaitFeedback.innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        let nbDone = 0;
        for (let j = 0; j < tasksAwaitFeedback[i]['alreadyDone'].length; j++) {
            done = tasksAwaitFeedback[i]['alreadyDone'][j];
            nbDone = nbDone + done;
        };
        const widthProgressBar = nbDone / tasksAwaitFeedback[i]['subtasks'].length * 100;
        awaitFeedback.innerHTML +=
            htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone);
        renderSelectedPersonAwaitFeedback(i);
    }
}

function renderSelectedPersonAwaitFeedback(i) {
    let selectedPerson = document.getElementById(`selected-person-await-feedback${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksAwaitFeedback[i]['inCharge'].length; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonAwaitFeedback(i, j)
    }
}


function renderTasksDone() {
    let doneContainer = document.getElementById('done-container');
    doneContainer.innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        let nbDone = 0;
        for (let j = 0; j < tasksDone[i]['alreadyDone'].length; j++) {
            done = tasksDone[i]['alreadyDone'][j];
            nbDone = nbDone + done;
        };
        const widthProgressBar = nbDone / tasksDone[i]['subtasks'].length * 100;
        doneContainer.innerHTML +=
            htmlTemplateTasksDone(i, widthProgressBar, nbDone);
        renderSelectedPersonDone(i);
    }
}

function renderSelectedPersonDone(i) {
    let selectedPerson = document.getElementById(`selected-person-done${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksDone[i]['inCharge'].length; j++) {
        selectedPerson.innerHTML +=
            htmlTemplateSelectedPersonDone(i, j)
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
            document.getElementById('to-do-container').innerHTML +=
                htmlTemplateTasksToDo(i);
            renderSelectedPersonToDo(i);
        }
    }
}

function filterInProgress(search) {
    document.getElementById('in-progress-container').innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        if (tasksInProgress[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('in-progress-container').innerHTML +=
                htmlTemplateTasksInProgress(i);
            renderSelectedPersonInProgress(i);
        }
    }
}

function filterAwaitFeedback(search) {
    document.getElementById('await-feedback-container').innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        if (tasksAwaitFeedback[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('await-feedback-container').innerHTML +=
                htmlTemplateTasksAwaitFeedback(i);
            renderSelectedPersonAwaitFeedback(i);
        }
    }
}

function filterDone(search) {
    document.getElementById('done-container').innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        if (tasksDone[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('done-container').innerHTML +=
                htmlTemplateTasksDone(i);
            renderSelectedPersonDone(i);
        }
    }
}

function openAddTaskPopup(){
    document.getElementById('add-task-popup-container').classList.remove('d-none');
    /* document.getElementById('add-task-popup').classList.remove('d-none'); */
}