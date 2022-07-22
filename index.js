// Step1
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).on("keypress",function(event){
    if(!started && (event.key == "a" || event.key == "A")){
        $("#level-title").text(("Level "+ level))
        nextSquence();
        started = true;
    }
    
})
$(".btn").click(function(){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function nextSquence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(("Level "+ level))
    let randomNumber = Math.floor(Math.random() * 4) ;
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatedPress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)
}
function checkAnswer(currenLevel) {
    if(gamePattern[currenLevel] === userClickedPattern[currenLevel]){
        console.log("succes");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSquence();
            },250)
        }
    }
    else{
        
        console.log("Wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



