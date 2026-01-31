import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const OrganisationQueuesEmptyState = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  motion;
  return (
    <div
      className={`flex items-center justify-center min-h-screen px-6 ${
        theme === "dark"
          ? "bg-[#111827] border-[#1f2937] hover:border-blue-500/40 hover:shadow-blue-500/10"
          : "bg-white border-slate-200 hover:shadow-slate-300/40"
      }  `}
    >
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm font-semibold transition-opacity
          ${
            theme === "dark"
              ? "text-[#9ca3af] hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`relative max-w-xl w-full rounded-[2.5rem] p-16 text-center border overflow-hidden
        ${
          theme === "dark"
            ? "bg-linear-to-b from-[#111827] to-[#0b0f14] border-[#1f2937]"
            : "bg-white border-slate-200 shadow-2xl shadow-slate-300/40"
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

        {/* Icon */}
        <div
          className={`relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl
          ${
            theme === "dark"
              ? "bg-blue-500/10 text-blue-400 shadow-blue-500/20"
              : "bg-blue-500/10 text-blue-600 shadow-blue-500/30"
          } shadow-xl`}
        >
          <PlusCircle size={32} />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black tracking-tight mb-4">
          No queues created yet
        </h2>

        {/* Description */}
        <p
          className={`text-base leading-relaxed max-w-md mx-auto mb-10
          ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"}`}
        >
          Your organisation is set up and ready. Create your first queue to
          begin managing customers in real time — transparently and
          effortlessly.
        </p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/queue")}
          className="group inline-flex items-center gap-4 px-10 py-5 rounded-2xl font-bold text-white
          bg-[#2563eb] hover:bg-[#1d4ed8]
          shadow-xl shadow-blue-500/30 transition-all"
        >
          Create your first queue
          <PlusCircle
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrganisationQueuesEmptyState;
