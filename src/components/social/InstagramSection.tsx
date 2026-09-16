"use client";

import Image from "next/image";
import { ArrowUpRight, Heart, Sparkles } from "lucide-react";
import { galleryImages } from "@/data/gallery";

function InstagramIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}


const instagramPreviews = [
  { src: galleryImages[0], likes: "1.2k", caption: "Soft bridal glam & effortless waves ✨" },
  { src: galleryImages[2], likes: "890", caption: "Invisible closure install melted to perfection 🔥" },
  { src: galleryImages[4], likes: "2.4k", caption: "Golden blonde finger waves on natural hair 💛" },
  { src: galleryImages[6], likes: "1.5k", caption: "Sleek high bun for our gorgeous client 👑" },
  { src: galleryImages[8], likes: "3.1k", caption: "Tape-in extension volume transformation 🌸" },
];

export function InstagramSection() {
  return (
    <section id="instagram" className="relative overflow-hidden bg-ink py-20 text-porcelain sm:py-28">
      {/* Background subtle gradient glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-tr from-pink-600/20 via-purple-600/15 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-amber-500/15 via-pink-500/15 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-10 lg:px-16">
        {/* Header CTA Banner */}
        <div className="flex flex-col items-center text-center">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-champagne/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[.2em] text-champagne backdrop-blur-sm">
            <Sparkles size={13} /> Official Instagram Feed
          </div> */}

          <h2 className="mt-6 font-display text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[.9] tracking-[-.05em]">
            Follow us <span className="italic text-champagne">@enelle_beauty_bar</span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-porcelain/75">
            Get daily hair inspiration, client transformation reels, bridal BTS, and exclusive appointment availability posted straight from our North Legon studio.
          </p>

          {/* High-visibility primary CTA button */}
          <a
            href="https://www.instagram.com/enelle_beauty_bar/"
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] px-8 text-xs font-bold uppercase tracking-[.18em] text-white shadow-[0_10px_30px_rgba(253,29,29,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_40px_rgba(253,29,29,0.5)]"
          >
            <InstagramIcon size={20} className="transition-transform group-hover:rotate-12" />
            <span>Follow Us on Instagram</span>
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Visual Instagram Feed Cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {instagramPreviews.map((item, index) => (
            <a
              key={index}
              href="https://www.instagram.com/enelle_beauty_bar/"
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-charcoal shadow-md"
            >
              <Image
                src={item.src}
                alt="Enelle Beauty Bar Instagram Post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 flex flex-col justify-end p-3 text-porcelain">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-champagne">
                  <Heart size={14} fill="currentColor" />
                  <span>{item.likes}</span>
                </div>
                <p className="mt-1 text-[11px] line-clamp-2 leading-tight text-porcelain/90">
                  {item.caption}
                </p>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-champagne uppercase tracking-wider">
                  <InstagramIcon size={12} /> View Post →
                </div>
              </div>
            </a>
          ))}

        </div>
      </div>
    </section>
  );
}
