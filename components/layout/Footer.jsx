"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Update these links to your real pages */
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
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
    <footer
      ref={ref}
      className={`relative isolate overflow-hidden bg-linear-to-br from-primary-dark via-primary to-primary-dark text-white ${
        seen ? "is-inview" : ""
      }`}
    >
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bl-float absolute -left-40 -top-40 h-120 w-120 rounded-full bg-primary-light/45 blur-[120px]" />
        <div
          className="bl-float absolute -bottom-52 right-0 h-120 w-120 rounded-full bg-black/35 blur-[130px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse at 20% 10%, black 10%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 20% 10%, black 10%, transparent 70%)",
          }}
        />
        {/* giant wordmark */}
        <p
          className="font-outfit absolute bottom-[-0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[19vw] font-bold leading-none tracking-tight text-white/6"
          aria-hidden="true"
        >
          BALA LABS
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          {/* brand */}
          <div>
            <div
              className="bl-in-up flex items-center gap-4"
              style={{ "--d": "0s" }}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_14px_40px_-14px_rgba(0,0,0,0.6)]">
                <Image
                  src="/logo.png"
                  alt="Bala Labs logo"
                  width={56}
                  height={60}
                  className="h-full w-auto"
                />
              </span>
              <div>
                <p className="font-outfit text-2xl font-bold tracking-wide sm:text-3xl">
                  BALA LABS
                </p>
                <p className="font-figtree text-sm text-white/75 sm:text-base">
                  Software Products &amp; Developer Mentorship
                </p>
              </div>
            </div>

            <p
              className="bl-in-up font-outfit mt-8 max-w-md text-2xl font-medium leading-snug sm:text-3xl"
              style={{ "--d": "0.15s" }}
            >
              Building software products that solve real problems.
            </p>

            <a
              href="https://www.balalabs.in"
              target="_blank"
              rel="noopener noreferrer"
              className="bl-in-up font-outfit group mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-base font-medium backdrop-blur transition hover:bg-white hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              style={{ "--d": "0.3s" }}
            >
              www.balalabs.in
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M8 7h9v9" />
              </svg>
            </a>
          </div>

          {/* links */}
          <nav aria-label="Footer" className="lg:justify-self-end">
            <ul className="space-y-1">
              {LINKS.map((l, i) => (
                <li
                  key={l.label}
                  className="bl-in-up"
                  style={{ "--d": `${0.2 + i * 0.1}s` }}
                >
                  <Link
                    href={l.href}
                    className="font-outfit group flex items-center justify-between gap-10 border-b border-white/15 py-4 text-xl font-medium transition hover:border-white/50 sm:text-2xl lg:min-w-88"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      {l.label}
                    </span>
                    <svg
                      className="h-5 w-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
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
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div
          className="bl-in-up mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/20 pt-6 sm:flex-row sm:items-center"
          style={{ "--d": "0.6s" }}
        >
          <p className="font-figtree text-sm text-white/75">
            © {new Date().getFullYear()} Bala Labs. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-outfit group inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium transition hover:bg-white hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Back to top
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* space so the giant wordmark isn't cut off by the content */}
      <div className="h-16 sm:h-24 lg:h-32" aria-hidden="true" />
    </footer>
  );
}