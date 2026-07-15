import "@/app/globals.css";
import { ThemeProvider } from "@/lib/ThemeContext";
import { fontVars } from "@/lib/fonts";

// Runs before paint: applies the saved theme so there is no light/dark flash.
const NO_FLASH = `(function(){try{if(localStorage.getItem("gv_theme")==="light")document.documentElement.classList.add("light")}catch(e){}})()`;

interface RootHtmlProps {
  /** BCP 47 tag for <html lang>. The site branch passes the locale from the
   *  URL; admin is Russian-only. */
  lang: string;
  /** Serialized JSON-LD for <head>, when the branch has any. */
  jsonLd?: string;
  children: React.ReactNode;
}

/** The <html>/<body> shell. This app has no single root layout: the site
 *  branch has to declare its language in <html lang>, and it only knows the
 *  language from the [lang] segment, which a shared root layout sits above.
 *  So each branch owns its own root layout and they share this shell. */
export default function RootHtml({ lang, jsonLd, children }: RootHtmlProps) {
  return (
    <html lang={lang} className={fontVars} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- next/head is
          the Pages Router API; a root layout in the App Router declares <head>
          itself. The rule can't tell this component is a root layout. */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH }} />
        {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
