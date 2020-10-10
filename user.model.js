const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  user_name: { type: String },
  user_email: { type: String },
  user_pwd: { type: String },
  tokens: [
    {
      type: String,
      time: Date.now(),
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
