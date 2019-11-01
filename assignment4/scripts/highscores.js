
/**
 *  class Highscores handle highscores records of the Quiz Game.
 */

class Highscores {
    constructor(storageKey) {
        this._storageKey = storageKey;
        this.load();
    }
    get highscores () {
        return this._highscores;
    }

    set highscores ( highscore ) {
        if( highscore ) {
            //only save if there is a high score. 
            this._highscores.push(highscore);
            this.save();
        }
    }

    load () {
        this._highscores = []; // default
        if( localStorage[this._storageKey] ) {
            this._highscores = JSON.parse( localStorage[this._storageKey] );
        }
    }

    save () {
        localStorage.setItem ( this._storageKey, this._highscores );
    }
    clear () {
        this._highscores = [];
        localStorage.removeItem ( this._storageKey );
    }
}