// -----------------------------
//    Variables declarations 
// -----------------------------

// ----- DOM -----
const HEADER = "header";
const LANDING_VIEW = "landingViewContainer";
const QUIZ_VIEW = "quizViewContainer";
const RESULT_VIEW = "resultViewContainer";
const HIGHSCORE_VIEW = "highscoresViewContainer";
const DOM_CONTAINER_LIST = [HEADER, LANDING_VIEW, QUIZ_VIEW, RESULT_VIEW, HIGHSCORE_VIEW];
const FEEDBACK_VIEW = "quizFooter";

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

        this.buzzSound = new Audio(this.config.buzzSoundURL);

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
    setQuestionPerSession: function(number){
        this.questionsPerSession = number
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


// ----- Renderers  -----
function renderQuestion (question) {
    let answerContainer = document.getElementById("answerChoices");
    let choiceElement;
    //display the question
    document.getElementById("quizQuestion").textContent = question.title;
    //display the choices
    answerContainer.textContent = "";
    question.choices.forEach(function (choice) {
        choiceElement = document.createElement("button");
        // choiceElement.href = "#";
        choiceElement.textContent = choice;
        // choiceElement.classList.add("button");
        choiceElement.classList.add("choice");
        answerContainer.appendChild(choiceElement);
    });
    //hide feedback area
    hide(FEEDBACK_VIEW);
}

function updateDisplayTimeRemaining (time) {
    document.getElementById("timeRemaining").textContent = time;
}

// construct the display content for user alert. 
// and add as first content in ParentElement given.
function alertUser(message, parentElement){
    let alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.textContent = message;
    parentElement.insertBefore ( alertDiv, parentElement.childNodes[0] );
}

// render the Result view for the user
function displayResult () {
    document.getElementById("scoreResult").textContent = quiz.totalScore;
    document.getElementById("timeRemaining").textContent = 0;
    closeOthers([HEADER, RESULT_VIEW, FEEDBACK_VIEW]);
}

//render highscore view
function renderhighscores () {
    // quiz data is loaded when page is being renderd. So assume we have the data now. 
    let listElement = document.getElementById("highscoreList");
    let li;
    //clean the displayed list
    listElement.innerHTML = "";
    //populate the list
    quiz.highscores.forEach(function (highscore) {
        li = document.createElement("li");
        li.textContent = highscore.userInitials + "  -  " + highscore.score;
        listElement.appendChild(li);
    });
    closeOthers([HIGHSCORE_VIEW]);
};


// ------ DOM  ------

// select DOM element by id pass
let getContainer = function (id) {
    let container;
    if (id === "header") {
        container = document.querySelector("header");
    } else {
        container = document.getElementById(id);
    }
    return container;
};

// hide the container by the id given
let hide = function (id) {
    let container = getContainer(id);
    container.classList.add("hidden");
};

// display the container by the id given
let show = function (id) {
    let container = getContainer(id);
    if (container) {
        if (container.classList.contains("hidden")) {
            container.classList.remove("hidden");
        }
    }
};

//hide all containers except the names given. 
//parameter exceptions : array
let closeOthers = function (exceptions) {
    DOM_CONTAINER_LIST.forEach(function (id) {
        if(exceptions.includes(id)){
            //this container needs to be displayed. 
            show(id);
        }else{
            hide(id);
        }
    });
}




// -----------------------------
//       Event Listeners 
// -----------------------------

// ----- header -----
document.getElementById("highscores").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //in case the user is in the middle of the Quiz
    //if click, during quiz, end the quiz
    if(quiz.sessionTimer){
        quiz.end();
    }

    //construct the highscores Page
    renderhighscores();
    
    //hide header and landingPageContainer and
    //show highScorepage
    closeOthers([HIGHSCORE_VIEW]);
});

// -----  #landingViewContainer -----
document.getElementById("btnStart").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //render quiz page
    quiz.start();

    //switch to quiz view
    closeOthers([HEADER, QUIZ_VIEW]);
});

// ----- #quizViewContainer -----


document.getElementById("answerChoices").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //disabled the buttons. TODO. style the disabled buttons
    event.target.classList.add("chosen");
    for ( choiceBtn of document.querySelectorAll("#answerChoices button") ){
        choiceBtn.setAttribute("disabled", "");
        choiceBtn.classList.remove("ripple");
        choiceBtn.classList.add("disabled")
    }

    //get user answer
    let answer = event.target.textContent;
    let question = document.getElementById("quizQuestion").textContent;
    
    
    if ( !answer ) {
        //if no answer, we cannot check. 
        alertUser ( "Error: Answer text missing. Cannot validate the answer. ", document.getElementById(QUIZ_VIEW) );
        return false; 
    }
    if ( !question ) {
        //if no answer, we cannot check. 
        alertUser ( "Error: Question text missing. Cannot validate the answer. " , document.getElementById(QUIZ_VIEW) );
        return false; 
    }

    let isCorrect = quiz.markAnswer( question, answer );
    //check the answer
    if ( isCorrect ) {
        //if correct,
        document.getElementById("feedback").textContent = quiz.config.feedbackForCorrectAnswer;
    } else {
        //wrong answer, so increase the wrong answer count
        quiz.buzz();
        document.getElementById("feedback").textContent = quiz.config.feedbackForIncorrectAnswer;
    }
    show(FEEDBACK_VIEW);
});

document.querySelector(".buttonNext").addEventListener( "click", function () {
    quiz.nextQuestion();
});

// ----- #resultViewContainer -----
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    let user = document.getElementById("txtUserInitials").value;
    let score = document.getElementById("scoreResult").textContent;
    if (!user) {
        //if user initials are not given, the result cannot be saved. 
        //so alert user and quit the process
        let divAlert = document.createElement("div");
        divAlert.classList.add("alert");
        divAlert.textContent = MESSAGES_FOR_USER.askForInitials;
        document.getElementById("resultViewContainer").insertBefore(divAlert, document.getElementsByTagName("fieldset")[0])
        return false;
    }
    //save the score
    quiz.saveScore(user);
    //go to highscore view
    renderhighscores();
});

// ----- #highscoresViewContainer -----

document.getElementById("btnBack").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();
    
    //hide highscores Page and show header and landing page. 
    closeOthers([HEADER, LANDING_VIEW]);
});

document.getElementById("btnClear").addEventListener("click", function () {
    //prevent the page from reloading.
    event.preventDefault();
    
    //remove all saved highscores
    quiz.clearHighscores();

    //re-render the page
    renderhighscores();
});


// -----------------------------
//  Actions when loading the page
// -----------------------------
quiz.reset();