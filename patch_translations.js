const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    Services: {
      explorePackages: "Explore Packages",
      viewGroupPackages: "View Group Packages",
      exploreCorporate: "Explore Corporate Packages",
      findRomanticEscape: "Find Your Romantic Escape",
      planWedding: "Plan Your Wedding",
      contactConcierge: "Contact Our Concierge",
      browseCruises: "Browse Cruises",
      findAdventure: "Find Your Next Adventure",
      ticketingTitle: "Ticketing & Visa Services",
      ticketingDesc: "Travel bureaucracy shouldn't stand in the way of your next great adventure. Our dedicated in-house concierges provide meticulous assistance with flight bookings, complex visa processing, and comprehensive travel insurance.",
      flightBookingTitle: "Global Flight Booking",
      flightBookingDesc: "We secure optimal routing and competitive fares for both domestic bush flights and international long-haul connections.",
      visaProcessingTitle: "Visa Processing",
      visaProcessingDesc: "Expert guidance through application requirements, ensuring your documentation is flawless for smooth border entries.",
      insuranceTitle: "Travel Insurance",
      insuranceDesc: "Comprehensive coverage options protecting you against medical emergencies, cancellations, and lost baggage.",
      cruiseTitle: "Cruise Packages",
      cruiseDesc: "Discover the world from the unparalleled comfort of the open water. We curate luxurious cruise vacations to exotic destinations.",
      cruiseDetail: "Whether you prefer a luxury river cruise or a grand ocean liner, we handle all reservations.",
      adventureTitle: "Adventure Travel",
      adventureDesc: "For those who hear the call of the wild, our adventure travel packages deliver adrenaline-pumping thrills in the safest possible environments.",
      adventureDetail: "Ascend Mount Kilimanjaro, scuba dive alongside whale sharks, or embark on a walking safari."
    },
    About: {
      visionTitle: "Our Vision",
      visionContent: "To be the leading safari operator in Africa, recognized for our commitment to sustainable tourism, exceptional customer service, and innovative travel solutions.",
      missionTitle: "Our Mission",
      mission1: "Deliver unforgettable safari experiences.",
      mission2: "Promote conservation and community empowerment.",
      mission3: "Maintain the highest standards of safety and quality.",
      mission4: "Innovate and adapt to exceed client expectations."
    },
    Contact: {
      infoTitle: "Contact Information",
      infoDesc: "Reach out to us via phone, email, or visit our offices. We are always happy to help."
    }
  },
  fr: {
    Services: {
      explorePackages: "Explorer les forfaits",
      viewGroupPackages: "Voir les forfaits de groupe",
      exploreCorporate: "Explorer les forfaits d'entreprise",
      findRomanticEscape: "Trouvez votre escapade romantique",
      planWedding: "Planifiez votre mariage",
      contactConcierge: "Contacter notre concierge",
      browseCruises: "Parcourir les croisières",
      findAdventure: "Trouvez votre prochaine aventure",
      ticketingTitle: "Services de billetterie et de visa",
      ticketingDesc: "La bureaucratie du voyage ne devrait pas faire obstacle à votre prochaine grande aventure. Nos concierges dévoués fournissent une assistance méticuleuse.",
      flightBookingTitle: "Réservation de vols mondiaux",
      flightBookingDesc: "Nous garantissons un itinéraire optimal et des tarifs compétitifs.",
      visaProcessingTitle: "Traitement des visas",
      visaProcessingDesc: "Des conseils d'experts sur les exigences de candidature, garantissant que vos documents sont impeccables.",
      insuranceTitle: "Assurance voyage",
      insuranceDesc: "Options de couverture complètes vous protégeant contre les urgences médicales.",
      cruiseTitle: "Forfaits Croisières",
      cruiseDesc: "Découvrez le monde dans le confort inégalé de l'eau libre.",
      cruiseDetail: "Que vous préfériez une croisière de luxe sur le fleuve ou un grand paquebot, nous nous occupons de tout.",
      adventureTitle: "Voyage d'aventure",
      adventureDesc: "Pour ceux qui entendent l'appel de la nature, nos forfaits offrent des sensations fortes.",
      adventureDetail: "Faites l'ascension du mont Kilimandjaro ou lancez-vous dans un safari à pied."
    },
    About: {
      visionTitle: "Notre vision",
      visionContent: "Être le premier opérateur de safari en Afrique, reconnu pour son engagement envers le tourisme durable.",
      missionTitle: "Notre mission",
      mission1: "Offrir des expériences de safari inoubliables.",
      mission2: "Promouvoir la conservation et l'autonomisation des communautés.",
      mission3: "Maintenir les plus hauts standards de sécurité.",
      mission4: "Innover pour dépasser les attentes des clients."
    },
    Contact: {
      infoTitle: "Coordonnées",
      infoDesc: "Contactez-nous par téléphone, par e-mail ou visitez nos bureaux. Nous sommes toujours heureux de vous aider."
    }
  },
  es: {
    Services: {
      explorePackages: "Explorar Paquetes",
      viewGroupPackages: "Ver Paquetes Grupales",
      exploreCorporate: "Explorar Paquetes Corporativos",
      findRomanticEscape: "Encuentra tu Escape Romántico",
      planWedding: "Planifica tu Boda",
      contactConcierge: "Contacta a Nuestro Conserje",
      browseCruises: "Explorar Cruceros",
      findAdventure: "Encuentra tu Próxima Aventura",
      ticketingTitle: "Servicios de Boletos y Visas",
      ticketingDesc: "La burocracia de los viajes no debería interponerse en el camino de su próxima gran aventura.",
      flightBookingTitle: "Reserva Global de Vuelos",
      flightBookingDesc: "Aseguramos rutas óptimas y tarifas competitivas.",
      visaProcessingTitle: "Procesamiento de Visas",
      visaProcessingDesc: "Orientación experta a través de los requisitos de la solicitud.",
      insuranceTitle: "Seguro de Viaje",
      insuranceDesc: "Opciones integrales de cobertura que lo protegen contra emergencias médicas.",
      cruiseTitle: "Paquetes de Cruceros",
      cruiseDesc: "Descubra el mundo desde la inigualable comodidad de las aguas abiertas.",
      cruiseDetail: "Ya sea que prefiera un crucero fluvial de lujo o un gran transatlántico.",
      adventureTitle: "Viajes de Aventura",
      adventureDesc: "Para aquellos que escuchan el llamado de la naturaleza, nuestros paquetes ofrecen emociones fuertes.",
      adventureDetail: "Ascienda al Monte Kilimanjaro o embarque en un safari a pie."
    },
    About: {
      visionTitle: "Nuestra Visión",
      visionContent: "Ser el operador de safaris líder en África, reconocido por nuestro compromiso con el turismo sostenible.",
      missionTitle: "Nuestra Misión",
      mission1: "Ofrecer experiencias de safari inolvidables.",
      mission2: "Promover la conservación y el empoderamiento comunitario.",
      mission3: "Mantener los más altos estándares de seguridad.",
      mission4: "Innovar para superar las expectativas del cliente."
    },
    Contact: {
      infoTitle: "Información de Contacto",
      infoDesc: "Comuníquese con nosotros por teléfono, correo electrónico o visite nuestras oficinas."
    }
  },
  de: {
    Services: {
      explorePackages: "Pakete Erkunden",
      viewGroupPackages: "Gruppenpakete Anzeigen",
      exploreCorporate: "Firmenpakete Erkunden",
      findRomanticEscape: "Finde deine Romantische Auszeit",
      planWedding: "Planen Sie Ihre Hochzeit",
      contactConcierge: "Kontaktieren Sie unseren Concierge",
      browseCruises: "Kreuzfahrten Durchsuchen",
      findAdventure: "Finde dein Nächstes Abenteuer",
      ticketingTitle: "Ticket- & Visa-Services",
      ticketingDesc: "Reisebürokratie sollte Ihrem nächsten großen Abenteuer nicht im Weg stehen.",
      flightBookingTitle: "Globale Flugbuchung",
      flightBookingDesc: "Wir sichern optimale Routen und wettbewerbsfähige Preise.",
      visaProcessingTitle: "Visa-Bearbeitung",
      visaProcessingDesc: "Kompetente Beratung durch Antragsanforderungen.",
      insuranceTitle: "Reiseversicherung",
      insuranceDesc: "Umfassende Deckungsoptionen, die Sie vor medizinischen Notfällen schützen.",
      cruiseTitle: "Kreuzfahrtpakete",
      cruiseDesc: "Entdecken Sie die Welt vom unvergleichlichen Komfort des offenen Wassers aus.",
      cruiseDetail: "Egal, ob Sie eine luxuriöse Flusskreuzfahrt oder einen großen Ozeandampfer bevorzugen.",
      adventureTitle: "Abenteuerurlaub",
      adventureDesc: "Für diejenigen, die den Ruf der Wildnis hören, bieten unsere Pakete adrenalingeladenen Nervenkitzel.",
      adventureDetail: "Besteigen Sie den Kilimandscharo oder begeben Sie sich auf eine Wandersafari."
    },
    About: {
      visionTitle: "Unsere Vision",
      visionContent: "Der führende Safari-Veranstalter in Afrika zu sein, anerkannt für unser Engagement für nachhaltigen Tourismus.",
      missionTitle: "Unsere Mission",
      mission1: "Unvergessliche Safari-Erlebnisse liefern.",
      mission2: "Naturschutz und Stärkung der Gemeinschaft fördern.",
      mission3: "Die höchsten Sicherheitsstandards aufrechterhalten.",
      mission4: "Innovieren, um die Kundenerwartungen zu übertreffen."
    },
    Contact: {
      infoTitle: "Kontaktinformationen",
      infoDesc: "Erreichen Sie uns telefonisch, per E-Mail oder besuchen Sie unsere Büros."
    }
  },
  sw: {
    Services: {
      explorePackages: "Chunguza Vifurushi",
      viewGroupPackages: "Tazama Vifurushi vya Kikundi",
      exploreCorporate: "Chunguza Vifurushi vya Kampuni",
      findRomanticEscape: "Tafuta Eneo lako la Kimapenzi",
      planWedding: "Panga Harusi Yako",
      contactConcierge: "Wasiliana na Muhudumu Wetu",
      browseCruises: "Vinjari Safari za Majini",
      findAdventure: "Pata Tukio Lako Lijalo",
      ticketingTitle: "Huduma za Tiketi na Viza",
      ticketingDesc: "Urasimu wa kusafiri haupaswi kuzuia tukio lako kubwa linalofuata.",
      flightBookingTitle: "Uhifadhi wa Ndege Ulimwenguni",
      flightBookingDesc: "Tunahakikisha njia bora na nauli za ushindani.",
      visaProcessingTitle: "Uchakataji wa Viza",
      visaProcessingDesc: "Mwongozo wa kitaalam kupitia mahitaji ya maombi.",
      insuranceTitle: "Bima ya Usafiri",
      insuranceDesc: "Chaguzi kamili za chanjo zinazokulinda dhidi ya dharura za matibabu.",
      cruiseTitle: "Vifurushi vya Safari za Majini",
      cruiseDesc: "Gundua ulimwengu kutoka kwa faraja isiyo na kifani ya maji wazi.",
      cruiseDetail: "Iwe unapendelea safari ya mto ya kifahari au meli kubwa ya baharini.",
      adventureTitle: "Usafiri wa Vituko",
      adventureDesc: "Kwa wale wanaosikia wito wa pori, vifurushi vyetu vinatoa msisimko.",
      adventureDetail: "Panda Mlima Kilimanjaro au anza safari ya kutembea."
    },
    About: {
      visionTitle: "Dira Yetu",
      visionContent: "Kuwa mwendeshaji mkuu wa safari barani Afrika, anayetambuliwa kwa kujitolea kwetu kwa utalii endelevu.",
      missionTitle: "Dhamira Yetu",
      mission1: "Kutoa uzoefu wa safari usiosahaulika.",
      mission2: "Kukuza uhifadhi na uwezeshaji wa jamii.",
      mission3: "Kudumisha viwango vya juu vya usalama.",
      mission4: "Kubuni ili kuzidi matarajio ya mteja."
    },
    Contact: {
      infoTitle: "Maelezo ya Mawasiliano",
      infoDesc: "Tufikie kupitia simu, barua pepe, au tembelea ofisi zetu."
    }
  },
  zh: {
    Services: {
      explorePackages: "探索套餐",
      viewGroupPackages: "查看团体套餐",
      exploreCorporate: "探索企业套餐",
      findRomanticEscape: "寻找您的浪漫之旅",
      planWedding: "策划您的婚礼",
      contactConcierge: "联系我们的礼宾部",
      browseCruises: "浏览游轮",
      findAdventure: "寻找您的下一次冒险",
      ticketingTitle: "票务与签证服务",
      ticketingDesc: "旅行官僚主义不应成为您下一次伟大冒险的阻碍。",
      flightBookingTitle: "全球航班预订",
      flightBookingDesc: "我们确保最佳路线和有竞争力的票价。",
      visaProcessingTitle: "签证办理",
      visaProcessingDesc: "通过申请要求提供专家指导。",
      insuranceTitle: "旅行保险",
      insuranceDesc: "全面的承保选项可保护您免受医疗紧急情况的影响。",
      cruiseTitle: "游轮套餐",
      cruiseDesc: "从无与伦比的开阔水域的舒适中发现世界。",
      cruiseDetail: "无论您喜欢豪华内河游轮还是远洋班轮。",
      adventureTitle: "探险旅游",
      adventureDesc: "对于那些听到野性呼唤的人，我们的套餐提供刺激。",
      adventureDetail: "攀登乞力马扎罗山或踏上徒步游猎之旅。"
    },
    About: {
      visionTitle: "我们的愿景",
      visionContent: "成为非洲领先的游猎运营商，因致力于可持续旅游而受到认可。",
      missionTitle: "我们的使命",
      mission1: "提供令人难忘的游猎体验。",
      mission2: "促进保护和社区赋权。",
      mission3: "保持最高的安全标准。",
      mission4: "创新以超越客户期望。"
    },
    Contact: {
      infoTitle: "联系信息",
      infoDesc: "通过电话、电子邮件联系我们，或访问我们的办公室。"
    }
  },
  ar: {
    Services: {
      explorePackages: "استكشاف الباقات",
      viewGroupPackages: "عرض باقات المجموعة",
      exploreCorporate: "استكشاف باقات الشركات",
      findRomanticEscape: "ابحث عن عطلتك الرومانسية",
      planWedding: "خطط لحفل زفافك",
      contactConcierge: "اتصل بمسؤول الاستقبال لدينا",
      browseCruises: "تصفح الرحلات البحرية",
      findAdventure: "ابحث عن مغامرتك القادمة",
      ticketingTitle: "خدمات التذاكر والتأشيرات",
      ticketingDesc: "يجب ألا تقف بيروقراطية السفر في طريق مغامرتك الرائعة القادمة.",
      flightBookingTitle: "حجز الرحلات الجوية العالمية",
      flightBookingDesc: "نحن نضمن المسارات المثلى والأسعار التنافسية.",
      visaProcessingTitle: "معالجة التأشيرة",
      visaProcessingDesc: "توجيه الخبراء من خلال متطلبات التطبيق.",
      insuranceTitle: "تأمين السفر",
      insuranceDesc: "خيارات تغطية شاملة تحميك من حالات الطوارئ الطبية.",
      cruiseTitle: "باقات الرحلات البحرية",
      cruiseDesc: "اكتشف العالم من راحة لا مثيل لها في المياه المفتوحة.",
      cruiseDetail: "سواء كنت تفضل رحلة نهرية فاخرة أو سفينة محيط كبيرة.",
      adventureTitle: "سفر المغامرات",
      adventureDesc: "لأولئك الذين يسمعون نداء البرية، توفر باقاتنا الإثارة.",
      adventureDetail: "تسلق جبل كليمنجارو أو انطلق في رحلة سفاري سيرًا على الأقدام."
    },
    About: {
      visionTitle: "رؤيتنا",
      visionContent: "أن نكون مشغل رحلات السفاري الرائد في إفريقيا، والمعترف به لالتزامنا بالسياحة المستدامة.",
      missionTitle: "مهمتنا",
      mission1: "تقديم تجارب سفاري لا تُنسى.",
      mission2: "تعزيز الحفظ وتمكين المجتمع.",
      mission3: "الحفاظ على أعلى معايير السلامة.",
      mission4: "الابتكار لتجاوز توقعات العملاء."
    },
    Contact: {
      infoTitle: "معلومات الاتصال",
      infoDesc: "تواصل معنا عبر الهاتف أو البريد الإلكتروني أو قم بزيارة مكاتبنا."
    }
  }
};

const locales = ['en', 'fr', 'es', 'de', 'sw', 'zh', 'ar'];
const messagesDir = path.join(__dirname, 'messages');

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
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
