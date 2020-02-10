let level = 0;

var gamePattern = [];

var userClickedPattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let started = false;

document.querySelector("html").addEventListener("keypress", function (event) {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    } else {
        nextSequence();
    }
});

$(".restart").click(function (event) {
    startOver();
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    } else {
        nextSequence();
    }
});

// document.querySelector("html").addEventListener("click", function (event) {
//     if (!started) {
//         $("h1").text("Level " + level);
//         nextSequence();
//         started = true;
//     } else {
//         nextSequence();
//     }
// });


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
}


$(".btn").click(function (event) {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
})

function playSound(name) {
    new Audio("./sounds/" + name + ".mp3").play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 90);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        console.log("Yes");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        playSound("wrong");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over , press any key to start");
        startOver();

    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}



