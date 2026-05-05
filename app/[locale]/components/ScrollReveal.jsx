"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollRevealVariants } from "../lib/animations";

/**
 * Reusable component for scroll-triggered "reveal" animations.
 */
export default function ScrollReveal({ children, className = "", delay = 0 }) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is enabled, show immediately with no transform
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      whileInView="whileInView"
      viewport={scrollRevealVariants.viewport}
      variants={scrollRevealVariants}
      transition={{
        ...scrollRevealVariants.transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
