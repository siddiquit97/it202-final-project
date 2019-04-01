var summonerName;
var summonerID;
var accountID;
			
var apiKey = "RGAPI-144a59d9-af7d-4f68-9522-e92800eba509"
$("#search_button").click(function() {
	//var summonerNameSearch = $("#summoner_name").val();
	summonerNameSearch = "siddique"
	var url = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerNameSearch+"?api_key=" + apiKey;
	$.get(url, function(response){
		var data = response;
		//console.log(response);
		summonerName = data.name;
		summonerID = data.id;
		accountID = data.accountId;
		getMatchInfo(accountID);
	});
	
	function getMatchInfo(accountID) {
		$.get("https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/"+accountID+"?beginTime=1&endIndex=5&queue=420&api_key=" + apiKey, function(response){
			//console.log(response.matches[0].gameId);
			var data = response.matches;
			//console.log(data);
			$.each(data, function(i, v) {
				getMatchDetails(v.gameId, v.champion);
			});
		});
	}
			
	function getMatchDetails(gameId, champion) {
		console.log(gameId + "\n" + champion);

		$.get("https://na1.api.riotgames.com/lol/match/v4/matches/"+gameId+"?api_key=" + apiKey, function(response){
			//console.log(response.participants);
			for (var i = 0; i < response.participants.length; i++) {
				//console.log(response.participants[i]);
				if (champion === response.participants[i].championId) {
					var win = response.participants[i].stats.win;
					var kills = response.participants[i].stats.kills;
					var deaths = response.participants[i].stats.deaths;
					var assists = response.participants[i].stats.assists;
					/*console.log(kills + "/" + deaths + "/" + assists);
					console.log(win);*/
					displayMatchDetails(win, kills, deaths, assists);


					break;
				} 
			}
		});
	}

	function displayMatchDetails(win, kills, deaths, assists) {
		console.log(kills + "/" + deaths + "/" + assists);
		console.log(win);

		var clone = $(".template").clone();
		clone.find(".card-title").text(win);
		clone.find(".card-text").text(kills + "/" + deaths + "/" + assists);

		clone.removeClass("template")
        // insert into DOM
        $("body").append(clone);
	}
});