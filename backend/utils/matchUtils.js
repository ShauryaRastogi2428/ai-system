const calculateMatchScore = (candidate, job) => {

  const requiredSkills = job.requiredSkills || [];

  const preferredSkills = job.preferredSkills || [];

  const matchedRequired = candidate.skills.filter(skill =>
    requiredSkills.includes(skill)
  );

  const matchedPreferred = candidate.skills.filter(skill =>
    preferredSkills.includes(skill)
  );

  const requiredScore =
    matchedRequired.length / requiredSkills.length;

  const preferredBonus =
    matchedPreferred.length * 10;

  const experienceBonus =
    candidate.experience >= job.minExperience
      ? 20
      : 0;

  const finalScore =
    (requiredScore * 100) +
    preferredBonus +
    experienceBonus;

  return {

    matchScore: Math.min(finalScore, 100),

    matchedSkills: matchedRequired,

    preferredMatched: matchedPreferred

  };

};

module.exports = calculateMatchScore;