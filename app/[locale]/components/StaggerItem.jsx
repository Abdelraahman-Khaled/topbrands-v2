"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerItemVariants, reducedMotionVariants } from "../lib/animations";

/**
 * Child item for cascading grid reveals.
 * Must be wrapped in a StaggerContainer.
 */
export default function StaggerItem({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : staggerItemVariants;

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
