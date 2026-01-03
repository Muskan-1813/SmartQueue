import { motion, AnimatePresence } from "framer-motion";
import { Mycontext } from "../Mycontext";
import { useContext } from "react";
import { UserPlus } from "lucide-react";
import { useParams } from "react-router";
import api from "../../api.js";
export const QueueList = ({ queue }) => {
  motion;
  const { theme } = useContext(Mycontext);
  let { queueId } = useParams();
  const joinQueue = () => {
    const repsonse = api.post(`/queue/${queueId}/join`);
    console.log(repsonse);
  };
  return (
    <>
      <div className="space-y-4 h-screen">
        <AnimatePresence>
          {queue.map((entry, idx) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-center gap-4 p-5 rounded-2xl border
            ${
              idx === 0
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900"
                : "bg-white dark:bg-[#111827] border-slate-200 dark:border-[#1f2937]"
            }`}
            >
              <span
                className={` font-bold text-lg w-8 ${
                  theme === "dark" ? "text-amber-50" : "text-slate-950"
                }`}
              >
                #{entry.position}
              </span>
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-amber-50" : "text-slate-950"
                } `}
              >
                {entry.userName || "Anonymous"}
              </span>
              {idx === 0 && (
                <span className="ml-auto text-xs font-bold text-blue-600 dark:text-blue-400">
                  Now Serving
                </span>
              )}
            </motion.div>
          ))}
          <button
            className={`flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold border transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20
                ${
                  theme === "dark"
                    ? "border-[#111827]  text-amber-50 bg-[#1b2e58] "
                    : "border-slate-900/20 bg-blue-500/15 hover:bg-blue-500/30 shadow-sm"
                }`}
            onClick={joinQueue}
          >
            Join <UserPlus size={20} />
          </button>
        </AnimatePresence>
      </div>
    </>
  );
};
