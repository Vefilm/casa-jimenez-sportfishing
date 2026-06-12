import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Anchor, 
  Waves, 
  ChevronDown, 
  Compass, 
  Award, 
  Clock, 
  Users, 
  ShieldCheck, 
  Mail, 
  Calendar, 
  MapPin, 
  Wind, 
  Thermometer, 
  Sun, 
  Star,
  Zap,
  Flame,
  ArrowDown,
  Sparkles,
  Wrench
} from 'lucide-react';

import SolunarDashboard from './components/SolunarDashboard';
import TripBuilder from './components/TripBuilder';
import CatchGallery from './components/CatchGallery';
import PhotoGallery from './components/PhotoGallery';
import CulinaryGuide from './components/CulinaryGuide';
import FishFlipCard from './components/FishFlipCard';
import MigrationMap from './components/MigrationMap';
import CaptainChat from './components/CaptainChat';
import Testimonials from './components/Testimonials';
import FishingReport from './components/FishingReport';
import BookingCalendar from './components/BookingCalendar';
import { useLanguage } from './context/LanguageContext';
import { useT } from './translations';
import { SPECIES_DATA, SPECIAL_FEATURES, IMAGES, CHARTER_TRIPS } from './data';
import { Species } from './types';

// @ts-ignore
import fishTunaOuter from './assets/images/real/fish_tuna_outer.jpg';
// @ts-ignore
import fishTunaAlt from './assets/images/real/yellowfin_tuna_2.jpg';
// @ts-ignore
import fishSailfishOuter from './assets/images/real/fish_sailfish_outer.jpg';
// @ts-ignore
import fishSailfishAlt from './assets/images/blue_marlin_1781200358551.jpg';
// @ts-ignore
import fishDoradoOuter from './assets/images/real/fish_dorado_outer.jpg';
// @ts-ignore
import fishDoradoAlt from './assets/images/fish_mahi_live.jpg';
// @ts-ignore
import fishRoosterOuter from './assets/images/real/fish_rooster_outer.jpg';
// @ts-ignore
import fishRoosterAlt from './assets/images/rooster_fish_1781200344379.jpg';
// @ts-ignore
import fishPargoOuter from './assets/images/fish_pargo_outer.jpg';
// @ts-ignore
import fishAmberjackOuter from './assets/images/fish_amberjack_gen.jpg';

const FISH_IMAGES: Record<string, [string, string]> = {
  'yellowfin-tuna':  [fishTunaOuter,      fishTunaAlt],
  'sailfish-marlin': [fishSailfishOuter,  fishSailfishAlt],
  'dorado-mahi':     [fishDoradoAlt,      fishDoradoAlt],
  'roosterfish':     [fishRoosterOuter,   fishRoosterAlt],
  'pargo':           [fishPargoOuter,     fishPargoOuter],
  'amberjack':       [fishAmberjackOuter, fishAmberjackOuter],
};

// Ambient Theme Parameters & Live Rig configurations for interactive gear testing
const speciesThemes: Record<string, {
  accentColor: string;
  glowColor: string;
  gradientClass: string;
  glowClass: string;
  badgeClass: string;
  pillsClass: string;
  borderClass: string;
  tagline: string;
  silhouette: string;
  rigs: { id: string; label: string; desc: string; stats: Record<string, string> }[];
}> = {
  'sailfish-marlin': {
    accentColor: 'text-[#3b82f6]', // Sapphire
    glowColor: '#3b82f6',
    gradientClass: 'from-[#03152c] to-[#0A0D11]',
    glowClass: 'bg-blue-400/5',
    badgeClass: 'bg-blue-400/10 border-blue-400/30 text-blue-300',
    pillsClass: 'border-blue-500/20 text-blue-200 hover:border-blue-500/50',
    borderClass: 'border-blue-400/20',
    tagline: 'Deep Sapphire Pelagic Canyon',
    silhouette: 'marlin',
    rigs: [
      { id: 'bally_circle', label: 'Rigged Circle Ballyhoo', desc: 'Pre-rigged ballyhoo with owner circles on 130lb fluorocarbon leader. Perfect action for Sailfish.', stats: { 'Hookup rate': '92%', 'Target Stealth': '98%', 'Release safety': '100%' } },
      { id: 'live_bonito', label: 'Bridled Transom Bonito', desc: 'Placed in high-pressure transom tubes, bridled on heavy circles. Direct trigger for heavy Marlin.', stats: { 'Hookup rate': '85%', 'Target Stealth': '85%', 'Release safety': '95%' } }
    ]
  },
  'dorado-mahi': {
    accentColor: 'text-[#f97316]', // Amber/Dorado orange-gold and green
    glowColor: '#c5a059',
    gradientClass: 'from-[#2a1e05] to-[#0A0E12]',
    glowClass: 'bg-amber-400/5',
    badgeClass: 'bg-amber-400/10 border-amber-300/30 text-gold-300',
    pillsClass: 'border-amber-500/20 text-amber-200 hover:border-amber-500/50',
    borderClass: 'border-gold-300/20',
    tagline: 'Solar Amber Offshore Currents',
    silhouette: 'dorado',
    rigs: [
      { id: 'daisy_chain', label: 'Neon Bird Daisy Chain', desc: 'High-visibility surface teasers carrying fluorescent squids. Raises heavy schooling bulls.', stats: { 'Hookup rate': '96%', 'Target Stealth': '70%', 'Release safety': '90%' } },
      { id: 'troll_goggle', label: 'Bridled Goggle-Eye', desc: 'Slow-trolled live Goggle-eye at current rims, rigged lightly to minimize weight.', stats: { 'Hookup rate': '88%', 'Target Stealth': '96%', 'Release safety': '98%' } }
    ]
  },
  'roosterfish': {
    accentColor: 'text-[#d97706]', // Sunset Gold
    glowColor: '#d97706',
    gradientClass: 'from-[#2d1808] to-[#0A0D11]',
    glowClass: 'bg-orange-400/5',
    badgeClass: 'bg-orange-400/10 border-orange-400/30 text-orange-300',
    pillsClass: 'border-orange-500/20 text-orange-200 hover:border-orange-500/50',
    borderClass: 'border-orange-500/25',
    tagline: 'Volcanic Shallow Reef Tides',
    silhouette: 'rooster',
    rigs: [
      { id: 'live_lookdown', label: 'Shallow Live Lookdown', desc: 'Bridled close to volcanic shallow pinnacles. Irresistible bait for big Roosters.', stats: { 'Hookup rate': '98%', 'Target Stealth': '95%', 'Release safety': '100%' } },
      { id: 'vertical_jig', label: 'Metal Jigging Spoon', desc: 'High-pitch vertical dropping to trigger immediate aggressive territorial snaps.', stats: { 'Hookup rate': '78%', 'Target Stealth': '80%', 'Release safety': '92%' } }
    ]
  },
  'yellowfin-tuna': {
    accentColor: 'text-[#10b981]', // Emerald / Cobalt Green
    glowColor: '#10b981',
    gradientClass: 'from-[#051c17] to-[#0A0D11]',
    glowClass: 'bg-emerald-400/5',
    badgeClass: 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300',
    pillsClass: 'border-emerald-500/20 text-emerald-200 hover:border-emerald-500/50',
    borderClass: 'border-emerald-400/20',
    tagline: 'Deep Emerald Dolphin Trenches',
    silhouette: 'tuna',
    rigs: [
      { id: 'popper_frenzy', label: 'Surface Casting Popper', desc: 'Adrenaline popper cast right in the path of feeding spinner dolphins.', stats: { 'Hookup rate': '95%', 'Target Stealth': '70%', 'Release safety': '96%' } },
      { id: 'cedar_plug', label: 'Natural Cedar core', desc: 'Runs tight, deep, vibrating natural wood scents representing small flyers.', stats: { 'Hookup rate': '89%', 'Target Stealth': '90%', 'Release safety': '90%' } }
    ]
  },
  'pargo': {
    accentColor: 'text-[#ef4444]', // Red
    glowColor: '#ef4444',
    gradientClass: 'from-[#2a0a0a] to-[#0A0D11]',
    glowClass: 'bg-red-400/5',
    badgeClass: 'bg-red-400/10 border-red-400/30 text-red-300',
    pillsClass: 'border-red-500/20 text-red-200 hover:border-red-500/50',
    borderClass: 'border-red-400/20',
    tagline: 'Volcanic Reef Drop-offs',
    silhouette: 'tuna',
    rigs: [
      { id: 'live_runner', label: 'Deep Live Runner', desc: 'Live blue runner weighted heavy and dropped straight into the reef zone on a circle hook.', stats: { 'Hookup rate': '96%', 'Target Stealth': '85%', 'Release safety': '92%' } },
      { id: 'squid_rig', label: 'Fresh Squid Rig', desc: 'Strip of fresh squid on a double-hook bottom rig — classic pargo presentation on hard structure.', stats: { 'Hookup rate': '88%', 'Target Stealth': '92%', 'Release safety': '90%' } }
    ]
  },
  'amberjack': {
    accentColor: 'text-[#8b5cf6]', // Purple
    glowColor: '#8b5cf6',
    gradientClass: 'from-[#1a0a2e] to-[#0A0D11]',
    glowClass: 'bg-purple-400/5',
    badgeClass: 'bg-purple-400/10 border-purple-400/30 text-purple-300',
    pillsClass: 'border-purple-500/20 text-purple-200 hover:border-purple-500/50',
    borderClass: 'border-purple-400/20',
    tagline: 'Mid-Column Current Breaks',
    silhouette: 'tuna',
    rigs: [
      { id: 'heavy_jig', label: 'Deep Water Jig', desc: 'Heavy butterfly jig worked on the drop through mid-water columns where amberjack hold.', stats: { 'Hookup rate': '90%', 'Target Stealth': '80%', 'Release safety': '85%' } },
      { id: 'live_bonito', label: 'Slow-Trolled Bonito', desc: 'Whole live bonito slow-trolled at the edge of current breaks — triggers aggressive strikes.', stats: { 'Hookup rate': '85%', 'Target Stealth': '90%', 'Release safety': '88%' } }
    ]
  }
};

const appThemes = {
  sapphire: {
    bodyBg: "bg-[#050507] text-white",
    headerBg: "bg-[#070709]/95 border-b border-white/6",
    sectionBorder: "border-white/8",
    subBg: "bg-[#0a0c10]",
    textMuted: "text-white/50",
    textTitle: "text-white",
    textDesc: "text-white/70",
    cardBg: "bg-white/4 border border-white/8",
    badgeBorder: "border-teal-500/30 text-teal-300",
    detailsBg: "bg-white/3 border-white/6",
    glowClass: "bg-teal-500/5",
    navBtn: "hover:text-white",
    subtleLabel: "text-teal-400",
    accentGlow: "bg-teal-500/10 rounded-full",
    brandHeader: "text-white",
    brandSub: "text-white/35",
  },
  obsidian: {
    bodyBg: "bg-[#030303] text-[#e8e8e8]",
    headerBg: "bg-black/95 border-b border-white/5",
    sectionBorder: "border-white/6",
    subBg: "bg-[#0a0a0a]",
    textMuted: "text-white/45",
    textTitle: "text-white",
    textDesc: "text-white/65",
    cardBg: "bg-white/3 border border-white/6",
    badgeBorder: "border-white/15 text-white/70",
    detailsBg: "bg-white/2 border-white/5",
    glowClass: "bg-white/2",
    navBtn: "hover:text-white text-white/50",
    subtleLabel: "text-white/50",
    accentGlow: "bg-white/6 border-white/8",
    brandHeader: "text-white",
    brandSub: "text-white/35",
  },
  misty: {
    bodyBg: "bg-[#f0f4f2] text-[#0d1f14]",
    headerBg: "bg-white/90 border-b border-slate-200 shadow-[0_1px_15px_rgba(0,0,0,0.04)]",
    sectionBorder: "border-slate-200",
    subBg: "bg-slate-100/60",
    textMuted: "text-slate-500",
    textTitle: "text-[#0d1f14]",
    textDesc: "text-slate-600",
    cardBg: "bg-white border border-slate-100 shadow-sm",
    badgeBorder: "border-teal-300 text-teal-700 bg-teal-50",
    detailsBg: "bg-slate-50 border-slate-200",
    glowClass: "bg-teal-500/5",
    navBtn: "hover:text-teal-700 text-slate-500",
    subtleLabel: "text-teal-600",
    accentGlow: "bg-teal-100 text-teal-700",
    brandHeader: "text-[#0d1f14]",
    brandSub: "text-slate-500",
  },
};

export default function App() {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('yellowfin-tuna');
  const [selectedRigId, setSelectedRigId] = useState<string>('');
  const [themeMode, setThemeMode] = useState<'sapphire' | 'obsidian' | 'misty'>('sapphire');
  const { lang, toggle: toggleLang } = useLanguage();
  const t = useT();

  const activeSpecies = SPECIES_DATA.find(s => s.id === selectedSpeciesId) || SPECIES_DATA[0];
  const theme = speciesThemes[selectedSpeciesId] || speciesThemes['sailfish-marlin'];
  const themeStyle = appThemes[themeMode] || appThemes['sapphire'];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${themeStyle.bodyBg} font-sans selection:bg-gold-500 selection:text-ocean-950 transition-colors duration-700 relative`}>
      
      {/* Decorative Continuous Background Floating Grids/Waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] select-none z-0 transition-colors duration-500">
        <svg className="w-full h-full" viewBox="0 0 1440 3000" preserveAspectRatio="none">
          <path d="M0,150 C360,250 720,50 1080,150 C1260,200 1380,180 1440,150 L1440,3000 L0,3000 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M0,450 C360,350 720,550 1080,450" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0,850 C400,950 800,750 1200,850" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M0,1450 C360,1350 720,1550 1080,1450" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>

        {/* Ambient Floating Sportfish Silhouettes in Page Margins */}
        <div className="absolute top-[25%] left-[2%] opacity-15 hover:opacity-25 transition-opacity duration-700 animate-pulse">
          <svg width="240" height="90" viewBox="0 0 120 45" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold-400">
            {/* Elegant Marlin Outline */}
            <path d="M10,22 C30,12 55,10 75,18 C85,22 95,28 110,32 C95,30 85,34 70,36 C50,38 30,34 10,22 Z" />
            <path d="M75,18 C85,10 95,2 108,0 C102,8 90,14 78,19" />
            <path d="M10,22 L0,23 L8,24" />{/* Bill */}
            <path d="M110,32 L118,22 L114,33 L119,42 L110,32" />{/* Tail */}
          </svg>
          <span className="text-[8px] font-mono tracking-widest uppercase text-gold-400/40 block mt-1 pl-4">PROWLING BILLFISH COUNTER</span>
        </div>

        <div className="absolute top-[55%] right-[3%] opacity-15 hover:opacity-25 transition-opacity duration-700">
          <svg width="200" height="80" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold-400">
            {/* Elegant Tuna Outline */}
            <path d="M5,20 C20,8 55,6 75,15 C85,20 90,24 95,20 C85,23 75,27 60,29 C40,31 20,28 5,20 Z" />
            <path d="M75,15 C80,10 85,6 88,8 C82,12 78,16 76,16" />
            <path d="M95,20 L100,14 L97,20 L100,26 L95,20" />{/* Finlets */}
          </svg>
          <span className="text-[8px] font-mono tracking-widest uppercase text-gold-400/40 block mt-1 text-right pr-4">PELAGIC CANYON LINE</span>
        </div>

        <div className="absolute top-[80%] left-[4%] opacity-20 hover:opacity-30 transition-opacity duration-700 animate-pulse">
          <svg width="220" height="90" viewBox="0 0 110 45" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold-400">
            {/* Elegant Roosterfish Comb Outline */}
            <path d="M8,25 C25,18 50,15 70,22 C80,25 90,30 102,32 C90,30 80,34 65,36 C45,39 25,35 8,25 Z" />
            <path d="M25,18 Q35,2 45,6 T55,10" />{/* Comb */}
            <path d="M102,32 L108,24 L104,33 L108,40 L102,32" />
          </svg>
          <span className="text-[8px] font-mono tracking-widest uppercase text-gold-400/40 block mt-1 pl-4">INSHORE REEF PATH</span>
        </div>
      </div>

      {/* STATUS RAIL */}
      <div className="bg-[#040506] border-b border-white/6 text-white/45 py-2 px-4 lg:px-8 text-[11px] font-mono tracking-widest uppercase flex flex-col md:flex-row justify-between items-center gap-2 relative z-50">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-teal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            {t('statusLive')}
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-white/30" /> Puerto Jiménez, Osa Peninsula, Costa Rica
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <Thermometer size={12} className="text-white/30" /> {t('statusAir')}
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Wind size={12} className="text-white/30" /> {t('statusWind')}
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1">
            <Waves size={12} className="text-white/30" /> {t('statusSea')}
          </span>
        </div>
      </div>

      {/* TROPICAL WEATHER ADVISORY — storms build fast on the Pacific */}
      <div className="bg-amber-500/8 border-b border-amber-500/15 text-white/55 py-1.5 px-4 lg:px-8 text-[10px] font-mono tracking-wider flex items-center justify-center gap-2 relative z-50">
        <span className="text-amber-400 text-[11px]">⚠</span>
        <span>{t('weatherWarning')}</span>
      </div>

      {/* GLASSMORPHIC BRAND MENU */}
      <header className={`sticky top-0 ${themeStyle.headerBg} backdrop-blur-md py-4 px-4 lg:px-8 flex items-center justify-between z-40 transition-colors duration-500`}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-black font-display text-sm font-bold tracking-wide">
            CJ
          </div>
          <div>
            <h1 className={`font-sans text-sm tracking-widest uppercase ${themeStyle.brandHeader} font-semibold`}>
              CASA JIMENEZ
            </h1>
            <span className={`text-[9px] font-mono tracking-[4px] uppercase ${themeStyle.brandSub} block`}>
              {t('footerSport')}
            </span>
          </div>
        </div>

        {/* Anchor Links */}
        <nav className="hidden xl:flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-white/40">
          <button onClick={() => handleScrollTo('features')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navGeography')}</button>
          <button onClick={() => handleScrollTo('species')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navCatch')}</button>
          <button onClick={() => handleScrollTo('migration')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navMigration')}</button>
          <button onClick={() => handleScrollTo('culinary')} className={`hover:text-gold-400 transition duration-300 cursor-pointer font-semibold text-gold-300`}>{t('navGalley')}</button>
          <button onClick={() => handleScrollTo('solunar')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navTide')}</button>
          <button onClick={() => handleScrollTo('tripbuilder')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navPlanner')}</button>
          <button onClick={() => handleScrollTo('gallery')} className={`hover:text-gold-400 transition duration-300 cursor-pointer`}>{t('navLandings')}</button>
        </nav>

        {/* DYNAMIC PALETTE CONTROLLER — hidden, locked to sapphire */}
        <div className="hidden">
          <button
            onClick={() => setThemeMode('sapphire')}
            className=""
            title="Ocean Sapphire Theme"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <span className="hidden sm:inline">Blue</span>
          </button>
          <button
            onClick={() => setThemeMode('obsidian')}
            className={`p-1.5 rounded-lg flex items-center gap-1 transition-all text-[9.5px] font-mono uppercase tracking-wider ${
              themeMode === 'obsidian'
                ? 'bg-[#18181b] text-gold-200 shadow font-semibold'
                : 'text-gold-200/50 hover:text-gold-200 hover:bg-white/5'
            }`}
            title="Carbon Obsidian Theme"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-200" />
            <span className="hidden sm:inline">Black</span>
          </button>
          <button
            onClick={() => setThemeMode('misty')}
            className={`p-1.5 rounded-lg flex items-center gap-1 transition-all text-[9.5px] font-mono uppercase tracking-wider ${
              themeMode === 'misty'
                ? 'bg-[#102a43] text-white shadow font-semibold'
                : 'text-gold-200/50 hover:text-gold-200 hover:bg-white/5'
            }`}
            title="Misty Cloud Light Theme"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
            <span className="hidden sm:inline">Cloud</span>
          </button>
        </div>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/15 text-white/60 hover:text-white hover:border-white/35 transition-all text-[11px] font-mono tracking-widest uppercase"
          aria-label="Switch language"
        >
          {lang === 'en' ? 'ES' : 'EN'}
        </button>

        {/* CTA Contact Email */}
        <a
          href="mailto:cabinasjimenez@gmail.com?subject=Fishing Charter Inquiry&body=Hello, I would like to inquire about booking a fishing charter with Casa Jimenez Sport Fishing..."
          className="bg-white text-black font-sans font-semibold text-xs px-5 py-2.5 rounded-xl transition duration-300 hover:bg-teal-400 hover:text-black"
        >
          {t('navBookNow')}
        </a>
      </header>

      {/* DRAG-AND-HOOK HERO PLATFORM */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 overflow-hidden border-b border-gold-900/20">
        
        {/* Background: cinematic video loop with static photo fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={IMAGES.hero}
            className="w-full h-full object-cover filter brightness-[0.52] contrast-[1.08] saturate-[1.1]"
          >
            <source src="/boat_video.mp4" type="video/mp4" />
            <img
              src={IMAGES.hero}
              alt="Casa Jimenez — Puerto Jiménez Waterfront at Sunset"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1118] via-[#0c1118]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c1118]/40 via-transparent to-[#0c1118]/20" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center space-y-4">

          {/* Location pill */}
          <div className="inline-flex items-center gap-2 bg-black/30 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono text-[10px] tracking-[3px] text-white/70 uppercase">
              {t('heroLocation')}
            </span>
          </div>

          {/* Brand name — the dominant hero element */}
          <div className="-space-y-2 sm:-space-y-6 lg:-space-y-8">
            <h1 className="font-display text-[56px] sm:text-[120px] lg:text-[170px] xl:text-[210px] text-white leading-none tracking-wide block">
              CASA
            </h1>
            <h1 className="font-display text-[56px] sm:text-[120px] lg:text-[170px] xl:text-[210px] text-white leading-none tracking-wide block">
              JIMENEZ
            </h1>
          </div>

          {/* Tagline row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-2">
            <span className="font-mono text-[10px] tracking-[4px] text-white/35 uppercase">{t('heroSport')}</span>
            <span className="hidden sm:block h-px w-12 bg-white/20" />
            <h2 className="font-serif italic text-[22px] sm:text-[28px] lg:text-[34px] text-white/75 font-normal leading-none">
              {t('heroTagline')}
            </h2>
            <span className="hidden sm:block h-px w-12 bg-white/20" />
            <span className="font-mono text-[10px] tracking-[4px] text-white/35 uppercase">{t('heroEst')}</span>
          </div>

          <p className="font-sans text-sm sm:text-base text-white/55 max-w-lg mx-auto font-light leading-relaxed pt-2">
            {t('heroDesc')}
          </p>

          {/* Stats row — display numbers */}
          <div className="flex flex-wrap justify-center divide-x divide-white/10 pt-6 border-t border-white/10 max-w-2xl mx-auto">
            {[
              { val: '30 MIN', label: t('heroStat1Label') },
              { val: '150 LB+', label: t('heroStat2Label') },
              { val: '100%', label: t('heroStat3Label') },
              { val: t('heroStat4Val'), label: t('heroStat4Label') },
            ].map((s, i) => (
              <div key={i} className="flex-1 min-w-[110px] px-4 py-3 text-center">
                <span className="font-display text-[28px] sm:text-[34px] text-white leading-none block tracking-wide">{s.val}</span>
                <span className="text-[9px] font-mono text-white/35 uppercase tracking-wider mt-1 block">{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              onClick={() => handleScrollTo('tripbuilder')}
              className="px-8 py-3.5 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase rounded-xl transition duration-200 hover:bg-teal-400 w-full sm:w-auto"
            >
              {t('heroCta1')}
            </button>
            <button
              onClick={() => handleScrollTo('features')}
              className="px-8 py-3.5 bg-white/8 border border-white/20 text-white/75 hover:text-white hover:bg-white/12 backdrop-blur-sm transition duration-200 font-sans font-medium text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              {t('heroCta2')} <ArrowDown size={13} className="text-teal-400" />
            </button>
          </div>
        </div>

      </section>

      {/* WHY FISH THE OSA — light section, total contrast break */}
      <section id="features" className="bg-[#f5ede0] border-b border-[#e0cebc]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 lg:py-28">

          {/* Header — dark text on light bg */}
          <div className="mb-14">
            <span className="text-[10px] font-mono tracking-[3px] uppercase text-jungle-600 block mb-2">{t('whyLabel')}</span>
            <h3 className="font-display text-[56px] sm:text-[80px] lg:text-[96px] text-[#0f1a0f] leading-none tracking-wide">
              {t('whyTitle')}
            </h3>
          </div>

          {/* Three tall color panels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Panel 01 — Gulf of Dulce — Deep jungle green */}
            <div className="bg-[#0f2112] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[320px] flex flex-col justify-between">
              <span className="font-display text-[130px] leading-none text-[#1e4422]/50 absolute -bottom-6 -right-4 select-none pointer-events-none">01</span>
              <div className="relative z-10">
                <span className="text-[9px] font-mono tracking-widest text-jungle-400 uppercase block mb-5">{t('whyPanel1Label')}</span>
                <h4 className="font-serif text-2xl text-white font-medium mb-3">{t('feature0Title')}</h4>
                <p className="text-sm text-white/55 font-light leading-relaxed">{t('feature0Desc')}</p>
              </div>
            </div>

            {/* Panel 02 — Biodiversity — Teal */}
            <div className="bg-[#004d42] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[320px] flex flex-col justify-between">
              <span className="font-display text-[130px] leading-none text-white/8 absolute -bottom-6 -right-4 select-none pointer-events-none">02</span>
              <div className="relative z-10">
                <span className="text-[9px] font-mono tracking-widest text-teal-300 uppercase block mb-5">{t('whyPanel2Label')}</span>
                <h4 className="font-serif text-2xl text-white font-medium mb-3">{t('feature1Title')}</h4>
                <p className="text-sm text-white/55 font-light leading-relaxed">{t('feature1Desc')}</p>
              </div>
            </div>

            {/* Panel 03 — Pacific Access — Amber/copper */}
            <div className="bg-[#6b2e00] rounded-2xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 min-h-[320px] flex flex-col justify-between">
              <span className="font-display text-[130px] leading-none text-white/8 absolute -bottom-6 -right-4 select-none pointer-events-none">03</span>
              <div className="relative z-10">
                <span className="text-[9px] font-mono tracking-widest text-gold-300 uppercase block mb-5">{t('whyPanel3Label')}</span>
                <h4 className="font-serif text-2xl text-white font-medium mb-3">{t('feature2Title')}</h4>
                <p className="text-sm text-white/55 font-light leading-relaxed">{t('feature2Desc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* THE CATCH: INTERACTIVE SPECIES CATALOGUE */}
      <section 
        id="species" 
        className={`py-20 lg:py-28 relative overflow-hidden transition-all duration-700 bg-gradient-to-b ${theme.gradientClass} border-b border-gold-900/15`}
      >
        {/* Soft Cloud-like Glow Aura behind everything */}
        <div className={`absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] mix-blend-screen pointer-events-none transition-all duration-700 ${theme.glowClass} opacity-60 z-0`} />
        
        {/* Underlay low-opacity species images in the background */}
        <div className="absolute inset-0 opacity-[0.035] grayscale pointer-events-none z-0">
          <img 
            src={activeSpecies.image} 
            alt="Ocean background silhouette overlay" 
            className="w-full h-full object-cover scale-110 translate-y-10"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Topographical Bathymetric / Cloud-like background lines */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none z-0">
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path d="M0,80 Q250,50 500,110 T1000,60" fill="none" stroke="currentColor" strokeWidth="1" className={theme.accentColor} />
            <path d="M0,180 Q250,150 500,210 T1000,160" fill="none" stroke="currentColor" strokeWidth="1.5" className={theme.accentColor} />
            <path d="M0,280 Q250,220 500,310 T1000,260" fill="none" stroke="currentColor" strokeWidth="0.75" className={theme.accentColor} />
            <path d="M0,380 Q250,330 500,410 T1000,360" fill="none" stroke="currentColor" strokeWidth="2.5" className={theme.accentColor} />
            <path d="M0,480 Q250,450 500,510 T1000,460" fill="none" stroke="currentColor" strokeWidth="1" className={theme.accentColor} />
          </svg>
        </div>

        {/* Fish Icon SVG Silhouette Floating in absolute Background (light opacity fish) */}
        <div className="absolute right-[8%] top-[12%] opacity-[0.04] text-gold-200 pointer-events-none z-0 transform rotate-12 scale-150 transition-all duration-1000">
          {theme.silhouette === 'marlin' && (
            <svg width="450" height="180" viewBox="0 0 400 150" fill="currentColor">
              <path d="M380,45 C350,35 240,40 180,60 C120,80 80,65 40,75 C20,80 5,90 2,100 C5,102 12,98 25,92 C40,85 70,88 100,92 C150,98 250,92 330,70 L345,72 C355,75 370,60 380,45 Z" />
              <path d="M190,60 C230,20 310,15 365,35 C330,45 280,38 220,53 C198,58 190,60 190,60 Z" />
              <path d="M150,94 C130,125 100,135 80,140 C95,115 130,100 150,94 Z" />
            </svg>
          )}
          {theme.silhouette === 'dorado' && (
            <svg width="400" height="200" viewBox="0 0 350 180" fill="currentColor">
              <path d="M10,80 C20,40 70,25 150,30 C220,35 290,60 330,85 C310,95 280,105 200,115 C130,125 60,120 15,105 C5,100 8,90 10,80 Z" />
              <path d="M120,30 C160,5 240,4 290,25 C250,22 180,18 130,28 Z" />
              <path d="M160,119 C180,145 210,165 240,175 C210,155 180,135 160,119 Z" />
            </svg>
          )}
          {theme.silhouette === 'rooster' && (
            <svg width="380" height="220" viewBox="0 0 320 200" fill="currentColor">
              <path d="M15,90 C40,60 110,50 180,65 C250,80 290,100 305,115 C285,125 240,135 170,135 C100,135 40,120 20,105 C10,98 12,94 15,90 Z" />
              <path d="M110,61 C120,20 140,10 170,5 C150,25 135,45 125,62 Z" />
              <path d="M95,61 C100,25 115,15 135,10 C122,28 112,45 102,62 Z" />
              <path d="M80,62 C82,30 92,20 108,15 C98,32 90,48 83,63 Z" />
            </svg>
          )}
          {theme.silhouette === 'tuna' && (
            <svg width="380" height="180" viewBox="0 0 320 150" fill="currentColor">
              <path d="M15,75 C45,45 120,40 180,55 C240,70 290,85 305,95 C285,108 230,120 170,120 C110,120 40,105 20,90 C10,82 12,78 15,75 Z" />
              <path d="M160,51 C180,25 210,15 240,10 C210,25 185,42 165,52 Z" />
              <path d="M140,118 C160,140 190,148 215,150 C185,140 160,130 140,118 Z" />
            </svg>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left selector menu (4 Columns) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-[9px] font-mono tracking-widest uppercase text-teal-300">
                    {t('catchBadge')}
                  </span>
                </div>
                <h3 className="font-display text-[52px] text-white tracking-wide leading-none">
                  {t('catchTitle')}
                </h3>
                <p className="text-xs text-white/50 mt-3 font-light leading-relaxed">
                  {t('catchDesc')}
                </p>
              </div>
 
              {/* Fish Flip Cards — hover reveals anatomy, click selects species */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {SPECIES_DATA.map((fish) => {
                  const currentTheme = speciesThemes[fish.id] || theme;
                  const [outerImg, innerImg] = FISH_IMAGES[fish.id] || [fish.image, fish.image];
                  return (
                    <FishFlipCard
                      key={fish.id}
                      species={fish}
                      outerImage={outerImg}
                      innerImage={innerImg}
                      accentColor={currentTheme.accentColor}
                      badgeClass={currentTheme.badgeClass}
                      isActive={fish.id === selectedSpeciesId}
                      onSelect={() => {
                        setSelectedSpeciesId(fish.id);
                        setSelectedRigId(currentTheme.rigs[0].id);
                      }}
                    />
                  );
                })}
              </div>

              {/* Dynamic Ocean Vibe Quote */}
              <div className={`p-4 rounded-xl bg-white/90 border ${theme.borderClass} hidden lg:block transition-all duration-500 shadow-sm`}>
                <span className="text-[9px] font-mono tracking-widest text-teal-600 uppercase block mb-1">
                  {t('catchZoneLabel')}
                </span>
                <p className="text-xs font-serif italic text-black/70">
                  {theme.tagline}
                </p>
              </div>
            </div>
 
            {/* Right detailed dashboard content (8 Columns) */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecies.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col xl:flex-row gap-8 relative overflow-hidden shadow-2xl"
                >

                  {/* Left Specs side inside card */}
                  <div className="xl:w-1/2 space-y-4">
                    <div>
                      <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded border ${theme.badgeClass}`}>
                        Target Category: {activeSpecies.category}
                      </span>
                      <h4 className="font-display text-[48px] text-black leading-none mt-3 tracking-wide">
                        {activeSpecies.name.toUpperCase()}
                      </h4>
                      <p className="text-[11px] font-mono italic text-black/35 mt-0.5">
                        {activeSpecies.scientificName}
                      </p>
                    </div>

                    <p className="text-xs text-black/60 leading-relaxed font-light">
                      {activeSpecies.description}
                    </p>

                    {/* Living Specifications Blocks */}
                    <div className="space-y-2 font-sans text-xs">
                      <div className="bg-black/4 p-3 rounded-xl border border-black/8">
                        <strong className="font-mono text-[9.5px] text-teal-600 uppercase tracking-wider block mb-1 font-semibold">
                          🍴 Optimal Baited Rig
                        </strong>
                        <p className="text-[11px] text-black/70 leading-relaxed font-light">{activeSpecies.bestBait}</p>
                      </div>
                      <div className="bg-black/4 p-3 rounded-xl border border-black/8">
                        <strong className="font-mono text-[9.5px] text-teal-600 uppercase tracking-wider block mb-1 font-semibold">
                          🎣 Battle Strategy
                        </strong>
                        <p className="text-[11px] text-black/70 leading-relaxed font-light">{activeSpecies.fightingStyle}</p>
                      </div>
                      <div className="bg-black/4 p-3 rounded-xl border border-black/8">
                        <strong className="font-mono text-[9.5px] text-teal-600 uppercase tracking-wider block mb-1 font-semibold">
                          📅 Costa Rica Peak Window
                        </strong>
                        <p className="text-[11px] text-black/70 leading-relaxed font-light">{activeSpecies.seasonText}</p>
                      </div>
                    </div>

                    {/* Conservation Callout */}
                    <div className="text-[10px] font-mono text-black/45 flex items-center gap-1.5 pt-2 border-t border-black/8">
                      <ShieldCheck size={13} className="text-emerald-500 shrink-0" />
                      <span>{activeSpecies.conservationStatus}</span>
                    </div>
                  </div>

                  {/* Right Image & Interactive Rig Customizer */}
                  <div className="xl:w-1/2 flex flex-col justify-between space-y-4">

                    {/* Main species image */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-black/8 group">
                      <img
                        src={activeSpecies.image}
                        alt={activeSpecies.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded border border-white/15">
                        <span className="text-[9px] font-mono text-white/70 uppercase tracking-widest">
                          Year-Round Present
                        </span>
                      </div>
                    </div>

                    {/* TACTICAL RIG SIMULATOR */}
                    <div className="bg-black/5 p-4 border border-black/8 rounded-2xl">
                      <div className="flex items-center justify-between mb-3 border-b border-black/8 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Wrench size={13} className="text-teal-600" />
                          <h5 className="text-[10px] font-mono text-black/55 uppercase tracking-widest font-semibold">
                            Tactical Rig Simulator
                          </h5>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-600 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Active Pre-wire
                        </span>
                      </div>

                      {/* Rig Selector Tabs */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {theme.rigs.map((rigOption) => {
                          const isRigActive = selectedRigId ? selectedRigId === rigOption.id : theme.rigs[0].id === rigOption.id;
                          return (
                            <button
                              key={rigOption.id}
                              onClick={() => setSelectedRigId(rigOption.id)}
                              className={`py-2 px-2 text-center text-[10px] sm:text-[11px] rounded-xl border font-mono transition-all duration-200 ${
                                isRigActive
                                  ? 'bg-teal-500/15 border-teal-500/50 text-teal-700 font-semibold'
                                  : 'bg-white border-black/10 text-black/45 hover:border-black/25 hover:text-black/70'
                              }`}
                            >
                              {rigOption.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Rig stats */}
                      <div className="space-y-2 bg-white p-3 rounded-xl border border-black/8">
                        <div>
                          <span className="text-[9px] font-mono text-black/30 uppercase block">Rig specification</span>
                          <p className="text-[11px] text-black/65 font-light leading-relaxed">
                            {(theme.rigs.find(r => r.id === selectedRigId) || theme.rigs[0]).desc}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-black/8">
                          {Object.entries((theme.rigs.find(r => r.id === selectedRigId) || theme.rigs[0]).stats).map(([k, val]) => (
                            <div key={k} className="flex flex-col">
                              <span className="text-[8px] font-mono text-black/30 uppercase tracking-tight">{k}</span>
                              <span className="font-display text-xl text-teal-600 leading-none mt-1">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
 
          </div>
 
        </div>
      </section>

      {/* PACIFIC MIGRATION CORRIDORS */}
      <MigrationMap />

      {/* SOLUNAR FORECASTING SERVICE */}
      <section id="solunar" className="py-20 lg:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, #020d0a 0%, #041510 40%, #070e08 100%)' }}>
        {/* Textural overlay — subtle noise/grain */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '256px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <SolunarDashboard />
        </div>
      </section>

      {/* THE CULINARY & BUTCHERY GUIDE */}
      <section id="culinary" className={`py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto border-b ${themeStyle.sectionBorder}`}>
        <CulinaryGuide />
      </section>

      {/* TRIP BUILDER RESERVES */}
      <section id="tripbuilder" className="py-20 lg:py-28 px-4 lg:px-8 max-w-7xl mx-auto">
        <FishingReport />

        <TripBuilder />

        <BookingCalendar />

      </section>

      {/* CATCHES OF THE MONTH SHOWCASE */}
      <section id="gallery" className="py-20 lg:py-28 bg-ocean-900/20 border-t border-gold-900/15">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <CatchGallery />
        </div>
      </section>

      {/* BOAT GALLERY — real photos from the Kaylee */}
      <PhotoGallery />

      <Testimonials />

      {/* FAQ SECTION — full-bleed image background */}
      <section className="relative overflow-hidden border-t border-gold-900/15">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.groupCatch}
            alt="Casa Jimenez fishing"
            className="w-full h-full object-cover brightness-[0.22] saturate-[0.8]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f0a]/70 via-[#080f0a]/60 to-[#080f0a]" />
        </div>

        <div className="relative z-10 py-24 lg:py-32 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <div className="text-center mb-14">
              <h3 className="font-display text-[56px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
                {t('faqTitle')}
              </h3>
              <p className="text-sm font-light text-white/40 mt-3 font-mono tracking-widest uppercase">{t('faqSubtitle')}</p>
            </div>

            <div className="space-y-3">
              <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group cursor-pointer hover:bg-white/8 transition-colors">
                <summary className="font-sans text-base text-white font-medium flex justify-between items-center list-none">
                  <span>{t('faq1Q')}</span>
                  <ChevronDown className="text-gold-400 shrink-0 ml-4 group-open:rotate-180 transition duration-300" size={16} />
                </summary>
                <p className="text-sm text-white/55 leading-relaxed font-light mt-4 pt-4 border-t border-white/8">
                  {t('faq1A')}
                </p>
              </details>

              <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group cursor-pointer hover:bg-white/8 transition-colors">
                <summary className="font-sans text-base text-white font-medium flex justify-between items-center list-none">
                  <span>{t('faq2Q')}</span>
                  <ChevronDown className="text-gold-400 shrink-0 ml-4 group-open:rotate-180 transition duration-300" size={16} />
                </summary>
                <p className="text-sm text-white/55 leading-relaxed font-light mt-4 pt-4 border-t border-white/8">
                  {t('faq2A')}
                </p>
              </details>

              <details className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 group cursor-pointer hover:bg-white/8 transition-colors">
                <summary className="font-sans text-base text-white font-medium flex justify-between items-center list-none">
                  <span>{t('faq3Q')}</span>
                  <ChevronDown className="text-gold-400 shrink-0 ml-4 group-open:rotate-180 transition duration-300" size={16} />
                </summary>
                <p className="text-sm text-white/55 leading-relaxed font-light mt-4 pt-4 border-t border-white/8">
                  {t('faq3A')}
                </p>
              </details>
            </div>

          </div>
        </div>
      </section>

      {/* WHATSAPP FLOATING BUTTON — update phone number before going live */}
      <a
        href="https://wa.me/50688888888?text=Hello%20Captain%20Jorge%2C%20I%27d%20like%20to%20inquire%20about%20a%20fishing%20charter"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="fixed bottom-[112px] right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #128c3e 0%, #075e2f 100%)', border: '1px solid rgba(37,211,102,0.35)' }}
      >
        {/* WhatsApp icon (inline SVG) */}
        <svg viewBox="0 0 24 24" fill="white" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* CAPTAIN CHATBOT */}
      <CaptainChat />

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/6 pt-14 pb-40 sm:pb-14 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-start">

          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white flex items-center justify-center text-black font-display text-sm font-bold">
                CJ
              </div>
              <div>
                <h4 className="font-sans text-sm tracking-widest uppercase text-white font-semibold">
                  CASA JIMENEZ SPORT FISHING
                </h4>
                <p className="text-[9px] font-mono tracking-wider text-white/30">
                  Puerto Jiménez · Osa Peninsula, Costa Rica
                </p>
              </div>
            </div>
            <p className="text-xs text-white/40 leading-relaxed max-w-sm font-light">
              {t('footerDesc')}
            </p>
          </div>

          <div className="md:col-span-4 space-y-4 font-mono text-xs text-white/50">
            <h5 className="font-sans text-sm font-semibold text-white uppercase tracking-widest">
              {t('footerContact')}
            </h5>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <Mail size={12} className="text-teal-400" />
                <a href="mailto:cabinasjimenez@gmail.com" className="hover:text-teal-400 transition-colors">
                  cabinasjimenez@gmail.com
                </a>
              </p>
              <p className="text-[10px] text-white/25">
                Puerto Jiménez, Osa Peninsula · Gulf of Dulce, Costa Rica
              </p>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h5 className="font-sans text-sm font-semibold text-white uppercase tracking-widest">
              {t('footerConservation')}
            </h5>
            <p className="text-xs text-white/35 leading-relaxed font-light">
              We operate strictly under the guidelines of the Billfish Foundation and regional Costa Rican conservation mandates. Our crews are trained in safe deep-water billfish release, ensuring the future vitality of the Blue Pacific.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20">
          <span>&copy; {new Date().getFullYear()} Casa Jimenez Sport Fishing. Puerto Jiménez, Costa Rica. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-white/50 cursor-pointer transition-colors">{t('footerTerms')}</span>
            <span>•</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">{t('footerSafety')}</span>
            <span>•</span>
            <span className="hover:text-white/50 cursor-pointer transition-colors">INCOPESCA Certified</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

