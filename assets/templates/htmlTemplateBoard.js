function htmlTemplateTasksToDo(i){
    return `
    <div class="task-container-detail">
        <div class="category category-design">${tasksToDo[i]['category']}</div>
     <div class="headline-task-detail">${tasksToDo[i]['titel']}</div>
        <div class="text-task-detail">${tasksToDo[i]['text']}</div>
        <div class="progress-bar-task-detail">
            <div class="progress-bar"></div>
            <div>row1</div>
        </div>
        <div class="footer-task-detail">
        <div class="selected-person" id="selected-person-to-do${i}>
            <img src="assets/img/dummy.png">
            <img src="assets/img/dummy.png">
            <img src="assets/img/dummy.png">
        </div>
        <div class="priority-task-detail">
            <img src="${tasksToDo[i]['priority']}">
        </div>
    </div>
</div>
        `;
}

function htmlTemplateSelectedPersonToDo(i,j){
    return`
        <img src="${tasksToDo[i]['inCharge'][j]}">
    `;
}