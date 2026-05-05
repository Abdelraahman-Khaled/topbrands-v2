"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hoverCardVariants, tapButtonVariants } from "../lib/animations";

/**
 * Wrapper for cards to provide premium spring hover and tap feedback.
 */
export default function AnimatedCard({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();

  // Skip animations if reduced motion is enabled
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={hoverCardVariants}
      whileTap={tapButtonVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
