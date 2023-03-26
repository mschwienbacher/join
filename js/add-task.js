

function addTask(){

}

function openContactsToAssign(){
    document.getElementById('list-assigned-to').classList.toggle('d-none');
}


function openTaskCategory(){
    document.getElementById('list-task-category').classList.toggle('d-none');
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