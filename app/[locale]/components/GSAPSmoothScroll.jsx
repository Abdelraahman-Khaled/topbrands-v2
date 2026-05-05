"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

/**
 * GSAPSmoothScroll — wraps homepage content to produce the heavy,
 * inertia-based scroll feel seen on plana.tech.
 *
 * Renders a #smooth-wrapper > #smooth-content structure that
 * ScrollSmoother requires.
 */
export default function GSAPSmoothScroll({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.8,        // 1.8 seconds lag — heavy weighted feel
        effects: true,       // allow data-speed / data-lag attributes
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    });

    return () => {
      smootherRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef} style={{ overflow: "hidden", height: "100vh", position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
