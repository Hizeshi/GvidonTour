export type Lang = "ru" | "en" | "kk";

export const LANGS: Lang[] = ["ru", "en", "kk"];

export type NavKey = "home" | "about" | "tours" | "gallery" | "services" | "contacts";

export const NAV_ROUTES: Record<NavKey, string> = {
  home: "/",
  about: "/about",
  tours: "/tours",
  gallery: "/gallery",
  services: "/services",
  contacts: "/contacts",
};

export interface TourEntry {
  region: string;
  title: string;
  dur: string;
  price: string;
  desc: string;
}

export interface ValueEntry {
  icon: string;
  t: string;
  d: string;
}

export interface Dict {
  brandTag: string;
  nav: Record<NavKey, string>;
  hero: { eyebrow: string; title: string; sub: string; cta1: string; cta2: string; scroll: string };
  valuesHead: { eyebrow: string; title: string };
  values: ValueEntry[];
  featured: { eyebrow: string; title: string; viewAll: string };
  ctaBand: { title: string; sub: string; btn: string };
  toursPage: { eyebrow: string; title: string; intro: string; details: string };
  tours: TourEntry[];
  gallery: { eyebrow: string; title: string; intro: string };
  caps: string[];
  services: { eyebrow: string; title: string; intro: string };
  servicesItems: ValueEntry[];
  stats: { n: string; l: string }[];
  about: {
    eyebrow: string; title: string; intro: string;
    storyEyebrow: string; storyTitle: string; p1: string; p2: string;
    dirEyebrow: string; dirQuote: string; dirName: string; dirRole: string;
  };
  contacts: {
    eyebrow: string; title: string; intro: string;
    name: string; email: string; phone: string; tour: string; message: string; send: string;
    success: string; successTitle: string;
    lAddr: string; lPhone: string; lMail: string; lHours: string; lSocial: string;
    address: string; hours: string; mapEyebrow: string; mapTitle: string;
  };
  mapCities: { n: string; x: number; y: number; hub?: boolean }[];
  footer: { nav: string; contacts: string; rights: string };
  slogan: string;
}

export const CONTENT: Record<Lang, Dict> = {
  ru: {
    brandTag: "Принимающий туроператор в Казахстане",
    nav: { home: "Главная", about: "О компании", tours: "Туры", gallery: "Галерея", services: "Услуги", contacts: "Контакты" },
    hero: {
      eyebrow: "Откройте Казахстан с надёжным партнёром",
      title: "Путешествие в сердце Евразии",
      sub: "От футуристичной Астаны до бескрайних степей, каньонов и горных озёр — мы создаём авторские маршруты по всему Казахстану.",
      cta1: "Подобрать тур",
      cta2: "Оставить заявку",
      scroll: "Листайте вниз",
    },
    valuesHead: { eyebrow: "Почему GVIDON TOUR", title: "Ваш надёжный партнёр в Казахстане" },
    values: [
      { icon: "landmark", t: "Богатая культура", d: "Древние города Великого Шёлкового пути, мавзолеи и живые традиции кочевников." },
      { icon: "heart-handshake", t: "Гостеприимство", d: "Казахское гостеприимство — в основе каждого маршрута и каждой встречи." },
      { icon: "route", t: "Разнообразные маршруты", d: "От футуристичных городов до каньонов, степей и горных озёр." },
      { icon: "badge-check", t: "Профессионализм", d: "Лицензированные гиды, продуманная логистика и забота о деталях." },
    ],
    featured: { eyebrow: "Популярные направления", title: "Избранные маршруты", viewAll: "Все туры" },
    ctaBand: {
      title: "Готовы открыть Казахстан?",
      sub: "Расскажите о своих пожеланиях — и мы составим маршрут специально для вас.",
      btn: "Оставить заявку",
    },
    toursPage: {
      eyebrow: "Туры и маршруты",
      title: "Откройте Казахстан",
      intro: "Авторские программы по всей стране — от однодневных вылазок до больших экспедиций по самым красивым местам Казахстана.",
      details: "Подробнее",
    },
    tours: [
      { region: "Астана", title: "Астана — город будущего", dur: "2 дня", price: "от 120 000 ₸", desc: "Байтерек, Хан Шатыр, Дворец мира и согласия и вечерняя набережная Ишима." },
      { region: "Алматы", title: "Алматы и горы Алатау", dur: "3 дня", price: "от 180 000 ₸", desc: "Медеу, Шымбулак, Кок-Тобе и вечерние огни южной столицы." },
      { region: "Алматинская обл.", title: "Чарынский каньон", dur: "1 день", price: "от 45 000 ₸", desc: "«Долина замков» — каньон возрастом 12 млн лет на реке Чарын." },
      { region: "Алматинская обл.", title: "Кольсайские озёра и Каинды", dur: "2 дня", price: "от 95 000 ₸", desc: "Бирюзовые горные озёра и затопленный еловый лес Каинды." },
      { region: "Туркестан", title: "Туркестан — духовная столица", dur: "2 дня", price: "от 110 000 ₸", desc: "Мавзолей Ходжи Ахмеда Ясави — объект ЮНЕСКО и сердце Шёлкового пути." },
      { region: "Мангистау", title: "Мангистау и плато Бозжыра", dur: "4 дня", price: "от 290 000 ₸", desc: "Марсианские пейзажи Устюрта, меловые горы и берег Каспия." },
    ],
    gallery: { eyebrow: "Галерея", title: "Лица Казахстана", intro: "Пейзажи, города и моменты, которые ждут вас в путешествии по стране." },
    caps: ["Байтерек, Астана", "Чарынский каньон", "Кольсайские озёра", "Плато Бозжыра", "Шымбулак", "Большое Алматинское озеро", "Хан Шатыр", "Мавзолей в Туркестане", "Степь на закате"],
    services: { eyebrow: "Услуги", title: "Всё для вашей поездки", intro: "Полный цикл организации путешествия — от визы и встречи в аэропорту до гида и национальной кухни." },
    servicesItems: [
      { icon: "stamp", t: "Визовая поддержка", d: "Приглашения, консультации и сопровождение по визовым вопросам." },
      { icon: "car-front", t: "Трансфер и транспорт", d: "Встреча в аэропорту, комфортабельные авто и микроавтобусы с водителем." },
      { icon: "compass", t: "Профессиональные гиды", d: "Лицензированные гиды на русском, английском и казахском языках." },
      { icon: "bed-double", t: "Бронирование отелей", d: "Проверенные отели и гостевые дома под ваш бюджет и маршрут." },
      { icon: "map", t: "Индивидуальные маршруты", d: "Авторские туры под ваши интересы, сроки и состав группы." },
      { icon: "utensils", t: "Питание и гастрономия", d: "Национальная кухня, дегустации и лучшие рестораны страны." },
    ],
    stats: [
      { n: "10+", l: "лет на рынке" },
      { n: "50+", l: "маршрутов" },
      { n: "14", l: "регионов" },
      { n: "2000+", l: "довольных гостей" },
    ],
    about: {
      eyebrow: "О компании",
      title: "О компании GVIDON TOUR",
      intro: "Мы открываем настоящий Казахстан гостям со всего мира — с его богатой культурой, искренним гостеприимством и захватывающими пейзажами.",
      storyEyebrow: "Наша история",
      storyTitle: "Знаем эту землю изнутри",
      p1: "GVIDON TOUR — принимающий туроператор, который открывает Казахстан гостям со всего мира. Мы знаем эту землю изнутри: её города, степи, горы и людей.",
      p2: "Наша миссия — показать настоящий Казахстан с заботой о каждой детали. Мы выстраиваем маршруты так, чтобы вы чувствовали себя желанным гостем на всём пути.",
      dirEyebrow: "Руководство",
      dirQuote: "Мы не просто организуем поездки — мы дарим впечатления, которые остаются на всю жизнь.",
      dirName: "Татьяна Верницкая",
      dirRole: "Директор",
    },
    contacts: {
      eyebrow: "Контакты",
      title: "Свяжитесь с нами",
      intro: "Готовы помочь спланировать ваше путешествие по Казахстану. Оставьте заявку — и мы ответим в ближайшее время.",
      name: "Имя", email: "Email", phone: "Телефон", tour: "Интересующий тур", message: "Сообщение", send: "Отправить заявку",
      success: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      successTitle: "Заявка отправлена",
      lAddr: "Адрес", lPhone: "Телефон", lMail: "Email", lHours: "Время работы", lSocial: "Соцсети",
      address: "РК, г. Астана, пр. Тауелсыздык, 3–402",
      hours: "Пн–Пт: 9:00 – 18:00",
      mapEyebrow: "География",
      mapTitle: "Мы работаем по всему Казахстану",
    },
    mapCities: [
      { n: "Астана", x: 55, y: 28, hub: true },
      { n: "Алматы", x: 72, y: 68 },
      { n: "Туркестан", x: 46, y: 73 },
      { n: "Актау", x: 9, y: 60 },
      { n: "Уральск", x: 14, y: 30 },
      { n: "Павлодар", x: 64, y: 22 },
      { n: "Атырау", x: 11, y: 48 },
    ],
    footer: { nav: "Навигация", contacts: "Контакты", rights: "Все права защищены." },
    slogan: "Откройте Казахстан с надёжным партнёром",
  },
  en: {
    brandTag: "Inbound tour operator in Kazakhstan",
    nav: { home: "Home", about: "About", tours: "Tours", gallery: "Gallery", services: "Services", contacts: "Contacts" },
    hero: {
      eyebrow: "Discover Kazakhstan with a trusted partner",
      title: "A journey to the heart of Eurasia",
      sub: "From futuristic Astana to endless steppes, canyons and mountain lakes — we craft signature journeys across all of Kazakhstan.",
      cta1: "Find a tour",
      cta2: "Send a request",
      scroll: "Scroll down",
    },
    valuesHead: { eyebrow: "Why GVIDON TOUR", title: "Your trusted partner in Kazakhstan" },
    values: [
      { icon: "landmark", t: "Rich culture", d: "Ancient Silk Road cities, mausoleums and living nomadic traditions." },
      { icon: "heart-handshake", t: "Hospitality", d: "Kazakh hospitality is at the heart of every route and every welcome." },
      { icon: "route", t: "Diverse routes", d: "From futuristic cities to canyons, steppes and mountain lakes." },
      { icon: "badge-check", t: "Professionalism", d: "Licensed guides, smooth logistics and care for every detail." },
    ],
    featured: { eyebrow: "Popular destinations", title: "Featured journeys", viewAll: "All tours" },
    ctaBand: {
      title: "Ready to discover Kazakhstan?",
      sub: "Tell us your wishes — and we will craft a route just for you.",
      btn: "Send a request",
    },
    toursPage: {
      eyebrow: "Tours & routes",
      title: "Discover Kazakhstan",
      intro: "Signature programmes across the country — from one-day escapes to grand expeditions through the most beautiful places in Kazakhstan.",
      details: "Details",
    },
    tours: [
      { region: "Astana", title: "Astana — city of the future", dur: "2 days", price: "from 120,000 ₸", desc: "Baiterek, Khan Shatyr, the Palace of Peace and the evening Ishim embankment." },
      { region: "Almaty", title: "Almaty & the Alatau mountains", dur: "3 days", price: "from 180,000 ₸", desc: "Medeu, Shymbulak, Kok-Tobe and the evening lights of the southern capital." },
      { region: "Almaty region", title: "Charyn Canyon", dur: "1 day", price: "from 45,000 ₸", desc: "The Valley of Castles — a 12-million-year-old canyon on the Charyn river." },
      { region: "Almaty region", title: "Kolsai Lakes & Kaindy", dur: "2 days", price: "from 95,000 ₸", desc: "Turquoise mountain lakes and the sunken spruce forest of Kaindy." },
      { region: "Turkestan", title: "Turkestan — spiritual capital", dur: "2 days", price: "from 110,000 ₸", desc: "The Mausoleum of Khoja Ahmed Yasawi — a UNESCO site at the heart of the Silk Road." },
      { region: "Mangystau", title: "Mangystau & the Bozzhyra plateau", dur: "4 days", price: "from 290,000 ₸", desc: "Martian landscapes of Ustyurt, chalk mountains and the Caspian shore." },
    ],
    gallery: { eyebrow: "Gallery", title: "Faces of Kazakhstan", intro: "Landscapes, cities and moments that await you on a journey through the country." },
    caps: ["Baiterek, Astana", "Charyn Canyon", "Kolsai Lakes", "Bozzhyra Plateau", "Shymbulak", "Big Almaty Lake", "Khan Shatyr", "Mausoleum in Turkestan", "Steppe at sunset"],
    services: { eyebrow: "Services", title: "Everything for your trip", intro: "A full travel-planning cycle — from visa and airport meet-and-greet to guides and national cuisine." },
    servicesItems: [
      { icon: "stamp", t: "Visa support", d: "Invitations, consultations and assistance with all visa matters." },
      { icon: "car-front", t: "Transfers & transport", d: "Airport meet-and-greet, comfortable cars and minibuses with drivers." },
      { icon: "compass", t: "Professional guides", d: "Licensed guides in Russian, English and Kazakh." },
      { icon: "bed-double", t: "Hotel booking", d: "Trusted hotels and guesthouses to match your budget and route." },
      { icon: "map", t: "Tailor-made routes", d: "Bespoke tours built around your interests, dates and group." },
      { icon: "utensils", t: "Food & gastronomy", d: "National cuisine, tastings and the country’s best restaurants." },
    ],
    stats: [
      { n: "10+", l: "years on the market" },
      { n: "50+", l: "routes" },
      { n: "14", l: "regions" },
      { n: "2000+", l: "happy travelers" },
    ],
    about: {
      eyebrow: "About us",
      title: "About GVIDON TOUR",
      intro: "We open the real Kazakhstan to guests from all over the world — its rich culture, sincere hospitality and breathtaking landscapes.",
      storyEyebrow: "Our story",
      storyTitle: "We know this land from within",
      p1: "GVIDON TOUR is an inbound tour operator opening Kazakhstan to guests from all over the world. We know this land from within — its cities, steppes, mountains and people.",
      p2: "Our mission is to show the real Kazakhstan with care for every detail. We build routes so that you feel a welcome guest every step of the way.",
      dirEyebrow: "Leadership",
      dirQuote: "We don’t just organise trips — we create memories that last a lifetime.",
      dirName: "Tatiana Vernitskaya",
      dirRole: "Director",
    },
    contacts: {
      eyebrow: "Contacts",
      title: "Get in touch",
      intro: "We are ready to help you plan your journey through Kazakhstan. Leave a request — and we will reply shortly.",
      name: "Name", email: "Email", phone: "Phone", tour: "Tour of interest", message: "Message", send: "Send request",
      success: "Thank you! We will get back to you shortly.",
      successTitle: "Request sent",
      lAddr: "Address", lPhone: "Phone", lMail: "Email", lHours: "Working hours", lSocial: "Social",
      address: "Astana, Tauelsizdik Ave, 3–402, Kazakhstan",
      hours: "Mon–Fri: 9:00 – 18:00",
      mapEyebrow: "Geography",
      mapTitle: "We operate across all of Kazakhstan",
    },
    mapCities: [
      { n: "Astana", x: 55, y: 28, hub: true },
      { n: "Almaty", x: 72, y: 68 },
      { n: "Turkestan", x: 46, y: 73 },
      { n: "Aktau", x: 9, y: 60 },
      { n: "Oral", x: 14, y: 30 },
      { n: "Pavlodar", x: 64, y: 22 },
      { n: "Atyrau", x: 11, y: 48 },
    ],
    footer: { nav: "Navigation", contacts: "Contacts", rights: "All rights reserved." },
    slogan: "Discover Kazakhstan with a trusted partner",
  },
  kk: {
    brandTag: "Қазақстандағы қабылдаушы туроператор",
    nav: { home: "Басты бет", about: "Компания", tours: "Турлар", gallery: "Галерея", services: "Қызметтер", contacts: "Байланыс" },
    hero: {
      eyebrow: "Қазақстанды сенімді серіктеспен ашыңыз",
      title: "Еуразияның жүрегіне саяхат",
      sub: "Болашақ қаласы Астанадан шексіз дала, шатқалдар мен тау көлдеріне дейін — біз бүкіл Қазақстан бойынша ерекше маршруттар жасаймыз.",
      cta1: "Тур таңдау",
      cta2: "Өтінім қалдыру",
      scroll: "Төмен жылжытыңыз",
    },
    valuesHead: { eyebrow: "Неге GVIDON TOUR", title: "Қазақстандағы сенімді серіктесіңіз" },
    values: [
      { icon: "landmark", t: "Бай мәдениет", d: "Ұлы Жібек жолының ежелгі қалалары, кесенелер және тірі көшпелі дәстүрлер." },
      { icon: "heart-handshake", t: "Қонақжайлылық", d: "Қазақ қонақжайлылығы — әр маршрут пен әр кездесудің негізі." },
      { icon: "route", t: "Әртүрлі маршруттар", d: "Болашақ қалаларынан шатқалдарға, далаға және тау көлдеріне дейін." },
      { icon: "badge-check", t: "Кәсібилік", d: "Лицензияланған гидтер, ойластырылған логистика және әр детальге қамқорлық." },
    ],
    featured: { eyebrow: "Танымал бағыттар", title: "Таңдаулы маршруттар", viewAll: "Барлық турлар" },
    ctaBand: {
      title: "Қазақстанды ашуға дайынсыз ба?",
      sub: "Тілектеріңізді айтыңыз — біз сізге арнайы маршрут жасаймыз.",
      btn: "Өтінім қалдыру",
    },
    toursPage: {
      eyebrow: "Турлар мен маршруттар",
      title: "Қазақстанды ашыңыз",
      intro: "Ел бойынша авторлық бағдарламалар — бір күндік серуендерден Қазақстанның ең әдемі жерлеріне үлкен экспедицияларға дейін.",
      details: "Толығырақ",
    },
    tours: [
      { region: "Астана", title: "Астана — болашақ қаласы", dur: "2 күн", price: "120 000 ₸-ден", desc: "Бәйтерек, Хан Шатыр, Бейбітшілік сарайы және Есіл жағалауы." },
      { region: "Алматы", title: "Алматы және Алатау таулары", dur: "3 күн", price: "180 000 ₸-ден", desc: "Медеу, Шымбұлақ, Көктөбе және оңтүстік астананың кешкі оттары." },
      { region: "Алматы облысы", title: "Шарын шатқалы", dur: "1 күн", price: "45 000 ₸-ден", desc: "«Қамалдар алқабы» — Шарын өзеніндегі 12 млн жылдық шатқал." },
      { region: "Алматы облысы", title: "Көлсай көлдері және Қайыңды", dur: "2 күн", price: "95 000 ₸-ден", desc: "Көгілдір тау көлдері және Қайыңдының су басқан шырша орманы." },
      { region: "Түркістан", title: "Түркістан — рухани астана", dur: "2 күн", price: "110 000 ₸-ден", desc: "Қожа Ахмет Ясауи кесенесі — ЮНЕСКО нысаны, Жібек жолының жүрегі." },
      { region: "Маңғыстау", title: "Маңғыстау және Бозжыра үстірті", dur: "4 күн", price: "290 000 ₸-ден", desc: "Үстірттің ғаламшарлық пейзаждары, бор таулары және Каспий жағасы." },
    ],
    gallery: { eyebrow: "Галерея", title: "Қазақстанның келбеті", intro: "Ел бойынша саяхатта сізді күтіп тұрған пейзаждар, қалалар мен сәттер." },
    caps: ["Бәйтерек, Астана", "Шарын шатқалы", "Көлсай көлдері", "Бозжыра үстірті", "Шымбұлақ", "Үлкен Алматы көлі", "Хан Шатыр", "Түркістандағы кесене", "Кешкі дала"],
    services: { eyebrow: "Қызметтер", title: "Сапарыңызға қажет барлығы", intro: "Саяхатты ұйымдастырудың толық циклі — визадан және әуежайда қарсы алудан гид пен ұлттық асханаға дейін." },
    servicesItems: [
      { icon: "stamp", t: "Виза қолдауы", d: "Шақырулар, кеңестер және виза мәселелері бойынша көмек." },
      { icon: "car-front", t: "Трансфер және көлік", d: "Әуежайда қарсы алу, жайлы автокөліктер мен микроавтобустар." },
      { icon: "compass", t: "Кәсіби гидтер", d: "Орыс, ағылшын және қазақ тілдеріндегі лицензияланған гидтер." },
      { icon: "bed-double", t: "Қонақүй брондау", d: "Бюджетіңіз бен маршрутыңызға сай тексерілген қонақүйлер." },
      { icon: "map", t: "Жеке маршруттар", d: "Қызығушылығыңызға, мерзіміңізге сай авторлық турлар." },
      { icon: "utensils", t: "Тамақтану және гастрономия", d: "Ұлттық тағамдар, дәмдеу және елдің үздік мейрамханалары." },
    ],
    stats: [
      { n: "10+", l: "жыл нарықта" },
      { n: "50+", l: "маршрут" },
      { n: "14", l: "өңір" },
      { n: "2000+", l: "риза қонақ" },
    ],
    about: {
      eyebrow: "Компания туралы",
      title: "GVIDON TOUR туралы",
      intro: "Біз әлемнің түкпір-түкпірінен келген қонақтарға нағыз Қазақстанды ашамыз — оның бай мәдениеті, шынайы қонақжайлылығы және таңғажайып пейзаждарымен.",
      storyEyebrow: "Біздің тарих",
      storyTitle: "Бұл жерді іштей білеміз",
      p1: "GVIDON TOUR — әлемнің түкпір-түкпірінен келген қонақтарға Қазақстанды ашатын қабылдаушы туроператор. Біз бұл жерді іштей білеміз: оның қалаларын, даласын, тауларын және адамдарын.",
      p2: "Біздің миссиямыз — әр детальге қамқорлықпен нағыз Қазақстанды көрсету. Маршруттарды сіз бүкіл жол бойы құрметті қонақ болып сезінетіндей етіп жасаймыз.",
      dirEyebrow: "Басшылық",
      dirQuote: "Біз жай саяхат ұйымдастырмаймыз — өмір бойы есте қалатын әсер сыйлаймыз.",
      dirName: "Татьяна Верницкая",
      dirRole: "Директор",
    },
    contacts: {
      eyebrow: "Байланыс",
      title: "Бізбен байланысыңыз",
      intro: "Қазақстан бойынша саяхатыңызды жоспарлауға дайынбыз. Өтінім қалдырыңыз — жақын арада жауап береміз.",
      name: "Аты-жөні", email: "Email", phone: "Телефон", tour: "Қызықтыратын тур", message: "Хабарлама", send: "Өтінім жіберу",
      success: "Рахмет! Жақын арада сізбен хабарласамыз.",
      successTitle: "Өтінім жіберілді",
      lAddr: "Мекенжай", lPhone: "Телефон", lMail: "Email", lHours: "Жұмыс уақыты", lSocial: "Әлеуметтік желі",
      address: "Қазақстан, Астана қ., Тәуелсіздік даңғ., 3–402",
      hours: "Дс–Жм: 9:00 – 18:00",
      mapEyebrow: "География",
      mapTitle: "Біз бүкіл Қазақстан бойынша жұмыс істейміз",
    },
    mapCities: [
      { n: "Астана", x: 55, y: 28, hub: true },
      { n: "Алматы", x: 72, y: 68 },
      { n: "Түркістан", x: 46, y: 73 },
      { n: "Ақтау", x: 9, y: 60 },
      { n: "Орал", x: 14, y: 30 },
      { n: "Павлодар", x: 64, y: 22 },
      { n: "Атырау", x: 11, y: 48 },
    ],
    footer: { nav: "Навигация", contacts: "Байланыс", rights: "Барлық құқықтар қорғалған." },
    slogan: "Қазақстанды сенімді серіктеспен ашыңыз",
  },
};

/** Images for the six tours, aligned with Dict.tours by index. */
export const TOUR_IMAGES: { src: string; pos?: string }[] = [
  { src: "/images/tour-astana.jpg", pos: "50% 22%" },
  { src: "/images/tour-almaty.jpg" },
  { src: "/images/tour-charyn.jpg" },
  { src: "/images/tour-kolsai.jpg" },
  { src: "/images/tour-turkestan.jpg" },
  { src: "/images/tour-mangystau.jpg" },
];

/** Gallery slider images (first six captions of Dict.caps). */
export const SLIDER_IMAGES: string[] = [
  "/images/hero-astana.jpg",
  "/images/gal-charyn.jpg",
  "/images/gal-kolsai.jpg",
  "/images/gal-bozzhyra.jpg",
  "/images/gal-shymbulak.jpg",
  "/images/gal-bao.jpg",
];

/** Gallery grid images, aligned with all nine captions of Dict.caps. */
export const GRID_IMAGES: { src: string; pos?: string }[] = [
  { src: "/images/tour-astana.jpg", pos: "50% 22%" },
  { src: "/images/gal-charyn.jpg" },
  { src: "/images/gal-kolsai.jpg" },
  { src: "/images/gal-bozzhyra.jpg" },
  { src: "/images/gal-shymbulak.jpg" },
  { src: "/images/gal-bao.jpg" },
  { src: "/images/gal-khanshatyr.jpg" },
  { src: "/images/gal-turkestan.jpg" },
  { src: "/images/cta-steppe.jpg" },
];

/** Tailwind span classes for the gallery mosaic, aligned with GRID_IMAGES. */
export const GRID_SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "sm:col-span-3",
  "",
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-2",
  "sm:col-span-2",
];

export const PHONE = "+7 701 362 67 25";
export const PHONE_HREF = "tel:+77013626725";
export const PHONE_2 = "+7 775 944 31 36";
export const PHONE_2_HREF = "tel:+77759443136";
export const WHATSAPP_LINKS = [
  { label: "+7 701 362 67 25", href: "https://wa.me/77013626725" },
  { label: "+7 775 944 31 36", href: "https://wa.me/77759443136" },
];
export const EMAIL = "gvidontour.kz@gmail.com";
export const INSTAGRAM = "@gvidontour";
