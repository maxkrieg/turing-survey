var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
//////////////////////////////////////////////

var Account = new Schema({
    username: String,
    password: String
});

//////////////////////////////////////////////
Account.plugin(passportLocalMongoose);

var User = mongoose.model('User', User);
module.exports = User;
