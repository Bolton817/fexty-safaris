const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'fr', 'de', 'ar', 'sw', 'zh'];

// Base English translations
const englishTranslations = {
  Hero: {
    slide1_h1: "Endless Discoveries.",
    slide1_h2: "Unforgettable Journeys.",
    slide1_text: "Curated luxury safaris tailored to your wildest dreams.",
    slide2_h1: "Pristine Shores.",
    slide2_h2: "Tropical Bliss.",
    slide2_text: "Relax and rejuvenate on the breathtaking beaches of the Kenyan coast.",
    slide3_h1: "Explore The World.",
    slide3_h2: "Limitless Horizons.",
    slide3_text: "From the Maldives to Dubai, let us take you beyond borders.",
    slide4_h1: "Romantic Getaways.",
    slide4_h2: "Forever Memories.",
    slide4_text: "Exclusive, intimate packages designed for your perfect honeymoon.",
    slide5_h1: "Corporate Retreats.",
    slide5_h2: "Seamless Execution.",
    slide5_text: "End-to-end travel solutions for business trips and conferences.",
    searchDestination: "Destination...",
    searchStyle: "Style...",
    searchDuration: "Duration...",
    searchBtn: "Search",
    searchWild: "Let's find your wild"
  },
  HomepageSections: {
    startingFrom: "Starting from",
    styles_safari_title: "Safari & Bush",
    styles_safari_desc: "Immerse yourself in the heart of the savanna with thrilling game drives, close encounters with the Big Five, and nights spent under star-studded skies. Experience the raw beauty of untamed wilderness with our expert guides who bring the bush to life.",
    styles_beach_title: "Beach Escapes",
    styles_beach_desc: "Unwind with barefoot luxury on the pristine white sands of the Indian Ocean. From secluded private villas to vibrant coral reefs perfect for diving, let the rhythmic waves and tropical breeze wash away your stress in these idyllic coastal paradises.",
    styles_romance_title: "Romance & Honeymoon",
    styles_romance_desc: "Celebrate your love with intimate retreats tailored for unforgettable beginnings. Enjoy secluded sundowners, private bush dinners by candlelight, and luxurious lodges offering unparalleled privacy, creating the perfect backdrop for your romantic getaway.",
    styles_group_title: "Group Departures",
    styles_group_desc: "Embark on shared adventures designed with logistical perfection for large parties or families. Build lifelong connections as you explore extraordinary landscapes together, all while enjoying seamless coordination and exclusive group-friendly accommodations.",
    corp_mice_title: "Corporate MICE",
    corp_mice_desc: "Reward top performers or host executive retreats. We handle ground logistics, luxury accommodations, and team-building perfectly.",
    corp_edu_title: "Educational Trips",
    corp_edu_desc: "Safe, structured, and profoundly enriching journeys for schools and universities. Cultivating global perspectives through immersive experiences.",
    corp_flight_title: "Flight Ticketing",
    corp_flight_desc: "Global reach with local expertise. Competitive fares and seamless booking experiences.",
    corp_visa_title: "Visa Assistance",
    corp_visa_desc: "Navigating complex immigration procedures with precision. Simplifying global travel for our clients.",
    corp_btn_proposal: "Request Proposal",
    corp_btn_learn: "Learn More"
  },
  Testimonials: {
    test1_text: "Fexty Safaris delivered beyond our wildest expectations. From the moment we landed, every detail was meticulously planned. Seeing a leopard in the Masai Mara at dawn is a memory etched in my soul forever.",
    test1_author: "Sarah Jenkins",
    test1_role: "Honeymooner, UK",
    test2_text: "Coordinating a corporate retreat for 50 executives is a nightmare, but Fexty made it look easy. The seamless logistics, stunning lodge, and team-building safaris boosted our company morale immensely.",
    test2_author: "Michael Chen",
    test2_role: "VP of Operations, TechCorp",
    test3_text: "As a photographer, I needed specific setups. The guides knew exactly where to be and when. Their profound knowledge of animal behavior got me shots I only dreamed of. Truly a world-class operation.",
    test3_author: "Elena Rodriguez",
    test3_role: "Wildlife Photographer"
  }
};

// Simplified translation mapping for demonstration (a real system would use a service)
const translations = {
  en: englishTranslations,
  es: {
    Hero: {
      slide1_h1: "Descubrimientos infinitos.", slide1_h2: "Viajes inolvidables.", slide1_text: "Safaris de lujo diseñados para sus sueños más salvajes.",
      slide2_h1: "Costas vírgenes.", slide2_h2: "Felicidad tropical.", slide2_text: "Relájese y rejuvenezca en las impresionantes playas de la costa keniata.",
      slide3_h1: "Explora el mundo.", slide3_h2: "Horizontes sin límites.", slide3_text: "Desde las Maldivas hasta Dubái, te llevamos más allá de las fronteras.",
      slide4_h1: "Escapadas románticas.", slide4_h2: "Recuerdos para siempre.", slide4_text: "Paquetes íntimos diseñados para tu luna de miel perfecta.",
      slide5_h1: "Retiros corporativos.", slide5_h2: "Ejecución impecable.", slide5_text: "Soluciones de viaje de principio a fin para viajes de negocios.",
      searchDestination: "Destino...", searchStyle: "Estilo...", searchDuration: "Duración...", searchBtn: "Buscar", searchWild: "Encuentra tu lado salvaje"
    },
    HomepageSections: {
      startingFrom: "A partir de",
      styles_safari_title: "Safari y Sabana", styles_safari_desc: "Sumérjase en el corazón de la sabana con emocionantes safaris.",
      styles_beach_title: "Escapes de playa", styles_beach_desc: "Relájese con lujo descalzo en las arenas blancas del Océano Índico.",
      styles_romance_title: "Romance y Luna de Miel", styles_romance_desc: "Celebre su amor con retiros íntimos para comienzos inolvidables.",
      styles_group_title: "Salidas en grupo", styles_group_desc: "Embárquese en aventuras compartidas diseñadas para grupos grandes.",
      corp_mice_title: "MICE Corporativo", corp_mice_desc: "Recompense a los mejores o organice retiros ejecutivos con logística impecable.",
      corp_edu_title: "Viajes Educativos", corp_edu_desc: "Viajes seguros y enriquecedores para escuelas y universidades.",
      corp_flight_title: "Billetes de vuelo", corp_flight_desc: "Alcance global con experiencia local y tarifas competitivas.",
      corp_visa_title: "Asistencia de visado", corp_visa_desc: "Navegando procedimientos complejos de inmigración con precisión.",
      corp_btn_proposal: "Solicitar Propuesta", corp_btn_learn: "Saber más"
    },
    Testimonials: {
      test1_text: "Fexty Safaris superó nuestras expectativas. Ver un leopardo al amanecer es un recuerdo para el alma.", test1_author: "Sarah Jenkins", test1_role: "Luna de miel, Reino Unido",
      test2_text: "Coordinar un retiro para 50 ejecutivos fue fácil con Fexty. La logística y los safaris impulsaron la moral.", test2_author: "Michael Chen", test2_role: "VP de Operaciones, TechCorp",
      test3_text: "Como fotógrafa, necesitaba configuraciones específicas. Los guías sabían exactamente dónde estar.", test3_author: "Elena Rodriguez", test3_role: "Fotógrafa de vida silvestre"
    }
  },
  fr: {
    Hero: {
      slide1_h1: "Découvertes infinies.", slide1_h2: "Voyages inoubliables.", slide1_text: "Des safaris de luxe conçus pour vos rêves les plus fous.",
      slide2_h1: "Côtes immaculées.", slide2_h2: "Bonheur tropical.", slide2_text: "Détendez-vous sur les plages de la côte kényane.",
      slide3_h1: "Explorez le monde.", slide3_h2: "Horizons sans limites.", slide3_text: "Des Maldives à Dubaï, nous vous emmenons au-delà des frontières.",
      slide4_h1: "Escapades romantiques.", slide4_h2: "Souvenirs pour toujours.", slide4_text: "Forfaits intimes conçus pour votre lune de miel parfaite.",
      slide5_h1: "Retraites d'entreprise.", slide5_h2: "Exécution sans faille.", slide5_text: "Solutions de voyage de bout en bout pour les voyages d'affaires.",
      searchDestination: "Destination...", searchStyle: "Style...", searchDuration: "Durée...", searchBtn: "Chercher", searchWild: "Trouvez votre côté sauvage"
    },
    HomepageSections: {
      startingFrom: "À partir de",
      styles_safari_title: "Safari et Brousse", styles_safari_desc: "Plongez au cœur de la savane avec des safaris passionnants.",
      styles_beach_title: "Évasions à la plage", styles_beach_desc: "Détendez-vous sur le sable blanc de l'océan Indien.",
      styles_romance_title: "Romance et lune de miel", styles_romance_desc: "Célébrez votre amour avec des retraites intimes.",
      styles_group_title: "Départs en groupe", styles_group_desc: "Embarquez pour des aventures partagées pour les grands groupes.",
      corp_mice_title: "MICE d'entreprise", corp_mice_desc: "Récompensez les plus performants ou organisez des retraites exécutives.",
      corp_edu_title: "Voyages éducatifs", corp_edu_desc: "Des voyages sûrs et enrichissants pour les écoles.",
      corp_flight_title: "Billets d'avion", corp_flight_desc: "Portée mondiale avec une expertise locale.",
      corp_visa_title: "Assistance Visa", corp_visa_desc: "Navigation précise dans les procédures d'immigration complexes.",
      corp_btn_proposal: "Demander une proposition", corp_btn_learn: "En savoir plus"
    },
    Testimonials: {
      test1_text: "Fexty Safaris a dépassé nos attentes. Voir un léopard à l'aube est inoubliable.", test1_author: "Sarah Jenkins", test1_role: "Lune de miel, Royaume-Uni",
      test2_text: "Coordonner une retraite pour 50 cadres était facile grâce à Fexty. La logistique était parfaite.", test2_author: "Michael Chen", test2_role: "VP des opérations, TechCorp",
      test3_text: "En tant que photographe, j'avais besoin d'arrangements spécifiques. Les guides étaient excellents.", test3_author: "Elena Rodriguez", test3_role: "Photographe animalier"
    }
  },
  de: {
    Hero: {
      slide1_h1: "Endlose Entdeckungen.", slide1_h2: "Unvergessliche Reisen.", slide1_text: "Luxus-Safaris, zugeschnitten auf Ihre wildesten Träume.",
      slide2_h1: "Unberührte Küsten.", slide2_h2: "Tropisches Glück.", slide2_text: "Entspannen Sie an den Stränden der kenianischen Küste.",
      slide3_h1: "Entdecke die Welt.", slide3_h2: "Grenzenlose Horizonte.", slide3_text: "Von den Malediven bis Dubai bringen wir Sie über Grenzen hinweg.",
      slide4_h1: "Romantische Kurzurlaube.", slide4_h2: "Erinnerungen für immer.", slide4_text: "Intime Pakete für Ihre perfekte Hochzeitsreise.",
      slide5_h1: "Firmen-Retreats.", slide5_h2: "Nahtlose Ausführung.", slide5_text: "Reiselösungen von A bis Z für Geschäftsreisen.",
      searchDestination: "Ziel...", searchStyle: "Stil...", searchDuration: "Dauer...", searchBtn: "Suchen", searchWild: "Finden Sie Ihre Wildnis"
    },
    HomepageSections: {
      startingFrom: "Ab",
      styles_safari_title: "Safari & Busch", styles_safari_desc: "Tauchen Sie ein in das Herz der Savanne mit spannenden Pirschfahrten.",
      styles_beach_title: "Strandurlaube", styles_beach_desc: "Entspannen Sie mit Barfuß-Luxus im weißen Sand des Indischen Ozeans.",
      styles_romance_title: "Romantik & Flitterwochen", styles_romance_desc: "Feiern Sie Ihre Liebe mit intimen Rückzugsorten.",
      styles_group_title: "Gruppenreisen", styles_group_desc: "Begeben Sie sich auf gemeinsame Abenteuer für große Gruppen.",
      corp_mice_title: "Corporate MICE", corp_mice_desc: "Belohnen Sie Top-Performer oder veranstalten Sie Executive-Retreats.",
      corp_edu_title: "Bildungsreisen", corp_edu_desc: "Sichere und bereichernde Reisen für Schulen.",
      corp_flight_title: "Flugtickets", corp_flight_desc: "Globale Reichweite mit lokaler Expertise.",
      corp_visa_title: "Visa-Unterstützung", corp_visa_desc: "Präzise Navigation durch komplexe Einwanderungsverfahren.",
      corp_btn_proposal: "Angebot anfordern", corp_btn_learn: "Mehr erfahren"
    },
    Testimonials: {
      test1_text: "Fexty Safaris hat unsere kühnsten Erwartungen übertroffen. Jedes Detail war perfekt geplant.", test1_author: "Sarah Jenkins", test1_role: "Flitterwochen, Großbritannien",
      test2_text: "Ein Retreat für 50 Führungskräfte zu koordinieren ist schwer, aber Fexty hat es einfach gemacht.", test2_author: "Michael Chen", test2_role: "VP Operations, TechCorp",
      test3_text: "Als Fotograf brauchte ich spezielle Setups. Die Guides wussten genau, wo sie sein mussten.", test3_author: "Elena Rodriguez", test3_role: "Wildtierfotograf"
    }
  },
  ar: {
    Hero: {
      slide1_h1: "اكتشافات لا نهاية لها.", slide1_h2: "رحلات لا تُنسى.", slide1_text: "رحلات سفاري فاخرة مصممة لأحلامك الجامحة.",
      slide2_h1: "شواطئ بكر.", slide2_h2: "نعيم استوائي.", slide2_text: "استرخ على شواطئ الساحل الكيني الخلابة.",
      slide3_h1: "اكتشف العالم.", slide3_h2: "آفاق لا حدود لها.", slide3_text: "من جزر المالديف إلى دبي، نأخذك إلى ما وراء الحدود.",
      slide4_h1: "عطلات رومانسية.", slide4_h2: "ذكريات إلى الأبد.", slide4_text: "باقات حميمة مصممة لشهر العسل المثالي.",
      slide5_h1: "خلوات الشركات.", slide5_h2: "تنفيذ سلس.", slide5_text: "حلول سفر متكاملة لرحلات العمل.",
      searchDestination: "وجهة...", searchStyle: "أسلوب...", searchDuration: "مدة...", searchBtn: "بحث", searchWild: "ابحث عن بريتك"
    },
    HomepageSections: {
      startingFrom: "يبدأ من",
      styles_safari_title: "سفاري وأدغال", styles_safari_desc: "انغمس في قلب السافانا مع رحلات السفاري المثيرة.",
      styles_beach_title: "عطلات شاطئية", styles_beach_desc: "استرخ برمال المحيط الهندي البيضاء.",
      styles_romance_title: "رومانسية وشهر العسل", styles_romance_desc: "احتفل بحبك مع خلوات حميمة.",
      styles_group_title: "مغادرات جماعية", styles_group_desc: "انطلق في مغامرات مشتركة مصممة للمجموعات الكبيرة.",
      corp_mice_title: "MICE للشركات", corp_mice_desc: "كافئ كبار الموظفين أو استضف خلوات تنفيذية.",
      corp_edu_title: "رحلات تعليمية", corp_edu_desc: "رحلات آمنة ومثرية للمدارس والجامعات.",
      corp_flight_title: "تذاكر الطيران", corp_flight_desc: "انتشار عالمي مع خبرة محلية.",
      corp_visa_title: "المساعدة في التأشيرات", corp_visa_desc: "التنقل في إجراءات الهجرة المعقدة بدقة.",
      corp_btn_proposal: "طلب اقتراح", corp_btn_learn: "أعرف أكثر"
    },
    Testimonials: {
      test1_text: "لقد تجاوزت Fexty Safaris توقعاتنا. رؤية نمر في الفجر هي ذكرى محفورة في روحي.", test1_author: "سارة جينكينز", test1_role: "شهر العسل، المملكة المتحدة",
      test2_text: "تنسيق خلوة لـ 50 مسؤولاً كان سهلاً بفضل فكستي. اللوجستيات عززت معنوياتنا.", test2_author: "مايكل تشين", test2_role: "نائب الرئيس للعمليات، تيك كورب",
      test3_text: "كمصور، كنت بحاجة إلى إعدادات محددة. كان المرشدون يعرفون بالضبط أين يتواجدون.", test3_author: "إيلينا رودريغيز", test3_role: "مصورة الحياة البرية"
    }
  },
  sw: {
    Hero: {
      slide1_h1: "Ugunduzi Usio na Mwisho.", slide1_h2: "Safari Zisizosahaulika.", slide1_text: "Safari za kifahari zilizoundwa kwa ndoto zako za porini.",
      slide2_h1: "Pwani Nzuri.", slide2_h2: "Furaha ya Kitropiki.", slide2_text: "Pumzika kwenye fukwe nzuri za pwani ya Kenya.",
      slide3_h1: "Chunguza Dunia.", slide3_h2: "Upeo Usio na Kikomo.", slide3_text: "Kutoka Maldives hadi Dubai, tunakupeleka zaidi ya mipaka.",
      slide4_h1: "Mapumziko ya Kimapenzi.", slide4_h2: "Kumbukumbu za Milele.", slide4_text: "Vifurushi maalum kwa ajili ya asali yako.",
      slide5_h1: "Mapumziko ya Kampuni.", slide5_h2: "Utekelezaji Bora.", slide5_text: "Ufumbuzi wa usafiri kwa mikutano ya kibiashara.",
      searchDestination: "Eneo...", searchStyle: "Mtindo...", searchDuration: "Muda...", searchBtn: "Tafuta", searchWild: "Tafuta asili yako"
    },
    HomepageSections: {
      startingFrom: "Kuanzia",
      styles_safari_title: "Safari & Pori", styles_safari_desc: "Jijumuishe katika moyo wa savana na michezo ya kusisimua.",
      styles_beach_title: "Mapumziko ya Pwani", styles_beach_desc: "Pumzika kwenye mchanga mweupe wa Bahari ya Hindi.",
      styles_romance_title: "Mapenzi & Fungate", styles_romance_desc: "Sherehekea upendo wako kwa faragha.",
      styles_group_title: "Safari za Makundi", styles_group_desc: "Jiunge na safari za makundi makubwa au familia.",
      corp_mice_title: "MICE ya Kampuni", corp_mice_desc: "Tupe mipango yako ya kibiashara na tuifanye kuwa kweli.",
      corp_edu_title: "Safari za Kielimu", corp_edu_desc: "Safari salama na zenye mafunzo kwa shule.",
      corp_flight_title: "Tiketi za Ndege", corp_flight_desc: "Tiketi za ndege zenye bei nzuri.",
      corp_visa_title: "Usaidizi wa Visa", corp_visa_desc: "Kusaidia kwa usahihi michakato ya viza.",
      corp_btn_proposal: "Omba Pendekezo", corp_btn_learn: "Jifunze Zaidi"
    },
    Testimonials: {
      test1_text: "Fexty Safaris ilifanya vizuri sana. Kila kitu kilipangwa vizuri.", test1_author: "Sarah Jenkins", test1_role: "Fungate, UK",
      test2_text: "Kuratibu mapumziko ya wafanyakazi 50 ilikuwa rahisi na Fexty.", test2_author: "Michael Chen", test2_role: "VP Operations, TechCorp",
      test3_text: "Kama mpiga picha, miongozo yao ilinisaidia sana.", test3_author: "Elena Rodriguez", test3_role: "Mpiga picha wa Wanyamapori"
    }
  },
  zh: {
    Hero: {
      slide1_h1: "无尽的发现。", slide1_h2: "难忘的旅程。", slide1_text: "为您最狂野的梦想量身定制的奢华游猎。",
      slide2_h1: "原始海岸。", slide2_h2: "热带幸福。", slide2_text: "在肯尼亚海岸迷人的海滩上放松身心。",
      slide3_h1: "探索世界。", slide3_h2: "无限的视野。", slide3_text: "从马尔代夫到迪拜，带您跨越国界。",
      slide4_h1: "浪漫之旅。", slide4_h2: "永恒的回忆。", slide4_text: "为您完美的蜜月设计的专属亲密套餐。",
      slide5_h1: "企业静修。", slide5_h2: "无缝执行。", slide5_text: "为商务旅行提供端到端的旅行解决方案。",
      searchDestination: "目的地...", searchStyle: "风格...", searchDuration: "持续时间...", searchBtn: "搜索", searchWild: "寻找你的野性"
    },
    HomepageSections: {
      startingFrom: "起价",
      styles_safari_title: "游猎与丛林", styles_safari_desc: "在令人兴奋的游猎中沉浸于大草原的心脏地带。",
      styles_beach_title: "海滩度假", styles_beach_desc: "在印度洋白色的沙滩上放松身心。",
      styles_romance_title: "浪漫与蜜月", styles_romance_desc: "用为您量身定制的亲密静修庆祝您的爱情。",
      styles_group_title: "团体出发", styles_group_desc: "为大型团体设计的共享冒险。",
      corp_mice_title: "企业会奖", corp_mice_desc: "为企业提供无缝的后勤和豪华住宿。",
      corp_edu_title: "教育之旅", corp_edu_desc: "为学校提供安全、丰富的旅程。",
      corp_flight_title: "机票预订", corp_flight_desc: "拥有本地专业知识的全球覆盖率。",
      corp_visa_title: "签证协助", corp_visa_desc: "精准地导航复杂的移民程序。",
      corp_btn_proposal: "索取提案", corp_btn_learn: "了解更多"
    },
    Testimonials: {
      test1_text: "Fexty Safaris超出了我们的期望。每一个细节都经过了精心的策划。", test1_author: "Sarah Jenkins", test1_role: "蜜月旅行者，英国",
      test2_text: "协调50名高管的务虚会是一场噩梦，但Fexty让这一切变得简单。", test2_author: "Michael Chen", test2_role: "TechCorp运营副总裁",
      test3_text: "作为一名摄影师，我需要特定的设置。导游确切地知道在哪里出现。", test3_author: "Elena Rodriguez", test3_role: "野生动物摄影师"
    }
  }
};

async function patchTranslations() {
  const messagesDir = path.join(__dirname, 'messages');
  
  for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(content);
      
      const newTrans = translations[locale] || translations.en;
      
      // Inject Hero namespace if not exists
      if (!data.Hero) data.Hero = {};
      data.Hero = { ...data.Hero, ...newTrans.Hero };
      
      // Inject HomepageSections
      if (!data.HomepageSections) data.HomepageSections = {};
      data.HomepageSections = { ...data.HomepageSections, ...newTrans.HomepageSections };
      
      // Inject Testimonials
      if (!data.Testimonials) data.Testimonials = {};
      data.Testimonials = { ...data.Testimonials, ...newTrans.Testimonials };
      
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Updated ${locale}.json`);
    }
  }
}

patchTranslations();
