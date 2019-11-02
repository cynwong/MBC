/**
 *  ************************************************************
 *    
 *           Result View - #resultViewContainer 
 * 
 *     contains functions and event listeners for Result view
 * *************************************************************
 */

// -----------------------------
//       Related Functions 
// -----------------------------

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

// display alert message to user
function alertUser(content, parentElement) {
    let divAlert = document.createElement("div");
    divAlert.classList.add("alert");
    divAlert.textContent = content;
    parentElement.insertBefore(divAlert, parentElement.children[0]);
}

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
    highscoreRecord.saveScore(user, currentGame.result, currentGame.gameMode, currentGame.NoOfQuestions);
    return true;
}

// -----------------------------
//       Event Listeners 
// -----------------------------

document.getElementById("btnSubmit").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //save the score 
    if (!saveResult()) {
        //if there is a error in saveResult function. stay on this view
        return false;
    }

    //go to highscore view
    renderHighscoresView(currentGame.mode);
});