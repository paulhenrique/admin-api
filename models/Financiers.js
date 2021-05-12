const mongoose = require("mongoose");
const FinanciersScheme = new mongoose.Schema({
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

const Financiers = mongoose.model("Financiers", FinanciersScheme);

module.exports = Financiers;