var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
//////////////////////////////////////////////

//Passport-local will add username, hash and salt field to store username, the hashed password and the salt value
var User = new Schema({
    username: String,
    password: String
});

//////////////////////////////////////////////
User.plugin(passportLocalMongoose);

var User = mongoose.model('User', User);
module.exports = User;
