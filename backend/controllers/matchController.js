const Candidate = require("../models/Candidate");

const calculateMatchScore = require("../utils/matchUtils");

exports.matchCandidates = async (req, res) => {

  try {

    const {
      requiredSkills,
      preferredSkills,
      minExperience
    } = req.body;

    const candidates = await Candidate.find();

    const rankedCandidates = candidates.map(candidate => {

      const result = calculateMatchScore(candidate, {
        requiredSkills,
        preferredSkills,
        minExperience
      });

      return {
        ...candidate.toObject(),
        ...result
      };

    });

    rankedCandidates.sort(
      (a, b) => b.matchScore - a.matchScore
    );

    res.status(200).json({
      success: true,
      candidates: rankedCandidates
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};