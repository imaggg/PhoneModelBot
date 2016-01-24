var TelegramBot = require('node-telegram-bot-api'),
		User = require('./models/user'),
		http = require('http'),
		mongoose = require('mongoose');
		
		token = '120198089:AAEyymQlxt_6luLxQojA0UcEl7Roq6bgm9k',
		bot = new TelegramBot(token, {polling: true}),
		db = mongoose.connection;

mongoose.connect('mongodb://dima:1997dimalolik1997@ds047955.mongolab.com:47955/heroku_x95w42p7');

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