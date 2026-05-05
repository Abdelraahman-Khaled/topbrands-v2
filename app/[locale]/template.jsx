"use client";

import { motion } from "framer-motion";
import { pageTransitionVariants } from "./lib/animations";

export default function Template({ children }) {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransitionVariants}
      className="w-full flex-grow flex flex-col relative"
    >
      {children}
    </motion.main>
  );
}
