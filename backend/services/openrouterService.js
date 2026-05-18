const axios = require("axios");

const getAIShortlist = async (
  job,
  candidates
) => {

  try {

    const prompt = `

You are an AI recruiter.

Job Requirements:

Required Skills:
${job.requiredSkills.join(", ")}

Preferred Skills:
${job.preferredSkills.join(", ")}

Minimum Experience:
${job.minExperience}

Candidates:

${candidates.map((candidate, index) => `

${index + 1}.

Name: ${candidate.name}

Skills: ${candidate.skills.join(", ")}

Experience: ${candidate.experience}

Bio: ${candidate.bio || "No bio"}

Projects:
${candidate.projects?.join(", ") || "No projects"}

`).join("\n")}

Instructions:

1. Rank candidates from best to worst.
2. Explain why each candidate is suitable.
3. Mention matched skills.
4. Suggest interview focus areas.
5. Keep output concise and professional.

`;

    const response = await axios({

      method: "POST",

      url:
        "https://openrouter.ai/api/v1/chat/completions",

      headers: {

        Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type":
          "application/json",

        "HTTP-Referer":
          "http://localhost:5173",

        "X-Title":
          "Candidate Shortlisting System"

      },

      data: {

        model:
          "openrouter/auto",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ]

      }

    });

    console.log(response.data);

    return response.data
      .choices[0]
      .message.content;

  } catch (error) {

    console.log(
      "OPENROUTER FULL ERROR:"
    );

    console.log(
      JSON.stringify(
        error.response?.data,
        null,
        2
      )
    );

    return "AI recommendation failed.";

  }

};

module.exports = getAIShortlist;