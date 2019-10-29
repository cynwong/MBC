const questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>","<javascript>","<js>","<scripting>"],
      answer: "<script>"
    },
    {
      title: "Where is the correct place to insert a JavaScript?",
      choices: ['Both the <head> section and the <body> section are correct','The <head> section','The <body> section','The <html> section'],
      answer: 'Both the <head> section and the <body> section are correct',
    },
    {
      title: 'What is the correct syntax for referring to an external script called "xxx.js"?',
      choices: ['<script src="xxx.js">','<script name="xxx.js">','<script href="xxx.js">'],
      answer: '<script src="xxx.js">',
    },
    {
      title: 'How do you write "Hello World" in an alert box?',
      choices: ['alert("Hello World");','alertBox("Hello World");','msgBox("Hello World");','msg("Hello World");'],
      answer: 'alert("Hello World");',
    },
    {
      title: "How do you create a function in JavaScript?",
      choices: ['function myFunction()','function:myFunction()','function = myFunction()'],
      answer: 'function myFunction()',
    },
    {
      title: 'How do you call a function named "myFunction"?',
      choices: ['myFunction()','myFunction','call function myFunction()','call myFunction()'],
      answer: 'myFunction()',
    },
    {
      title: "How to write an IF statement in JavaScript?",
      choices: ['if (i == 5)','if i == 5 then','if i = 5 then','if i = 5'],
      answer: 'if (i == 5)',
    },
    {
      title: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
      choices: ['if (i != 5)','if i =! 5 then','if (i <> 5)','if i <> 5'],
      answer: 'if (i != 5)',
    },
    {
      title: "How does a WHILE loop start?",
      choices: ['while (i <= 10)','while (i <= 10; i++)','while i = 1 to 10'],
      answer: 'while (i <= 10)',
    },
    {
      title: 'How does a FOR loop start?',
      choices: ['for (i = 0; i <= 5; i++)','for (i = 0; i <= 5)','for i = 1 to 5','for (i <= 5; i++)'],
      answer: 'for (i = 0; i <= 5; i++)',
    },
    {
      title: 'What is the correct way to write a JavaScript array?',
      choices: ['var colors = ["red", "green", "blue"]','var colors = (1:"red", 2:"green", 3:"blue")','var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")','var colors = "red", "green", "blue"'],
      answer: 'var colors = ["red", "green", "blue"]',
    {
      title: 'How do you round the number 7.25, to the nearest integer?',
      choices: ['Math.round(7.25)','Math.rnd(7.25)','round(7.25)','rnd(7.25)'],
      answer: 'Math.round(7.25)',
    },
    {
      title: 'How do you find the number with the highest value of x and y?',
      choices: ['Math.max(x,y)','Math.ceil(x,y)','top(x,y)','ceil(x,y)'],
      answer: 'Math.max(x,y)',
    },
    {
      title: 'How can you detect the client\'s browswer name?',
      choices: ['navigator.appName','browser.name','client.navName'],
      answer: 'navigator.appName',
    },
    {
      title: 'Which event occurs when the user clicks on an HTML element?',
      choices: ['onclick','onmouseclick','onmouseover','onchange'],
      answer: 'onclick',
    },
    {
      title: 'How do you declare a JavaScript variable?',
      choices: ['var carName;','v carName;','variable carName;'],
      answer: 'var carName;',
    },
    {
      title: 'Which operator is used to assign a value to a variable?',
      choices: ['=','-','X','*'],
      answer: '=',
    },
    {
      title: 'What will the following code return: Boolean(10>9)',
      choices: ['false','true','NaN','undefined'],
      answer: 'true',
    },
    {
      title: 'Is JavaScript case-sensitive?',
      choices: ['Yes','No'],
      answer: 'Yes',
    },
  ];

/*
    {
      title: '',
      choices: ['','','',''],
      answer: '',
    },
*/