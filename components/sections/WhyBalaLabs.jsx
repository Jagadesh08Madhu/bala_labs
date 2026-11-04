"use client";

import { useEffect, useRef, useState } from "react";

/* ---------------- Edit these ---------------- */
const FOUNDER = {
  name: "Founder Name", // replace with the real name
  role: "Founder, Bala Labs", // replace if needed
  photo: "", // e.g. "/founder.jpg" (put the file in /public)
  bio: "", // optional 1–2 line introduction; hidden when empty
};
/* ------------------------------------------- */

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Icon({ children }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
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

function Card({ className = "", delay, icon, title, text, index }) {
  return (
    <div
      onMouseMove={spot}
      className={`bl-in-up group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-[0_20px_50px_-35px_rgba(143,16,24,0.5)] transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_28px_60px_-30px_rgba(181,18,27,0.5)] sm:p-8 ${className}`}
      style={{ "--d": delay }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(181,18,27,0.08), transparent 60%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <Icon>{icon}</Icon>
          <span className="font-outfit text-sm font-semibold text-neutral-300 transition group-hover:text-primary">
            0{index}
          </span>
        </div>
        <h3 className="font-outfit mt-6 text-xl font-semibold leading-snug sm:text-2xl">
          {title}
        </h3>
        <p className="font-figtree mt-2 text-base leading-relaxed text-neutral-600">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function WhyBalaLabs() {
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
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="why-bala-labs"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-b from-white via-[#fdf4f4] to-white text-neutral-900 ${
        seen ? "is-inview" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute -left-40 top-24 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="bl-float absolute -right-40 bottom-24 h-[32rem] w-[32rem] rounded-full bg-primary-light/10 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(181,18,27,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse at 20% 15%, black 0%, transparent 55%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 15%, black 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        {/* heading */}
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <div
              className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-dark shadow-sm backdrop-blur"
              style={{ "--d": "0s" }}
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              Software Products &amp; Developer Mentorship
            </div>
            <h2
              className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ "--d": "0.12s" }}
            >
              We Build Software.
              <span className="block text-primary">We Mentor Developers.</span>
            </h2>
          </div>
          <p
            className="bl-in-up font-figtree text-base leading-relaxed text-neutral-600 sm:text-lg"
            style={{ "--d": "0.26s" }}
          >
            Bala Labs is a software product development company focused on
            building practical digital solutions and helping developers
            strengthen their technical skills.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
          {/* ===== What makes us different ===== */}
          <div>
            <p
              className="bl-in-up font-outfit text-lg font-semibold"
              style={{ "--d": "0.4s" }}
            >
              What Makes Us Different?
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Card
                index={1}
                delay="0.5s"
                title="Development-Focused Learning"
                text="Learn how real software applications are built."
                icon={<path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />}
              />
              <Card
                index={2}
                delay="0.65s"
                title="Practical Project Experience"
                text="Work on development tasks and apply your skills."
                icon={
                  <>
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M8 12l3 3 5-6" />
                  </>
                }
              />
              <Card
                index={3}
                delay="0.8s"
                title="Personalized 1:1 Mentorship"
                text="Get technical guidance and feedback."
                icon={
                  <>
                    <circle cx="9" cy="7" r="4" />
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                }
              />

              {/* 5 students per batch — featured */}
              <div
                className="bl-in-up group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark p-7 text-white shadow-[0_30px_70px_-30px_rgba(143,16,24,0.8)] transition duration-300 hover:-translate-y-1 sm:row-span-2 sm:p-8"
                style={{ "--d": "0.95s" }}
              >
                <div className="bl-float pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-light/60 blur-[70px]" />
                <div className="relative flex h-full flex-col">
                  <span className="font-outfit text-sm font-semibold text-white/60">
                    04
                  </span>
                  <p className="font-outfit mt-4 text-[7rem] font-bold leading-none tracking-tight sm:text-[9rem]">
                    5
                  </p>
                  <h3 className="font-outfit mt-2 text-2xl font-semibold">
                    Students per batch
                  </h3>
                  <p className="font-figtree mt-3 text-base leading-relaxed text-white/80">
                    Learn in a small batch with more personalized attention and
                    guidance.
                  </p>

                  <div className="mt-auto flex items-center gap-2 pt-8" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <span
                        key={n}
                        className="bl-in-pop flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-white text-primary"
                        style={{
                          "--d": `${1.3 + n * 0.15}s`,
                          marginLeft: n ? "-0.6rem" : 0,
                        }}
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M4 21a8 8 0 0 1 16 0z" />
                        </svg>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Card
                index={5}
                delay="1.1s"
                title="Code Reviews & Improvements"
                text="Learn to write and improve better-quality code."
                icon={
                  <>
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="9" r="3" />
                    <path d="M6 9v6M18 12v1a3 3 0 0 1-3 3h-3" />
                  </>
                }
              />
            </div>
          </div>

          {/* ===== Meet your mentor ===== */}
          <div
            className="bl-in-up lg:sticky lg:top-28"
            style={{ "--d": "0.6s" }}
          >
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-primary-dark p-6 text-white shadow-[0_40px_90px_-30px_rgba(143,16,24,0.8)] sm:p-8">
              <div className="bl-float pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary-light/50 blur-[80px]" />
              <span
                className="font-outfit pointer-events-none absolute -bottom-10 -right-2 select-none text-[10rem] font-bold leading-none text-white/[0.06]"
                aria-hidden="true"
              >
                {"</>"}
              </span>

              <div className="relative">
                <h3 className="font-outfit text-2xl font-semibold sm:text-3xl">
                  Meet Your Mentor
                </h3>
                <p className="font-figtree mt-2 text-base text-white/80">
                  Learn with guidance from a practicing software developer.
                </p>

                {/* photo */}
                <div className="relative mt-7">
                  <div className="absolute -inset-2 rounded-[1.75rem] border border-white/25" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary-light to-primary-dark">
                    {FOUNDER.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={FOUNDER.photo}
                        alt={FOUNDER.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-outfit text-[9rem] font-bold text-white/30">
                          B
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md">
                      <p className="font-outfit text-lg font-semibold">
                        {FOUNDER.name}
                      </p>
                      <p className="font-figtree text-sm text-white/80">
                        {FOUNDER.role}
                      </p>
                    </div>
                  </div>
                </div>

                {FOUNDER.bio && (
                  <p className="font-figtree mt-6 text-base leading-relaxed text-white/85">
                    {FOUNDER.bio}
                  </p>
                )}

                <div className="mt-7 flex gap-3 border-t border-white/25 pt-6">
                  <span
                    className="font-outfit text-5xl font-bold leading-none text-white/40"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <p className="font-outfit text-xl font-medium leading-snug">
                    Building software products that solve real problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
