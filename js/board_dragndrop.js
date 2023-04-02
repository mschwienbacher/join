let currentDraggedElement;
let taskStatus;
let movedTask;

function allowDrop(ev){
    ev.preventDefault();
}

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
        renderTasksDone();
        renderTasksToDo();
        renderTasksAwaitFeedback();
        renderTasksInProgress();
    }
    if (target == 'in-progress-container'){
        tasksInProgress.push(currentTask);
        renderTasksDone();
        renderTasksToDo();
        renderTasksAwaitFeedback();
        renderTasksInProgress();
    }
    if (target == 'await-feedback-container'){
        tasksAwaitFeedback.push(currentTask);
        renderTasksDone();
        renderTasksToDo();
        renderTasksAwaitFeedback();
        renderTasksInProgress();
    }
    if (target == 'done-container'){
        tasksDone.push(currentTask);
        renderTasksDone();
        renderTasksToDo();
        renderTasksAwaitFeedback();
        renderTasksInProgress();
    }
}

function startDragging(i, taskStatus){
    movedTask = i;
    console.log('moved task:'+i);
    console.log(taskStatus);
    currentDraggedElement = taskStatus;
    console.log(currentDraggedElement);
}