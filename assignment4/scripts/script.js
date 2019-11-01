// -----------------------------
//    Variables declarations 
// -----------------------------

// ----- DOM -----
const HEADER = "header";
const QUIZ_HEADER = "time";
const LANDING_VIEW = "landingViewContainer";
const QUIZ_VIEW = "quizViewContainer";
const RESULT_VIEW = "resultViewContainer";
const HIGHSCORE_VIEW = "highscoresViewContainer";
const QUIZ_SETTING_VIEW = "quizSettingViewContainer";
const DOM_CONTAINER_LIST = [HEADER, LANDING_VIEW, QUIZ_HEADER, QUIZ_VIEW, RESULT_VIEW, HIGHSCORE_VIEW, QUIZ_SETTING_VIEW];
const FEEDBACK_VIEW = "quizFooter";

// -----------------------------
//       Common Functions
// -----------------------------

// ------ DOM  ------

// select DOM element by id pass
function getContainer ( id ) {
    let container;
    if (id === "header") {
        container = document.querySelector("header");
    } else {
        container = document.getElementById(id);
    }
    return container;
}

// hide the container by the id given
function hide ( id ) {
    let container = getContainer(id);
    container.classList.add("hidden");
}

// display the container by the id given
function show ( id ) {
    let container = getContainer(id);
    if (container) {
        if (container.classList.contains("hidden")) {
            container.classList.remove("hidden");
        }
    }
}

//hide all containers except the names given. 
//parameter exceptions : array
function closeOthers (exceptions) {
    DOM_CONTAINER_LIST.forEach(function (id) {
        if(exceptions.includes(id)){
            //this container needs to be displayed. 
            show(id);
        }else{
            hide(id);
        }
    });
}

// ----- Renderers  -----

//render highscore view
function renderhighscores () {
    // quiz data is loaded when page is being renderd. So assume we have the data now. 
    let listElement = document.getElementById("highscoreList");
    let li;
    //clean the displayed list
    listElement.innerHTML = "";
    //populate the list
    highscoreRecord.highscores.forEach(function (highscore) {
        li = document.createElement("li");
        li.textContent = highscore.userInitials + "  -  " + highscore.score;
        listElement.appendChild(li);
    });
    closeOthers([HIGHSCORE_VIEW]);
};


// -----------------------------
//       Event Listeners 
// -----------------------------

// ----- header -----
document.getElementById("highscores").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //in case the user is in the middle of the Quiz
    //if click, during quiz, end the quiz
    // if(quiz.sessionTimer){
    //     quiz.end();
    // }

    //construct the highscores Page
    renderhighscores();
    
    //hide header and landingPageContainer and
    //show highScorepage
    closeOthers([HIGHSCORE_VIEW]);
});

document.getElementById("quizSettings").addEventListener( "click", function( event ) {
    //prevent the page from reloading.
    event.preventDefault();

    // displaySettings();

    closeOthers([HEADER, QUIZ_SETTING_VIEW]);
});

// -----  #landingViewContainer -----
document.getElementById("btnStart").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //render quiz page
    myQuiz.start();
    //switch to quiz view
    closeOthers([QUIZ_HEADER, QUIZ_VIEW]);
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

    //TODO test this
    
    //remove all saved highscores
    highscoreRecord.clear();

    //re-render the page
    renderhighscores();
});

// ----- #quizSettingViewContainer -----
document.getElementById("btnCloseSettings").addEventListener( "click", function () {
    //prevent the page from reloading.
    event.preventDefault();
    
    // go back to landing page
    closeOthers([HEADER, LANDING_VIEW]);
});

document.getElementById("btnSaveSetttings").addEventListener( "click", function () {
    //prevent the page from reloading.
    event.preventDefault();
    
    //DO SOME ACTIONs TODO

    // go back to landing page
    closeOthers([HEADER, LANDING_VIEW]);
});



// -----------------------------------
//   Action when the page is loaded 
// -----------------------------------
let highscoreRecord = new Highscores(quizConfig.localStorageKey);
let myQuiz = new Game();