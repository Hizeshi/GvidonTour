export interface EmbedResult {
  type: "iframe" | "video";
  src: string;
}

/** Turns a YouTube/Vimeo page URL into its embeddable iframe src.
 *  Direct media file URLs (mp4 etc.) pass through unchanged for <video>.
 *  Shared by Lightbox (gallery/review videos) and the blog video block. */
export function toEmbedUrl(url: string, opts: { autoplay?: boolean } = {}): EmbedResult {
  const autoplay = opts.autoplay ? "?autoplay=1" : "";
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}${autoplay}` };
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}${autoplay}` };
  return { type: "video", src: url };
}
