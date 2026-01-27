import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import api from "../../api/api.js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import QueueCard from "./QueueCard.jsx";
import { setUser, clearUser } from "../../redux/features/userSlilce.js";
import { useNavigate } from "react-router";
const Hub = () => {
  const theme = useSelector((state) => state.theme.mode);
  const navigate = useNavigate();
  const [queues, setQueues] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await api.get("/me", { withCredentials: true });
        console.log("user: ", res.data);
        dispatch(setUser(res.data.user));
      } catch {
        dispatch(clearUser());
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/hub");
      setQueues(res.data);
    };
    load();
  }, []);

  return (
    <div
      className={`min-h-screen mx-0 m-auto pt-28 pb-20 transition-colors
      ${
        theme === "dark"
          ? "bg-[#0b0f14] text-[#e5e7eb]"
          : "bg-[#fcfcfd] text-[#0f172a]"
      }`}
    >
      {/* Header */}
      <div className="mx-0 m-auto mb-14">
        <h1 className="text-4xl text-center font-black tracking-tight mb-3">
          Available Queues
        </h1>
        <button className=" absolute left-36 rounded-2xl px-4 py-1 hover:bg-amber-50/10 " onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <p
          className={`text-sm text-center  ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
        >
          Select a queue to view live status and join instantly
        </p>
      </div>

      {/* Grid */}
      <div className=" lg:mx-30 sm:mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {queues.map((queue, idx) => (
          <QueueCard key={idx} queue={queue} />
        ))}
      </div>

      {/* Empty state (optional but clean) */}
      {queues.length === 0 && (
        <div
          className={`text-center mt-24 text-sm ${
            theme === "dark" ? "text-[#9ca3af]" : "text-slate-500"
          }`}
        >
          No active queues available right now
        </div>
      )}
    </div>
  );
};

export default Hub;
