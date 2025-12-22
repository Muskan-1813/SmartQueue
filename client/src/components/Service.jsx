import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Clock, PlusCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Mycontext } from "./Mycontext";
import api from "../api.js";

const CreateService = () => {
  motion;
  const { theme } = useContext(Mycontext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    startAt: "",
    endAt: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Creating service:", form);
    try {
      let response = await api.post("/queue", form);
      let queueId = response.data._id;
      console.log(queueId);
      navigate(`/queue/${queueId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.45, 0.32, 0.9],
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-[#0b0f14] text-[#e5e7eb]"
            : "bg-[#fcfcfd] text-[#0f172a]"
        }`}
    >
      <section className="pt-25 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-5 text-sm font-semibold  opacity-70 hover:opacity-100 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className={`max-w-xl mx-auto rounded-[3rem] p-12 md:p-14 border
            ${
              theme === "dark"
                ? "bg-[#0b0f14] border-[#1f2937]"
                : "bg-white border-slate-700/30 shadow-3xl shadow-slate-700/60"
            }`}
        >
          {/* Header */}
          <div className="mb-12">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest
              bg-blue-50 text-blue-600 border border-blue-100
              dark:bg-blue-900/20 dark:text-[#3b82f6] dark:border-blue-900/30"
            >
              Service Setup
            </span>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight mt-6">
              Create a Queue
            </h1>

            <p
              className={`mt-5 text-base leading-relaxed max-w-lg
                ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-600"}`}
            >
              Define your service name and operating window. Once active, users
              can begin joining the queue remotely.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold tracking-tight">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Bank Counter A"
                value={form.name}
                onChange={handleChange}
                className={`px-6 py-4 rounded-2xl border transition-all outline-none
                  ${
                    theme === "dark"
                      ? "bg-[#111827] border-[#1f2937] focus:border-[#3b82f6]"
                      : "bg-slate-50 border-slate-300 focus:border-[#2563eb]"
                  }`}
              />
            </div>

            {/* Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold flex items-center gap-2">
                  <Clock size={14} /> Start Time
                </label>
                <input
                  type="datetime-local"
                  name="startAt"
                  required
                  value={form.startAt}
                  onChange={handleChange}
                  className={`px-6 py-4 rounded-2xl border transition-all outline-none
                    ${
                      theme === "dark"
                        ? "bg-[#111827] border-[#1f2937] focus:border-[#3b82f6]"
                        : "bg-slate-50 border-slate-300 focus:border-[#2563eb]"
                    }`}
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold flex items-center gap-2">
                  <Clock size={14} /> End Time
                </label>
                <input
                  type="datetime-local"
                  name="endAt"
                  required
                  value={form.endAt}
                  onChange={handleChange}
                  className={`px-6 py-4 rounded-2xl border transition-all outline-none
                    ${
                      theme === "dark"
                        ? "bg-[#111827] border-[#1f2937] focus:border-[#3b82f6]"
                        : "bg-slate-50 border-slate-300 focus:border-[#2563eb]"
                    }`}
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full mt-6 py-6 rounded-2xl font-bold text-lg
                flex items-center justify-center gap-3
                bg-[#2563eb] dark:bg-[#3b82f6] text-white
                shadow-xl shadow-blue-500/20"
            >
              Create Queue <PlusCircle size={22} />
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default CreateService;
