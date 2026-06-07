import { motion } from "framer-motion";

function AnalysisModal({
  isOpen,
  onClose,
  analysis,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      bg-black/70
      backdrop-blur-md
      flex
      items-center
      justify-center
      p-6
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="
        bg-[#101827]
        border
        border-violet-500/20
        rounded-3xl
        w-[85%]
        max-w-6xl
        h-[80vh]
        shadow-2xl
        overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
          sticky
          top-0
          z-10
          flex
          justify-between
          items-center
          px-8
          py-6
          bg-[#101827]
          border-b
          border-white/10
          "
        >
          <h2 className="text-4xl font-bold text-white">
            AI Analysis
          </h2>

          <button
            onClick={onClose}
            className="
            px-4
            py-2
            rounded-xl
            bg-red-500/10
            text-red-300
            hover:bg-red-500/20
            transition-all
            "
          >
            Close
          </button>
        </div>

        {/* Body */}

        <div
          className="
          h-full
          overflow-y-auto
          px-8
          py-6
          whitespace-pre-wrap
          text-gray-300
          leading-8
          text-lg
          "
        >
          {analysis}
        </div>

      </motion.div>
    </div>
  );
}

export default AnalysisModal;