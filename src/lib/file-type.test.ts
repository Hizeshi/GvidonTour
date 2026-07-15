import assert from "node:assert/strict";
import { test } from "node:test";
import { sniffFileType } from "./file-type";

/** Smallest byte sequence that still identifies each format. */
function jpeg() {
  return Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.alloc(12)]);
}
function png() {
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(12)]);
}
function webp() {
  const b = Buffer.alloc(20);
  b.write("RIFF", 0, "latin1");
  b.write("WEBP", 8, "latin1");
  return b;
}
/** An ISO-BMFF ftyp box: [size][ftyp][major][minor][...compatible brands]. */
function iso(major: string, compatible: string[] = []) {
  const size = 16 + compatible.length * 4;
  const b = Buffer.alloc(Math.max(size, 20));
  b.writeUInt32BE(size, 0);
  b.write("ftyp", 4, "latin1");
  b.write(major, 8, "latin1");
  b.writeUInt32BE(0, 12);
  compatible.forEach((brand, i) => b.write(brand, 16 + i * 4, "latin1"));
  return b;
}

test("identifies the formats the site accepts", () => {
  assert.equal(sniffFileType(jpeg()), "image/jpeg");
  assert.equal(sniffFileType(png()), "image/png");
  assert.equal(sniffFileType(webp()), "image/webp");
  assert.equal(sniffFileType(iso("avif")), "image/avif");
  assert.equal(sniffFileType(iso("isom", ["isom", "mp42"])), "video/mp4");
});

test("reads AVIF that only declares itself in the compatible brands", () => {
  // What libheif/ImageMagick actually emit — major brand "mif1", "avif" only
  // further down the list. Checking the major brand alone rejects these.
  assert.equal(sniffFileType(iso("mif1", ["mif1", "avif"])), "image/avif");
});

test("rejects content the extension lied about", () => {
  // The point of the module: a browser (or curl) can claim any File.type it
  // likes, so the bytes decide.
  const html = Buffer.from("<html><script>alert(1)</script></html>...........");
  assert.equal(sniffFileType(html), null);

  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script/></svg>');
  assert.equal(sniffFileType(svg), null);

  const zip = Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.alloc(20)]);
  assert.equal(sniffFileType(zip), null);
});

test("rejects a truncated or empty file instead of guessing", () => {
  assert.equal(sniffFileType(Buffer.alloc(0)), null);
  assert.equal(sniffFileType(Buffer.from([0xff, 0xd8, 0xff])), null);
});

test("rejects an ISO file that is neither AVIF nor MP4", () => {
  // e.g. a QuickTime or HEIC file — valid ftyp, brand we don't serve.
  assert.equal(sniffFileType(iso("qt  ")), null);
  assert.equal(sniffFileType(iso("heic", ["heic", "mif1"])), null);
});
