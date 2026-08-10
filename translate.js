const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    Hero: {
      searchDestination: "Destination",
      searchWhere: "Where to?",
      searchStyle: "Travel Style",
      searchWhatType: "What type?",
      searchDuration: "Duration",
      searchHowLong: "How long?",
      searchBtn: "Search"
    },
    About: {
      title: "About Us",
      subtitle: "Crafting unforgettable journeys through the heart of Africa since 2010",
      ourStoryTitle: "Our Story",
      ourStoryDesc1: "Founded in 2010, Fexty Safaris was born out of a profound passion for the African wilderness and a vision to share its wonders with the world.",
      ourStoryDesc2: "What started as a small team of dedicated guides has grown into a premier safari operator.",
      whyChooseUsTitle: "Why Choose Fexty Safaris",
      whyLocalExperts: "Local Experts",
      whyLocalExpertsDesc: "Our guides are natives who know the terrain, wildlife, and secrets of the savannah like the back of their hand.",
      whyTailoredItineraries: "Tailored Itineraries",
      whyTailoredItinerariesDesc: "We don't do cookie-cutter tours. Every safari is crafted to match your specific interests, pace, and travel style.",
      whySustainable: "Sustainable Travel",
      whySustainableDesc: "We are deeply committed to conservation and uplifting local communities, ensuring our presence protects the environment."
    },
    Services: {
      title: "Our Services",
      subtitle: "From crafting the perfect bespoke safari itinerary to meticulously managing your visa processing, Fexty Safaris provides end-to-end travel solutions.",
      topLabel: "Our Services",
      customizedTitle: "Customized Tour Packages",
      customizedDesc: "Travel is deeply personal, and your itinerary should reflect your unique desires. We meticulously tailor every detail.",
      groupTitle: "Group Tours",
      groupDesc: "Experience the magic of travel with like-minded explorers. Our curated group travel experiences are perfectly designed.",
      corporateTitle: "Corporate Travel & M.I.C.E",
      corporateDesc: "Elevate your business operations with our end-to-end corporate travel solutions.",
      honeymoonTitle: "Honeymoon & Romantic Getaways",
      honeymoonDesc: "Celebrate your love story with intimate retreats tailored for unforgettable beginnings.",
      weddingTitle: "Destination Weddings",
      weddingDesc: "Say 'I do' in some of the most spectacular locations on earth.",
      transportTitle: "Airport Transfers & Transport",
      transportDesc: "Seamless logistics are the backbone of any successful trip.",
      visaTitle: "Visa Assistance",
      visaDesc: "Navigating international travel requirements can be daunting. We offer comprehensive visa processing support.",
      outboundTitle: "Outbound/International Tours",
      outboundDesc: "Venture beyond the continent with our meticulously planned international packages."
    },
    Contact: {
      title: "Contact Us",
      subtitle: "We'd love to hear from you. Get in touch to start planning your dream safari."
    }
  },
  fr: {
    Hero: {
      searchDestination: "Destination",
      searchWhere: "Où aller?",
      searchStyle: "Style de voyage",
      searchWhatType: "Quel type?",
      searchDuration: "Durée",
      searchHowLong: "Combien de temps?",
      searchBtn: "Rechercher"
    },
    About: {
      title: "À propos de nous",
      subtitle: "Création de voyages inoubliables au cœur de l'Afrique depuis 2010",
      ourStoryTitle: "Notre histoire",
      ourStoryDesc1: "Fondée en 2010, Fexty Safaris est née d'une passion profonde pour la nature sauvage africaine et de la vision d'en partager les merveilles avec le monde.",
      ourStoryDesc2: "Ce qui a commencé comme une petite équipe de guides dévoués est devenu un voyagiste de safari de premier plan.",
      whyChooseUsTitle: "Pourquoi choisir Fexty Safaris",
      whyLocalExperts: "Experts locaux",
      whyLocalExpertsDesc: "Nos guides sont des autochtones qui connaissent le terrain, la faune et les secrets de la savane sur le bout des doigts.",
      whyTailoredItineraries: "Itinéraires sur mesure",
      whyTailoredItinerariesDesc: "Nous ne faisons pas de voyages à l'emporte-pièce. Chaque safari est conçu pour correspondre à vos intérêts spécifiques, votre rythme et votre style de voyage.",
      whySustainable: "Voyage durable",
      whySustainableDesc: "Nous sommes profondément attachés à la conservation et à l'élévation des communautés locales, en veillant à ce que notre présence protège l'environnement."
    },
    Services: {
      title: "Nos services",
      subtitle: "De la création du parfait itinéraire de safari sur mesure à la gestion méticuleuse du traitement de vos visas, Fexty Safaris fournit des solutions de voyage de bout en bout.",
      topLabel: "Nos services",
      customizedTitle: "Forfaits de circuits personnalisés",
      customizedDesc: "Le voyage est profondément personnel, et votre itinéraire doit refléter vos désirs uniques. Nous adaptons méticuleusement chaque détail.",
      groupTitle: "Voyages en groupe",
      groupDesc: "Vivez la magie du voyage avec des explorateurs partageant les mêmes idées. Nos expériences de voyage en groupe sont parfaitement conçues.",
      corporateTitle: "Voyages d'affaires et M.I.C.E",
      corporateDesc: "Améliorez vos opérations commerciales avec nos solutions de voyage d'affaires de bout en bout.",
      honeymoonTitle: "Lune de miel et escapades romantiques",
      honeymoonDesc: "Célébrez votre histoire d'amour avec des retraites intimes conçues pour des débuts inoubliables.",
      weddingTitle: "Mariages à destination",
      weddingDesc: "Dites 'oui' dans certains des endroits les plus spectaculaires de la terre.",
      transportTitle: "Transferts aéroport et logistique de transport",
      transportDesc: "Une logistique sans faille est l'épine dorsale de tout voyage réussi.",
      visaTitle: "Assistance Visa",
      visaDesc: "Naviguer dans les exigences des voyages internationaux peut être intimidant. Nous offrons un soutien complet pour le traitement des visas.",
      outboundTitle: "Circuits sortants / internationaux",
      outboundDesc: "Aventurez-vous au-delà du continent avec nos forfaits internationaux méticuleusement planifiés."
    },
    Contact: {
      title: "Contactez-nous",
      subtitle: "Nous aimerions avoir de vos nouvelles. Contactez-nous pour commencer à planifier le safari de vos rêves."
    }
  },
  es: {
    Hero: {
      searchDestination: "Destino",
      searchWhere: "¿Adónde?",
      searchStyle: "Estilo de viaje",
      searchWhatType: "¿Qué tipo?",
      searchDuration: "Duración",
      searchHowLong: "¿Cuánto tiempo?",
      searchBtn: "Buscar"
    },
    About: {
      title: "Sobre Nosotros",
      subtitle: "Creando viajes inolvidables a través del corazón de África desde 2010",
      ourStoryTitle: "Nuestra Historia",
      ourStoryDesc1: "Fundada en 2010, Fexty Safaris nació de una profunda pasión por la naturaleza africana y la visión de compartir sus maravillas con el mundo.",
      ourStoryDesc2: "Lo que comenzó como un pequeño equipo de guías dedicados se ha convertido en un operador de safaris de primer nivel.",
      whyChooseUsTitle: "Por qué elegir Fexty Safaris",
      whyLocalExperts: "Expertos Locales",
      whyLocalExpertsDesc: "Nuestros guías son nativos que conocen el terreno, la vida silvestre y los secretos de la sabana como la palma de su mano.",
      whyTailoredItineraries: "Itinerarios a Medida",
      whyTailoredItinerariesDesc: "No hacemos viajes estándar. Cada safari está diseñado para coincidir con sus intereses específicos, ritmo y estilo de viaje.",
      whySustainable: "Viaje Sostenible",
      whySustainableDesc: "Estamos profundamente comprometidos con la conservación y el desarrollo de las comunidades locales, asegurando que nuestra presencia proteja el medio ambiente."
    },
    Services: {
      title: "Nuestros Servicios",
      subtitle: "Desde la creación del itinerario de safari a medida perfecto hasta la gestión meticulosa de la tramitación de su visado, Fexty Safaris proporciona soluciones de viaje de extremo a extremo.",
      topLabel: "Nuestros Servicios",
      customizedTitle: "Paquetes Turísticos Personalizados",
      customizedDesc: "Los viajes son profundamente personales y su itinerario debe reflejar sus deseos únicos. Adaptamos meticulosamente cada detalle.",
      groupTitle: "Viajes en Grupo",
      groupDesc: "Experimente la magia de viajar con exploradores de ideas afines. Nuestras experiencias de viaje en grupo están perfectamente diseñadas.",
      corporateTitle: "Viajes Corporativos y M.I.C.E",
      corporateDesc: "Eleve sus operaciones comerciales con nuestras soluciones de viajes corporativos de extremo a extremo.",
      honeymoonTitle: "Luna de Miel y Escapadas Románticas",
      honeymoonDesc: "Celebre su historia de amor con retiros íntimos diseñados para comienzos inolvidables.",
      weddingTitle: "Bodas de Destino",
      weddingDesc: "Diga 'Sí, quiero' en algunos de los lugares más espectaculares de la tierra.",
      transportTitle: "Traslados al Aeropuerto y Logística de Transporte",
      transportDesc: "Una logística perfecta es la columna vertebral de cualquier viaje exitoso.",
      visaTitle: "Asistencia de Visado",
      visaDesc: "Navegar por los requisitos de viajes internacionales puede ser abrumador. Ofrecemos asistencia integral para el procesamiento de visas.",
      outboundTitle: "Viajes de Salida / Internacionales",
      outboundDesc: "Aventúrese más allá del continente con nuestros paquetes internacionales meticulosamente planeados."
    },
    Contact: {
      title: "Contáctenos",
      subtitle: "Nos encantaría saber de usted. Póngase en contacto para comenzar a planificar el safari de sus sueños."
    }
  },
  de: {
    Hero: {
      searchDestination: "Reiseziel",
      searchWhere: "Wohin?",
      searchStyle: "Reisestil",
      searchWhatType: "Welcher Typ?",
      searchDuration: "Dauer",
      searchHowLong: "Wie lange?",
      searchBtn: "Suchen"
    },
    About: {
      title: "Über Uns",
      subtitle: "Gestaltung unvergesslicher Reisen durch das Herz Afrikas seit 2010",
      ourStoryTitle: "Unsere Geschichte",
      ourStoryDesc1: "Fexty Safaris wurde 2010 aus einer tiefen Leidenschaft für die afrikanische Wildnis und der Vision geboren, ihre Wunder mit der Welt zu teilen.",
      ourStoryDesc2: "Was als kleines Team engagierter Guides begann, hat sich zu einem führenden Safari-Veranstalter entwickelt.",
      whyChooseUsTitle: "Warum Fexty Safaris wählen",
      whyLocalExperts: "Lokale Experten",
      whyLocalExpertsDesc: "Unsere Guides sind Einheimische, die das Terrain, die Tierwelt und die Geheimnisse der Savanne wie ihre Westentasche kennen.",
      whyTailoredItineraries: "Maßgeschneiderte Reiserouten",
      whyTailoredItinerariesDesc: "Wir machen keine Standardreisen. Jede Safari ist auf Ihre spezifischen Interessen, Ihr Tempo und Ihren Reisestil zugeschnitten.",
      whySustainable: "Nachhaltiges Reisen",
      whySustainableDesc: "Wir setzen uns intensiv für den Naturschutz und die Stärkung lokaler Gemeinschaften ein, um sicherzustellen, dass unsere Präsenz die Umwelt schützt."
    },
    Services: {
      title: "Unsere Dienstleistungen",
      subtitle: "Von der Gestaltung der perfekten maßgeschneiderten Safari-Route bis hin zur sorgfältigen Verwaltung Ihrer Visabearbeitung bietet Fexty Safaris durchgängige Reiselösungen.",
      topLabel: "Unsere Dienstleistungen",
      customizedTitle: "Individuelle Reisepakete",
      customizedDesc: "Reisen ist sehr persönlich, und Ihre Reiseroute sollte Ihre einzigartigen Wünsche widerspiegeln. Wir passen jedes Detail sorgfältig an.",
      groupTitle: "Gruppenreisen",
      groupDesc: "Erleben Sie die Magie des Reisens mit gleichgesinnten Entdeckern. Unsere kuratierten Gruppenreiseerlebnisse sind perfekt gestaltet.",
      corporateTitle: "Geschäftsreisen & M.I.C.E",
      corporateDesc: "Verbessern Sie Ihre Geschäftsabläufe mit unseren umfassenden Lösungen für Geschäftsreisen.",
      honeymoonTitle: "Flitterwochen & Romantische Ausflüge",
      honeymoonDesc: "Feiern Sie Ihre Liebesgeschichte mit intimen Rückzugsorten, die für unvergessliche Anfänge zugeschnitten sind.",
      weddingTitle: "Hochzeiten am Reiseziel",
      weddingDesc: "Sagen Sie 'Ich will' an einigen der spektakulärsten Orte der Erde.",
      transportTitle: "Flughafentransfers & Transportlogistik",
      transportDesc: "Eine reibungslose Logistik ist das Rückgrat jeder erfolgreichen Reise.",
      visaTitle: "Visa-Unterstützung",
      visaDesc: "Sich in internationalen Reiseanforderungen zurechtzufinden, kann entmutigend sein. Wir bieten umfassende Unterstützung bei der Visabearbeitung.",
      outboundTitle: "Outbound / Internationale Touren",
      outboundDesc: "Wagen Sie sich mit unseren sorgfältig geplanten internationalen Paketen über den Kontinent hinaus."
    },
    Contact: {
      title: "Kontaktiere uns",
      subtitle: "Wir würden uns freuen, von Ihnen zu hören. Melden Sie sich, um mit der Planung Ihrer Traum-Safari zu beginnen."
    }
  },
  sw: {
    Hero: {
      searchDestination: "Eneo Linaloenda",
      searchWhere: "Wapi?",
      searchStyle: "Mtindo wa Usafiri",
      searchWhatType: "Aina gani?",
      searchDuration: "Muda",
      searchHowLong: "Muda gani?",
      searchBtn: "Tafuta"
    },
    About: {
      title: "Kuhusu Sisi",
      subtitle: "Kuandaa safari zisizosahaulika kupitia moyo wa Afrika tangu 2010",
      ourStoryTitle: "Hadithi Yetu",
      ourStoryDesc1: "Iliyoanzishwa mnamo 2010, Fexty Safaris ilizaliwa kutokana na mapenzi makubwa kwa wanyamapori wa Kiafrika na maono ya kushiriki maajabu yake na ulimwengu.",
      ourStoryDesc2: "Kile kilichoanza kama timu ndogo ya viongozi waliojitolea kimekua na kuwa mhudumu mkuu wa safari.",
      whyChooseUsTitle: "Kwa nini Uchague Fexty Safaris",
      whyLocalExperts: "Wataalamu wa Ndani",
      whyLocalExpertsDesc: "Waongoza njia wetu ni wenyeji ambao wanajua ardhi, wanyamapori, na siri za savannah kama kiganja cha mkono wao.",
      whyTailoredItineraries: "Ratiba Zilizobinafsishwa",
      whyTailoredItinerariesDesc: "Hatufanyi safari za kawaida. Kila safari inatengenezwa kulingana na maslahi yako, kasi yako, na mtindo wako wa usafiri.",
      whySustainable: "Usafiri Endelevu",
      whySustainableDesc: "Tumejitolea kwa dhati kuhifadhi na kuinua jamii za mitaa, kuhakikisha uwepo wetu unalinda mazingira."
    },
    Services: {
      title: "Huduma Zetu",
      subtitle: "Kutoka kwa kuunda ratiba kamili ya safari hadi kusimamia kikamilifu uchakataji wa viza yako, Fexty Safaris hutoa suluhisho za usafiri kutoka mwanzo hadi mwisho.",
      topLabel: "Huduma Zetu",
      customizedTitle: "Vifurushi vya Ziara Zilizobinafsishwa",
      customizedDesc: "Usafiri ni wa kibinafsi, na ratiba yako inapaswa kuonyesha matamanio yako ya kipekee. Tunabadilisha kila undani kikamilifu.",
      groupTitle: "Ziara za Vikundi",
      groupDesc: "Pata uzoefu wa uchawi wa usafiri na wavumbuzi wenye mawazo sawa. Uzoefu wetu wa usafiri wa vikundi umeundwa kikamilifu.",
      corporateTitle: "Usafiri wa Kampuni & M.I.C.E",
      corporateDesc: "Inua shughuli za biashara yako na suluhisho zetu za usafiri wa kampuni.",
      honeymoonTitle: "Fungate na Safari za Kimapenzi",
      honeymoonDesc: "Sherehekea hadithi yako ya mapenzi na maficho ya siri yaliyoundwa kwa mwanzo usiosahaulika.",
      weddingTitle: "Harusi za Kigeni",
      weddingDesc: "Sema 'Ndio' katika baadhi ya maeneo ya kuvutia zaidi duniani.",
      transportTitle: "Uhamisho wa Uwanja wa Ndege & Lojistiki za Usafiri",
      transportDesc: "Lojistiki isiyo na mshono ndio uti wa mgongo wa safari yoyote yenye mafanikio.",
      visaTitle: "Msaada wa Viza",
      visaDesc: "Kusafiri katika mahitaji ya usafiri wa kimataifa kunaweza kuwa kugumu. Tunatoa msaada kamili wa kushughulikia viza.",
      outboundTitle: "Ziara za Nje / Kimataifa",
      outboundDesc: "Nenda zaidi ya bara na vifurushi vyetu vya kimataifa vilivyopangwa kikamilifu."
    },
    Contact: {
      title: "Wasiliana Nasi",
      subtitle: "Tungependa kusikia kutoka kwako. Wasiliana nasi ili kuanza kupanga safari yako ya ndoto."
    }
  },
  zh: {
    Hero: {
      searchDestination: "目的地",
      searchWhere: "去哪里？",
      searchStyle: "旅行方式",
      searchWhatType: "什么类型？",
      searchDuration: "时长",
      searchHowLong: "多久？",
      searchBtn: "搜索"
    },
    About: {
      title: "关于我们",
      subtitle: "自2010年起，在非洲中心打造令人难忘的旅程",
      ourStoryTitle: "我们的故事",
      ourStoryDesc1: "Fexty Safaris成立于2010年，源于对非洲荒野的深厚热爱，以及与世界分享其奇观的愿景。",
      ourStoryDesc2: "从一个由敬业向导组成的小团队开始，我们已经成长为顶级的游猎运营商。",
      whyChooseUsTitle: "为什么选择 Fexty Safaris",
      whyLocalExperts: "本地专家",
      whyLocalExpertsDesc: "我们的向导是当地人，对大草原的地形、野生动植物和秘密了如指掌。",
      whyTailoredItineraries: "定制行程",
      whyTailoredItinerariesDesc: "我们不提供千篇一律的旅游。每次游猎都会根据您的具体兴趣、节奏和旅行风格量身定制。",
      whySustainable: "可持续旅行",
      whySustainableDesc: "我们致力于保护环境和改善当地社区，确保我们的存在保护环境。"
    },
    Services: {
      title: "我们的服务",
      subtitle: "从制定完美的定制游猎行程到精心管理您的签证办理，Fexty Safaris 提供端到端的旅行解决方案。",
      topLabel: "我们的服务",
      customizedTitle: "定制旅游套餐",
      customizedDesc: "旅行是非常个性化的，您的行程应反映您独特的愿望。我们会精心定制每一个细节。",
      groupTitle: "团体游",
      groupDesc: "与志同道合的探险家一起体验旅行的魔力。我们精心策划的团体旅行体验设计完美。",
      corporateTitle: "企业差旅与M.I.C.E",
      corporateDesc: "利用我们的端到端企业差旅解决方案提升您的业务运营。",
      honeymoonTitle: "蜜月与浪漫之旅",
      honeymoonDesc: "通过专为难忘的开始而定制的私密静居来庆祝您的爱情故事。",
      weddingTitle: "目的地婚礼",
      weddingDesc: "在地球上一些最壮观的地方说“我愿意”。",
      transportTitle: "机场接送与交通物流",
      transportDesc: "无缝物流是任何成功旅行的支柱。",
      visaTitle: "签证协助",
      visaDesc: "应对国际旅行要求可能令人望而生畏。我们提供全面的签证办理支持。",
      outboundTitle: "出境/国际游",
      outboundDesc: "通过我们精心策划的国际套餐，走出非洲大陆。"
    },
    Contact: {
      title: "联系我们",
      subtitle: "我们很乐意听取您的意见。请与我们联系，开始规划您的梦想游猎。"
    }
  },
  ar: {
    Hero: {
      searchDestination: "وجهة",
      searchWhere: "إلى أين؟",
      searchStyle: "أسلوب السفر",
      searchWhatType: "أي نوع؟",
      searchDuration: "المدة",
      searchHowLong: "كم المدة؟",
      searchBtn: "بحث"
    },
    About: {
      title: "معلومات عنا",
      subtitle: "نصنع رحلات لا تُنسى عبر قلب أفريقيا منذ عام 2010",
      ourStoryTitle: "قصتنا",
      ourStoryDesc1: "تأسست شركة Fexty Safaris في عام 2010، وقد ولدت من شغف عميق بالبرية الأفريقية ورؤية لمشاركة عجائبها مع العالم.",
      ourStoryDesc2: "ما بدأ كفريق صغير من المرشدين المتفانين نما ليصبح مشغل رحلات سفاري رائد.",
      whyChooseUsTitle: "لماذا تختار Fexty Safaris",
      whyLocalExperts: "خبراء محليون",
      whyLocalExpertsDesc: "مرشدونا هم من السكان الأصليين الذين يعرفون التضاريس والحياة البرية وأسرار السافانا مثل راحة يدهم.",
      whyTailoredItineraries: "مسارات مصممة خصيصًا",
      whyTailoredItinerariesDesc: "نحن لا نقوم بجولات مقولبة. تم تصميم كل رحلة سفاري لتتناسب مع اهتماماتك الخاصة ووتيرتك وأسلوب سفرك.",
      whySustainable: "السفر المستدام",
      whySustainableDesc: "نحن ملتزمون بشدة بالحفاظ على البيئة والارتقاء بالمجتمعات المحلية، مما يضمن أن وجودنا يحمي البيئة."
    },
    Services: {
      title: "خدماتنا",
      subtitle: "من صياغة مسار رحلة السفاري المثالي المصمم خصيصًا إلى الإدارة الدقيقة لمعالجة التأشيرة، توفر Fexty Safaris حلول سفر شاملة.",
      topLabel: "خدماتنا",
      customizedTitle: "باقات الرحلات المخصصة",
      customizedDesc: "السفر أمر شخصي للغاية، ويجب أن يعكس مسار رحلتك رغباتك الفريدة. نقوم بتفصيل كل التفاصيل بدقة.",
      groupTitle: "الجولات الجماعية",
      groupDesc: "جرب سحر السفر مع مستكشفين يشاركونك نفس التفكير. تجارب السفر الجماعية لدينا مصممة بشكل مثالي.",
      corporateTitle: "سفر الشركات و M.I.C.E",
      corporateDesc: "ارتقِ بعمليات عملك من خلال حلول سفر الشركات الشاملة لدينا.",
      honeymoonTitle: "شهر العسل والرحلات الرومانسية",
      honeymoonDesc: "احتفل بقصة حبك مع منتجعات حميمة مصممة لبدايات لا تُنسى.",
      weddingTitle: "حفلات الزفاف الوجهة",
      weddingDesc: "قل 'أوافق' في بعض من أروع الأماكن على وجه الأرض.",
      transportTitle: "نقل المطار والخدمات اللوجستية",
      transportDesc: "الخدمات اللوجستية السلسة هي العمود الفقري لأي رحلة ناجحة.",
      visaTitle: "المساعدة في التأشيرة",
      visaDesc: "يمكن أن يكون التعامل مع متطلبات السفر الدولي أمرًا شاقًا. نحن نقدم دعمًا شاملاً لمعالجة التأشيرات.",
      outboundTitle: "الجولات الخارجية / الدولية",
      outboundDesc: "غامر خارج القارة مع باقاتنا الدولية المخطط لها بدقة."
    },
    Contact: {
      title: "اتصل بنا",
      subtitle: "نود أن نسمع منك. تواصل معنا لبدء التخطيط لرحلة سفاري أحلامك."
    }
  }
};

const messagesDir = path.join(__dirname, 'messages');

const locales = ['en', 'fr', 'es', 'de', 'sw', 'zh', 'ar'];
locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Merge deeply
    Object.keys(newTranslations[locale]).forEach(key => {
      if (!data[key]) {
        data[key] = {};
      }
      Object.assign(data[key], newTranslations[locale][key]);
    });
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
    console.log(`Updated ${locale}.json`);
  }
});
