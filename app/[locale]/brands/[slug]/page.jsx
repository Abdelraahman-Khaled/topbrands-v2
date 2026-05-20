import BrandDetailHero from "./components/BrandDetailHero";
import BrandProducts from "./components/BrandProducts";
import ServicesCTA from "../../services/components/ServicesCTA";
import LocalizedLink from "../../components/LocalizedLink";
import { getBrandProducts } from "@/services/home.service";

export default async function BrandDetailPage({ params }) {
  const { slug, locale } = await params;
  const isAr = locale === "ar";

  const data = await getBrandProducts(slug, locale);
  const brandData = data?.brand;

  if (!brandData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0f0f0f" }}>
        <h1 className="text-4xl font-black text-white mb-6">
          {isAr ? "العلامة التجارية غير موجودة" : "Brand Not Found"}
        </h1>
        <LocalizedLink
          href="/brands"
          className="inline-flex items-center gap-3 group"
        >
          <span className="text-xs font-bold tracking-[3px] uppercase font-mono transition-colors duration-300 group-hover:text-brand-yellow" style={{ color: "rgba(255,255,255,0.4)" }}>
            {isAr ? "العودة إلى العلامات التجارية" : "Back to Brands"}
          </span>
        </LocalizedLink>
      </div>
    );
  }

  const brandProducts = data?.products || [];
  const brandTitle = brandData.title;

  const ctaData = {
    "CTA Element 1": { value: isAr ? `مهتم بمنتجات ${brandTitle}؟` : `Interested in ${brandTitle}?` },
    "CTA Element 2": { value: isAr ? `كن شريكاً لنا لجلب مجموعة ${brandTitle} المميزة لعملائك.` : `Partner with us to bring ${brandTitle}'s premium range to your customers.` },
    "CTA Element 3": { value: isAr ? "تواصل معنا" : "Contact Us" },
    "CTA Element 4": { value: isAr ? "كن شريكاً" : "Become a Partner" },
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      <BrandDetailHero brandData={brandData} />
      {brandProducts.length > 0 && (
        <BrandProducts products={brandProducts} brandTitle={brandTitle} />
      )}
      <ServicesCTA data={ctaData} />
    </div>
  );
}
