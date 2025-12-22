import React, { useContext, useEffect, useState } from "react";
import { Mycontext } from "./Mycontext";
import { Users, Sun, Moon, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar = () => {
  motion;
  const { theme, setTheme } = useContext(Mycontext);
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("smartqueue-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b backdrop-blur-xl
        ${
          theme === "dark"
            ? "bg-[#0b0f14]/80 border-[#1f2937]"
            : "bg-white/90 border-slate-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#2563eb] dark:bg-[#3b82f6] p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <Users className="text-white w-5 h-5" />
          </div>
          <span
            className={`text-xl font-bold tracking-tight  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            SmartQueue
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          <a
            href="#features"
            className={`hover:text-[#2563eb] dark:hover:text-[#3b82f6] transition-colors ${
              theme === "dark" ? "text-white" : "text-black"
            } `}
          >
            Why SmartQueue
          </a>
          <a
            href="#how-it-works"
            className={`hover:text-[#2563eb] dark:hover:text-[#3b82f6] transition-colors ${
              theme === "dark" ? "text-white" : "text-black"
            } `}
          >
            How it works
          </a>
          <div className= {` ${theme ==='dark'?'bg-[#1f2937]':'bg-slate-200'} w-px h-6 `}></div>
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl transition-all ${
              theme === "dark"
                ? "hover:bg-[#111827] text-[#38bdf8]"
                : "hover:bg-slate-100 text-[#334155]"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="bg-[#2563eb] dark:bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 font-semibold shadow-md hover:shadow-blue-500/20">
            Get Started
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2">
            {theme === "dark" ? <Sun size={20} className={`${theme==='dark'?'text-white':'text-black'}`} /> : <Moon size={20} className={`${theme==='dark'?'text-white':'text-black'}`} />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} className={`${theme==='dark'?'text-white':'text-black'}`} /> : <Menu size={24} className={`${theme==='dark'?'text-white':'text-black'}`} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden border-t overflow-hidden ${
              theme === "dark"
                ? "bg-[#111827] border-[#1f2937]"
                : "bg-[#f8fafc] border-slate-200"
            }`}
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              <a
                href="#features"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium"
              >
                Why SmartQueue?
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium"
              >
                How it Works
              </a>
              <button className="bg-[#2563eb] text-white w-full py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/10">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
