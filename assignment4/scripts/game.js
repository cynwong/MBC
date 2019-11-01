const quizConfig = {
    maxQuestionsPerSession : 5,
    questionTimeLimit : 15,  //seconds
    penaltyForIncorrectAnswer : 10, //seconds
    awardForCorrectAnswer : 10,


    //output message for user
    feedbackForIncorrectAnswer: "Wrong!",
    feedbackForCorrectAnswer: "Correct!",
    askForInitials: "Initials are required",

    //sound
    defaultSound: "Buzz Sound",
    sounds: [ {
            name: "Buzz Sound",
            url: "./sound/buzzSound.mp3",
        },
        {
            name: "Buzz Fade Out",
            url: "./sound/buzz_fade_out.mp3/"
        },
    ],

    //localStorage
    localStorageKey : "highscores",
};

class Game {

    constructor( config ) {
        this.config = config;
        this.reset(config);
    }

    // --- Set up ---
    reset () {
        this.maxQuestionsPerSession = this.config.maxQuestionsPerSession;
        this.questionCount = 0;
        this.totalScore = 0;

        this.sessionTimer = null;
        this.questionTimeRemaining = this.config.questionTimeLimit;
        this.sessionTimeRemaining = this.questionTimeRemaining * this.maxQuestionsPerSession;

        this.setSoundSystem();
        // this.loadHighscores();
    }

    // set up Buzz sound 
    setSoundSystem ( name = "" ) {
        let url, sound;

        if( !name || this.config.sounds.some( sound => sound.name !== name)) {
            //if no name is given or name is not in the list, use default
            name = this.config.defaultSound;
        }
        sound = this.config.sounds.filter(sound => sound.name === name)[0];
        // this.buzzSound = new Audio(sound.url); //TODO not working with commandline to test it with browser
    }

    // --- data storage ---
    loadHighscores () {
        this.highscores = [];
        if( localStorage[this.config.localStorageKey] ) {
            this.highscores = JSON.parse( localStorage[this.config.localStorageKey] );
        }
    }
}

myQuiz = new Game(quizConfig);


// ----- Quiz -----
//time limit for each question: 15sec
//max questions: 5
//max time limit : maxquestion * timeLimit (75sec)
// penaltyForIncorrectAnswer: 10 sec


//    ---- Start quiz - steps ----
//     when User click "start quiz" button,....
//     1. hide landing page
//     2. set display time from 0 to Session_time
//     3. create a count-down timer 
//         a. with 1 sec interval 
//         b. reduce timeRemaining by 1 for each second and update displaytime
//         c. if user chose an answer or every [15 second] change the question
//         d. clear the interval 
//             1. when user answers all questions if questionCount === NO_OF_QUESTIONS_PER_SESSION 
//             2. when timeRemaining is 0
//     4. create a fucntion to render Quiz
//         a. get questions
//         b. use Math.random to choose which question to use
//         c. once we get question index
//             1. get quizQuestion to add question.title
//             2. populate answerChoices with questions.answers(a href with button class)
//         d. add eventListener for click event of answerChoices
//             1. get which answer is chosen. 
//             2. check if answer is correct by comparing with question.answer
//             3. if wrong, incorrectAnswerCount + 1
//             4. render another quiz
//     5. when time is run out or user complete all questions,
//         a. calculate score = timeRemaining - (incorrectAnswerCount * PENALTY_FOR_INCORRECT_ANSWER)
//         b. present the user with the score. resultViewContainer
//     6. In result page, when user click submit button
//         a. check if initials are given. 
//         b. if no, then show the error message
