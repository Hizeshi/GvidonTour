import assert from "node:assert/strict";
import { test } from "node:test";
import { CONTENT } from "./content";
import { LOCALES } from "./i18n";
import { STATUS_TEXT } from "./status-text";

/** status-text.ts duplicates two blocks of the dictionary so the 404 page and
 *  the error boundary — both client components that look the locale up
 *  themselves — don't have to import CONTENT and drag all three languages into
 *  the browser. Duplication drifts, and the drift would be invisible: the
 *  pages would just keep showing the old wording. This test is the only thing
 *  holding the two copies together.
 *
 *  Editing a 404/error string in content.ts fails here. Copy it across. */
test("STATUS_TEXT matches the notFound/errorPage blocks of CONTENT", () => {
  for (const lang of LOCALES) {
    assert.deepEqual(
      STATUS_TEXT[lang].notFound,
      CONTENT[lang].notFound,
      `notFound drifted from content.ts for "${lang}"`
    );
    assert.deepEqual(
      STATUS_TEXT[lang].errorPage,
      CONTENT[lang].errorPage,
      `errorPage drifted from content.ts for "${lang}"`
    );
  }
});
