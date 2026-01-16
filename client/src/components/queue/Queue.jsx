import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { Users, Link2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/api.js";
import { QueueSkeleton } from "./QueueSkeleton.jsx";
import { QueueList } from "./QueueList.jsx";
import { EmptyQueueState } from "./EmptyQueueState.jsx";
import { Mycontext } from "../Mycontext.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setQueue} from "../../redux/features/queueSlice.js";

export const Queue = () => {
  const navigate = useNavigate();
  const { theme } = useContext(Mycontext);
  motion;
  let queue = useSelector((state) => state.queue.queue);
  const dispatch = useDispatch();
  const { queueId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueue = async () => {
      const res = await api.get(`/queue/${queueId}`);
      dispatch(setQueue(res.data));
      console.log("res:", res.data);
      setLoading(false);
    };
    fetchQueue();
  }, [queueId]);

  if (loading) {
    return <QueueSkeleton />;
  }

  return (
    <div
      className={` ${
        theme === "dark" ? "bg-[#0a0c18]" : "bg-amber-50"
      } pt-32 pb-24 w-100vw h-screen p-28`}
    >
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-5 text-sm font-semibold text-white opacity-70 hover:opacity-100 transition"
      >
        <ArrowLeft size={16} /> Back
      </button>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={` ${
          theme === "dark" ? "bg-[#0a0c18]" : "bg-amber-50"
        } mb-12 `}
      >
        <h1
          className={`${
            theme === "dark" ? "text-amber-50" : "text-shadow-slate-950"
          } text-4xl transition-all duration-300 font-bold tracking-tight `}
        >
          {queue.name}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            {queue.isActive}
          </span>
          <span className="flex items-center gap-2">
            <Users size={14} /> {queue.length} in queue
          </span>
        </div>
      </motion.div>

      {/* Queue Body */}
      {queue.length === 0 ? (
        <EmptyQueueState queueId={queueId} />
      ) : (
        <QueueList />
      )}
    </div>
  );
};

export default Queue;
