import assert from "node:assert/strict";
import { test } from "node:test";
import { DEFAULT_LOCALE, isLocale, localeAlternates, localeHref, LOCALES, stripLocale } from "./i18n";
import { SITE_URL } from "./seo";

test("isLocale accepts exactly the three locales", () => {
  for (const l of LOCALES) assert.ok(isLocale(l));
  assert.ok(!isLocale("de"));
  // "kz" is the country code; the language code is "kk", and hreflang needs
  // the language one. Getting this wrong is silent — the page just stops
  // being offered as a translation.
  assert.ok(!isLocale("kz"));
  assert.ok(!isLocale(""));
});

test("localeHref builds prefixed hrefs", () => {
  assert.equal(localeHref("/tours", "en"), "/en/tours");
  assert.equal(localeHref("/", "ru"), "/ru");
  assert.equal(localeHref("tours", "kk"), "/kk/tours");
});

test("stripLocale is localeHref's inverse", () => {
  for (const lang of LOCALES) {
    for (const path of ["/", "/tours", "/blog/kolsai-lakes"]) {
      assert.equal(stripLocale(localeHref(path, lang)), path);
    }
  }
});

test("stripLocale leaves un-prefixed paths untouched", () => {
  // Header/nav compare against stripLocale(pathname) to mark the active link;
  // mangling a non-locale path would light up the wrong one.
  assert.equal(stripLocale("/admin/tours"), "/admin/tours");
  assert.equal(stripLocale("/tours"), "/tours");
  assert.equal(stripLocale("/"), "/");
});

test("localeAlternates offers every locale plus x-default", () => {
  const { canonical, languages } = localeAlternates("/tours", "en");
  assert.equal(canonical, `${SITE_URL}/en/tours`);
  for (const l of LOCALES) assert.equal(languages[l], `${SITE_URL}/${l}/tours`);
  assert.equal(languages["x-default"], `${SITE_URL}/${DEFAULT_LOCALE}/tours`);
});
