import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
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
  const [showGlowCursor, setShowGlowCursor] = useState(false);
  const cursorX = useMotionValue(-240);
  const cursorY = useMotionValue(-240);
  const smoothX = useSpring(cursorX, { stiffness: 520, damping: 42, mass: 0.25 });
  const smoothY = useSpring(cursorY, { stiffness: 520, damping: 42, mass: 0.25 });

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

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateAvailability = () => {
      const enabled = mediaQuery.matches;
      setShowGlowCursor(enabled);
      if (!enabled) {
        cursorX.set(-240);
        cursorY.set(-240);
      }
    };

    updateAvailability();

    const onPointerMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onPointerLeave = () => {
      cursorX.set(-240);
      cursorY.set(-240);
    };

    const addMediaListener = () => {
      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", updateAvailability);
      } else {
        mediaQuery.addListener(updateAvailability);
      }
    };

    const removeMediaListener = () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateAvailability);
      } else {
        mediaQuery.removeListener(updateAvailability);
      }
    };

    addMediaListener();
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      removeMediaListener();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {showGlowCursor ? (
        <>
          <motion.div className="glow-cursor glow-cursor--halo" style={{ left: smoothX, top: smoothY }} />
          <motion.div className="glow-cursor glow-cursor--core" style={{ left: smoothX, top: smoothY }} />
        </>
      ) : null}
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
