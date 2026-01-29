import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import api from "../../api/api.js";
import Error from "../utils/Error.jsx";
import { useNavigate } from "react-router-dom";

function CreateOrg() {
  const theme = useSelector((s) => s.theme.mode);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });
  const [error, setError] = useState(null);
  motion;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/org`, formData);
      console.log(res.data);
      navigate("/org/orgs");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed Creating Organisation");
    }
  };

  return (
    <div className="m-30">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
        className={`w-full max-w-md rounded-4xl p-10 mt-15 space-y-8 border
    ${
      theme === "dark"
        ? "bg-[#111827] border-[#1f2937]"
        : "bg-white border-slate-200 shadow-2xl"
    }`}
      >
        {error && <Error err={error} />}
        <input
          className={`w-full h-12 rounded-xl px-4 text-sm border outline-none transition-colors
        ${
          theme === "dark"
            ? "bg-[#0b0f14] border-[#1f2937] focus:border-blue-500"
            : "bg-slate-50 border-slate-200 focus:border-blue-500"
        }`}
          type="text"
          placeholder="Organisation Name"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
        <button
          type="submit"
          className="w-full h-12 rounded-xl font-bold text-sm transition-all active:scale-95
      bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg shadow-blue-500/20"
        >
          Create Organisation
        </button>
      </motion.form>
    </div>
  );
}

export default CreateOrg;
