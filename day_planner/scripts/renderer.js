
class dayCalendarRenderer {

    constructor(calendar) {
        //DOM ELements
        this._currentDay = $("#currentDay");
        this._container = $(".container-fluid");

        //renderer defaults
        this._calendar = calendar; //do i need this? TODO
        this._date = calendar.thisDay;
        this._currentTime = parseInt(calendar.currentHour);

        //calendar data. 
        this._startHour = 9;
        this._endHour = 17;
        this._timeFormat = "12h"; //24h or 12h time format. 

        //default strings
        this._SUFFIX_AM = "AM";
        this._SUFFIX_PM = "PM";
        this._CLASSNAME_PAST = "past";
        this._CLASSNAME_PRESENT = "present";
        this._CLASSNAME_FUTURE = "future";

        this.resetDisplay();
    }

    resetDisplay() {
        this.displayDate(this.date);
        this.renderDayView();
    }

    get date () {
        return this._date;
    }
    get is12hTimeFormat() {
        return this._timeFormat.localeCompare("12h") === 0;
    }
    //display date in p#currentDay 
    displayDate() {
        this._currentDay.html(this.date.format("dddd, MMMM Do"));
    }

    checkTime(time) {
        let calendarDate = this.date.format("L");
        let currentDate = moment().format("L");

        if(calendarDate.localeCompare(currentDate) === -1){
            //if calender current's day is in the past a.k.a older date
            // e.g a day before or a month before
            return this._CLASSNAME_PAST;
        } else if (calendarDate.localeCompare(currentDate) === 1){
            // if current day is in the future. aka later date
            return this._CLASSNAME_FUTURE;
        } else if(calendarDate.localeCompare(currentDate) === 0){
            // if same day,  check the time 
            if (time < this._currentTime) {
                return this._CLASSNAME_PAST;
            } else if (time === this._currentTime) {
                return this._CLASSNAME_PRESENT;
            } else if (time > this._currentTime) {
                return this._CLASSNAME_FUTURE;
            }
        }
    }

    getDayHourDisplay(hour) {
        let row = $("<div />", { "class": "row" });
        // description column
        let currentStyle = "";
        let colDescription = $("<div />", {
            "class": "col-8 col-sm-10 description",
        });
        //Past/Present/Future classes. 
        colDescription.addClass(this.checkTime(hour));
        colDescription.append($("<textarea>"));

        //hour column
        let colTime = $("<div />", {
            "class": "col-2 col-sm-1 hour",
        });

        //check if we need fix and how to display the time. 
        let suffix = this.is12hTimeFormat ? this._SUFFIX_AM : "";
        if (hour >= 12 && this.is12hTimeFormat) {
            //afternoon, time suffix needs to be changed. 
            if (hour > 12) { hour -= 12; }
            suffix = this.is12hTimeFormat ? this._SUFFIX_PM : "";
        }
        colTime.html(hour + suffix); //set the content



        //save button
        let colSaveBtn = $("<div />", {
            "class": "col-2 col-sm-1 saveBtn",
            "html": '<span class="fa fa-save"></span>',
        });

        row.append(colTime, colDescription, colSaveBtn);

        //hour column
        return row;
    }

    renderDayView() {
        let hourContainer;
        for (let i = this._startHour; i <= this._endHour; i++) {
            this._container.append(this.getDayHourDisplay(i));
        }//TODO this is not rendering Check if this is being called. 
    }
};

