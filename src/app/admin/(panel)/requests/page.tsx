import type { Metadata } from "next";
import { Check, Inbox, Trash2, Undo2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { cx, ui } from "@/lib/ui";
import { deleteLead, toggleLeadStatus } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Заявки" };

const dateFmt = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

export default async function AdminRequestsPage() {
  let leads;
  try {
    leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 200 });
  } catch {
    leads = null;
  }

  return (
    <div>
      <h1 className={cx(ui.serif, "text-[28px]")}>Заявки</h1>
      <p className="mt-2 text-[14.5px] text-content/60">
        Обращения с формы на сайте. Новые дублируются в Telegram.
      </p>

      {leads === null ? (
        <p className="mt-10 text-content/60">База данных недоступна, попробуйте обновить страницу.</p>
      ) : leads.length === 0 ? (
        <div className="mt-10 rounded-[5px] border border-content/12 bg-panel px-8 py-14 text-center text-content/50">
          <span className="lic mx-auto text-[40px] text-gold/60">
            <Inbox />
          </span>
          <p className="mt-4">Пока нет заявок. Как только кто-то отправит форму на сайте, она появится здесь.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className={cx(
                "rounded-[5px] border bg-panel p-5",
                lead.status === "NEW" ? "border-gold/40" : "border-content/12 opacity-70"
              )}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span className="text-[16px] font-bold">{lead.name}</span>
                <span
                  className={cx(
                    "rounded px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide",
                    lead.status === "NEW" ? "bg-gold/15 text-gold" : "bg-content/10 text-content/50"
                  )}
                >
                  {lead.status === "NEW" ? "новая" : "обработана"}
                </span>
                <span className="ml-auto text-[12.5px] text-content/45">{dateFmt.format(lead.createdAt)}</span>
              </div>

              <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-1 text-[14px] text-content/75">
                {lead.phone && (
                  <a href={`tel:${lead.phone.replace(/[^+\d]/g, "")}`} className="font-semibold hover:text-gold">
                    {lead.phone}
                  </a>
                )}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="font-semibold break-all hover:text-gold">
                    {lead.email}
                  </a>
                )}
                {lead.tour && <span className="text-content/60">Тур: {lead.tour}</span>}
              </div>

              {lead.message && (
                <p className="mt-2.5 whitespace-pre-wrap text-[14px] leading-relaxed text-content/70">
                  {lead.message}
                </p>
              )}

              <div className="mt-4 flex gap-2.5">
                <form action={toggleLeadStatus.bind(null, lead.id)}>
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-content/20 px-3 py-1.5 text-[12.5px] font-bold text-content/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <span className="lic">{lead.status === "NEW" ? <Check /> : <Undo2 />}</span>
                    {lead.status === "NEW" ? "Обработана" : "Вернуть в новые"}
                  </button>
                </form>
                <form action={deleteLead.bind(null, lead.id)}>
                  <button
                    type="submit"
                    className="flex cursor-pointer items-center gap-1.5 rounded-[3px] border border-content/20 px-3 py-1.5 text-[12.5px] font-bold text-content/50 transition-colors hover:border-red-400 hover:text-red-400"
                  >
                    <span className="lic">
                      <Trash2 />
                    </span>
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
