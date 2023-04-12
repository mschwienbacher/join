let currentDraggedElement;
let taskStatus;
let movedTask;

/**
 * this function allows to drop an element
 * 
 * @param {Event} ev 
 */
function allowDrop(ev){
    ev.preventDefault();
}

/**
 * this function changes the task's status 
 * 
 * @param {string} container 
 */
function moveTo(container){
    const isGoodValue = val => val && val !== '-' && val !== 'N/A'; /* check for empty arrays*/
    target = container['currentTarget']['id'];
    if (currentDraggedElement == 'tasksToDo'){
        currentTask = tasksToDo[movedTask];
        delete tasksToDo[movedTask];
        tasksToDo = tasksToDo.filter(isGoodValue);
    }

    if (currentDraggedElement == 'tasksInProgress'){
        currentTask = tasksInProgress[movedTask];
        delete tasksInProgress[movedTask];
        tasksInProgress = tasksInProgress.filter(isGoodValue);
    }

    if (currentDraggedElement == 'tasksAwaitFeedback'){
        currentTask = tasksAwaitFeedback[movedTask];
        delete tasksAwaitFeedback[movedTask];
        tasksAwaitFeedback = tasksAwaitFeedback.filter(isGoodValue);
    }

    if (currentDraggedElement == 'tasksDone'){
        currentTask = tasksDone[movedTask];
        delete tasksDone[movedTask];
        tasksDone = tasksDone.filter(isGoodValue);
    }
    
    if (target == 'to-do-container'){
        tasksToDo.push(currentTask);
        renderBoard();
    }
    if (target == 'in-progress-container'){
        tasksInProgress.push(currentTask);
        renderBoard();
    }
    if (target == 'await-feedback-container'){
        tasksAwaitFeedback.push(currentTask);
        renderBoard();
    }
    if (target == 'done-container'){
        tasksDone.push(currentTask);
        renderBoard();
    }

    saveTasksToBackend();
}

/**
 * this function rembers the task to move
 * 
 * @param {number} i 
 * @param {string} taskStatus 
 */
function startDragging(i, taskStatus){
    movedTask = i;
    currentDraggedElement = taskStatus;
}