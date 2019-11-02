
/**
 *  ************************************************************
 *     
 *              Landing View - #landingViewContainer 
 * 
 *     contains functions and event listeners for landing view
 * *************************************************************
 */

// -----------------------------
//       Event Listeners 
// -----------------------------

document.getElementById("btnStart").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    //render quiz page
    currentGame.start();

    //switch to quiz view
    closeOthers([QUIZ_HEADER, QUIZ_VIEW]);
});