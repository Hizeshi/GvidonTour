/** Sends staff notifications to Telegram (new leads, new reviews awaiting
 *  moderation). Fails soft by design: the record is already saved to the
 *  DB by the caller, so a Telegram outage must never break a form. */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set, skipping notification");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("[telegram] sendMessage failed:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("[telegram] sendMessage error:", err);
    return false;
  }
}

export interface LeadNotification {
  name: string;
  phone?: string | null;
  email?: string | null;
  tour?: string | null;
  message?: string | null;
}

export async function notifyLeadViaTelegram(lead: LeadNotification): Promise<boolean> {
  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${esc(lead.name)}`,
    lead.phone ? `<b>Телефон:</b> ${esc(lead.phone)}` : null,
    lead.email ? `<b>Email:</b> ${esc(lead.email)}` : null,
    lead.tour ? `<b>Тур:</b> ${esc(lead.tour)}` : null,
    lead.message ? `\n${esc(lead.message)}` : null,
  ].filter((line): line is string => line !== null);

  return sendTelegramMessage(lines.join("\n"));
}

export interface ReviewNotification {
  author: string;
  rating: number;
  text: string;
}

export async function notifyReviewPendingViaTelegram(review: ReviewNotification): Promise<boolean> {
  const lines = [
    "<b>Новый отзыв ждёт модерации</b>",
    "",
    `<b>Автор:</b> ${esc(review.author)}`,
    `<b>Оценка:</b> ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`,
    "",
    esc(review.text),
    "",
    "Опубликовать: /admin/reviews",
  ];

  return sendTelegramMessage(lines.join("\n"));
}
