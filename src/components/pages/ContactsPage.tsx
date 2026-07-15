"use client";

import { useActionState } from "react";
import { AtSign, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { submitLead } from "@/app/(site)/[lang]/contacts/actions";
import { useLang } from "@/lib/LanguageContext";
import type { LText } from "@/lib/catalog-types";
import { EMAIL, INSTAGRAM, PHONE, PHONE_2, PHONE_2_HREF, PHONE_HREF } from "@/lib/content";
import { cx, ui } from "@/lib/ui";
import KazMap from "@/components/KazMap";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

const infoRow = "flex items-start gap-[18px] border-b border-content/10 py-[22px]";
const infoLabel = "text-xs uppercase tracking-[0.12em] text-content/50";
const infoValue = "mt-[3px] text-base font-semibold";
const infoIcon = "lic mt-0.5 text-[22px] text-gold";

export default function ContactsPage({ tourTitles }: { tourTitles: LText[] }) {
  const { t, lang } = useLang();
  const [state, formAction, pending] = useActionState(submitLead, null);
  const sent = state?.ok === true;

  const tourOptions = tourTitles.map((title) => title[lang]);

  return (
    <main>
      <PageHead eyebrow={t.contacts.eyebrow} title={t.contacts.title} intro={t.contacts.intro} />

      <section className={cx(ui.sec, "pt-10")}>
        <div className={ui.wrap}>
          <div className="mt-14 grid grid-cols-1 gap-[38px] md:grid-cols-[1.05fr_0.95fr] md:gap-16">
            <Reveal>
              {sent ? (
                <div className="rounded border border-gold/40 bg-gold/5 px-9 py-14 text-center">
                  <span className="lic text-[46px] text-gold">
                    <CheckCircle2 />
                  </span>
                  <h3 className={cx(ui.serif, "mb-2 mt-[18px] text-[26px]")}>
                    {t.contacts.successTitle}
                  </h3>
                  <p className="text-content/60">{t.contacts.success}</p>
                </div>
              ) : (
                <form action={formAction}>
                  {/* Honeypot: hidden from humans, bots fill it and get ignored. */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  />
                  <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
                    <div className="mb-5">
                      <label className={ui.flabel} htmlFor="cf-name">
                        {t.contacts.name}
                      </label>
                      <input id="cf-name" className={ui.finput} name="name" type="text" required />
                    </div>
                    <div className="mb-5">
                      <label className={ui.flabel} htmlFor="cf-phone">
                        {t.contacts.phone}
                      </label>
                      <input id="cf-phone" className={ui.finput} name="phone" type="tel" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className={ui.flabel} htmlFor="cf-email">
                      {t.contacts.email}
                    </label>
                    {/* Neither contact field is required on its own: the server
                        accepts a phone or an email, so demanding both here
                        would turn away visitors who only leave a number. */}
                    <input id="cf-email" className={ui.finput} name="email" type="email" />
                    <p className="mt-2 text-[12.5px] text-content/50">{t.contacts.oneOf}</p>
                  </div>
                  <div className="mb-5">
                    <label className={ui.flabel} htmlFor="cf-tour">
                      {t.contacts.tour}
                    </label>
                    <select
                      id="cf-tour"
                      className={cx(ui.finput, "cursor-pointer appearance-none [&_option]:text-onaccent")}
                      name="tour"
                      defaultValue=""
                    >
                      <option value="">{t.contacts.tour}</option>
                      {tourOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className={ui.flabel} htmlFor="cf-message">
                      {t.contacts.message}
                    </label>
                    <textarea
                      id="cf-message"
                      className={cx(ui.finput, "min-h-[120px] resize-y")}
                      name="message"
                    />
                  </div>
                  {state?.ok === false && (
                    <p className="mb-4 text-[13.5px] font-semibold text-red-400">{t.contacts.error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={pending}
                    className={cx(ui.btnGold, "w-full justify-center", pending && "pointer-events-none opacity-60")}
                  >
                    {t.contacts.send}
                    <span className="lic">
                      <Send />
                    </span>
                  </button>
                </form>
              )}
            </Reveal>

            <Reveal className="flex flex-col" delay={1}>
              <div className={infoRow}>
                <span className={infoIcon}>
                  <MapPin />
                </span>
                <div>
                  <div className={infoLabel}>{t.contacts.lAddr}</div>
                  <div className={infoValue}>{t.contacts.address}</div>
                </div>
              </div>
              <div className={infoRow}>
                <span className={infoIcon}>
                  <Phone />
                </span>
                <div>
                  <div className={infoLabel}>{t.contacts.lPhone}</div>
                  <a className={cx(infoValue, "block")} href={PHONE_HREF}>
                    {PHONE}
                  </a>
                  <a className={cx(infoValue, "block")} href={PHONE_2_HREF}>
                    {PHONE_2}
                  </a>
                </div>
              </div>
              <div className={infoRow}>
                <span className={infoIcon}>
                  <Mail />
                </span>
                <div>
                  <div className={infoLabel}>{t.contacts.lMail}</div>
                  <a className={cx(infoValue, "break-all")} href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>
                </div>
              </div>
              <div className={infoRow}>
                <span className={infoIcon}>
                  <Clock />
                </span>
                <div>
                  <div className={infoLabel}>{t.contacts.lHours}</div>
                  <div className={infoValue}>{t.contacts.hours}</div>
                </div>
              </div>
              <div className={cx(infoRow, "border-b-0")}>
                <span className={infoIcon}>
                  <AtSign />
                </span>
                <div>
                  <div className={infoLabel}>{t.contacts.lSocial}</div>
                  <div className={infoValue}>{INSTAGRAM}</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-20">
            <div className="max-w-[760px]">
              <div className={ui.eyebrow}>{t.contacts.mapEyebrow}</div>
              <h2 className={cx(ui.serif, "mt-3.5 text-[clamp(26px,3vw,40px)]")}>
                {t.contacts.mapTitle}
              </h2>
            </div>
            <KazMap />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
