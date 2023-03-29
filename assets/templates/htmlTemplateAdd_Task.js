function htmlTemplateSubtasks(newtaskSubtask, i){
    return `
    <div class="row">
    <input class="checkbox-subtask" type="checkbox" checked> &nbsp;
    <span id="${i}">${newtaskSubtask}</span>
    </div>`;    
}

function htmlTemplateListAssignedTo(i){
    return `
    <li><input class="checkbox-contacts" type="checkbox" /> ${contacts[i]['name']} ${contacts[i]['second-name']}</li>
    `;
}

function htmlTemplateCategory(){
    return `
    <ul class="items" >
        <li><input class="messageCheckbox" type="checkbox" value="Backoffive"/> Backoffice</li>
        <li><input class="messageCheckbox" type="checkbox" value="Design"/> Design</li>
        <li><input class="messageCheckbox" type="checkbox" value="Marketing"/> Marketing</li>
        <li><input class="messageCheckbox" type="checkbox" value="Media" /> Media</li>
        <li><input class="messageCheckbox" type="checkbox" value="Sales"/> Sales</li>
    </ul>
    `;
}