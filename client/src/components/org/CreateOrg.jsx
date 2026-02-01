import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import api from "../../api/api.js";
import Error from "../utils/Error.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";

const CreateOrg = () => {
  motion;
  const theme = useSelector((s) => s.theme.mode);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await api.post("/org", { name });
      navigate("/org/me");
    } catch (err) {
      setError(err.response?.data?.message || "Failed creating organisation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 ${
        theme === "dark" ? "bg-[#0b0f14]" : "bg-slate-50"
      }`}
    >
      {/* Back */}
      <div className="absolute top-24 left-6 md:left-12">
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
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`relative w-full max-w-xl rounded-[2.75rem] p-14 border overflow-hidden
        ${
          theme === "dark"
            ? "bg-linear-to-b from-[#111827] to-[#0b0f14] border-[#1f2937]"
            : "bg-white border-slate-200 shadow-2xl shadow-slate-300/40"
        }`}
      >
        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-[90px]" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-[90px]" />

        {/* Icon */}
        <div
          className={`relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl
          ${
            theme === "dark"
              ? "bg-blue-500/10 text-blue-400 shadow-blue-500/20"
              : "bg-blue-500/10 text-blue-600 shadow-blue-500/30"
          }`}
        >
          <Building2 size={32} />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-black tracking-tight text-center mb-4">
          Create your organisation
        </h1>

        {/* Description */}
        <p
          className={`text-base leading-relaxed text-center max-w-md mx-auto mb-10
          ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"}`}
        >
          An organisation is required to create and manage queues. You can only
          create one — choose the name carefully.
        </p>

        {/* Error */}
        {error && (
          <div className="mb-6">
            <Error err={error} />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Organisation name"
            className={`w-full h-14 rounded-2xl px-5 text-sm border outline-none transition-all
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937] text-[#e5e7eb] focus:border-blue-500"
                : "bg-slate-50 border-slate-200 focus:border-blue-500"
            }`}
          />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full h-14 rounded-2xl font-bold text-sm text-white transition-all
            bg-[#2563eb] hover:bg-[#1d4ed8]
            shadow-xl shadow-blue-500/30
            disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {loading ? "Creating…" : "Create organisation"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateOrg;
