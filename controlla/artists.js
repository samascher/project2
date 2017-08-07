var request = require('request');
var db = require('../models');



//GET ids and send to front end
function getArtistIds (req, res, next) {
	var userId = req.user._id;
	console.log("user id is:", userId);
	console.log(req.params.artist);
	var artist = req.params.artist;
	request("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", function(error, response, body) {
		console.log('error: ', error);
		console.log('statusCode:', response && response.statusCode);
		var parseBody = JSON.parse(body);
		//create new search
		var newSearch = new db.Search({
			name: parseBody.artists.items[0].name,
			trackId: parseBody.artists.items[0].id,
			genres: parseBody.artists.items[0].genres
		});
		//save search to overall search DB
		newSearch.save(function (err, search){
			if (err) {
				return console.log("save error: ", err);
			}
			console.log("saved", search);
			//res.json(search);
		});

		//find current user
		db.User.findOne({ _id: userId }, function (err, user) {
			user.searchHistory.push(newSearch);
			
			//save new search to current user DB
			user.save(function (err, savedSearch) {
				if (err) {
					return console.log(err);
				}
				console.log('saved ' + savedSearch);
			});
		});
		

		console.log(parseBody.artists.items[0]);
		id = {artistId: parseBody.artists.items[0].id};
		console.log(parseBody.artists.items[0].id);
		console.log(id);
		res.json(id);

	});
}

//finds single user data searching history
function userSearchData (req, res, next) {
	var userId = req.user._id;

	db.User.findOne({_id: userId}, function (err,user){
		console.log(user.searchHistory);
		res.json(user.searchHistory);
	});
}

