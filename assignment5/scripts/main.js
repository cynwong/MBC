

$(document).ready(function(){

    
    


    //init
    currentCalendar = new Calendar();
    console.log(currentCalendar.today)
    calRenderer = new dayCalendarRenderer(currentCalendar.today);
    calRenderer.init();
    

});