//time limit for each question: 15sec
//max questions: 5
//max time limit : maxquestion * timeLimit (75sec)
// penaltyForIncorrectAnswer: 10 sec

// -----------------------------
//    Variables declarations 
// -----------------------------

// for quiz challenge
const NO_OF_QUESTIONS_PER_SESSION = 2;//5;
const TIME_LIMIT_FOR_EACH_QUESTION = 5;//15; //seconds
const SESSION_TIME_LIMIT = NO_OF_QUESTIONS_PER_SESSION * TIME_LIMIT_FOR_EACH_QUESTION;
const PENALTY_FOR_INCORRECT_ANSWER = 15; //seconds.

const FEEDBACK_FOR_INCORRECT = 'Wrong!';
const FEEDBACK_FOR_CORRECT = 'Correct!';

let sessionTimeRemaining, questionTimeRemaining;
let questionCount = 0;
let incorrectAnswerCount = 0;

let sessionTimer;


//high scores 
let highscores = [];
const LOCALSTORAGE_KEY = "highscores";


// DOM
const HEADER = "header";
const LANDING_VIEW = "landingViewContainer";
const QUIZ_VIEW = "quizViewContainer";
const RESULT_VIEW = "resultViewContainer";
const FEEDBACK_VIEW = "quizFeedbackViewContainer";
const HIGHSCORE_VIEW = "highscoresViewContainer";
const DOM_CONTAINER_LIST = [HEADER, LANDING_VIEW, QUIZ_VIEW, RESULT_VIEW, FEEDBACK_VIEW, HIGHSCORE_VIEW];
// -----------------------------
//    functions declarations 
// -----------------------------

// ------ DOM  ------

// select DOM element by id pass
// parameter id: string
// return DOM element
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
// parameter id: string
// return null
let hide = function (id) {
    let container = getContainer(id);
    container.classList.add("hidden");
};

// display the container by the id given
// parameter id: string
// return null
let show = function (id) {
    let container = getContainer(id);
    if (container) {
        if (container.classList.contains("hidden")) {
            container.classList.remove("hidden");
        }
    }
};

//hide all containers except the names given. 
//parameter except : array
let closeOthers = function (exceptions) {
    console.log("closeOThers",exceptions)
    DOM_CONTAINER_LIST.forEach(function (id) {
        hide(id);
    });
    for (e of exceptions) {
        show(e);
    }
}
// ----- Local Storage  -----

// load highscores from localStorage
let loadHighscores = function () {
    if (localStorage[LOCALSTORAGE_KEY]) {
        highscores = JSON.parse(localStorage[LOCALSTORAGE_KEY]);
    }
};

// store highscores in localStorage
let saveHighscores = function () {
    if (highscores.length !== 0) {
        //only save if highscores is not empty
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(highscores));
    } else if (highscores.length === 0) {
        //if empty, clear the localStorage.
        clearHighscores();
    }
};
let clearHighscores = function () {
    highscores = [];
    if (localStorage[LOCALSTORAGE_KEY]) {
        //if stored in localStorage 
        //clear the localStorage
        localStorage.removeItem(LOCALSTORAGE_KEY);
    }
};


// ----- Quiz -----
/*
    Start quiz - steps
    when User click "start quiz" button,....
    1. hide landing page
    2. set display time from 0 to Session_time
    3. create a count-down timer 
        a. with 1 sec interval 
        b. reduce timeRemaining by 1 for each second and update displaytime
        c. if user chose an answer or every 15 second clear the interval
        d. clear the interval 
            1. when user chose an answer, change to new question and when user answers all questions if questionCount === NO_OF_QUESTIONS_PER_SESSION 
            2. after every 15 second (TIME_LIMIT_FOR_EACH_QUESTION)
            3. when timeRemaining is 0
    4. create a fucntion to render Quiz
        a. get questions
        b. use Math.random to choose which question to use
        c. once we get question index
            1. get quizQuestion to add question.title
            2. populate answerChoices with questions.answers(a href with button class)
        d. add eventListener for click event of answerChoices
            1. get which answer is chosen. 
            2. check if answer is correct by comparing with question.answer
            3. if wrong, incorrectAnswerCount + 1
            4. render another quiz
    5. when time is run out or user complete all questions,
        a. calculate score = timeRemaining - (incorrectAnswerCount * PENALTY_FOR_INCORRECT_ANSWER)
        b. present the user with the score. resultViewContainer



*/

let updateDisplayTimeRemaining = function () {
    document.getElementById("timeRemaining").textContent = sessionTimeRemaining;
}

let startQuiz = function () {
    //make sure time limit is always SESSION_TIME_LIMIT
    sessionTimeRemaining = SESSION_TIME_LIMIT;
    questionTimeRemaining = TIME_LIMIT_FOR_EACH_QUESTION;

    //TODO this need to be render but how. 
    renderQuestion();
    closeOthers([HEADER, QUIZ_VIEW]);
    sessionTimer = setInterval(function () {
        if (sessionTimeRemaining === 0) {
            //session time has run out so end session.
            endSession();
        }
        if (questionTimeRemaining === 0) {
            //time up for answering a question. so change to next one. 
            renderQuestion();
        }
        //update time limit with this new limit on the page. 
        updateDisplayTimeRemaining();
        //clock countdowns 
        questionTimeRemaining--;
        sessionTimeRemaining--;
    }, 1000);
};

// end of a quiz session. so show the result
let endSession = function () {
    clearInterval(sessionTimer);
    renderResult();
}


let calculateScore = function(){
    return sessionTimeRemaining - (incorrectAnswerCount * PENALTY_FOR_INCORRECT_ANSWER);
}
// ----- Renderers  -----
let renderQuestion = function () {
    //check if the user has reached the max number of questions. 
    if (questionCount === NO_OF_QUESTIONS_PER_SESSION) {
        //if yes, then it is time to end this quiz session.
        endSession();
        return false;
    }
    //reset questionTime countdown
    questionTimeRemaining = TIME_LIMIT_FOR_EACH_QUESTION;
    //get the question to ask
    let question = questions[Math.floor(Math.random() * questions.length)];
    let answerContainer = document.getElementById("answerChoices");
    let choiceElement;
    //display the question
    document.getElementById("quizQuestion").textContent = question.title;
    answerContainer.textContent = "";
    question.choices.forEach(function (choice) {
        choiceElement = document.createElement("a");
        choiceElement.href = "#";
        choiceElement.textContent = choice;
        choiceElement.classList.add("button");
        choiceElement.classList.add("choice");
        answerContainer.appendChild(choiceElement);
    })
    //increase questionCount
    questionCount++;

}
let renderResult = function () {
    document.getElementById("scoreResult").textContent = calculateScore();
    document.getElementById("timeRemaining").textContent = 0;
    closeOthers([HEADER, RESULT_VIEW,FEEDBACK_VIEW]);

}
let renderhighscores = function () {
    //get the results from localstorage
    loadHighscores();

    let listElement = document.getElementById("highscoreList");
    let li;
    highscores.forEach(function (highscore, index) {
        li = document.createElement("li");
        //TODO**** insert li contents
        listElement.appendChild(li);
    });
};

// -----------------------------
//       Event Listeners 
// -----------------------------

// -----  #landingViewContainer -----
document.getElementById("highscores").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //construct the highscores Page
    renderhighscores();

    //hide header and landingPageContainer and
    //show highScorepage
    closeOthers([HIGHSCORE_VIEW]);
});

document.getElementById("btnStart").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //render quiz page
    startQuiz();
});

// ----- #quizViewContainer -----

document.getElementById("answerChoices").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();
    //get user answer
    let answer = event.target.textContent;
    //get which question to check the answer
    let question = questions.filter(obj => { return obj.title === document.getElementById("quizQuestion").textContent });

    //check the answer
    if (answer.trim() !== question[0].answer.trim()) {
        //wrong answer, so increase the wrong answer count
        incorrectAnswerCount++;
        document.getElementById("feedback").textContent = FEEDBACK_FOR_INCORRECT;
    }else{
        //if correct,
        document.getElementById("feedback").textContent = FEEDBACK_FOR_CORRECT;
    }
    show(FEEDBACK_VIEW);
    let feedbackTimer = setTimeout(function(){
        hide(FEEDBACK_VIEW);
    },3000);
    renderQuestion();
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
    console.log("btnClear clicked")
    //TODO ** dummy for now. later test this with actual data. 
    clearHighscores();

    //re-render the page
    renderhighscores();
});


