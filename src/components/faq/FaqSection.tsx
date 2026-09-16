"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const faqs = [
  {
    question: "How should I prepare my natural hair before a frontal or closure install?",
    answer:
      "Please arrive with clean, thoroughly washed, blown-out, and product-free hair. If you require hair washing or deep conditioning treatment, please inform us during consultation so we can allocate extra time.",
  },
  {
    question: "When should I drop off my wig/frontal before my appointment?",
    answer:
      "For custom plucking, bleaching knots, and hairline tailoring, we request wig or lace drop-off at least 24 to 48 hours prior to your scheduled session at 25 Pawpaw Street, Agbogba, North Legon.",
  },
  {
    question: "How long do K-Tip and Tape-In extensions last?",
    answer:
      "With proper home maintenance and professional silk wraps, Tape-In extensions last 6 to 8 weeks before needing a maintenance move-up. K-Tips typically last 3 to 4 months with natural hair growth.",
  },
  {
    question: "Do you supply hair extensions or can I bring my own bundles/wigs?",
    answer:
      "We accept client-provided high quality raw and virgin hair. We also stock curated raw bundles and custom wigs available for purchase upon consultation.",
  },
  {
    question: "What is your booking and deposit policy?",
    answer:
      "Appointments are confirmed upon receipt of a booking deposit via Mobile Money / Bank Transfer through WhatsApp confirmation. Please reach out at least 24 hours in advance if you need to reschedule.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-porcelain px-5 py-24 text-ink sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow text-plum flex items-center gap-2">
              <HelpCircle size={14} /> Client Guide & Prep
            </p>
            <h2 className="mt-6 font-display text-[clamp(3.3rem,6vw,6.4rem)] leading-[.87] tracking-[-0.06em]">
              Everything you need to <span className="italic text-plum">know</span>.
            </h2>
            <p className="mt-6 text-sm leading-6 text-ink/70 max-w-sm">
              Have questions about your upcoming install or hair care maintenance? Here are our most frequently asked client questions.
            </p>
            <a
              href={createWhatsAppUrl("Hello Enelle Beauty Bar, I have a specific question before booking.")}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block border-b border-plum pb-2 text-[10px] font-bold uppercase tracking-[.15em] text-plum transition hover:text-ink"
            >
              Ask a question on WhatsApp →
            </a>
          </div>

          <div className="divide-y divide-ink/15 border-t border-b border-ink/15">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="py-6">
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-start justify-between gap-4 text-left transition hover:text-plum cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-2xl tracking-tight sm:text-3xl">
                      {faq.question}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-plum text-porcelain border-plum" : "text-ink"
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/75 pt-2">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
