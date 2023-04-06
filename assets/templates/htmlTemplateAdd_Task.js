function htmlTemplateSubtasks(newtaskSubtask, i){
    return `
    <div class="row">
    <input class="checkbox-subtask" type="checkbox"> &nbsp;
    <span id="${i}">${newtaskSubtask}</span>
    </div>`;    
}

function htmlTemplateListAssignedTo(i){
    return `
    <li><input class="checkbox-contacts" type="checkbox" /> ${contacts[i]['name']} ${contacts[i]['second-name']}</li>
    `;
}

function htmlTemplateCategory(categoryToRender, ellipseToRender){
    return `
        <div class="category-row">
            <div>
                <div><input class="messageCheckbox" type="checkbox" /> ${categoryToRender} </div>
            </div>
            <img src="${ellipseToRender}">
        </div>
    `;
}