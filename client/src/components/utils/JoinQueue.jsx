import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-router";

function JoinQueue() {
  const theme = useSelector((state) => state.theme.mode);
  motion;
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold transition-colors
          ${
            theme === "dark"
              ? "bg-[#1f2a44] text-[#e5e7eb] hover:bg-[#24304d]"
              : "bg-blue-600/10 text-blue-700 hover:bg-blue-600/20"
          }`}
    >
      Join queue <UserPlus size={18} />
    </motion.button>
  );
}

export default JoinQueue;
