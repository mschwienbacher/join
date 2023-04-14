let deadlinecounter = 0;

function getUsernameFromLocalStorage() {
    const username = localStorage.getItem('username');
    return username;
}


function checkUsernameInUrl(name) {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('name');
    return username === name;
}

const username = getUsernameFromLocalStorage();

function loadUserNameForGreeting() {
    if (checkUsernameInUrl(username)) {
        document.getElementById('username-input').innerText = `, ${username}`;
    } else {
        console.log('Username')
    }
}

function getCurrentDate() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${checkMonthName(month)} ${date}, ${year}`;
}


function setCurrentDay() {
    document.getElementById('deadline-date').innerText = `${getCurrentDate()}`;
}


function today() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 8;
    const year = today.getFullYear();
    return `${today.getFullYear()}-${checkForZero()}${(today.getMonth() + 1)}-${today.getDate()}`
}


function checkForZero() {
    const today = new Date();
    const month = today.getMonth() + 1;
    if ((today.getMonth() + 1) < 10) {
        return `0`
    }
}


async function loadTasksFromForSummary() {
    await downloadFromServer();
    loadTasksFromBackend();
    let taskstringToDo = backend.getItem('tasksToDo');
    let taskstringInProgress = backend.getItem('tasksInProgress');
    let taskstringAwaitFeedback = backend.getItem('tasksAwaitFeedback');
    let taskstringDone = backend.getItem('tasksDone');
    tasksToDo = JSON.parse(taskstringToDo) || [];
    tasksInProgress = JSON.parse(taskstringInProgress) || [];
    tasksAwaitFeedback = JSON.parse(taskstringAwaitFeedback) || [];
    tasksDone = JSON.parse(taskstringDone) || [];
    setTheNumbersInHtml()
    checkForMatchingDates()
}


function setTheNumbersInHtml() {
    document.getElementById('tasks-to-do-counter').innerText = tasksToDo.length;
    document.getElementById('task-in-board-counter').innerText = (tasksToDo.length + tasksInProgress.length + tasksAwaitFeedback.length + tasksDone.length)
    document.getElementById('task-in-progress').innerText = tasksInProgress.length;
    document.getElementById('task-awaiting-feedback').innerText = tasksAwaitFeedback.length;
    document.getElementById('task-done-counter').innerText = tasksDone.length;
}


function checkForMatchingDates() {
    console.log(today())
    for (i = 0; i < tasksToDo.length; i++) {
        if (tasksToDo[i]['dueDate'] === today()) {
            deadlinecounter++
            document.getElementById('tasks-urgent-counter').innerText = deadlinecounter;
        }
    }
    for (i = 0; i < tasksInProgress.length; i++) {
        if (tasksInProgress[i]['dueDate'] === today()) {
            deadlinecounter++
            document.getElementById('tasks-urgent-counter').innerText = deadlinecounter;
        }
    }
    for (i = 0; i < tasksAwaitFeedback.length; i++) {
        if (tasksAwaitFeedback[i]['dueDate'] === today()) {
            deadlinecounter++
            document.getElementById('tasks-urgent-counter').innerText = deadlinecounter;
        }
    }
    for (i = 0; i < tasksDone.length; i++) {
        if (tasksDone[i]['dueDate'] === today()) {
            deadlinecounter++
            document.getElementById('tasks-urgent-counter').innerText = deadlinecounter;
        }
    }
}


function checkMonthName(M) {
    if (M == 1) {
        return 'January';
    }
    if (M == 2) {
        return 'February';
    }
    if (M == 3) {
        return 'March';
    }
    if (M == 4) {
        return 'April';
    }
    if (M == 5) {
        return 'May';
    }
    if (M == 6) {
        return 'June';
    }
    if (M == 7) {
        return 'July';
    }
    if (M == 8) {
        return 'August';
    }
    if (M == 9) {
        return 'September';
    }
    if (M == 10) {
        return 'October';
    }
    if (M == 11) {
        return 'November';
    }
    if (M == 12) {
        return 'December';
    }
}


loadTasksFromForSummary()
setCurrentDay()
getUsernameFromLocalStorage()
loadUserNameForGreeting()