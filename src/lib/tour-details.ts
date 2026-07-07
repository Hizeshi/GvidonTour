import type { TourDetails } from "./catalog-types";

/**
 * Demo detail-page content for the six seed tours. The client will replace
 * these with real programmes via the database (Tour.details); this file also
 * feeds the static fallback so detail pages never render empty.
 */
export const TOUR_DETAILS: Record<string, TourDetails> = {
  "astana-city": {
    route: {
      ru: "Байтерек — Хан Шатыр — Дворец мира и согласия — набережная Ишима",
      en: "Baiterek — Khan Shatyr — Palace of Peace — Ishim embankment",
      kk: "Бәйтерек — Хан Шатыр — Бейбітшілік сарайы — Есіл жағалауы",
    },
    startPlace: {
      ru: "Холл вашего отеля в Астане, 09:00",
      en: "Your hotel lobby in Astana, 9:00 am",
      kk: "Астанадағы қонақүйіңіздің холлы, 09:00",
    },
    about: {
      ru: "Столица, выросшая в степи за четверть века: футуристичные небоскрёбы Нуржол-бульвара, сфера Нур-Алем и вечерние огни набережной Ишима. За два дня вы увидите главные символы города и поймёте, почему Астану называют городом будущего.",
      en: "A capital that grew out of the steppe in a quarter of a century: the futuristic towers of Nurzhol Boulevard, the Nur Alem sphere and the evening lights of the Ishim embankment. In two days you will see the city's main symbols and understand why Astana is called the city of the future.",
      kk: "Ширек ғасырда даладан өсіп шыққан елорда: Нұржол бульварының футуристік мұнаралары, Нұр Әлем сферасы және Есіл жағалауының кешкі оттары. Екі күнде қаланың басты рәміздерін көріп, Астананы неге болашақ қаласы деп атайтынын түсінесіз.",
    },
    gallery: ["/images/tour-astana.jpg", "/images/hero-astana.jpg", "/images/gal-khanshatyr.jpg"],
    program: [
      {
        time: "1 / 09:00",
        text: {
          ru: "Встреча с гидом, обзорная экскурсия по левобережью: Акорда, Дом министерств, Нуржол-бульвар.",
          en: "Meet your guide, panoramic tour of the Left Bank: Akorda, the ministries district and Nurzhol Boulevard.",
          kk: "Гидпен кездесу, сол жағалауға шолу экскурсиясы: Ақорда, министрліктер үйі, Нұржол бульвары.",
        },
      },
      {
        time: "1 / 11:30",
        text: {
          ru: "Подъём на Байтерек — панорама столицы со смотровой площадки.",
          en: "Ascend Baiterek tower for a panoramic view of the capital.",
          kk: "Бәйтерекке көтерілу — байқау алаңынан елорда панорамасы.",
        },
      },
      {
        time: "1 / 13:30",
        text: {
          ru: "Обед с блюдами казахской кухни, после — Национальный музей Республики Казахстан.",
          en: "Lunch with Kazakh cuisine, then the National Museum of Kazakhstan.",
          kk: "Қазақ тағамдарымен түскі ас, одан кейін — ҚР Ұлттық музейі.",
        },
      },
      {
        time: "1 / 19:00",
        text: {
          ru: "Вечерняя прогулка по набережной Ишима с подсветкой города.",
          en: "Evening walk along the illuminated Ishim embankment.",
          kk: "Жарықтандырылған Есіл жағалауымен кешкі серуен.",
        },
      },
      {
        time: "2 / 10:00",
        text: {
          ru: "Хан Шатыр и сфера Нур-Алем (ЭКСПО-2017), Дворец мира и согласия, свободное время и трансфер.",
          en: "Khan Shatyr and the Nur Alem sphere (EXPO 2017), the Palace of Peace and Reconciliation, free time and transfer.",
          kk: "Хан Шатыр мен Нұр Әлем сферасы (ЭКСПО-2017), Бейбітшілік және келісім сарайы, бос уақыт және трансфер.",
        },
      },
    ],
    included: [
      { ru: "Лицензированный гид", en: "Licensed guide", kk: "Лицензияланған гид" },
      { ru: "Комфортабельный транспорт", en: "Comfortable transport", kk: "Жайлы көлік" },
      { ru: "Входные билеты по программе", en: "Entrance tickets per programme", kk: "Бағдарлама бойынша кіру билеттері" },
      { ru: "Обед в первый день", en: "Lunch on day one", kk: "Бірінші күнгі түскі ас" },
      { ru: "Трансфер из/в отель", en: "Hotel transfers", kk: "Қонақүйден/қонақүйге трансфер" },
    ],
    notIncluded: [
      { ru: "Авиабилеты", en: "Flights", kk: "Әуе билеттері" },
      { ru: "Проживание", en: "Accommodation", kk: "Тұру" },
      { ru: "Ужины и личные расходы", en: "Dinners and personal expenses", kk: "Кешкі ас және жеке шығындар" },
    ],
    tips: [
      { ru: "Возьмите удобную обувь — за день проходим 8–10 км.", en: "Bring comfortable shoes — we walk 8–10 km a day.", kk: "Ыңғайлы аяқ киім алыңыз — күніне 8–10 км жүреміз." },
      { ru: "Вечером у реки прохладно даже летом — пригодится ветровка.", en: "Evenings by the river are cool even in summer — bring a windbreaker.", kk: "Өзен жағасында кешке жазда да салқын — желдеткіш киім керек." },
      { ru: "Для смотровой площадки Байтерека нужен документ.", en: "An ID is required for the Baiterek observation deck.", kk: "Бәйтерек байқау алаңына құжат қажет." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 120 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 95 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },

  "almaty-alatau": {
    route: {
      ru: "Алматы — Медеу — Шымбулак — Кок-Тобе — Большое Алматинское озеро",
      en: "Almaty — Medeu — Shymbulak — Kok-Tobe — Big Almaty Lake",
      kk: "Алматы — Медеу — Шымбұлақ — Көктөбе — Үлкен Алматы көлі",
    },
    startPlace: {
      ru: "Холл вашего отеля в Алматы, 09:00",
      en: "Your hotel lobby in Almaty, 9:00 am",
      kk: "Алматыдағы қонақүйіңіздің холлы, 09:00",
    },
    about: {
      ru: "Южная столица у подножия Заилийского Алатау: высокогорный каток Медеу, канатная дорога на Шымбулак, панорама города с Кок-Тобе и бирюзовое Большое Алматинское озеро на высоте 2511 метров.",
      en: "The southern capital at the foot of the Trans-Ili Alatau: the Medeu high-altitude rink, the Shymbulak cable car, the Kok-Tobe panorama and the turquoise Big Almaty Lake at 2,511 metres.",
      kk: "Іле Алатауының етегіндегі оңтүстік астана: биік таулы Медеу мұз айдыны, Шымбұлақ аспалы жолы, Көктөбеден қала панорамасы және 2511 метр биіктіктегі көгілдір Үлкен Алматы көлі.",
    },
    gallery: ["/images/tour-almaty.jpg", "/images/gal-shymbulak.jpg", "/images/gal-bao.jpg"],
    program: [
      { time: "1 / 09:00", text: { ru: "Обзорная экскурсия: парк 28 панфиловцев, Вознесенский собор, Зелёный базар.", en: "City tour: Panfilov Park, Ascension Cathedral, the Green Bazaar.", kk: "Шолу экскурсиясы: 28 панфиловшы паркі, Вознесенск соборы, Көк базар." } },
      { time: "1 / 14:00", text: { ru: "Медеу и подъём по канатной дороге на Шымбулак (3200 м).", en: "Medeu and the cable car up to Shymbulak (3,200 m).", kk: "Медеу және аспалы жолмен Шымбұлаққа көтерілу (3200 м)." } },
      { time: "2 / 10:00", text: { ru: "Большое Алматинское озеро и Алма-Арасанское ущелье.", en: "Big Almaty Lake and the Alma-Arasan gorge.", kk: "Үлкен Алматы көлі және Алма-Арасан шатқалы." } },
      { time: "3 / 10:00", text: { ru: "Кок-Тобе, музей Ыкылас и свободное время в центре города.", en: "Kok-Tobe, the folk instruments museum and free time downtown.", kk: "Көктөбе, Ықылас музейі және қала орталығында бос уақыт." } },
    ],
    included: [
      { ru: "Гид и транспорт на все дни", en: "Guide and transport for all days", kk: "Барлық күнге гид және көлік" },
      { ru: "Канатная дорога Медеу — Шымбулак", en: "Medeu — Shymbulak cable car", kk: "Медеу — Шымбұлақ аспалы жолы" },
      { ru: "Экосбор нацпарка", en: "National park eco fee", kk: "Ұлттық парктің экоалымы" },
      { ru: "Трансферы по программе", en: "Transfers per programme", kk: "Бағдарлама бойынша трансферлер" },
    ],
    notIncluded: [
      { ru: "Проживание и питание", en: "Accommodation and meals", kk: "Тұру және тамақтану" },
      { ru: "Подъём на Кок-Тобе", en: "Kok-Tobe cable car", kk: "Көктөбеге көтерілу" },
      { ru: "Личные расходы", en: "Personal expenses", kk: "Жеке шығындар" },
    ],
    tips: [
      { ru: "В горах на 10–15 °C холоднее, чем в городе, — одевайтесь слоями.", en: "The mountains are 10–15 °C colder than the city — dress in layers.", kk: "Тауда қалаға қарағанда 10–15 °C салқын — қабаттап киініңіз." },
      { ru: "Возьмите солнцезащитные очки и крем: высокогорное солнце активное.", en: "Bring sunglasses and sunscreen: the high-altitude sun is strong.", kk: "Күннен қорғайтын көзілдірік пен крем алыңыз: биік таулы күн белсенді." },
      { ru: "На БАО купание запрещено — это питьевой резервуар города.", en: "Swimming is prohibited at Big Almaty Lake — it is the city's drinking reservoir.", kk: "Үлкен Алматы көлінде шомылуға тыйым салынған — бұл қаланың ауыз су қоймасы." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 180 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 150 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },

  "charyn-canyon": {
    route: {
      ru: "Алматы — Чарынский каньон (Долина замков) — Алматы, 430 км",
      en: "Almaty — Charyn Canyon (Valley of Castles) — Almaty, 430 km",
      kk: "Алматы — Шарын шатқалы (Қамалдар алқабы) — Алматы, 430 км",
    },
    startPlace: {
      ru: "Алматы, место по договорённости, 06:30",
      en: "Almaty, pick-up point by arrangement, 6:30 am",
      kk: "Алматы, келісілген орын, 06:30",
    },
    about: {
      ru: "Каньон возрастом 12 миллионов лет на реке Чарын: красные скалы-«замки» высотой до 300 метров, смотровые площадки и прогулка по дну Долины замков к реке. Одна из самых фотогеничных природных достопримечательностей Казахстана.",
      en: "A 12-million-year-old canyon on the Charyn river: red castle-like cliffs up to 300 metres, viewpoints and a walk along the Valley of Castles down to the river. One of Kazakhstan's most photogenic natural wonders.",
      kk: "Шарын өзеніндегі 12 миллион жылдық шатқал: биіктігі 300 метрге дейінгі қызыл «қамал» жартастар, байқау алаңдары және Қамалдар алқабының түбімен өзенге дейін серуен. Қазақстанның ең фотогенді табиғи көрікті жерлерінің бірі.",
    },
    gallery: ["/images/tour-charyn.jpg", "/images/gal-charyn.jpg", "/images/cta-steppe.jpg"],
    program: [
      { time: "06:30", text: { ru: "Выезд из Алматы, по дороге — завтрак и виды Кульджинского тракта.", en: "Departure from Almaty, breakfast stop and views along the Kuldzha road.", kk: "Алматыдан шығу, жолда таңғы ас және Құлжа жолының көріністері." } },
      { time: "10:30", text: { ru: "Смотровые площадки каньона, спуск в Долину замков.", en: "Canyon viewpoints, descent into the Valley of Castles.", kk: "Шатқалдың байқау алаңдары, Қамалдар алқабына түсу." } },
      { time: "13:00", text: { ru: "Пикник у реки Чарын, свободное время для фото.", en: "Picnic by the Charyn river, free time for photos.", kk: "Шарын өзені жағасында пикник, фотоға бос уақыт." } },
      { time: "16:00", text: { ru: "Выезд обратно, возвращение в Алматы к 20:00.", en: "Drive back, arrival in Almaty around 8:00 pm.", kk: "Кері шығу, Алматыға 20:00-ге қарай оралу." } },
    ],
    included: [
      { ru: "Транспорт и водитель-гид", en: "Transport and driver-guide", kk: "Көлік және жүргізуші-гид" },
      { ru: "Экосбор нацпарка «Чарын»", en: "Charyn national park eco fee", kk: "«Шарын» ұлттық паркінің экоалымы" },
      { ru: "Пикник у реки", en: "Riverside picnic", kk: "Өзен жағасындағы пикник" },
    ],
    notIncluded: [
      { ru: "Личные расходы", en: "Personal expenses", kk: "Жеке шығындар" },
      { ru: "Электрокар по дну каньона (по желанию)", en: "Optional electric shuttle inside the canyon", kk: "Шатқал түбіндегі электрокар (қалау бойынша)" },
    ],
    tips: [
      { ru: "Спуск и подъём — по 90 ступеней: нужна нескользящая обувь.", en: "The descent and climb are ~90 steps: wear non-slip shoes.", kk: "Түсу мен көтерілу — 90 басқыш: сырғанамайтын аяқ киім керек." },
      { ru: "Летом в каньоне жарко — головной убор и 1,5 л воды обязательны.", en: "Summers are hot in the canyon — a hat and 1.5 l of water are a must.", kk: "Жазда шатқалда ыстық — бас киім мен 1,5 л су міндетті." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 45 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 35 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },

  "kolsai-kaindy": {
    route: {
      ru: "Алматы — Саты — Кольсайские озёра — озеро Каинды",
      en: "Almaty — Saty — Kolsai Lakes — Lake Kaindy",
      kk: "Алматы — Саты — Көлсай көлдері — Қайыңды көлі",
    },
    startPlace: {
      ru: "Алматы, место по договорённости, 07:00",
      en: "Almaty, pick-up point by arrangement, 7:00 am",
      kk: "Алматы, келісілген орын, 07:00",
    },
    about: {
      ru: "«Жемчужина Северного Тянь-Шаня»: каскад из трёх горных озёр Кольсай и затонувший еловый лес озера Каинды, родившегося после землетрясения 1911 года. Ночёвка в гостевом доме села Саты с домашней кухней.",
      en: "The pearl of the Northern Tian Shan: the cascade of three Kolsai mountain lakes and the sunken spruce forest of Lake Kaindy, born of the 1911 earthquake. Overnight in a Saty village guesthouse with home cooking.",
      kk: "Солтүстік Тянь-Шаньның інжу-маржаны: үш Көлсай тау көлінің каскады және 1911 жылғы жер сілкінісінен пайда болған Қайыңды көлінің су астындағы шырша орманы. Саты ауылындағы қонақ үйде түнеу, үй тағамдары.",
    },
    gallery: ["/images/tour-kolsai.jpg", "/images/gal-kolsai.jpg"],
    program: [
      { time: "1 / 07:00", text: { ru: "Выезд из Алматы, прибытие на первое Кольсайское озеро, прогулка по берегу.", en: "Departure from Almaty, arrival at the first Kolsai lake, lakeside walk.", kk: "Алматыдан шығу, бірінші Көлсай көліне жету, жағалаумен серуен." } },
      { time: "1 / 18:00", text: { ru: "Размещение в гостевом доме в Саты, ужин с домашней кухней.", en: "Check-in at the Saty guesthouse, home-cooked dinner.", kk: "Сатыдағы қонақ үйге орналасу, үй тағамдарымен кешкі ас." } },
      { time: "2 / 09:00", text: { ru: "Переезд к озеру Каинды, прогулка к затонувшему лесу.", en: "Drive to Lake Kaindy, walk to the sunken forest.", kk: "Қайыңды көліне бару, су астындағы орманға серуен." } },
      { time: "2 / 15:00", text: { ru: "Возвращение в Алматы к 20:00.", en: "Return to Almaty around 8:00 pm.", kk: "Алматыға 20:00-ге қарай оралу." } },
    ],
    included: [
      { ru: "Транспорт 4×4 и водитель-гид", en: "4×4 transport and driver-guide", kk: "4×4 көлік және жүргізуші-гид" },
      { ru: "Ночёвка в гостевом доме", en: "Guesthouse overnight stay", kk: "Қонақ үйде түнеу" },
      { ru: "Ужин и завтрак в Саты", en: "Dinner and breakfast in Saty", kk: "Сатыдағы кешкі және таңғы ас" },
      { ru: "Экосборы нацпарка", en: "National park eco fees", kk: "Ұлттық парктің экоалымдары" },
    ],
    notIncluded: [
      { ru: "Обеды", en: "Lunches", kk: "Түскі ас" },
      { ru: "Конная прогулка к Каинды (по желанию)", en: "Optional horseback ride to Kaindy", kk: "Қайыңдыға атпен серуен (қалау бойынша)" },
      { ru: "Личные расходы", en: "Personal expenses", kk: "Жеке шығындар" },
    ],
    tips: [
      { ru: "Ночи в горах холодные даже летом — возьмите флиску и шапку.", en: "Mountain nights are cold even in summer — bring a fleece and a beanie.", kk: "Тауда түндер жазда да суық — флиска мен бас киім алыңыз." },
      { ru: "Дорога к Каинды — грунтовая: укачивает — возьмите таблетки.", en: "The Kaindy road is unpaved: bring motion-sickness pills if needed.", kk: "Қайыңдыға жол — топырақ жол: жол ауруына дәрі алыңыз." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 95 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 75 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },

  turkestan: {
    route: {
      ru: "Туркестан: мавзолей Ходжи Ахмеда Ясави — Караван-Сарай — древний Отрар",
      en: "Turkestan: Khoja Ahmed Yasawi Mausoleum — Karavan Saray — ancient Otrar",
      kk: "Түркістан: Қожа Ахмет Ясауи кесенесі — Керуен-Сарай — ежелгі Отырар",
    },
    startPlace: {
      ru: "Ж/д вокзал или отель Туркестана, 09:00",
      en: "Turkestan railway station or your hotel, 9:00 am",
      kk: "Түркістан теміржол вокзалы немесе қонақүйіңіз, 09:00",
    },
    about: {
      ru: "Духовная столица тюркского мира: мавзолей Ходжи Ахмеда Ясави — шедевр Тимуридов и объект ЮНЕСКО, современный комплекс Караван-Сарай и городище Отрар, где начиналась история Великого Шёлкового пути.",
      en: "The spiritual capital of the Turkic world: the UNESCO-listed Timurid masterpiece of the Khoja Ahmed Yasawi Mausoleum, the modern Karavan Saray complex and the Otrar site where the Silk Road story began.",
      kk: "Түркі әлемінің рухани астанасы: ЮНЕСКО тізіміндегі Темірлан дәуірінің жауһары — Қожа Ахмет Ясауи кесенесі, заманауи Керуен-Сарай кешені және Ұлы Жібек жолы тарихы басталған Отырар қалашығы.",
    },
    gallery: ["/images/tour-turkestan.jpg", "/images/gal-turkestan.jpg"],
    program: [
      { time: "1 / 09:00", text: { ru: "Мавзолей Ходжи Ахмеда Ясави, подземная мечеть Хильвет, исторический музей.", en: "Khoja Ahmed Yasawi Mausoleum, the Hilvet underground mosque, the history museum.", kk: "Қожа Ахмет Ясауи кесенесі, Хилует жерасты мешіті, тарихи музей." } },
      { time: "1 / 16:00", text: { ru: "Комплекс Караван-Сарай, вечернее шоу «Летающая лодка».", en: "Karavan Saray complex and the evening Flying Boat show.", kk: "Керуен-Сарай кешені, кешкі «Ұшатын қайық» шоуы." } },
      { time: "2 / 09:00", text: { ru: "Поездка к городищу Отрар и мавзолею Арыстан-Баба, возвращение к 15:00.", en: "Trip to the Otrar site and the Arystan Bab Mausoleum, return by 3:00 pm.", kk: "Отырар қалашығы мен Арыстан баб кесенесіне сапар, 15:00-ге оралу." } },
    ],
    included: [
      { ru: "Гид-историк", en: "Historian guide", kk: "Тарихшы гид" },
      { ru: "Транспорт по программе", en: "Transport per programme", kk: "Бағдарлама бойынша көлік" },
      { ru: "Входные билеты", en: "Entrance tickets", kk: "Кіру билеттері" },
    ],
    notIncluded: [
      { ru: "Проживание и питание", en: "Accommodation and meals", kk: "Тұру және тамақтану" },
      { ru: "Билеты на вечернее шоу", en: "Evening show tickets", kk: "Кешкі шоу билеттері" },
    ],
    tips: [
      { ru: "В мечетях и мавзолее нужна закрытая одежда, женщинам — платок.", en: "Modest clothing is required in mosques and the mausoleum; women need a headscarf.", kk: "Мешіттер мен кесенеде жабық киім қажет, әйелдерге — орамал." },
      { ru: "Летом жара до +40 °C — планируйте прогулки на утро и вечер.", en: "Summer heat reaches +40 °C — plan walks for mornings and evenings.", kk: "Жазда ыстық +40 °C-қа жетеді — серуенді таңертең және кешке жоспарлаңыз." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 110 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 85 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },

  "mangystau-bozzhyra": {
    route: {
      ru: "Актау — Долина шаров Торыш — Шеркала — плато Бозжыра — урочище Босжира",
      en: "Aktau — Torysh Valley of Balls — Sherkala — Bozzhyra plateau",
      kk: "Ақтау — Торыш шарлар алқабы — Шерқала — Бозжыра үстірті",
    },
    startPlace: {
      ru: "Аэропорт или отель Актау, 08:00",
      en: "Aktau airport or your hotel, 8:00 am",
      kk: "Ақтау әуежайы немесе қонақүйіңіз, 08:00",
    },
    about: {
      ru: "Экспедиция по «казахстанскому Марсу»: меловые пики Бозжыры, гора-крепость Шеркала, долина каменных шаров Торыш и ночёвки в юртовом лагере под звёздным небом Устюрта. Формат 4×4, максимум пейзажей — минимум цивилизации.",
      en: "An expedition across 'Kazakh Mars': the chalk peaks of Bozzhyra, the fortress mountain Sherkala, the Torysh valley of stone balls and nights in a yurt camp under the Ustyurt stars. A 4×4 journey — maximum landscapes, minimum civilisation.",
      kk: "«Қазақстандық Марс» бойынша экспедиция: Бозжыраның бор шыңдары, Шерқала қамал-тауы, Торыш тас шарлар алқабы және Үстірт жұлдыздары астындағы киіз үй лагерінде түнеу. 4×4 форматы — пейзаж көп, өркениет аз.",
    },
    gallery: ["/images/tour-mangystau.jpg", "/images/gal-bozzhyra.jpg", "/images/cta-steppe.jpg"],
    program: [
      { time: "1 / 08:00", text: { ru: "Выезд из Актау: долина шаров Торыш и гора Шеркала, юртовый лагерь.", en: "Leave Aktau: the Torysh valley of balls and Mount Sherkala, yurt camp.", kk: "Ақтаудан шығу: Торыш шарлар алқабы мен Шерқала тауы, киіз үй лагері." } },
      { time: "2 / 09:00", text: { ru: "Каньон Капамсай и подземная мечеть Шакпак-Ата.", en: "Kapamsai canyon and the Shakpak-Ata underground mosque.", kk: "Қапамсай шатқалы және Шақпақ-Ата жерасты мешіті." } },
      { time: "3 / 08:00", text: { ru: "Плато Бозжыра: смотровые «клыки», закат над урочищем.", en: "Bozzhyra plateau: the 'fangs' viewpoints and sunset over the tract.", kk: "Бозжыра үстірті: «азу тіс» байқау алаңдары, шатқал үстіндегі күн батуы." } },
      { time: "4 / 09:00", text: { ru: "Впадина Карагие (−132 м) и возвращение в Актау к 15:00.", en: "The Karagiye depression (−132 m) and return to Aktau by 3:00 pm.", kk: "Қарақия ойпаты (−132 м) және Ақтауға 15:00-ге оралу." } },
    ],
    included: [
      { ru: "Внедорожники 4×4 с водителями", en: "4×4 vehicles with drivers", kk: "Жүргізушілері бар 4×4 көліктер" },
      { ru: "Юртовый лагерь и трёхразовое питание", en: "Yurt camp and three meals a day", kk: "Киіз үй лагері және үш мезгіл тамақ" },
      { ru: "Гид-проводник", en: "Expedition guide", kk: "Жол бастаушы гид" },
      { ru: "Спутниковая связь на маршруте", en: "Satellite communication on route", kk: "Маршруттағы спутниктік байланыс" },
    ],
    notIncluded: [
      { ru: "Авиабилеты до Актау", en: "Flights to Aktau", kk: "Ақтауға әуе билеттері" },
      { ru: "Спальник (можно арендовать)", en: "Sleeping bag (rental available)", kk: "Ұйықтайтын қап (жалға алуға болады)" },
      { ru: "Личные расходы", en: "Personal expenses", kk: "Жеке шығындар" },
    ],
    tips: [
      { ru: "Связи на плато нет — предупредите близких заранее.", en: "There is no mobile coverage on the plateau — warn your family in advance.", kk: "Үстіртте байланыс жоқ — жақындарыңызға алдын ала айтыңыз." },
      { ru: "Перепады температуры до 20 °C за сутки: нужны и шорты, и пуховик.", en: "Day-night temperature swings reach 20 °C: pack both shorts and a down jacket.", kk: "Тәулігіне 20 °C-қа дейінгі температура айырмасы: шорт та, пуховик те керек." },
      { ru: "Лучший сезон — апрель–июнь и сентябрь–октябрь.", en: "The best seasons are April–June and September–October.", kk: "Ең жақсы маусым — сәуір–маусым және қыркүйек–қазан." },
    ],
    priceTable: [
      { group: { ru: "1–2 человека", en: "1–2 people", kk: "1–2 адам" }, price: "от 290 000 ₸" },
      { group: { ru: "3–6 человек", en: "3–6 people", kk: "3–6 адам" }, price: "от 240 000 ₸" },
      { group: { ru: "7 и более", en: "7 and more", kk: "7 және одан көп" }, price: "по запросу" },
    ],
  },
};
