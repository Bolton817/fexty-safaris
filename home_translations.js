const fs = require('fs');
const path = require('path');

const newTranslations = {
  en: {
    HomepageSections: {
      kenyaSub: "The Heart of the Safari",
      kenyaTitle: "Magical Kenya",
      kenyaViewAll: "View all Kenya Packages",
      coastSub: "Coastal Escapes",
      coastTitle: "The Tembo Coast",
      coastViewAll: "View all Coast Packages",
      bordersSub: "Global Adventures",
      bordersTitle: "Beyond Borders",
      bordersViewAll: "Explore International",
      dealsSub: "Featured Collections",
      dealsTitle: "Exclusive Safari Deals",
      dealsViewAll: "View all Deals",
      stylesSub: "Travel Styles",
      stylesTitle: "Curated Just For You",
      servicesSub: "Our Services",
      servicesTitle: "Corporate & Specialized Tours",
      servicesViewAll: "Explore all services",
      testimonialsSub: "Testimonials",
      testimonialsTitle: "What Our Guests Say",
      ctaTitle: "Ready to begin your journey?",
      ctaDesc: "Let's craft your perfect itinerary together.",
      ctaBtn: "Get in Touch"
    }
  },
  fr: {
    HomepageSections: {
      kenyaSub: "Le cœur du safari",
      kenyaTitle: "Kenya Magique",
      kenyaViewAll: "Voir tous les forfaits Kenya",
      coastSub: "Escapades côtières",
      coastTitle: "La côte de Tembo",
      coastViewAll: "Voir tous les forfaits côtiers",
      bordersSub: "Aventures mondiales",
      bordersTitle: "Au-delà des frontières",
      bordersViewAll: "Explorer à l'international",
      dealsSub: "Collections en vedette",
      dealsTitle: "Offres exclusives de safari",
      dealsViewAll: "Voir toutes les offres",
      stylesSub: "Styles de voyage",
      stylesTitle: "Conçu juste pour vous",
      servicesSub: "Nos services",
      servicesTitle: "Circuits d'entreprise et spécialisés",
      servicesViewAll: "Explorer tous les services",
      testimonialsSub: "Témoignages",
      testimonialsTitle: "Ce que disent nos invités",
      ctaTitle: "Prêt à commencer votre voyage ?",
      ctaDesc: "Créons ensemble votre itinéraire parfait.",
      ctaBtn: "Contactez-nous"
    }
  },
  es: {
    HomepageSections: {
      kenyaSub: "El corazón del safari",
      kenyaTitle: "Kenia Mágica",
      kenyaViewAll: "Ver todos los paquetes de Kenia",
      coastSub: "Escapes costeros",
      coastTitle: "La Costa de Tembo",
      coastViewAll: "Ver todos los paquetes de la costa",
      bordersSub: "Aventuras globales",
      bordersTitle: "Más Allá de las Fronteras",
      bordersViewAll: "Explorar Internacional",
      dealsSub: "Colecciones destacadas",
      dealsTitle: "Ofertas exclusivas de safari",
      dealsViewAll: "Ver todas las ofertas",
      stylesSub: "Estilos de viaje",
      stylesTitle: "Curado solo para ti",
      servicesSub: "Nuestros servicios",
      servicesTitle: "Tours Corporativos y Especializados",
      servicesViewAll: "Explorar todos los servicios",
      testimonialsSub: "Testimonios",
      testimonialsTitle: "Lo que dicen nuestros invitados",
      ctaTitle: "¿Listo para comenzar tu viaje?",
      ctaDesc: "Elaboremos juntos tu itinerario perfecto.",
      ctaBtn: "Ponerse en contacto"
    }
  },
  de: {
    HomepageSections: {
      kenyaSub: "Das Herz der Safari",
      kenyaTitle: "Magisches Kenia",
      kenyaViewAll: "Alle Kenia-Pakete anzeigen",
      coastSub: "Küstenfluchten",
      coastTitle: "Die Tembo-Küste",
      coastViewAll: "Alle Küstenpakete anzeigen",
      bordersSub: "Globale Abenteuer",
      bordersTitle: "Über Grenzen Hinweg",
      bordersViewAll: "International Erkunden",
      dealsSub: "Ausgewählte Kollektionen",
      dealsTitle: "Exklusive Safari-Angebote",
      dealsViewAll: "Alle Angebote anzeigen",
      stylesSub: "Reisestile",
      stylesTitle: "Nur für Sie kuratiert",
      servicesSub: "Unsere Dienstleistungen",
      servicesTitle: "Geschäfts- & Spezialtouren",
      servicesViewAll: "Alle Dienstleistungen erkunden",
      testimonialsSub: "Erfahrungsberichte",
      testimonialsTitle: "Was unsere Gäste sagen",
      ctaTitle: "Bereit, Ihre Reise zu beginnen?",
      ctaDesc: "Lassen Sie uns gemeinsam Ihre perfekte Reiseroute zusammenstellen.",
      ctaBtn: "In Kontakt kommen"
    }
  },
  sw: {
    HomepageSections: {
      kenyaSub: "Moyo wa Safari",
      kenyaTitle: "Kenya ya Kichawi",
      kenyaViewAll: "Tazama vifurushi vyote vya Kenya",
      coastSub: "Mapumziko ya Pwani",
      coastTitle: "Pwani ya Tembo",
      coastViewAll: "Tazama vifurushi vyote vya Pwani",
      bordersSub: "Matukio ya Ulimwengu",
      bordersTitle: "Zaidi ya Mipaka",
      bordersViewAll: "Gundua Kimataifa",
      dealsSub: "Mikusanyiko Iliyoangaziwa",
      dealsTitle: "Ofa za Kipekee za Safari",
      dealsViewAll: "Tazama Ofa Zote",
      stylesSub: "Mitindo ya Usafiri",
      stylesTitle: "Iliyoundwa Kwa Ajili Yako Tu",
      servicesSub: "Huduma Zetu",
      servicesTitle: "Ziara za Kampuni & Maalum",
      servicesViewAll: "Chunguza huduma zote",
      testimonialsSub: "Ushuhuda",
      testimonialsTitle: "Wageni Wetu Wanasema Nini",
      ctaTitle: "Uko tayari kuanza safari yako?",
      ctaDesc: "Hebu tuandae ratiba yako kamili pamoja.",
      ctaBtn: "Wasiliana Nasi"
    }
  },
  zh: {
    HomepageSections: {
      kenyaSub: "游猎的中心",
      kenyaTitle: "神奇的肯尼亚",
      kenyaViewAll: "查看所有肯尼亚套餐",
      coastSub: "海岸逃跑",
      coastTitle: "坦博海岸",
      coastViewAll: "查看所有海岸套餐",
      bordersSub: "全球冒险",
      bordersTitle: "跨越边界",
      bordersViewAll: "探索国际",
      dealsSub: "精选系列",
      dealsTitle: "独家游猎优惠",
      dealsViewAll: "查看所有优惠",
      stylesSub: "旅行方式",
      stylesTitle: "专为您策划",
      servicesSub: "我们的服务",
      servicesTitle: "企业及特色旅游",
      servicesViewAll: "探索所有服务",
      testimonialsSub: "感言",
      testimonialsTitle: "客人怎么说",
      ctaTitle: "准备好开始您的旅程了吗？",
      ctaDesc: "让我们一起打造您完美的行程。",
      ctaBtn: "联系我们"
    }
  },
  ar: {
    HomepageSections: {
      kenyaSub: "قلب السفاري",
      kenyaTitle: "كينيا الساحرة",
      kenyaViewAll: "عرض جميع باقات كينيا",
      coastSub: "عطلات ساحلية",
      coastTitle: "ساحل تمبو",
      coastViewAll: "عرض جميع باقات الساحل",
      bordersSub: "مغامرات عالمية",
      bordersTitle: "ما وراء الحدود",
      bordersViewAll: "استكشف دوليًا",
      dealsSub: "مجموعات مميزة",
      dealsTitle: "عروض سفاري حصرية",
      dealsViewAll: "عرض جميع العروض",
      stylesSub: "أساليب السفر",
      stylesTitle: "منسقة خصيصًا لك",
      servicesSub: "خدماتنا",
      servicesTitle: "جولات الشركات المتخصصة",
      servicesViewAll: "استكشاف جميع الخدمات",
      testimonialsSub: "الشهادات",
      testimonialsTitle: "ماذا يقول ضيوفنا",
      ctaTitle: "هل أنت مستعد لبدء رحلتك؟",
      ctaDesc: "دعونا نصيغ خط سير رحلتك المثالي معًا.",
      ctaBtn: "ابق على تواصل"
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
