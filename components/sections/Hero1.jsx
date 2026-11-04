"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Paste your founder video embed URL here (YouTube/Vimeo), e.g.
// "https://www.youtube.com/embed/VIDEO_ID". Leave "" until it's ready.
const VIDEO_EMBED_URL = "";
// Optional thumbnail image path from /public, e.g. "/video-thumb.jpg"
const VIDEO_POSTER = "";
const APPLY_LINK = "#apply";

const HEADLINE = "Full Stack Development Mentorship for Working Professionals.";

const HIGHLIGHTS = [
  { top: "5–6", bottom: "Months" },
  { top: "Real-World", bottom: "Projects" },
  { top: "1:1", bottom: "Mentorship" },
  { top: "Career", bottom: "Preparation" },
];

export default function Hero() {
  // intro -> exit -> done
  const [phase, setPhase] = useState("intro");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("bl-intro") === "1";
    } catch { }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setPhase("done");
      return;
    }
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => {
      setPhase("done");
      try {
        sessionStorage.setItem("bl-intro", "1");
      } catch { }
    }, 3100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const ready = phase !== "intro";
  const exiting = phase === "exit" || phase === "done";

  return (
    <>
      {/* ---------- Opening animation ---------- */}
      {phase !== "done" && (
        <div className="fixed inset-0 z-[100]" aria-hidden="true">
          {/* red curtain sits behind the white one and lifts slightly later */}
          <div
            className={`absolute inset-0 bg-primary transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] delay-150 ${exiting ? "-translate-y-full" : "translate-y-0"
              }`}
          />
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] ${exiting ? "-translate-y-full" : "translate-y-0"
              }`}
          >
            <div className="bl-logo">
              <Image
                src="/logo.png"
                alt=""
                width={120}
                height={130}
                priority
                className="h-28 w-auto sm:h-32"
              />
            </div>
            <div className="mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-primary/15">
              <div className="bl-line h-full w-full origin-left bg-primary" />
            </div>
            <p className="font-outfit mt-5 text-sm tracking-wide text-primary-dark/70">
              Bala Labs
            </p>
          </div>
        </div>
      )}

      {/* ---------- Hero ---------- */}
      <section
        id="home"
        className={`relative isolate overflow-hidden bg-primary-dark text-white ${ready ? "is-ready" : ""
          }`}
      >
        {/* backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bl-float absolute -left-1/4 -top-1/3 h-[70vmax] w-[70vmax] rounded-full bg-primary opacity-60 blur-[120px]" />
          <div
            className="bl-float absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full bg-primary-light opacity-30 blur-[140px]"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse at 30% 20%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 30% 20%, black 20%, transparent 70%)",
            }}
          />
        </div>

        <div className="flex items-center px-5 pb-20 pt-32 sm:px-8 sm:pt-40 lg:pb-28">
          <div className="">
            {/* badge */}
            <div
              className="bl-reveal font-figtree inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
              style={{ "--d": "0.1s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              For Working Professionals
            </div>

            {/* headline — word-by-word mask reveal */}
            <h1 className="font-outfit mt-7 max-w-5xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {HEADLINE.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-top"
                >
                  <span
                    className="bl-word-inner"
                    style={{ "--d": `${0.25 + i * 0.08}s` }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="bl-reveal font-outfit mt-7 max-w-3xl text-xl font-medium text-white/95 sm:text-2xl"
              style={{ "--d": "0.95s" }}
            >
              Build Practical Skills. Work on Real-World Projects. Prepare for Your
              Next Career Move.
            </p>

            <p
              className="bl-reveal font-figtree mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
              style={{ "--d": "1.1s" }}
            >
              Whether you&apos;re switching from Non-IT, moving from IT Support or
              Testing into development, or upskilling as a Software Developer,
              Bala Labs helps you build practical software development skills
              with structured training and personalized mentorship.
            </p>

            {/* highlights */}
            <ul
              className="bl-reveal mt-10 grid max-w-3xl grid-cols-2 gap-y-6 sm:grid-cols-4"
              style={{ "--d": "1.25s" }}
            >
              {HIGHLIGHTS.map((h) => (
                <li key={h.top} className="border-l-2 border-white/30 pl-4">
                  <p className="font-outfit text-xl font-semibold leading-tight sm:text-2xl">
                    {h.top}
                  </p>
                  <p className="font-figtree text-sm text-white/70">{h.bottom}</p>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="bl-reveal mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
              style={{ "--d": "1.4s" }}
            >
              <a
                href={APPLY_LINK}
                className="font-outfit group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-dark shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="relative z-10">Apply for Mentorship Evaluation</span>
                <svg
                  className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <p className="font-figtree text-sm text-white/70">
                From Bala Labs — A Software Product Development Company.
              </p>
            </div>
          </div>

          {/* video block */}
          <div className="mt-24 sm:mt-32">
            <div className="bl-reveal mx-auto max-w-3xl text-center" style={{ "--d": "1.6s" }}>
              <h2 className="font-outfit text-3xl font-semibold tracking-tight sm:text-4xl">
                See How Bala Labs Mentorship Works.
              </h2>
              <p className="font-outfit mt-3 text-xl text-white/80 sm:text-2xl">
                Full Stack Alone Isn&apos;t Enough.
              </p>
            </div>

            <div
              className="bl-reveal mx-auto mt-10 max-w-5xl"
              style={{ "--d": "1.8s" }}
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/20 bg-primary shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                {playing && VIDEO_EMBED_URL ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`${VIDEO_EMBED_URL}${VIDEO_EMBED_URL.includes("?") ? "&" : "?"
                      }autoplay=1&rel=0`}
                    title="Founder explanation: Full Stack Alone Isn't Enough"
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => VIDEO_EMBED_URL && setPlaying(true)}
                    aria-label="Play founder explanation video"
                    className="group absolute inset-0 flex h-full w-full items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-white"
                    style={
                      VIDEO_POSTER
                        ? {
                          backgroundImage: `url(${VIDEO_POSTER})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                        : {
                          backgroundImage:
                            "linear-gradient(135deg, var(--color-primary-light), var(--color-primary) 45%, var(--color-primary-dark))",
                        }
                    }
                  >
                    <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
                    <span className="relative flex items-center justify-center">
                      <span className="bl-ring absolute h-24 w-24 rounded-full bg-white/40 sm:h-28 sm:w-28" />
                      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-2xl transition group-hover:scale-110 sm:h-24 sm:w-24">
                        <svg className="ml-1 h-8 w-8 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                    <span className="font-figtree absolute bottom-4 left-5 text-left text-sm text-white sm:bottom-6 sm:left-8 sm:text-base">
                      <span className="block font-semibold">
                        Founder explanation
                      </span>
                      <span className="text-white/80">3–5 minutes</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
