let tasks = [];
let tasksUrgent = [];
let tasksToDo = [];
let tasksInProgress = [];
let tasksInFeedback = [];
let tasksDone = [];
let lastDueDate = [];

async function initSummaryBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    getTaskInformations();
}

function getTaskInformations() {
    for (let i = 0; i < tasks.length; i++) {
        let singleTask = tasks[i];
        tasksToDo.push(singleTask.status); // wenn nicht leer dann anzeigen
        getTaskPriority(singleTask, tasksUrgent ,"Urgent", "getPriority");
        getTaskPriority(singleTask, tasksInProgress ,"Progress", "getStatus");
        getTaskPriority(singleTask, tasksInFeedback ,"Feedback", "getStatus");
        getTaskPriority(singleTask, tasksDone ,"Done", "getStatus");
        getNextDueDate(singleTask);
    }
    printSummary();
}

function getNextDueDate(singleTask) {
    lastDueDate.push(singleTask.date);
}

function printSummary() {
    let urgentTasks = document.getElementById("tasks-urgent");
    let toDoTasks = document.getElementById("tasks-todo");
    let inBoardTasks = document.getElementById("tasks-inboard");
    let inProgress = document.getElementById("tasks-progress");
    let inFeedback = document.getElementById("tasks-feedback");
    let inDone = document.getElementById("tasks-done");
    let dueDate = document.getElementById("due-date");

    urgentTasks.innerHTML = tasksUrgent.length;
    toDoTasks.innerHTML = tasksToDo.length;
    inBoardTasks.innerHTML = tasks.length;
    inProgress.innerHTML = tasksInProgress.length;
    inFeedback.innerHTML = tasksInFeedback.length;
    inDone.innerHTML = tasksDone.length;
    dueDate.innerHTML = showNextDeadline();
}

function getTaskPriority(singleTask, arrayToFill, status, fetcher) {
    let attr = "";
    if (fetcher == "getPriority") {
        if (singleTask.priority == status) {
            arrayToFill.push(singleTask.priority);
        }
    } else {
        if (singleTask.status == status) {
            arrayToFill.push(singleTask.status);
        }
    }
}

function showNextDeadline() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    let formattedDate = `${day}/${month}/${year}`;
    let sortedDates = lastDueDate.sort();
    let nextDueDate;
    for (let i = 0; i < sortedDates.length; i++) {
        if (sortedDates[i] >= formattedDate) {
            nextDueDate = sortedDates[i];
            break;
        }
    }

    let [tDay, tMonth, tYear] = nextDueDate.split("/");
    let dateObject = new Date(tYear, tMonth - 1, tDay);
    let options = { month: 'long', day: 'numeric', year: 'numeric' };
    let formattedCorrectDate = dateObject.toLocaleString('en-US', options);
    return formattedCorrectDate;


}