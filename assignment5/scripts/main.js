

$(document).ready(function(){

    
    //display date in p#currentDay 
    function displayDate(date){
        $("#currentDay").html(date);
    }
    
    //get date
    function displayToday(){
        displayDate(moment().format('dddd, MMMM Do'))
    }


    //init
    displayToday();
});