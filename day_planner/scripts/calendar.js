
class Calendar {

    constructor(date){
        this.resetCalendarMoment(date);
        this._LOCAL_STORAGE_KEY = "events";
    }

    set date(date){
        this.resetCalendarMoment(date);
    }
    /**
     * new date so create a new moment.  
     * date: string in the format of YYYY-MM-DD 
     *  e.g. 2019-11-22
     */
    resetCalendarMoment(date =""){
        if(date && /^([0-9]{4}-[0-9]{2}-[0-9]{2})/.test(date)){
            //if there is date string
            //and it is in date pattern
            //then create that moment
            this._moment = moment(date);
        }else{
            this._moment = moment();
        }
    }

    //get date
    get thisDay(){
        return this._moment;
    }

    get previousDay() {
        return this._moment.subtract(1, "days");
    }

    get nextDay() {
        return this._moment.add(1, "days");
    }

    //get time

    //get Current hour
    //return current hour in 24hr format
    get currentHour(){
            //returning in the format 01 - 24 
            return this._moment.format(`HH`); 
    }
    get events () {
        return this._events; 
    }

    /**
     *  localStorage events format
     *      events = {
     *              "2019-11-01" : {
                        time : 09,
                        description : "My event description"
     *          }
     */
    load(){
        if(localStorage[this._LOCAL_STORAGE_KEY]){
            //if we have data
            this._events = JSON.parse(localStorage[this._LOCAL_STORAGE_KEY]);
            //now get this day's events
            this._events = this._events[this._moment().calendar()];
        } else {
            this._events = {};
        }
    }
    save(){
        localStorage.setItem(this._LOCAL_STORAGE_KEY, JSON.stringify(this._events));
    }

    saveEvent(event){
        

        this.save();
    }
}



/* calendar - 
    for each day, construct row for each hours from 9AM to 5PM
    in each row, 3 cols,
        1. Hour display e.g 11AM
        2. description /event 
        3. save button 

    when user click in the description area, they are allowed to type the description 
    1. save to localStorage for now. 
        1. when user leave the textarea .focusout
        2. when user press enter
        3. when user click save button. 

    when user change the date/ start with today date 
    1. load the day's contents.



*/
    