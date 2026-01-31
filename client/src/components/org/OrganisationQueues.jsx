import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api/api.js";
import { motion } from "framer-motion";
import { Users, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import OrganisationQueuesEmptyState from "./OrganisationQueuesEmptyState.jsx";
import { ArrowLeft } from "lucide-react";

const OrganisationQueues = () => {
  motion;
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();

  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const res = await api.get("/org/me/queues");
        setQueues(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load queues");
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  /* ---------------- Page Wrapper ---------------- */
  return (
    <div
      className={`min-h-screen px-6 pt-28 pb-24 ${theme === "dark" ? "bg-[#0b0f14] text-[#e5e7eb]" : "bg-[#fcfcfd] text-[#0f172a]"} `}
    >
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 text-sm mb-6 font-semibold transition-opacity
          ${
            theme === "dark"
              ? "text-[#9ca3af] hover:text-white"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-4xl font-black tracking-tight mb-3">
            Your queues
          </h1>
          <p
            className={`text-sm max-w-lg ${
              theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
            }`}
          >
            Manage and monitor all queues under your organisation in real time.
          </p>
        </div>

        {/* ---------------- Loading ---------------- */}
        {loading && (
          <div className="flex justify-center py-32">
            <span
              className={`text-sm animate-pulse ${
                theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
              }`}
            >
              Loading queues…
            </span>
          </div>
        )}

        {/* ---------------- Error ---------------- */}
        {!loading && error && (
          <div
            className={`text-center py-32 text-sm font-medium ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            {error}
          </div>
        )}

        {/* ---------------- Empty State ---------------- */}
        {!loading && !error && queues.length === 0 && (
          <OrganisationQueuesEmptyState />
        )}

        {/* ---------------- Queue Grid ---------------- */}
        {!loading && !error && queues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {queues.map((queue, idx) => (
              <motion.div
                key={queue._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                onClick={() => navigate(`/queue/${queue._id}`)}
                className={`group cursor-pointer rounded-4xl p-8 border transition-all
                hover:-translate-y-1 hover:shadow-xl
                ${
                  theme === "dark"
                    ? "bg-[#111827] border-[#1f2937] hover:border-blue-500/40 hover:shadow-blue-500/10"
                    : "bg-white border-slate-200 hover:shadow-slate-300/40"
                }`}
              >
                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight mb-5 group-hover:text-blue-500 transition-colors">
                  {queue.name}
                </h3>

                {/* Meta */}
                <div
                  className={`flex items-center justify-between text-sm
                  ${theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"}`}
                >
                  <span className="flex items-center gap-2">
                    <Users size={14} />
                    {queue.tickets?.length ?? 0} in queue
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    {queue.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className={`my-6 h-px ${
                    theme === "dark" ? "bg-[#1f2937]" : "bg-slate-200"
                  }`}
                />

                {/* Action */}
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-500">
                  View queue
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganisationQueues;
