/**
 *  ************************************************************
 *    
 *      Highscore Records View - #highscoresViewContainer
 * 
 *     contains functions and event listeners for Record view
 * *************************************************************
 */


// -----------------------------
//       Related Functions 
// -----------------------------

//render highscore view
function renderHighscoresView() {
    let records = highscoreRecord.getAllSortedHighScores();

    //render each list in relevant section. 
    renderhighscores(records.slow, document.querySelector(".highscoreList.slow"));
    renderhighscores(records.normal, document.querySelector(".highscoreList.normal"));
    renderhighscores(records.fast, document.querySelector(".highscoreList.fast"));

    //expand the current mode to show the result. i.e. to add class to div with data-parent property

    $(`.highscoreList.${currentGame.gameMode}`).parent().parent().collapse("show");

    closeOthers([HEADER, HIGHSCORE_VIEW]);
}
function renderhighscores(records, listElement) {
    let li;
    //clean the displayed list
    listElement.innerHTML = "";
    //populate the list
    records.forEach(function (highscore) {
        li = document.createElement("li");
        li.textContent = highscore.initials + "  -  " + highscore.score;
        listElement.appendChild(li);
    });

};


// -----------------------------
//       Event Listeners 
// -----------------------------

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
    renderHighscoresView();
});