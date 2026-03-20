import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import IntroLoader from "./components/IntroLoader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";

function App() {
  const location = useLocation();
  const [introPhase, setIntroPhase] = useState("enter");

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) return;

    const header = document.querySelector("header");
    const headerOffset = header ? header.getBoundingClientRect().height + 12 : 96;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIntroPhase("exit");
    }, 2000);

    return () => window.clearTimeout(exitTimer);
  }, []);

  useEffect(() => {
    if (introPhase !== "exit") return undefined;

    const doneTimer = window.setTimeout(() => {
      setIntroPhase("done");
    }, 650);

    return () => window.clearTimeout(doneTimer);
  }, [introPhase]);

  useEffect(() => {
    document.body.style.overflow = introPhase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introPhase]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const hideGlow = () => {
      root.style.setProperty("--cursor-x", "-999px");
      root.style.setProperty("--cursor-y", "-999px");
    };

    const onPointerMove = (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    const updateListeners = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", hideGlow);
      window.removeEventListener("blur", hideGlow);

      hideGlow();

      if (mediaQuery.matches) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerleave", hideGlow);
        window.addEventListener("blur", hideGlow);
      }
    };

    const addMediaListener = () => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", updateListeners);
      } else {
        mediaQuery.addListener(updateListeners);
      }
    };

    const removeMediaListener = () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateListeners);
      } else {
        mediaQuery.removeListener(updateListeners);
      }
    };

    updateListeners();
    addMediaListener();

    return () => {
      removeMediaListener();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", hideGlow);
      window.removeEventListener("blur", hideGlow);
      hideGlow();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="cursor-glow" aria-hidden="true" />
      {introPhase !== "done" ? <IntroLoader phase={introPhase} /> : null}
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events/:slug" element={<EventDetail />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
