/**
 *  ************************************************************
 *    
 *      Quiz Setting View - #quizSettingViewContainer
 * 
 *     contains functions and event listeners for Settings view
 * *************************************************************
 */

// -----------------------------
//       Related Functions 
// -----------------------------

//transfer the chosen status from previous chosen to new one. 
function transferChosen(from, to) {
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
        if (currentGame.chosenSound === sound) {
            //if this sound is chosen,
            a.classList.add("chosen");
        }
        a.classList.add("dropdown-item");
        a.setAttribute("href", "#");
        a.textContent = sound;
        soundFilesContainer.appendChild(a);
    }
}

// -----------------------------
//       Event Listeners 
// -----------------------------

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
        transferChosen(document.getElementById("soundSettings").querySelector("a.chosen"), event.target);
    } else if (event.target.matches("button") && !event.target.classList.contains("dropdown-toggle")) {
        isOn = event.target.getAttribute("data-info") === "true" ? true : false;
        currentGame.toggleSound = isOn;
        transferChosen(document.getElementById("soundSettings").querySelector("button.chosen"), event.target);

    }
});

document.getElementById("btnCloseSettings").addEventListener("click", function (event) {
    //prevent the page from reloading.
    event.preventDefault();

    // go back to landing page
    closeOthers([HEADER, LANDING_VIEW]);
});
