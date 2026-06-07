import { useEffect, useState } from "react";
import axios from "axios";

function ApplicationHistory({
  refreshHistory,
  setAnalysis,
  setShowModal,
}) {
  const [applications, setApplications] =
    useState([]);

  const [analyses, setAnalyses] =
    useState([]);

  useEffect(() => {
    fetchApplications();
    fetchAnalyses();
  }, [refreshHistory]);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "https://resume-analyzer-backend-ktnu.onrender.com/api/applications"
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalyses = async () => {
    try {
      const res = await axios.get(
        "https://resume-analyzer-backend-ktnu.onrender.com/api/analyze"
      );

      setAnalyses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openAnalysis = (app) => {
    const analysis = analyses
      .filter(
        (a) =>
          a.companyName === app.company &&
          a.jobRole === app.role
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )[0];

    if (analysis) {
      setAnalysis(analysis.analysis);
      setShowModal(true);
    } else {
      alert(
        "No AI Analysis found for this application."
      );
    }
  };

  return (
    <div
      className="
        mt-10
        bg-[#101827]
        border
        border-white/10
        rounded-2xl
        p-5
        md:p-8
      "
    >
      <h2 className="text-3xl font-bold text-white mb-6">
        Application History
      </h2>

      {/* Desktop View */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="
                text-gray-400
                border-b
                border-gray-700
                text-left
              "
            >
              <th className="pb-3">
                Company
              </th>

              <th className="pb-3">
                Role
              </th>

              <th className="pb-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="
                  border-b
                  border-gray-800
                  text-white
                  hover:bg-white/5
                  transition-all
                "
              >
                <td className="py-4">
                  {app.company}
                </td>

                <td>{app.role}</td>

                <td className="text-center">
                  <button
                    onClick={() =>
                      openAnalysis(app)
                    }
                    className="
                      px-4
                      py-2
                      rounded-lg
                      bg-violet-500/10
                      border
                      border-violet-500/30
                      text-violet-300
                      hover:bg-violet-500/20
                      transition-all
                    "
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}

      <div className="md:hidden space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="
              bg-[#0f172a]
              border
              border-white/10
              rounded-xl
              p-4
            "
          >
            <p className="text-gray-400 text-sm">
              Company
            </p>

            <h3 className="text-white font-semibold mb-3 break-words">
              {app.company}
            </h3>

            <p className="text-gray-400 text-sm">
              Role
            </p>

            <p className="text-white mb-4 break-words">
              {app.role}
            </p>

            <button
              onClick={() =>
                openAnalysis(app)
              }
              className="
                w-full
                py-2
                rounded-lg
                bg-violet-500/10
                border
                border-violet-500/30
                text-violet-300
                hover:bg-violet-500/20
                transition-all
              "
            >
              View Analysis
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicationHistory;