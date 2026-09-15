"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const rise = { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as const };

  return <section id="top" className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-porcelain">
    <div className="absolute inset-0 grid grid-cols-12 opacity-20" aria-hidden>{Array.from({ length: 12 }).map((_, index) => <div key={index} className="border-r border-porcelain/20" />)}</div>
    <div className="absolute -right-16 top-8 h-[29rem] w-[29rem] rounded-full bg-champagne/20 blur-3xl" aria-hidden />
    <div className="relative mx-auto grid min-h-[100svh] max-w-[1600px] grid-rows-[1fr_auto] px-5 pb-7 pt-28 sm:px-10 lg:grid-cols-[1.04fr_.96fr] lg:grid-rows-1 lg:px-16 lg:pb-12 lg:pt-32">
      <div className="relative z-10 flex max-w-3xl flex-col justify-end pb-12 lg:pb-8"><motion.p initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={rise} className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne"><span className="h-px w-9 bg-champagne" /> Hair artistry · 2026</motion.p>
        <h1 className="font-display text-[clamp(4.2rem,9.5vw,10rem)] leading-[.78] tracking-[-.07em] text-balance"><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...rise, delay: 0.08 }} className="block overflow-hidden pb-[.13em]">The hair</motion.span><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...rise, delay: 0.18 }} className="block overflow-hidden pb-[.13em] italic text-champagne">you&apos;ve been</motion.span><motion.span initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ ...rise, delay: 0.28 }} className="block overflow-hidden pb-[.13em]">dreaming of.</motion.span></h1>
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...rise, delay: 0.42 }} className="mt-10 flex flex-wrap items-center gap-5"><a href={createWhatsAppUrl(bookingMessage)} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-6 bg-champagne px-5 text-[10px] font-bold uppercase tracking-[.18em] text-ink transition hover:bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne">Reserve your chair <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><a href="#services" className="inline-flex min-h-12 items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-porcelain/80 transition hover:text-champagne">Explore services <ArrowDownRight size={15} aria-hidden /></a></motion.div>
      </div>
      <motion.div initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ ...rise, duration: reduceMotion ? 0 : 1.15, delay: 0.12 }} className="relative order-first mx-auto h-[45svh] w-full max-w-xl overflow-hidden lg:order-none lg:my-auto lg:h-[min(75svh,760px)] lg:max-w-none"><Image src="/enelle/studio.jpg" alt="The Enelle Beauty Bar studio in North Legon" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" /><div className="absolute bottom-5 left-5 flex items-end gap-4"><div className="relative h-20 w-16 overflow-hidden border border-champagne/75"><Image src="/enelle/signature-wave.jpg" alt="Glossy Enelle wave installation" fill sizes="64px" className="object-cover" /></div><p className="max-w-[12rem] text-[10px] font-semibold uppercase leading-5 tracking-[.16em] text-porcelain/90">The Enelle studio<br />North Legon · Accra</p></div></motion.div>
      <p className="absolute bottom-8 right-5 hidden max-w-44 text-right text-[10px] uppercase leading-5 tracking-[.15em] text-porcelain/50 lg:block">Precision installs. Bridal glamour. Hair that holds the room.</p>
    </div>
  </section>;
}
