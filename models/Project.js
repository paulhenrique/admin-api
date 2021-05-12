const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  institutions: {
    type: String,
    required: true,
  },
  participant: [
    {
      name: {
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
    }
  ],
  created_at: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;