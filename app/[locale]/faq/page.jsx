import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import LocalizedLink from "../components/LocalizedLink";
import FAQAccordion from "./components/FAQAccordion";
import { getFaqs } from "@/services/home.service";

export default async function FAQPage({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const faqs = await getFaqs(locale);

  return (
    <div className="min-h-screen bg-white">
      {/* Article Hero */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/images/blogs%20banner.webp')" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-brand-paleblue/60 via-white/70 to-white/90 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-brand-charcoal font-medium max-w-2xl mx-auto leading-relaxed">
            {isAr ? "كل ما تريد معرفته عن خدماتنا ومنتجاتنا وتوزيع العلامات التجارية الكبرى في سوريا." : "Everything you need to know about our services, products, and brand distribution in Syria."}
          </p>
        </div>
      </section>

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
      <ScrollReveal>
        <section className="py-16 md:py-24 bg-[#DEE3EB]/50 rounded-[40px] mb-20 mx-6">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isAr ? "لا زلت تملك تساؤلات؟" : "Still have more questions?"}
            </h2>
            <p className="text-base md:text-xl text-brand-charcoal mb-10 font-medium">
              {isAr ? "فريقنا مستعد دائماً لمساعدتك وتقديم كافة المعلومات المطلوبة." : "Our team is always ready to help and provide you with all the necessary information."}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <LocalizedLink
                href="/contact"
                className="mask-btn mask-btn--yellow-black !rounded-xl shadow-lg"
              >
                <span className="mask-btn__label">
                    {isAr ? "تواصل معنا" : "Contact Us"}
                </span>
                <span className="mask-btn__fill">
                    {isAr ? "تواصل معنا" : "Contact Us"}
                </span>
              </LocalizedLink>
              <LocalizedLink
                href="/become-a-partner"
                className="mask-btn mask-btn--none-black !rounded-xl shadow-lg"
              >
                <span className="mask-btn__label">
                    {isAr ? "كن شريكاً لنا" : "Become a Partner"}
                </span>
                <span className="mask-btn__fill">
                    {isAr ? "كن شريكاً لنا" : "Become a Partner"}
                </span>
              </LocalizedLink>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}