"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { bookingMessage, createWhatsAppUrl } from "@/lib/whatsapp";

const VIDEO_SRC = "/Redecorated Space.mp4";

export function BookingCta() {
    const bgRef = useRef<HTMLVideoElement>(null);
    const fgRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);
    const [paused, setPaused] = useState(false);

    /* ── Keep the two videos in sync ── */
    const syncVideos = useCallback(() => {
        const bg = bgRef.current;
        const fg = fgRef.current;
        if (!bg || !fg) return;
        if (Math.abs(bg.currentTime - fg.currentTime) > 0.15) {
            bg.currentTime = fg.currentTime;
        }
    }, []);

    useEffect(() => {
        const id = setInterval(syncVideos, 1000);
        return () => clearInterval(id);
    }, [syncVideos]);

    /* ── Controls ── */
    function toggleMute() {
        const next = !muted;
        setMuted(next);
        if (fgRef.current) fgRef.current.muted = next;
        if (bgRef.current) bgRef.current.muted = true; // bg always muted
    }

    function togglePlay() {
        const fg = fgRef.current;
        const bg = bgRef.current;
        if (!fg || !bg) return;

        if (fg.paused) {
            fg.play();
            bg.play();
            setPaused(false);
        } else {
            fg.pause();
            bg.pause();
            setPaused(true);
        }
        syncVideos();
    }

    return (
        <section className="relative overflow-hidden bg-plum px-5 py-24 text-porcelain sm:px-10 lg:px-16 lg:py-36">
            {/* ── Blurred fill video (covers entire section, always muted) ── */}
            <video
                ref={bgRef}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.10] object-cover blur-xl"
            >
                <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {/* ── Sharp portrait video (true aspect, centred) ── */}
            <video
                ref={fgRef}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-contain"
            >
                <source src={VIDEO_SRC} type="video/mp4" />
            </video>

            {/* ── Overall dark overlay for text readability ── */}
            <div
                className="absolute inset-0 bg-plum/65"
                aria-hidden
            />

            {/* ── Decorative ring ── */}
            <div
                className="absolute -right-24 -top-28 h-[32rem] w-[32rem] rounded-full border border-champagne/30"
                aria-hidden
            />

            {/* ── Content ── */}
            <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
                <div>
                    <p className="eyebrow text-champagne">
                        A chair with your name on it
                    </p>
                    <p className="mt-6 text-sm leading-6 text-porcelain/70">
                        25 Pawpaw Street
                        <br />
                        Agbogba, North Legon
                        <br />
                        Accra, Ghana
                    </p>
                </div>

                <div>
                    <h2 className="max-w-4xl font-display text-[clamp(3.5rem,6.5vw,7.6rem)] leading-[.84] tracking-[-.065em]">
                        The next version of{" "}
                        <span className="italic text-champagne">you</span> starts here.
                    </h2>

                    <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-porcelain/25 pt-7">
                        <p className="max-w-sm text-sm leading-6 text-porcelain/75">
                            Send your preferred style, appointment date and a reference image.
                            We&apos;ll come back with availability and pricing.
                        </p>

                        <a
                            href={createWhatsAppUrl(bookingMessage)}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex min-h-12 items-center gap-5 bg-champagne px-5 text-[10px] font-bold uppercase tracking-[.17em] text-ink transition hover:bg-porcelain focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
                        >
                            Start your consultation{" "}
                            <ArrowUpRight
                                size={16}
                                aria-hidden
                                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Video controls ── */}
            <div className="absolute bottom-5 right-5 z-10 flex items-center gap-2">
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={paused ? "Play background video" : "Pause background video"}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-porcelain/80 backdrop-blur-md transition hover:bg-ink/60 hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                    {paused ? <Play size={18} /> : <Pause size={18} />}
                </button>

                <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute background video" : "Mute background video"}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/40 text-porcelain/80 backdrop-blur-md transition hover:bg-ink/60 hover:text-porcelain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
                >
                    {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>
        </section>
    );
}
