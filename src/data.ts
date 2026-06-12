// @ts-ignore
import heroImg from './assets/images/real/sunset_dock.jpg';
// @ts-ignore
import boatImg from './assets/images/real/boat_kaylee.jpg';
// @ts-ignore
import tunaImg1 from './assets/images/real/yellowfin_tuna_1.jpg';
// @ts-ignore
import tunaImg2 from './assets/images/real/yellowfin_tuna_2.jpg';
// @ts-ignore
import captainTunaImg from './assets/images/real/captain_tuna.jpg';
// @ts-ignore
import groupCatchImg from './assets/images/real/group_catch.jpg';
// @ts-ignore
import kayakingImg from './assets/images/real/kayaking.jpg';
// @ts-ignore
import palmSunsetImg from './assets/images/real/palm_sunset.jpg';

// Stock fallbacks for species without a real photo yet
// @ts-ignore
import marlinImg from './assets/images/blue_marlin_1781200358551.jpg';
// @ts-ignore
import doradoImg from './assets/images/dorado_mahi_1781200329038.jpg';
// @ts-ignore
import roosterImg from './assets/images/rooster_fish_1781200344379.jpg';

import { Species, CharterTrip, BoatHotspot, CatchReport } from './types';

export const IMAGES = {
  hero: heroImg,
  boat: boatImg,
  tuna1: tunaImg1,
  tuna2: tunaImg2,
  captainTuna: captainTunaImg,
  groupCatch: groupCatchImg,
  kayaking: kayakingImg,
  palmSunset: palmSunsetImg,
  marlin: marlinImg,
  dorado: doradoImg,
  rooster: roosterImg,
};

export const SPECIES_DATA: Species[] = [
  {
    id: 'yellowfin-tuna',
    name: 'Yellowfin Tuna',
    scientificName: 'Thunnus albacares',
    category: 'offshore',
    habitat: 'Deep Pacific blue water off the Osa Peninsula, often running with large schools of Spinner Dolphins beyond the continental shelf.',
    seasonText: 'Peak: May to October. Strong year-round action off the Osa.',
    peakMonths: [4, 5, 6, 7, 8, 9],
    bestBait: 'Live sardines collected at sunrise, free-lined into active feeding frenzies alongside dolphin schools. When the sardines are thick, the tuna are never far behind.',
    tactics: 'Captain Jorge reads the sky for diving frigates and watches for leaping Spinner Dolphins. Once on a school, he chumms with live sardines and pitches them into the center of the boil.',
    fightingStyle: 'Pure vertical endurance. After a freight-train run, they deep-dive in tight circles demanding steady pump-and-reel rhythm. These fish will test every muscle you have.',
    image: tunaImg1,
    description: 'The bread and butter of Casa Jimenez charters. The Pacific waters off the Osa Peninsula deliver some of the most consistent Yellowfin action in all of Costa Rica — hard-fighting fish that test every muscle you have.',
    conservationStatus: 'Sustainable table fare. Sashimi-grade quality packed fresh in ice immediately after catch.'
  },
  {
    id: 'sailfish-marlin',
    name: 'Sailfish & Blue Marlin',
    scientificName: 'Makaira nigricans & Istiophorus platypterus',
    category: 'offshore',
    habitat: 'Open Pacific offshore, structure lines and deep bathymetric drop-offs beyond the Osa Peninsula shelf.',
    seasonText: 'Peak: December to April (Dry Season). Available year-round.',
    peakMonths: [11, 0, 1, 2, 3],
    bestBait: 'Trolled dead ballyhoo rigged on circle hooks for Sailfish. Live bonito in the transom well for heavy Blue Marlin.',
    tactics: 'Trolling a spread of artificial teasers and dredge bars to raise billfish to the surface, then switching to a rigged circle hook bait for the drop-back strike.',
    fightingStyle: 'High-adrenaline runs and explosive aerial acrobatics. Marlin are tail-walkers; Sailfish greyhound across the horizon. Both will leave you shaking.',
    image: marlinImg,
    description: 'The Osa Peninsula sits at the edge of incredible Pacific pelagic territory. Sails average 80–120 lbs, and blue marlin push well over 300 lbs. On the right day, multiple raises on a single troll pass are common.',
    conservationStatus: '100% Catch & Release. Circle hooks only to protect the resource.'
  },
  {
    id: 'dorado-mahi',
    name: 'Dorado (Mahi-Mahi)',
    scientificName: 'Coryphaena hippurus',
    category: 'offshore',
    habitat: 'Offshore, congregating under floating debris, weed lines, and logs washed out from Osa rivers.',
    seasonText: 'Peak: September to December. Excellent during green season river flows.',
    peakMonths: [8, 9, 10, 11],
    bestBait: 'Skirted lures in blue/white or pink/chartreuse, or slow-trolling live goggle-eyes at current breaks.',
    tactics: 'Locating offshore trash-lines pushed out from river mouths. Once one Dorado hits, keep it in the water — the whole school follows. Double and triple hookups are common.',
    fightingStyle: 'Explosive lateral speed and high jumps. The colors on a fresh-caught Dorado — electric gold, lime, royal blue — are unlike anything else in the ocean.',
    image: doradoImg,
    description: 'Breathtakingly colorful pelagics that light up the cockpit. Fast growth cycles and aggressive feeding make them a crowd-pleaser for first-time anglers and veterans alike — and they are outstanding table fare.',
    conservationStatus: 'Sustainable table fare. Boat bag limits apply.'
  },
  {
    id: 'roosterfish',
    name: 'Roosterfish (Inshore King)',
    scientificName: 'Nematistius pectoralis',
    category: 'inshore',
    habitat: 'Inshore rocky structures along the Osa shoreline, volcanic points, sandy beaches, and Gulf of Dulce river mouths.',
    seasonText: 'Year-round. Peak: May to July.',
    peakMonths: [4, 5, 6],
    bestBait: 'Live bait is king — local blue runners (cojinua), lookdown fish, or mullet drifted along structure.',
    tactics: 'Slow-trolling live rigs right behind breaking waves on rocky points, or balloon fishing deep pinnacles with heavy fluorocarbon leaders.',
    fightingStyle: 'Brutal and relentless. Roosters use their wide body to plane sideways in the current, making every inch of line a battle. The iconic comb dorsal fin rising out of the water is an image you never forget.',
    image: roosterImg,
    description: 'One of the most sought-after inshore catches in the world. The Osa coastline offers prime roosterfish habitat — remote beaches, rocky headlands, and untouched reef structure rarely pressured by other boats.',
    conservationStatus: '100% Catch & Release. A trophy to be returned for future generations.'
  },
  {
    id: 'pargo',
    name: 'Pargo (Pacific Red Snapper)',
    scientificName: 'Lutjanus peru',
    category: 'inshore',
    habitat: 'Rocky reefs, volcanic structure, and deep pinnacles along the Osa coastline and Gulf of Dulce. Pargo hold tight to structure at 30–80 ft.',
    seasonText: 'Year-round. Peak: March to July.',
    peakMonths: [2, 3, 4, 5, 6],
    bestBait: 'Live blue runners, cut bait, or fresh squid drifted deep along rocky bottoms.',
    tactics: 'Captain Jorge reads the bottom structure on sonar, dropping live bait rigged on heavy fluorocarbon leaders directly into the reef. Pargo hit hard and head straight for the rocks.',
    fightingStyle: 'Down and dirty. Pargo strike and immediately dive for the nearest volcanic crevice. You have to turn them before they cut you off on the reef — brute force wins.',
    image: roosterImg,
    description: 'One of the best-eating fish in the Pacific. Pargo (Pacific Red Snapper) is a prized table fish throughout Costa Rica — firm white flesh, clean flavor, and hard-fighting on light tackle. The Gulf of Dulce holds consistent pargo action year-round on its volcanic reef structure.',
    conservationStatus: 'Sustainable table fare. INCOPESCA size limits enforced.'
  },
  {
    id: 'amberjack',
    name: 'Amberjack',
    scientificName: 'Seriola lalandi',
    category: 'offshore',
    habitat: 'Offshore pinnacles, current breaks, and deep bathymetric structure beyond the Osa Peninsula shelf. Amberjack patrol mid-water columns near reef edges.',
    seasonText: 'Year-round. Peak: May to August.',
    peakMonths: [4, 5, 6, 7],
    bestBait: 'Live bonito, jigs worked deep mid-water, or slow-trolled whole mackerel at the edge of current breaks.',
    tactics: 'Locating submerged pinnacles and drop-offs where amberjack ambush prey from below. Heavy jigging gear is essential — these fish do not tire quickly.',
    fightingStyle: 'Sustained, crushing power. Amberjack are pure muscle from head to tail — long, deep runs with no quit. Everything you have and then some.',
    image: tunaImg1,
    description: 'Amberjack are the heavyweights of the mid-water column. Found on offshore structure along the same current lines as tuna but holding deeper. They fight harder than fish twice their size and are excellent table fare when bled and iced immediately.',
    conservationStatus: 'Sustainable table fare. Good eating when handled properly.'
  }
];

export const SPECIAL_FEATURES = [
  {
    id: 'gulf-dulce',
    title: 'The Gulf of Dulce',
    subtitle: 'One of Costa Rica\'s Last Secrets',
    description: 'The Gulf of Dulce is a rare tropical fjord — one of only three in the world. Fed by cold, deep water from the Pacific, it creates an extraordinary mix of protected bay fishing and direct access to the open ocean. Snook, cubera snapper, and roosterfish in the shallows. Tuna and marlin 30 minutes offshore. Note: Pacific storms can build fast — Captain Jorge monitors radar closely and always prioritizes your safety.',
    iconName: 'Waves'
  },
  {
    id: 'osa-wildlife',
    title: 'Osa Peninsula Biodiversity',
    subtitle: 'The Most Biodiverse Place on Earth',
    description: 'National Geographic calls the Osa Peninsula "the most biologically intense place on Earth." Scarlet macaws fly over the marina. Sloths hang in the palms along the shore. Humpback whales breach offshore from July to October. Whale sharks cruise through from November to May. Your fishing day is also a wildlife expedition.',
    iconName: 'Zap'
  },
  {
    id: 'pacific-access',
    title: 'Direct Pacific Access',
    subtitle: 'Open Ocean 30 Minutes Out',
    description: 'Puerto Jiménez sits at the tip of the Osa Peninsula — meaning deep Pacific water is never far. The continental shelf drops sharply just outside the Gulf, delivering fast access to offshore pelagics without the long runs typical of other Costa Rica charters. More fishing time. Less transit.',
    iconName: 'ChevronDown'
  }
];

export const CHARTER_TRIPS: CharterTrip[] = [
  {
    id: 'inshore-half',
    name: 'Gulf of Dulce Explorer',
    category: 'inshore',
    duration: 'Half-Day (4h)',
    price: '$650',
    bestFor: 'Families, first-timers, and anyone who wants consistent action in the protected waters of the Gulf.',
    capacity: 'Up to 6 Anglers',
    included: [
      'Quality spinning and light tackle gear',
      'Fresh live bait collected at sunrise',
      'Cold drinks, water, and local snacks',
      'Bilingual captain Captain Jorge'
    ],
    description: 'Target Roosterfish, Cubera Snapper, Snook, and Bluefin Trevally along the Osa shoreline and Gulf of Dulce structure. The Gulf\'s protected water makes this a smooth ride for everyone on board.'
  },
  {
    id: 'offshore-full',
    name: 'Pacific Offshore Run',
    category: 'offshore',
    duration: 'Full-Day (8h)',
    price: '$1,400',
    bestFor: 'Serious anglers targeting Yellowfin Tuna, Dorado, Sailfish, and Marlin in the open Pacific.',
    capacity: 'Up to 6 Anglers',
    included: [
      'Heavy-duty offshore trolling and jigging gear',
      'Custom rigged baits and lures',
      'Fresh catch cleaned and filleted dockside',
      'Cold drinks and lunch on board'
    ],
    description: 'Head out through the mouth of the Gulf into the Pacific for big game. Captain Jorge knows these waters — where the tuna schools run, where debris lines hold Dorado, and where billfish patrol the current breaks.'
  },
  {
    id: 'tuna-mission',
    name: 'Tuna Mission',
    category: 'offshore',
    duration: 'Full-Day (8h)',
    price: '$1,400',
    bestFor: 'Groups laser-focused on Yellowfin Tuna — the signature catch of the Osa Peninsula.',
    capacity: 'Up to 6 Anglers',
    included: [
      'High-speed trolling and jigging setups',
      'Live sardines and assorted rigged bait',
      'Full ice box for your catch',
      'Fish filleted and packed for your cooler'
    ],
    description: 'Pure tuna hunting. We push out to where the Spinner Dolphins are working and stay until the bite dies. These fish run hard and fight harder. The Kaylee handles them. The group photo you\'ve been waiting for.'
  },
  {
    id: 'combo-day',
    name: 'Full Combo Day',
    category: 'offshore',
    duration: 'Extended (10h)',
    price: '$1,800',
    bestFor: 'The complete Osa experience — offshore big game in the morning, inshore action in the afternoon.',
    capacity: 'Up to 6 Anglers',
    included: [
      'Full tackle for both offshore and inshore',
      'Fresh catch cleaned and ready to cook',
      'Cold drinks, snacks, and lunch',
      'Flexible itinerary based on what\'s biting'
    ],
    description: 'Run offshore at first light for tuna and billfish, then work back through the Gulf for roosterfish and snapper on the afternoon tide. Two completely different fisheries in one day — only possible from Puerto Jiménez.'
  }
];

export const BOAT_HOTSPOTS: BoatHotspot[] = [
  {
    id: 'center-console',
    name: 'The Kaylee — Center Console',
    x: 45,
    y: 55,
    title: 'The Kaylee',
    subtitle: 'Built for the Osa',
    stats: {
      'Registration': 'PJ3524 — Costa Rica',
      'Configuration': 'Center Console Sportfisher',
      'Capacity': 'Up to 6 anglers',
      'Hull': 'Signature Blue'
    },
    description: 'The Kaylee is a purpose-built sportfishing center console — light, fast, and perfectly sized for both the protected Gulf of Dulce and the open Pacific. She gets you on the fish faster than any heavy sport yacht.',
    importance: 'A center console means 360-degree fishability. No blind spots, no cockpit walls. When a school of tuna erupts around the boat, every angler casts immediately from any side.',
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5fed933449?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'live-well',
    name: 'Aerated Live Well',
    x: 25,
    y: 70,
    title: 'Live Bait Well',
    subtitle: 'Fresh and Active All Day',
    stats: {
      'Capacity': 'Dual aerated wells',
      'Baits': 'Blue runners, goggle-eyes, sardines',
      'Collection': 'Pre-dawn bait run each morning',
      'Result': 'Lively bait = more strikes'
    },
    description: 'Live bait is collected fresh before every charter. The wells keep blue runners and goggle-eyes active and healthy throughout the day — the single biggest factor in hooking roosterfish and inshore species.',
    importance: 'Injured or lethargic bait gets ignored. Fresh, frantic live bait triggers immediate strikes from roosterfish, cubera snapper, and any tuna cruising the current lines.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'rod-holders',
    name: 'Tournament Rod Holders',
    x: 60,
    y: 30,
    title: 'Rod & Reel Setup',
    subtitle: 'Matched to the Target',
    stats: {
      'Offshore Rods': 'Heavy stand-up and trolling combos',
      'Inshore Rods': 'Light spin and casting setups',
      'Brands': 'Penn, Shimano, Daiwa',
      'Lines': '30–80 lb braid with fluorocarbon leaders'
    },
    description: 'The Kaylee carries a full rack of matched tackle for every scenario — heavy trolling gear for offshore tuna and billfish, and lighter spinning rods for casting at roosters on inshore reefs.',
    importance: 'Using the right gear for the right fish makes every fight cleaner and safer for catch-and-release species. Captain Jorge rigs everything before you board.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-47a0160c9e5d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fish-box',
    name: 'Insulated Fish Box',
    x: 20,
    y: 35,
    title: 'Full Ice Box',
    subtitle: 'Your Catch Goes Home Fresh',
    stats: {
      'Size': 'Large insulated cooler',
      'Ice': 'Pre-loaded before departure',
      'Service': 'Fish cleaned and filleted dockside',
      'Result': 'Sashimi-grade tuna within hours'
    },
    description: 'Every keeper fish goes straight on ice. Yellowfin Tuna especially benefit from immediate chilling — the difference between sashimi-grade and ordinary is how fast the fish gets cold after the catch.',
    importance: 'Tuna meat degrades fast in tropical heat. Getting the fish on ice within minutes of landing locks in the quality that makes fresh Pacific tuna one of the best meals you\'ll ever eat.',
    imageUrl: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'electronics',
    name: 'GPS & Fish Finder',
    x: 70,
    y: 20,
    title: 'Navigation & Electronics',
    subtitle: 'Captain Jorge\'s Edge',
    stats: {
      'GPS': 'Chartplotter with waypoint history',
      'Fish Finder': 'Down-scan sonar for bait balls',
      'VHF Radio': 'Constant fleet communication',
      'Local Knowledge': '20+ years on these waters'
    },
    description: 'Modern electronics combined with Captain Jorge\'s decades reading the Gulf of Dulce and Pacific. He knows where the temperature breaks are, where the bait stacks up, and which spots produce on which tides.',
    importance: 'Technology finds the water. Experience finds the fish. Captain Jorge uses both — and carries years of productive waypoints built fishing the Osa Peninsula year-round.',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'shaded-console',
    name: 'T-Top Shade',
    x: 78,
    y: 55,
    title: 'Shade & Comfort',
    subtitle: 'Stay Cool Between Fights',
    stats: {
      'Shade': 'Full T-top canopy over the console',
      'Seating': 'Forward and stern seating',
      'Cooler': 'Cold drinks within reach',
      'Tip': 'Bring reef-safe sunscreen'
    },
    description: 'The T-top provides shade for the captain and guests between hookups. On hot Osa days, a shaded perch with a cold drink makes the difference on a long offshore run.',
    importance: 'Managing heat and hydration on a full-day charter matters. The Kaylee\'s layout keeps guests comfortable without sacrificing the open-deck access that makes center consoles the best fishing platforms on the water.',
    imageUrl: 'https://images.unsplash.com/photo-1605281317010-fe5fed933449?auto=format&fit=crop&q=80&w=600'
  }
];

export const CATCH_REPORTS: CatchReport[] = [
  {
    id: 'report-1',
    speciesId: 'yellowfin-tuna',
    speciesName: 'Yellowfin Tuna — Full Box',
    guestName: 'The Rodriguez Group',
    month: 'May',
    year: 2013,
    weight: '',
    length: '',
    location: 'Pacific offshore, 25 miles from Puerto Jiménez',
    captainQuote: 'We loaded the box that day. Five guys, eight tuna — the kind of trip people drive across the country for. The Spinner Dolphins put us right on the school and we never left until the bite slowed down.',
    image: groupCatchImg
  },
  {
    id: 'report-2',
    speciesId: 'yellowfin-tuna',
    speciesName: 'Giant Yellowfin Tuna',
    guestName: 'Private Charter',
    month: 'June',
    year: 2026,
    weight: '',
    length: '',
    location: 'Pacific offshore, Osa Peninsula',
    captainQuote: 'This fish fought for 45 minutes. Every time we thought it was done it made another deep run. When we finally got it to the surface the whole boat went quiet — it was that big.',
    image: captainTunaImg
  },
  {
    id: 'report-3',
    speciesId: 'yellowfin-tuna',
    speciesName: 'Yellowfin Tuna',
    guestName: 'Private Charter',
    month: 'June',
    year: 2026,
    weight: '',
    length: '',
    location: 'Pacific offshore near Caño Island corridor',
    captainQuote: 'Found the dolphins working a massive bait ball about 20 miles out. Live sardines got hit on the first drift. This one came out of nowhere and just crushed it.',
    image: tunaImg2
  },
  {
    id: 'report-4',
    speciesId: 'sailfish-marlin',
    speciesName: 'Pacific Blue Marlin',
    guestName: 'Mike & Sarah',
    month: 'February',
    year: 2026,
    weight: '400+ lbs est.',
    length: '10.5 ft',
    location: 'Pacific drop-off, west of Osa Peninsula',
    captainQuote: 'Two raises in the spread within an hour. First fish broke off but the second stayed hooked through three massive jumps. Released healthy and watched it light up before it disappeared. That\'s what this is all about.',
    image: marlinImg
  }
];
