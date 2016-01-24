module.exports = function(bot, User){
  bot.onText(/\/add (.+)/, function (msg, match) {
    var fromId = msg.from.id,
        chatId = msg.chat.id || msg.from.id;

    User.findOne({telegramId: fromId}, function (err, user) {
      if(user) {
        var old = user.model;
        user.model = match[1].toUpperCase();

        user.save(function (err) {
          if (err) throw err;
          (old == 'unknown') ? 
            bot.sendMessage(chatId, 'Ok. Now your can use /list') :
            bot.sendMessage(chatId, 'Model changed from '+ old +' to ' + match[1]);
        });
      }
    });
  });

  bot.onText(/\/start/, function (msg, match) {
    var fromId = msg.from.id,
        chatId = msg.chat.id || msg.from.id,
        fromName = msg.from.username;

    User.findOne({telegramId: fromId}, function (err, user) {
      if (!user) {
        var newUser = User({
          telegramId: fromId,
          username: fromName,
          model: 'unknown'
        });

        newUser.save(function(err) {
          if (err) throw err;
          bot.sendMessage(fromId, 'Success, '+ msg.from.first_name +'!\n\
            Now add your phone model using /add [model] command.');
        });

      } else {
        console.log('finded')
        bot.sendMessage(chatId, 'Hi, '+ msg.from.first_name +'!\n\
        Your model: '+ user.model  +'.');
      };
    });
  });

  bot.onText(/\/group/, function (msg, match) {
    var fromId = msg.from.id;
    var chatId = msg.chat.id || msg.from.id;

    User.findOne({telegramId: fromId}, function (err, user) {
      if(user) if (user.model == 'unknown') {
        bot.sendMessage(fromId, 'Say /add for set model.');
      } else {

        User.find({model: user.model}).limit(20).and({ 
          telegramId: { $ne: fromId }
        }).exec(function (err, users) {

          if (!users.length) {
            bot.sendMessage(chatId, 'Cant find users with your model');
          } else {

            var list = 'Users with '+ user.model +':\n';
            for (var i = users.length; i >= 0; i--) {
              if(users[i]) list += '@'+ users[i].username + '\n';
            };

            bot.sendMessage(chatId, list);
          };  
        });
      };
    });
  });

  bot.onText(/\/list/, function (msg, match) {
    var fromId = msg.from.id,
        chatId = msg.chat.id || msg.from.id;

    User.find({}, function (err, users) {
      var list = 'user: model\n';
      for (var i = users.length; i >= 0; i--) {
        if(users[i]) list += '@'+ users[i].username + ': '+ users[i].model +'\n';
      }

      bot.sendMessage(chatId, list);
    });
  });


  bot.onText(/\/me/, function (msg, match) {
    var fromId = msg.from.id,
        chatId = msg.chat.id || msg.from.id;
    
    User.findOne({telegramId: fromId}, function (err, user) {
      bot.sendMessage(chatId, 'Your model is ' + user.model);
    });
  });

  bot.onText(/\/help/, function (msg, match) {
    var fromId = msg.chat.id || msg.from.id;
    bot.sendMessage(chatId, 'Comands:\n /add\n /list\n /group\n /me');
  });

  bot.onText(/\/litvinov/, function (msg, match) {
    var fromId = msg.chat.id || msg.from.id;
    bot.sendMessage(fromId, 'pidor');
  });
};