"use client";

import { useEffect, useRef, useState } from "react";

const CTA_LINK = "#apply";
const FEE = 29999;
const START = 100000; // price counts down from ₹1,00,000

const INCLUDED = [
  "5–6 Month Full Stack Development Program",
  "MERN / Java / Python Full Stack Track",
  "DSA & Pattern-Based Problem Solving",
  "Real-World Software Development Projects",
  "Personalized 1:1 Mentorship",
  "Code Reviews & Technical Feedback",
  "Mock Interviews & Career Guidance",
  "AI Tools & Modern Development Concepts",
];

const STEPS = ["Apply", "1:1 Evaluation", "Program Discussion", "Enrollment"];

const rupees = (n) => new Intl.NumberFormat("en-IN").format(n);

export default function Pricing() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [amount, setAmount] = useState(START);

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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // count the fee up once the section is in view
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAmount(FEE);
      return;
    }
    let raf;
    const start = performance.now() + 500; // wait for the card to appear
    const dur = 1700;
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / dur, 0), 1);
      setAmount(Math.round(START - (START - FEE) * (1 - Math.pow(1 - t, 4))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen]);

  return (
    <section
      id="pricing"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-b from-white via-[#fdf4f4] to-white text-neutral-900 ${
        seen ? "is-inview" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="bl-float absolute -right-40 bottom-10 h-[32rem] w-[32rem] rounded-full bg-primary-light/10 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(181,18,27,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse at 75% 35%, black 0%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 75% 35%, black 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        {/* heading */}
        <div className="max-w-3xl">
          <div
            className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-dark shadow-sm backdrop-blur"
            style={{ "--d": "0s" }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Your Investment in Skills
          </div>
          <h2
            className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ "--d": "0.12s" }}
          >
            One Structured Program. Practical Learning &amp; Mentorship.
          </h2>
        </div>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ===== What's included ===== */}
          <div
            className="bl-in-up rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-[0_30px_70px_-35px_rgba(143,16,24,0.35)] sm:p-10"
            style={{ "--d": "0.3s" }}
          >
            <h3 className="font-outfit text-2xl font-semibold sm:text-3xl">
              What&apos;s Included?
            </h3>
            <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {INCLUDED.map((item, i) => (
                <li
                  key={item}
                  className="bl-in-up group flex items-start gap-3.5"
                  style={{ "--d": `${0.5 + i * 0.1}s` }}
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition group-hover:scale-110 group-hover:bg-primary-dark">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <span className="font-figtree text-base leading-snug text-neutral-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Price card ===== */}
          <div
            className="bl-in-up lg:sticky lg:top-28"
            style={{ "--d": "0.45s" }}
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-primary-dark p-8 text-white shadow-[0_40px_90px_-30px_rgba(143,16,24,0.8)] sm:p-10">
              <div className="bl-float pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-light/60 blur-[80px]" />
              <div className="bl-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span
                className="font-outfit pointer-events-none absolute -bottom-8 -right-2 select-none text-[9rem] font-bold leading-none text-white/[0.07]"
                aria-hidden="true"
              >
                {"</>"}
              </span>

              <div className="relative">
                <p className="font-figtree text-sm font-medium text-white/80">
                  Program Fee
                </p>
                <p
                  className="font-outfit mt-2 text-6xl font-bold leading-none tracking-tight tabular-nums sm:text-7xl"
                  aria-label={`₹${rupees(FEE)}`}
                >
                  <span aria-hidden="true">₹{rupees(amount)}</span>
                </p>
                <p className="font-outfit mt-4 text-lg font-medium text-white/90">
                  Full Stack Development Mentorship Program
                </p>

                <div className="my-7 h-px w-full bg-white/25" />

                <a
                  href={CTA_LINK}
                  className="font-outfit group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-base font-semibold text-primary-dark shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Apply for Mentorship Evaluation
                  <svg
                    className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
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
          </div>
        </div>

        {/* ===== How to join ===== */}
        <div className="mt-20 lg:mt-24">
          <h3
            className="bl-in-up font-outfit text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ "--d": "0.4s" }}
          >
            How to Join
          </h3>

          <ol className="mt-10 grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <li
                  key={s}
                  className="relative flex items-center gap-5 md:flex-col md:items-start md:gap-5"
                >
                  {/* desktop connector */}
                  {!last && (
                    <span
                      className="bl-in-line absolute left-12 top-6 hidden h-px bg-gradient-to-r from-primary to-primary/25 md:block"
                      style={{
                        "--d": `${0.8 + i * 0.4}s`,
                        width: "calc(100% + 1.5rem - 3rem)",
                      }}
                    />
                  )}
                  {/* mobile connector */}
                  {!last && (
                    <span
                      className="bl-in-line-y absolute left-6 top-12 -ml-px h-[calc(100%+2rem-3rem)] w-px bg-primary/40 md:hidden"
                      style={{ "--d": `${0.8 + i * 0.4}s` }}
                    />
                  )}

                  <span
                    className={`bl-in-pop font-outfit relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-white ${
                      last
                        ? "bg-primary-dark ring-8 ring-primary/15"
                        : "bg-primary"
                    }`}
                    style={{ "--d": `${0.7 + i * 0.4}s` }}
                  >
                    {i + 1}
                  </span>
                  <p
                    className="bl-in-up font-outfit text-xl font-semibold"
                    style={{ "--d": `${0.85 + i * 0.4}s` }}
                  >
                    {s}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
