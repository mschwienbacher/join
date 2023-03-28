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
    <ul class="items">
        <li><input type="checkbox" /> Backoffice</li>
        <li><input type="checkbox" /> Design</li>
        <li><input type="checkbox" /> Marketing</li>
        <li><input type="checkbox" /> Media</li>
        <li><input type="checkbox" /> Sales</li>
    </ul>
    `;
}