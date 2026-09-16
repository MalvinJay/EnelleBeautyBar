"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryImages } from "@/data/gallery";

const INITIAL_COUNT = 12;

export function GallerySection() {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const visible = showAll ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);

  /* ── Lightbox navigation ── */
  const close = useCallback(() => setSelected(null), []);

  const goPrev = useCallback(
    () =>
      setSelected((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );

  const goNext = useCallback(
    () =>
      setSelected((i) =>
        i === null ? null : (i + 1) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, goPrev, goNext]);

  /* ── Lock body scroll when lightbox is open ── */
  useEffect(() => {
    if (selected !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section
      id="gallery"
      className="bg-porcelain px-5 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* ── Header ── */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-plum/70">Our Portfolio</p>
            <h2 className="mt-7 max-w-3xl font-display text-[clamp(3.3rem,6vw,6.4rem)] leading-[.87] tracking-[-.06em] text-ink">
              Every look,{" "}
              <span className="italic text-plum">a statement.</span>
            </h2>
          </div>
          <a
            href="https://www.instagram.com/enelle_beauty_bar/"
            target="_blank"
            rel="noreferrer"
            className="hidden border-b border-plum pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-plum transition hover:text-ink md:block"
          >
            Follow us on Instagram
          </a>
        </div>

        {/* ── Masonry grid ── */}
        <div className="gallery-grid mt-14">
          <AnimatePresence initial={false}>
            {visible.map((src, index) => (
              <motion.button
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(galleryImages.indexOf(src))}
                className="gallery-item group relative overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Enelle Beauty Bar portfolio ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <span className="absolute inset-0 bg-plum/0 transition duration-500 group-hover:bg-plum/20" />
                {/* Subtle bottom gradient for depth */}
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Show more / less toggle ── */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-plum/30 px-7 text-[10px] font-bold uppercase tracking-[.17em] text-plum transition hover:border-plum hover:bg-plum hover:text-porcelain"
          >
            {showAll
              ? "Show less"
              : `Show all ${galleryImages.length} photos`}
          </button>

          {/* Mobile Instagram link */}
          <a
            href="https://www.instagram.com/enelle_beauty_bar/"
            target="_blank"
            rel="noreferrer"
            className="border-b border-plum pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-plum md:hidden"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 grid place-items-center bg-ink/95 p-5"
          >
            {/* Close */}
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-porcelain/10 text-porcelain backdrop-blur-sm transition hover:bg-porcelain/25"
            >
              <X size={20} />
            </button>

            {/* Previous */}
            <button
              onClick={goPrev}
              aria-label="Previous image"
              className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-porcelain/10 text-porcelain backdrop-blur-sm transition hover:bg-porcelain/25 sm:left-8"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={galleryImages[selected]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] max-h-[80svh] w-full max-w-3xl"
              >
                <Image
                  src={galleryImages[selected]}
                  alt={`Enelle Beauty Bar portfolio ${selected + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <button
              onClick={goNext}
              aria-label="Next image"
              className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-porcelain/10 text-porcelain backdrop-blur-sm transition hover:bg-porcelain/25 sm:right-8"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[.25em] text-porcelain/60">
              {selected + 1} / {galleryImages.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
