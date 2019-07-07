$(document).ready(function () {
    var options = [
        {
            question: "What was the first movie released in the Marvel Cinematic Universe?", 
            choice: ["The Incredible Hulk", "Captain America: The First Avenger", "Iron Man", "The Dark Knight"],
            answer: 2,
            photo: "../assets/images/ironman.gif"
         },
         {
             question: "Where is Wakanda located?", 
            choice: ["South America", "Africa", "Asia", "China"],
            answer: 1,
            photo: "../assets/images/wakanda.gif"
         }, 
         {
             question: "Who has appeard in every single MCU movie?", 
            choice: ["Stan Lee", "Jack Kirby", "Robert Downey, Jr.", "Steve Rogers" ],
            answer: 0,
            photo: "../assets/images/stanlee.gif"
        }, 
        {
            question: "Who is the villian in Ant-Man", 
            choice: ["Blue Hornet", "Wasp", "Scorpion", "Yellow Jacket" ],
            answer: 3,
            photo: "../assets/images/yellowjacket.gif"
        }, 
        {
            question: "Who does Captain America meet while jogging on Washington D.C.?", 
            choice: ["Black Widow", "Tony Stark", "Sam Wilson", "Steve Rogers" ],
            answer: 2,
            photo: "../assets/images/samwilson.gif"
        }, 
        {
            question: "What is the one thing on Earth Pepper Potts is allergic to?", 
            choice: ["Tilapia", "Peanuts", "Strawberries", "Cats" ],
            answer: 2,
            photo: "../assets/images/strawberry.gif"
        }, 
        {
            question: "Who's home is used as a safe house in Avengers: Age of Ultron?", 
            choice: ["Hawkeye's", "Thor's", "Tony Stark's", "Nick Fury's" ],
            answer: 0,
            photo: "../assets/images/hawkeye.gif"
        }, 
        {
            question: "Who kills Thanos in Avengers: Endgame?", 
            choice: ["A: Captain America", "B: Thor", "C: Iron Man", "D: B & C" ],
            answer: 3,
            photo: "../assets/images/thorironman.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
   
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reaches 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already displayes
    
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
              
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    
    }
    
    
    
    
    $(".answerchoice").on("click", function () {
        
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Nope! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Let's Debrief the Misson: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })