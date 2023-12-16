const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// equals to
const { Schema } = mongoose;

// using mongoose will remove flexibility on mongodb on flex schema since it requires to know the schema ahead of time
// define schema for user model instance aka. user document (json object)
const userSchema = new Schema({
  googleId: String
});

// create new user model class aka. collection
mongoose.model('users', userSchema);