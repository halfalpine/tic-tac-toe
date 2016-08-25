/*Tic Tac Toe game written based on procedural programming with random-selecting computer player*/
$(document).ready(function() {
  //Array of all available squares
  var grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //Integer is set to 0 for "X" team or 1 for "O" team
  var humanIndex;
  //Strings containing the symbol for each player
  var humanMark;
  var computerMark;
  //Arrays containing the moves of each player
  var humanSquares;
  var computerSquares;

  //The modal allows users to start a new game
  var openModal = function(message) {
    var message = message || "Welcome to Tic Tac Toe!";
    $("#message").html(message);
    grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    humanSquares = [];
    computerSquares = [];
    $("#modal").css("display", "block");
  };

  var closeModal = function() {
    var choice = $(this).attr("id");
    clearSquares();
    if (choice === "quit" || choice === "close") {
      $("#modal").css("display", "none");
      return;
    } else {
      if (choice === "X") {
        humanIndex = 0;
        humanMark = "X";
        computerMark = "O";
      } else {
        humanIndex = 1;
        humanMark = "O";
        computerMark = "X";
        computerTurn();
      }
      $(".square").on("click", humanTurn);
      $("#modal").css("display", "none");
    }
  };

  var clearSquares = function() {
    $(".num").html(" ");
  };

  var computerTurn = function() {
    var square = getRandom();
    markSquare(square, computerMark);
    computerSquares.push(square);
    if (gameOver(computerSquares)) {
      window.setTimeout(openModal, 1000, "Computer wins.");
      return;
    } else if (tieGame()) {
      window.setTimeout(openModal, 1000, "Tie game.");
      return;
    } else {
      return;
    }
  };

  var humanTurn = function() {
    var square = parseInt($(this).attr("id")[1]);
    if (validSquare(square)) {
      markSquare(square, humanMark);
      humanSquares.push(square);
      if (gameOver(humanSquares)) {
        window.setTimeout(openModal, 1000, "You win!");
        return;
      } else if (tieGame()) {
        window.setTimeout(openModal, 1000, "Tie game.");
        return;
      } else {
        window.setTimeout(computerTurn, 1000);
      }
    }
  };

  var validSquare = function(num) {
    var index;
    if (grid.includes(num)) {
      index = grid.indexOf(num);
      grid.splice(index, 1);
      return true;
    } else {
      return false;
    }
  };

  var markSquare = function(num, sym) {
    $("#p" + num).html(sym);
  };

  var getRandom = function() {
    var random = Math.floor(Math.random() * grid.length);
    var num = grid[random];
    grid.splice(random, 1);
    return num;

  };

  var gameOver = function(arr) {
    //All possible combination of winning moves
    var wins = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
    var flag = false;
    wins.forEach(function(win) {
      if (arr.includes(win[0]) && arr.includes(win[1]) && arr.includes(win[2])) {
        flag = true;
      }
    });
    return flag;
  };

  var tieGame = function() {
    return grid.length === 0 ? true : false;
  }

  $(".close, .choice").on("click", closeModal);
  openModal();
});
