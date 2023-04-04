function renderBoard(){
    renderTasksToDo();
    renderTasksInProgress();
    renderTasksAwaitFeedback();
    renderTasksDone();
}

function renderTasksToDo(){
    let toDo = document.getElementById('to-do-container');
    toDo.innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++){
        const widthProgressBar = tasksToDo[i]['alreadyDone']/tasksToDo[i]['subtasks'].length *100;
        toDo.innerHTML += 
            htmlTemplateTasksToDo(i, widthProgressBar);  
            renderSelectedPersonToDo(i);
    }          
}

function renderSelectedPersonToDo(i){
    let selectedPerson = document.getElementById(`selected-person-to-do${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksToDo[i]['inCharge'].length; j++){
        selectedPerson.innerHTML +=
        htmlTemplateSelectedPersonToDo(i,j)
    }
}


function renderTasksInProgress(){
    let inProgress = document.getElementById('in-progress-container');
    inProgress.innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++){
        const widthProgressBar = tasksInProgress[i]['alreadyDone']/tasksInProgress[i]['subtasks'].length *100;
        inProgress.innerHTML += 
            htmlTemplateTasksInProgress(i, widthProgressBar);  
            renderSelectedPersonInProgress(i);
    }          
}

function renderSelectedPersonInProgress(i){
    let selectedPerson = document.getElementById(`selected-person-in-progress${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksInProgress[i]['inCharge'].length; j++){
        selectedPerson.innerHTML +=
        htmlTemplateSelectedPersonInProgress(i,j)
    }
}


function renderTasksAwaitFeedback(){
    let awaitFeedback = document.getElementById('await-feedback-container');
    awaitFeedback.innerHTML = '';
    for (let i = 0; i < tasksAwaitFeedback.length; i++){
        const widthProgressBar = tasksAwaitFeedback[i]['alreadyDone']/tasksAwaitFeedback[i]['subtasks'].length *100;
        awaitFeedback.innerHTML += 
            htmlTemplateTasksAwaitFeedback(i, widthProgressBar);  
            renderSelectedPersonAwaitFeedback(i);
    }          
}

function renderSelectedPersonAwaitFeedback(i){
    let selectedPerson = document.getElementById(`selected-person-await-feedback${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksAwaitFeedback[i]['inCharge'].length; j++){
        selectedPerson.innerHTML +=
        htmlTemplateSelectedPersonAwaitFeedback(i,j)
    }
}


function renderTasksDone(){
    let done = document.getElementById('done-container');
    done.innerHTML = '';
    for (let i = 0; i < tasksDone.length; i++){
        const widthProgressBar = tasksDone[i]['alreadyDone']/tasksDone[i]['subtasks'].length *100;
        done.innerHTML += 
            htmlTemplateTasksDone(i, widthProgressBar);  
            renderSelectedPersonDone(i);
    }          
}

function renderSelectedPersonDone(i){
    let selectedPerson = document.getElementById(`selected-person-done${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksDone[i]['inCharge'].length; j++){
        selectedPerson.innerHTML +=
        htmlTemplateSelectedPersonDone(i,j)
    }
}

function openDetailCardToDo(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardToDo(x);    
    document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksToDo[x]['inCharge'].length; j++){
        document.getElementById('names-container').innerHTML +=
        htmlTemplatePersonsDetailCardToDo(x, j);
    };    
}

function openDetailCardInProgress(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardInProgress(x);
        document.getElementById('names-container').innerHTML = '';
    for (let j = 0; j < tasksInProgress[x]['inCharge'].length; j++){
        document.getElementById('names-container').innerHTML +=
        htmlTemplatePersonsDetailCardToDo(x, j);
    };   
}

function openDetailCardAwaitFeedback(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardAwaitFeedback(x);
    for (let j = 0; j < tasksAwaitFeedback[x]['inCharge'].length; j++){
        document.getElementById('names-container').innerHTML +=
        htmlTemplatePersonsDetailCardAwaitFeedback(x, j);
    };    
}

function openDetailCardDone(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardDone(x);
    for (let j = 0; j < tasksDone[x]['inCharge'].length; j++){
        document.getElementById('names-container').innerHTML +=
        htmlTemplatePersonsDetailCardDone(x, j);
    }; 
}

function closeDetailCard(){
    document.getElementById('detail-popup').classList.add('d-none');
}

function filter() {
    let search = document.getElementById('search').value; /*nimmtText aus Input Feld*/
    search = search.toLowerCase();
    filterToDo(search);
    filterInProgress(search);
    filterAwaitFeedback(search);
    filterDone(search);   
}

function filterToDo(search){
    document.getElementById('to-do-container').innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++){
        if (tasksToDo[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('to-do-container').innerHTML += 
            htmlTemplateTasksToDo(i);  
            renderSelectedPersonToDo(i);
        }
    } 
}

function filterInProgress(search){
    document.getElementById('in-progress-container').innerHTML = '';
    for (let i = 0; i < tasksInProgress.length; i++){
        if (tasksInProgress[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('in-progress-container').innerHTML += 
            htmlTemplateTasksInProgress(i);  
            renderSelectedPersonInProgress(i);
        }
    }
}

function filterAwaitFeedback(search){
    document.getElementById('await-feedback-container').innerHTML = '';
for (let i = 0; i < tasksAwaitFeedback.length; i++){
        if (tasksAwaitFeedback[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('await-feedback-container').innerHTML += 
            htmlTemplateTasksAwaitFeedback(i);  
            renderSelectedPersonAwaitFeedback(i);
        }
    }
}

function filterDone(search){
    document.getElementById('done-container').innerHTML = '';
for (let i = 0; i < tasksDone.length; i++){
        if (tasksDone[i]['titel'].toLowerCase().includes(search)) {
            document.getElementById('done-container').innerHTML += 
            htmlTemplateTasksDone(i);  
            renderSelectedPersonDone(i);
        }
    }
}

function deleteTask(taskToDelete, x){
    const isGoodValue = val => val && val !== '-' && val !== 'N/A'; /* check for empty arrays*/
    switch (taskToDelete){
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