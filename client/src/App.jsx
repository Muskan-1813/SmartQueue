import React, { useState } from "react";
import { Mycontext } from "./components/Mycontext.jsx";
import LandingPage from "./pages/LandingPage.jsx"
import { BrowserRouter, Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar.jsx";
import { Footer } from "./components/Footer.jsx";
import { Queue } from "./components/queue/Queue.jsx";
import Hub from "./components/hub/hub.jsx";
import Login from "./pages/Login.jsx";

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
  const [queue, setQueue] = useState([]);
  const values = { theme, setTheme, queue, setQueue };
  return (
    <>  
      <Mycontext.Provider value={values}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/hub" element={<Hub />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/queue/:queueId" element={<Queue />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Mycontext.Provider>
    </>
  );
}

export default App;
