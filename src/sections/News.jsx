import { motion } from "framer-motion";
import { newsItems, newsUpdated } from "../data/news";

function News() {
  return (
    <section id="news" className="section-wrap py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
      >
        <h2 className="section-title">Latest ML Briefing</h2>
        <p className="section-subtitle">
          A curated snapshot of machine learning developments that shape the national competition landscape.
        </p>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">Updated {newsUpdated}</p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {newsItems.map((item) => (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/4 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-[10px] text-amber-200">
                {item.source}
              </span>
              <span className="text-[10px] text-slate-400">{item.date}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm text-slate-300">{item.summary}</p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-xs uppercase tracking-[0.2em] text-cyan-200 hover:text-amber-200"
            >
              Read update
            </a>
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </article>
        ))}
      </div>
    </section>
  );
}

export default News;
