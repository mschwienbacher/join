function getCurrentDate() {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return `${checkMonthName(month)} ${date}, ${year}`;
}

function setCurrentDay(){
    document.getElementById('deadline-date').innerText = `${getCurrentDate()}`;
}

function checkMonthName(M){
    if(M == 1){
        return 'January';
    }
    if(M == 2){
        return 'February';
    }
    if(M == 3){
        return 'March';
    }
    if(M == 4){
        return 'April';
    }
    if(M == 5){
        return 'May';
    }
    if(M == 6){
        return 'June';
    }
    if(M == 7){
        return 'July';
    }
    if(M == 8){
        return 'August';
    }
    if(M == 9){
        return 'September';
    }
    if(M == 10){
        return 'October';
    }
    if(M == 11){
        return 'November';
    }
    if(M == 12){
        return 'December';
    }
}

setCurrentDay()