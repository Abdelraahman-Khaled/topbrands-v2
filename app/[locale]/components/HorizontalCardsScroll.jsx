"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalCardsScroll
 *
 * Wraps children in a full-width, full-height sticky container.
 * As the user scrolls down through the pinned section, the inner
 * cards track translates to the right (plana.tech style).
 *
 * Props:
 *   children   — the card elements to animate horizontally
 *   heading    — optional JSX header rendered above the track
 *   bgClass    — Tailwind bg class for the outer section
 *   cardWidth  — px width of each card (default 420)
 *   gap        — px gap between cards (default 32)
 */
export default function HorizontalCardsScroll({
  children,
  heading,
  bgClass = "bg-white",
  cardWidth = 420,
  gap = 32,
  id,
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll(".h-card");
    if (!cards.length) return;

    // Total width to scroll: each card + gap, minus the visible viewport
    const totalCards = cards.length;
    const totalScrollWidth =
      totalCards * (cardWidth + gap) - gap - window.innerWidth + 80; // 80px end padding

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,       // "scrub: 1.2" gives a weighted, inertia-like drag
          start: "top top",
          // scroll distance = 200vh so the user scrolls 2 viewport heights
          end: () => `+=${totalScrollWidth + window.innerHeight * 0.5}`,
          invalidateOnRefresh: true,
        },
      });

      // Stagger each card fading in from right as it enters view
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: `top top`,
              // stagger the fade-in per card index
              scrub: false,
              toggleActions: "play none none reverse",
              // delay each card by the proportion of scroll through
              onEnter: () => {
                gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power3.out" });
              },
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [cardWidth, gap]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden ${bgClass}`}
      style={{ height: "100vh" }}
    >
      {/* Fixed header inside pinned section */}
      {heading && (
        <div className="absolute top-0 left-0 right-0 z-10 pt-12 pb-4 px-8 md:px-16 pointer-events-none">
          {heading}
        </div>
      )}

      {/* Horizontal track */}
      <div
        className="absolute inset-0 flex items-end pb-12"
        style={{ paddingTop: heading ? "200px" : "80px" }}
      >
        <div
          ref={trackRef}
          className="flex gap-8 will-change-transform"
          style={{ paddingLeft: "80px", paddingRight: "80px" }}
        >
          {children}
        </div>
      </div>

      {/* Scroll progress hint bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-60">
        <div className="w-24 h-[2px] bg-current rounded-full opacity-20"></div>
        <span className="text-xs font-semibold tracking-widest uppercase opacity-50">
          scroll
        </span>
        <div className="w-24 h-[2px] bg-current rounded-full opacity-20"></div>
      </div>
    </section>
  );
}
