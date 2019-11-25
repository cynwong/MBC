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
function getContainer(id) {
    let container;
    if (id === "header") {
        container = document.querySelector("header");
    } else {
        container = document.getElementById(id);
    }
    return container;
}

// hide the container by the id given
function hide(id) {
    let container = getContainer(id);
    container.classList.add("hidden");
}

// display the container by the id given
function show(id) {
    let container = getContainer(id);
    if (container) {
        if (container.classList.contains("hidden")) {
            container.classList.remove("hidden");
        }
    }
}

//hide all containers except the names given. 
//parameter exceptions : array
function closeOthers(exceptions) {
    DOM_CONTAINER_LIST.forEach(function (id) {
        if (exceptions.includes(id)) {
            //this container needs to be displayed. 
            show(id);
        } else {
            hide(id);
        }
    });
}


// -----------------------------
//       Event Listeners 
// -----------------------------

// ----- header section -----
document.getElementById("highscores").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //construct the highscores Page
    renderHighscoresView();

    //hide header and landingPageContainer and
    //show highScorepage
    closeOthers([HEADER, HIGHSCORE_VIEW]);
});

document.getElementById("quizSettings").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //construct quiz setting view
    renderQuizSettings();

    // now open quiz setting view. 
    closeOthers([HEADER, QUIZ_SETTING_VIEW]);
});


// -----------------------------------
//   Action when the page is loaded 
// -----------------------------------
let highscoreRecord = new Highscores(quizConfig.localStorageKey);
let currentGame = new Game();