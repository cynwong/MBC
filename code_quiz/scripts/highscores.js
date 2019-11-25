
/**
 *  class Highscores handle highscores records of the Quiz Game.
 *  
 */

class Highscores {
    constructor(storageKey) {
        this._storageKey = storageKey;
        this.load();
    }
    get highscores() {
        return this._highscores;
    }

    set highscores(highscore) {
        if (highscore) {
            //only save if there is a high score. 
            this._highscores.push(highscore);
            this.save();
        }
    }

    groupBy(mode) {
        let group = [];
        for (let highscore of this.highscores) {
            if (highscore.gameMode === mode) {
                group.push(highscore);
            }
        }

        return group;
    }
    compareScore(first, second) {
        if (first.score < second.score) {
            return 1;
        }
        if (first.score > second.score) {
            return -1;
        }
        return 0;
    }
    getSortedHighscoreByMode(mode) {
        let group = this.groupBy(mode);
        group.sort(this.compareScore);
        return group;
    }
    getAllSortedHighScores() {
        return {
            relax: this.getSortedHighscoreByMode("relax"),
            normal: this.getSortedHighscoreByMode("normal"),
            fast: this.getSortedHighscoreByMode("fast"),
        }
    }

    load() {
        this._highscores = []; // default
        if (localStorage[this._storageKey]) {
            this._highscores = JSON.parse(localStorage[this._storageKey]);
        }
    }

    saveScore(user, score, mode, noOfQuestions) {
        if (user) {
            //only save if there is a high score. 
            this.highscores = {
                initials: user,
                score: score,
                gameMode: mode,
                noOfQuestions: noOfQuestions,
            };
        }
    }

    save() {
        localStorage.setItem(this._storageKey, JSON.stringify(this._highscores));
    }
    clear() {
        this._highscores = [];
        localStorage.removeItem(this._storageKey);
    }
}