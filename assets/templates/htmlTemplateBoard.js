function htmlTemplateTasksToDo(i){
    return `
    <div class="task-container-detail">
        <div class="category category-${tasksToDo[i]['category']}">${tasksToDo[i]['category']}</div>
     <div class="headline-task-detail">${tasksToDo[i]['titel']}</div>
        <div class="text-task-detail">${tasksToDo[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar"></div>
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
        <img src="${tasksToDo[i]['inCharge'][j]}">
    `;
}


function htmlTemplateTasksInProgress(i){
    return `
    <div class="task-container-detail">
        <div class="category category-${tasksInProgress[i]['category']}">${tasksInProgress[i]['category']}</div>
     <div class="headline-task-detail">${tasksInProgress[i]['titel']}</div>
        <div class="text-task-detail">${tasksInProgress[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar"></div>
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
        <img src="${tasksInProgress[i]['inCharge'][j]}">
    `;
}


function htmlTemplateTasksAwaitFeedback(i){
    return `
    <div class="task-container-detail">
        <div class="category category-${tasksAwaitFeedback[i]['category']}">${tasksAwaitFeedback[i]['category']}</div>
     <div class="headline-task-detail">${tasksAwaitFeedback[i]['titel']}</div>
        <div class="text-task-detail">${tasksAwaitFeedback[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar"></div>
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
        <img src="${tasksAwaitFeedback[i]['inCharge'][j]}">
    `;
}


function htmlTemplateTasksDone(i){
    return `
    <div class="task-container-detail">
        <div class="category category-${tasksDone[i]['category']}">${tasksDone[i]['category']}</div>
     <div class="headline-task-detail">${tasksDone[i]['titel']}</div>
        <div class="text-task-detail">${tasksDone[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar"></div>
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
        <img src="${tasksDone[i]['inCharge'][j]}">
    `;
}