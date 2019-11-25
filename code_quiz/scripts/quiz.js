/** 
 * 
 *         Quiz class
 * 
 *  This class handles quesitons for Quiz Game. 
 *  Questions are in {questions} object stored in question.js file. 
 */

class Quiz {
    constructor(){
        this.questions = questions;
    }
 
    /**
     * To get random question
     * @returns question object
     */
    get question() {
        return this.questions[ Math.floor( Math.random() * this.questions.length )];
    }

    /**
     * To get specific question
     * @returns question object
     */
    getThisQuestion ( title ) {
        if( title ){
            //if title is given, find that question
            return this.questions.filter( question => { return question.title === title } )[0];
        } else {
            // with no title, this function cannot find the specific question. 
            return null;
        }
    }
}

