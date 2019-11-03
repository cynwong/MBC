
class dayCalendarRenderer {

    constructor(date) {
        //DOM ELements
        this._currentDay = $("#currentDay");
        this._container = $(".container");

        //renderer defaults
        this._date = date;
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
        return this._timeFormat === "12h";
    }
    //display date in p#currentDay 
    displayDate(date) {
        this._currentDay.html(date.format("dddd, MMMM Do"));
    }

    getDayHourDisplay(hour) {
        let row = $("<div />", { "class": "row" });

        let colTime = $("<div />", {
            "class": "col-2 col-sm-1 hour",
            "text": hour,
        });

        let currentStyle = "";
        let colDescription = $("<div />", {
            "class": "col-8 col-sm-10 description",
        });

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
        let suffix = this.is12hTimeFormat ? this._suffixAM : "";
        let hour;
        for (let i = this._startHour; i <= this._endHour; i++) {
            hour = i;
            if (i > 12 && this.is12hTimeFormat) {
                //afternoon
                hour -= 12;
            } else if (i === 12) {
                
                //at midday, time suffix changed. 
                suffix = this.is12hTimeFormat ? this._suffixPM : "";
            }
            this._container.append( this.getDayHourDisplay(hour + suffix));
        }//TODO this is not rendering Check if this is being called. 
    }


};

