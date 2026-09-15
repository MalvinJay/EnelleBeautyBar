"use client";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { serviceCategories } from "@/data/services";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export function ServicesSection() {
  const [activeName, setActiveName] = useState(serviceCategories[0].name);
  const active = serviceCategories.find(category => category.name === activeName) ?? serviceCategories[0];
  const reduceMotion = useReducedMotion();
  return <section id="services" className="bg-linen px-5 py-24 sm:px-10 lg:px-16 lg:py-36"><div className="mx-auto max-w-[1400px]"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24"><p className="eyebrow text-plum">The hair menu</p><div><h2 className="font-display text-[clamp(3.3rem,6vw,6.4rem)] leading-[.87] tracking-[-0.06em]">Made for your <span className="italic text-plum">main character</span> moment.</h2><div role="tablist" aria-label="Service categories" className="mt-12 flex gap-6 overflow-x-auto border-b border-ink/15 pb-3 text-[10px] font-bold uppercase tracking-[0.16em]">{serviceCategories.map(category => <button role="tab" aria-selected={activeName === category.name} onClick={() => setActiveName(category.name)} key={category.name} className={`min-h-11 shrink-0 transition ${activeName === category.name ? "text-plum" : "text-ink/60 hover:text-ink"}`}>{category.name}</button>)}</div></div></div>
    <AnimatePresence mode="wait"><motion.div key={active.name} initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -16 }} transition={{ duration: reduceMotion ? 0 : 0.45 }} className="mt-12 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-20"><div className="relative aspect-[4/5] overflow-hidden"><Image src={active.image} alt={`${active.name} service styling`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div><div className="divide-y divide-ink/15 self-center">{active.services.map(service => <article key={service.name} className="group py-7 first:pt-0"><div className="flex items-baseline justify-between gap-4"><h3 className="font-display text-3xl tracking-[-0.025em]">{service.name}</h3><span className="shrink-0 text-[10px] font-bold uppercase tracking-[.1em] text-plum">{service.price}</span></div><p className="mt-3 max-w-md text-sm leading-6 text-ink/65">{service.description}</p><div className="mt-5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.14em]"><span className="text-ink/55">{service.duration}</span><a href={createWhatsAppUrl(`Hello Enelle Beauty Bar, I'm interested in the ${service.name} service and would like to book a Luxury Session.`)} target="_blank" rel="noreferrer" className="border-b border-champagne pb-1 text-ink transition hover:text-plum">Reserve this service</a></div></article>)}</div></motion.div></AnimatePresence>
  </div></section>;
}
