const quizConfig = {
    questionsPerSession : 5,
    questionTimeLimit : 15,  //seconds
    penaltyForIncorrectAnswer : 10, //seconds
    awardForCorrectAnswer : 10,


    //output message for user
    feedbackForIncorrectAnswer: "Wrong!",
    feedbackForCorrectAnswer: "Correct!",
    askForInitials: "Initials are required",

    //sound
    buzzSound = new Audio("./sound/buzzSound.mp3"),
}

