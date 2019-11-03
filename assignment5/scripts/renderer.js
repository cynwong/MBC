
class dayCalendarRenderer {

    constructor(date, time) {
        //DOM ELements
        this._currentDay = $("#currentDay");
        this._container = $(".container");

        //renderer defaults
        this._date = date;
        this._currentTime = time;
        this._startHour = 9;
        this._endHour = 17;
        this._suffixAM = "AM";
        this._suffixPM = "PM";
        this._timeFormat = "12h"; //24h or 12h time format. 
    }

    init() {
        this.displayDate(this._date);
        this.renderDayView();
    }

    get is12hTimeFormat() {
        return this._timeFormat.localeCompare("12h");
    }
    //display date in p#currentDay 
    displayDate(date) {
        this._currentDay.html(date.format("dddd, MMMM Do"));
    }

    checkTime(time){
        if(time < this._currentTime){
            return "past";
        } else if (time === this._currentTime){
            return "present";
        }else if( time > this._currentTime){
            //past 
            return "future";
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

        //hour column
        let colTime = $("<div />", {
            "class": "col-2 col-sm-1 hour",
        });
        
        //check if we need fix and how to display the time. 
        let suffix = this.is12hTimeFormat ? this._suffixAM : "";
        if (hour > 12 && this.is12hTimeFormat) {
            //afternoon
            hour -= 12;
        } else if (hour === 12) {
            
            //at midday, time suffix changed. 
            suffix = this.is12hTimeFormat ? this._suffixPM : "";
        }
        colTime.html(hour+suffix); //set the content
        
        

        //save button
        let colSaveBtn = $("<div />", {
            "class": "col saveBtn",
            "html": '<span class="fa fa-save"></span>',
        });

        row.append(colTime, colDescription, colSaveBtn);

        //hour column
        return row;
    }
    
    renderDayView() {
        let hourContainer;
        for (let i = this._startHour; i <= this._endHour; i++) {
            this._container.append( this.getDayHourDisplay(i));
        }//TODO this is not rendering Check if this is being called. 
    }


};

