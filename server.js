//setting up Express
var express = require('express');
var app = express();
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// HARDCORE HARDCODE

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); 
app.use(cookieParser());

app.set('views', './views');
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'WDI-GENERAL-ASSEMBLY-EXPRESS' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./config/passport')(passport);

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

//require routes
var routes = require('./config/routes');
app.use(routes);

//SERVER -- Listening on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server running on http://localhost:3000/');
});