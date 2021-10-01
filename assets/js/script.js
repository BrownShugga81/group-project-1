// Global Variables
var nflInput = document.getElementById("nfl-input");
var mlbInput = document.getElementById("mlb-input");

var nflBtn = document.getElementById("nfl-btn");
var mlbBtn = document.getElementById("mlb-btn");

var nflDisplay = document.getElementById("nfl-stat");
var mlbDisplay = document.getElementById("mlb-stat");

// Event Listener Function 
var testFunction = function (){
    nflInput = nflInput;
    console.log(nflInput);
}

nflBtn.addEventListener("click", testFunction);