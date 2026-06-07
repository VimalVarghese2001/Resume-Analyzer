import { motion } from "framer-motion";

function AnalysisResult({ analysis }) {
  if (!analysis) return null;

  const scoreMatch = analysis.match(/ATS Score:\s*(\d+%?)/i);
  const atsScore = scoreMatch ? scoreMatch[1] : "--";

  const cleanAnalysis = analysis.replace(
    /ATS Score:\s*\d+%?\s*/i,
    ""
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
      mt-10
      bg-[#101827]
      border
      border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      "
    >
      <h2 className="text-4xl font-bold text-white mb-8">
        AI Analysis Result
      </h2>

      {/* ATS Card */}

      <div
        className="
        w-64
        rounded-3xl
        p-6
        mb-8
        bg-gradient-to-r
        from-violet-600
        to-pink-500
        shadow-xl
        "
      >
        <p className="text-white text-lg">
          ATS SCORE
        </p>

        <h1 className="text-white text-6xl font-extrabold mt-3">
          {atsScore}
        </h1>
      </div>

      {/* Analysis */}

      <div
        className="
        bg-[#0B1220]
        border
        border-white/10
        rounded-2xl
        p-8
        whitespace-pre-wrap
        text-gray-300
        text-lg
        leading-10
        "
      >
        {cleanAnalysis}
      </div>
    </motion.div>
  );
}

export default AnalysisResult;