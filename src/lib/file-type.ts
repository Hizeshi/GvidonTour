/** Content sniffing for uploads.
 *
 *  Both upload endpoints used to trust `File.type`, which is just the browser's
 *  guess from the file extension and is fully attacker-controlled — a plain
 *  `curl -F` sets it to whatever it likes. The public review form makes that
 *  matter: anyone past the captcha could park arbitrary bytes in our Storage
 *  bucket under a public URL, labelled as an image.
 *
 *  Reading the real signature costs nothing (the bytes are already in memory)
 *  and turns the declared type into what it should always have been: a hint. */

export type SniffedType = "image/jpeg" | "image/png" | "image/webp" | "image/avif" | "video/mp4";

export const EXT_BY_SNIFFED: Record<SniffedType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "video/mp4": "mp4",
};

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// AVIF and MP4 are both ISO base media files and share the "ftyp" header, so
// they can only be told apart by brand.
const AVIF_BRANDS = new Set(["avif", "avis"]);
const MP4_BRANDS = new Set(["isom", "iso2", "iso4", "iso5", "iso6", "mp41", "mp42", "avc1", "mmp4", "M4V ", "dash"]);

function tag(buf: Buffer, start: number): string {
  return buf.toString("latin1", start, start + 4);
}

/** Every brand an ISO-BMFF file claims: the major brand plus the compatible
 *  list. AVIF written by some encoders declares major brand "mif1" and only
 *  admits to "avif" further down the list, so checking the major brand alone
 *  rejects perfectly valid files. */
function isoBrands(buf: Buffer): string[] {
  const boxSize = buf.readUInt32BE(0);
  const end = Math.min(boxSize > 0 ? boxSize : buf.length, buf.length);
  const brands = [tag(buf, 8)];
  for (let i = 16; i + 4 <= end; i += 4) brands.push(tag(buf, i));
  return brands;
}

/** The file's actual type from its leading bytes, or null if it isn't one of
 *  the formats this site accepts. */
export function sniffFileType(buf: Buffer): SniffedType | null {
  if (buf.length < 16) return null;

  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.subarray(0, 8).equals(PNG_SIGNATURE)) return "image/png";
  if (tag(buf, 0) === "RIFF" && tag(buf, 8) === "WEBP") return "image/webp";

  if (tag(buf, 4) === "ftyp") {
    const brands = isoBrands(buf);
    if (brands.some((b) => AVIF_BRANDS.has(b))) return "image/avif";
    if (brands.some((b) => MP4_BRANDS.has(b))) return "video/mp4";
  }

  return null;
}
