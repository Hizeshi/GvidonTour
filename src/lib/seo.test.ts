import assert from "node:assert/strict";
import { test } from "node:test";
import { absoluteUrl, breadcrumbJsonLd, jsonLdScript, SITE_URL } from "./seo";

test("absoluteUrl prefixes local paths", () => {
  assert.equal(absoluteUrl("/images/hero-astana.jpg"), `${SITE_URL}/images/hero-astana.jpg`);
});

test("absoluteUrl leaves URLs that are already absolute alone", () => {
  // The bug this guards: uploaded photos are already absolute Supabase URLs,
  // and prefixing them produced "https://site...https://..." in the JSON-LD of
  // every tour and blog post with an uploaded image.
  const supabase = "https://hkozmvhdzuegihwhmeyl.supabase.co/storage/v1/object/public/media/x.jpg";
  assert.equal(absoluteUrl(supabase), supabase);
  assert.equal(absoluteUrl("http://example.com/a.png"), "http://example.com/a.png");
  assert.equal(absoluteUrl("HTTPS://EXAMPLE.COM/a.png"), "HTTPS://EXAMPLE.COM/a.png");
});

test("jsonLdScript escapes < so a string field can't close the script tag", () => {
  const out = jsonLdScript({ name: "</script><script>alert(1)</script>" });
  assert.ok(!out.includes("</script>"));
  assert.ok(out.includes("\\u003c"));
  // Still valid JSON — the escape is inside the string, not around it.
  assert.equal(JSON.parse(out).name, "</script><script>alert(1)</script>");
});

test("breadcrumbJsonLd assigns one-based positions and absolute items", () => {
  const out = breadcrumbJsonLd([
    { name: "Home", url: `${SITE_URL}/en` },
    { name: "Tours", url: `${SITE_URL}/en/tours` },
  ]);
  assert.equal(out["@type"], "BreadcrumbList");
  assert.deepEqual(out.itemListElement, [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Tours", item: `${SITE_URL}/en/tours` },
  ]);
});
