var TelegramBot = require('node-telegram-bot-api'),
	User = require('./models/user'),
	http = require('http'),
	mongoose = require('mongoose'),
		
	token = '###',
	bot = new TelegramBot(token, {polling: true}),
	db = mongoose.connection;

mongoose.connect('###');

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