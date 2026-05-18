import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";

import CandidateCard from "../components/CandidateCard";

import MatchChart from "../components/MatchChart";

function Home() {

  const [candidates, setCandidates] = useState([]);

  const [aiResponse, setAiResponse] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: ""
  });

  const [job, setJob] = useState({
    requiredSkills: "",
    preferredSkills: "",
    minExperience: ""
  });

  const fetchCandidates = async () => {

    try {

      const res = await API.get("/candidates");

      setCandidates(res.data.candidates);

    } catch (error) {

      console.log(error);

      alert("Backend connection failed");

    }

  };

  useEffect(() => {

    fetchCandidates();

  }, []);

  const addCandidate = async () => {

    try {

      setLoading(true);

      if (
        !formData.name ||
        !formData.email ||
        !formData.skills
      ) {

        alert("Please fill all required fields");

        return;

      }

      const payload = {

        name: formData.name,

        email: formData.email,

        skills: formData.skills
          .split(",")
          .map(skill => skill.trim()),

        experience: Number(formData.experience),

        bio: formData.bio

      };

      console.log(payload);

      const res = await API.post(
        "/candidates",
        payload
      );

      console.log(res.data);

      await fetchCandidates();

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: ""
      });

      alert("Candidate Added Successfully");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Failed To Add Candidate"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleMatch = async () => {

    try {

      setLoading(true);

      const payload = {

        requiredSkills:
          job.requiredSkills
            .split(",")
            .map(skill => skill.trim()),

        preferredSkills:
          job.preferredSkills
            .split(",")
            .map(skill => skill.trim()),

        minExperience:
          Number(job.minExperience)

      };

      const res = await API.post(
        "/match",
        payload
      );

      setCandidates(res.data.candidates);

      alert("Candidates Matched");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Matching Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleAI = async () => {

    try {

      setLoading(true);

      const payload = {

        requiredSkills:
          job.requiredSkills
            .split(",")
            .map(skill => skill.trim()),

        preferredSkills:
          job.preferredSkills
            .split(",")
            .map(skill => skill.trim()),

        minExperience:
          Number(job.minExperience)

      };

      const res = await API.post(
        "/ai/shortlist",
        payload
      );

      setAiResponse(res.data.recommendation);

      alert("AI Recommendation Generated");

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "AI Request Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto p-5">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">

          <h2 className="text-2xl font-bold text-cyan-400 mb-5">
            Add Candidate
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Skills (React, Node.js)"
              value={formData.skills}
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Experience"
              value={formData.experience}
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value
                })
              }
            />

          </div>

          <textarea
            placeholder="Candidate Bio"
            value={formData.bio}
            rows="4"
            className="bg-slate-800 p-4 rounded-xl w-full mt-5 outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                bio: e.target.value
              })
            }
          />

          <button
            type="button"
            onClick={addCandidate}
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-3 rounded-xl font-bold mt-5 cursor-pointer disabled:opacity-50"
          >
            {
              loading
                ? "Loading..."
                : "Add Candidate"
            }
          </button>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-10 shadow-lg">

          <h2 className="text-2xl font-bold text-purple-400 mb-5">
            Job Requirement
          </h2>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Required Skills"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setJob({
                  ...job,
                  requiredSkills: e.target.value
                })
              }
            />

            <input
              type="text"
              placeholder="Preferred Skills"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setJob({
                  ...job,
                  preferredSkills: e.target.value
                })
              }
            />

            <input
              type="number"
              placeholder="Minimum Experience"
              className="bg-slate-800 p-4 rounded-xl outline-none"
              onChange={(e) =>
                setJob({
                  ...job,
                  minExperience: e.target.value
                })
              }
            />

          </div>

          <div className="flex gap-5 mt-5 flex-wrap">

            <button
              type="button"
              onClick={handleMatch}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 transition-all px-6 py-3 rounded-xl font-bold cursor-pointer disabled:opacity-50"
            >
              Match Candidates
            </button>

            <button
              type="button"
              onClick={handleAI}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 transition-all px-6 py-3 rounded-xl font-bold cursor-pointer disabled:opacity-50"
            >
              AI Shortlist
            </button>

          </div>

        </div>

        <div className="mt-10">

          <MatchChart data={candidates} />

        </div>

        {

          aiResponse && (

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-10 shadow-lg">

              <h2 className="text-2xl font-bold text-purple-400 mb-5">
                AI Recommendation
              </h2>

              <pre className="whitespace-pre-wrap text-slate-300">
                {aiResponse}
              </pre>

            </div>

          )

        }

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">

          {

            candidates.map(candidate => (

              <CandidateCard
                key={candidate._id}
                candidate={candidate}
              />

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default Home;