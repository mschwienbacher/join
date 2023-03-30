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

    urgentTasks.innerHTML = tasksUrgent.length;
    toDoTasks.innerHTML = tasksToDo.length;
    inBoardTasks.innerHTML = tasks.length;
    inProgress.innerHTML = tasksInProgress.length;
    inFeedback.innerHTML = tasksInFeedback.length;
    inDone.innerHTML = tasksDone.length;
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

/* SHOW DATES
const today = new Date(); // aktuelles Datum
const dateObjects = lastDueDate.map(date => new Date(date.split('/').reverse().join('/'))); // Array mit Date-Objekten
const sortedDates = dateObjects.sort((a, b) => a - b); // sortiertes Array
console.log(sortedDates);
let nextDate;
for (let i = 0; i < sortedDates.length; i++) {
    if (sortedDates[i] >= today) {
        nextDate = sortedDates[i];
        break;
    }
}

console.log(nextDate.toLocaleDateString());
 */