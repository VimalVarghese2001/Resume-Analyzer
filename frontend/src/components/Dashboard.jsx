import { useState } from "react";
import { motion } from "framer-motion";

import TrackerForm from "./TrackerForm";
import ResumeAnalyzer from "./ResumeAnalyzer";
import ApplicationHistory from "./ApplicationHistory";
import AnalysisModal from "./AnalysisModal";

function Dashboard() {
  const [analysis, setAnalysis] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  const [refreshHistory, setRefreshHistory] =
    useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-7xl px-4 md:px-0"
      >
        <div
          className="
            bg-white/5
            backdrop-blur-xl
            border
            border-white/10
            rounded-3xl
            p-5
            md:p-10
            shadow-2xl
          "
        >
          {/* Header */}

          <h1 className="text-4xl md:text-6xl font-extrabold text-white break-words">
            Resume Analyzer 🚀
          </h1>

          <p className="text-gray-400 mt-4 text-base md:text-xl">
            Track Applications. Analyze Resumes.
            Ace Interviews.
          </p>

          {/* Top Section */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <TrackerForm
              company={company}
              setCompany={setCompany}
              role={role}
              setRole={setRole}
              setRefreshHistory={
                setRefreshHistory
              }
            />

            <ResumeAnalyzer
              company={company}
              role={role}
              analysis={analysis}
              setAnalysis={setAnalysis}
              setShowModal={setShowModal}
            />
          </div>

          {/* Application History */}

          <div className="mt-10">
            <ApplicationHistory
              refreshHistory={refreshHistory}
              setAnalysis={setAnalysis}
              setShowModal={setShowModal}
            />
          </div>
        </div>
      </motion.div>

      {/* Analysis Modal */}

      <AnalysisModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        analysis={analysis}
      />
    </>
  );
}

export default Dashboard;