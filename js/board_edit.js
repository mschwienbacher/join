let titleEdit;
let textEdit;
let dueDateEdit;
let priorityEdit;
let assignedToEdit;

function editTask(taskStatus, x) {
    switch (taskStatus) {
        case 'tasksToDo':
            titleEdit = tasksToDo[x]['titel'];
            textEdit = tasksToDo[x]['text'];
            dueDateEdit = tasksToDo[x]['dueDate'];
            priorityEdit = tasksToDo[x]['priority'];
            assignedToEdit = tasksToDo[x]['initials'];
            subtasksToEdit = tasksToDo[x]['subtasks'];
            subtasksToEditAlreadyDone = tasksToDo[x]['alreadyDone'];
            break;

        case 'tasksInProgress':
            titleEdit = tasksInProgress[x]['titel'];
            textEdit = tasksInProgress[x]['text'];
            dueDateEdit = tasksInProgress[x]['dueDate'];
            priorityEdit = tasksInProgress[x]['priority'];
            assignedToEdit = tasksInProgress[x]['initials'];
            subtasksToEdit = tasksInProgress[x]['subtasks'];
            break;

        case 'tasksAwaitFeedback':
            titleEdit = tasksAwaitFeedback[x]['titel'];
            textEdit = tasksAwaitFeedback[x]['text'];
            dueDateEdit = tasksAwaitFeedback[x]['dueDate'];
            priorityEdit = tasksAwaitFeedback[x]['priority'];
            assignedToEdit = tasksAwaitFeedback[x]['initials'];
            subtasksToEdit = tasksAwaitFeedback[x]['subtasks'];
            break;

        case 'tasksDone':
            titleEdit = tasksDone[x]['titel'];
            textEdit = tasksDone[x]['text'];
            dueDateEdit = tasksDone[x]['dueDate'];
            priorityEdit = tasksDone[x]['priority'];
            assignedToEdit = tasksDone[x]['initials'];
            subtasksToEdit = tasksDone[x]['subtasks'];
            break;
    }
    
    let year = dueDateEdit.substring(0,4);
    let month = dueDateEdit.substring(5,7);
    let day = dueDateEdit.substring(8,10);
    document.getElementById('details').classList.add('d-none');
    document.getElementById('edit-task').classList.remove('d-none');
    document.getElementById('edit-task-popup').innerHTML = '';
    document.getElementById('edit-task-popup').innerHTML +=
        htmlTemplateTaskToEdit(titleEdit, textEdit, year, month, day, priorityEdit, taskStatus, x);
    document.getElementById('textarea-edit').value = textEdit;  
    document.getElementById('subtask-to-edit').innerHTML = '';
    for (let i = 0; i < subtasksToEdit.length; i++){
        if (subtasksToEditAlreadyDone[i] == 1){
            checkedStatus = 'checked';
        }else{
            checkedStatus = '';
        }
        document.getElementById('subtask-to-edit').innerHTML +=
            htmlTemplateSubtasksToEdit(subtasksToEdit, i, checkedStatus);
    }

    document.getElementById('persons-to-edit').innerHTML= '';
    for (let j = 0; j < assignedToEdit.length; j++){
        document.getElementById('persons-to-edit').innerHTML +=
            htmlTemplateAssignedToEdit(assignedToEdit, j);
    }    
}

function closeEdit(taskStatus, x){
    let inputElements = document.getElementsByClassName('edited-subtasks');
    let checkboxChecked = [];
    switch (taskStatus){
        case 'tasksToDo':
            for (let i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkboxChecked.push(1);
                } else {
                    checkboxChecked.push(0);
                }
            }
            tasksToDo[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksToDo[x]['alreadyDone'].push(checkboxChecked[i]);
            }
            tasksToDo[x]['titel'] = document.getElementById('edited-title').value;
            tasksToDo[x]['text'] = document.getElementById('textarea-edit').value;
            tasksToDo[x]['dueDate'] = document.getElementById('due-date-edit').value;
            break;

        case 'tasksInProgress':            
            for (let i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkboxChecked.push(1);
                } else {
                    checkboxChecked.push(0);
                }
            }
            tasksInProgress[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksInProgress[x]['alreadyDone'].push(checkboxChecked[i]);
            }
            break;

        case 'tasksAwaitFeedback':
            for (let i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkboxChecked.push(1);
                } else {
                    checkboxChecked.push(0);
                }
            }
            tasksAwaitFeedback[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksAwaitFeedback[x]['alreadyDone'].push(checkboxChecked[i]);
            }
            break;

        case 'tasksDone':
            for (let i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkboxChecked.push(1);
                } else {
                    checkboxChecked.push(0);
                }
            }
            tasksDone[x]['alreadyDone'] = [];
            for (let i = 0; i < checkboxChecked.length; i++){
                tasksDone[x]['alreadyDone'].push(checkboxChecked[i]);
            }
    }
    document.getElementById('edit-task').classList.add('d-none');
    saveTasksToBackend();
    renderBoard();
    }

    function editPriority(level, taskStatus, x){
        switch (level) {
            case 'urgent':
                symbol = "assets/img/urgent.svg";
                break;
            case 'medium':
                symbol = "assets/img/medium.svg";
                break;
            case 'low':
                symbol = "assets/img/low.svg";
                break;
        }
        changePriority(taskStatus, x, symbol, level);        
    }

    function changePriority(taskStatus, x, symbol, level){
        switch (taskStatus){
            case 'tasksToDo':
                tasksToDo[x]['priority'] = symbol;
                tasksToDo[x]['priorityByName'] = level;
                console.log(tasksToDo[x]['priority']);
                console.log(tasksToDo[x]['priorityByName']);
                break;
            case 'tasksInProgress':
                tasksInProgress[x]['priority'] = symbol;
                tasksInProgress[x]['priorityByName'] = level;
                break;
            case 'tasksAwaitFeedback':
                tasksAwaitFeedback[x]['priority'] = symbol;
                tasksAwaitFeedback[x]['priorityByName'] = level;
                break;
            case 'tasksDone':
                tasksDone[x]['priority'] = symbol;
                tasksDone[x]['priorityByName'] = level;
                break;
        }
        
        saveTasksToBackend();   
    }

function stopPropagation(event) {
    event.stopPropagation();
}

    
