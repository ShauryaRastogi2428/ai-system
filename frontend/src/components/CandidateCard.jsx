import { motion } from "framer-motion";

function CandidateCard({ candidate }) {

  return (

    <motion.div

      whileHover={{ scale: 1.03 }}

      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl"

    >

      <h2 className="text-2xl font-bold text-cyan-400">
        {candidate.name}
      </h2>

      <p className="text-slate-400 mt-2">
        {candidate.email}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">

        {candidate.skills.map((skill, index) => (

          <span
            key={index}
            className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>

        ))}

      </div>

      <div className="mt-5">

        <p className="text-slate-300">
          Experience:
          {" "}
          {candidate.experience}
          {" "}
          years
        </p>

        {

          candidate.matchScore && (

            <p className="text-green-400 font-bold mt-2">

              Match Score:
              {" "}
              {candidate.matchScore}%

            </p>

          )

        }

      </div>

    </motion.div>

  );

}

export default CandidateCard;