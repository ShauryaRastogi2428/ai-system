import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function MatchChart({ data }) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <h2 className="text-2xl font-bold text-cyan-400 mb-5">
        Match Scores
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="matchScore" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default MatchChart;