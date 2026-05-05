"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

export default function Counter({ value, direction = "up", duration = 3.5, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.toString().replace(/[0-9.]/g, "");
  const prefix = value.toString().split(/[0-9]/)[0] || "";

  const motionValue = useMotionValue(direction === "down" ? numericValue : 0);

  useEffect(() => {
    if (isInView) {
      // Significantly slower dynamic duration
      // Max duration capped at 6s for extremely large numbers
      const dynamicDuration = Math.min(6, Math.max(duration, (Math.log10(numericValue + 1) * 1.5)));
      
      const controls = animate(motionValue, numericValue, {
        duration: dynamicDuration,
        ease: [0.1, 0.4, 0.2, 1], // Extra smooth ease-out curve
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = prefix + Intl.NumberFormat("en-US").format(latest.toFixed(0)) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue, motionValue, prefix, suffix, duration]);

  return <span ref={ref} className={className}>{value}</span>;
}
