function htmlTemplateTasksToDo(i, widthProgressBar){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksToDo')" class="task-container-detail" onclick="openDetailCardToDo(${i})">
        <div class="category category-${tasksToDo[i]['category']}">${tasksToDo[i]['category']}</div>
     <div class="headline-task-detail">${tasksToDo[i]['titel']}</div>
        <div class="text-task-detail">${tasksToDo[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${tasksToDo[i]['alreadyDone']}/${tasksToDo[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-to-do${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksToDo[i]['priority']}">
        </div>
    </div>
</div>
        `;
}


function htmlTemplateSelectedPersonToDo(i,j){
    return`
        <div class="initials-icon bg${j}">${tasksToDo[i]['initials'][j]}</div>
    `;
}


function htmlTemplateTasksInProgress(i, widthProgressBar){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksInProgress')" class="task-container-detail" onclick="openDetailCardInProgress(${i})">
        <div class="category category-${tasksInProgress[i]['category']}">${tasksInProgress[i]['category']}</div>
     <div class="headline-task-detail">${tasksInProgress[i]['titel']}</div>
        <div class="text-task-detail">${tasksInProgress[i]['text']}</div>
            <div class="progress-bar-task-detail">
                <div class="progress-bar" id="progress-bar">
                    <div id="myBar" style="width:${widthProgressBar}%"></div>
                </div>
            <div class="already-done">${tasksInProgress[i]['alreadyDone']}/${tasksInProgress[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-in-progress${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksInProgress[i]['priority']}">
        </div>
    </div>
</div>
        `;
}

function htmlTemplateSelectedPersonInProgress(i,j){
    return`
    <div class="initials-icon bg${j}">${tasksInProgress[i]['initials'][j]}</div>
    `;
}


function htmlTemplateTasksAwaitFeedback(i, widthProgressBar){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksAwaitFeedback')" class="task-container-detail" onclick="openDetailCardAwaitFeedback(${i})">
        <div class="category category-${tasksAwaitFeedback[i]['category']}">${tasksAwaitFeedback[i]['category']}</div>
     <div class="headline-task-detail">${tasksAwaitFeedback[i]['titel']}</div>
        <div class="text-task-detail">${tasksAwaitFeedback[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                 <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${tasksAwaitFeedback[i]['alreadyDone']}/${tasksAwaitFeedback[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-await-feedback${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksAwaitFeedback[i]['priority']}">
        </div>
    </div>
</div>
        `;
}

function htmlTemplateSelectedPersonAwaitFeedback(i,j){
    return`
    <div class="initials-icon bg${j}">${tasksAwaitFeedback[i]['initials'][j]}</div>
    `;
}


function htmlTemplateTasksDone(i, widthProgressBar){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksDone')" class="task-container-detail" onclick="openDetailCardDone(${i})">
        <div class="category category-${tasksDone[i]['category']}">${tasksDone[i]['category']}</div>
     <div class="headline-task-detail">${tasksDone[i]['titel']}</div>
        <div class="text-task-detail">${tasksDone[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${tasksDone[i]['alreadyDone']}/${tasksDone[i]['subtasks'].length} Done</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-done${i}"></div>
        <div class="priority-task-detail">
            <img src="${tasksDone[i]['priority']}">
        </div>
    </div>
</div>
        `;
}

function htmlTemplateSelectedPersonDone(i,j){
    return`
    <div class="initials-icon bg${j}">${tasksDone[i]['initials'][j]}</div>
    `;
}

function htmlTemplateDetailCardToDo(x){
    return`
    <div class="close-x"><button onclick="closeDetailCard()">X</button></div>
    <span class="category category-${tasksToDo[x]['category']}">${tasksToDo[x]['category']}</span>
    <h1>${tasksToDo[x]['titel']}</h1>
    <span class="task-text">${tasksToDo[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksToDo[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksToDo[x]['priorityByName']} priority-level">
            <span class="priority-text">Low</span>    
            <img src="${tasksToDo[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg"></div>
    `;
}

function htmlTemplatePersonsDetailCardToDo(x, j){
    return`
    <div class="names">
        <div class="initials-icon bg${j}">${tasksToDo[x]['initials'][j]}</div>
        <div class="name">${tasksToDo[x]['inCharge'][j]}</div>
    </div>
    `;
}

function htmlTemplateDetailCardInProgress(x){
    return`
    <div class="close-x"><button onclick="closeDetailCard()">X</button></div>
    <span class="category category-${tasksInProgress[x]['category']}">${tasksInProgress[x]['category']}</span>
    <h1>${tasksInProgress[x]['titel']}</h1>
    <span class="task-text">${tasksInProgress[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksInProgress[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksInProgress[x]['priorityByName']} priority-level">
            <span class="priority-text">Low</span>    
            <img src="${tasksInProgress[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg"></div>
    `;
}

function htmlTemplatePersonsDetailCardInProgress(x, j){
    return`
    <div class="names">
        <div class="initials-icon bg${j}">${tasksInProgress[x]['initials'][j]}</div>
        <div class="name">${tasksInProgress[x]['inCharge'][j]}</div>
    </div>
    `;
}

function htmlTemplateDetailCardAwaitFeedback(x){
    return`
    <div class="close-x"><button onclick="closeDetailCard()">X</button></div>
    <span class="category category-${tasksAwaitFeedback[x]['category']}">${tasksAwaitFeedback[x]['category']}</span>
    <h1>${tasksAwaitFeedback[x]['titel']}</h1>
<span class="task-text">${tasksAwaitFeedback[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksAwaitFeedback[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksAwaitFeedback[x]['priorityByName']} priority-level">
            <span class="priority-text">Low</span>    
            <img src="${tasksAwaitFeedback[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg"></div>
    `;
}

function htmlTemplatePersonsDetailCardAwaitFeedback(x, j){
    return`
    <div class="names">
        <div class="initials-icon bg${j}">${tasksAwaitFeedback[x]['initials'][j]}</div>
        <div class="name">${tasksAwaitFeedback[x]['inCharge'][j]}</div>
    </div>
    `;
}

function htmlTemplateDetailCardDone(x){
    return`
    <div class="close-x"><button onclick="closeDetailCard()">X</button></div>
    <span class="category category-${tasksDone[x]['category']}">${tasksDone[x]['category']}</span>
    <h1>${tasksDone[x]['titel']}</h1>
<span class="task-text">${tasksDone[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksDone[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksDone[x]['priorityByName']} priority-level">
            <span class="priority-text">Low</span>    
            <img src="${tasksDone[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg"></div>
    `;
}

function htmlTemplatePersonsDetailCardDone(x, j){
    return`
    <div class="names">
        <div class="initials-icon bg${j}">${tasksDone[x]['initials'][j]}</div>
        <div class="name">${tasksDone[x]['inCharge'][j]}</div>
    </div>
    `;
}