"use server";

import { prisma } from "@/lib/db";
import { allowHit, clientIp } from "@/lib/rate-limit";
import { notifyLeadViaTelegram } from "@/lib/telegram";

export interface LeadFormState {
  ok: boolean;
  error?: string;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

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

  const ip = await clientIp();
  if (!(await allowHit(`lead:${ip}`, MAX_PER_WINDOW, WINDOW_MS))) {
    return { ok: false, error: "rate" };
  }

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
