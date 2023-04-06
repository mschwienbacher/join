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
            assignedToEdit = tasksToDo[x]['inCharge'];
            console.log(titleEdit);
            console.log(dueDateEdit);
            break;

        case 'tasksInProgress':
            titleEdit = tasksToDo[x]['titel'];
            textEdit = tasksToDo[x]['text'];
            dueDateEdit = tasksToDo[x]['dueDate'];
            priorityEdit = tasksToDo[x]['priority'];
            assignedToEdit = tasksToDo[x]['inCharge'];
            console.log(titleEdit);
            console.log(dueDateEdit);
            
            break;

        case 'tasksAwaitFeedback':
            titleEdit = tasksAwaitFeedback[x]['titel'];
            textEdit = tasksAwaitFeedback[x]['text'];
            dueDateEdit = tasksAwaitFeedback[x]['dueDate'];
            priorityEdit = tasksAwaitFeedback[x]['priority'];
            assignedToEdit = tasksAwaitFeedback[x]['inCharge'];
            console.log(titleEdit);
            console.log(dueDateEdit);
            break;

        case 'tasksDone':
            titleEdit = tasksDone[x]['titel'];
            textEdit = tasksDone[x]['text'];
            dueDateEdit = tasksDone[x]['dueDate'];
            priorityEdit = tasksDone[x]['priority'];
            assignedToEdit = tasksDone[x]['inCharge'];
            console.log(titleEdit);
            console.log(dueDateEdit);
            break;
    }
    
    let year = dueDateEdit.substring(0,4);
    let month = dueDateEdit.substring(5,7);
    let day = dueDateEdit.substring(8,10);
    document.getElementById('details').classList.add('d-none');
    document.getElementById('edit-task').classList.remove('d-none');

    document.getElementById('edit-task-popup').innerHTML = '';
    document.getElementById('edit-task-popup').innerHTML +=
        htmlTemplateTaskToEdit(titleEdit, textEdit, year, month, day, priorityEdit);
    document.getElementById('textarea-edit').value = textEdit;   
    
}

function closeEdit(){
    document.getElementById('edit-task').classList.add('d-none');
}