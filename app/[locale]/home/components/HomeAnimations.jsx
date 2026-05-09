"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UP = { opacity: 0, y: 60, duration: 0.9, ease: "power3.out" };
const SCALE = { opacity: 0, scale: 0.85, duration: 0.9, ease: "back.out(1.6)" };

/* Animate cards one-by-one from alternating directions */
function animateCardsFromDirections(cards, trigger, dirs, staggerDelay = 0.13) {
  cards.forEach((card, i) => {
    const dir = dirs[i % dirs.length];
    gsap.from(card, {
      opacity: 0,
      ...dir,
      duration: 0.85,
      ease: "power3.out",
      delay: i * staggerDelay,
      scrollTrigger: {
        trigger,
        start: "top 85%",
        once: true,
      },
    });
  });
}

export default function HomeAnimations() {
  useEffect(() => {
    const id = setTimeout(() => {
      const ctx = gsap.context(() => {

        /* ══════════════════════════════════
           § ABOUT
           Framer Motion handles all About animations — no GSAP here to avoid
           conflict (gsap.from captures opacity:0 from FM initial state as the
           "to" value, leaving elements permanently invisible).
        ══════════════════════════════════ */

        /* ══════════════════════════════════
           § SERVICES CTA
           Cards are Framer Motion scroll-driven — GSAP only animates the CTA
           banner that follows the sticky section.
        ══════════════════════════════════ */
        if (document.querySelector("#services-cta")) {
          gsap.from("#services-cta > div > div", {
            ...SCALE,
            scrollTrigger: { trigger: "#services-cta", start: "top 85%", once: true },
          });
        }

        /* ══════════════════════════════════
           § BRANDS
        ══════════════════════════════════ */
        const brands = document.querySelector("#brands");
        if (brands) {
          gsap.from("#brands h2", {
            ...UP,
            scrollTrigger: { trigger: "#brands h2", start: "top 85%", once: true },
          });

          // Brand logos cascade from random directions
          const logoEls = gsap.utils.toArray("#brands .flex-wrap > a, #brands .flex-wrap > div");
          logoEls.forEach((logo, i) => {
            const dirs = [{ x: -60 }, { x: 60 }, { y: -60 }, { y: 60 }];
            const dir = dirs[i % 4];
            gsap.from(logo, {
              opacity: 0, scale: 0.6, ...dir, duration: 0.65, ease: "back.out(1.4)",
              delay: i * 0.05,
              scrollTrigger: { trigger: "#brands .flex-wrap", start: "top 85%", once: true },
            });
          });

          gsap.from("#brands .pt-4 a, #brands .pt-8 a", {
            opacity: 0, y: 30, duration: 0.7, delay: 0.2,
            scrollTrigger: { trigger: "#brands .pt-4, #brands .pt-8", start: "top 88%", once: true },
          });
        }

        /* ══════════════════════════════════
           § WHY CHOOSE US
        ══════════════════════════════════ */
        const whyChoose = document.querySelector("#why-choose-us");
        if (whyChoose) {
          gsap.from("#why-choose-us h2, #why-choose-us .text-center p", {
            ...UP, stagger: 0.1,
            scrollTrigger: { trigger: "#why-choose-us", start: "top 80%", once: true },
          });

          // Cards: left / bottom / right / top
          const chooseCards = gsap.utils.toArray("#why-choose-us .grid > div");
          animateCardsFromDirections(
            chooseCards,
            "#why-choose-us .grid",
            [{ x: -90, y: 0 }, { x: 0, y: 80 }, { x: 90, y: 0 }, { x: 0, y: -70 }]
          );
        }

        /* ══════════════════════════════════
           § WHY PARTNER (dark section)
        ══════════════════════════════════ */
        const whyPartner = document.querySelector("section.bg-black");
        if (whyPartner) {
          // Badge + heading
          gsap.from(whyPartner.querySelectorAll(".text-center.mb-16 *"), {
            ...UP, stagger: 0.08,
            scrollTrigger: { trigger: whyPartner, start: "top 78%", once: true },
          });

          // Feature cards: left / right / bottom alternating
          const partnerCards = gsap.utils.toArray(whyPartner.querySelectorAll(".grid > div"));
          animateCardsFromDirections(
            partnerCards,
            whyPartner.querySelector(".grid"),
            [{ x: -90, y: 0 }, { x: 90, y: 0 }, { x: 0, y: 90 }],
            0.11
          );

          // CTA block
          const ctaBlock = whyPartner.querySelector("section.py-8, section.py-20");
          if (ctaBlock) {
            gsap.from(ctaBlock, {
              ...SCALE, delay: 0.1,
              scrollTrigger: { trigger: ctaBlock, start: "top 85%", once: true },
            });
          }

          // Parallax blobs
          whyPartner.querySelectorAll(".absolute.rounded-full.blur-3xl").forEach((blob, i) => {
            gsap.to(blob, {
              y: i % 2 === 0 ? -50 : 50, ease: "none",
              scrollTrigger: {
                trigger: whyPartner,
                start: "top bottom", end: "bottom top",
                scrub: 2 + i,
              },
            });
          });
        }

        /* ══════════════════════════════════
           § CONTACT
        ══════════════════════════════════ */
        const contact = document.querySelector("#contact");
        if (contact) {
          gsap.from("#contact .text-center.mb-16 *", {
            ...UP, stagger: 0.1,
            scrollTrigger: { trigger: "#contact .text-center", start: "top 82%", once: true },
          });

          // Info cards: left / bottom / right
          const contactCards = gsap.utils.toArray("#contact .grid > div, #contact .grid > a");
          animateCardsFromDirections(
            contactCards,
            "#contact .grid",
            [{ x: -90, y: 0 }, { x: 0, y: 70 }, { x: 90, y: 0 }],
            0.15
          );

          gsap.from("#contact form", {
            opacity: 0, y: 50, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: "#contact form", start: "top 88%", once: true },
          });
        }

      });

      return () => ctx.revert();
    }, 200);

    return () => clearTimeout(id);
  }, []);

  return null;
}
