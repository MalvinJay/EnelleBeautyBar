"use client";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#lookbook", label: "Lookbook" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#location", label: "Location" },
  { href: "/products", label: "Products" },
];


export function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const close = () => setOpen(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="sticky inset-x-0 top-0 z-40 pt-3 sm:pt-0 transition-all duration-300"
            style={{ paddingTop: scrolled ? 0 : undefined }}
        >
            <div className={`mx-auto flex h-[68px] w-full  items-center justify-between px-5 text-ink transition-all duration-300 sm:px-7 ${scrolled ? "bg-porcelain/95 shadow-[0_10px_35px_rgba(41,22,17,.12)] backdrop-blur-md" : "bg-porcelain shadow-[0_10px_35px_rgba(41,22,17,.08)]"}`}>
                <a href="#top" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Enelle Beauty Bar"
                        width={100}
                        height={60}
                        className="h-[60px] w-auto object-contain"
                        priority
                    />
                </a>
                <nav className="hidden items-center gap-7 text-[11px] font-semibold md:flex">
                    {links.map(link =>
                        <a key={link.href} href={link.href} className="transition hover:text-plum">{link.label}</a>
                    )}
                    <a href={createWhatsAppUrl(bookingMessage)} target="_blank" rel="noreferrer" className="rounded-full bg-[#674535] px-5 py-3 text-[11px] font-semibold text-porcelain transition hover:bg-plum">Book a stylist</a>
                </nav>
                <button
                    onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}
                    className="grid min-h-11 min-w-11 place-items-center md:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>
            </div>
            <AnimatePresence>
                {open && <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto max-w-[1480px] bg-porcelain px-5 pb-7 pt-2 text-ink shadow-[0_16px_30px_rgba(41,22,17,.08)] sm:px-7 md:hidden">
                    {links.map(link =>
                        <a onClick={close} key={link.href} href={link.href} className="block py-3 font-display text-3xl">{link.label}</a>
                    )}
                    <a href={createWhatsAppUrl(bookingMessage)} target="_blank" rel="noreferrer" className="mt-5 inline-block rounded-full bg-[#674535] px-5 py-3 text-[11px] font-semibold text-porcelain">Book a stylist</a>
                </motion.nav>}
            </AnimatePresence>
        </header>
    )
}
