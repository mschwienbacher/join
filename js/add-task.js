

function addTask(){
    let title = document.getElementById('task-title').value;    
    let dueDate = document.getElementById('due-date').value;    
    let taskDescription =document.getElementById('task-description').value;
    
    document.getElementById('task-title').value = 'Sag mir warum';

}

function openContactsToAssign(){
    document.getElementById('list-assigned-to').classList.toggle('d-none');
}


function openTaskCategory(){
    document.getElementById('list-task-category').classList.toggle('d-none');
}


function renderAddTask(){
    renderListAssignedTo();
    renderListTaskCategory();
}

function renderListAssignedTo(){
    let content = document.getElementById('checkbox-list-assigned-to');
    content.innerHTML = '';
    for (let i = 0; i < contacts.length; i++)
    content.innerHTML += 
        htmlTemplateListAssignedTo(i);
}


function renderListTaskCategory(){
    content = document.getElementById('list-task-category');
    content.innerHTML = '';
    content.innerHTML =
        htmlTemplateCategory();
}


function renderSubtasks(){
    let content = document.getElementById('task-subtask');
    newtaskSubtask = content.value;
    if (newtaskSubtask.length > 0){
        document.getElementById('ckeckbox-subtasks').innerHTML +=
            htmlTemplateSubtasks(newtaskSubtask)
    }
    content.value = '';
} 

function clearAddTaskForm(){
    document.getElementById('task-title').value = '';
    renderListAssignedTo();
    document.getElementById('due-date').value = "dd/mm/yyyy";
    renderListTaskCategory();
    /* setPriority(); */
    document.getElementById('task-description').value = '';
    document.getElementById('ckeckbox-subtasks').innerHTML = '';
}