// Global Variables
var nflInput = document.getElementById("nfl-input");
var mlbInput = document.getElementById("mlb-input");

var nflBtn = document.getElementById("nfl-btn");
var mlbBtn = document.getElementById("mlb-btn");

var nflDisplay = document.getElementById("displayNflSearch");
var mlbDisplay = document.getElementById("displayMlbSearch");

var nflDisplayCardName = document.getElementById("nflDisplayCardName");
var mlbDisplayCardName = document.getElementById("mlbDisplayCardName");



// NFL Player Search Function 
var nflSearch = function (){
    // Variable for NFL Search Input
    var nflInputText = nflInput.value;

    // Create <li> to append Searched NFL Name and append to the Search Card
   var displaySearched = document.createElement("li");
   displaySearched.textContent = nflInputText;
   nflDisplay.appendChild(displaySearched);

   // append searched NFL name into NFL Display Card
   var nflDisplayNameEl = nflDisplayCardName;
   nflDisplayNameEl.textContent = nflInputText;
  // nflDisplayNameEl.appendChild(nflInputText);
    
}

// MLB Player Search Function
var mlbSearch = function (){
    // Variable for MLB Search Input
    var mlbInputText = mlbInput.value;

    // Create <li> to append Searched MLB Name and append to the Search Card
    var displaySearched = document.createElement("li");
    displaySearched.textContent = mlbInputText;
    mlbDisplay.appendChild(displaySearched);

    // append searched MLB name into MLB Display Card
    var mlbDisplayNameEl = mlbDisplayCardName;
    mlbDisplayNameEl.textContent = mlbInputText;
   // mlbDisplayNameEl.appendChild(mlbInputText);

   var mlbPlayer = mlbInput.value;
    var mlbEndpoint = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + mlbPlayer + "'";

    fetch(mlbEndpoint).then(function(response) {
        //console.log(response);
        return response.json();
    }).then(function(data){
        console.log(data.search_player_all.queryResults.row.player_id);
    })

}


// Event Listeners for when a user searches for a player
nflBtn.addEventListener("click", nflSearch);
mlbBtn.addEventListener("click", mlbSearch);