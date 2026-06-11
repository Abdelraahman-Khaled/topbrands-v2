/**
 * Centralized Framer Motion animation variants derived from content/settings/animations.md
 */

// 1. Global Page Transitions
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.98 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 0, y: -20, filter: "blur(8px)", scale: 0.98 },
  transition: {
    duration: 0.7, // Snappier duration to prevent "long" black screens
    ease: [0.16, 1, 0.3, 1], // Custom Apple-like exponential out
  },
};

// 2. Hero Sections & Typography (Liquid Text Reveal)
export const headlineRevealVariants = {
  hidden: { y: "110%", opacity: 0, rotateX: 15 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// 3. Interactive Element States (Clean & Unified)
export const hoverCardVariants = {
  transition: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1],
  },
};

export const tapButtonVariants = {
  scale: 0.97,
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 30,
  },
};

// 4. List & Grid Reveal (Seamless Cascading Reveal)
export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }, // Increased
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// 5. Scroll Parallax & Reveal (The "Sticky" & "Fade" Effect)
export const scrollRevealVariants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: {
    duration: 1.5, // Dramatically increased scroll reveal duration
    ease: [0.22, 1, 0.36, 1],
  },
};

// Accessibility: Reduced Motion Variants
// When enabled, animations are bypassed (instant final state)
export const reducedMotionVariants = {
  initial: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  exit: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { staggerChildren: 0, delayChildren: 0 },
  },
  hidden: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  whileInView: { opacity: 1, y: 0 },
};
