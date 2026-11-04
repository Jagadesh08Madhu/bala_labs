"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Can I join while working full-time?",
    a: "Yes. Our program is designed to support working professionals through structured learning and mentorship.",
  },
  {
    q: "Can I join from a Non-IT background?",
    a: "Yes. You can start learning software development fundamentals and progress through your chosen full stack track.",
  },
  {
    q: "I'm working in IT Support or Testing. Can I join?",
    a: "Yes. The program helps you develop practical skills to prepare for software development opportunities.",
  },
  {
    q: "Will I get 1:1 mentorship and practical projects?",
    a: "Yes. Both are included, along with coding tasks, code reviews, and technical guidance.",
  },
  {
    q: "What is the duration and fee?",
    a: "The program runs for approximately 5–6 months, with a fee of ₹29,999.",
  },
];

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function FAQ() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [open, setOpen] = useState(0); // index of the open item, or -1

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section
      id="faq"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white ${
        seen ? "is-inview" : ""
      }`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* backdrop */}
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
              "radial-gradient(ellipse at 20% 20%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 20%, black 10%, transparent 70%)",
          }}
        />
        <span
          className="font-outfit absolute -bottom-24 left-4 select-none text-[22rem] font-bold leading-none text-white/[0.05]"
          aria-hidden="true"
        >
          ?
        </span>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-32">
        {/* heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div
            className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
            style={{ "--d": "0s" }}
          >
            <span className="h-2 w-2 rounded-full bg-white" />
            FAQ
          </div>
          <h2
            className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ "--d": "0.12s" }}
          >
            Frequently Asked Questions
          </h2>

          {/* live counter */}
          <div
            className="bl-in-up font-outfit mt-10 hidden items-baseline gap-2 lg:flex"
            style={{ "--d": "0.3s" }}
            aria-hidden="true"
          >
            <span className="text-5xl font-bold tabular-nums">
              {open >= 0 ? `0${open + 1}` : "––"}
            </span>
            <span className="text-lg text-white/60">/ 0{FAQS.length}</span>
          </div>
        </div>

        {/* accordion */}
        <ul className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const bId = `faq-btn-${i}`;
            const pId = `faq-panel-${i}`;
            return (
              <li
                key={f.q}
                className="bl-in-up"
                style={{ "--d": `${0.3 + i * 0.12}s` }}
              >
                <div
                  onMouseMove={spot}
                  className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    isOpen
                      ? "border-white bg-white text-neutral-900 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.55)]"
                      : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/15"
                  }`}
                >
                  {/* cursor spotlight (closed state) */}
                  {!isOpen && (
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 60%)",
                      }}
                    />
                  )}
                  {/* accent bar */}
                  <span
                    className={`absolute left-0 top-0 w-1.5 rounded-r-full bg-primary transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      isOpen ? "h-full opacity-100" : "h-0 opacity-0"
                    }`}
                  />

                  <h3 className="relative">
                    <button
                      id={bId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={pId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary sm:gap-6 sm:px-8 sm:py-6"
                    >
                      <span
                        className={`font-outfit hidden w-8 shrink-0 text-sm font-semibold transition-colors duration-500 sm:block ${
                          isOpen ? "text-primary" : "text-white/55"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-outfit flex-1 text-lg font-semibold leading-snug sm:text-xl">
                        {f.q}
                      </span>

                      {/* plus -> minus icon */}
                      <span
                        className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                          isOpen
                            ? "rotate-180 bg-primary text-white"
                            : "bg-white text-primary group-hover:scale-110"
                        }`}
                        aria-hidden="true"
                      >
                        <span className="absolute h-[2px] w-4 rounded-full bg-current" />
                        <span
                          className={`absolute h-4 w-[2px] rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>

                  {/* smooth height animation via grid rows */}
                  <div
                    id={pId}
                    role="region"
                    aria-labelledby={bId}
                    className={`relative grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`font-figtree px-6 pb-6 text-base leading-relaxed text-neutral-600 transition-all duration-500 sm:pb-7 sm:pl-[5.25rem] sm:pr-8 sm:text-lg ${
                          isOpen
                            ? "translate-y-0 opacity-100 delay-100"
                            : "-translate-y-2 opacity-0"
                        }`}
                      >
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
