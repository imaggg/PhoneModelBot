var TelegramBot = require('node-telegram-bot-api');
var User = require('./models/user');
var http = require('http');

var token = '###';
var bot = new TelegramBot(token, {polling: true});

var mongoose = require('mongoose');
mongoose.connect('###');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	// bot functionality
	require('./bot')(bot, User);

	var server = http.createServer(handle);
	server.listen(process.env.PORT || 3000, function() {
	  console.log('ok');
	});

	function handle(req, res) {
	  res.end('<a href="https://telegram.me/PhoneModelBot">Get it!</a>');
	}
});