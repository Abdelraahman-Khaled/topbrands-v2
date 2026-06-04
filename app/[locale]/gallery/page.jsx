import HeroSection from "../components/HeroSection";
import GalleryGrid from "./components/GalleryGrid";
import ServicesCTA from "../services/components/ServicesCTA";
import { getGalleries } from "@/services/gallery.service";
import { getPageData } from "@/services/home.service";

export default async function GalleryPage({ params }) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const [pageData, { data: galleries }] = await Promise.all([
    getPageData("gallery", locale),
    getGalleries({ items: 100 }, locale),
  ]);

  // The gallery page's CMS content all lives in the single "hero" section.
  const hero = Array.isArray(pageData) ? pageData.find((s) => s.hero)?.hero : null;

  // Hero banner — only TE1-3 + image (TE4+ feed the grid header / CTA below)
  const heroData = {
    "Text Element 1": { value: hero?.["Text Element 1"]?.value || (isAr ? "معرض الصور" : "Retail Execution Gallery") },
    "Text Element 2": { value: hero?.["Text Element 2"]?.value || (isAr ? "لحظات تروي قصة نجاحنا" : "Moments That Tell Our Story") },
    "Text Element 3": {
      value:
        hero?.["Text Element 3"]?.value ||
        (isAr
          ? "استعرض أبرز لحظاتنا وإنجازاتنا عبر الصور والفعاليات التي تعكس رحلتنا نحو التميز."
          : "Explore our highlights and milestones through images and events that reflect our journey toward excellence."),
    },
    image_url: hero?.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80",
  };

  // Grid section header
  const gridBadge = hero?.["Text Element 4"]?.value || (isAr ? "معرض الصور" : "Photo Gallery");
  const gridHeading = hero?.["Text Element 5"]?.value || (isAr ? "لحظاتنا المميزة" : "Our Moments");

  // CTA — title/subtitle from CMS, buttons fall back to shared translations
  const ctaData = {
    "CTA Element 1": { value: hero?.["Text Element 6"]?.value || (isAr ? "هل أنت مهتم بالشراكة معنا؟" : "Interested in Partnering With Us?") },
    "CTA Element 2": { value: hero?.["Text Element 7"]?.value || (isAr ? "انضم إلى شبكتنا الواسعة من العلامات التجارية والشركاء وابدأ رحلة النجاح معنا." : "Join our growing network of brands and partners and start your journey toward success.") },
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <HeroSection data={heroData} />
      <GalleryGrid locale={locale} galleries={galleries} badge={gridBadge} heading={gridHeading} />
      <ServicesCTA data={ctaData} />
    </div>
  );
}
