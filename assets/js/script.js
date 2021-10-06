// Global Variables
var firstNameNbaInput = document.getElementById("fn-nba-input");
var lastNameNbaInput = document.getElementById("ln-nba-input");
var mlbInput = document.getElementById("mlb-input");

var nbaBtn = document.getElementById("nba-btn");
var mlbBtn = document.getElementById("mlb-btn");

var nbaDisplay = document.getElementById("displayNbaSearch");
var mlbDisplay = document.getElementById("displayMlbSearch");

var nbaDisplayCardName = document.getElementById("nbaDisplayCardName");
var mlbDisplayCardName = document.getElementById("mlbDisplayCardName");



// NBA Player Search Function 
var nbaSearch = function (){
    // Variable for NBA Search Input
    var firstNameNba = firstNameNbaInput.value;
    var lastNameNba = lastNameNbaInput.value;

    // Create <li> to append Searched NBA Name and append to the Search Card
   var displaySearched = document.createElement("li");
   displaySearched.textContent = firstNameNba + " " + lastNameNba;
   nbaDisplay.appendChild(displaySearched);

   // append searched NBA name into NBA Display Card
   var nbaDisplayNameEl = nbaDisplayCardName;
   nbaDisplayNameEl.textContent = firstNameNba + " " + lastNameNba;

    // NBA Fetch API 
  var nbaEndpoint = "https://www.balldontlie.io/api/v1/players"

    fetch(nbaEndpoint).then(function(response) {
        return response.json();
    }).then(function(data){
        console.log(data);
    })
    
}

// MLB Player Search Function
var mlbSearch = function (){

    // clear current mlb stats
    clearMlbStats();

    // Variable for MLB Search Input
    var mlbInputText = mlbInput.value;

    // Create <li> to append Searched MLB Name and append to the Search Card
    var displaySearched = document.createElement("li");
    displaySearched.textContent = mlbInputText;
    mlbDisplay.appendChild(displaySearched);

    // append searched MLB name into MLB Display Card
    var mlbDisplayNameEl = mlbDisplayCardName;
    mlbDisplayNameEl.textContent = mlbInputText;

   // function to pull player ID
    var mlbPlayer = mlbInput.value;
    var mlbEndpoint = "http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + mlbPlayer + "'";

    fetch(mlbEndpoint).then(function(response) {
        return response.json();
    }).then(function(mlbdata){
        console.log(mlbdata);

   // function to pull stats with player ID     
    let mlbPlayerId = mlbdata.search_player_all.queryResults.row.player_id;
    var mlbEndpointStats = "http://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='" + mlbPlayerId + "'";

    fetch(mlbEndpointStats).then(function(response) {
        return response.json();
    }).then(function(mlbStats){
        console.log(mlbStats.sport_career_hitting.queryResults.row);

        // jQuery to display HR stat
        let mlbHr = mlbStats.sport_career_hitting.queryResults.row.hr;
        $('#hr-stat')
        .append('HR: ' + `${mlbHr}`);

        //jQuery to display RBI stat
        let mlbRbi = mlbStats.sport_career_hitting.queryResults.row.rbi;
        $('#rbi-stat')
        .append('RBI: ' + `${mlbRbi}`);

        //jQuery to display AVG stat
        let mlbAvg = mlbStats.sport_career_hitting.queryResults.row.avg;
        $('#avg-stat')
        .append('AVG: ' + `${mlbAvg}` + " %");
    });

    // jQuery to display mlb team
    let mlbTeam = mlbdata.search_player_all.queryResults.row.team_full;
    $('#mlb-team')
    .append(`${mlbTeam}`);

    });

}

// clear current mlb stats function
var clearMlbStats = function() {
    document.getElementById("mlb-team").innerHTML = "";
    document.getElementById("hr-stat").innerHTML = "";
    document.getElementById("rbi-stat").innerHTML = "";
    document.getElementById("avg-stat").innerHTML = "";

}


// Event Listeners for when a user searches for a player
nbaBtn.addEventListener("click", nbaSearch);
mlbBtn.addEventListener("click", mlbSearch);