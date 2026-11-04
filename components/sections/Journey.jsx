"use client";

import { useEffect, useRef, useState } from "react";

const CTA_LINK = "#apply";

const PHASES = [
  {
    name: "Full Stack Development",
    title: "Choose Your Technology. Build Your Foundation.",
    text: "Learn MERN, Java, or Python Full Stack Development and build complete software applications.",
    tags: ["MERN", "Java", "Python"],
  },
  {
    name: "DSA & Problem Solving",
    title: "Think Better. Solve Smarter.",
    text: "Develop logical thinking and coding skills through pattern-based DSA and problem-solving practice.",
    tags: ["Pattern-based DSA", "Problem solving"],
  },
  {
    name: "Real-World Project Experience",
    title: "Apply Your Skills to Practical Development.",
    text: "Work on software development tasks associated with Bala Labs projects, including feature development, debugging, integration, and code reviews.",
    tags: ["Feature development", "Debugging", "Integration", "Code reviews"],
  },
  {
    name: "Job Search & Interview Preparation",
    title: "Prepare for Your Next Career Opportunity.",
    text: "Get guidance on resumes, LinkedIn, GitHub portfolios, job-search strategies, coding interviews, and mock interviews.",
    tags: ["Resume", "LinkedIn", "GitHub portfolio", "Mock interviews"],
  },
];

const BEYOND = [
  "AI Tools for Developers",
  "Core AI Concepts",
  "Modern Technologies",
  "Debugging Skills",
  "Company-Wise Interview Preparation",
];

/* Adds .is-inview once the element scrolls into view */
function Reveal({ children, className = "", style, as: Tag = "div" }) {
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
    <Tag ref={ref} className={`${seen ? "is-inview" : ""} ${className}`} style={style}>
      {children}
    </Tag>
  );
}

export default function Journey() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const fillRef = useRef(null);
  const nodeRefs = useRef([]);
  const [reached, setReached] = useState(0); // how many phases are reached

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const wrap = wrapRef.current;
      const nodes = nodeRefs.current.filter(Boolean);
      if (!wrap || nodes.length < 2) return;

      const wrapTop = wrap.getBoundingClientRect().top;
      const centers = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      const trigger = window.innerHeight * 0.55;

      if (trackRef.current) {
        trackRef.current.style.top = `${first - wrapTop}px`;
        trackRef.current.style.height = `${last - first}px`;
      }
      if (fillRef.current) {
        const h = Math.min(Math.max(trigger - first, 0), last - first);
        fillRef.current.style.height = `${h}px`;
      }
      const count = centers.filter((c) => c <= trigger).length;
      setReached((prev) => (prev === count ? prev : count));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const current = Math.max(reached, 1);

  return (
    <section
      id="journey"
      className="relative isolate overflow-hidden bg-white text-neutral-900"
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-48 top-20 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -right-48 bottom-1/3 h-[30rem] w-[30rem] rounded-full bg-primary-light/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(181,18,27,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse at 85% 20%, black 0%, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 85% 20%, black 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* ===== Left: sticky heading + live counter ===== */}
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div className="bl-in-up" style={{ "--d": "0s" }}>
              <div className="font-figtree inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-dark shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Your 5–6 Month Roadmap
              </div>
              <h2 className="font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                From Learning to Building Real Software.
              </h2>
              <p className="font-figtree mt-5 max-w-md text-base leading-relaxed text-neutral-600">
                Our 4-Phase Learning Journey takes you from fundamentals to
                real project work and interview readiness.
              </p>

              {/* live phase counter */}
              <div className="mt-10 hidden items-end gap-4 lg:flex">
                <div className="font-outfit relative h-24 overflow-hidden text-[6rem] font-bold leading-none text-primary">
                  <div
                    className="transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
                    style={{ transform: `translateY(-${(current - 1) * 25}%)` }}
                  >
                    {PHASES.map((_, i) => (
                      <div key={i} className="h-24">
                        0{i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="font-figtree pb-2 text-sm text-neutral-500">
                  of 04 phases
                  <span className="mt-0.5 block font-semibold text-neutral-800">
                    {PHASES[current - 1].name}
                  </span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* ===== Right: timeline ===== */}
          <div ref={wrapRef} className="relative">
            {/* track + scroll-driven fill */}
            <div
              ref={trackRef}
              className="absolute left-[22px] w-[3px] -translate-x-1/2 rounded-full bg-neutral-200 sm:left-7"
            >
              <div
                ref={fillRef}
                className="w-full rounded-full bg-gradient-to-b from-primary-light to-primary"
                style={{ height: 0 }}
              />
            </div>

            <ol className="space-y-6">
              {PHASES.map((p, i) => {
                const active = i < reached;
                const isCurrent = i === reached - 1;
                return (
                  <li key={p.name} className="flex gap-5 sm:gap-8">
                    <div className="relative z-10 shrink-0">
                      <div
                        ref={(el) => (nodeRefs.current[i] = el)}
                        className={`font-outfit flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg font-semibold transition-all duration-500 sm:h-14 sm:w-14 sm:text-xl ${
                          active
                            ? "scale-100 border-primary bg-primary text-white"
                            : "scale-95 border-neutral-300 bg-white text-neutral-800"
                        } ${isCurrent ? "ring-8 ring-primary/15" : ""}`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    <Reveal className="min-w-0 flex-1">
                      <article
                        className={`bl-in-up rounded-3xl border bg-white p-6 transition-all duration-500 sm:p-8 ${
                          active
                            ? "border-primary/25 shadow-[0_24px_50px_-25px_rgba(181,18,27,0.45)]"
                            : "border-neutral-200 opacity-70 shadow-sm"
                        }`}
                        style={{ "--d": "0.05s" }}
                      >
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span
                            className={`font-outfit rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-500 ${
                              active
                                ? "bg-primary text-white"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            Phase 0{i + 1}
                          </span>
                          <span className="font-figtree text-sm font-semibold text-primary-dark">
                            {p.name}
                          </span>
                        </div>
                        <h3 className="font-outfit mt-4 text-2xl font-semibold leading-snug tracking-tight sm:text-[1.65rem]">
                          {p.title}
                        </h3>
                        <p className="font-figtree mt-3 text-base leading-relaxed text-neutral-600">
                          {p.text}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <li
                              key={t}
                              className="font-figtree rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-sm text-primary-dark"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* ===== Beyond the core curriculum ===== */}
        <Reveal className="mt-20 lg:mt-28">
          <div className="bl-in-up relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary-dark p-8 text-white shadow-[0_40px_90px_-30px_rgba(143,16,24,0.7)] sm:p-12" style={{ "--d": "0s" }}>
            <div className="bl-float pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary-light/50 blur-[90px]" />
            <span
              className="font-outfit pointer-events-none absolute -bottom-10 right-6 select-none text-[12rem] font-bold leading-none text-white/[0.06]"
              aria-hidden="true"
            >
              {"</>"}
            </span>

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              <div>
                <h3 className="font-outfit text-3xl font-semibold tracking-tight sm:text-4xl">
                  Beyond the Core Curriculum
                </h3>
                <p className="font-figtree mt-4 max-w-md text-base leading-relaxed text-white/80">
                  Prepare for hiring processes at companies such as Zoho, TCS,
                  and Cognizant, as well as service-based and product-based
                  companies.
                </p>
                <a
                  href={CTA_LINK}
                  className="font-outfit group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-dark shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Explore Your Learning Journey
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

              <ul className="flex flex-wrap gap-3">
                {BEYOND.map((b, i) => (
                  <li
                    key={b}
                    className="bl-in-up font-outfit rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-base font-medium backdrop-blur transition hover:bg-white hover:text-primary-dark"
                    style={{ "--d": `${0.2 + i * 0.1}s` }}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
