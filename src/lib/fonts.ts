import { Manrope, Playfair_Display } from "next/font/google";

/** Shared by both root layouts (site and admin). next/font hashes each call
 *  site-wide, so importing this module twice reuses one set of font files
 *  instead of shipping duplicates. */

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

/** Goes on <html>: exposes --font-manrope / --font-playfair to globals.css. */
export const fontVars = `${manrope.variable} ${playfair.variable}`;
