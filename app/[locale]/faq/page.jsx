import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import LocalizedLink from "../components/LocalizedLink";
import FAQAccordion from "./components/FAQAccordion";
import ServicesCTA from "../services/components/ServicesCTA";
import { getFaqs } from "@/services/home.service";

export default async function FAQPage({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const faqs = await getFaqs(locale);

  const ctaData = {
    "CTA Element 1": { value: isAr ? "لا زلت تملك تساؤلات؟" : "Still Have Questions?" },
    "CTA Element 2": { value: isAr ? "فريقنا مستعد دائماً لمساعدتك وتقديم كافة المعلومات المطلوبة." : "Our team is always ready to help and provide you with all the necessary information." },
    "CTA Element 3": { value: isAr ? "كن شريكاً لنا" : "Become a Partner" },
    "CTA Element 4": { value: isAr ? "تواصل معنا" : "Contact Us" }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection 
        subtitle={isAr ? "الأسئلة الشائعة" : "FAQ"}
        title={isAr ? "الأسئلة الشائعة" : "Frequently Asked"}
        yellowTitle={isAr ? "" : "Questions"}
        description1={isAr ? "كل ما تريد معرفته عن خدماتنا ومنتجاتنا وتوزيع العلامات التجارية الكبرى في سوريا." : "Everything you need to know about our services, products, and brand distribution in Syria."}
        img="/images/blogs%20banner.webp"
      />

      {/* FAQ Accordion Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
                {isAr ? "إجابات لاستفساراتكم" : "Answers to Your Inquiries"}
            </h2>
            <div className="h-1.5 w-24 bg-brand-yellow mx-auto rounded-full"></div>
          </div>
          
          <FAQAccordion faqs={faqs} locale={locale} />
        </div>
      </section>

      {/* Footer CTA */}
      <ServicesCTA data={ctaData} />
    </div>
  );
}