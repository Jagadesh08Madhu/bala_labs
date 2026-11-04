"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

const BACKGROUNDS = [
  "Non-IT Working Professional",
  "IT Support / Testing",
  "Software Developer",
  "Other",
];
const GOALS = [
  "Switch from Non-IT to Development",
  "Move from Support / Testing to Development",
  "Upskill as a Developer",
  "Other",
];
const TRACKS = [
  "MERN Full Stack",
  "Java Full Stack",
  "Python Full Stack",
  "Need Guidance",
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  background: "",
  goal: "",
  track: "",
  botcheck: "", // honeypot – real users never fill this
};

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  const digits = v.phone.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{10,14}$/.test(digits))
    e.phone = "Enter a valid WhatsApp number (10 digits).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  if (!v.background) e.background = "Please choose one option.";
  if (!v.goal) e.goal = "Please choose one option.";
  if (!v.track) e.track = "Please choose one option.";
  return e;
}

const TextField = forwardRef(function TextField({ id, label, error, ...props }, ref) {
  return (
    <div>
      <label htmlFor={id} className="font-outfit text-sm font-semibold text-neutral-800">
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`font-figtree mt-2 w-full rounded-2xl border bg-neutral-50 px-4 py-3.5 text-base text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:bg-white focus:ring-4 ${
          error
            ? "border-primary ring-primary/10 focus:border-primary focus:ring-primary/15"
            : "border-neutral-200 focus:border-primary focus:ring-primary/15"
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-err`} className="font-figtree mt-1.5 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
});

function OptionGroup({ legend, name, options, value, onChange, error }) {
  return (
    <fieldset>
      <legend className="font-outfit text-sm font-semibold text-neutral-800">
        {legend}
      </legend>
      <div className="mt-2.5 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
            />
            <span className="font-figtree inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-[0.95rem] text-neutral-700 transition hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-primary/25">
              {value === o && (
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              )}
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && <p className="font-figtree mt-1.5 text-sm text-primary">{error}</p>}
    </fieldset>
  );
}

export default function Apply() {
  const ref = useRef(null);
  const nameRef = useRef(null);
  const [seen, setSeen] = useState(false);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

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

  const set = (k) => (val) => {
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const goToForm = (e) => {
    e.preventDefault();
    document
      .getElementById("application-form")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;
    if (values.botcheck) return; // bot
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    const data = {
      name: values.name.trim(),
      whatsapp: values.phone.trim(),
      email: values.email.trim(),
      background: values.background,
      goal: values.goal,
      track: values.track,
    };

    // 1) email via Web3Forms (browser submission)
    const mail = fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        subject: `New Mentorship Application – ${data.name}`,
        from_name: "Bala Labs Website",
        name: data.name,
        email: data.email,
        whatsapp_number: data.whatsapp,
        current_background: data.background,
        career_goal: data.goal,
        preferred_track: data.track,
        botcheck: "",
      }),
    })
      .then((r) => r.json())
      .then((j) => j.success === true)
      .catch(() => false);

    // 2) save to the Excel file through our own API route (secrets stay on the server)
    const sheet = fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, botcheck: values.botcheck }),
    })
      .then((r) => r.ok)
      .catch(() => false);

    const [mailOk, sheetOk] = await Promise.all([mail, sheet]);
    if (!mailOk) console.error("Web3Forms email failed");
    if (!sheetOk) console.error("Saving to Excel failed");

    // the lead is safe if at least one channel worked
    if (mailOk || sheetOk) {
      setStatus("success");
      setValues(EMPTY);
    } else {
      setStatus("error");
    }
  }

  return (
    <section
      id="apply"
      ref={ref}
      className={`relative isolate overflow-hidden bg-gradient-to-b from-white via-[#fdf4f4] to-white text-neutral-900 ${
        seen ? "is-inview" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 lg:py-28">
        <div
          className="bl-in-up relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-primary-dark p-6 text-white shadow-[0_50px_110px_-40px_rgba(143,16,24,0.85)] sm:p-10 lg:p-14"
          style={{ "--d": "0s" }}
        >
          {/* backdrop inside the red panel */}
          <div className="pointer-events-none absolute inset-0">
            <div className="bl-float absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-primary-light/60 blur-[110px]" />
            <div
              className="bl-float absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-black/30 blur-[120px]"
              style={{ animationDelay: "-8s" }}
            />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "64px 64px",
                maskImage:
                  "radial-gradient(ellipse at 20% 30%, black 10%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at 20% 30%, black 10%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            {/* ===== Final CTA copy ===== */}
            <div>
              <div
                className="bl-in-up font-figtree inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
                style={{ "--d": "0.2s" }}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
                Your Next Step Starts Here
              </div>
              <h2
                className="bl-in-up font-outfit mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
                style={{ "--d": "0.32s" }}
              >
                Ready to Build Your Software Development Skills?
              </h2>
              <p
                className="bl-in-up font-figtree mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
                style={{ "--d": "0.44s" }}
              >
                Whether you&apos;re transitioning into software development or
                preparing for your next career opportunity, start with
                structured learning, practical projects, and personalized
                mentorship.
              </p>

              <div className="font-outfit mt-8 space-y-1 text-4xl font-bold leading-[1.05] sm:text-5xl" aria-label="Learn. Build. Improve. Grow.">
                {["Learn.", "Build.", "Improve.", "Grow."].map((w, i) => (
                  <p
                    key={w}
                    className="bl-in-up"
                    style={{
                      "--d": `${0.6 + i * 0.18}s`,
                      opacity: undefined,
                      color: `rgba(255,255,255,${1 - i * 0.2})`,
                    }}
                    aria-hidden="true"
                  >
                    {w}
                  </p>
                ))}
              </div>

              <a
                href="#application-form"
                onClick={goToForm}
                className="bl-in-up font-outfit group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-primary-dark shadow-[0_14px_40px_-12px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                style={{ "--d": "1.4s" }}
              >
                Apply for Mentorship Evaluation
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            {/* ===== Application form ===== */}
            <div
              id="application-form"
              className="bl-in-up scroll-mt-24 rounded-[2rem] bg-white p-6 text-neutral-900 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.55)] sm:p-9"
              style={{ "--d": "0.5s" }}
            >
              {status === "success" ? (
                <div className="flex min-h-[28rem] flex-col items-center justify-center text-center" role="status">
                  <svg className="h-24 w-24" viewBox="0 0 52 52" fill="none" aria-hidden="true">
                    <circle className="bl-draw" cx="26" cy="26" r="23" stroke="var(--color-primary)" strokeWidth="3" />
                    <path className="bl-draw bl-draw-late" d="M15 27l8 8 14-16" stroke="var(--color-primary)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-outfit mt-7 max-w-sm text-2xl font-semibold leading-snug">
                    Thank you for applying!
                  </p>
                  <p className="font-figtree mt-3 max-w-sm text-base leading-relaxed text-neutral-600">
                    Our team will review your details and contact you regarding
                    the next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <div>
                    <span className="font-figtree inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Application Form
                    </span>
                    <h3 className="font-outfit mt-3 text-2xl font-semibold sm:text-3xl">
                      Apply for Bala Labs Mentorship
                    </h3>
                    <p className="font-figtree mt-1.5 text-base text-neutral-600">
                      Tell us about your current background and career goals.
                    </p>
                  </div>

                  {/* honeypot */}
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.botcheck}
                    onChange={(e) => set("botcheck")(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <TextField
                    id="name"
                    ref={nameRef}
                    label="Full Name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={values.name}
                    onChange={(e) => set("name")(e.target.value)}
                    error={errors.name}
                  />
                  <div className="grid gap-6 sm:grid-cols-2">
                    <TextField
                      id="phone"
                      label="WhatsApp Number"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="98765 43210"
                      value={values.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      error={errors.phone}
                    />
                    <TextField
                      id="email"
                      label="Email Address"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => set("email")(e.target.value)}
                      error={errors.email}
                    />
                  </div>

                  <OptionGroup legend="Current Background" name="background" options={BACKGROUNDS} value={values.background} onChange={set("background")} error={errors.background} />
                  <OptionGroup legend="Career Goal" name="goal" options={GOALS} value={values.goal} onChange={set("goal")} error={errors.goal} />
                  <OptionGroup legend="Preferred Track" name="track" options={TRACKS} value={values.track} onChange={set("track")} error={errors.track} />

                  {status === "error" && (
                    <p role="alert" className="font-figtree rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary-dark">
                      Something went wrong while sending your application. Please try again in a moment.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="font-outfit group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-[0_14px_34px_-10px_rgba(181,18,27,0.7)] transition hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-80 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Request Mentorship Evaluation
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}