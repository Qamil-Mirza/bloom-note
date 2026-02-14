"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setExpanded(false), []);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [expanded, close]);

  useEffect(() => {
    const container = videoContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-slate-950/40 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logos/bloomnotelogotransparent.png" alt="BloomNote" width={80} height={80} />
            <span className="text-xl font-bold text-white tracking-tight">
              BloomNote
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/credits"
              className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5"
            >
              Credits
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Lamp Effect */}
      <LampContainer className="min-h-screen">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >

          <h1 className="bg-gradient-to-br from-romantic-200 via-white to-romantic-300 py-4 bg-clip-text text-center text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent">
            Send a 3D
            <br />
            Valentine Gift
          </h1>
          <p className="text-romantic-200/60 text-center text-lg md:text-xl max-w-xl mt-4 sm:mt-6 leading-relaxed">
            Pick a 3D gift, write your Valentine&apos;s message, and share with a link.
            Watch them open an animated envelope revealing your gift.
          </p>
          <Link
            href="/create"
            className="mt-6 sm:mt-10 group relative inline-flex items-center"
          >
            <span className="absolute inset-0 rounded-full bg-romantic-500/30 blur-xl group-hover:bg-romantic-500/50 transition-all duration-500" />
            <span className="relative px-8 py-4 rounded-full bg-gradient-to-r from-romantic-600 to-romantic-500 text-white font-semibold text-lg hover:from-romantic-500 hover:to-romantic-400 transition-all duration-300 shadow-lg shadow-romantic-500/25">
              Create Your Card →
            </span>
          </Link>

          <p className="mt-6 text-slate-500 text-sm">
            Free · No signup required
          </p>
        </motion.div>
      </LampContainer>

      {/* Video Demo Section */}
      <section className="relative z-10 pb-24 px-6 bg-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See it in action
          </h2>
          <p className="text-slate-400 mb-12 text-lg">
            Watch how easy it is to create and send a 3D Valentine gift
          </p>
          {/* Add demo.mp4 to public/ directory */}
          <div
            ref={videoContainerRef}
            className="rounded-2xl overflow-hidden shadow-2xl shadow-romantic-500/10 ring-1 ring-white/10 cursor-pointer transition-transform hover:scale-[1.01]"
            onClick={() => setExpanded(true)}
          >
            {videoVisible && (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="w-full"
                src="/demo.mp4"
              />
            )}
          </div>

          {/* Expanded lightbox */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-pointer"
                onClick={close}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-[90vw] max-w-6xl rounded-2xl overflow-hidden ring-1 ring-white/10 cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full"
                    src="/demo.mp4"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Image src="/logos/bloomnotelogotransparent.png" alt="BloomNote" width={64} height={64} />
            <span className="text-sm font-medium text-slate-400">
              BloomNote
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Made with love for Valentine&apos;s Day By Qamil Mirza
          </p>
        </div>
      </footer>
    </div>
  );
}
