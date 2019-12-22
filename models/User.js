const mongoose = require("mongoose");

const User = mongoose.model("User", {
  hash: String,
  token: String
});

module.exports = User;
