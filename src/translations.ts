import { useLanguage } from './context/LanguageContext';

const T = {
  en: {
    // Status rail
    statusLive: 'Live Port Report',
    statusAir: 'Air: 88°F / Water: 83°F',
    statusWind: 'Wind: 4 knots ESE',
    statusSea: 'Sea: 1.2ft Light Chop',
    weatherWarning: 'Tropical Pacific conditions can change quickly — storms build fast. Captain Jorge monitors radar and will adjust or reschedule for your safety.',

    // Nav
    navGeography: 'Geography',
    navCatch: 'The Catch',
    navMigration: 'Migration',
    navGalley: "Captain's Galley",
    navTide: 'Tide Forecast',
    navPlanner: 'Itinerary Planner',
    navLandings: 'Recent Landings',
    navBookNow: 'Book Now',

    // Hero
    heroLocation: 'Puerto Jiménez · Osa Peninsula · Gulf of Dulce',
    heroSport: 'Sport Fishing',
    heroTagline: 'Real Fishing. Real Costa Rica.',
    heroEst: 'Est. Osa Peninsula',
    heroDesc: 'Board the Kaylee — one family, one boat, one of the most biodiverse places on Earth. Giant Yellowfin Tuna, Sailfish, Roosterfish, and Dorado off the Osa.',
    heroCta1: 'Build Your Charter',
    heroCta2: 'Explore the Waters',
    heroStat1Label: 'to open Pacific',
    heroStat2Label: 'Yellowfin Tuna',
    heroStat3Label: 'billfish release',
    heroStat4Val: 'GULF CALM',
    heroStat4Label: 'protected waters',

    // Why Fish the Osa
    whyLabel: 'Osa Peninsula · Gulf of Dulce',
    whyTitle: 'WHY FISH THE OSA?',
    whyPanel1Label: 'Tropical Fjord',
    whyPanel2Label: 'National Geographic Territory',
    whyPanel3Label: 'Open Ocean 30 Min Out',
    feature0Title: 'The Gulf of Dulce',
    feature0Desc: "The Gulf of Dulce is a rare tropical fjord — one of only three in the world. Fed by cold, deep water from the Pacific, it creates an extraordinary mix of protected bay fishing and direct access to the open ocean. Snook, cubera snapper, and roosterfish in the shallows. Tuna and marlin 30 minutes offshore.",
    feature1Title: 'Osa Peninsula Biodiversity',
    feature1Desc: 'National Geographic calls the Osa Peninsula "the most biologically intense place on Earth." Scarlet macaws fly over the marina. Sloths hang in the palms along the shore. Humpback whales breach offshore from July to October. Whale sharks cruise through from November to May.',
    feature2Title: 'Direct Pacific Access',
    feature2Desc: 'Puerto Jiménez sits at the tip of the Osa Peninsula — meaning deep Pacific water is never far. The continental shelf drops sharply just outside the Gulf, delivering fast access to offshore pelagics without the long runs typical of other Costa Rica charters. More fishing time. Less transit.',

    // Species / Catch
    catchBadge: 'Interactive Marine Spotlight',
    catchTitle: 'THE CATCH',
    catchDesc: 'Hover any fish to reveal its anatomy. Click to see full tactics, seasonal windows, and gear rigs.',
    catchZoneLabel: 'Active Ocean Zone',

    // FAQ
    faqTitle: 'BEFORE YOU BOOK',
    faqSubtitle: 'Common questions answered',
    faq1Q: 'Do we need to buy Costa Rica fishing permits?',
    faq1A: 'No. All standard INCOPESCA guest sportfishing licenses are included with your charter. We handle all paperwork and register your party with the Puerto Jiménez port authorities before departure.',
    faq2Q: 'Can we keep our catch for our chef?',
    faq2A: 'Absolutely for Yellowfin Tuna and Dorado (Mahi-Mahi). We clean and fillet your catch dockside and pack it on fresh ice. The restaurants in Puerto Jiménez will cook it fresh that evening — or take it back to Cabinas Jimenez. Sailfish, Marlin, and Roosterfish are 100% catch-and-release only.',
    faq3Q: 'What is the cancellation policy during green season?',
    faq3A: 'Our safety limits are absolute. Costa Rican waters stay remarkably glassy during rains, but we monitor weather radar closely. In the rare event of lightning squalls, your booking can be fully rescheduled or refunded immediately.',

    // Footer
    footerSport: 'Sport Fishing · Osa Peninsula',
    footerDesc: 'Family-run sportfishing charters out of Puerto Jiménez on the Osa Peninsula. Yellowfin Tuna, Sailfish, Roosterfish, and Dorado — fished the right way, in one of the most spectacular places on Earth.',
    footerContact: 'Contact & Inquiries',
    footerConservation: 'Conservation Commitment',
    footerConservationText: 'We operate strictly under the guidelines of the Billfish Foundation and regional Costa Rican conservation mandates. Our crews are trained in safe deep-water billfish release, ensuring the future vitality of the Blue Pacific.',
    footerTerms: 'Terms of Charter',
    footerSafety: 'Safety Guidelines',

    // Fishing Report
    reportBadge: 'Live Bite Report',
    reportTitle1: 'THIS WEEK',
    reportTitle2: 'ON THE KAYLEE',
    reportPeak: 'Peak June season — bite is exceptional',
    reportFooter: 'Captain Jorge updates this report weekly. Waters are changing — reach out for the latest intel.',
    reportCta: 'Ask About Current Conditions',

    // Booking Calendar
    calLabel: 'Check Availability',
    calTitle1: 'PICK YOUR',
    calTitle2: 'DATE',
    calDesc: 'Peak season is open — select a date to send Jorge a booking inquiry with your date pre-filled.',
    calIncluded: 'All licenses, bait & ice included',
    calQuick1: 'This Weekend',
    calQuick2: 'Late June',
    calQuick3: 'July 4th Week',
    calSelectedLabel: 'Selected Date',
    calSendBtn: 'Send Booking Request',
    calClear: 'Clear selection',
    calGeneralBtn: 'General Inquiry',
    calRatesTitle: 'Charter Rates',

    // Testimonials
    testimonialsBadge: 'Verified Guest Reviews',
    testimonialsTitle: 'FROM THE KAYLEE',
    testimonialsTrips: 'verified trips',
    testimonialsFooter: 'Every review is from a verified charter guest.',
    testimonialsCta: 'Book Your Trip',

    // CaptainChat
    chatWelcome: "Ahoy! I'm Captain Jorge. Ask me anything — best time of year to fish the Osa, what's running right now, charter options, local wildlife, or tips for Puerto Jiménez. What do you want to know?",
    chatQuick1: "What's biting right now?",
    chatQuick2: 'Charter prices?',
    chatQuick3: 'Best month for tuna?',
    chatQuick4: 'Wildlife we might see?',
    chatPlaceholder: 'Ask about fishing, seasons, charters…',
    chatPowered: 'Powered by Gemini · Casa Jimenez Sport Fishing',
    chatStatus: 'Casa Jimenez · Puerto Jiménez, CR',
  },

  es: {
    // Status rail
    statusLive: 'Informe en Vivo del Puerto',
    statusAir: 'Aire: 88°F / Agua: 83°F',
    statusWind: 'Viento: 4 nudos ESE',
    statusSea: 'Mar: 0.36m Calmo',
    weatherWarning: 'Las condiciones del Pacífico tropical cambian rápido. El Capitán Jorge monitorea el radar y reprogramará su viaje si es necesario para su seguridad.',

    // Nav
    navGeography: 'Geografía',
    navCatch: 'La Pesca',
    navMigration: 'Migración',
    navGalley: 'Cocina del Capitán',
    navTide: 'Pronóstico de Marea',
    navPlanner: 'Planificador',
    navLandings: 'Capturas Recientes',
    navBookNow: 'Reservar',

    // Hero
    heroLocation: 'Puerto Jiménez · Península de Osa · Golfo Dulce',
    heroSport: 'Pesca Deportiva',
    heroTagline: 'Pesca Real. Costa Rica Real.',
    heroEst: 'Est. Península de Osa',
    heroDesc: 'Súbase al Kaylee — una familia, un bote, uno de los lugares más biodiversos de la Tierra. Atún Aleta Amarilla gigante, Pez Vela, Pez Gallo y Dorado frente a la Osa.',
    heroCta1: 'Diseña tu Charter',
    heroCta2: 'Explorar las Aguas',
    heroStat1Label: 'al Pacífico abierto',
    heroStat2Label: 'Atún Aleta Amarilla',
    heroStat3Label: 'liberación de pez vela',
    heroStat4Val: 'GOLFO CALMO',
    heroStat4Label: 'aguas protegidas',

    // Why Fish the Osa
    whyLabel: 'Península de Osa · Golfo Dulce',
    whyTitle: '¿POR QUÉ PESCAR EN LA OSA?',
    whyPanel1Label: 'Fiordo Tropical',
    whyPanel2Label: 'Territorio de National Geographic',
    whyPanel3Label: 'Océano Abierto a 30 Min',
    feature0Title: 'El Golfo Dulce',
    feature0Desc: 'El Golfo Dulce es un raro fiordo tropical — uno de solo tres en el mundo. Sus aguas profundas del Pacífico crean una extraordinaria mezcla de pesca en bahía protegida y acceso directo al océano abierto. Róbalo, pargo cubera y pez gallo en los bajos. Atún y marlín a 30 minutos offshore.',
    feature1Title: 'Biodiversidad de la Península de Osa',
    feature1Desc: 'National Geographic llama a la Península de Osa "el lugar más biológicamente intenso de la Tierra". Lapas rojas vuelan sobre la marina. Los perezosos cuelgan en las palmas. Las ballenas jorobadas saltan frente a la costa de julio a octubre. Los tiburones ballena cruzan de noviembre a mayo.',
    feature2Title: 'Acceso Directo al Pacífico',
    feature2Desc: 'Puerto Jiménez está en la punta de la Península de Osa — lo que significa que las aguas profundas del Pacífico nunca están lejos. La plataforma continental cae bruscamente justo fuera del Golfo, dando acceso rápido a pelágicos offshore. Más tiempo pescando. Menos tiempo en tránsito.',

    // Species / Catch
    catchBadge: 'Catálogo Marino Interactivo',
    catchTitle: 'LA PESCA',
    catchDesc: 'Pase el cursor sobre cualquier pez para ver su anatomía. Haga clic para ver tácticas completas, temporadas y equipos.',
    catchZoneLabel: 'Zona Oceánica Activa',

    // FAQ
    faqTitle: 'ANTES DE RESERVAR',
    faqSubtitle: 'Preguntas frecuentes',
    faq1Q: '¿Necesitamos comprar permisos de pesca en Costa Rica?',
    faq1A: 'No. Todas las licencias estándar de INCOPESCA para pesca deportiva están incluidas en su charter. Nosotros manejamos todos los trámites y registramos su grupo con las autoridades del puerto de Puerto Jiménez antes de zarpar.',
    faq2Q: '¿Podemos quedarnos con la pesca para nuestro chef?',
    faq2A: 'Absolutamente, para el Atún Aleta Amarilla y el Dorado. Fileteamos su pesca en el muelle y la empacamos en hielo fresco. Los restaurantes de Puerto Jiménez la cocinan esa misma noche — o puede llevarla a Cabinas Jimenez. El Pez Vela, el Marlín y el Pez Gallo son 100% captura y liberación.',
    faq3Q: '¿Cuál es la política de cancelación en temporada verde?',
    faq3A: 'Nuestra seguridad no tiene excepciones. Las aguas costarricenses se mantienen tranquilas durante las lluvias, pero monitoreamos el radar de cerca. En caso de tormentas eléctricas, su reserva puede reprogramarse o reembolsarse de inmediato.',

    // Footer
    footerSport: 'Pesca Deportiva · Península de Osa',
    footerDesc: 'Charters de pesca deportiva familiar desde Puerto Jiménez en la Península de Osa. Atún Aleta Amarilla, Pez Vela, Pez Gallo y Dorado — pescado de la forma correcta, en uno de los lugares más espectaculares de la Tierra.',
    footerContact: 'Contacto e Información',
    footerConservation: 'Compromiso con la Conservación',
    footerConservationText: 'Operamos bajo las directrices de la Fundación Billfish y los mandatos de conservación de Costa Rica. Nuestros tripulantes están capacitados en la liberación segura de peces de aguja, garantizando la vitalidad futura del Pacífico Azul.',
    footerTerms: 'Términos del Charter',
    footerSafety: 'Pautas de Seguridad',

    // Fishing Report
    reportBadge: 'Informe de Pesca en Vivo',
    reportTitle1: 'ESTA SEMANA',
    reportTitle2: 'EN EL KAYLEE',
    reportPeak: 'Temporada pico de junio — mordida excepcional',
    reportFooter: 'El Capitán Jorge actualiza este informe semanalmente. Contáctenos para conocer las últimas condiciones.',
    reportCta: 'Preguntar sobre Condiciones Actuales',

    // Booking Calendar
    calLabel: 'Ver Disponibilidad',
    calTitle1: 'ELIGE TU',
    calTitle2: 'FECHA',
    calDesc: 'Temporada pico abierta — selecciona una fecha para enviarle a Jorge una solicitud de reserva con la fecha prellenada.',
    calIncluded: 'Licencias, carnada y hielo incluidos',
    calQuick1: 'Este Fin de Semana',
    calQuick2: 'Fines de Junio',
    calQuick3: 'Semana del 4 de Julio',
    calSelectedLabel: 'Fecha Seleccionada',
    calSendBtn: 'Enviar Solicitud de Reserva',
    calClear: 'Borrar selección',
    calGeneralBtn: 'Consulta General',
    calRatesTitle: 'Tarifas de Charter',

    // Testimonials
    testimonialsBadge: 'Reseñas Verificadas de Clientes',
    testimonialsTitle: 'DESDE EL KAYLEE',
    testimonialsTrips: 'viajes verificados',
    testimonialsFooter: 'Cada reseña es de un cliente verificado del charter.',
    testimonialsCta: 'Reserva tu Viaje',

    // CaptainChat
    chatWelcome: '¡Hola! Soy el Capitán Jorge. Pregúntame cualquier cosa — la mejor época del año para pescar en la Osa, qué está mordiendo ahora, opciones de charter, vida silvestre o consejos para Puerto Jiménez. ¿Qué quieres saber?',
    chatQuick1: '¿Qué está picando ahora?',
    chatQuick2: '¿Precios de charters?',
    chatQuick3: '¿Mejor mes para atún?',
    chatQuick4: '¿Qué fauna veremos?',
    chatPlaceholder: 'Pregunta sobre pesca, temporadas, charters…',
    chatPowered: 'Impulsado por Gemini · Casa Jimenez Sport Fishing',
    chatStatus: 'Casa Jimenez · Puerto Jiménez, CR',
  },
} as const;

export type TKey = keyof typeof T.en;

export function useT(): (k: TKey) => string {
  const { lang } = useLanguage();
  return (k: TKey) => (T[lang] as typeof T.en)[k] ?? T.en[k];
}
