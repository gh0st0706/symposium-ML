import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import skyneticsLogo from "../assets/skynetics.jpeg";

const links = [
  { label: "About", hash: "#about" },
  { label: "Events", hash: "#events" },
  { label: "News", hash: "#news" },
  { label: "Contact", hash: "#contact" }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl shadow-[0_12px_30px_rgba(2,8,23,0.6)]"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between py-3 pl-1 pr-4 md:pl-2 md:pr-6 lg:pr-8">
        <Link to="/" className="group relative -ml-1 flex items-center">
          <span className="pointer-events-none absolute left-0 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_72%)] blur-xl md:h-16 md:w-16" />
          <img
            src={skyneticsLogo}
            alt="Skynetics logo"
            className="pointer-events-none absolute left-0 top-1/2 h-14 w-auto max-w-[120px] -translate-y-1/2 object-contain opacity-28 mix-blend-screen saturate-[0.68] brightness-[1.18] contrast-[1.16] transition duration-300 group-hover:opacity-42 md:h-[4.3rem] md:max-w-[142px]"
          />
          <div className="relative pl-[4.4rem] font-display text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300 md:pl-[5.2rem] md:text-base">
            <span>TechLynx</span>
            <span className="ml-2 normal-case text-[11px] tracking-[0.16em] text-cyan-200 md:text-xs">by skynetics</span>
          </div>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link
              key={item.label}
              to={{ pathname: "/", hash: item.hash }}
              className="group relative text-sm font-medium text-slate-200"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link to="/register" className="gradient-btn px-5 py-2 text-[11px]">
            Register
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}

export default Navbar;
