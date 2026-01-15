import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useContext } from "react";
import { Mycontext } from "../Mycontext";
import api from '../../api/api.js'

export const EmptyQueueState = ({ queueId }) => {
  // const queueLink = `${window.location.origin}/queue/${serviceId}`;
  const { theme } = useContext(Mycontext);
  motion;
  console.log("queueid:",queueId)
  const joinQueue = async() => {
    const repsonse = await api.post(`/queue/${queueId}/join`,{"userId":"695a514c7ba00714c27f5398"});
    console.log(repsonse.data);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`rounded-3xl border border-dashed p-14 text-center
        ${theme === "dark" ? "border-slate-300" : "border-[#1f2937]"}`}
    >
      <p
        className={`text-4xl font-extrabold mb-2 ${
          theme === "dark" ? "text-amber-50" : "text-black"
        } `}
      >
        Oops! no one is here...
      </p>
      <p className={`text-sm ${theme==='dark'?"text-slate-300":"text-slate-900"} mb-8`}>
        Share the queue link or wait for users to join.
      </p>

      {/* <button
        onClick={() => navigator.clipboard.writeText(queueLink)}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl
           ${theme==='dark'?"bg-[#2563eb]":"bg-[#3b82f6]"} text-white font-semibold hover:scale-110 transition-all active:scale-90`}
      >
        <Link2 size={16} /> Copy Queue Link
      </button> */}
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

    </motion.div>
  );
};
