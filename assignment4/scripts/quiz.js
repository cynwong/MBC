class Quiz {

    constructor( config ) {

    }
    reset () {
        
    }
}



// ----- Quiz -----
//time limit for each question: 15sec
//max questions: 5
//max time limit : maxquestion * timeLimit (75sec)
// penaltyForIncorrectAnswer: 10 sec


//    ---- Start quiz - steps ----
//     when User click "start quiz" button,....
//     1. hide landing page
//     2. set display time from 0 to Session_time
//     3. create a count-down timer 
//         a. with 1 sec interval 
//         b. reduce timeRemaining by 1 for each second and update displaytime
//         c. if user chose an answer or every [15 second] change the question
//         d. clear the interval 
//             1. when user answers all questions if questionCount === NO_OF_QUESTIONS_PER_SESSION 
//             2. when timeRemaining is 0
//     4. create a fucntion to render Quiz
//         a. get questions
//         b. use Math.random to choose which question to use
//         c. once we get question index
//             1. get quizQuestion to add question.title
//             2. populate answerChoices with questions.answers(a href with button class)
//         d. add eventListener for click event of answerChoices
//             1. get which answer is chosen. 
//             2. check if answer is correct by comparing with question.answer
//             3. if wrong, incorrectAnswerCount + 1
//             4. render another quiz
//     5. when time is run out or user complete all questions,
//         a. calculate score = timeRemaining - (incorrectAnswerCount * PENALTY_FOR_INCORRECT_ANSWER)
//         b. present the user with the score. resultViewContainer
//     6. In result page, when user click submit button
//         a. check if initials are given. 
//         b. if no, then show the error message
let quiz = {
    // --- settings ---
    config: quizConfig,
    buzzSound: null,

    // --- Timer ---
    sessionTimer: null,
    sessionTimeRemaining: 0, 
    questionTimeRemaining: 0,

    // --- Question ---
    maxQuestionsPerSession : 0,
    questionCount: 0,
    incorrectAnswerCount: 0, //TODO. Do we need this?
    correctAnswerCount: 0,  // TODO, DO we need this?
    totalScore: 0,

    // --- Highscores ---
    highscores: [],  // if we allow user to set number of question per session how are we going to do this. 

    // --- Reset Quiz Data ---
    reset: function() {
        this.maxQuestionsPerSession = this.config.maxQuestionsPerSession;
        this.questionCount = 0;
        this.incorrectAnswerCount = 0;
        this.correctAnswerCount = 0;
        this.totalScore = 0;

        this.sessionTimer = null;
        this.sessionTimeRemaining = this.config.questionTimeLimit * this.maxQuestionsPerSession;
        this.questionTimeRemaining = this.config.questionTimeLimit;

        this.setSoundSystem();
        this.loadHighscores();
    },

    // --- get Function ----
    getSessionTimeRemaining: function () {
        if( this.sessionTimeRemaining < 0 ){
            //make sure session time is always 0 and larger
            this.sessionTimeRemaining = 0;
        }
        return this.sessionTimeRemaining;
    },

    getQuestion: function (title = "") {
        if ( !title ){
            // if no title is given, then return random question
            return questions[Math.floor(Math.random() * questions.length)];
        }
        //if title is given, find the question.
        return questions.filter(obj => { return obj.title === title })[0];
    },

    // --- save Data Functions ---
    setSoundSystem: function ( name= "" ) {
        let url, sound;
        if( !name || this.config.sounds.some( sound => sound.name !== name)) {
            //if no name is given or name is not in the list, use default
            name = this.config.defaultSound;
        }
        sound = this.config.sounds.filter(sound => sound.name === name)[0];
        this.buzzSound = new Audio(sound.url);
    },

    setQuestionPerSession: function(number){
        this.questionsPerSession = number;
    },

    // --- Highscores / localStorage Functions ---
    // load highscores from localStorage
    loadHighscores: function() {
        if(localStorage[this.config.localStorageKey]){
            // if there is data in localStorage
            this.highscores = JSON.parse(localStorage[this.config.localStorageKey]);
        }
    },

    saveHighscores: function() {
        if ( this.highscores.length !== 0 ) {
            // save only if there are some highscores saved.
            localStorage.setItem(this.config.localStorageKey, JSON.stringify(this.highscores));
        } else if ( localStorage[this.config.localStorageKey] ) {
            // if no highscores saved, clear the localstorage data
            localStorage.removeItem(this.config.localStorageKey);
        }
    },

    clearHighscores: function(){
        this.highscores = [];
        this.saveHighscores();
    },

    // --- Quiz Activities ---
    // quiz start
    start: function() {
        // new game so reset all data
        this.reset();
        updateDisplayTimeRemaining(quiz.getSessionTimeRemaining());
        this.nextQuestion();
        this.sessionTimer = setInterval( function () {
            if ( quiz.sessionTimeRemaining === 0 ) {
                //session time has run out, so end session
                quiz.end();
            }
            if ( quiz.questionTimeLimit === 0 ) {
                //time up for answering a question.
                //unanswer question is counted as incorrect. 
                this.totalScore -= this.config.penaltyForIncorrectAnswer;
                // So change to next one.
                quiz.nextQuestion();
            }
            // time countdowns
            quiz.sessionTimeRemaining--;
            quiz.questionTimeRemaining--;
            updateDisplayTimeRemaining(quiz.getSessionTimeRemaining());
        }, 1000);
    },

    nextQuestion: function () {
        //check if user has reached the max number of question.
        if( this.questionCount === this.maxQuestionsPerSession ) {
            //if yes, end this session. 
            this.end();
            return false;
        }
        this.questionTimeRemaining = this.config.questionTimeLimit;
        //increase questionCount
        this.questionCount++;
        renderQuestion(this.getQuestion());
    },

    markAnswer: function ( questionTitle, userAnswer ) {
        let question = this.getQuestion(questionTitle.trim());
        if( question.answer.trim() === userAnswer.trim() ) {
            // if answer is correct, 
            this.totalScore += this.config.awardForCorrectAnswer + this.questionTimeRemaining;
            return true;
        } else {
            //if wrong, 
            this.totalScore -= this.config.penaltyForIncorrectAnswer;
            return false;
        }
    },
    
    calcutateFinalScore: function () {
        if(this.questionCount < this.maxQuestionsPerSession) {
            //any unanswer question is counted as none
            this.totalScore -= (this.maxQuestionsPerSession - this.questionCount) * this.config.penaltyForIncorrectAnswer;
        }

        if(this.totalScore < 0) {
            //force min score to 0
            this.totalScore = 0;
        }
    },
    // end of quiz
    end: function () {
        //clear timer
        clearInterval(this.sessionTimer);
        // calcuate final score in case there are some unanswered questions. 
        this.calcutateFinalScore();
        //call renderResult to display the result. 
        displayResult();
    },
    
    buzz: function () {
        this.buzzSound.play();
    },

    saveScore: function (username) {
        let newHighscore = {
            userInitials: username,
            score: this.totalScore,
        };
        this.highscores.push(newHighscore);
        this.saveHighscores();
    }


};
