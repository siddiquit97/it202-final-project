var summonerName;
var summonerID;
var accountID;		
var apiKey = "RGAPI-b0107c87-32ca-4af3-a1a2-749f16beac85";

$(document).ready(function() {
	hideScreens();
	$("#search").show();
});

$("#search_button").click(function() {
	//var summonerNameSearch = $("#summoner_name").val();

	hideScreens();
	$("#list").show();
	summonerNameSearch = "wascally rascal"
	var url = "https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+summonerNameSearch+"?api_key=" + apiKey;
	$.get(url, function(response){
		var data = response;
		//console.log(response);
		summonerName = data.name;
		summonerID = data.id;
		accountID = data.accountId;
		getMatchInfo(accountID);
	});
	
	function getMatchInfo(accountID) {
		$.get("https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/"+accountID+"?beginTime=1&endIndex=5&queue=420&api_key=" + apiKey, function(response){
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

		$.get("https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/"+gameId+"?api_key=" + apiKey, function(response){
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
					var role = response.participants[i].timeline.role;
					var lane = response.participants[i].timeline.lane;

					displayMatchDetails(win, kills, deaths, assists, champion, role, lane);

					break;
				} 
			}
		});
	}

	function displayMatchDetails(win, kills, deaths, assists, champion, role, lane) {
		console.log(kills + "/" + deaths + "/" + assists);
		console.log(win);

		var winTotal = 0;

		var clone = $(".template").clone();
		if (win) {
			clone.find(".card-title").text("Victory");
			clone.addClass("win");
			winTotal += 1;
		} else {
			clone.find(".card-title").text("Defeat");
			clone.addClass("loss");
		}
		clone.find(".card-subtitle").text(ChIDToName(champion));
		clone.find(".card-text").text(kills + "/" + deaths + "/" + assists);

		clone.find(".card-img-top").attr("src", getSource(role, lane));
		clone.removeClass("template")
        // insert into DOM
        $(".listCover").append(clone);
	}

	function getSource(role, lane) {
		if (lane === "JUNGLE") {
			return "https://mobalytics.gg/wp-content/uploads/2018/01/Jungle.png";
		} else if (lane === "BOTTOM" && role === "DUO_CARRY") {
			return "https://mobalytics.gg/wp-content/uploads/2018/01/ADC.png";
		} else if (lane === "BOTTOM" && role === "DUO_SUPPORT") {
			return "https://mobalytics.gg/wp-content/uploads/2018/01/Support.png";
		} else if (lane === "TOP") {
			return "https://mobalytics.gg/wp-content/uploads/2018/01/Top-1.png"; 
		} else {
			return "https://mobalytics.gg/wp-content/uploads/2018/01/Mid.png";
		}
	}


	function ChIDToName(champion) {
	    switch(champion){
		    case 266: return "Aatrox"; break;
		    case 412: return "Thresh"; break;
		    case 23: return "Tryndamere"; break;
		    case 79: return "Gragas"; break;
		    case 69: return "Cassiopeia"; break;
		    case 136: return "Aurelion Sol"; break;
		    case 13: return "Ryze"; break;
		    case 78: return "Poppy"; break;
		    case 14: return "Sion"; break;
		    case 1: return "Annie"; break;
		    case 202: return "Jhin"; break;
		    case 43: return "Karma"; break;
		    case 111: return "Nautilus"; break;
		    case 240: return "Kled"; break;
		    case 99: return "Lux"; break;
		    case 103: return "Ahri"; break;
		    case 2: return "Olaf"; break;
		    case 112: return "Viktor"; break;
		    case 34: return "Anivia"; break;
		    case 27: return "Singed"; break;
		    case 86: return "Garen"; break;
		    case 127: return "Lissandra"; break;
		    case 57: return "Maokai"; break;
		    case 25: return "Morgana"; break;
		    case 28: return "Evelynn"; break;
		    case 105: return "Fizz"; break;
		    case 74: return "Heimerdinger"; break;
		    case 238: return "Zed"; break;
		    case 68: return "Rumble"; break;
		    case 82: return "Mordekaiser"; break;
		    case 37: return "Sona"; break;
		    case 96: return "Kog'Maw"; break;
		    case 55: return "Katarina"; break;
		    case 117: return "Lulu"; break;
		    case 22: return "Ashe"; break;
		    case 30: return "Karthus"; break;
		    case 12: return "Alistar"; break;
		    case 122: return "Darius"; break;
		    case 67: return "Vayne"; break;
		    case 110: return "Varus"; break;
		    case 77: return "Udyr"; break;
		    case 89: return "Leona"; break;
		    case 126: return "Jayce"; break;
		    case 134: return "Syndra"; break;
		    case 80: return "Pantheon"; break;
		    case 92: return "Riven"; break;
		    case 121: return "Kha'Zix"; break;
		    case 42: return "Corki"; break;
		    case 268: return "Azir"; break;
		    case 51: return "Caitlyn"; break;
		    case 76: return "Nidalee"; break;
		    case 85: return "Kennen"; break;
		    case 3: return "Galio"; break;
		    case 45: return "Veigar"; break;
		    case 432: return "Bard"; break;
		    case 150: return "Gnar"; break;
		    case 90: return "Malzahar"; break;
		    case 104: return "Graves"; break;
		    case 254: return "Vi"; break;
		    case 10: return "Kayle"; break;
		    case 39: return "Irelia"; break;
		    case 64: return "Lee Sin"; break;
		    case 420: return "Illaoi"; break;
		    case 60: return "Elise"; break;
		    case 106: return "Volibear"; break;
		    case 20: return "Nunu"; break;
		    case 4: return "Twisted Fate"; break;
		    case 24: return "Jax"; break;
		    case 102: return "Shyvana"; break;
		    case 429: return "Kalista"; break;
		    case 36: return "Dr. Mundo"; break;
		    case 427: return "Ivern"; break;
		    case 131: return "Diana"; break;
		    case 223: return "Tahm Kench"; break;
		    case 63: return "Brand"; break;
		    case 113: return "Sejuani"; break;
		    case 8: return "Vladimir"; break;
		    case 154: return "Zac"; break;
		    case 421: return "Rek'Sai"; break;
		    case 133: return "Quinn"; break;
		    case 84: return "Akali"; break;
		    case 163: return "Taliyah"; break;
		    case 18: return "Tristana"; break;
		    case 120: return "Hecarim"; break;
		    case 15: return "Sivir"; break;
		    case 236: return "Lucian"; break;
		    case 107: return "Rengar"; break;
		    case 19: return "Warwick"; break;
		    case 72: return "Skarner"; break;
		    case 54: return "Malphite"; break;
		    case 157: return "Yasuo"; break;
		    case 101: return "Xerath"; break;
		    case 17: return "Teemo"; break;
		    case 75: return "Nasus"; break;
		    case 58: return "Renekton"; break;
		    case 119: return "Draven"; break;
		    case 35: return "Shaco"; break;
		    case 50: return "Swain"; break;
		    case 91: return "Talon"; break;
		    case 40: return "Janna"; break;
		    case 115: return "Ziggs"; break;
		    case 245: return "Ekko"; break;
		    case 61: return "Orianna"; break;
		    case 114: return "Fiora"; break;
		    case 9: return "Fiddlesticks"; break;
		    case 31: return "Cho'Gath"; break;
		    case 33: return "Rammus"; break;
		    case 7: return "LeBlanc"; break;
		    case 16: return "Soraka"; break;
		    case 26: return "Zilean"; break;
		    case 56: return "Nocturne"; break;
		    case 222: return "Jinx"; break;
		    case 83: return "Yorick"; break;
		    case 6: return "Urgot"; break;
		    case 203: return "Kindred"; break;
		    case 21: return "Miss Fortune"; break;
		    case 62: return "Wukong"; break;
		    case 53: return "Blitzcrank"; break;
		    case 98: return "Shen"; break;
		    case 201: return "Braum"; break;
		    case 5: return "Xin Zhao"; break;
		    case 29: return "Twitch"; break;
		    case 11: return "Master Yi"; break;
		    case 44: return "Taric"; break;
		    case 32: return "Amumu"; break;
		    case 41: return "Gangplank"; break;
		    case 48: return "Trundle"; break;
		    case 38: return "Kassadin"; break;
		    case 161: return "Vel'Koz"; break;
		    case 143: return "Zyra"; break;
		    case 267: return "Nami"; break;
		    case 59: return "Jarvan IV"; break;
		    case 81: return "Ezreal"; break;
		    case 145: return "Kai'Sa"; break;
		    case 517: return "Sylas"; break;
	    }
	}	
});

function hideScreens() {
		$("#search").hide();
		$("#list").hide();
	}