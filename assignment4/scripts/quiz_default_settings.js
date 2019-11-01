const quizConfig = {
    //quiz game settings
    maxQuestionsPerSession : 5,
    questionTimeLimit : 15,  //seconds
    modes : {
        slow : 25,
        normal: 15,
        fast: 5, 
    },

    //marks
    penaltyForIncorrectAnswer : 10, //seconds
    awardForCorrectAnswer : 10,


    //output message for user
    feedbackForIncorrectAnswer: "Wrong!",
    feedbackForCorrectAnswer: "Correct!",
    askForInitials: "Initials are required",

    //sound
    activeSound: "Buzz Sound",
    isSoundOn: true,
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


