//time limit for each question: 15sec
//max questions: 5
//max time limit : maxquestion * timeLimit (75sec)
// penaltyForIncorrectAnswer: 10 sec

// -----------------------------
//    Variables declarations 
// -----------------------------

let highscores = [];
const LOCALSTORAGE_KEY = "highscores";

// -----------------------------
//    functions declarations 
// -----------------------------

// ------ DOM  ------

// select DOM element by id pass
// parameter id: string
// return DOM element
let getContainer = function(id){
    let container;
    if(id === "header"){
        container = document.querySelector("header");
    }else{
        container = document.getElementById(id);
    }
    return container; 
}

// hide the container by the id given
// parameter id: string
// return null
let hideContainer = function(id){
    let container = getContainer(id);
    container.classList.add("hidden");
}

// display the container by the id given
// parameter id: string
// return null
let showContainer = function(id){
    let container = getContainer(id);
    container.classList.remove("hidden");
}

// ----- Local Storage  -----

// load highscores from localStorage
let loadHighscores = function(){
    if(localStorage[LOCALSTORAGE_KEY]){
        highscores = JSON.parse(localStorage[LOCALSTORAGE_KEY]);
    }
}

// store highscores in localStorage
let saveHighscores = function(){
    if(highscores.length !== 0){
        //only save if highscores is not empty
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(highscores));
    }else if(highscores.length === 0){
        //if empty, clear the localStorage.
        clearHighscores();
    }
}
let clearHighscores = function(){
    highscores = [];
    if(localStorage[LOCALSTORAGE_KEY]){
        //if stored in localStorage 
        //clear the localStorage
        localStorage.removeItem(LOCALSTORAGE_KEY);
    }
}


// ----- Renderers  -----

let renderhighscores = function(){
    let listElement = document.getElementById("highscoreList");
    let li;
    highscores.forEach(function(highscore,index){
        li = document.createElement("li");
        //TODO**** insert li contents
        listElement.appendChild(li);
    });
}

// -----------------------------
//       Event Listeners 
// -----------------------------
document.getElementById("highscores").addEventListener("click",function(event){
    //prevent the page from reloading.
    event.preventDefault();

    //hide header and landingPageContainer
    hideContainer("header");
    hideContainer("landingViewContainer");

    //get the results from localstorage
    loadHighscores();
    //construct the highscorePage
    renderhighscores();
    //show highScorepage
    showContainer("highscoresViewContainer");
});

document.getElementById("btnStart").addEventListener("click",function(event){

});



document.getElementById("btnBack").addEventListener("click",function(event){
    //hide highscores Page
    hideContainer("highscoresViewContainer");
    //show header and landing page. 
    showContainer("header");
    showContainer("landingViewContainer");
});

document.getElementById("btnClear").addEventListener("click",function(){
    //TODO ** dummy for now. later test this with actual data. 
    clearHighscores();

    //re-render the page
    renderhighscores();
});


