const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  roles: [{ type: String }], // Array of roles for user
  isAuthenticated: { type: Boolean, default: false }, 
});
let User = mongoose.model("User", userSchema);
module.exports = User;
