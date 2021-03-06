// Global Variables
var firstNameNbaInput = document.getElementById("fn-nba-input");
var lastNameNbaInput = document.getElementById("ln-nba-input");
var firstNameMlbInput = document.getElementById("fn-mlb-input");
var lastNameMlbInput = document.getElementById("ln-mlb-input");

var nbaBtn = document.getElementById("nba-btn");
var mlbBtn = document.getElementById("mlb-btn");

var nbaDisplay = document.getElementById("displayNbaSearch");
var mlbDisplay = document.getElementById("displayMlbSearch");

var nbaDisplayCardName = document.getElementById("nbaDisplayCardName");
var mlbDisplayCardName = document.getElementById("mlbDisplayCardName");

var mlbTeamEl = document.getElementById("mlb-team");
var nbaTeamEl = document.getElementById("nba-team");



// NBA Player Search Function 
var nbaSearch = function (){
    //clear previous searches
    clearNbaStats();

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

    // NBA Fetch API to pull player ID
  var nbaEndpoint = "https://www.balldontlie.io/api/v1/players?search=" + firstNameNba + "_" +lastNameNba;

  fetch(nbaEndpoint).then(function(response) {
      if (response.ok) {
    return response.json();
      } else {
          nbaDisplay.innerHTML = "Error occured. Check spelling."
      }
}).then(function(nbadata){
    console.log(nbadata);

    let nbaPlayerId = nbadata.data[0].id;
    var nbaStatsEndpoint = 'https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=' + nbaPlayerId + "&postseason=true";
    


    fetch(nbaStatsEndpoint).then(function(response){
        return response.json();
    }).then(function(nbaStats){
        //console.log(nbaStats);

    //jQuery to display points
    let nbaPts = nbaStats.data[0].pts;
    $('#pts-stat')
    .append('Average Points: ' + `${nbaPts}`);
    
    
    //jQuery to display Rebounds
    let nbaReb = nbaStats.data[0].reb;
    $('#reb-stat')
    .append('Average Rebounds: ' + `${nbaReb}`);

    //jQuery to display Assists
    let nbaAst = nbaStats.data[0].ast;
    $('#ast-stat')
    .append('Average Assists: ' + `${nbaAst}`);

    })

// jQuery to display team name 
let nbaPlayerTeam = nbadata.data[0].team.full_name; 
$('#nba-team')
.append(`${nbaPlayerTeam}`);  
    
    
})

.catch((error) => {
    nbaTeamEl.textContent = "Error Occured. Check Spelling or make sure player is still active.";
    displaySearched.textContent = " ";
    nbaDisplayNameEl.textContent = " ";
});

}


    


// MLB Player Search Function
var mlbSearch = function (){

    // clear current mlb stats
    clearMlbStats();

    // Variable for MLB Search Input
    var firstNameMlb = firstNameMlbInput.value;
    var lastNameMlb = lastNameMlbInput.value;

    // Create <li> to append Searched MLB Name and append to the Search Card
    var displaySearched = document.createElement("li");
    displaySearched.textContent = firstNameMlb + " " + lastNameMlb;
    mlbDisplay.appendChild(displaySearched);

    // append searched MLB name into MLB Display Card
    var mlbDisplayNameEl = mlbDisplayCardName;
    mlbDisplayNameEl.textContent = firstNameMlb + " " + lastNameMlb;

   // function to pull player ID
    var mlbEndpoint = "https://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='" + firstNameMlb + " " + lastNameMlb + "'";

    fetch(mlbEndpoint).then(function(response) {
        if (response.ok) {
        return response.json();
        } else {
            mlbDisplay.innerHTML = "Error occured. Check Spelling.";
        }
    }).then(function(mlbdata){

   // function to pull stats with player ID     
    let mlbPlayerId = mlbdata.search_player_all.queryResults.row.player_id;
    var mlbEndpointStats = "https://lookup-service-prod.mlb.com/json/named.sport_career_hitting.bam?league_list_id='mlb'&game_type='R'&player_id='" + mlbPlayerId + "'";

    fetch(mlbEndpointStats).then(function(response) {
        return response.json();
    }).then(function(mlbStats){

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

    })

    .catch((error) => {
        mlbTeamEl.innerHTML = "Error occured. Check Spelling or make sure player is still active."
        displaySearched.textContent = "";
        mlbDisplayNameEl.textContent = "";
    })

}

// clear current mlb stats function
var clearMlbStats = function() {
    document.getElementById("mlb-team").innerHTML = "";
    document.getElementById("hr-stat").innerHTML = "";
    document.getElementById("rbi-stat").innerHTML = "";
    document.getElementById("avg-stat").innerHTML = "";

}

// clear current nba stats
var clearNbaStats = function() {
    document.getElementById("nba-team").innerHTML = "";
    document.getElementById("pts-stat").innerHTML = "";
    document.getElementById("reb-stat").innerHTML = "";
    document.getElementById("ast-stat").innerHTML = "";
}




// Event Listeners for when a user searches for a player
nbaBtn.addEventListener("click", nbaSearch);
mlbBtn.addEventListener("click", mlbSearch);