"use client";

import { useEffect, useRef, useState } from "react";

const CTA_LINK = "#apply";

/* Cursor-following spotlight on hover */
function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function GlassCard({ className = "", delay = "0s", children }) {
  return (
    <div
      onMouseMove={spot}
      className={`bl-in-up group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/40 sm:p-8 ${className}`}
      style={{ "--d": delay }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}

function IconTile({ children, light = false }) {
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105 ${
        light ? "bg-primary text-white" : "bg-white text-primary"
      }`}
    >
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

export default function Mentorship() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="mentorship"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white ${
        seen ? "is-inview" : ""
      }`}
    >
      {/* backdrop: glows, grid, concentric rings */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-primary-light/50 blur-[130px]" />
        <div
          className="bl-float absolute -bottom-52 -right-32 h-[34rem] w-[34rem] rounded-full bg-black/35 blur-[130px]"
          style={{ animationDelay: "-9s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 20%, black 10%, transparent 70%)",
          }}
        />
        {[28, 44, 62].map((s, i) => (
          <div
            key={s}
            className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: `${s}rem`, height: `${s}rem`, opacity: 1 - i * 0.25 }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
            style={{ "--d": "0s" }}
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            Structured Learning. Personalized Support.
          </div>
          <h2
            className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ "--d": "0.12s" }}
          >
            More Than Learning. Get Guidance to Build.
          </h2>
          <p
            className="bl-in-up font-figtree mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
            style={{ "--d": "0.24s" }}
          >
            Our mentorship combines structured technical learning with
            practical implementation and personalized feedback.
          </p>
        </div>

        <p
          className="bl-in-up font-outfit mt-16 text-lg font-semibold text-white/90"
          style={{ "--d": "0.35s" }}
        >
          What You Get
        </p>

        {/* bento grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3 lg:grid-rows-[1fr_1fr]">
          {/* 1 — Structured Roadmap */}
          <GlassCard delay="0.45s">
            <IconTile>
              <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
              <path d="M9 3v15M15 6v15" />
            </IconTile>
            <h3 className="font-outfit mt-6 text-2xl font-semibold">
              Structured Roadmap
            </h3>
            <p className="font-figtree mt-2 text-base leading-relaxed text-white/75">
              Learn with a clear development plan.
            </p>
            {/* mini visual: 4 stops joined by a line that draws in */}
            <div className="relative mt-auto flex items-center justify-between pt-8">
              <span
                className="bl-in-line absolute left-2 right-2 top-1/2 mt-4 h-px bg-white/40"
                style={{ "--d": "1s" }}
              />
              {[0, 1, 2, 3].map((n) => (
                <span
                  key={n}
                  className="bl-in-pop relative flex h-4 w-4 items-center justify-center rounded-full bg-white"
                  style={{ "--d": `${0.9 + n * 0.2}s` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              ))}
            </div>
          </GlassCard>

          {/* 2 — Practical Coding Tasks */}
          <GlassCard delay="0.6s">
            <IconTile>
              <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
            </IconTile>
            <h3 className="font-outfit mt-6 text-2xl font-semibold">
              Practical Coding Tasks
            </h3>
            <p className="font-figtree mt-2 text-base leading-relaxed text-white/75">
              Apply what you learn.
            </p>
            {/* mini visual: code lines */}
            <div className="mt-auto space-y-2 pt-8" aria-hidden="true">
              {[["w-2/3", "bg-white/60"], ["w-1/2 ml-5", "bg-white/35"], ["w-3/5 ml-5", "bg-white/35"], ["w-1/3", "bg-white/60"]].map(
                ([w, c], i) => (
                  <div key={i} className={`h-2 rounded-full ${w} ${c}`} />
                )
              )}
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-1/4 rounded-full bg-white/35" />
                <span className="h-4 w-[3px] animate-pulse bg-white" />
              </div>
            </div>
          </GlassCard>

          {/* 3 — 1:1 Mentorship (featured, spans two rows) */}
          <div
            onMouseMove={spot}
            className="bl-in-up group relative overflow-hidden rounded-3xl bg-white p-8 text-neutral-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 sm:p-10 lg:col-start-3 lg:row-span-2 lg:row-start-1"
            style={{ "--d": "0.75s" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(181,18,27,0.10), transparent 60%)",
              }}
            />
            <div className="relative flex h-full flex-col">
              <IconTile light>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </IconTile>
              <p className="font-outfit mt-8 text-[6.5rem] font-bold leading-none tracking-tight text-primary sm:text-[8rem]">
                1:1
              </p>
              <h3 className="font-outfit mt-3 text-3xl font-semibold">
                1:1 Mentorship
              </h3>
              <p className="font-figtree mt-3 text-base leading-relaxed text-neutral-600">
                Personalized technical guidance.
              </p>

              {/* mentor <-> learner connection */}
              <div className="mt-auto flex items-center gap-3 pt-10" aria-hidden="true">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  M
                </span>
                <span className="relative h-px flex-1 bg-primary/30">
                  <span className="bl-ring absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                  <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary text-sm font-semibold text-primary">
                  You
                </span>
              </div>
            </div>
          </div>

          {/* 4 — Code Reviews */}
          <GlassCard delay="0.9s">
            <IconTile>
              <circle cx="6" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="9" r="3" />
              <path d="M6 9v6M18 12v1a3 3 0 0 1-3 3h-3" />
            </IconTile>
            <h3 className="font-outfit mt-6 text-2xl font-semibold">
              Code Reviews
            </h3>
            <p className="font-figtree mt-2 text-base leading-relaxed text-white/75">
              Improve your coding approach.
            </p>
            {/* mini diff visual */}
            <div className="font-mono mt-auto space-y-1.5 pt-8 text-xs" aria-hidden="true">
              <div className="flex items-center gap-2 rounded-md bg-black/20 px-3 py-1.5 text-white/55">
                <span>−</span>
                <span className="h-2 w-2/3 rounded-full bg-white/30" />
              </div>
              <div className="flex items-center gap-2 rounded-md bg-white/20 px-3 py-1.5 text-white">
                <span>+</span>
                <span className="h-2 w-1/2 rounded-full bg-white/80" />
              </div>
            </div>
          </GlassCard>

          {/* 5 — Career Preparation */}
          <GlassCard delay="1.05s">
            <IconTile>
              <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18v4" />
            </IconTile>
            <h3 className="font-outfit mt-6 text-2xl font-semibold">
              Career Preparation
            </h3>
            <p className="font-figtree mt-2 text-base leading-relaxed text-white/75">
              Mock interviews and job-search guidance.
            </p>
            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {["Mock interviews", "Job-search guidance"].map((t) => (
                <span
                  key={t}
                  className="font-figtree rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* working professionals note + CTA */}
        <div
          className="bl-in-up mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/20 bg-black/15 p-6 backdrop-blur sm:p-8 lg:flex-row lg:items-center"
          style={{ "--d": "1.3s" }}
        >
          <p className="font-outfit max-w-2xl text-xl font-medium leading-snug sm:text-2xl">
            Designed to support working professionals while continuing their
            current jobs.
          </p>
          <a
            href={CTA_LINK}
            className="font-outfit group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-dark shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
        </div>
      </div>
    </section>
  );
}
