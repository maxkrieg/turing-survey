var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var questionSchema = require('./question.js');
var surveySchema = require('./surveys.js');
//////////////////////////////////////////////

// Passport-local will add username, hash and salt field to store username, the hashed password and the salt value
var userSchema = new mongoose.Schema({
  username: String
});

//////////////////////////////////////////////
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);
module.exports = User;
