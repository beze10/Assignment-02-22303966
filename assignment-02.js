$(document).ready(function () {
  var Circle = ["Button1", "Button2", "Button3", "Button4"]; //buttonColors
  var pattern = []; //compPattern
  var Userpattern = []; //userPattern
  var next = false;
  var level = 0;
  var count = 0;
  var good = 0;
  var tops = 0;
  var timerInterval;
  var timerCount = 0;

  $("#Start").click(function () {
    if (!next) {
      $("#Level").text("Level " + level);
      $("#smallCircle").css("background-color", "green");
      setTimeout(start, 1000); // Delay for the setTimeout function
      next = true;
    }
  });

  $(".BE").click(function () {
    clearInterval(timerInterval);
    timerCount = 0;
    startTimer();
    updateTimerDisplay();
    good++;
    if (good < 10) {
      $("#currentScore").text("0" + good);
    } else {
      $("#currentScore").text(good);
    }
    if (tops <= good) {
      tops = good;
    }
    if (tops < 10) {
      $("#allTimeHigh").text("0" + tops);
    } else {
      $("#allTimeHigh").text(tops);
    }
    var pickcircle = $(this).attr("id"); // Gets the id of the button thats been clicked
    Userpattern.push(pickcircle);
    correct(Userpattern.length - 1);
  });

  function start() {
    Next();
  }

  function startTimer() {
    timerInterval = setInterval(function () {
      timerCount++;
      updateTimerDisplay();
      if (timerCount == 5) {
        $("#Level").text("Game Over , Press Start to start again");
        Over();
      }
    }, 1000); // Update timer every second (1000 milliseconds)
  }

  function updateTimerDisplay() {
    $("#timer").text("Time: " + (5 - timerCount) + "s");
  }

  function correct(level) {
    if (Userpattern[level] === pattern[level]) {
      if (Userpattern.length === pattern.length) {
        clearInterval(timerInterval);
        timerCount = 0;
        updateTimerDisplay();
        setTimeout(function () {
          startTimer();
          Next();
        }, 1000);
      }
    } else {
      $("#Level").text("Game Over , Press Start to start again");
      Over();
    }
  }

  function Next() {
    Userpattern = [];
    level++;
    $("#Level").text("Level " + level);
    var rndInt = Math.floor(Math.random() * 4);
    var newcircle = Circle[rndInt];
    pattern.push(newcircle);
    let t = 600;
    for (let i = 0; i < pattern.length; i++) {
      (function (i) {
        setTimeout(function () {
          if (pattern.length >= 13) {
            $("#" + pattern[i])
              .fadeIn(100)
              .fadeOut(100)
              .fadeIn(100);
            t = 150;
          } else if (pattern.length >= 9) {
            $("#" + pattern[i])
              .fadeIn(200)
              .fadeOut(200)
              .fadeIn(200);
            t = 300;
          } else if (pattern.length >= 5) {
            $("#" + pattern[i])
              .fadeIn(300)
              .fadeOut(300)
              .fadeIn(300);
            t = 450;
          } else {
            $("#" + pattern[i])
              .fadeIn(400)
              .fadeOut(400)
              .fadeIn(400);
          }
        }, i * t);
      })(i);
    }
  }

  function Over() {
    good = 0;
    $("#currentScore").text("0" + good);
    $("#smallCircle").css("background-color", "red");
    clearInterval(timerInterval);
    timerCount = 0;
    updateTimerDisplay();
    Blinking();
    level = 0;
    $("#Level").text("Game Over , Press Start to start again");
    pattern = [];
    next = false;
  }

  function Blinking() {
    if (count == 5) {    /*Once the timer runs out, the buttons flashes to alert that the game is over*/
      return;
    }
    $("#" + Circle[0])
      .fadeIn(100)
      .fadeOut(500)
      .fadeIn(500);
    $("#" + Circle[1])
      .fadeIn(500)
      .fadeOut(500)
      .fadeIn(500);
    $("#" + Circle[2])
      .fadeIn(500)
      .fadeOut(500)
      .fadeIn(500);
    $("#" + Circle[3])
      .fadeIn(500)
      .fadeOut(500)
      .fadeIn(500);
    count++;
    Blinking();
  }
});
