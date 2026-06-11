import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Utensils, 
  Calendar, 
  Sparkles, 
  Droplet, 
  Compass, 
  Heart, 
  Info, 
  ChefHat, 
  Scale, 
  ChevronRight, 
  Check, 
  AlertCircle
} from 'lucide-react';

// Images
// @ts-ignore
import tunaSashimiImg from '../assets/images/tuna_sashimi_plate_1781202457885.jpg';
// @ts-ignore
import mahiCevicheImg from '../assets/images/mahi_citrus_ceviche_1781202484760.jpg';
// @ts-ignore
import tunaOriginalImg from '../assets/images/yellowfin_tuna_1781200373236.jpg';
// @ts-ignore
import doradoOriginalImg from '../assets/images/dorado_mahi_1781200329038.jpg';
// @ts-ignore
import marlinOriginalImg from '../assets/images/blue_marlin_1781200358551.jpg';
// @ts-ignore
import roosterOriginalImg from '../assets/images/rooster_fish_1781200344379.jpg';
// @ts-ignore
import fishTunaOuter from '../assets/images/real/fish_tuna_outer.jpg';
// @ts-ignore
import fishTunaInner from '../assets/images/real/fish_tuna_inner.jpg';
// @ts-ignore
import fishSailfishOuter from '../assets/images/real/fish_sailfish_outer.jpg';
// @ts-ignore
import fishSailfishInner from '../assets/images/real/fish_sailfish_inner.jpg';
// @ts-ignore
import fishDoradoOuter from '../assets/images/real/fish_dorado_outer.jpg';
// @ts-ignore
import fishDoradoInner from '../assets/images/real/fish_dorado_inner.jpg';
// @ts-ignore
import fishRoosterOuter from '../assets/images/real/fish_rooster_outer.jpg';
// @ts-ignore
import fishRoosterInner from '../assets/images/real/fish_rooster_inner.jpg';

interface FishCut {
  id: string;
  name: string;
  location: string;
  description: string;
  texture: string;
  cookMethod: string;
  pairing: string;
  richness: number; // 1-5 scale
}

const FISH_CUTS_DATA: FishCut[] = [
  {
    id: 'cheek',
    name: "Cheek (Mejilla Medallion)",
    location: "Behind the eye socket socket recess",
    description: "Small, rounded pockets of firm but exceptionally tender muscle. Often considered the ultimate hidden prize of fish butcheries.",
    texture: "Fleshy like scallops, low fat but dense and silky.",
    cookMethod: "Flash pan-seared with browned premium butter, lemon, and a touch of wild sage.",
    pairing: "Dry White Chardonnay or cold Sauvignon Blanc.",
    richness: 2,
  },
  {
    id: 'collar',
    name: "Kama (Pectoral Collar)",
    location: "Triangular pocket running immediately behind the gills",
    description: "The juiciest, most marbled cut on the entire fish. Supported by thick collar bones protecting rich, collagen-infused fats.",
    texture: "Extremely juicy, tender fat flakes, heavy-rich mouthfeel.",
    cookMethod: "Slow char-grilled on orange-hot embers skin-side down until blistered and crispy.",
    pairing: "Shaved green onion, grated daikon radish, and light soy citrus glaze.",
    richness: 5,
  },
  {
    id: 'loin-upper',
    name: "Dorsal Loin (Akami Loin)",
    location: "Upper muscle group running along the dorsal spine",
    description: "Thick, highly uniform structural muscle with vibrant crimson-rose pigmentation. Free of bones and easy to segment.",
    texture: "Lean, clean, iron-rich, and extremely firm.",
    cookMethod: "Sashimi slicing, cold curing, or high-heat blackening for brief rare-centered steaks.",
    pairing: "Crushed sea salt, toasted black sesame, and ginger-wasabi reduction.",
    richness: 3,
  },
  {
    id: 'loin-belly',
    name: "Otoro & Chutoro (Belly Slab)",
    location: "Lower abdominal cavity wall",
    description: "Gastronomic perfection. Intricately marbled with healthy omega-3 oils that break down gracefully at body temperature.",
    texture: "Heavenly rich, melting buttery texture, delicate and oil-laden.",
    cookMethod: "Served completely raw as pristine Sashimi or gently touched with a kitchen torch (Aburi style).",
    pairing: "Aged soy sauce, freshly grated real wasabi root, and hot jasmin green tea.",
    richness: 5,
  },
  {
    id: 'tail',
    name: "Caudal Tail Loin",
    location: "Highly active muscle approaching the caudal fin",
    description: "Dense, athletic tissue with high fibrous structure. Contains high concentration of dark bloodlines (myoglobin) which should be trimmed.",
    texture: "Highly fibrous, meaty, firm chew.",
    cookMethod: "Cured into citrus ceviche, slow cold-smoked, or whipped into artisan fish dip.",
    pairing: "Lime juice, diced red onion, crushed cilantro, and plantain chips.",
    richness: 1,
  }
];

const FISH_GALLERY = [
  { id: 'tuna',     label: 'Yellowfin Tuna',   outer: fishTunaOuter,     inner: fishTunaInner,     edible: true,  sci: 'Thunnus albacares' },
  { id: 'sailfish', label: 'Sailfish & Marlin', outer: fishSailfishOuter, inner: fishSailfishInner, edible: false, sci: 'Istiophorus platypterus' },
  { id: 'dorado',   label: 'Dorado (Mahi)',     outer: fishDoradoOuter,   inner: fishDoradoInner,   edible: true,  sci: 'Coryphaena hippurus' },
  { id: 'rooster',  label: 'Roosterfish',       outer: fishRoosterOuter,  inner: fishRoosterInner,  edible: false, sci: 'Nematistius pectoralis' },
];

export default function CulinaryGuide() {
  const [activeTab, setActiveTab] = useState<'cuts' | 'recipes' | 'seasons'>('cuts');
  const [selectedCutId, setSelectedCutId] = useState<string>('loin-belly');
  const [hoveredCutId, setHoveredCutId] = useState<string | null>(null);
  const [selectedFishId, setSelectedFishId] = useState<string>('tuna');

  const activeFish = FISH_GALLERY.find(f => f.id === selectedFishId) || FISH_GALLERY[0];

  const activeCut = FISH_CUTS_DATA.find(c => c.id === selectedCutId) || FISH_CUTS_DATA[3];

  // More descriptive season lists for the expansion
  const seasonsData = [
    {
      name: "Pacific Blue Marlin",
      image: marlinOriginalImg,
      status: "STRICTLY CATCH & RELEASE",
      statusColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      peakMonths: "December to April",
      averageSize: "300 – 600+ lbs",
      gastronomyNotes: "Non-Edible. Regulated fully for conservation. We tag and quickly release at the hull to support marine populations.",
      calendar: [true, true, true, true, false, false, false, false, false, false, true, true]
    },
    {
      name: "Yellowfin Tuna",
      image: tunaOriginalImg,
      status: "SUSTAINABLE FEAST",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      peakMonths: "May to October (Strong Year-Round)",
      averageSize: "30 – 180+ lbs",
      gastronomyNotes: "Unrivaled premium grade. Delivers magnificent fatty belly slabs (Toro) and ruby lean loins (Akami) immediately iced down on board.",
      calendar: [true, true, true, true, true, true, true, true, true, true, true, true]
    },
    {
      name: "Dorado (Mahi-Mahi)",
      image: doradoOriginalImg,
      status: "SUSTAINABLE FEAST",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      peakMonths: "September to December (Trash Line Season)",
      averageSize: "15 – 55 lbs",
      gastronomyNotes: "Exquisite sweet flaky fillets. The ultimate companion for a classic Costa Rican lime ceviche or grilled dockside tacos.",
      calendar: [false, false, false, false, true, true, true, true, true, true, true, true]
    },
    {
      name: "Wahoo (The Pacific Speedster)",
      image: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=600",
      status: "SUSTAINABLE FEAST",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      peakMonths: "November to March",
      averageSize: "20 – 65 lbs",
      gastronomyNotes: "Known as 'white gold'. Remarkably lean, clean, light meat. Excellent when hardwood seared or applewood cold-smoked.",
      calendar: [true, true, true, false, false, false, false, false, false, false, true, true]
    },
    {
      name: "Trophy Roosterfish",
      image: roosterOriginalImg,
      status: "STRICTLY CATCH & RELEASE",
      statusColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      peakMonths: "May to August (Year-Round)",
      averageSize: "30 – 80 lbs",
      gastronomyNotes: "Non-Edible. Roosters are local heritage game fish and are released immediately. Highly valued live tourist icon.",
      calendar: [true, true, true, true, true, true, true, true, true, true, true, true]
    }
  ];

  const monthsAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div id="culinary-guide" className="bg-[#0b1219] border border-white/10 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Dynamic graphic rings */}
      <div className="absolute -top-12 right-1/4 w-96 h-96 bg-teal-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5 mb-8 border-b border-white/8 pb-6 relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-teal-300 block mb-1">
            Gastronomy, Cuts & Peak Timelines
          </span>
          <h3 className="font-serif text-3xl lg:text-4xl text-white font-medium tracking-tight">
            Captain’s Galley & Fish Cuts
          </h3>
          <p className="text-sm text-white/55 mt-1 max-w-2xl">
            Costa Rica’s cold sea spray preserves top-tier sashimi quality. Explore exactly how we prepare sustainable pelagics, read specialized butcher guides, and follow peak seasonal movements.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/8 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab('cuts')}
            className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'cuts' ? 'bg-teal-500 text-white shadow' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <ChefHat size={12} />Butchery Cuts
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'recipes' ? 'bg-teal-500 text-white shadow' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Utensils size={12} />Fine Recipes
          </button>
          <button
            onClick={() => setActiveTab('seasons')}
            className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'seasons' ? 'bg-teal-500 text-white shadow' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <Calendar size={12} />Seasons Calendar
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: BUTCHERY CUTS DIAGRAM */}
          {activeTab === 'cuts' && (
            <motion.div
              key="cuts-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Fish gallery + hover anatomy reveal — left column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-4">

                {/* Fish species switcher */}
                <div className="grid grid-cols-4 gap-2">
                  {FISH_GALLERY.map(fish => (
                    <button
                      key={fish.id}
                      onClick={() => setSelectedFishId(fish.id)}
                      className={`relative rounded-xl overflow-hidden border transition-all duration-200 group/fish ${
                        selectedFishId === fish.id
                          ? 'border-teal-400/60 shadow-[0_0_16px_rgba(0,212,188,0.2)]'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                      style={{ aspectRatio: '4/3' }}
                    >
                      <img src={fish.outer} alt={fish.label} className="w-full h-full object-cover brightness-75 group-hover/fish:brightness-90 transition-all duration-200" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="text-[8px] font-mono text-white leading-tight font-medium">{fish.label}</p>
                        {!fish.edible && <p className="text-[7px] font-mono text-amber-400 uppercase mt-0.5">C&R Only</p>}
                      </div>
                      {selectedFishId === fish.id && (
                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-teal-400" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Main photo — hover crossfades outer → inner anatomy */}
                <div
                  className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group cursor-crosshair"
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={activeFish.outer}
                    alt={activeFish.label}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                  />
                  <img
                    src={activeFish.inner}
                    alt={`${activeFish.label} anatomy`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between transition-opacity duration-300 group-hover:opacity-0">
                    <div>
                      <p className="font-serif text-xl text-white font-medium">{activeFish.label}</p>
                      <p className="text-[10px] font-mono text-white/40 italic">{activeFish.sci}</p>
                    </div>
                    <span className="text-[9px] font-mono text-white/50 bg-black/60 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm uppercase tracking-widest">
                      Hover to reveal anatomy
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-[9px] font-mono text-teal-300 bg-teal-900/60 border border-teal-500/30 px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
                      {activeFish.edible ? 'Internal Anatomy · Select a cut below' : 'Internal Anatomy · Catch & Release Species'}
                    </span>
                  </div>
                </div>

                {/* Cut tabs — only for edible species */}
                {activeFish.edible ? (
                  <div className="flex flex-wrap gap-2">
                    {FISH_CUTS_DATA.map(cut => (
                      <button
                        key={cut.id}
                        onClick={() => setSelectedCutId(cut.id)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-mono uppercase tracking-wider transition-all duration-200 border ${
                          selectedCutId === cut.id
                            ? 'bg-teal-500/15 text-teal-200 border-teal-400/40'
                            : 'bg-transparent text-white/35 border-white/8 hover:text-white/70 hover:border-white/20'
                        }`}
                      >
                        {cut.name.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-amber-500/8 border border-amber-500/20 rounded-xl px-4 py-3 text-xs text-amber-300/80 font-mono">
                    This species is strictly catch &amp; release — no culinary data applies. Tagged and released at the hull.
                  </div>
                )}

              </div>

              {/* Dynamic Cuts Info Box on the Right (5 columns) */}
              <div className="lg:col-span-5 h-full">
                {activeFish.edible ? (
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-full space-y-5">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20 inline-block mb-3">
                        Cut Details: {activeCut.location}
                      </span>
                      <h4 className="font-serif text-2xl text-white font-medium">
                        {activeCut.name}
                      </h4>
                      <p className="text-xs text-white/65 mt-2.5 leading-relaxed">
                        {activeCut.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white/40">Texture:</span>
                        <span className="text-white/85 font-medium">{activeCut.texture}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-emerald-400">Chef Method:</span>
                        <span className="text-emerald-300 font-medium text-right max-w-[200px]">{activeCut.cookMethod}</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-sky-400">Plating Accents:</span>
                        <span className="text-sky-300 font-medium text-right">{activeCut.pairing}</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between text-[10px] font-mono text-white/35 mb-1">
                          <span>LIPID / OIL RICHNESS</span>
                          <span>{activeCut.richness} / 5</span>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`h-1.5 flex-1 rounded-sm ${
                                level <= activeCut.richness
                                  ? activeCut.richness >= 4 ? 'bg-rose-500' : 'bg-teal-500'
                                  : 'bg-white/8'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/30 p-3 rounded-xl flex items-start gap-2 text-[10px] font-mono leading-relaxed text-white/45">
                      <Info size={14} className="text-teal-400 shrink-0 mt-0.5" />
                      <span>Every fish harvested is immediately transferred to a sub-zero salt slurry to preserve perfect muscle structure.</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl flex flex-col justify-center h-full gap-5">
                    <div className="h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Heart size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 inline-block mb-3">
                        Conservation Status
                      </span>
                      <h4 className="font-serif text-2xl text-white font-medium mb-2">{activeFish.label}</h4>
                      <p className="text-xs text-white/55 leading-relaxed">
                        This species is designated catch &amp; release only at Casa Jimenez. We tag, photograph, and return every fish at the hull — contributing to long-term Pacific population health.
                      </p>
                    </div>
                    <div className="space-y-2 text-xs font-mono text-white/40">
                      <div className="flex items-center gap-2"><Check size={11} className="text-teal-400" /> Tagged for marine research programs</div>
                      <div className="flex items-center gap-2"><Check size={11} className="text-teal-400" /> Released in under 90 seconds</div>
                      <div className="flex items-center gap-2"><Check size={11} className="text-teal-400" /> Photography allowed boat-side</div>
                    </div>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* TAB 2: GOURMET RECIPES */}
          {activeTab === 'recipes' && (
            <motion.div
              key="recipes-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Recipe 1: Tuna Sashimi */}
              <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full bg-black">
                  <img 
                    src={tunaSashimiImg} 
                    alt="Seared Yellowfin Sashimi Plate" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="bg-rose-500 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-rose-400/20">
                      Sashimi Premium
                    </span>
                    <h4 className="font-serif text-2xl font-semibold text-white mt-1.5">
                      Pacific Yellowfin Tataki
                    </h4>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/8 pb-3">
                    <div className="flex items-center gap-1 text-white/75">
                      <Scale size={12} className="text-teal-400" />
                      <span>Best for Loin / Akami cuts</span>
                    </div>
                    <div className="text-teal-400 flex items-center gap-1">
                      <Flame size={12} />
                      Prep: 15 mins (Flash-Sear)
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-teal-300">Chef Ingredients</h5>
                    <ul className="text-xs text-white/65 space-y-1 font-mono">
                      <li>• 12 oz pure Yellowfin Tuna Loin (trimmed rectangle block)</li>
                      <li>• 3 tbsp toasted white and black sesame seeds</li>
                      <li>• 2 tbsp fine ponzu citrus soy glaze</li>
                      <li>• Micro-cilantro and thinly julienned ginger roots</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/8 text-xs leading-relaxed text-white/55">
                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-[#10b981]">Instructions & Plating</h5>
                    <p>
                      1. Dry the tuna loin completely with cheesecloth. Lightly brush with dark sesame oil.<br />
                      2. Roll the block completely in mixed sesame seeds to form an even crust.<br />
                      3. Heat dynamic cast iron skillet to maximum dry heat. Flash sear each side for exactly <strong>10 seconds</strong> to retain a deep gem-like raw translucent center.<br />
                      4. Slice using a single razor-sharp Yanagiba knife pull. Fan flat over ponzu and crown with micro-cilantro.
                    </p>
                  </div>
                </div>
              </div>

              {/* Recipe 2: Mango Dorado Ceviche */}
              <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full bg-black">
                  <img 
                    src={mahiCevicheImg} 
                    alt="Tropical Dorado Mango Ceviche" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="bg-teal-500 text-white font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-teal-400/20">
                      Citrus Cured
                    </span>
                    <h4 className="font-serif text-2xl font-semibold text-white mt-1.5">
                      Guanacaste Styled Dorado Ceviche
                    </h4>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-white/8 pb-3">
                    <div className="flex items-center gap-1 text-white/75">
                      <Scale size={12} className="text-teal-400" />
                      <span>Best for Dorado Tail & Fillets</span>
                    </div>
                    <div className="text-teal-400 flex items-center gap-1">
                      <Flame size={12} />
                      Cure Time: 12 – 15 mins max
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-teal-300">Chef Ingredients</h5>
                    <ul className="text-xs text-white/65 space-y-1 font-mono">
                      <li>• 1 lb fresh premium cubed Dorado (1/2-inch uniform dice)</li>
                      <li>• 6 key limes (squeezed fresh right over the fish)</li>
                      <li>• 1 ripe Costa Rican mango (finely cubed)</li>
                      <li>• 1/2 sweet purple onion, finely diced, & fresh local cilantro leaves</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/8 text-xs leading-relaxed text-white/55">
                    <h5 className="text-[10px] uppercase font-mono tracking-wider text-[#10b981]">Instructions & Plating</h5>
                    <p>
                      1. Place chilled dorado meat in a frozen glass bowl. Squeeze lime juice directly to fully submerged.<br />
                      2. Allow to cure in refrigerator for precisely 12 minutes—the flesh will transform from translucent to clean pearlescent white.<br />
                      3. Drain off 40% of standard runoff juice. Fold in cubed mangoes, sweet red onions, sea salt, and fresh cilantro roots.<br />
                      4. Serve instantly in an elegant coconut shell backed with crispy salted house plantain chips.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MONTHLY SEASONS CALENDAR TIMELINE */}
          {activeTab === 'seasons' && (
            <motion.div
              key="seasons-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="bg-black/50 p-4 border border-white/8 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-white/75 max-w-xl">
                  <span className="font-semibold text-teal-300">How to read the calendar:</span> Teal monthly slots indicate standard <strong>Peak Bite season</strong> when catch probabilities range from 85% to 98% with maximum daily boat triggers.
                </div>
                <div className="flex gap-3 text-[10px] font-mono shrink-0">
                  <span className="flex items-center gap-1.5 text-teal-300">
                    <span className="h-2 w-2 rounded bg-teal-400" /> Peak Season
                  </span>
                  <span className="flex items-center gap-1.5 text-white/40">
                    <span className="h-2 w-2 rounded bg-[#11202e]" /> Semi-Off Peak
                  </span>
                </div>
              </div>

              {/* Seasons Grid Mapping */}
              <div className="space-y-4">
                {seasonsData.map((species, sIdx) => (
                  <div 
                    key={sIdx} 
                    className="bg-white/5 border border-white/8 hover:border-white/15 p-5 rounded-2xl transition-all duration-350 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
                  >
                    
                    {/* Species Profile (3 Columns) */}
                    <div className="lg:col-span-3 flex items-center gap-3">
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-black border border-white/8 shrink-0">
                        <img 
                          src={species.image} 
                          alt={species.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-white font-bold leading-tight">
                          {species.name}
                        </h4>
                        <span className="text-[9.5px] font-mono text-teal-400 block mt-0.5">
                          Avg: {species.averageSize}
                        </span>
                        <span className={`text-[8.5px] font-mono tracking-widest uppercase border px-1.5 py-0.5 rounded inline-block mt-1.5 ${species.statusColor}`}>
                          {species.status}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Tracker (6 Columns) */}
                    <div className="lg:col-span-6">
                      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                        {species.calendar.map((isPeak, mIdx) => (
                          <div 
                            key={mIdx} 
                            className={`p-2 rounded text-center font-mono text-[9px] transition-all leading-none ${
                              isPeak 
                                ? 'bg-teal-500 text-ocean-950 font-bold shadow-[0_2px_8px_rgba(0,212,188,0.3)]' 
                                : 'bg-[#11202e] text-white/30'
                            }`}
                          >
                            <span className="block">{monthsAbbr[mIdx]}</span>
                            <span className="text-[7.5px] mt-1 block opacity-80">{isPeak ? 'PEAK' : 'OK'}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-mono text-[9px] text-white/45 mt-2">
                        <span>Optimal Period: <strong className="text-white/75">{species.peakMonths}</strong></span>
                        <span className="italic">Hydro-temperatures mapped</span>
                      </div>
                    </div>

                    {/* Gastronomic note (3 Columns) */}
                    <div className="lg:col-span-3 border-l lg:border-l border-white/8 pl-0 lg:pl-5 pt-3 lg:pt-0">
                      <div className="text-[10px] font-mono text-teal-400 uppercase tracking-wider mb-1">
                        Gastronomy Summary
                      </div>
                      <p className="text-[11px] text-white/55 leading-relaxed font-sans italic">
                        &quot;{species.gastronomyNotes}&quot;
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Ethical warning footer block */}
      <div className="mt-8 border-t border-white/8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <AlertCircle size={18} />
          </div>
          <div>
            <h5 className="font-serif text-sm text-white/75 font-semibold">Strict Bilfish Conservation Ethic</h5>
            <p className="text-[11px] text-white/45 mt-0.5 leading-relaxed font-sans max-w-2xl">
              Marlin, Sailfish, and Roosterfish are precious resources protecting Costa Rica’s blue economy. Under no circumstances do we harvest these species. We only keep sustainable Pelagics (Tuna, Dorado, Wahoo) strictly aligned with local INCOPESCA limits.
            </p>
          </div>
        </div>
        
        <div className="bg-teal-500/5 px-4 py-2 border border-white/8 rounded-xl font-mono text-[10px] text-teal-300 uppercase tracking-wider whitespace-nowrap self-stretch md:self-center text-center">
          🌊 Pure Conservation Focus
        </div>
      </div>

    </div>
  );
}
