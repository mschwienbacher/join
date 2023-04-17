function htmlTemplateTasksToDo(i, widthProgressBar, nbDone){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksToDo')" class="task-container-detail" onclick="openDetailCardToDo(${i})">
        <div class="category" style="background:${bgColor}">${tasksToDo[i]['category']}</div>
     <div class="headline-task-detail">${tasksToDo[i]['titel']}</div>
        <div class="text-task-detail">${tasksToDo[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksToDo[i]['subtasks'].length} Done</div>
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


function htmlTemplateTasksInProgress(i, widthProgressBar, nbDone){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksInProgress')" class="task-container-detail" onclick="openDetailCardInProgress(${i})">
        <div class="category" style="background:${bgColor}">${tasksInProgress[i]['category']}</div>
     <div class="headline-task-detail">${tasksInProgress[i]['titel']}</div>
        <div class="text-task-detail">${tasksInProgress[i]['text']}</div>
            <div class="progress-bar-task-detail">
                <div class="progress-bar" id="progress-bar">
                    <div id="myBar" style="width:${widthProgressBar}%"></div>
                </div>
            <div class="already-done">${nbDone}/${tasksInProgress[i]['subtasks'].length} Done</div>
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


function htmlTemplateTasksAwaitFeedback(i, widthProgressBar, nbDone){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksAwaitFeedback')" class="task-container-detail" onclick="openDetailCardAwaitFeedback(${i})">
        <div class="category" style="background:${bgColor}">${tasksAwaitFeedback[i]['category']}</div>
     <div class="headline-task-detail">${tasksAwaitFeedback[i]['titel']}</div>
        <div class="text-task-detail">${tasksAwaitFeedback[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                 <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksAwaitFeedback[i]['subtasks'].length} Done</div>
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


function htmlTemplateTasksDone(i, widthProgressBar, nbDone){
    return `
    <div draggable="true" ondragstart=" startDragging(${i}, 'tasksDone')" class="task-container-detail" onclick="openDetailCardDone(${i})">
        <div class="category" style="background:${bgColor}">${tasksDone[i]['category']}</div>
     <div class="headline-task-detail">${tasksDone[i]['titel']}</div>
        <div class="text-task-detail">${tasksDone[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar" id="progress-bar">
                <div id="myBar" style="width:${widthProgressBar}%"></div>
            </div>
            <div class="already-done">${nbDone}/${tasksDone[i]['subtasks'].length} Done</div>
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
    <div class="close-x"><img src="assets/img/trash.svg" onclick="deleteTask('tasksToDo', ${x})"> <button onclick="closeDetailCard('tasksToDo', ${x})">X</button></div>
    <span class="category" style="background:${bgColor}">${tasksToDo[x]['category']}</span>
    <h1>${tasksToDo[x]['titel']}</h1>
    <span class="task-text">${tasksToDo[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksToDo[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksToDo[x]['priorityByName']} priority-level">
            <span class="priority-text">${tasksToDo[x]['priorityByName']}</span>    
            <img src="${tasksToDo[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Subtasks: </span>
    <div id="subtasks"></div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg" onclick="editTask('tasksToDo', ${x})"></div>
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

function htmlTemplateSubtasksDetailCardToDo(x, j, checkedStatus){
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksToDo[x]['subtasks'][j]}</span>
    `;
}

function htmlTemplateDetailCardInProgress(x){
    return`
    <div class="close-x"><img src="assets/img/trash.svg" onclick="deleteTask('tasksInProgress', ${x})"><button onclick="closeDetailCard('tasksInProgress', ${x})">X</button></div>
    <span class="category" style="background:${bgColor}">${tasksInProgress[x]['category']}</span>
    <h1>${tasksInProgress[x]['titel']}</h1>
    <span class="task-text">${tasksInProgress[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksInProgress[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksInProgress[x]['priorityByName']} priority-level">
            <span class="priority-text">${tasksInProgress[x]['priorityByName']}</span>    
            <img src="${tasksInProgress[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Subtasks: </span>
    <div id="subtasks"></div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg" onclick="editTask('tasksInProgress', ${x})"></div>
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

function htmlTemplateSubtasksDetailCardInProgress(x, j, checkedStatus){
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksInProgress[x]['subtasks'][j]}</span>
    `;
}

function htmlTemplateDetailCardAwaitFeedback(x){
    return`
    <div class="close-x"><img src="assets/img/trash.svg" onclick="deleteTask('tasksAwaitFeedback', ${x})"><button onclick="closeDetailCard('tasksAwaitFeedback', ${x})">X</button></div>
    <span class="category" style="background:${bgColor}">${tasksAwaitFeedback[x]['category']}</span>
    <h1>${tasksAwaitFeedback[x]['titel']}</h1>
<span class="task-text">${tasksAwaitFeedback[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksAwaitFeedback[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksAwaitFeedback[x]['priorityByName']} priority-level">
            <span class="priority-text">${tasksAwaitFeedback[x]['priorityByName']}</span>    
            <img src="${tasksAwaitFeedback[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Subtasks: </span>
    <div id="subtasks"></div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg" onclick="editTask('tasksAwaitFeedback', ${x})"></div>
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

function htmlTemplateSubtasksDetailCardAwaitFeedback(x, j, checkedStatus){
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksAwaitFeedback[x]['subtasks'][j]}</span>
    `;
}

function htmlTemplateDetailCardDone(x){
    return`
    <div class="close-x"><img src="assets/img/trash.svg" onclick="deleteTask('tasksDone', ${x})"><button onclick="closeDetailCard('tasksDone', ${x})">X</button></div>
    <span class="category" style="background:${bgColor}">${tasksDone[x]['category']}</span>
    <h1>${tasksDone[x]['titel']}</h1>
    <span class="task-text">${tasksDone[x]['text']}</span>    
    <span class="text-fix">Due date: ${tasksDone[x]['dueDate']}</span>
    <div class="priority-container">
        <span class="text-fix-priority">Priority:</span> 
        <div class="${tasksDone[x]['priorityByName']} priority-level">
            <span class="priority-text">${tasksDone[x]['priorityByName']}</span>    
            <img src="${tasksDone[x]['priority']}">
        </div>
    </div>
    <span class="text-fix">Subtasks: </span>
    <div id="subtasks"></div>
    <span class="text-fix">Assigned To:</span>
    <div class="names-container" id="names-container">
        
    </div>
    <div class="edit-btn"><img src="assets/img/edit-button.svg" onclick="editTask('tasksDone', ${x})"></div>
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

function htmlTemplateSubtasksDetailCardDone(x, j, checkedStatus){
    return `
    <span style="padding-top: 6px"> <input class="sutaskCheckbox" type="checkbox" ${checkedStatus}/> ${tasksDone[x]['subtasks'][j]}</span>
    `;
}

function htmlTemplateTaskToEdit(titleEdit, year, month, day, taskStatus,x){
    return`
    <div class="edit-task"</div>
    <h2>Edit Task</h2>
    <div>Title</div>
    <input id="edited-title" type="text" value="${titleEdit}">
    <div>Description</div>
    <textarea  id="textarea-edit" cols="34" rows="5"></textarea>
    <div>Due date</div>
    <input type="date" id="due-date-edit" name="trip-start" value="${year}-${month}-${day}" onfocus="this.showPicker()">
    <span>Subtasks</span>
    <div class="input-subtasks">
        <input style="width:90%; margin-right:10px" type="text" placeholder="add new subtask" id="task-subtask-edit">
        <img src="assets/img/plus.svg" alt="add" onclick="renderAddedSubtask('${taskStatus}', ${x})">
    </div>
    <span id="subtask-to-edit"></span>
    <div class="priority-edit" id="task-priority-edit">
        <button id="urgent-btn" type="button" onclick="setPriority('urgent'); editPriority('urgent', '${taskStatus}', ${x})">Urgent <img id="urgent-btn-img" src="assets/img/urgent.svg" alt="urgent"></button>
        <button id="medium-btn" type="button" onclick="setPriority('medium'); editPriority('medium', '${taskStatus}', ${x})">Medium <img id="medium-btn-img" src="assets/img/medium.svg" alt="medium"></button>
        <button id="low-btn" type="button" onclick="setPriority('low'); editPriority('low', '${taskStatus}', ${x})">Low <img id="low-btn-img" src="assets/img/low.svg" alt="low"></button>
    </div>
    <span>Assigned to</span>
    <span id="persons-to-edit" class="names"></span>
    <div onclick="closeEdit('${taskStatus}', ${x})" class="ok-btn"><button onclick="closeEdit('${taskStatus}', ${x})">OK</button>
    <img src="assets/img/check.svg">
    </div>
`;
}

function htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus){
    return `
    <div class="ckeckbox-in-edit"> 
    <input style="width:5%" type="checkbox" class="edited-subtasks" ${checkedStatus}/> 
    <span>${subtasksToEdit[i]}</span>
    </div>
    `;
}

function htmlTemplateAssignedToEdit(assignedToEdit, j){
    return`
    <div >
        <div class="initials-icon bg${j}">${assignedToEdit[j]}</div>        
    </div>
    `;
}
