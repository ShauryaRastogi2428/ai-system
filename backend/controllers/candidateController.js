const Candidate = require("../models/Candidate");

exports.addCandidate = async (req, res) => {

  try {

    const candidate = await Candidate.create(req.body);

    res.status(201).json({
      success: true,
      candidate
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getCandidates = async (req, res) => {

  try {

    const candidates = await Candidate.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      candidates
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.saveCandidate = async (req, res) => {

  try {

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { saved: true },
      { new: true }
    );

    res.status(200).json({
      success: true,
      candidate
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

exports.getSavedCandidates = async (req, res) => {

  try {

    const candidates = await Candidate.find({
      saved: true
    });

    res.status(200).json({
      success: true,
      candidates
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};