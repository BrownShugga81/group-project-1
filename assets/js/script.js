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

    // NFL Fetch API 
  var nflEndpoint = "https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStatsByPlayerID/2020REG/732?key=b115e3ba23bd4702bc91e408f7e6f476"

    fetch(nflEndpoint).then(function(response) {
        return response.json();
    }).then(function(data){
        console.log(data);
    })
    
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


// Event Listeners for when a user searches for a player
nflBtn.addEventListener("click", nflSearch);
mlbBtn.addEventListener("click", mlbSearch);