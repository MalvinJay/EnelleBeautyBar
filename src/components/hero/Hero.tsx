"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/enelle/Sample1.png",
    alt: "Bridal glam look with elegant updo",
    label: "Bridal Glam",
    pos: "center 10%",
  },
  {
    src: "/enelle/nfRhZJqQIVKfWtWOAPVQoXpfSYKeBLfp.jpeg",
    alt: "Sleek editorial updo",
    label: "Sleek Updo",
    pos: "center 15%",
  },
  {
    src: "/enelle/naCJIUUmIimbRuJjpUoShnKIpmNMNlux.jpeg",
    alt: "Glamorous blonde finger wave",
    label: "Finger Waves",
    pos: "center 15%",
  },
  {
    src: "/enelle/nfEOAJkmxiiUtLKVKllUvdfxjDmKkglW.jpeg",
    alt: "Flawless black body waves",
    label: "Body Waves",
    pos: "center 30%",
  },
  {
    src: "/enelle/couple.png",
    alt: "Sleek bob hairstyle",
    label: "Signature Bob",
    pos: "20%",
  },
  {
    src: "/enelle/Goldie.png",
    alt: "Glam curly half-up style",
    label: "Event Glam",
    pos: "center 40%",
  },
];

const INTERVAL_MS = 5500;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const };

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((next + slides.length) % slides.length);
    },
    []
  );

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (!reduceMotion) {
      timer.current = setInterval(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % slides.length);
      }, INTERVAL_MS);
    }
  }, [reduceMotion]);

  useEffect(() => {
    resetTimer();
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [resetTimer]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { prev(); resetTimer(); }
      if (e.key === "ArrowRight") { next(); resetTimer(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: "0%", opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section
      id="top"
      aria-label="Hero carousel"
      aria-roledescription="carousel"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#e8b89f] px-3 pb-3 pt-3 sm:px-6 sm:pb-6 sm:pt-6 lg:px-12 lg:pb-12 lg:pt-12"
    >
      <motion.div
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ ...rise, duration: reduceMotion ? 0 : 1.1, delay: 0.14 }}
        className="relative mx-auto min-h-[calc(100svh-24px)] max-w-[1480px] overflow-hidden bg-[#a96d4f] sm:min-h-[calc(100svh-48px)] lg:min-h-[calc(100svh-96px)]"
      >
        {/* ── Carousel images ── */}
        <div
          aria-live="off"
          className="absolute inset-0"
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={reduceMotion ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.85, ease: [0.32, 0, 0.68, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].src}
                alt={slides[current].alt}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: slides[current].pos }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── gradient overlay ── */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(75,37,25,.38),transparent_60%),linear-gradient(0deg,rgba(66,31,23,.22),transparent_52%)]" />

        {/* ── centre copy ── */}
        <div className="relative flex min-h-[calc(100svh-24px)] items-center justify-center px-5 pt-16 text-center sm:min-h-[calc(100svh-48px)] lg:min-h-[calc(100svh-96px)]">
          <div className="max-w-4xl text-porcelain">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: 0.5 }}
              className="mb-5 text-[10px] font-semibold uppercase tracking-[.3em] text-porcelain/90"
            >
              Enelle Beauty Bar · North Legon
            </motion.p>
            <h1 className="font-display text-[clamp(4.3rem,5vw,7rem)] leading-[.85] tracking-[-.05em] pt-12">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...rise, delay: 0.58 }}
                className="block"
              >
                {/* Appointments */}
                {slides[current].alt}
              </motion.span>
            </h1>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...rise, delay: 0.8 }}
              className="mt-9 flex justify-center"
            >
              <a
                href={createWhatsAppUrl(bookingMessage)}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-porcelain px-6 text-[11px] font-semibold text-ink transition hover:bg-champagne"
              >
                Book your appointment{" "}
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── slide label (bottom-left) ── */}
        <div className="absolute bottom-10 left-6 hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-[.18em] text-porcelain/85 lg:flex">
          <span className="h-px w-10 bg-porcelain/70" />
          <AnimatePresence mode="wait">
            <motion.span
              key={slides[current].label}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              {slides[current].label}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* ── discover link (bottom-right) ── */}
        <a
          href="#services"
          className="absolute bottom-10 right-6 hidden min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-porcelain transition hover:text-champagne lg:inline-flex"
        >
          Discover services <ArrowDownRight size={15} aria-hidden />
        </a>

        {/* ── prev / next arrows ── */}
        <button
          onClick={() => { prev(); resetTimer(); }}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 grid min-h-11 min-w-11 place-items-center rounded-full bg-porcelain/15 text-porcelain backdrop-blur-sm transition hover:bg-porcelain/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne lg:left-8"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => { next(); resetTimer(); }}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 grid min-h-11 min-w-11 place-items-center rounded-full bg-porcelain/15 text-porcelain backdrop-blur-sm transition hover:bg-porcelain/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne lg:right-8"
        >
          <ChevronRight size={20} />
        </button>

        {/* ── dot indicators ── */}
        <div
          role="tablist"
          aria-label="Carousel slides"
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:bottom-10"
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}: ${slide.label}`}
              onClick={() => { go(i, i > current ? 1 : -1); resetTimer(); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current
                ? "w-8 bg-porcelain"
                : "w-3 bg-porcelain/45 hover:bg-porcelain/70"
                }`}
            />
          ))}
        </div>

        {/* ── progress bar ── */}
        {!reduceMotion && (
          <AnimatePresence>
            <motion.div
              key={`progress-${current}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className="absolute bottom-0 left-0 right-0 z-20 h-[2px] bg-porcelain/50"
            />
          </AnimatePresence>
        )}

        {/* ── bottom wave curve ── */}
        {/* <div className="hero-curve" aria-hidden /> */}
        <svg className="hero-curve" viewBox="0 0 1440 120" aria-hidden="true" focusable="false">
          <path d="M0,64 C240,120 480,8 720,40 C960,72 1200,120 1440,72 L1440,120 L0,120 Z"></path>
        </svg>
      </motion.div>
    </section>
  );
}
