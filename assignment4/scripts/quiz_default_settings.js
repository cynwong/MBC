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
    buzzSoundURL : "./sound/buzzSound.mp3",

    //localStorage
    localStorageKey : "highscores",
};


