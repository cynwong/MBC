const quizConfig = {
    //quiz game settings
    maxQuestionsPerSession : 5,
    questionTimeLimit : 15,  //seconds

    currentMode: "normal",
    modes : {
        slow : {
            timeLimit : 25,
            awardPoints: 5, 
            penaltyPoints: 15,
        },
        normal: {
            timeLimit: 15,
            awardPoints: 15, 
            penaltyPoints: 15,
        },
        fast: {
            timeLimit: 5,
            awardPoints: 25,
            penaltyPoints: 15
        }, 
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
            url: "./sound/buzz_fade_out.mp3"
        },
    ],

    //localStorage
    localStorageKey : "highscores",
};


