const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  isAdmin: Boolean,
});

const User = new mongoose.model("Users", UserSchema);

module.exports = User;
