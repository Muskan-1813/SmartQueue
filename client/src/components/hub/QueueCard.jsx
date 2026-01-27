import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Users } from "lucide-react";

function QueueCard({ queue }) {
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div
      key={queue._id}
      onClick={() => navigate(`/queue/${queue._id}`)}
      className={`cursor-pointer rounded-4xl h-50 border p-8 transition-all
              hover:-translate-y-1 shadow-xl
              ${
                theme === "dark"
                  ? "bg-[#111827] border-[#1f2937] hover:border-blue-500/50 hover:shadow-blue-500/10"
                  : "bg-white border-slate-200 hover:shadow-slate-300/40"
              }`}
    >
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 tracking-tight">{queue.name}</h2>

      {/* Meta */}
      <div
        className={`flex items-center gap-6 text-sm ${
          theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
        }`}
      >
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              queue.isActive ? "bg-green-500" : "bg-slate-400"
            }`}
          ></span>
          {queue.isActive ? "Active" : "Inactive"}
        </span>

        <span className="flex items-center gap-2">
          <Users size={14} />
          Live queue
        </span>
      </div>
    </div>
  );
}

export default QueueCard;
