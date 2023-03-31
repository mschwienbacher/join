async function initBoardBackend() {
    await downloadFromServer();
    allContacts = JSON.parse(backend.getItem('contacts')) || [];
    category = JSON.parse(backend.getItem('category')) || [];
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    await renderTasks();
}


async function renderTasks() {
    const filterTasksByTodo = tasks.filter(tasks => tasks.status == "ToDo");
    const filterTasksByInProgress = tasks.filter(tasks => tasks.status == "InProgress");
    const filterTasksByInFeedback = tasks.filter(tasks => tasks.status == "Feedback");
    const filterTasksByInDone = tasks.filter(tasks => tasks.status == "Done");

    let todoDiv = document.getElementById("todo-tasks");
    let feedbackDiv = document.getElementById("feedback-tasks");
    let muh = [];
    for(let i = 0; i < filterTasksByTodo.length; i++) {
        let singleUser = filterTasksByTodo[i];
        let associatedUsers = singleUser.users;

        todoDiv.innerHTML += singleTaskTemplate(singleUser, i, associatedUsers);
    }

    /*for(let i = 0; i < filterTasksByInFeedback.length; i++) {
        let singleUser = filterTasksByInFeedback[i];
        feedbackDiv.innerHTML += singleTaskTemplate(singleUser, i);
    }*/
}

function singleTaskTemplate(singleUser, i, singleAssociatedUser) {
    return `
        <div class="single-task">
            <div class="category" style="">${singleUser.category}</div>
            <div class="title">${singleUser.title}</div>
            <div class="desc">${singleUser.description}</div>
            <div class="status-bar">
                <div class="slider">bar</div>
                <div class="slider-indication">1/${singleUser.subtasks.length}</div>
            </div>
            <div class="more-dets">
                <span class="users">
                  <span class="circle">${singleAssociatedUser}</span>
                </div>
                <div class="prio">${singleUser.priority}</div>
            </div>
        </div>
    `
}