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


