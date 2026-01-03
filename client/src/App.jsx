import React, { useState } from "react";
import { Mycontext } from "./components/Mycontext.jsx";
import Service from "./components/Service.jsx";
import LandingPage from "./components/LandingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Queue } from "./components/queue/Queue.jsx";
import Hub from "./components/hub/hub.jsx";

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartqueue-theme");
      return (
        saved ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      );
    }
    return "light";
  });
  const values = {theme, setTheme};
  return (
    <>
      <Mycontext.Provider value={values}>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/hub" element={<Hub />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/service" element={<Service />} />
            <Route path="/queue/:queueId" element={<Queue />}/>
          </Routes>
          
          <Footer />
        </BrowserRouter>
      </Mycontext.Provider>
    </>
  );
}

export default App;
