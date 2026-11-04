
import { NextResponse } from "next/server";
import { saveToGoogleSheets } from "@/lib/saveToGoogleSheets";

export const runtime = "nodejs";

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

const clean = (value, maxLength = 200) =>
  String(value ?? "").trim().slice(0, maxLength);

export async function POST(request) {
  try {
    const body = await request.json();

    // Ignore bot submissions
    if (body.botcheck) {
      return NextResponse.json({ ok: true });
    }

    const data = {
      name: clean(body.name, 100),
      whatsapp: clean(body.whatsapp, 20),
      email: clean(body.email, 120),
      background: clean(body.background),
      goal: clean(body.goal),
      track: clean(body.track),
    };

    const phone = data.whatsapp.replace(/[\s\-()]/g, "");

    const isValid =
      data.name.length >= 2 &&
      /^\+?\d{10,14}$/.test(phone) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) &&
      BACKGROUNDS.includes(data.background) &&
      GOALS.includes(data.goal) &&
      TRACKS.includes(data.track);

    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: "Invalid application details" },
        { status: 400 }
      );
    }

    await saveToGoogleSheets(data);

    return NextResponse.json({
      ok: true,
      message: "Application saved successfully",
    });
  } catch (error) {
    console.error("Google Sheets application error:", error);

    return NextResponse.json(
      { ok: false, error: "Unable to save application" },
      { status: 500 }
    );
  }
}
