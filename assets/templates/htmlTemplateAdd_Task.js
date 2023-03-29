function htmlTemplateSubtasks(newtaskSubtask){
    return `
    <div class="row">
    <input type="checkbox"> &nbsp;
    <span>${newtaskSubtask}</span>
    </div>`;    
}

function htmlTemplateListAssignedTo(i){
    return `
    <li><input type="checkbox" /> ${contacts[i]['name']} ${contacts[i]['second-name']}</li>
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