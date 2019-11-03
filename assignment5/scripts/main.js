

$(document).ready(function(){

    
    


    //init
    currentCalendar = new Calendar();
    calRenderer = new dayCalendarRenderer(currentCalendar.today,currentCalendar.currentHour);
    calRenderer.init();
    

});