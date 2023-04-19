let urgentCounter = 0;
let dateList = [];

function getUsernameFromLocalStorage() {
    let username = localStorage.getItem('username');
    return username;
}


function checkUsernameInUrl(name) {
    let urlParams = new URLSearchParams(window.location.search);
    let username = urlParams.get('name');
    return username === name;
}

let username = getUsernameFromLocalStorage();

function loadUserNameForGreeting() {
    if (checkUsernameInUrl(username)) {
        if (username !== null) {
            document.getElementById('username-input').innerText = `, ${username}`;
            document.getElementById('username-input-smartphone').innerText = ` ${username}`;
        }
    }
    else {
        document.getElementById('good-morging-smartphone').style.fontSize = '44px'
        document.getElementById('good-morging-smartphone').style.fontWeight = '700'
    }
}


function getCurrentDate(x) {
    let today = new Date();
    let date = x.getDate();
    let month = x.getMonth() + 1;
    let year = x.getFullYear();

    return `${checkMonthName(month)} ${date}, ${year}`;
}

function formatDate(dateString) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = new Date(dateString);
    let monthIndex = date.getMonth();
    let monthName = months[monthIndex];
    let day = date.getDate();
    let year = date.getFullYear();
    let formattedDate = `${monthName} ${day}, ${year}`;
    return formattedDate;
}


function setCurrentDay() {
    document.getElementById('deadline-date').innerText = `${formatDate(nextClosestDate(today(), dateList))}`;
}


function nextClosestDate(date, dateList) {
    let closest = dateList[0];
    let diff = Math.abs(date - closest);
    for (let i = 1; i < dateList.length; i++) {
        let newDiff = Math.abs(date - dateList[i]);
        if (newDiff < diff) {
            diff = newDiff;
            closest = dateList[i];
        }
    }
    return closest;
}


function loadTasksDates() {
    for (i = 0; i < tasksToDo.length; i++) {
        dateList.push(tasksToDo[i]['dueDate'])
    }
    for (i = 0; i < tasksInProgress.length; i++) {
        dateList.push(tasksInProgress[i]['dueDate'])
    }
    for (i = 0; i < tasksAwaitFeedback.length; i++) {
        dateList.push(tasksAwaitFeedback[i]['dueDate'])
    }
    for (i = 0; i < tasksDone.length; i++) {
        dateList.push(tasksDone[i]['dueDate'])
    }
}


function today() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 8;
    let year = today.getFullYear();
    return `${today.getFullYear()}-${checkForZero()}${(today.getMonth() + 1)}-${today.getDate()}`
}


function checkForZero() {
    let today = new Date();
    let month = today.getMonth() + 1;
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
    checkForUrgentTasks()
    loadTasksDates()
    setCurrentDay()
}


function setTheNumbersInHtml() {
    document.getElementById('tasks-to-do-counter').innerText = tasksToDo.length;
    document.getElementById('task-in-board-counter').innerText = (tasksToDo.length + tasksInProgress.length + tasksAwaitFeedback.length + tasksDone.length)
    document.getElementById('task-in-progress').innerText = tasksInProgress.length;
    document.getElementById('task-awaiting-feedback').innerText = tasksAwaitFeedback.length;
    document.getElementById('task-done-counter').innerText = tasksDone.length;
}


function checkForUrgentTasks() {
    for (i = 0; i < tasksToDo.length; i++) {
        if (tasksToDo[i]['priorityByName'] === 'urgent') {
            urgentCounter++
            document.getElementById('tasks-urgent-counter').innerText = urgentCounter;
        }
    }
    for (i = 0; i < tasksInProgress.length; i++) {
        if (tasksInProgress[i]['priorityByName'] === 'urgent') {
            urgentCounter++
            document.getElementById('tasks-urgent-counter').innerText = urgentCounter;
        }
    }
    for (i = 0; i < tasksAwaitFeedback.length; i++) {
        if (tasksAwaitFeedback[i]['priorityByName'] === 'urgent') {
            urgentCounter++
            document.getElementById('tasks-urgent-counter').innerText = urgentCounter;
        }
    }
    for (i = 0; i < tasksDone.length; i++) {
        if (tasksDone[i]['priorityByName'] === 'urgent') {
            urgentCounter++
            document.getElementById('tasks-urgent-counter').innerText = urgentCounter;
        }
    }
}


function greetingOnSmartDevice() {
    if (window.innerWidth < 1140) {
        document.getElementById('full-screen-greeting').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('full-screen-greeting').style.display = 'none';
        }, 3000);
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
getUsernameFromLocalStorage()
loadUserNameForGreeting()
greetingOnSmartDevice()