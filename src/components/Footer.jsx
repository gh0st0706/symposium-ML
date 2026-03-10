function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/85 py-10">
      <div className="section-wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-display text-lg font-semibold text-white">TechLynx | Cybersecurity & AI & ML Departments | CSI College of Engineering</p>
          <p className="mt-1 text-sm text-slate-400">Code. Create. Compete. Connect.</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-slate-300">
          <a href="#" className="hover:text-cyan-300">Instagram</a>
          <a href="#" className="hover:text-cyan-300">LinkedIn</a>
          <a href="#" className="hover:text-cyan-300">YouTube</a>
        </div>
      </div>
      <p className="section-wrap mt-8 text-xs text-slate-500"> {new Date().getFullYear()} TechLynx, Cybersecurity & AI & ML Departments, CSI College of Engineering.</p>
    </footer>
  );
}

export default Footer;
