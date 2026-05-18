const Candidate = require("../models/Candidate");

const getAIShortlist = require("../services/openrouterService");

exports.aiShortlist = async (req, res) => {

  try {

    const candidates = await Candidate.find();

    const aiResponse = await getAIShortlist(
      req.body,
      candidates
    );

    res.status(200).json({
      success: true,
      recommendation: aiResponse
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};