"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { staggerContainerVariants, staggerItemVariants } from "../../lib/animations";
import { getGallery } from "@/services/gallery.service";

// API category slug → localized display label
const CATEGORY_LABELS = {
  operation: { en: "Operations", ar: "عمليات" },
  event: { en: "Events", ar: "فعاليات" },
  team: { en: "Team", ar: "الفريق" },
  product: { en: "Products", ar: "منتجات" },
};

const labelFor = (slug, isAr) =>
  CATEGORY_LABELS[slug]?.[isAr ? "ar" : "en"] ??
  (slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : "");

export default function GalleryGrid({ locale, galleries = [], badge, heading }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // Unique category slugs actually present in the data, in first-seen order
  const presentCategories = useMemo(() => {
    const seen = [];
    for (const g of galleries) {
      if (g.category && !seen.includes(g.category)) seen.push(g.category);
    }
    return seen;
  }, [galleries]);

  const filtered =
    activeCategory === "all"
      ? galleries
      : galleries.filter((g) => g.category === activeCategory);

  // The API localizes via the `locale` header → returns single `title`/`alt`.
  // Fall back to the *_ar/*_en pair in case a raw (header-less) payload is used.
  const titleOf = (g) =>
    g.title || (isAr ? g.title_ar : g.title_en) || g.title_en || g.title_ar || "";
  const altOf = (p) =>
    p?.alt || (isAr ? p?.alt_ar : p?.alt_en) || "";

  const openAlbum = async (gallery) => {
    if (loadingId) return;

    let photos = [];
    if (gallery.photos_count > 1) {
      // Album with multiple photos — fetch the full set
      setLoadingId(gallery.id);
      const full = await getGallery(gallery.id, locale);
      setLoadingId(null);
      photos = full?.photos?.length
        ? full.photos
        : gallery.main_photo
          ? [gallery.main_photo]
          : [];
    } else if (gallery.main_photo) {
      photos = [gallery.main_photo];
    }

    if (!photos.length) return;

    setSlides(
      photos.map((p) => ({
        src: p.url,
        title: titleOf(gallery),
        description: altOf(p),
      })),
    );
    setLightboxIndex(0);
    setOpen(true);
  };

  return (
    <>
      <section className="py-24 bg-[#f7f6f2]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-brand-yellow" />
                {badge || (isAr ? "معرض الصور" : "Photo Gallery")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-jet leading-tight">
                {heading || (isAr ? "لحظاتنا المميزة" : "Our Moments")}
              </h2>
            </div>
            <p className="text-brand-charcoal text-sm font-medium">
              {isAr
                ? `عرض ${filtered.length} ألبوم`
                : `${filtered.length} album${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Category filter — dynamic from data */}
          {presentCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === "all"
                    ? "bg-brand-jet text-white shadow-lg"
                    : "bg-white text-brand-charcoal hover:bg-brand-yellow hover:text-brand-jet"
                }`}
              >
                {isAr ? "الكل" : "All"}
              </button>
              {presentCategories.map((slug) => (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === slug
                      ? "bg-brand-jet text-white shadow-lg"
                      : "bg-white text-brand-charcoal hover:bg-brand-yellow hover:text-brand-jet"
                  }`}
                >
                  {labelFor(slug, isAr)}
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-brand-charcoal text-lg font-medium">
                {isAr ? "لا توجد صور لعرضها حالياً." : "No photos to display yet."}
              </p>
            </div>
          ) : (
            /* Uniform grid */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((gallery) => (
                  <motion.div
                    key={gallery.id}
                    variants={staggerItemVariants}
                    onClick={() => openAlbum(gallery)}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm aspect-[4/3]"
                  >
                    <img
                      src={gallery.main_photo?.url}
                      alt={titleOf(gallery)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] "
                    />

                    {/* Permanent bottom gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                    {/* Category chip */}
                    {gallery.category && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
                        {labelFor(gallery.category, isAr)}
                      </span>
                    )}

                    {/* Photos count badge */}
                    {gallery.photos_count > 1 && (
                      <span className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-semibold opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        {gallery.photos_count}
                      </span>
                    )}

                    {/* Expand button / loading spinner */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                      {loadingId === gallery.id ? (
                        <span className="w-4 h-4 rounded-full border-2 border-brand-jet/30 border-t-brand-jet animate-spin" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-jet">
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      )}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-base leading-snug drop-shadow">
                        {titleOf(gallery)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="w-4 h-px bg-brand-yellow" />
                        <span className="text-brand-yellow text-xs font-semibold tracking-wide uppercase">
                          {isAr ? "عرض الألبوم" : "View album"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index: i }) => setLightboxIndex(i) }}
        plugins={[Counter, Captions, Thumbnails]}
        counter={{ container: { style: { top: "unset", bottom: 16, left: 16, right: "unset", color: "#f7e326", fontWeight: 700, fontSize: 13 } } }}
        captions={{ showToggle: false, descriptionTextAlign: "center" }}
        thumbnails={{
          position: "bottom",
          width: 88,
          height: 60,
          border: 2,
          borderRadius: 10,
          padding: 3,
          gap: 8,
          vignette: true,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.97)", direction: "ltr" },
          slide: { padding: "0 60px" },
          thumbnailsContainer: {
            backgroundColor: "rgba(15,15,15,0.9)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "12px 0",
          },
          thumbnail: {
            borderColor: "transparent",
            borderRadius: 10,
            opacity: 0.5,
          },
          thumbnailsTrack: { padding: "0 16px" },
          button: {
            filter: "none",
            color: "#ffffff",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "50%",
            width: 44,
            height: 44,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          captionsTitle: {
            fontSize: 18,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
          },
          captionsDescription: {
            fontSize: 13,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            marginTop: 4,
          },
          captionsTitleContainer: {
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
            padding: "24px 40px 16px",
          },
        }}
      />
    </>
  );
}
