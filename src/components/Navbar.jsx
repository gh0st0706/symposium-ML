import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const links = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Contact", href: "#contact" }
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
        scrolled ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="section-wrap flex items-center justify-between py-4">
        <Link to="/" className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300 md:text-base">
          CSI AI&ML
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <a key={item.label} href={item.href} className="group relative text-sm font-medium text-slate-200">
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
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
