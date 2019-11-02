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

// ----- Renderers  -----

// display alert message to user
function alertUser(content, parentElement) {
    let divAlert = document.createElement("div");
    divAlert.classList.add("alert");
    divAlert.textContent = content;
    parentElement.insertBefore(divAlert, parentElement.children[0]);
}

// disabled the choice buttons
function diableChoices(chosen) {
    chosen.classList.add("chosen");
    for (choiceBtn of document.querySelectorAll("#answerChoices button")) {
        choiceBtn.setAttribute("disabled", "");
        choiceBtn.classList.remove("ripple");
        choiceBtn.classList.add("disabled")
    }
}

// render Result view
function renderResult(score) {
    // in case there is an alert
    alerts = document.querySelectorAll(".alert");
    if (alerts.lenght !== 0) {
        alerts.forEach(alert => { alert.remove(); });
    }
    //reset intial input box
    document.getElementById("txtUserInitials").value = "";
    document.getElementById("txtUserInitials").setAttribute("placeholder", "your initials")
    // insert the total score for display
    document.getElementById("scoreResult").textContent = score;
    //load result view 
    closeOthers([HEADER, RESULT_VIEW]);
}

//render highscore view
function renderhighscores() {
    // quiz data is loaded when page is being renderd. So assume we have the data now. 
    let listElement = document.getElementById("highscoreList");
    let li;
    //clean the displayed list
    listElement.innerHTML = "";
    //populate the list
    highscoreRecord.highscores.forEach(function (highscore) {
        li = document.createElement("li");
        li.textContent = highscore.initials + "  -  " + highscore.score;
        listElement.appendChild(li);
    });
    closeOthers([HIGHSCORE_VIEW]);
};

//transfer the chosen status from previous chosen to new one. 
function transferChosen (from, to){
    demote(from);
    promote(to);
}

// set the button to chosen status
function promote(element) {
    element.setAttribute("disabled", "");
    element.classList.add("chosen");
}

// remove button's chosen status
function demote(element) {
    element.removeAttribute("disabled");
    element.classList.remove("chosen");
}

// construct Quiz Setting View for display
function renderQuizSettings() {
    
    let a;
    let soundFilesContainer = document.getElementById("soundFileSettings");
    
    // set chosen status according to currentGame settings
    promote(document.getElementById("quizModeSettings").querySelector(`[data-info="${currentGame.activeSpeedMode}"]`));
    promote(document.getElementById("soundSettings").querySelector(`[data-info="${currentGame.isSoundOn}"]`));
    
    //make sure sound file container is empty before populating the sound file list.
    soundFilesContainer.innerHTML = "";
    for (let sound of currentGame.soundNames) {
        a = document.createElement("a");
        if(currentGame.chosenSound === sound){
            //if this sound is chosen,
            a.classList.add("chosen");
        }
        a.classList.add("dropdown-item");
        a.setAttribute("href", "#");
        a.textContent = sound;
        soundFilesContainer.appendChild(a);
    }
}

// ----- Others ----- 
// save the user's score to highscore records. 
function saveResult() {
    let user = document.getElementById("txtUserInitials").value;
    let score = document.getElementById("scoreResult").textContent;
    if (!user) {
        //if user initials are not given, the result cannot be saved. 
        //so alert user and quit the process
        alertUser(quizConfig.askForInitials, document.getElementById("resultViewContainer").getElementsByTagName("fieldset")[0]);
        return false;
    }
    //save the score
    highscoreRecord.saveScore(user, currentGame.result);
    return true;
}

// check user answer after user makes their choice. 
function markUserAnswer(answer) {
    let question = document.getElementById("quizQuestion").textContent;

    if (!answer) {
        //with no answer content, result cannot be checked
        alertUser("Error: Answer text missing. Cannot validate the answer. ", document.getElementById(QUIZ_VIEW));
        return false;
    }
    if (!question) {
        //if no answer, we cannot check. 
        alertUser("Error: Question text missing. Cannot validate the answer. ", document.getElementById(QUIZ_VIEW));
        return false;
    }
    let isCorrect = currentGame.markAnswer(question, answer);
    if (isCorrect === true) {
        //if correct,
        document.getElementById("feedback").textContent = quizConfig.feedbackForCorrectAnswer;
    } else {
        //wrong answer, so increase the wrong answer count
        currentGame.buzz();
        document.getElementById("feedback").textContent = quizConfig.feedbackForIncorrectAnswer;
    }
}

// -----------------------------
//       Event Listeners 
// -----------------------------

// ----- header section -----
document.getElementById("highscores").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //construct the highscores Page
    renderhighscores();

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

// ----- Landing View - #landingViewContainer -----
document.getElementById("btnStart").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //render quiz page
    currentGame.start();

    //switch to quiz view
    closeOthers([QUIZ_HEADER, QUIZ_VIEW]);
});

// ----- Quiz View - #quizViewContainer -----
document.getElementById("answerChoices").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //diabled the choices
    diableChoices(event.target);


    //check user answer
    let answer = event.target.textContent;
    markUserAnswer(answer);

    //display feedback to user
    show(FEEDBACK_VIEW);

});

document.querySelector(".buttonNext").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //go to next question
    currentGame.next();
});

// ----- Result View - #resultViewContainer -----
document.getElementById("btnSubmit").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //save the score 
    if (!saveResult()) {
        //if there is a error in saveResult function. stay on this view
        return false;
    }

    //go to highscore view
    renderhighscores();
});

// ----- Highscore Records View - #highscoresViewContainer -----

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
    highscoreRecord.clear();

    //re-render the page
    renderhighscores();
});

// ----- Quiz Setting View - #quizSettingViewContainer -----

document.getElementById("quizModeSettings").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    let mode = event.target.getAttribute("data-info");
    //save the change
    currentGame.changeSpeed = mode;

    //first remove chosen status from target's sibling
    //Now add chosen status to the target
    transferChosen(document.getElementById("quizModeSettings").querySelector(".chosen"), event.target);
});

document.getElementById("soundSettings").addEventListener("click", function () {
    //prevent the page from reloading.
    event.preventDefault();
    if (event.target.matches("a")) {
        //if dropdown item
        currentGame.changeSound = event.target.textContent;
        transferChosen(document.getElementById("soundSettings").querySelector("a.chosen"),event.target);
    }else if(event.target.matches("button") && !event.target.classList.contains("dropdown-toggle")){
        isOn = event.target.getAttribute("data-info") === "true" ? true : false;
        currentGame.toggleSound =isOn;
        transferChosen(document.getElementById("soundSettings").querySelector("button.chosen"),event.target);
        
    }
});

document.getElementById("btnCloseSettings").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    // go back to landing page
    closeOthers([HEADER, LANDING_VIEW]);
});





// -----------------------------------
//   Action when the page is loaded 
// -----------------------------------
let highscoreRecord = new Highscores(quizConfig.localStorageKey);
let currentGame = new Game();