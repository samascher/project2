var db = require('/.models');

db.Artist.remove({}, function(err,artists){
	if (err) {
		console.log("Error: ", err);
	}
	console.log('removed all artists');
});

var test = [
{
	artist: "Abhi the Nomad",
	track: "Somebody to Love",
	album: "Somebody to Love Single",
},
{
	artist: "Cage the Elephant",
	track: "Trouble",
	album: "Trouble",
},
{
	artist: "Ghostland Observatory",
	track: "Give Me the Beat",
	album: "Codename: Rondo",
},
{
	artist: "Cherub",
	track: "XOXO",
	album: "MoM & DaD",
},
{
	artist: "LCD Soundsystem",
	track: "I Can Change",
	album: "This is Happening",
},
];

db.Artist.create(test, function(err, artists){
	if (err) {
		console.log("Error: ", err);
	} else {
		console.log("Created new artists", artists);
		process.exit();
	}
});