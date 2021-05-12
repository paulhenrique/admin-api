const mongoose = require("mongoose");
const UniversityScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const University = mongoose.model("University", UniversityScheme);

module.exports = University;