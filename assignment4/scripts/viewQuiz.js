/**
 *  ************************************************************
 *     
 *              Quiz View - #quizViewContainer 
 * 
 *     contains functions and event listeners for Quiz view
 * *************************************************************
 */

// -----------------------------
//       Related Functions 
// -----------------------------

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

// disabled the choice buttons
function diableChoices(chosen) {
    chosen.classList.add("chosen");
    for (choiceBtn of document.querySelectorAll("#answerChoices button")) {
        choiceBtn.setAttribute("disabled", "");
        choiceBtn.classList.remove("ripple");
        choiceBtn.classList.add("disabled")
    }
}



// -----------------------------
//       Event Listeners 
// -----------------------------

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