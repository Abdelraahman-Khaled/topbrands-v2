"use client";

import { useState } from "react";
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

const categories = {
  en: ["All", "Events", "Operations", "Team", "Products"],
  ar: ["الكل", "فعاليات", "عمليات", "الفريق", "منتجات"],
};

const categoryKeyMap = { All: "All", Events: "Events", Operations: "Operations", Team: "Team", Products: "Products" };
const categoryArMap  = { All: "الكل", Events: "فعاليات", Operations: "عمليات", Team: "الفريق", Products: "منتجات" };

const galleries = [
  { id: 1, title_en: "Brand Launch Event",   title_ar: "حفل إطلاق العلامة التجارية",  description_en: "Annual brand launch ceremony with key partners",  description_ar: "حفل إطلاق سنوي للعلامات التجارية مع الشركاء الرئيسيين",  category: "Events",     src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90" },
  { id: 2, title_en: "Distribution Center",  title_ar: "مركز التوزيع",                description_en: "State-of-the-art warehousing and logistics hub",  description_ar: "مستودعات وخدمات لوجستية على أحدث مستوى",                category: "Operations", src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=90" },
  { id: 3, title_en: "Team Meeting",         title_ar: "اجتماع الفريق",              description_en: "Weekly strategy sessions with our expert team",    description_ar: "جلسات استراتيجية أسبوعية مع فريق الخبراء",              category: "Team",       src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=90" },
  { id: 4, title_en: "Product Showcase",     title_ar: "عرض المنتجات",               description_en: "Highlighting our extensive FMCG product range",    description_ar: "إبراز مجموعتنا الواسعة من منتجات السلع الاستهلاكية",    category: "Products",   src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=90" },
  { id: 5, title_en: "Logistics Operations", title_ar: "العمليات اللوجستية",         description_en: "Efficient last-mile delivery across all regions",   description_ar: "توصيل فعّال للمرحلة الأخيرة في جميع المناطق",           category: "Operations", src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=90" },
  { id: 6, title_en: "Market Coverage",      title_ar: "تغطية السوق",                description_en: "Nationwide reach spanning 14 governorates",         description_ar: "تغطية وطنية تمتد عبر 14 محافظة",                        category: "Events",     src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=90" },
  { id: 7, title_en: "Partner Conference",   title_ar: "مؤتمر الشركاء",             description_en: "Connecting with global brand partners",              description_ar: "التواصل مع شركاء العلامات التجارية العالميين",           category: "Events",     src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=90" },
  { id: 8, title_en: "Warehouse Facility",   title_ar: "منشأة المستودعات",           description_en: "Modern storage solutions for all product lines",    description_ar: "حلول تخزين حديثة لجميع خطوط الإنتاج",                  category: "Operations", src: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=1200&q=90" },
  { id: 9, title_en: "Sales Excellence",     title_ar: "التميز في المبيعات",         description_en: "Celebrating top-performing sales milestones",        description_ar: "الاحتفاء بأبرز إنجازات المبيعات",                       category: "Team",       src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=90" },
];

export default function GalleryGrid({ locale }) {
  const isAr = locale === "ar";
  const [activeCategory, setActiveCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const currentCategories = isAr ? categories.ar : categories.en;
  const categoryKeys = categories.en;

  const filtered = activeCategory === "All"
    ? galleries
    : galleries.filter((g) => g.category === activeCategory);

  const openAt = (i) => { setLightboxIndex(i); setOpen(true); };

  return (
    <>
      <section className="py-24 bg-[#f7f6f2]">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-charcoal uppercase mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-brand-yellow" />
                {isAr ? "معرض الصور" : "Photo Gallery"}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-jet leading-tight">
                {isAr ? "لحظاتنا المميزة" : "Our Moments"}
              </h2>
            </div>
            <p className="text-brand-charcoal text-sm font-medium">
              {isAr
                ? `عرض ${filtered.length} صورة`
                : `${filtered.length} ${activeCategory === "All" ? "" : activeCategory} photo${filtered.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categoryKeys.map((key, i) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeCategory === key
                    ? "bg-brand-jet text-white shadow-lg"
                    : "bg-white text-brand-charcoal hover:bg-brand-yellow hover:text-brand-jet"
                }`}
              >
                {currentCategories[i]}
              </button>
            ))}
          </div>

          {/* Uniform grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={staggerItemVariants}
                  onClick={() => openAt(i)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm aspect-[4/3]"
                >
                  <img
                    src={item.src.replace("w=1200", "w=800")}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] "
                  />

                  {/* Permanent bottom gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Category chip */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-semibold">
                    {isAr ? categoryArMap[item.category] : item.category}
                  </span>

                  {/* Expand button */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-jet">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-base leading-snug drop-shadow">
                      {isAr ? item.title_ar : item.title_en}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="w-4 h-px bg-brand-yellow" />
                      <span className="text-brand-yellow text-xs font-semibold tracking-wide uppercase">
                        {isAr ? "عرض" : "View photo"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={filtered.map((g) => ({ src: g.src, title: isAr ? g.title_ar : g.title_en, description: isAr ? g.description_ar : g.description_en }))}
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
