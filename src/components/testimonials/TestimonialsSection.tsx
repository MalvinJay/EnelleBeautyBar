"use client";

import { Star, Quote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const testimonials = [
  {
    quote: "My frontal install for my wedding was completely undetectable! The melted lace stayed intact throughout the entire ceremony and reception. Enelle is unmatched in Accra.",
    author: "Abena Mansa",
    tag: "Bridal Client · East Legon",
    rating: 5,
    style: "Custom Frontal Install",
  },
  {
    quote: "I was skeptical about K-Tips on natural hair, but the blend is unreal. It moves so naturally and I get compliments everywhere I go in Legon!",
    author: "Khadija S.",
    tag: "Regular Client · North Legon",
    rating: 5,
    style: "K-Tip Extensions",
  },
  {
    quote: "The atmosphere at 25 Pawpaw Street is so relaxing and professional. No endless waiting hours! You sit in your chair on time and leave looking like a star.",
    author: "Efua Osei",
    tag: "Verified Client · Airport Residential",
    rating: 5,
    style: "Tape-In Installation",
  },
];

export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="reviews" className="bg-linen px-5 py-24 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <p className="eyebrow text-plum">Loved by our clients</p>
          <div>
            <h2 className="font-display text-[clamp(3.3rem,6vw,6.4rem)] leading-[.87] tracking-[-0.06em]">
              The Enelle <span className="italic text-plum">experience</span> in their words.
            </h2>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.author}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col justify-between rounded-2xl bg-porcelain p-8 shadow-[0_10px_30px_rgba(41,22,17,.06)] border border-ink/5"
            >
              <div>
                <div className="flex items-center gap-1 text-champagne mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" stroke="none" />
                  ))}
                </div>
                <Quote size={28} className="text-plum/20 mb-3" />
                <p className="text-base leading-7 text-ink/80 italic font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-ink/10 flex flex-col gap-1">
                <span className="font-display text-xl tracking-wide">{t.author}</span>
                <div className="flex items-center justify-between text-[11px] text-ink/60 font-medium">
                  <span>{t.tag}</span>
                  <span className="rounded-full bg-plum/10 px-3 py-1 text-[10px] font-bold text-plum uppercase tracking-wider">
                    {t.style}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
