"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { notifyLeadViaTelegram } from "@/lib/telegram";

export interface LeadFormState {
  ok: boolean;
  error?: string;
}

// Per-instance flood brake: 5 submissions per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const submissions = new Map<string, { count: number; since: number }>();

function tooMany(ip: string): boolean {
  const rec = submissions.get(ip);
  const now = Date.now();
  if (!rec || now - rec.since > WINDOW_MS) {
    submissions.set(ip, { count: 1, since: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

const cap = (v: FormDataEntryValue | null, max: number) => String(v ?? "").trim().slice(0, max);

export async function submitLead(_prev: LeadFormState | null, formData: FormData): Promise<LeadFormState> {
  // Honeypot: real visitors never see or fill this field.
  if (String(formData.get("website") ?? "") !== "") return { ok: true };

  const name = cap(formData.get("name"), 100);
  const phone = cap(formData.get("phone"), 40);
  const email = cap(formData.get("email"), 200);
  const tour = cap(formData.get("tour"), 200);
  const message = cap(formData.get("message"), 2000);

  if (name.length < 2 || (!phone && !email)) return { ok: false, error: "invalid" };

  const ip = ((await headers()).get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (tooMany(ip)) return { ok: false, error: "rate" };

  try {
    await prisma.lead.create({
      data: {
        name,
        phone: phone || null,
        email: email || null,
        tour: tour || null,
        message: message || null,
      },
    });
  } catch (err) {
    console.error("[lead] DB write failed:", err);
    return { ok: false, error: "db" };
  }

  // Lead is safely stored; notification failure must not surface to the visitor.
  await notifyLeadViaTelegram({ name, phone, email, tour, message });
  return { ok: true };
}
