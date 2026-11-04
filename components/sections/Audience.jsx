"use client";

import { useEffect, useRef, useState } from "react";

const APPLY_LINK = "#learning-path";

const PATHS = [
  {
    who: "Non-IT Working Professionals",
    question: "Planning to Switch to Software Development?",
    text: "Build programming and development skills to prepare for opportunities in the IT industry.",
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </>
    ),
  },
  {
    who: "IT Support & Testing Professionals",
    question: "Ready to Move Into Development?",
    text: "Strengthen your coding and practical development skills to prepare for developer roles.",
    icon: (
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    ),
  },
  {
    who: "Existing Software Developers",
    question: "Looking for Your Next Career Opportunity?",
    text: "Upskill in full stack development, improve problem-solving, and strengthen your interview preparation.",
    icon: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

export default function Audience() {
  const [ref, seen] = useInView(0.2);

  return (
    <section
      id="who-is-this-for"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-dark text-white ${
        seen ? "is-inview" : ""
      }`}
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-primary-light/50 blur-[120px]" />
        <div
          className="bl-float absolute -bottom-52 -left-40 h-[34rem] w-[34rem] rounded-full bg-black/30 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 50% 30%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, black 10%, transparent 70%)",
          }}
        />
        <span
          className="font-outfit absolute -bottom-16 right-4 select-none text-[16rem] font-bold leading-none text-white/[0.05] sm:text-[24rem]"
          aria-hidden="true"
        >
          {"</>"}
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        {/* heading */}
        <div className="max-w-3xl">
          <div
            className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
            style={{ "--d": "0s" }}
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            Your Career. Your Next Move.
          </div>
          <h2
            className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ "--d": "0.12s" }}
          >
            Wherever You Are in Your Career, Build What&apos;s Next.
          </h2>
        </div>

        {/* paths */}
        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <div key={p.who} className="relative lg:pt-12">
              {/* connector (desktop): node + line to next column */}
              <div className="absolute left-0 top-0 hidden h-6 items-center lg:flex">
                <span
                  className="bl-in-pop relative flex h-6 w-6 items-center justify-center rounded-full bg-white"
                  style={{ "--d": `${0.5 + i * 0.35}s` }}
                >
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
                {i < PATHS.length - 1 && (
                  <span
                    className="bl-in-line absolute left-6 top-1/2 h-px bg-gradient-to-r from-white/80 to-white/20"
                    style={{
                      "--d": `${0.7 + i * 0.35}s`,
                      width: "calc(100% + 2rem - 1.5rem)",
                    }}
                  />
                )}
              </div>

              <article
                className="bl-in-up group h-full rounded-3xl border border-white/20 bg-white/10 p-7 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15 sm:p-8"
                style={{ "--d": `${0.45 + i * 0.35}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary transition group-hover:scale-105">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {p.icon}
                    </svg>
                  </span>
                  <p className="font-figtree text-sm font-semibold text-white/85">
                    {p.who}
                  </p>
                </div>
                <h3 className="font-outfit mt-7 text-2xl font-semibold leading-snug sm:text-[1.7rem]">
                  {p.question}
                </h3>
                <p className="font-figtree mt-4 text-base leading-relaxed text-white/75">
                  {p.text}
                </p>
              </article>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bl-in-up mt-14" style={{ "--d": "1.7s" }}>
          <a
            href={APPLY_LINK}
            className="font-outfit group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-dark shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Find Your Learning Path
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
