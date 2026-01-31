import LandingPage from "./pages/LandingPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/utils/Navbar.jsx";
import Footer from "./components/utils/Footer.jsx";
import Queue from "./components/queue/Queue.jsx";
import CreateQueue from "./components/queue/CreateQueue.jsx";
import Hub from "./components/hub/hub.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/utils/ScrollToTop.jsx";
import api from "./api/api.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./redux/features/userSlilce.js";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";
import CreateOrg from "./components/org/CreateOrg.jsx";
import Dashboard from "./components/org/Dashboard.jsx";
import OrganisationQueues from "./components/org/OrganisationQueues.jsx";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const res = await api.get("/me", { withCredentials: true });
        console.log("user: ", res.data);
        dispatch(setUser(res.data.user));
      } catch (err) {
        console.log("user eror:", err);
        dispatch(clearUser());
      }
    };

    bootstrapAuth();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/hub"
              element={
                <ProtectedRoute>
                  <Hub />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/queue"
              element={
                <ProtectedRoute>
                  <CreateQueue />
                </ProtectedRoute>
              }
            />
            <Route
              path="/queue/:queueId"
              element={
                <ProtectedRoute>
                  <Queue />
                </ProtectedRoute>
              }
            />
            <Route path="org/me" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/org/create" element={<CreateOrg />} />
            <Route path="/org/me/Queues" element={<OrganisationQueues />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
