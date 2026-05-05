"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Global wrapper for page transitions.
 * Uses crossfade (no mode="wait") so old page stays visible while new one fades in.
 * This prevents the "black screen" gap that mode="wait" causes with Next.js App Router.
 */
export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div style={{ width: "100%" }}>{children}</div>;
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
