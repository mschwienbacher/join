function renderBoard(){
    renderTasksToDo()
}

function renderTasksToDo(){
    let toDo = document.getElementById('to-do-container');
    toDo.innerHTML = '';
    for (let i = 0; i < tasksToDo.length; i++){
        toDo.innerHTML += 
            htmlTemplateTasksToDo(i);
            /* renderSelectedPerson(i);   */  
        }
    
}

function renderSelectedPerson(i){
    let selectedPerson = document.getElementById(`selected-person-to-do${i}`);
    selectedPerson.innerHTML = '';
    for (let j = 0; j < tasksToDo[i]['inCharge'].length; j++){
        selectedPerson.innerHTML +=
        htmlTemplateSelectedPersonToDo(i,j)
    }
}