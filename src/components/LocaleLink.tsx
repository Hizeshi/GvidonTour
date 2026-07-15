"use client";

import NextLink from "next/link";
import type { ComponentPropsWithRef } from "react";
import { useLang } from "@/lib/LanguageContext";
import { localeHref } from "@/lib/i18n";

type LocaleLinkProps = Omit<ComponentPropsWithRef<typeof NextLink>, "href"> & { href: string };

/** next/link that prefixes site paths with the active locale, so components
 *  keep writing locale-agnostic hrefs ("/tours") and still land on the right
 *  language (/en/tours). External URLs, mailto/tel and #anchors pass through
 *  untouched. */
export default function LocaleLink({ href, ...rest }: LocaleLinkProps) {
  const { lang } = useLang();
  const isSitePath = href.startsWith("/") && !href.startsWith("//");
  return <NextLink href={isSitePath ? localeHref(href, lang) : href} {...rest} />;
}
