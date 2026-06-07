import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer({
  company,
  role,
  analysis,
  setAnalysis,
  setShowModal,
}) {

  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const analyzeResume = async () => {
  if (!company.trim()) {
  alert("Please enter Company Name.");
  return;
  }

  if (!role.trim()) {
  alert("Please enter Job Role.");
  return;
  }

  if (!selectedFile) {
    alert("Please upload a resume.");
    return;
  }

  if (!jobDescription.trim()) {
    alert("Please enter a Job Description.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", selectedFile);

    const uploadResponse = await axios.post(
      "http://localhost:5000/api/upload",
      formData
    );

    const resumeText = uploadResponse.data.resumeText;

    const analysisResponse = await axios.post(
      "http://localhost:5000/api/analyze",
      {
        companyName: company,
        jobRole: role,
        resumeText,
        jobDescription,
      }
    );

    setAnalysis(
    analysisResponse.data.analysis
    );

    // Open AI Result Popup

    setShowModal(true);

    } catch (error) {
        console.log(error);
        alert("Something went wrong while analyzing your resume.");
    } finally {
        setLoading(false);
    }
    };

  return (

    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#101827] border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        AI Resume Analyzer
      </h2>
      <p className="text-gray-400 mb-6">
      Analyzing for:
      <span className="text-violet-300 font-semibold">
      {" "}
      {company || "Company"} — {role || "Role"}
    </span>
    </p>

      {/* Upload */}

      <label
        className="
        flex
        items-center
        justify-center
        w-full
        h-32
        border-2
        border-dashed
        border-violet-500/50
        rounded-xl
        cursor-pointer
        hover:border-violet-400
        transition-all
        "
      >
        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => {
            if (e.target.files[0]) {
                 setSelectedFile(e.target.files[0]);
                 setFileName(e.target.files[0].name);
     }
    }}
        />

        <span className="text-gray-300 text-center px-4">
          {fileName || "📄 Click to Upload Resume PDF"}
        </span>
      </label>

      {/* Job Description */}

      <textarea
        placeholder="Paste Job Description here..."
        rows="7"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="
        w-full
        mt-6
        bg-[#0B1220]
        border
        border-gray-700
        rounded-xl
        p-4
        text-white
        outline-none
        focus:border-violet-500
        resize-none
        "
      />

      {/* Button */}

      <button
        onClick={analyzeResume}
        className="
        w-full
        mt-6
        bg-gradient-to-r
        from-violet-500
        to-pink-600
        hover:scale-[1.02]
        transition-all
        duration-300
        rounded-xl
        p-4
        text-white
        font-bold
        shadow-lg
        "
      >
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>
   
    </motion.div>
  );
}

export default ResumeAnalyzer;