"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function PageLoader() {
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 0 : 1150);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-label="Loading Enelle Beauty Bar"
          aria-live="polite"
          exit={{ y: "-105%" }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.76, 0, 0.24, 1] }}
          className="page-loader fixed inset-0 z-[100] grid place-items-center bg-ink text-porcelain"
        >
          <div className="flex flex-col items-center gap-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-display text-4xl tracking-[-.06em]"
            >
              Enelle <span className="text-champagne">Beauty Bar</span>
            </motion.p>
            <div className="h-px w-32 overflow-hidden bg-porcelain/25">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: reduceMotion ? 0 : 0.9, ease: "easeInOut" }}
                className="h-full w-full bg-champagne"
              />
            </div>
            <span className="eyebrow text-champagne">Preparing your appointment</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
