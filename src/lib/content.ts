export type Lang = "ru" | "en" | "kk";

export const LANGS: Lang[] = ["ru", "en", "kk"];

export type NavKey = "home" | "about" | "tours" | "gallery" | "services" | "agencies" | "blog" | "contacts";

export const NAV_ROUTES: Record<NavKey, string> = {
  home: "/",
  about: "/about",
  tours: "/tours",
  gallery: "/gallery",
  services: "/services",
  agencies: "/agencies",
  blog: "/blog",
  contacts: "/contacts",
};

/** Sub-links shown in the "Tours" header dropdown — reuse the existing
 *  catalog filters (days=1, category=kids/mice) instead of new content types. */
export const TOURS_MENU_LINKS = [
  { key: "all", href: "/tours" },
  { key: "excursions", href: "/tours?days=1" },
  { key: "kids", href: "/tours?category=kids" },
  { key: "mice", href: "/tours?category=mice" },
] as const;

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

export interface AgencyBenefit {
  icon: string;
  t: string;
  d: string;
}

export interface AgencyStep {
  n: string;
  t: string;
  d: string;
}

export interface BlogEntry {
  title: string;
  excerpt: string;
  content: string[];
}

export interface Dict {
  brandTag: string;
  nav: Record<NavKey, string>;
  toursMenu: { all: string; excursions: string; kids: string; mice: string };
  currencyLabel: string;
  agencies: {
    eyebrow: string;
    title: string;
    intro: string;
    benefitsEyebrow: string;
    benefitsTitle: string;
    benefits: AgencyBenefit[];
    stepsEyebrow: string;
    stepsTitle: string;
    steps: AgencyStep[];
    ctaTitle: string;
    ctaSub: string;
    ctaBtn: string;
    bookMsg: string;
  };
  blogPage: { eyebrow: string; title: string; intro: string; readMore: string; back: string; similar: string };
  blogPosts: BlogEntry[];
  hero: { eyebrow: string; title: string; sub: string; cta1: string; cta2: string; scroll: string };
  valuesHead: { eyebrow: string; title: string };
  values: ValueEntry[];
  homeCats: { eyebrow: string; title: string };
  homeDirs: { eyebrow: string; title: string };
  homeReviews: { eyebrow: string; title: string; video: string };
  homeAch: { eyebrow: string; title: string; note: string };
  featured: { eyebrow: string; title: string; viewAll: string };
  catalog: {
    book: string;
    bookMsg: string;
    fCity: string;
    fCategory: string;
    fPrice: string;
    fDays: string;
    fAll: string;
    fReset: string;
    priceLow: string;
    priceMid: string;
    priceHigh: string;
    days1: string;
    days23: string;
    days4: string;
    empty: string;
    emptyCta: string;
  };
  ctaBand: { title: string; sub: string; btn: string };
  toursPage: { eyebrow: string; title: string; intro: string; details: string };
  tourPage: {
    back: string;
    route: string;
    startPlace: string;
    duration: string;
    about: string;
    program: string;
    included: string;
    notIncluded: string;
    tips: string;
    priceTitle: string;
    priceGroup: string;
    pricePer: string;
    priceNote: string;
    bookTitle: string;
    request: string;
    similar: string;
  };
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
  mapCities: { key: string; n: string; hub?: boolean }[];
  footer: { nav: string; contacts: string; rights: string };
  slogan: string;
}

export const CONTENT: Record<Lang, Dict> = {
  ru: {
    brandTag: "Принимающий туроператор в Казахстане",
    nav: { home: "Главная", about: "О компании", tours: "Туры", gallery: "Галерея", services: "Услуги", agencies: "Для агентств", blog: "Блог", contacts: "Контакты" },
    toursMenu: { all: "Все туры", excursions: "Экскурсии", kids: "Детский туризм", mice: "MICE" },
    currencyLabel: "Курс валют",
    agencies: {
      eyebrow: "Для агентств",
      title: "Партнёрство с GVIDON TOUR",
      intro: "Работаем с турагентствами по всему миру — предлагаем выгодные условия, готовые маршруты и полное сопровождение групп в Казахстане.",
      benefitsEyebrow: "Условия сотрудничества",
      benefitsTitle: "Почему агентства выбирают нас",
      benefits: [
        { icon: "percent", t: "Комиссионное вознаграждение", d: "Гибкая система комиссий и специальные тарифы для постоянных партнёров." },
        { icon: "users", t: "Персональный менеджер", d: "Отдельный менеджер для быстрой обработки заявок и подбора маршрутов." },
        { icon: "megaphone", t: "Маркетинговые материалы", d: "Фото, видео и презентации туров для продвижения на вашей площадке." },
        { icon: "file-signature", t: "Прозрачные условия", d: "Официальный договор, понятные сроки оплаты и подтверждения бронирований." },
      ],
      stepsEyebrow: "Как начать",
      stepsTitle: "Три шага до сотрудничества",
      steps: [
        { n: "01", t: "Заявка", d: "Отправьте заявку на партнёрство — мы свяжемся в течение 24 часов." },
        { n: "02", t: "Договор", d: "Подписываем агентский договор и согласуем условия." },
        { n: "03", t: "Работа", d: "Получаете доступ к каталогу туров и персональному менеджеру." },
      ],
      ctaTitle: "Станьте партнёром GVIDON TOUR",
      ctaSub: "Расскажите о своём агентстве — и мы подготовим индивидуальные условия сотрудничества.",
      ctaBtn: "Оставить заявку",
      bookMsg: "Здравствуйте! Представляю турагентство и хочу узнать об условиях партнёрства с GVIDON TOUR.",
    },
    blogPage: {
      eyebrow: "Блог",
      title: "Полезные статьи о Казахстане",
      intro: "Советы, гиды по направлениям и практическая информация для тех, кто планирует путешествие.",
      readMore: "Читать далее",
      back: "Все статьи",
      similar: "Другие статьи",
    },
    blogPosts: [
      {
        title: "Топ-5 мест, которые нужно увидеть в Казахстане",
        excerpt: "От футуристичной Астаны до марсианских пейзажей Мангистау — подборка направлений, с которых стоит начать знакомство со страной.",
        content: [
          "Казахстан — девятая по величине страна мира, и за один отпуск увидеть её целиком невозможно. Но если вы планируете первую поездку, есть несколько мест, которые дают самое яркое представление о разнообразии страны.",
          "Астана поражает контрастом: футуристичные башни Хан Шатыр и Байтерек соседствуют с широкой степью, которая начинается сразу за городской чертой. Вечерняя набережная Ишима — одно из самых красивых мест для прогулки.",
          "Чарынский каньон, часто называемый младшим братом Гранд-Каньона, впечатляет масштабом и цветом скал на закате. Кольсайские озёра и затопленный лес Каинды рядом с Алматы — для тех, кто любит горы и тишину.",
          "Туркестан хранит дух Шёлкового пути: мавзолей Ходжи Ахмеда Ясави — объект ЮНЕСКО и одна из главных святынь Центральной Азии. А плато Бозжыра в Мангистау выглядит настолько неземным, что кажется декорацией к фантастическому фильму.",
        ],
      },
      {
        title: "Лучшее время для поездки в Мангистау",
        excerpt: "Пустынный регион на берегу Каспия капризен к погоде. Рассказываем, в какие месяцы поездка на плато Бозжыра и Устюрт будет наиболее комфортной.",
        content: [
          "Мангистау — один из самых зрелищных, но и самых суровых регионов Казахстана. Здесь почти нет тени и источников воды, а разница температур между сезонами огромна, поэтому время поездки стоит планировать заранее.",
          "Оптимальный сезон — конец апреля и май, когда степь ещё зелёная после весенних дождей, а дневная температура комфортна для многочасовых прогулок по каньонам. Второй хороший период — сентябрь и первая половина октября, когда спадает летняя жара.",
          "Лето (июнь–август) в Мангистау изнуряюще жаркое — днём воздух прогревается выше 40°C, а укрыться от солнца в открытой степи почти негде. Такие поездки лучше планировать на раннее утро и закат, с длинным перерывом в середине дня.",
          "Зимой регион тоже красив — меловые горы Бозжыры на фоне снега выглядят особенно контрастно, но дороги могут быть занесены, а световой день короткий. Мы всегда уточняем актуальный прогноз перед выездом и корректируем маршрут под погоду.",
        ],
      },
      {
        title: "Что взять с собой в поездку по Казахстану",
        excerpt: "Резко континентальный климат и большие расстояния между городами — собрали список вещей, который пригодится в любом маршруте по стране.",
        content: [
          "Казахстан — страна контрастов не только в пейзажах, но и в климате: летом в степи может быть за +35°C, а вечером в горах — прохладно. Универсальный принцип сборов — многослойная одежда, которую легко снять или добавить.",
          "Для летних маршрутов обязательны головной убор, солнцезащитный крем и запас воды — особенно для поездок в Мангистау и Чарынский каньон, где мало тени. Удобная закрытая обувь нужна практически везде: большинство маршрутов подразумевает ходьбу по неровной местности.",
          "Если поездка захватывает горы — Кольсайские озёра, Шымбулак — возьмите тёплую куртку и что-то на случай дождя: погода в горах меняется быстро. Для межгородских переездов пригодятся влажные салфетки, повербанк и наличные тенге на случай, если карта не примут в отдалённых районах.",
          "И последнее: разрешение на фото- и видеосъёмку в некоторых местах (например, на территории мавзолеев или закрытых объектов) стоит уточнять на месте у гида — мы всегда предупреждаем об этом заранее в программе тура.",
        ],
      },
      {
        title: "Виза в Казахстан: что нужно знать туристу",
        excerpt: "Граждане многих стран могут въехать в Казахстан без визы. Разбираемся, кому она всё же нужна и как мы помогаем с оформлением.",
        content: [
          "Казахстан действует безвизовый режим для граждан более 90 стран, включая большинство государств Евросоюза, США, Великобританию, Японию, Южную Корею и другие — обычно на срок до 30 дней. Для въезда достаточно загранпаспорта, действительного минимум 6 месяцев после даты въезда.",
          "Если ваша страна не входит в безвизовый список, потребуется оформить визу заранее в консульстве Казахстана или получить электронную визу через официальный портал eGov — процесс занимает от нескольких дней до пары недель в зависимости от типа визы.",
          "Мы готовим приглашение и сопроводительные документы для туристов, которым нужна визовая поддержка, и консультируем по всем этапам оформления — от выбора типа визы до подготовки пакета документов.",
          "На границе стоит быть готовым предъявить обратный билет и подтверждение бронирования отеля или программы тура — у нас это подтверждение мы высылаем сразу после оплаты, вместе с полным маршрутом поездки.",
        ],
      },
    ],
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
      { icon: "user-check", t: "Опытные гиды", d: "Лицензированные гиды с многолетним опытом работы по всем регионам страны." },
      { icon: "badge-check", t: "Лицензированный туроператор", d: "Официальная лицензия и полное юридическое сопровождение поездок." },
      { icon: "heart-handshake", t: "Индивидуальный подход", d: "Маршруты под ваши интересы, сроки и состав группы." },
      { icon: "map", t: "Работаем по всему Казахстану", d: "От Астаны и Алматы до Мангистау и Туркестана — все 14 регионов." },
      { icon: "handshake", t: "Надёжные партнёры", d: "Проверенные отели, перевозчики и площадки в каждом городе." },
      { icon: "headphones", t: "Круглосуточная поддержка", d: "На связи 24/7 — до, во время и после путешествия." },
    ],
    homeCats: { eyebrow: "Виды туризма", title: "Категории туров" },
    homeDirs: { eyebrow: "Популярные направления", title: "Куда поехать в Казахстане" },
    homeReviews: { eyebrow: "Отзывы", title: "Что говорят наши гости", video: "Смотреть видеоотзыв" },
    homeAch: { eyebrow: "Достижения", title: "Нам доверяют", note: "Лицензии, сертификаты и награды — доступны в офисе по запросу." },
    featured: { eyebrow: "Готовые туры", title: "Избранные маршруты", viewAll: "Все туры" },
    catalog: {
      book: "Забронировать",
      bookMsg: "Здравствуйте! Хочу забронировать тур «{title}».",
      fCity: "Город",
      fCategory: "Категория",
      fPrice: "Стоимость",
      fDays: "Длительность",
      fAll: "Все",
      fReset: "Сбросить",
      priceLow: "до 100 000 ₸",
      priceMid: "100–200 тыс. ₸",
      priceHigh: "от 200 000 ₸",
      days1: "1 день",
      days23: "2–3 дня",
      days4: "4+ дней",
      empty: "По выбранным фильтрам туров пока нет. Оставьте заявку — и мы соберём маршрут специально для вас.",
      emptyCta: "Оставить заявку",
    },
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
    tourPage: {
      back: "Все туры",
      route: "Маршрут",
      startPlace: "Место начала",
      duration: "Длительность",
      about: "Описание",
      program: "Программа по дням",
      included: "Что входит",
      notIncluded: "Что не входит",
      tips: "Рекомендации туристам",
      priceTitle: "Стоимость",
      priceGroup: "Размер группы",
      pricePer: "Цена",
      priceNote: "Точная стоимость зависит от дат, состава группы и уровня проживания. Оставьте заявку — рассчитаем индивидуально.",
      bookTitle: "Забронировать тур",
      request: "Оставить заявку",
      similar: "Похожие маршруты",
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
      { key: "astana", n: "Астана", hub: true },
      { key: "almaty", n: "Алматы" },
      { key: "turkestan", n: "Туркестан" },
      { key: "aktau", n: "Актау" },
      { key: "oral", n: "Уральск" },
      { key: "pavlodar", n: "Павлодар" },
      { key: "atyrau", n: "Атырау" },
    ],
    footer: { nav: "Навигация", contacts: "Контакты", rights: "Все права защищены." },
    slogan: "Откройте Казахстан с надёжным партнёром",
  },
  en: {
    brandTag: "Inbound tour operator in Kazakhstan",
    nav: { home: "Home", about: "About", tours: "Tours", gallery: "Gallery", services: "Services", agencies: "For Agencies", blog: "Blog", contacts: "Contacts" },
    toursMenu: { all: "All tours", excursions: "Excursions", kids: "Kids tourism", mice: "MICE" },
    currencyLabel: "Exchange rate",
    agencies: {
      eyebrow: "For Agencies",
      title: "Partner with GVIDON TOUR",
      intro: "We work with travel agencies worldwide — offering attractive terms, ready-made routes and full group support across Kazakhstan.",
      benefitsEyebrow: "Partnership terms",
      benefitsTitle: "Why agencies choose us",
      benefits: [
        { icon: "percent", t: "Commission rewards", d: "A flexible commission structure and special rates for regular partners." },
        { icon: "users", t: "Dedicated manager", d: "A personal manager for fast request handling and route selection." },
        { icon: "megaphone", t: "Marketing materials", d: "Photos, videos and presentations to promote our tours on your platform." },
        { icon: "file-signature", t: "Transparent terms", d: "An official contract with clear payment terms and booking confirmations." },
      ],
      stepsEyebrow: "How to start",
      stepsTitle: "Three steps to partnership",
      steps: [
        { n: "01", t: "Application", d: "Send a partnership request — we will get back to you within 24 hours." },
        { n: "02", t: "Contract", d: "We sign an agency agreement and agree on the terms." },
        { n: "03", t: "Work together", d: "You get access to the tour catalogue and a dedicated manager." },
      ],
      ctaTitle: "Become a GVIDON TOUR partner",
      ctaSub: "Tell us about your agency — and we will prepare individual partnership terms.",
      ctaBtn: "Send a request",
      bookMsg: "Hello! I represent a travel agency and would like to learn about partnership terms with GVIDON TOUR.",
    },
    blogPage: {
      eyebrow: "Blog",
      title: "Useful articles about Kazakhstan",
      intro: "Tips, destination guides and practical information for anyone planning a trip.",
      readMore: "Read more",
      back: "All articles",
      similar: "More articles",
    },
    blogPosts: [
      {
        title: "Top 5 places to see in Kazakhstan",
        excerpt: "From futuristic Astana to the Martian landscapes of Mangystau — a shortlist of destinations to start your acquaintance with the country.",
        content: [
          "Kazakhstan is the ninth-largest country in the world, and no single trip can cover it all. But if you are planning a first visit, a handful of places give the clearest sense of just how varied the country is.",
          "Astana is a study in contrast: the futuristic towers of Khan Shatyr and Baiterek stand next to open steppe that begins right at the edge of the city. The evening Ishim embankment is one of the most beautiful places for a walk.",
          "Charyn Canyon, often called Grand Canyon's younger sibling, impresses with its scale and the colour of its cliffs at sunset. The Kolsai Lakes and the sunken forest of Kaindy near Almaty are for anyone who loves mountains and quiet.",
          "Turkestan keeps the spirit of the Silk Road alive: the Mausoleum of Khoja Ahmed Yasawi is a UNESCO site and one of Central Asia's most important shrines. And the Bozzhyra plateau in Mangystau looks so otherworldly it could be a film set.",
        ],
      },
      {
        title: "The best time to visit Mangystau",
        excerpt: "This desert region on the Caspian shore is unforgiving in extreme weather. Here's when a trip to the Bozzhyra plateau and Ustyurt is most comfortable.",
        content: [
          "Mangystau is one of the most spectacular yet harshest regions of Kazakhstan. There is almost no shade or water source, and the temperature swings between seasons are extreme, so it pays to plan the timing of a trip in advance.",
          "The best season is late April and May, when the steppe is still green after the spring rains and daytime temperatures are comfortable for hours of walking through the canyons. The second good window is September and the first half of October, once the summer heat has passed.",
          "Summer (June–August) in Mangystau is exhaustingly hot — daytime air temperatures climb above 40°C, and there is almost nowhere to escape the sun on the open steppe. Trips in this period are best planned around early morning and sunset, with a long midday break.",
          "Winter has its own beauty — the chalk mountains of Bozzhyra look especially striking against snow — but roads can be snowed in and daylight hours are short. We always check the current forecast before departure and adjust the route to the weather.",
        ],
      },
      {
        title: "What to pack for a trip to Kazakhstan",
        excerpt: "A sharply continental climate and long distances between cities — here's a packing list that works for almost any route through the country.",
        content: [
          "Kazakhstan is a country of contrasts not only in its landscapes but in its climate: summer in the steppe can top +35°C, while evenings in the mountains turn cool. The universal packing principle is layered clothing you can add or remove easily.",
          "For summer routes, a hat, sunscreen and a water supply are essential — especially for trips to Mangystau and Charyn Canyon, where shade is scarce. Comfortable closed-toe shoes are needed almost everywhere, since most routes involve walking on uneven ground.",
          "If your trip includes the mountains — the Kolsai Lakes, Shymbulak — bring a warm jacket and something for rain, since mountain weather changes quickly. For journeys between cities, wet wipes, a power bank and some cash in tenge are useful in case cards aren't accepted in remote areas.",
          "One last note: permission to photograph or film in some places (mausoleums, restricted sites) is best confirmed on-site with your guide — we always flag this in advance in the tour programme.",
        ],
      },
      {
        title: "Kazakhstan visa: what tourists need to know",
        excerpt: "Citizens of many countries can enter Kazakhstan visa-free. Here's who still needs a visa and how we help with the paperwork.",
        content: [
          "Kazakhstan has a visa-free regime for citizens of more than 90 countries, including most of the EU, the US, the UK, Japan, South Korea and others — usually for stays of up to 30 days. A passport valid for at least 6 months after the entry date is all that's required.",
          "If your country isn't on the visa-free list, you'll need to apply for a visa in advance at a Kazakhstan consulate or get an e-visa through the official eGov portal — the process takes anywhere from a few days to a couple of weeks depending on the visa type.",
          "We prepare invitation letters and supporting documents for travellers who need visa support, and advise on every step of the process — from choosing the right visa type to assembling the document package.",
          "At the border, be ready to show a return ticket and confirmation of your hotel booking or tour programme — we send this confirmation right after payment, together with the full itinerary.",
        ],
      },
    ],
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
      { icon: "user-check", t: "Experienced guides", d: "Licensed guides with years of experience across every region of the country." },
      { icon: "badge-check", t: "Licensed tour operator", d: "Official licence and full legal support for your trips." },
      { icon: "heart-handshake", t: "Personal approach", d: "Routes built around your interests, dates and group." },
      { icon: "map", t: "All across Kazakhstan", d: "From Astana and Almaty to Mangystau and Turkestan — all 14 regions." },
      { icon: "handshake", t: "Reliable partners", d: "Trusted hotels, carriers and venues in every city." },
      { icon: "headphones", t: "24/7 support", d: "Always in touch — before, during and after your journey." },
    ],
    homeCats: { eyebrow: "Tourism types", title: "Tour categories" },
    homeDirs: { eyebrow: "Popular destinations", title: "Where to go in Kazakhstan" },
    homeReviews: { eyebrow: "Reviews", title: "What our guests say", video: "Watch video review" },
    homeAch: { eyebrow: "Achievements", title: "Trusted by travellers", note: "Licences, certificates and awards — available at the office on request." },
    featured: { eyebrow: "Ready-made tours", title: "Featured journeys", viewAll: "All tours" },
    catalog: {
      book: "Book now",
      bookMsg: "Hello! I would like to book the tour “{title}”.",
      fCity: "City",
      fCategory: "Category",
      fPrice: "Price",
      fDays: "Duration",
      fAll: "All",
      fReset: "Reset",
      priceLow: "under 100,000 ₸",
      priceMid: "100–200 thousand ₸",
      priceHigh: "from 200,000 ₸",
      days1: "1 day",
      days23: "2–3 days",
      days4: "4+ days",
      empty: "No tours match the selected filters yet. Send a request — and we will craft a route just for you.",
      emptyCta: "Send a request",
    },
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
    tourPage: {
      back: "All tours",
      route: "Route",
      startPlace: "Starting point",
      duration: "Duration",
      about: "About",
      program: "Day-by-day programme",
      included: "What's included",
      notIncluded: "What's not included",
      tips: "Traveller tips",
      priceTitle: "Price",
      priceGroup: "Group size",
      pricePer: "Price",
      priceNote: "The exact price depends on dates, group size and accommodation level. Send a request and we will quote you individually.",
      bookTitle: "Book this tour",
      request: "Send a request",
      similar: "Similar routes",
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
      { key: "astana", n: "Astana", hub: true },
      { key: "almaty", n: "Almaty" },
      { key: "turkestan", n: "Turkestan" },
      { key: "aktau", n: "Aktau" },
      { key: "oral", n: "Oral" },
      { key: "pavlodar", n: "Pavlodar" },
      { key: "atyrau", n: "Atyrau" },
    ],
    footer: { nav: "Navigation", contacts: "Contacts", rights: "All rights reserved." },
    slogan: "Discover Kazakhstan with a trusted partner",
  },
  kk: {
    brandTag: "Қазақстандағы қабылдаушы туроператор",
    nav: { home: "Басты бет", about: "Компания", tours: "Турлар", gallery: "Галерея", services: "Қызметтер", agencies: "Агенттіктерге", blog: "Блог", contacts: "Байланыс" },
    toursMenu: { all: "Барлық турлар", excursions: "Экскурсиялар", kids: "Балалар туризмі", mice: "MICE" },
    currencyLabel: "Валюта бағамы",
    agencies: {
      eyebrow: "Агенттіктерге",
      title: "GVIDON TOUR-мен серіктестік",
      intro: "Біз бүкіл әлем бойынша турагенттіктермен жұмыс істейміз — тиімді шарттар, дайын маршруттар және Қазақстан бойынша топтарды толық сүйемелдеу ұсынамыз.",
      benefitsEyebrow: "Ынтымақтастық шарттары",
      benefitsTitle: "Агенттіктер неге бізді таңдайды",
      benefits: [
        { icon: "percent", t: "Комиссиялық сыйақы", d: "Тұрақты серіктестер үшін икемді комиссия жүйесі және арнайы тарифтер." },
        { icon: "users", t: "Жеке менеджер", d: "Өтінімдерді жылдам өңдеу және маршрут таңдау үшін жеке менеджер." },
        { icon: "megaphone", t: "Маркетингтік материалдар", d: "Алаңыңызда турларды жылжыту үшін фото, видео және презентациялар." },
        { icon: "file-signature", t: "Ашық шарттар", d: "Ресми келісімшарт, түсінікті төлем мерзімдері және брондау растаулары." },
      ],
      stepsEyebrow: "Қалай бастау керек",
      stepsTitle: "Ынтымақтастыққа дейінгі үш қадам",
      steps: [
        { n: "01", t: "Өтінім", d: "Серіктестікке өтінім жіберіңіз — 24 сағат ішінде хабарласамыз." },
        { n: "02", t: "Келісімшарт", d: "Агенттік келісімшартқа қол қоямыз және шарттарды келісеміз." },
        { n: "03", t: "Жұмыс", d: "Турлар каталогына және жеке менеджерге қолжетімділік аласыз." },
      ],
      ctaTitle: "GVIDON TOUR серіктесі болыңыз",
      ctaSub: "Агенттігіңіз туралы айтыңыз — біз жеке ынтымақтастық шарттарын дайындаймыз.",
      ctaBtn: "Өтінім қалдыру",
      bookMsg: "Сәлеметсіз бе! Мен турагенттікті білдіремін және GVIDON TOUR-мен серіктестік шарттары туралы білгім келеді.",
    },
    blogPage: {
      eyebrow: "Блог",
      title: "Қазақстан туралы пайдалы мақалалар",
      intro: "Сапарды жоспарлап жатқандарға арналған кеңестер, бағыттар бойынша нұсқаулықтар және практикалық ақпарат.",
      readMore: "Толығырақ оқу",
      back: "Барлық мақалалар",
      similar: "Басқа мақалалар",
    },
    blogPosts: [
      {
        title: "Қазақстанда көруге тұрарлық үздік 5 орын",
        excerpt: "Болашақ қаласы Астанадан Маңғыстаудың ғаламшарлық пейзаждарына дейін — елмен танысуды бастауға болатын бағыттар.",
        content: [
          "Қазақстан — әлемдегі тоғызыншы үлкен ел, және оны бір демалыста толық көру мүмкін емес. Бірақ бірінші сапарды жоспарлап отырсаңыз, елдің әртүрлілігін ең жарқын көрсететін бірнеше орын бар.",
          "Астана қарама-қайшылығымен таң қалдырады: Хан Шатыр мен Бәйтеректің футуристік мұнаралары қала шетінен басталатын кең даламен көршілес. Есіл жағалауындағы кешкі серуен — ең әдемі орындардың бірі.",
          "Гранд-Каньонның кіші бауыры деп аталатын Шарын шатқалы кешкі күнде жартастардың түсі мен ауқымымен таңғалдырады. Алматыға жақын Көлсай көлдері мен су басқан Қайыңды орманы — тау мен тыныштықты жақсы көретіндерге арналған.",
          "Түркістан Жібек жолының рухын сақтайды: Қожа Ахмет Ясауи кесенесі — ЮНЕСКО нысаны және Орталық Азияның басты қасиетті орындарының бірі. Ал Маңғыстаудағы Бозжыра үстірті соншалықты бөтен әлемдей көрінеді, тіпті фантастикалық фильмнің декорациясы сияқты.",
        ],
      },
      {
        title: "Маңғыстауға баруға ең қолайлы уақыт",
        excerpt: "Каспий жағалауындағы шөлейт өңір ауа райына қатты тәуелді. Бозжыра үстірті мен Үстіртке саяхат қай айларда ыңғайлы болатынын айтамыз.",
        content: [
          "Маңғыстау — Қазақстанның ең әсерлі, әрі ең қатал өңірлерінің бірі. Мұнда көлеңке мен су көзі дерлік жоқ, ал маусымдар арасындағы температура айырмашылығы үлкен, сондықтан сапар уақытын алдын ала жоспарлаған жөн.",
          "Ең қолайлы маусым — сәуірдің соңы мен мамыр, көктемгі жаңбырдан кейін дала әлі жасыл, ал күндізгі температура шатқалдар бойымен ұзақ серуендеуге қолайлы. Екінші жақсы кезең — қыркүйек пен қазанның бірінші жартысы, жаздың ыстығы басылғанда.",
          "Маңғыстаудағы жаз (маусым–тамыз) шаршатарлықтай ыстық — күндіз ауа температурасы 40°C-тан асады, ал ашық далада күннен жасыратын жер дерлік жоқ. Мұндай сапарларды таңертең мен күн батарда, түс кезінде ұзақ үзіліспен жоспарлаған дұрыс.",
          "Қыста да өңір әдемі — Бозжыраның бор таулары қар аясында ерекше көрінеді, бірақ жолдар қармен жабылып қалуы мүмкін, ал күндізгі жарық қысқа. Біз әрқашан жол алдында ауа райын нақтылап, маршрутты соған сай түзетеміз.",
        ],
      },
      {
        title: "Қазақстан бойынша сапарға не алу керек",
        excerpt: "Күрт континенттік климат пен қалалар арасындағы үлкен қашықтық — елдің кез келген маршрутына қажет заттар тізімін жинадық.",
        content: [
          "Қазақстан — тек пейзаждарында ғана емес, климатында да қайшылықтар елі: жазда далада +35°C-тан асуы мүмкін, ал кешке таулар салқын болады. Заттарды жинаудың әмбебап принципі — оңай шешуге не қосуға болатын қабатты киім.",
          "Жазғы маршруттар үшін бас киім, күннен қорғайтын крем және су қоры міндетті — әсіресе көлеңке аз Маңғыстау мен Шарын шатқалына сапарларда. Ыңғайлы жабық аяқ киім дерлік барлық жерде қажет: маршруттардың көбі бедері біркелкі емес жерлермен жүруді талап етеді.",
          "Егер сапар тауларды — Көлсай көлдері, Шымбұлақты — қамтыса, жылы куртка және жаңбырға арналған зат алыңыз: таудағы ауа райы жылдам өзгереді. Қалалар арасындағы сапарларда дымқыл майлықтар, повербанк және шалғай аймақтарда карта қабылданбауы мүмкін болғандықтан қолма-қол теңге пайдалы болады.",
          "Соңғысы: кейбір орындарда (кесенелер аумағында немесе жабық нысандарда) фото-бейне түсіруге рұқсатты жергілікті жерде гидтен нақтылаған жөн — біз мұны әрқашан тур бағдарламасында алдын ала ескертеміз.",
        ],
      },
      {
        title: "Қазақстанға виза: турист не білуі керек",
        excerpt: "Көптеген елдердің азаматтары Қазақстанға визасыз кіре алады. Кімге әлі де виза керек және біз рәсімдеуге қалай көмектесеміз.",
        content: [
          "Қазақстанда 90-нан астам елдің азаматтары үшін визасыз режим қолданылады, оның ішінде Еуроодақтың көпшілігі, АҚШ, Ұлыбритания, Жапония, Оңтүстік Корея және басқалар — әдетте 30 күнге дейін. Кіру үшін кіру күнінен кейін кемінде 6 ай жарамды шетелдік төлқұжат жеткілікті.",
          "Егер еліңіз визасыз тізімге кірмесе, Қазақстан консулдығында алдын ала виза рәсімдеу немесе ресми eGov порталы арқылы электронды виза алу қажет — процесс виза түріне байланысты бірнеше күннен бірнеше аптаға дейін созылады.",
          "Біз виза қолдауы қажет туристер үшін шақыру хаты мен қосымша құжаттарды дайындаймыз және рәсімдеудің әр кезеңі бойынша кеңес береміз — виза түрін таңдаудан құжаттар топтамасын жинауға дейін.",
          "Шекарада кері билет пен қонақүй брондау немесе тур бағдарламасының растамасын көрсетуге дайын болыңыз — біз бұл растаманы төлемнен кейін бүкіл сапар маршрутымен бірге дереу жібереміз.",
        ],
      },
    ],
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
      { icon: "user-check", t: "Тәжірибелі гидтер", d: "Елдің барлық өңірлері бойынша көпжылдық тәжірибесі бар лицензияланған гидтер." },
      { icon: "badge-check", t: "Лицензияланған туроператор", d: "Ресми лицензия және сапарларды толық заңды сүйемелдеу." },
      { icon: "heart-handshake", t: "Жеке көзқарас", d: "Қызығушылығыңызға, мерзіміңізге және топ құрамына сай маршруттар." },
      { icon: "map", t: "Бүкіл Қазақстан бойынша", d: "Астана мен Алматыдан Маңғыстау мен Түркістанға дейін — барлық 14 өңір." },
      { icon: "handshake", t: "Сенімді серіктестер", d: "Әр қаладағы тексерілген қонақүйлер, тасымалдаушылар мен алаңдар." },
      { icon: "headphones", t: "Тәулік бойы қолдау", d: "24/7 байланыстамыз — сапарға дейін, сапар кезінде және одан кейін." },
    ],
    homeCats: { eyebrow: "Туризм түрлері", title: "Тур санаттары" },
    homeDirs: { eyebrow: "Танымал бағыттар", title: "Қазақстанда қайда бару" },
    homeReviews: { eyebrow: "Пікірлер", title: "Қонақтарымыз не дейді", video: "Бейнепікірді көру" },
    homeAch: { eyebrow: "Жетістіктер", title: "Бізге сенеді", note: "Лицензиялар, сертификаттар мен марапаттар — сұраныс бойынша кеңседе қолжетімді." },
    featured: { eyebrow: "Дайын турлар", title: "Таңдаулы маршруттар", viewAll: "Барлық турлар" },
    catalog: {
      book: "Брондау",
      bookMsg: "Сәлеметсіз бе! «{title}» турын брондағым келеді.",
      fCity: "Қала",
      fCategory: "Санат",
      fPrice: "Бағасы",
      fDays: "Ұзақтығы",
      fAll: "Барлығы",
      fReset: "Тазарту",
      priceLow: "100 000 ₸ дейін",
      priceMid: "100–200 мың ₸",
      priceHigh: "200 000 ₸ бастап",
      days1: "1 күн",
      days23: "2–3 күн",
      days4: "4+ күн",
      empty: "Таңдалған сүзгілер бойынша турлар әзірге жоқ. Өтінім қалдырыңыз — біз сізге арнайы маршрут құрастырамыз.",
      emptyCta: "Өтінім қалдыру",
    },
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
    tourPage: {
      back: "Барлық турлар",
      route: "Маршрут",
      startPlace: "Басталу орны",
      duration: "Ұзақтығы",
      about: "Сипаттама",
      program: "Күндер бойынша бағдарлама",
      included: "Не кіреді",
      notIncluded: "Не кірмейді",
      tips: "Туристерге кеңестер",
      priceTitle: "Бағасы",
      priceGroup: "Топ мөлшері",
      pricePer: "Бағасы",
      priceNote: "Нақты бағасы күндерге, топ құрамына және тұру деңгейіне байланысты. Өтінім қалдырыңыз — жеке есептейміз.",
      bookTitle: "Турды брондау",
      request: "Өтінім қалдыру",
      similar: "Ұқсас маршруттар",
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
      { key: "astana", n: "Астана", hub: true },
      { key: "almaty", n: "Алматы" },
      { key: "turkestan", n: "Түркістан" },
      { key: "aktau", n: "Ақтау" },
      { key: "oral", n: "Орал" },
      { key: "pavlodar", n: "Павлодар" },
      { key: "atyrau", n: "Атырау" },
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

/** Home hero slider — {src, capIndex} pairs into Dict.caps for localized alt text. */
export const HERO_SLIDES: { src: string; capIndex: number; pos?: string }[] = [
  { src: "/images/hero-astana.jpg", capIndex: 0 },
  { src: "/images/gal-bozzhyra.jpg", capIndex: 3 },
  { src: "/images/gal-charyn.jpg", capIndex: 1 },
  { src: "/images/cta-steppe.jpg", capIndex: 8 },
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
  { src: "/images/gal-baiterek.jpg" },
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

export const WHATSAPP_BOOKING = "77013626725";

/** Localized names shared by seed, fallbacks and the catalog filters. */
export type LocalizedName = Record<Lang, string>;

export const CITY_NAMES: Record<string, LocalizedName> = {
  astana: { ru: "Астана", en: "Astana", kk: "Астана" },
  almaty: { ru: "Алматы", en: "Almaty", kk: "Алматы" },
  burabay: { ru: "Бурабай", en: "Burabay", kk: "Бурабай" },
  charyn: { ru: "Чарын", en: "Charyn", kk: "Шарын" },
  baikonur: { ru: "Байконур", en: "Baikonur", kk: "Байқоңыр" },
  turkestan: { ru: "Туркестан", en: "Turkestan", kk: "Түркістан" },
  mangystau: { ru: "Мангистау", en: "Mangystau", kk: "Маңғыстау" },
};

export const CATEGORY_DATA = [
  { slug: "kids", icon: "backpack", name: { ru: "Детский туризм", en: "Kids tourism", kk: "Балалар туризмі" } },
  { slug: "industrial", icon: "factory", name: { ru: "Промышленный туризм", en: "Industrial tourism", kk: "Өнеркәсіптік туризм" } },
  { slug: "ethno", icon: "tent", name: { ru: "Этнотуры", en: "Ethno tours", kk: "Этнотурлар" } },
  { slug: "pilgrimage", icon: "landmark", name: { ru: "Паломнические туры", en: "Pilgrimage tours", kk: "Қажылық турлар" } },
  { slug: "vip", icon: "crown", name: { ru: "VIP", en: "VIP", kk: "VIP" } },
  { slug: "mice", icon: "briefcase", name: { ru: "MICE", en: "MICE", kk: "MICE" } },
];

export const DIRECTION_DATA = [
  { slug: "astana", image: "/images/tour-astana.jpg", name: CITY_NAMES.astana },
  { slug: "almaty", image: "/images/tour-almaty.jpg", name: CITY_NAMES.almaty },
  { slug: "burabay", image: "/images/dir-burabay.jpg", name: CITY_NAMES.burabay },
  { slug: "charyn", image: "/images/tour-charyn.jpg", name: CITY_NAMES.charyn },
  { slug: "baikonur", image: "/images/dir-baikonur.jpg", name: CITY_NAMES.baikonur },
  { slug: "turkestan", image: "/images/tour-turkestan.jpg", name: CITY_NAMES.turkestan },
];

/** Presentation-only crop hints for direction card images. */
export const DIRECTION_IMAGE_POS: Record<string, string> = {
  astana: "50% 22%",
};

/** Demo testimonials — the client replaces these with real reviews via the DB.
 *  videoUrl is optional (shows a "watch video review" link when present). */
export const REVIEW_DATA = [
  {
    author: "Анна Ковалёва",
    rating: 5,
    videoUrl: null as string | null,
    text: {
      ru: "Организовали нам тур по Астане и Боровому — всё до мелочей продумано, гид великолепный. Вернёмся ещё!",
      en: "They arranged a tour of Astana and Burabay for us — everything thought through to the last detail, a wonderful guide. We'll be back!",
      kk: "Астана мен Бурабай бойынша тур ұйымдастырды — бәрі майда-шүйдесіне дейін ойластырылған, гид тамаша. Тағы ораламыз!",
    },
  },
  {
    author: "Марат Сулейменов",
    rating: 5,
    videoUrl: null,
    text: {
      ru: "Ездили на Чарын и Кольсай. Трансфер вовремя, обеды вкусные, маршрут — огонь. Рекомендую GVIDON TOUR всем.",
      en: "We went to Charyn and Kolsai. Transfers on time, tasty meals, a fantastic route. I recommend GVIDON TOUR to everyone.",
      kk: "Шарын мен Көлсайға бардық. Трансфер уақытында, тамақ дәмді, маршрут керемет. GVIDON TOUR-ды бәріне ұсынамын.",
    },
  },
  {
    author: "Elena Fischer",
    rating: 5,
    videoUrl: null,
    text: {
      ru: "Приезжала из Германии на экспедицию в Мангистау. Профессиональная команда и незабываемые пейзажи Бозжыры.",
      en: "I came from Germany for the Mangystau expedition. A professional team and the unforgettable landscapes of Bozzhyra.",
      kk: "Германиядан Маңғыстау экспедициясына келдім. Кәсіби команда және Бозжыраның ұмытылмас пейзаждары.",
    },
  },
];

/** Achievement placeholders — the client provides real licence/award/partner
 *  images (kept in the office); until then these render as labelled icon tiles. */
export const ACHIEVEMENT_DATA = [
  { icon: "shield-check", name: { ru: "Лицензия туроператора", en: "Tour operator licence", kk: "Туроператор лицензиясы" } },
  { icon: "award", name: { ru: "Сертификаты качества", en: "Quality certificates", kk: "Сапа сертификаттары" } },
  { icon: "trophy", name: { ru: "Отраслевые награды", en: "Industry awards", kk: "Салалық марапаттар" } },
  { icon: "map-pin", name: { ru: "Visit Astana", en: "Visit Astana", kk: "Visit Astana" } },
  { icon: "handshake", name: { ru: "Надёжные партнёры", en: "Trusted partners", kk: "Сенімді серіктестер" } },
];

export const TOUR_META = [
  { slug: "astana-city", days: 2, priceFrom: 120_000, city: "astana", featured: true },
  { slug: "almaty-alatau", days: 3, priceFrom: 180_000, city: "almaty", featured: true },
  { slug: "charyn-canyon", days: 1, priceFrom: 45_000, city: "charyn", featured: true },
  { slug: "kolsai-kaindy", days: 2, priceFrom: 95_000, city: "almaty" },
  { slug: "turkestan", days: 2, priceFrom: 110_000, city: "turkestan" },
  { slug: "mangystau-bozzhyra", days: 4, priceFrom: 290_000, city: "mangystau" },
];

/** Demo blog posts — the client replaces these with real articles via the DB.
 *  Aligned with Dict.blogPosts by index. */
export const BLOG_META = [
  { slug: "top-5-places-kazakhstan", image: "/images/gal-bozzhyra.jpg", publishedAt: "2026-03-10" },
  { slug: "best-time-mangystau", image: "/images/tour-mangystau.jpg", publishedAt: "2026-02-18" },
  { slug: "packing-guide-kazakhstan", image: "/images/about-yurt.jpg", publishedAt: "2026-01-25" },
  { slug: "kazakhstan-visa-guide", image: "/images/hero-astana.jpg", publishedAt: "2026-01-05" },
];
