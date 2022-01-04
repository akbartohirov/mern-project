const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
    unique: true,
  },
  to: {
    type: String,
    required: true,
    unique: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  date: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
  owner: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

const Link = mongoose.model("Link", userSchema);

module.exports = Link;
