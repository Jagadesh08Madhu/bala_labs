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
    } catch {}
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
      } catch {}
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
          <div
            className={`absolute inset-0 bg-primary transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] delay-150 ${
              exiting ? "-translate-y-full" : "translate-y-0"
            }`}
          />
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center bg-white transition-transform duration-[900ms] ease-[cubic-bezier(.7,0,.2,1)] ${
              exiting ? "-translate-y-full" : "translate-y-0"
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
        className={`relative isolate overflow-hidden bg-white text-neutral-900 ${
          ready ? "is-ready" : ""
        }`}
      >
        {/* backdrop: soft red washes + dot grid */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bl-float absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[110px]" />
          <div
            className="bl-float absolute -bottom-48 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-primary-light/15 blur-[120px]"
            style={{ animationDelay: "-7s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(181,18,27,0.22) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              maskImage:
                "radial-gradient(ellipse at 70% 40%, black 0%, transparent 65%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 70% 40%, black 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-[1800px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:min-h-[100svh] lg:grid-cols-[1.08fr_1fr] lg:gap-12 lg:pb-16 lg:pt-28">
          {/* ===== Left: copy ===== */}
          <div>
            <div
              className="bl-reveal font-figtree inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-dark shadow-sm backdrop-blur"
              style={{ "--d": "0.1s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              For Working Professionals
            </div>

            <h1 className="font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl xl:text-[3.5rem]">
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
              className="bl-reveal font-outfit mt-6 max-w-xl text-lg font-medium text-primary-dark sm:text-xl"
              style={{ "--d": "0.95s" }}
            >
              Build Practical Skills. Work on Real-World Projects. Prepare for
              Your Next Career Move.
            </p>

            <p
              className="bl-reveal font-figtree mt-4 max-w-xl text-base leading-relaxed text-neutral-600"
              style={{ "--d": "1.1s" }}
            >
              Whether you&apos;re switching from Non-IT, moving from IT Support
              or Testing into development, or upskilling as a Software
              Developer, Bala Labs helps you build practical software
              development skills with structured training and personalized
              mentorship.
            </p>

            <ul
              className="bl-reveal mt-8 grid max-w-xl grid-cols-2 gap-y-5 sm:grid-cols-4"
              style={{ "--d": "1.25s" }}
            >
              {HIGHLIGHTS.map((h) => (
                <li key={h.top} className="border-l-2 border-primary/40 pl-3.5">
                  <p className="font-outfit text-lg font-semibold leading-tight text-neutral-900">
                    {h.top}
                  </p>
                  <p className="font-figtree text-sm text-neutral-500">
                    {h.bottom}
                  </p>
                </li>
              ))}
            </ul>

            <div
              className="bl-reveal mt-9 flex flex-col items-start gap-4"
              style={{ "--d": "1.4s" }}
            >
              <a
                href={APPLY_LINK}
                className="font-outfit group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_-10px_rgba(181,18,27,0.7)] transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_18px_40px_-10px_rgba(143,16,24,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                Apply for Mentorship Evaluation
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
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
              <p className="font-figtree text-sm text-neutral-500">
                From Bala Labs — A Software Product Development Company.
              </p>
            </div>
          </div>

          {/* ===== Right: video ===== */}
          <div className="bl-reveal" style={{ "--d": "1.2s" }}>
            <h2 className="font-outfit text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
              See How Bala Labs Mentorship Works.
            </h2>
            <p className="font-outfit mt-1.5 text-lg text-primary">
              Full Stack Alone Isn&apos;t Enough.
            </p>

            <div className="relative mt-7">
              {/* offset red block behind the card */}
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.75rem] bg-gradient-to-br from-primary-light to-primary-dark opacity-90" />
              <div className="absolute -left-3 -top-3 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />

              <div className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-2.5 shadow-[0_30px_70px_-25px_rgba(143,16,24,0.45)]">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-primary-dark">
                  {playing && VIDEO_EMBED_URL ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`${VIDEO_EMBED_URL}${
                        VIDEO_EMBED_URL.includes("?") ? "&" : "?"
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
                                "linear-gradient(135deg, var(--color-primary-light), var(--color-primary) 50%, var(--color-primary-dark))",
                            }
                      }
                    >
                      <span className="absolute inset-0 bg-black/15 transition group-hover:bg-transparent" />
                      <span className="relative flex items-center justify-center">
                        <span className="bl-ring absolute h-24 w-24 rounded-full bg-white/50" />
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-2xl transition group-hover:scale-110">
                          <svg
                            className="ml-1 h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  )}
                </div>

                <div className="font-figtree flex items-center justify-between gap-3 px-3 pb-1.5 pt-3 text-sm">
                  <span className="flex items-center gap-2 font-semibold text-neutral-900">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Founder explanation
                  </span>
                  <span className="text-neutral-500">3–5 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
