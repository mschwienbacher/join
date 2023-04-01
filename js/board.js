async function renderBoard(){
    /* await loadTasksFromBackend(); */
    renderTasksToDo();
    renderTasksInProgress();
    renderTasksAwaitFeedback();
    renderTasksDone();
}

function renderTasksToDo(){
    let toDo = document.getElementById('to-do-container');
    toDo.innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++){
        toDo.innerHTML += 
            htmlTemplateTasksToDo(i);  
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
        inProgress.innerHTML += 
            htmlTemplateTasksInProgress(i);  
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
        awaitFeedback.innerHTML += 
            htmlTemplateTasksAwaitFeedback(i);  
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
        done.innerHTML += 
            htmlTemplateTasksDone(i);  
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
}

function openDetailCardAwaitFeedback(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardAwaitFeedback(x);
}

function openDetailCardDone(x){
    document.getElementById('detail-popup').classList.remove('d-none');
    document.getElementById('detail-popup').innerHTML =
        htmlTemplateDetailCardDone(x);
}

function closeDetailCard(){
    document.getElementById('detail-popup').classList.add('d-none');
}