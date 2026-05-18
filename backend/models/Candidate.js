const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  skills: {
    type: [String],
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  projects: {
    type: [String],
    default: []
  },

  saved: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Candidate", CandidateSchema);