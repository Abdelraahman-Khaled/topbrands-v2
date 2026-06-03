"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LocalizedLink from "../../components/LocalizedLink";

const CATEGORIES = [
  "all",
  "Market_Insights",
  "Consumer_Behavior",
  "Retail_Trends",
  "Distribution",
  "Product_Categories",
  "Logistics",
  "Partnerships",
  "Digital_Trends",
  "Quality_Safety",
];

const PER_PAGE = 9;

function formatDate(str) {
  if (!str) return "";
  try {
    return new Date(str).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return str; }
}

export default function BlogGrid({ blogs, locale, translations = {} }) {
  const isAr = locale === "ar";
  const [selected, setSelected] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    setPage(1);
    return selected === "all" ? blogs : blogs.filter((p) => p.category === selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, blogs]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function paginationPages() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr = [1];
    if (page > 3) arr.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) arr.push(i);
    if (page < totalPages - 2) arr.push("…");
    arr.push(totalPages);
    return arr;
  }

  return (
    <section style={{ background: "#f7f6f2" }}>

      {/* ── CATEGORIES ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`text-base font-black text-center   px-4 py-2 rounded-full  transition-all duration-200 ${selected === cat
                  ? "bg-brand-yellow text-black"
                  : "bg-black/6 text-black/40 hover:bg-black/10 hover:text-black/70"
                }`}
            >
              {cat === "all" ? (isAr ? "الكل" : "All") : (translations[cat] || cat.replace(/_/g, " "))}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-28">

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginated.map((post) => (
              <LocalizedLink
                key={post.id}
                href={`/blog/${post.id}`}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden  border-2 border-gray-200 transition-all duration-300"
              >
                {/* image */}
                <div className="relative overflow-hidden z-10 bg-gray-50 h-44 sm:h-48 md:h-52">
                  <img
                    src={post.photo}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 "
                  />
                </div>

                {/* content */}
                <div className="relative flex flex-col flex-1 p-6 gap-3 overflow-hidden">
                  {/* Yellow sweep on hover */}

                  <div className="relative z-10 flex flex-col flex-1 gap-3">
                    {/* category pill */}
                    {post.category && (
                      <span className="self-start text-[10px] font-black tracking-[2px] uppercase bg-brand-yellow/80 text-black group-hover:bg-black/10 group-hover:text-black px-3 py-1 rounded-full transition-colors duration-300">
                        {translations[post.category] || post.category.replace(/_/g, " ")}
                      </span>
                    )}

                    {/* title */}
                    <h3 className="font-black text-gray-900 group-hover:text-black leading-snug line-clamp-2 text-base transition-colors duration-300">
                      {post.title}
                    </h3>

                    {/* description */}
                    {post.description && (
                      <p className="text-base text-brand-charcoal group-hover:text-black/70 leading-relaxed line-clamp-3 flex-1 transition-colors duration-300">
                        {post.description}
                      </p>
                    )}

                    {/* footer */}
                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 group-hover:border-black/15 transition-colors duration-300">
                      {post.date && (
                        <span className="text-xs text-gray-400 group-hover:text-black/60 transition-colors duration-300">{formatDate(post.date)}</span>
                      )}
                      <span className="text-xs font-black tracking-[1px] uppercase text-brand-charcoal group-hover:text-black flex items-center gap-1.5 transition-colors duration-300 rtl:flex-row-reverse">
                        {isAr ? "اقرأ المزيد" : "Read More"}
                        <svg width="10" height="10" viewBox="0 0 11 11" fill="none" className="rtl:rotate-180">
                          <path d="M8.26615 4.79303L4.61493 1.00382L5.57863-4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
                        </svg>
                      </span>
                    </div>
                  </div>

                </div>
              </LocalizedLink>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16">
            <button
              onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center border border-black/12 hover:border-black transition-colors disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2L3.5 6L7.5 10" stroke="black" strokeWidth="1.5" /></svg>
            </button>

            {paginationPages().map((num, i) =>
              num === "…" ? (
                <span key={"e" + i} className="w-10 h-10 flex items-center justify-center text-black/25  text-sm">…</span>
              ) : (
                <button
                  key={num}
                  onClick={() => { setPage(num); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-black  transition-colors duration-200 ${page === num ? "bg-brand-yellow text-black" : "text-black/35 hover:text-black"
                    }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-black/12 hover:border-black transition-colors disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2L8.5 6L4.5 10" stroke="black" strokeWidth="1.5" /></svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
