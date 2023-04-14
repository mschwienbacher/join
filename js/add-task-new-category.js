/**
 * this function opens the popup to enter a new category
 * 
 */
function openNewCategory(){
    document.getElementById('new-category').innerHTML = htmlTemplateNewCategoryEnter();
    addNewCategory();
}

/**
 * this function opens a popup to enter a new category
 * 
 */
function addNewCategory(){
    content = document.getElementById('category-colors');
    content.innerHTML ='';
    for (let i = 0; i < ellipses.length; i++){
        let ellipse = ellipses[i];
        console.log(ellipse);
        content.innerHTML += htmlTemplateNewCategoryColor(ellipse, i);        
    }
}

/**
 * this function closes the new category popup
 * 
 */
function closeNewCategory(){
    document.getElementById('new-category').innerHTML = htmlTemplateNewCategory();
}