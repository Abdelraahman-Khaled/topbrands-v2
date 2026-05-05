"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, reducedMotionVariants } from "../lib/animations";

/**
 * Parent container for orchestrating cascading child animations.
 */
export default function StaggerContainer({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedMotionVariants : staggerContainerVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
