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
                <div><input class="messageCheckbox" type="checkbox"/> ${categoryToRender}</div>
            </div>
            <img src="${ellipseToRender}">
        </div>
    `;
}

function htmlTemplateDueDate(todayDate){
    return `
        <input type="date" id="due-date" name="trip-start" value="" min="${todayDate}" onfocus="this.showPicker()"required>
        <img src="/assets/img/calendar.svg">
        `;
}

function htmlTemplateNewCategory(){
    return`
    <div class="new-category" id="new-category">
    <span class="hover" onclick="openNewCategory()">New Category</span>
    `;
}

function htmlTemplateNewCategoryEnter(){
    return`
    <div class="input-filed-new-category">
    <input type="text" placeholder="Enter New Category" id="register-category"></input>
    <button type="button" onclick="closeNewCategory()">Cancel</button>
    <button type="button" onclick="getNewCategory()">OK</button>
    </div>
    <div class="category-colors" id="category-colors"></div>
    `;
}

function htmlTemplateNewCategoryColor(ellipse, i){
    return`
    <img src="${ellipse}" id="color${i}" onclick="setCategoryColor(${i})">
    `;
}

function htmlTemplateCategoryChecked(categoryToRender, ellipseToRender){
    return `
        <div class="category-row">
            <div>
                <div><input class="messageCheckbox" type="checkbox" checked>${categoryToRender}</div>
            </div>
            <img src="${ellipseToRender}">
        </div>
    `;
}
