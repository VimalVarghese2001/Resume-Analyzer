import { motion } from "framer-motion";
import axios from "axios";

function TrackerForm({
  company,
  setCompany,
  role,
  setRole,
  setRefreshHistory,
}) {

  const saveApplication = async () => {
    try {

      await axios.post(
        "http://localhost:5000/api/applications",
        {
          company,
          role,
        }
      );

      alert("Application Saved!");

      // Refresh Application History automatically
      setRefreshHistory((prev) => !prev);

    } catch (error) {
      console.log(error);
      alert("Failed to save application");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="
      bg-[#101827]
      border
      border-white/10
      rounded-2xl
      p-8
      "
    >
      <h2 className="text-3xl font-bold text-white mb-2">
        Application Details
      </h2>

      <p className="text-gray-400 mb-6">
        Enter the company and role you are applying for.
      </p>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="
          w-full
          bg-[#0B1220]
          border
          border-gray-700
          rounded-xl
          p-4
          text-white
          outline-none
          focus:border-blue-500
          "
        />

        <input
          type="text"
          placeholder="Job Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="
          w-full
          bg-[#0B1220]
          border
          border-gray-700
          rounded-xl
          p-4
          text-white
          outline-none
          focus:border-blue-500
          "
        />

        <button
          onClick={saveApplication}
          className="
          w-full
          bg-gradient-to-r
          from-blue-500
          to-violet-600
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
          Save Application
        </button>

      </div>
    </motion.div>
  );
}

export default TrackerForm;