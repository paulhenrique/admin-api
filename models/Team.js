const mongoose = require("mongoose");
const TeamScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  lattesOrLinkedin: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Team = mongoose.model("Team", TeamScheme);

module.exports = Team;