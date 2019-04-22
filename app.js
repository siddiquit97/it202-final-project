var summonerName;
var summonerID;
var accountID;		
var apiKey = "RGAPI-736e578f-c25b-464e-b5b9-f4074675ce0a";
var winTotal = 0;
var map, infoWindow;

$(document).ready(function() {
	hideScreens();
	$("#home").show();
});

$("#search_button").click(function() {
	winTotal = 0;
	var summonerNameSearch = $("#summoner_name").val();

	hideScreens();
	$("#list").show();
	//summonerNameSearch = "siddique"
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
		$.get("https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/"+accountID+"?beginTime=1&endIndex=10&queue=420&api_key=" + apiKey, function(response){
			//console.log(response.matches[0].gameId);
			var data = response.matches;
			//console.log(data);
			$.each(data, function(i, v) {
				getMatchDetails(v.gameId, v.champion);
			});
		});
	}
			
	function getMatchDetails(gameId, champion) {
		//console.log(gameId + "\n" + champion);

		$.get("https://cors-anywhere.herokuapp.com/https://na1.api.riotgames.com/lol/match/v4/matches/"+gameId+"?api_key=" + apiKey, function(response){
			//console.log(response.participants);
			for (var i = 0; i < response.participants.length; i++) {
				//console.log(response.participants[i]);
				if (champion === response.participants[i].championId) {
					var win = response.participants[i].stats.win;
					if (win) {
						winTotal = winTotal + 1;
					}
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
			console.log(winTotal);
			if(winTotal >= 6) {
	        	$("#streak").html("Hot Streak");
	        	$(".jumbotron").addClass("win_jumbo");
	        	$(".jumbotron").removeClass("lose_jumbo");
	        } else {
	        	$("#streak").html("Cold Streak");
	        	$(".jumbotron").addClass("lose_jumbo");
	        	$(".jumbotron").removeClass("win_jumbo");
	        }
		});
		
	}

	function displayMatchDetails(win, kills, deaths, assists, champion, role, lane) {
		//console.log(kills + "/" + deaths + "/" + assists);
		//console.log(win);

		var clone = $(".template").clone();
		if (win) {
			clone.find(".card-title").text("Victory");
			clone.addClass("win");
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

$("a").on("click", function(){
	hideScreens();
	var target = $(this).attr("href");
	$(target).show();
});

function hideScreens() {
	$("#home").hide();
	$("#list").hide();
	$("#map").hide();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      $.get("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAeR8LVEeESM28vw4q7Wl7wfbz_iZdgHFw&latlng="+pos.lat+","+pos.lng+"&sensor=true", function(response){
			//console.log(response.results[0].address_components[6].short_name);
			getContinent(response.results[0].address_components[6].short_name);
	  });

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function getContinent(name) {
	var continent = { //see https://gist.github.com/nobuti/3816985
		"AF":"Asia", // "Islamic Republic of Afghanistan") 
		"AX":"Europe", // "Åland Islands") 
		"AL":"Europe", // "Republic of Albania") 
		"DZ":"Africa", // "People's Democratic Republic of Algeria") 
		"AS":"Oceania", // "American Samoa") 
		"AD":"Europe", // "Principality of Andorra") 
		"AO":"Africa", // "Republic of Angola") 
		"AI":"North America", // "Anguilla") 
		"AQ":"Antarctica", // "Antarctica (the territory South of 60 deg S)") 
		"AG":"North America", // "Antigua and Barbuda") 
		"AR":"South America", // "Argentine Republic") 
		"AM":"Asia", // "Republic of Armenia") 
		"AW":"North America", // "Aruba") 
		"AU":"Oceania", // "Commonwealth of Australia") 
		"AT":"Europe", // "Republic of Austria") 
		"AZ":"Asia", // "Republic of Azerbaijan") 
		"BS":"North America", // "Commonwealth of the Bahamas") 
		"BH":"Asia", // "Kingdom of Bahrain") 
		"BD":"Asia", // "People's Republic of Bangladesh") 
		"BB":"North America", // "Barbados") 
		"BY":"Europe", // "Republic of Belarus") 
		"BE":"Europe", // "Kingdom of Belgium") 
		"BZ":"North America", // "Belize") 
		"BJ":"Africa", // "Republic of Benin") 
		"BM":"North America", // "Bermuda") 
		"BT":"Asia", // "Kingdom of Bhutan") 
		"BO":"South America", // "Plurinational State of Bolivia") 
		"BQ":"North America", // '535' 
		"BA":"Europe", // "Bosnia and Herzegovina") 
		"BW":"Africa", // "Republic of Botswana") 
		"BV":"Antarctica", // "Bouvet Island (Bouvetoya)") 
		"BR":"South America", // "Federative Republic of Brazil") 
		"IO":"Asia", // "British Indian Ocean Territory (Chagos Archipelago)") 
		"VG":"North America", // "British Virgin Islands") 
		"BN":"Asia", // "Brunei Darussalam") 
		"BG":"Europe", // "Republic of Bulgaria") 
		"BF":"Africa", // "Burkina Faso") 
		"BI":"Africa", // "Republic of Burundi") 
		"KH":"Asia", // "Kingdom of Cambodia") 
		"CM":"Africa", // "Republic of Cameroon") 
		"CA":"North America", // "Canada") 
		"CV":"Africa", // "Republic of Cape Verde") 
		"KY":"North America", // "Cayman Islands") 
		"CF":"Africa", // "Central African Republic") 
		"TD":"Africa", // "Republic of Chad") 
		"CL":"South America", // "Republic of Chile") 
		"CN":"Asia", // "People's Republic of China") 
		"CX":"Asia", // "Christmas Island") 
		"CC":"Asia", // "Cocos (Keeling) Islands") 
		"CO":"South America", // "Republic of Colombia") 
		"KM":"Africa", // "Union of the Comoros") 
		"CD":"Africa", // "Democratic Republic of the Congo") 
		"CG":"Africa", // "Republic of the Congo") 
		"CK":"Oceania", // "Cook Islands") 
		"CR":"North America", // "Republic of Costa Rica") 
		"CI":"Africa", // "Republic of Cote d'Ivoire") 
		"HR":"Europe", // "Republic of Croatia") 
		"CU":"North America", // "Republic of Cuba") 
		"CW":"North America", // "Curaçao") 
		"CY":"Asia", // "Republic of Cyprus") 
		"CZ":"Europe", // "Czech Republic") 
		"DK":"Europe", // "Kingdom of Denmark") 
		"DJ":"Africa", // "Republic of Djibouti") 
		"DM":"North America", // "Commonwealth of Dominica") 
		"DO":"North America", // "Dominican Republic") 
		"EC":"South America", // "Republic of Ecuador") 
		"EG":"Africa", // "Arab Republic of Egypt") 
		"SV":"North America", // "Republic of El Salvador") 
		"GQ":"Africa", // "Republic of Equatorial Guinea") 
		"ER":"Africa", // "State of Eritrea") 
		"EE":"Europe", // "Republic of Estonia") 
		"ET":"Africa", // "Federal Democratic Republic of Ethiopia") 
		"FO":"Europe", // "Faroe Islands") 
		"FK":"South America", // "Falkland Islands (Malvinas)") 
		"FJ":"Oceania", // "Republic of Fiji") 
		"FI":"Europe", // "Republic of Finland") 
		"FR":"Europe", // "French Republic") 
		"GF":"South America", // "French Guiana") 
		"PF":"Oceania", // "French Polynesia") 
		"TF":"Antarctica", // "French Southern Territories") 
		"GA":"Africa", // "Gabonese Republic") 
		"GM":"Africa", // "Republic of the Gambia") 
		"GE":"Asia", // "Georgia") 
		"DE":"Europe", // "Federal Republic of Germany") 
		"GH":"Africa", // "Republic of Ghana") 
		"GI":"Europe", // "Gibraltar") 
		"GR":"Europe", // "Hellenic Republic Greece") 
		"GL":"North America", // "Greenland") 
		"GD":"North America", // "Grenada") 
		"GP":"North America", // "Guadeloupe") 
		"GU":"Oceania", // "Guam") 
		"GT":"North America", // "Republic of Guatemala") 
		"GG":"Europe", // "Bailiwick of Guernsey") 
		"GN":"Africa", // "Republic of Guinea") 
		"GW":"Africa", // "Republic of Guinea-Bissau") 
		"GY":"South America", // "Co-operative Republic of Guyana") 
		"HT":"North America", // "Republic of Haiti") 
		"HM":"Antarctica", // "Heard Island and McDonald Islands") 
		"VA":"Europe", // "Holy See (Vatican City State)") 
		"HN":"North America", // "Republic of Honduras") 
		"HK":"Asia", // "Hong Kong Special Administrative Region of China") 
		"HU":"Europe", // "Hungary") 
		"IS":"Europe", // "Republic of Iceland") 
		"IN":"Asia", // "Republic of India") 
		"ID":"Asia", // "Republic of Indonesia") 
		"IR":"Asia", // "Islamic Republic of Iran") 
		"IQ":"Asia", // "Republic of Iraq") 
		"IE":"Europe", // "Ireland") 
		"IM":"Europe", // "Isle of Man") 
		"IL":"Asia", // "State of Israel") 
		"IT":"Europe", // "Italian Republic") 
		"JM":"North America", // "Jamaica") 
		"JP":"Asia", // "Japan") 
		"JE":"Europe", // "Bailiwick of Jersey") 
		"JO":"Asia", // "Hashemite Kingdom of Jordan") 
		"KZ":"Asia", // "Republic of Kazakhstan") 
		"KE":"Africa", // "Republic of Kenya") 
		"KI":"Oceania", // "Republic of Kiribati") 
		"KP":"Asia", // "Democratic People's Republic of Korea") 
		"KR":"Asia", // "Republic of Korea") 
		"KW":"Asia", // "State of Kuwait") 
		"KG":"Asia", // "Kyrgyz Republic") 
		"LA":"Asia", // "Lao People's Democratic Republic") 
		"LV":"Europe", // "Republic of Latvia") 
		"LB":"Asia", // "Lebanese Republic") 
		"LS":"Africa", // "Kingdom of Lesotho") 
		"LR":"Africa", // "Republic of Liberia") 
		"LY":"Africa", // "Libya") 
		"LI":"Europe", // "Principality of Liechtenstein") 
		"LT":"Europe", // "Republic of Lithuania") 
		"LU":"Europe", // "Grand Duchy of Luxembourg") 
		"MO":"Asia", // "Macao Special Administrative Region of China") 
		"MK":"Europe", // "Republic of Macedonia") 
		"MG":"Africa", // "Republic of Madagascar") 
		"MW":"Africa", // "Republic of Malawi") 
		"MY":"Asia", // "Malaysia") 
		"MV":"Asia", // "Republic of Maldives") 
		"ML":"Africa", // "Republic of Mali") 
		"MT":"Europe", // "Republic of Malta") 
		"MH":"Oceania", // "Republic of the Marshall Islands") 
		"MQ":"North America", // "Martinique") 
		"MR":"Africa", // "Islamic Republic of Mauritania") 
		"MU":"Africa", // "Republic of Mauritius") 
		"YT":"Africa", // "Mayotte") 
		"MX":"North America", // "United Mexican States") 
		"FM":"Oceania", // "Federated States of Micronesia") 
		"MD":"Europe", // "Republic of Moldova") 
		"MC":"Europe", // "Principality of Monaco") 
		"MN":"Asia", // "Mongolia") 
		"ME":"Europe", // "Montenegro") 
		"MS":"North America", // "Montserrat") 
		"MA":"Africa", // "Kingdom of Morocco") 
		"MZ":"Africa", // "Republic of Mozambique") 
		"MM":"Asia", // "Republic of the Union of Myanmar") 
		"NA":"Africa", // "Republic of Namibia") 
		"NR":"Oceania", // "Republic of Nauru") 
		"NP":"Asia", // "Federal Democratic Republic of Nepal") 
		"NL":"Europe", // "Kingdom of the Netherlands") 
		"NC":"Oceania", // "New Caledonia") 
		"NZ":"Oceania", // "New Zealand") 
		"NI":"North America", // "Republic of Nicaragua") 
		"NE":"Africa", // "Republic of Niger") 
		"NG":"Africa", // "Federal Republic of Nigeria") 
		"NU":"Oceania", // "Niue") 
		"NF":"Oceania", // "Norfolk Island") 
		"MP":"Oceania", // "Commonwealth of the Northern Mariana Islands") 
		"NO":"Europe", // "Kingdom of Norway") 
		"OM":"Asia", // "Sultanate of Oman") 
		"PK":"Asia", // "Islamic Republic of Pakistan") 
		"PW":"Oceania", // "Republic of Palau") 
		"PS":"Asia", // "Occupied Palestinian Territory") 
		"PA":"North America", // "Republic of Panama") 
		"PG":"Oceania", // "Independent State of Papua New Guinea") 
		"PY":"South America", // "Republic of Paraguay") 
		"PE":"South America", // "Republic of Peru") 
		"PH":"Asia", // "Republic of the Philippines") 
		"PN":"Oceania", // "Pitcairn Islands") 
		"PL":"Europe", // "Republic of Poland") 
		"PT":"Europe", // "Portuguese Republic") 
		"PR":"North America", // "Commonwealth of Puerto Rico") 
		"QA":"Asia", // "State of Qatar") 
		"RE":"Africa", // "Réunion") 
		"RO":"Europe", // "Romania") 
		"RU":"Europe", // "Russian Federation") 
		"RW":"Africa", // "Republic of Rwanda") 
		"BL":"North America", // "Saint Barthélemy") 
		"SH":"Africa", // '654' 
		"KN":"North America", // "Federation of Saint Kitts and Nevis") 
		"LC":"North America", // "Saint Lucia") 
		"MF":"North America", // "Saint Martin (French part)") 
		"PM":"North America", // "Saint Pierre and Miquelon") 
		"VC":"North America", // "Saint Vincent and the Grenadines") 
		"WS":"Oceania", // "Independent State of Samoa") 
		"SM":"Europe", // "Republic of San Marino") 
		"ST":"Africa", // "Democratic Republic of Sao Tome and Principe") 
		"SA":"Asia", // "Kingdom of Saudi Arabia") 
		"SN":"Africa", // "Republic of Senegal") 
		"RS":"Europe", // "Republic of Serbia") 
		"SC":"Africa", // "Republic of Seychelles") 
		"SL":"Africa", // "Republic of Sierra Leone") 
		"SG":"Asia", // "Republic of Singapore") 
		"SX":"North America", // "Sint Maarten (Dutch part)") 
		"SK":"Europe", // "Slovakia (Slovak Republic)") 
		"SI":"Europe", // "Republic of Slovenia") 
		"SB":"Oceania", // "Solomon Islands") 
		"SO":"Africa", // "Somali Republic") 
		"ZA":"Africa", // "Republic of South Africa") 
		"GS":"Antarctica", // "South Georgia and the South Sandwich Islands") 
		"SS":"Africa", // "Republic of South Sudan") 
		"ES":"Europe", // "Kingdom of Spain") 
		"LK":"Asia", // "Democratic Socialist Republic of Sri Lanka") 
		"SD":"Africa", // "Republic of Sudan") 
		"SR":"South America", // "Republic of Suriname") 
		"SJ":"Europe", // "Svalbard & Jan Mayen Islands") 
		"SZ":"Africa", // "Kingdom of Swaziland") 
		"SE":"Europe", // "Kingdom of Sweden") 
		"CH":"Europe", // "Swiss Confederation") 
		"SY":"Asia", // "Syrian Arab Republic") 
		"TW":"Asia", // "Taiwan 
		"TJ":"Asia", // "Republic of Tajikistan") 
		"TZ":"Africa", // "United Republic of Tanzania") 
		"TH":"Asia", // "Kingdom of Thailand") 
		"TL":"Asia", // "Democratic Republic of Timor-Leste") 
		"TG":"Africa", // "Togolese Republic") 
		"TK":"Oceania", // "Tokelau") 
		"TO":"Oceania", // "Kingdom of Tonga") 
		"TT":"North America", // "Republic of Trinidad and Tobago") 
		"TN":"Africa", // "Tunisian Republic") 
		"TR":"Asia", // "Republic of Turkey") 
		"TM":"Asia", // "Turkmenistan") 
		"TC":"North America", // "Turks and Caicos Islands") 
		"TV":"Oceania", // "Tuvalu") 
		"UG":"Africa", // "Republic of Uganda") 
		"UA":"Europe", // "Ukraine") 
		"AE":"Asia", // "United Arab Emirates") 
		"GB":"Europe", // "United Kingdom of Great Britain & Northern Ireland") 
		"US":"North America", // "United States of America") 
		"UM":"Oceania", // "United States Minor Outlying Islands") 
		"VI":"North America", // "United States Virgin Islands") 
		"UY":"South America", // "Eastern Republic of Uruguay") 
		"UZ":"Asia", // "Republic of Uzbekistan") 
		"VU":"Oceania", // "Republic of Vanuatu") 
		"VE":"South America", // "Bolivarian Republic of Venezuela") 
		"VN":"Asia", // "Socialist Republic of Vietnam") 
		"WF":"Oceania", // "Wallis and Futuna") 
		"EH":"Africa", // "Western Sahara") 
		"YE":"Asia", // "Yemen") 
		"ZM":"Africa", // "Republic of Zambia") 
		"ZW":"Africa" // "Republic of Zimbabwe"); 
	}
	//console.log(continent[name]);
	$("#server_name").html(continent[name]);
}

