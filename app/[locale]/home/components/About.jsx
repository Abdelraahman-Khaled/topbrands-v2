"use client";
import { useTranslation } from "react-i18next";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import LocalizedLink from "../../components/LocalizedLink";

export default function About({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const title = data["Text Element 1"]?.value;
  const badgeText = data["Text Element 2"]?.value;
  const description1 = data["Text Element 3"]?.value;
  const description2 = data["Text Element 4"]?.value;

  const feature1Title = data["Text Element 5"]?.value;
  const feature1Desc = data["Text Element 6"]?.value;
  const feature2Title = data["Text Element 7"]?.value;
  const feature2Desc = data["Text Element 8"]?.value;
  const feature3Title = data["Text Element 9"]?.value;
  const feature3Desc = data["Text Element 10"]?.value;
  const feature4Title = data["Text Element 11"]?.value;
  const feature4Desc = data["Text Element 12"]?.value;

  const buttonText = data["Text Element 13"]?.value;
  const imageUrl = data.image_url;

  return (
    <section
      id="about"
      className="py-16 sm:py-[96px] relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(222,227,235,0.21) 50%, #ffffff 100%)",
      }}
    >
      <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-[#F7E326] opacity-[0.25] rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-[300px] h-[300px] bg-[#F7E326] opacity-[0.10] rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-[64px] items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
                {title}
              </h2>

              {badgeText && (
                <div className="inline-block mt-6">
                  <span className="px-[20px] py-[8px] bg-[#F1DD25] text-sm text-black rounded-full font-bold tracking-wider">
                    {badgeText}
                  </span>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6 mt-6">
                <p className="text-base sm:text-[18px] text-[#4B4F54] leading-relaxed">
                  {description1}
                </p>
                <p className="text-base sm:text-[18px] text-[#4B4F54] leading-relaxed">
                  {description2}
                </p>
              </div>
            </ScrollReveal>

            {/* Feature Cards Grid */}
            <StaggerContainer className="grid md:grid-cols-2 gap-4 pt-4">
              {/* Card 1 */}
              <StaggerItem className="border-2 border-brand-charcoal flex items-center gap-3 p-[18px] bg-white rounded-xl duration-300 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-[#4B4F54] rounded-lg flex-shrink-0 shadow-md">
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.64 0L16.5312 1.82C16.7488 1.87333 16.928 1.99333 17.0688 2.18C17.2096 2.36667 17.28 2.57333 17.28 2.8V12.78C17.28 13.7933 17.0528 14.74 16.5984 15.62C16.144 16.5 15.5136 17.22 14.7072 17.78L8.64 22L2.5728 17.78C1.7664 17.22 1.136 16.5 0.6816 15.62C0.2272 14.74 0 13.7933 0 12.78V2.8C0 2.57333 0.0704 2.36667 0.2112 2.18C0.352 1.99333 0.5312 1.87333 0.7488 1.82L8.64 0ZM8.64 2.04L1.92 3.6V12.78C1.92 13.46 2.0704 14.0933 2.3712 14.68C2.672 15.2667 3.0912 15.7467 3.6288 16.12L8.64 19.6L13.6512 16.12C14.1888 15.7467 14.608 15.2667 14.9088 14.68C15.2096 14.0933 15.36 13.46 15.36 12.78V3.6L8.64 2.04ZM12.9216 7.22L14.2656 8.64L8.16 15L4.0896 10.76L5.4528 9.34L8.16 12.18L12.9216 7.22Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-base">{feature1Title}</h3>
                  <p className="text-sm text-[#4B4F54]">{feature1Desc}</p>
                </div>
              </StaggerItem>

              {/* Card 2 */}
              <StaggerItem className="border-2 border-brand-yellow flex items-center gap-3 p-[16px] bg-white rounded-xl duration-300 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#F7E326] to-[#E5D223] rounded-lg flex-shrink-0 shadow-md">
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.74736 19.145L13.5487 14.1233C14.4299 13.2189 15.026 12.1525 15.337 10.9241C15.6351 9.72265 15.6351 8.52123 15.337 7.31982C15.026 6.09141 14.4331 5.02161 13.5584 4.11043C12.6837 3.19925 11.6567 2.58167 10.4774 2.25769C9.32404 1.94721 8.17068 1.94721 7.01733 2.25769C5.83805 2.58167 4.81105 3.19925 3.93631 4.11043C3.06158 5.02161 2.4687 6.09141 2.15768 7.31982C1.85962 8.52123 1.85962 9.72265 2.15768 10.9241C2.4687 12.1525 3.06482 13.2189 3.94603 14.1233L8.74736 22L2.56589 15.561C1.43846 14.4001 0.68035 13.0232 0.291579 11.4303C-0.0971929 9.89138 -0.0971929 8.3525 0.291579 6.81361C0.68035 5.22072 1.43522 3.84045 2.55617 2.67279C3.67713 1.50512 5.0022 0.712053 6.53136 0.293585C8.0087 -0.0978868 9.48603 -0.0978868 10.9634 0.293585C12.4925 0.712053 13.8176 1.50512 14.9386 2.67279C16.0595 3.84045 16.8144 5.22072 17.2031 6.81361C17.5919 8.3525 17.5919 9.89138 17.2031 11.4303C16.8144 13.0232 16.0563 14.4001 14.9288 15.561L8.74736 22ZM8.74736 11.1468C9.09726 11.1468 9.42123 11.0557 9.71929 10.8734C10.0173 10.6912 10.2539 10.4448 10.4288 10.1344C10.6037 9.82389 10.6912 9.48641 10.6912 9.12194C10.6912 8.75747 10.6037 8.41999 10.4288 8.10951C10.2539 7.79904 10.0173 7.55268 9.71929 7.37044C9.42123 7.18821 9.09726 7.09709 8.74736 7.09709C8.39747 7.09709 8.07349 7.18821 7.77543 7.37044C7.47737 7.55268 7.24087 7.79904 7.06592 8.10951C6.89098 8.41999 6.8035 8.75747 6.8035 9.12194C6.8035 9.48641 6.89098 9.82389 7.06592 10.1344C7.24087 10.4448 7.47737 10.6912 7.77543 10.8734C8.07349 11.0557 8.39747 11.1468 8.74736 11.1468ZM8.74736 13.1716C8.04757 13.1716 7.39962 12.9894 6.8035 12.6249C6.20739 12.2605 5.73438 11.7677 5.38449 11.1468C5.03459 10.5258 4.85965 9.84751 4.85965 9.11182C4.85965 8.37612 5.03459 7.70117 5.38449 7.08696C5.73438 6.47276 6.20739 5.98342 6.8035 5.61894C7.39962 5.25447 8.04757 5.07224 8.74736 5.07224C9.44715 5.07224 10.0951 5.25447 10.6912 5.61894C11.2873 5.98342 11.7603 6.47276 12.1102 7.08696C12.4601 7.70117 12.6351 8.37612 12.6351 9.11182C12.6351 9.84751 12.4601 10.5258 12.1102 11.1468C11.7603 11.7677 11.2873 12.2605 10.6912 12.6249C10.0951 12.9894 9.44715 13.1716 8.74736 13.1716Z" fill="black" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-base">{feature2Title}</h3>
                  <p className="text-sm text-[#4B4F54]">{feature2Desc}</p>
                </div>
              </StaggerItem>

              {/* Card 3 */}
              <StaggerItem className="border-2 border-brand-yellow flex items-center gap-3 p-[16px] bg-white rounded-xl duration-300 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-[#F7E326] rounded-lg flex-shrink-0 shadow-md">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.24 9.64V19C18.24 19.28 18.1472 19.5167 17.9616 19.71C17.776 19.9033 17.5488 20 17.28 20H1.92C1.6512 20 1.424 19.9033 1.2384 19.71C1.0528 19.5167 0.96 19.28 0.96 19V9.64C0.6528 9.28 0.416 8.87333 0.2496 8.42C0.0832 7.96667 0 7.49333 0 7V1C0 0.720001 0.0928 0.483334 0.2784 0.290001C0.464 0.0966663 0.6912 0 0.96 0H18.24C18.5088 0 18.736 0.0966663 18.9216 0.290001C19.1072 0.483334 19.2 0.720001 19.2 1V7C19.2 7.49333 19.1168 7.96667 18.9504 8.42C18.784 8.87333 18.5472 9.28 18.24 9.64ZM16.32 10.88C16.0128 10.96 15.6928 11 15.36 11C14.7968 11 14.2656 10.88 13.7664 10.64C13.2672 10.4 12.8384 10.0667 12.48 9.64C12.1216 10.0667 11.6928 10.4 11.1936 10.64C10.6944 10.88 10.1632 11 9.6 11C9.0368 11 8.5056 10.88 8.0064 10.64C7.5072 10.4 7.0784 10.0667 6.72 9.64C6.3616 10.0667 5.9328 10.4 5.4336 10.64C4.9344 10.88 4.4032 11 3.84 11C3.5072 11 3.1872 10.96 2.88 10.88V18H16.32V10.88ZM11.52 7C11.52 6.72 11.6128 6.48333 11.7984 6.29C11.984 6.09667 12.2112 6 12.48 6C12.7488 6 12.976 6.09667 13.1616 6.29C13.3472 6.48333 13.44 6.72 13.44 7C13.44 7.36 13.5264 7.69333 13.6992 8C13.872 8.30667 14.1056 8.55 14.4 8.73C14.6944 8.91 15.0144 9 15.36 9C15.7056 9 16.0256 8.91 16.32 8.73C16.6144 8.55 16.848 8.30667 17.0208 8C17.1936 7.69333 17.28 7.36 17.28 7V2H1.92V7C1.92 7.36 2.0064 7.69333 2.1792 8C2.352 8.30667 2.5856 8.55 2.88 8.73C3.1744 8.91 3.4944 9 3.84 9C4.1856 9 4.5056 8.91 4.8 8.73C5.0944 8.55 5.328 8.30667 5.5008 8C5.6736 7.69333 5.76 7.36 5.76 7C5.76 6.72 5.8528 6.48333 6.0384 6.29C6.224 6.09667 6.4512 6 6.72 6C6.9888 6 7.216 6.09667 7.4016 6.29C7.5872 6.48333 7.68 6.72 7.68 7C7.68 7.36 7.7664 7.69333 7.9392 8C8.112 8.30667 8.3456 8.55 8.64 8.73C8.9344 8.91 9.2544 9 9.6 9C9.9456 9 10.2656 8.91 10.56 8.73C10.8544 8.55 11.088 8.30667 11.2608 8C11.4336 7.69333 11.52 7.36 11.52 7Z" fill="black" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-base">{feature3Title}</h3>
                  <p className="text-sm text-[#4B4F54]">{feature3Desc}</p>
                </div>
              </StaggerItem>

              {/* Card 4 */}
              <StaggerItem className="border-2 border-brand-charcoal flex items-center gap-3 p-[16px] bg-white rounded-xl duration-300 shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#4B4F54] to-[#3B3E42] rounded-lg flex-shrink-0 shadow-md">
                  <svg width="19" height="22" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.12 0L18.24 5.5V16.5L9.12 22L0 16.5V5.5L9.12 0ZM2.88 6.08L9.12 9.84L15.36 6.08L9.12 2.32L2.88 6.08ZM1.92 7.82V15.34L8.16 19.12V11.58L1.92 7.82ZM10.08 19.1L16.32 15.34V7.82L10.08 11.58V19.1Z" fill="white" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-black text-[18px]">{feature4Title}</h3>
                  <p className="text-sm text-[#4B4F54]">{feature4Desc}</p>
                </div>
              </StaggerItem>
            </StaggerContainer>

            <ScrollReveal delay={0.1} className="pt-8">
              {buttonText && (
                <LocalizedLink
                  href="/become-a-partner"
                  className="mask-btn mask-btn--gray-black"
                >
                  <span className="mask-btn__label">{buttonText}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" xmlns="http://www.w3.org/2000/svg" className="mx-1.5 rtl:rotate-180">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="white" />
                    </svg>
                  </span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {buttonText}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" xmlns="http://www.w3.org/2000/svg" className="mx-1.5 rtl:rotate-180">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="white" />
                    </svg>
                  </span>
                </LocalizedLink>
              )}
            </ScrollReveal>
          </div>

          {/* Right Area (Image) */}
          <ScrollReveal delay={0.2} className="relative group h-full">
            <div className="relative rounded-[16px] overflow-hidden shadow-2xl h-full border-[1px] border-white/20 aspect-[4/5] bg-[#E5E7EB]">
              <div className="absolute inset-0 flex items-center justify-center h-full">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={title || "About Image"}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
