/** Sends a booking-request notification to the staff Telegram chat.
 *  Fails soft by design: the lead is already saved to the DB by the caller,
 *  so a Telegram outage must never break the form. */

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export interface LeadNotification {
  name: string;
  phone?: string | null;
  email?: string | null;
  tour?: string | null;
  message?: string | null;
}

export async function notifyLeadViaTelegram(lead: LeadNotification): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[telegram] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set, skipping notification");
    return false;
  }

  const lines = [
    "<b>Новая заявка с сайта</b>",
    "",
    `<b>Имя:</b> ${esc(lead.name)}`,
    lead.phone ? `<b>Телефон:</b> ${esc(lead.phone)}` : null,
    lead.email ? `<b>Email:</b> ${esc(lead.email)}` : null,
    lead.tour ? `<b>Тур:</b> ${esc(lead.tour)}` : null,
    lead.message ? `\n${esc(lead.message)}` : null,
  ].filter((line): line is string => line !== null);

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "HTML" }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error("[telegram] sendMessage failed:", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("[telegram] sendMessage error:", err);
    return false;
  }
}
