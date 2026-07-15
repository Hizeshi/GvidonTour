import type { Lang } from "./content";

/** Text for the 404 and error pages, deliberately kept out of content.ts.
 *
 *  These two are the only screens whose text a *client* component must look up
 *  by itself: an error boundary receives nothing but `error` and `reset`, and
 *  the 404 shell is static (reading headers there made every public route
 *  dynamic — see CLAUDE.md), so both derive the locale in the browser instead
 *  of taking props from a server parent.
 *
 *  If they imported CONTENT for it they would drag all three languages of the
 *  whole dictionary into the client bundle — and because an error boundary
 *  wraps every page, that chunk would load everywhere, undoing the entire move
 *  to server components. Thirty short strings is a price worth paying; 62 KB is
 *  not.
 *
 *  Keep in sync with the notFound/errorPage blocks of Dict in content.ts. */
interface StatusText {
  notFound: {
    eyebrow: string;
    title: string;
    text: string;
    home: string;
    tours: string;
  };
  errorPage: {
    eyebrow: string;
    title: string;
    text: string;
    retry: string;
    home: string;
  };
}

export const STATUS_TEXT: Record<Lang, StatusText> = {
  ru: {
    notFound: {
      eyebrow: "Ошибка 404",
      title: "Такой страницы нет",
      text: "Возможно, она была перемещена или удалена. Давайте вернёмся к путешествиям.",
      home: "На главную",
      tours: "Смотреть туры",
    },
    errorPage: {
      eyebrow: "Ошибка",
      title: "Что-то пошло не так",
      text: "Мы уже знаем о проблеме. Попробуйте обновить страницу — обычно это помогает.",
      retry: "Попробовать снова",
      home: "На главную",
    },
  },
  en: {
    notFound: {
      eyebrow: "Error 404",
      title: "This page doesn't exist",
      text: "It may have been moved or removed. Let's get back to travelling.",
      home: "Go to home",
      tours: "Browse tours",
    },
    errorPage: {
      eyebrow: "Error",
      title: "Something went wrong",
      text: "We already know about the problem. Try reloading the page — that usually helps.",
      retry: "Try again",
      home: "Go to home",
    },
  },
  kk: {
    notFound: {
      eyebrow: "404 қатесі",
      title: "Мұндай бет жоқ",
      text: "Ол жылжытылған немесе жойылған болуы мүмкін. Саяхатқа оралайық.",
      home: "Басты бетке",
      tours: "Турларды қарау",
    },
    errorPage: {
      eyebrow: "Қате",
      title: "Бірдеңе дұрыс болмады",
      text: "Біз мәселе туралы білеміз. Бетті жаңартып көріңіз — әдетте бұл көмектеседі.",
      retry: "Қайталап көру",
      home: "Басты бетке",
    },
  },
};
