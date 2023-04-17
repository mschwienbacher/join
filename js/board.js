let nbDone;
let checkboxChecked;
let containerToAdd;
let bgColor;

/**
 * this function renders the board
 * 
 */
function renderBoard() {
    renderTasksToDo();
    renderTasksInProgress();
    renderTasksAwaitFeedback();
    renderTasksDone();
}

/**
 * this function sets the background color for the category
 * 
 * @param {string} category 
 */
function getCategoryColor(category){
    for (let i = 0; i < categoriesBackground.length; i++){
        if (category == categories[i]){
            bgColor = categoriesBackground[i];
        } 
    }
}

/**
 * this function renders the tasks to do container
 * 
 */
function renderTasksToDo() {
    let toDo = document.getElementById('to-do-container');
    toDo.innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++) {
        let category = tasksToDo[i]['category'];
        getCategoryColor(`${category}`);
        checkDoneTasks(i, 'tasksToDo');
        const widthProgressBar = nbDone / tasksToDo[i]['subtasks'].length * 100;
        toDo.innerHTML +=
            htmlTemplateTasksToDo(i, widthProgressBar, nbDone, bgColor);
        renderSelectedPersonToDo(i);
    }
}

/**
 * this function renders the selected persons for the task to do
 * 
 * @param {number} i 
 */
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

/**
 * this function renders the tasks in progress container
 * 
 */
function renderTasksInProgress() {
    let inProgress = document.getElementById('in-progress-container');
    inProgress.innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        let category = tasksInProgress[i]['category'];
        getCategoryColor(`${category}`);
        checkDoneTasks(i, 'tasksInProgress');
        const widthProgressBar = nbDone / tasksInProgress[i]['subtasks'].length * 100;
        inProgress.innerHTML +=
            htmlTemplateTasksInProgress(i, widthProgressBar, nbDone);
        renderSelectedPersonInProgress(i);
    }
}

/**
 * this function renders the selected persons for the task in progress
 * 
 * @param {number} i 
 */
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

/**
 * this function renders the tasks await feedback container
 * 
 */
function renderTasksAwaitFeedback() {
    let awaitFeedback = document.getElementById('await-feedback-container');
    awaitFeedback.innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        let category = tasksAwaitFeedback[i]['category'];
        getCategoryColor(`${category}`);
        checkDoneTasks(i, 'tasksAwaitFeedback');
        const widthProgressBar = nbDone / tasksAwaitFeedback[i]['subtasks'].length * 100;
        awaitFeedback.innerHTML +=
            htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone);
        renderSelectedPersonAwaitFeedback(i);
    }
}

/**
 * this function renders the selected persons for the task await feedback
 * 
 * @param {number} i 
 */
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

/**
 * this function renders the tasks done container
 * 
 */
function renderTasksDone() {
    let doneContainer = document.getElementById('done-container');
    doneContainer.innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        let category = tasksDone[i]['category'];
        getCategoryColor(`${category}`);
        checkDoneTasks(i, 'tasksDone');
        const widthProgressBar = nbDone / tasksDone[i]['subtasks'].length * 100;
        doneContainer.innerHTML +=
            htmlTemplateTasksDone(i, widthProgressBar, nbDone);
        renderSelectedPersonDone(i);
    }
}

/**
 * this function renders the selected persons for the task done
 * 
 * @param {number} i 
 */
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

/**
 * this function checks which subtaskss are already done
 * 
 * @param {number} i 
 * @param {string} taskStatus 
 */
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

/**
 * this function checks if there are more than 3 persons assigned to the task and renders a circle with that number inside
 * 
 * @param {number} nbOfInCharge 
 * @param {string} selectedPerson 
 */
function fxNbOfInCharge(nbOfInCharge, selectedPerson){
    if (nbOfInCharge > 3){
        nbMore = nbOfInCharge-3;
        selectedPerson.innerHTML +=`
        <div class="initials-icon bg3">+${nbMore}</div>`;
    }
}

/**
 * this function calls the filter function with the value of the search field
 * 
 */
function filter() {
    let search = document.getElementById('search').value; /*nimmtText aus Input Feld*/
    search = search.toLowerCase();
    filterToDo(search);
    filterInProgress(search);
    filterAwaitFeedback(search);
    filterDone(search);
}

/**
 * this function filters the tasks to do by search
 * 
 * @param {string} search 
 */
function filterToDo(search) {
    document.getElementById('to-do-container').innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++) {
        if (tasksToDo[i]['titel'].toLowerCase().includes(search)) {
            let category = tasksToDo[i]['category'];
            getCategoryColor(`${category}`);
            checkDoneTasks(i, 'tasksToDo');
            const widthProgressBar = nbDone / tasksToDo[i]['subtasks'].length * 100;
            document.getElementById('to-do-container').innerHTML +=
                htmlTemplateTasksToDo(i, widthProgressBar, nbDone);
            renderSelectedPersonToDo(i);
        }
    }
}

/**
 * this function filters the tasks in progress by search
 * 
 * @param {string} search 
 */
function filterInProgress(search) {
    document.getElementById('in-progress-container').innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++) {
        if (tasksInProgress[i]['titel'].toLowerCase().includes(search)) {
            let category = tasksInProgress[i]['category'];
            getCategoryColor(`${category}`);
            checkDoneTasks(i, 'tasksInProgress');
            const widthProgressBar = nbDone / tasksInProgress[i]['subtasks'].length * 100;
            document.getElementById('in-progress-container').innerHTML +=
                htmlTemplateTasksInProgress(i, widthProgressBar, nbDone);
            renderSelectedPersonInProgress(i);
        }
    }
}

/**
 * this function filters the tasks await feedback by search
 * 
 * @param {string} search 
 */
function filterAwaitFeedback(search) {
    document.getElementById('await-feedback-container').innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++) {
        if (tasksAwaitFeedback[i]['titel'].toLowerCase().includes(search)) {
            let category = tasksAwaitFeedback[i]['category'];
            getCategoryColor(`${category}`);
            checkDoneTasks(i, 'tasksAwaitFeedback');
            const widthProgressBar = nbDone / tasksAwaitFeedback[i]['subtasks'].length * 100;
            document.getElementById('await-feedback-container').innerHTML +=
                htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone);
            renderSelectedPersonAwaitFeedback(i);
        }
    }
}

/**
 * this function filters the tasks done by search
 * 
 * @param {string} search 
 */
function filterDone(search) {
    document.getElementById('done-container').innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++) {
        if (tasksDone[i]['titel'].toLowerCase().includes(search)) {
            let category = tasksDone[i]['category'];
            getCategoryColor(`${category}`);
            checkDoneTasks(i, 'tasksDone');
            const widthProgressBar = nbDone / tasksDone[i]['subtasks'].length * 100;
            document.getElementById('done-container').innerHTML +=
                htmlTemplateTasksDone(i, widthProgressBar, nbDone);
            renderSelectedPersonDone(i);
        }
    }
}

/**
 * this function opens the add task popup
 * 
 */
function openAddTaskPopup(containerString) {
    containerToAdd = containerString;
    document.getElementById('add-task-popup-container').classList.remove('d-none');
    renderDueDate();
}

/**
 * this function closes the add task popup
 * 
 */
function closeAddTask() {
    document.getElementById('add-task-popup-container').classList.add('d-none');
    document.getElementById('list-task-category').classList.add('d-none');
    document.getElementById('list-assigned-to').classList.add('d-none');
}