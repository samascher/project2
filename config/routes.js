var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require("passport");

// Parses information from POST method(s)
var bodyParser = require('body-parser');
// Used to manipulate POST method(s)
var methodOverride = require('method-override');

var usersController = ('../controllers/users');
var staticsController = ('../controllers/statics');
var artistController = ('../controllers/artists');

function authenticatedUser(req, res, next){
	//if user is authenticated, then we continue
	if (req.isAuthenticated()) return next();
	//else req is redirected to the home
	res.redirect('/');
}

// homepage

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

 router.route("/secret")
 	.get(authenticatedUser, usersController.secret);

// main app page
router.route('/songify')
	.get(staticsController.appPage);
	//must log in to acces this page tho
	//.get(authenticatedUser, staticsController.appPage) ?? 

// Current user search history
router.route('/userpage')
	.get(staticsController.userPage);
router.route('/userpage/searches')
	.get(authenticatedUser, artistController.userSearchData);
router.route('/userpage/searches/:searchId')
	.delete(authenticatedUser, artistController.deleteSearchData);

router.route('/songify/:artist')
	.get(artistController.getArtistIds);
	// .post(artistController.getArtistIds);

//search data for any user - like anything anywhere
router.route('/searches')
	.get(artistController.getSearches)
	// .post(authenticatedUser, artistController.postSearch)
	.post(artistController.postSearch);

router.route('/searches/:id')
	.get(artistController.getOneSearch)
	.put(artistController.editOneSearch)
	.delete(artistController.deleteSearch);

//user info
router.route('/user')
	.get(usersController.userData);

router.route('/mysearches');
	// .get(authenticatedUser, artistController.userSearchData)

// router.get('/', function (req, res) {
// 	res.json({message: 'hello world'});
// });

//*****RESTful ROUTES******

//show all artists
router.get('/api/artists', function (req, res) {
	db.Artist.find()
	.exec(function (err, artists) {
		if (err) { return console.log("index error: " + err); }
		res.json(artists);
	});
});

//show one artist
router.get('/api/artists/:id', function (req, res) {
	db.Artist.findOne({_id: req.params.id}, function(err, artist) {
		res.json(artist);
	});
});

//create new artist
router.post('/api/artists', function (req, res) {
	var newArtist = new db.Artist({
		artist: req.body.artist,
		track: req.body.track,
		album: req.body.album
	});
	newArtist.save(function(err, artist) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", artist.artist);
		res.json(artist);
	});
});

//update artist
router.put('/api/artists/:id', function (req, res) {

	var id = req.params.id;

	db.Artist.findOne({_id: id}, function(err, artist) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.name) artist.artist = req.body.artist;
		if (req.body.track) artist.track = req.body.track;
		if (req.body.album) artist.album = req.body.album;

		artist.save(function(err) {
			if (err) res.json({message: 'could not update'});
			res.json({message: 'artist updated'});
		});
	});
});

//delete artist
router.delete('/api/artists/:id', function (req, res) {
	var id = req.params.id;
	db.Artist.findOneAndRemove({_id: id}, function(err, deletedArtist) {
		console.log("deleted ", id);
		res.json(deletedArtist);
	});
});



//hardcode test data

// var test = [
// {
// 	artist: "Abhi the Nomad",
// 	track: "Somebody to Love",
// 	album: "Somebody to Love Single",
// },
// {
// 	artist: "Cage the Elephant",
// 	track: "Trouble",
// 	album: "Trouble",
// },
// {
// 	artist: "Ghostland Observatory",
// 	track: "Give Me the Beat",
// 	album: "Codename: Rondo",
// },
// {
// 	artist: "Cherub",
// 	track: "XOXO",
// 	album: "MoM & DaD",
// },
// {
// 	artist: "LCD Soundsystem",
// 	track: "I Can Change",
// 	album: "This is Happening",
// },
// ];

//HARD CODED TESTS
//show index

// app.get('/api/artists', function artistIndex(req, res) {
// 	res.json({test : test});
// });

//export routes
module.exports = router;