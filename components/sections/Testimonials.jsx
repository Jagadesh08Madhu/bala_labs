"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   REPLACE the placeholder entries below with your real learners.
   Use only genuine students and details they have confirmed.
   youtubeUrl accepts: watch?v=..., youtu.be/..., /shorts/..., /embed/...
------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    name: "Student Name",
    role: "Role",
    company: "Company",
    package: "– LPA",
    cameFrom: "Background",
    youtubeUrl: "",
  },
  {
    name: "Student Name",
    role: "Role",
    company: "Company",
    package: "– LPA",
    cameFrom: "Background",
    youtubeUrl: "",
  },
  {
    name: "Student Name",
    role: "Role",
    company: "Company",
    package: "– LPA",
    cameFrom: "Background",
    youtubeUrl: "",
  },
  {
    name: "Student Name",
    role: "Role",
    company: "Company",
    package: "– LPA",
    cameFrom: "Background",
    youtubeUrl: "",
  },
];

const AUTOPLAY_MS = 4500; // time between automatic slides
const HOLD_MS = 9000; // pause after a manual interaction

function getYouTubeId(url = "") {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{11})/
  );
  return m ? m[1] : null;
}

function Lanyard() {
  return (
    <svg
      viewBox="0 0 120 90"
      className="mx-auto -mb-5 h-[5.5rem] w-[7.5rem]"
      aria-hidden="true"
    >
      <polygon points="6,0 28,0 68,76 56,76" fill="var(--color-primary-dark)" />
      <polygon points="114,0 92,0 52,76 64,76" fill="var(--color-primary)" />
      <line x1="17" y1="0" x2="62" y2="76" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="103" y1="0" x2="58" y2="76" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" strokeDasharray="3 3" />
      <rect x="46" y="72" width="28" height="14" rx="4" fill="#e4e4e7" stroke="#a1a1aa" />
    </svg>
  );
}

function Barcode() {
  return (
    <div
      className="h-6 w-[4.5rem]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg,#171717 0 2px,transparent 2px 4px,#171717 4px 5px,transparent 5px 8px,#171717 8px 11px,transparent 11px 13px)",
      }}
      aria-hidden="true"
    />
  );
}

export default function Testimonials() {
  const n = TESTIMONIALS.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [seen, setSeen] = useState(false);

  const sectionRef = useRef(null);
  const inViewRef = useRef(false);
  const hoverRef = useRef(false);
  const holdUntil = useRef(0);
  const playingRef = useRef(null);
  const reduceRef = useRef(false);
  const touchX = useRef(null);

  playingRef.current = playing;

  // in-view detection (animation once, autoplay only while visible)
  useEffect(() => {
    reduceRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        inViewRef.current = e.isIntersecting;
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // automatic scrolling
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => {
      if (
        reduceRef.current ||
        !inViewRef.current ||
        hoverRef.current ||
        playingRef.current !== null ||
        Date.now() < holdUntil.current
      )
        return;
      setActive((a) => (a + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [n]);

  const hold = () => {
    holdUntil.current = Date.now() + HOLD_MS;
  };
  const goTo = (i) => {
    hold();
    setPlaying(null);
    setActive(((i % n) + n) % n);
  };
  const step = (dir) => goTo(active + dir);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
    hold();
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  const offsetOf = (i) => {
    const half = Math.floor(n / 2);
    return ((i - active + n + half) % n) - half;
  };

  return (
    <section
      id="results"
      ref={sectionRef}
      className={`relative isolate overflow-hidden bg-gradient-to-b from-white via-[#fdf4f4] to-white text-neutral-900 ${
        seen ? "is-inview" : ""
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(rgba(181,18,27,0.18) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse at 50% 55%, black 0%, transparent 60%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 55%, black 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        {/* heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div
            className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary-dark shadow-sm backdrop-blur"
            style={{ "--d": "0s" }}
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Real Learners. Real Experiences.
          </div>
          <h2
            className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl"
            style={{ "--d": "0.12s" }}
          >
            See What Our Learners Have to Say.
          </h2>
          <p
            className="bl-in-up font-figtree mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg"
            style={{ "--d": "0.24s" }}
          >
            Hear directly from Bala Labs learners about their training
            experience, projects, and career progress.
          </p>
        </div>

        {/* carousel */}
        <div
          className="bl-in-up mt-14"
          style={{ "--d": "0.4s" }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Student video testimonials"
          onPointerEnter={() => (hoverRef.current = true)}
          onPointerLeave={() => (hoverRef.current = false)}
          onFocusCapture={() => (hoverRef.current = true)}
          onBlurCapture={() => (hoverRef.current = false)}
        >
          <div
            className="relative mx-auto h-[41rem] max-w-5xl [--step:0px] sm:[--step:19rem]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {TESTIMONIALS.map((t, i) => {
              const d = offsetOf(i);
              const isCenter = d === 0;
              const visible = Math.abs(d) <= 1;
              const id = getYouTubeId(t.youtubeUrl);
              const isPlaying = playing === i && isCenter;

              return (
                <div
                  key={i}
                  className={`absolute left-1/2 top-0 -ml-[8.9rem] w-[17.8rem] transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] ${
                    isCenter
                      ? "opacity-100"
                      : visible
                      ? "cursor-pointer opacity-50 saturate-50 max-sm:pointer-events-none max-sm:opacity-0"
                      : "pointer-events-none opacity-0"
                  }`}
                  style={{
                    transform: `translateX(calc(var(--step) * ${d})) scale(${
                      isCenter ? 1 : 0.86
                    })`,
                    zIndex: 10 - Math.abs(d),
                  }}
                  aria-hidden={!isCenter}
                  onClick={() => !isCenter && visible && goTo(i)}
                >
                  {/* <Lanyard /> */}
                  <article className="overflow-hidden rounded-[1.6rem] border border-neutral-200 bg-white shadow-[0_30px_60px_-25px_rgba(143,16,24,0.5)]">
                    {/* colour strip */}
                    <div className="flex h-2">
                      <span className="flex-[3] bg-primary" />
                      <span className="flex-[2] bg-primary-light" />
                      <span className="flex-[3] bg-primary-dark" />
                    </div>

                    <div className="px-3.5 pb-4 pt-3">
                      <div className="mx-auto h-2 w-14 rounded-full bg-neutral-200" />
                      <p className="font-outfit mt-3 text-center text-xs font-semibold tracking-[0.18em] text-primary-dark">
                        {t.company}
                      </p>

                      {/* video */}
                      <div className="relative mt-3 aspect-[4/5] overflow-hidden rounded-2xl bg-primary-dark">
                        {isPlaying && id ? (
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
                            title={`${t.name} – student testimonial`}
                            allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
                            allowFullScreen
                          />
                        ) : (
                          <button
                            type="button"
                            tabIndex={isCenter ? 0 : -1}
                            disabled={!isCenter}
                            onClick={() => id && setPlaying(i)}
                            aria-label={`Play ${t.name}'s video testimonial`}
                            className="group absolute inset-0 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                            style={{
                              backgroundImage:
                                "linear-gradient(160deg, var(--color-primary-light), var(--color-primary) 50%, var(--color-primary-dark))",
                            }}
                          >
                            {id && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                                alt=""
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            )}
                            <span className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />
                            <span className="relative flex items-center justify-center">
                              {isCenter && (
                                <span className="bl-ring absolute h-16 w-16 rounded-full bg-primary/60" />
                              )}
                              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-xl ring-4 ring-white/70 transition group-hover:scale-110">
                                <svg
                                  className="ml-0.5 h-7 w-7"
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

                      <h3 className="font-outfit mt-4 text-center text-lg font-semibold">
                        {t.name}
                      </h3>
                      <p className="font-figtree text-center text-sm text-neutral-500">
                        {t.role}
                      </p>

                      <div className="font-figtree mt-4 grid grid-cols-2 gap-3 border-t border-dashed border-neutral-300 pt-3 text-sm">
                        <div>
                          <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-neutral-500">
                            PACKAGE
                          </p>
                          <p className="mt-0.5 font-semibold text-neutral-900">
                            {t.package}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[0.65rem] font-semibold tracking-[0.14em] text-neutral-500">
                            CAME FROM
                          </p>
                          <p className="mt-0.5 font-semibold text-neutral-900">
                            {t.cameFrom}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <Barcode />
                        <p className="font-figtree text-[0.7rem] text-neutral-400">
                          Trained at Bala Labs
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-2 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === active}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-7 bg-primary"
                      : "w-2 bg-neutral-300 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
