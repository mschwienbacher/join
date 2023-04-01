let pushedUsers = [];

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
    for(let i = 0; i < filterTasksByTodo.length; i++) { // Für jeden ToDO-Task
        let singleTask = filterTasksByTodo[i]; // Single ToDoTask
        let associatedUsers = singleTask.users;
        let userElement = associatedUsers[0];
        let finalUser = "";
        if (userElement.length > 1) {
            userElement.forEach(function (element) {
                //TODO get Initials of full string with 2 words (https://stackoverflow.com/questions/33076177/getting-name-initials-using-js) 51
                // PUSH also the category color to the task array
                    /*let splitedUser = element.split(" ");
                splitedUser.forEach(function (item){
                    console.log(item);
                });
                 */
                finalUser += `<span class="circle">${element}</span>`
            }

            );
        } else {
            finalUser += `<span class="circle">${userElement.toString()}</span>`
        }
        todoDiv.innerHTML += singleTaskTemplate(singleTask, i, finalUser);
    }

    /*for(let i = 0; i < filterTasksByInFeedback.length; i++) {
        let singleTask = filterTasksByInFeedback[i];
        feedbackDiv.innerHTML += singleTaskTemplate(singleTask, i);
    }*/
}

function singleTaskTemplate(singleTask, i, finalUser) {
    return `
        <div class="single-task">
            <div class="category" style="">${singleTask.category}</div>
            <div class="title">${singleTask.title}</div>
            <div class="desc">${singleTask.description}</div>
            <div class="status-bar">
                <div class="slider">bar</div>
                <div class="slider-indication">1/${singleTask.subtasks.length}</div>
            </div>
            <div class="more-dets">
              ${finalUser}
                <div class="prio">${singleTask.priority}</div>
            </div>
        </div>
    `
}