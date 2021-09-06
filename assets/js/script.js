var startBtnEl = window.document.querySelector("#start-btn");
var highScoresBtnEl = window.document.querySelector("#high-scores-button");

var score = 0;
var currentAnswer = -1;
var qIndex = 0
var timeLeft = 75;
var timerEl = document.createElement("h4");
var scoreEl = document.createElement("h3");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var timeInterval = null;
var inputName = null;






var questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "Choose the correct HTML element for the largest heading.",
        choices: ["h6", "head", "h1"],
        correctAnswer: "h1"
    },
    {
        question: "What is the correct HTML element for inserting a line break?",
        choices: ["break", "br", "lb"],
        correctAnswer: "br"
    },
    {
        question: "Choose the correct HTML element to define emphasized text.",
        choices: ["em", "italic", "i"],
        correctAnswer: "em"
    },
    {
        question: "How can you make a numbered list?",
        choices: ["nl", "ul", "ol"],
        correctAnswer: "ol"
    },
    {
        question: "How can you make a bulleted list?",
        choices: ["bl", "ul", "ol"],
        correctAnswer: "ul"
    },
    {
        question: "An iframe is used to display a web page within a web page.",
        choices: ["True", "False", "There is no such thing as an iframe."],
        correctAnswer: "True"
    },
    {
        question: "Which HTML element defines the title of a document?",
        choices: ["meta", "title", "head"],
        correctAnswer: "title"
    },
    {
        question: "Which HTML attribue specifies an alternate text for an image, if the image cannot be displayed?",
        choices: ["title", "alt", "src"],
        correctAnswer: "alt"
    },
    {
        question: "What is the correct HTML element for playing video files?",
        choices: ["movie", "video", "media"],
        correctAnswer: "video"
    }
];


startBtnEl.addEventListener("click", function() {
    showQuestion();
});

startBtnEl.addEventListener("click", function() {
    scoreDisplay();
});

startBtnEl.addEventListener("click", function() {
    countDown();
});

highScoresBtnEl.addEventListener("click", function() {
    displayHighScores();
});


function answerClick(event) {
    var userChoice = event.target.innerHTML;
    var currentAnswer = questions[qIndex].correctAnswer;
    if(userChoice == currentAnswer) {
        score++;
        scoreEl.innerHTML = "Score: " + score;

    }
    else {
        timeLeft -= 5;
        timerEl.innerHTML = "Time Left: " + timeLeft;
    }
    qIndex++
    if(qIndex > questions.length-1){
        gameOver();
    }
    else {
        showQuestion();
    }
}


function gameOver() {
    clearInterval(timeInterval);
    document.body.innerHTML = ''
    console.log('GAME OVER END GAME!!')
    var questionDiv = document.createElement("h2");
    questionDiv.innerHTML = "You scored " + score + " points! Enter your initials.";
    document.body.appendChild(questionDiv);

    inputName = document.createElement("input");
    inputName.classList.add("name");
    document.body.appendChild(inputName);

    var saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save Score";
    saveBtn.classList.add("save");
    saveBtn.addEventListener('click', saveScore);
    document.body.appendChild(saveBtn);

}

function saveScore() {
    document.body.innerHTML = '';
    var finalScore = {
        score: score,
        name: inputName.value
    };
    highScores.push(finalScore);
    highScores.sort( (a,b) => {
        return b.score - a.score;
    })

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores()
}

function displayHighScores() {
    document.body.innerHTML = ''

    var highScoresTitleDiv = document.createElement("h2");
    highScoresTitleDiv.classList.add("highScoresTitle");
    highScoresTitleDiv.innerHTML = "High Scores";
    document.body.appendChild(highScoresTitleDiv);

    var highScoresDiv = document.createElement("ul");
    highScoresDiv.classList.add("highScoresList");
    document.body.appendChild(highScoresDiv);
    
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    for (var k = 0; k < highScores.length; k++){
        var highScoresLi = document.createElement("li");
        highScoresLi.classList.add("highScoresListItem");
        highScoresLi.innerHTML = highScores[k].name + " ---" + highScores[k].score;
        document.body.appendChild(highScoresLi);
    }

    // var returnBtn = document.createElement("button");
    //         returnBtn.innerHTML = "Replay"
    //         returnBtn.classList.add("choices-button");
    //         returnBtn.addEventListener('click', showQuestion);
    //         document.body.appendChild(returnBtn);
}


function showQuestion() {
        document.querySelector("#questions-body").innerHTML = ''

        //create question title
        var questionDiv = document.createElement("h3");
        questionDiv.innerHTML = "<h3>" + questions[qIndex].question + "</h3>";
        document.querySelector("#questions-body").appendChild(questionDiv);

        //create buttons
        for(var j=0; j < questions[qIndex].choices.length; j++) {
            var choicesDiv = document.createElement("button");
            choicesDiv.innerHTML = questions[qIndex].choices[j];
            choicesDiv.classList.add("choices-button");
            choicesDiv.addEventListener('click', answerClick);
            document.querySelector("#questions-body").appendChild(choicesDiv);
        };
};

function countDown() {
    document.body.appendChild(timerEl);

    timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.innerHTML = "Time Left: " + timeLeft;
            timeLeft--
        }
        else {
            timerEl.innerHTML = "";
            gameOver();
        }
    }, 1000);
}

function scoreDisplay() {
    scoreEl.innerHTML = "Score: " + score;
    document.body.appendChild(scoreEl);
};