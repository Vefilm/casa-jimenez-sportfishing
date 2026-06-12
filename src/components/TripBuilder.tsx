import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  Anchor, 
  Waves, 
  Compass, 
  Award, 
  ArrowRight, 
  Clock, 
  Users, 
  ShieldCheck, 
  Gauge,
  Calendar,
  Sparkles
} from 'lucide-react';
import { SPECIES_DATA, CHARTER_TRIPS } from '../data';
import { CharterTrip, Species } from '../types';

export default function TripBuilder() {
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>(['sailfish-marlin']);
  const [fishingType, setFishingType] = useState<'offshore' | 'inshore' | 'both'>('offshore');
  const [experienceLevel, setExperienceLevel] = useState<'novice' | 'intermediate' | 'pro'>('intermediate');
  const [guestCount, setGuestCount] = useState<number>(4);

  const toggleSpecies = (id: string) => {
    if (selectedSpecies.includes(id)) {
      if (selectedSpecies.length > 1) {
        setSelectedSpecies(selectedSpecies.filter(s => s !== id));
      }
    } else {
      setSelectedSpecies([...selectedSpecies, id]);
    }
  };

  // Logic to determine recommended charter based on specific user requirements
  const recommendedCharter: CharterTrip = (() => {
    const hasOffshoreSelected = selectedSpecies.some(s => ['sailfish-marlin', 'yellowfin-tuna', 'dorado-mahi', 'amberjack'].includes(s));
    const hasInshoreSelected = selectedSpecies.includes('roosterfish');

    // 1. Explicit Fishing Type Selector rules:
    if (fishingType === 'inshore') {
      if (experienceLevel === 'pro') {
        return CHARTER_TRIPS.find(t => t.id === 'tuna-mission') || CHARTER_TRIPS[2];
      }
      return CHARTER_TRIPS.find(t => t.id === 'inshore-half') || CHARTER_TRIPS[0];
    }

    if (fishingType === 'offshore') {
      if (experienceLevel === 'pro' && selectedSpecies.includes('sailfish-marlin')) {
        return CHARTER_TRIPS.find(t => t.id === 'signature-combo') || CHARTER_TRIPS[3];
      }
      return CHARTER_TRIPS.find(t => t.id === 'offshore-full') || CHARTER_TRIPS[1];
    }

    // 2. Both / Combo selections
    if (hasOffshoreSelected && hasInshoreSelected) {
      return CHARTER_TRIPS.find(t => t.id === 'signature-combo') || CHARTER_TRIPS[3];
    }

    // 3. Fallback based on species characteristics
    if (hasInshoreSelected && !hasOffshoreSelected) {
      if (experienceLevel === 'pro') {
        return CHARTER_TRIPS.find(t => t.id === 'tuna-mission') || CHARTER_TRIPS[2];
      }
      return CHARTER_TRIPS.find(t => t.id === 'inshore-half') || CHARTER_TRIPS[0];
    }

    // Default: Offshore premium
    if (experienceLevel === 'pro') {
      return CHARTER_TRIPS.find(t => t.id === 'signature-combo') || CHARTER_TRIPS[3];
    }
    return CHARTER_TRIPS.find(t => t.id === 'offshore-full') || CHARTER_TRIPS[1];
  })();

  // Retrieve details of selected fish for deep-dive itinerary matching
  const matchingSpeciesData: Species[] = SPECIES_DATA.filter(s => selectedSpecies.includes(s.id));

  // Build the tailored reason of why it is recommended
  const recommendationExplanation = (() => {
    const speciesNames = matchingSpeciesData.map(s => s.name.split(' (')[0]).join(' & ');
    const typeLabel = fishingType === 'both' ? 'both nearshore and blue water offshore' : `${fishingType} territory`;
    
    let base = `Since you selected the **${experienceLevel}** experience tier and are targeting **${speciesNames}** in ${typeLabel}, `;
    
    if (recommendedCharter.id === 'signature-combo') {
      return base + `the **Full Combo Day (10h)** is recommended because it is the only package with the duration and flexibility to target both offshore pelagics and inshore reef species on the same trip — possible only from Puerto Jiménez with direct access to both fisheries.`;
    }
    if (recommendedCharter.id === 'tuna-mission') {
      return base + `the **Tuna Mission (8h)** is dialed in for you. We run offshore to find the Spinner Dolphin schools, set the trolling spread, and stay on the fish until the bite shuts down. These Yellowfin run hard and fight harder.`;
    }
    if (recommendedCharter.id === 'inshore-half') {
      return base + `the **Gulf of Dulce Explorer (4h)** is the perfect starting point. The Gulf's protected water keeps things smooth while Captain Jorge puts you on roosterfish, snapper, and snook along the Osa shoreline.`;
    }
    // offshore-full
    return base + `the **Pacific Offshore Run (8h)** is the right call. Captain Jorge runs out through the Gulf mouth into the open Pacific to hit the offshore current breaks, troll for billfish, and chase tuna schools wherever the dolphins are working.`;
  })();

  // Optimal Trip Duration Highlight
  const optimalDurationText = (() => {
    if (recommendedCharter.duration.includes('10h')) {
      return '10-Hour Extended Run (highly recommended to split offshore morning tides and afternoon reef flows).';
    }
    if (recommendedCharter.duration.includes('4h')) {
      return '4-Hour Half Day (ideal for nearshore light jigging, keeping close to the harbor peaks).';
    }
    return '8-Hour Full Day (the perfect timeframe to troll ocean currents, allow transition to drop-offs, and fight heavy sportfish).';
  })();

  return (
    <div className="bg-black/50 border border-white/10 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Dynamic graphic accent */}
      <div className="absolute -top-10 -right-10 w-96 h-96 bg-teal-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mb-8">
        <span className="text-xs font-mono tracking-widest uppercase text-teal-300 block mb-1">Tailored Marine Itineraries</span>
        <h3 className="font-serif text-3xl lg:text-4xl text-white/75 font-medium tracking-tight">Interactive Charter Trip Builder</h3>
        <p className="text-sm text-white/75/70 mt-1 max-w-3xl font-sans">
          Navigate through our customized charter variables. Select your target trophies, desired fishing zone, and skill bracket. Our algorithm instantly aligns raw seasonal patterns and luxury configurations to build your bespoke voyage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Interactive Selection Panel (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STEP 1: SELECT SPECIES */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-teal-300 block mb-3 font-semibold">
              Step 1: Select Your Target Species (Select multiple)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SPECIES_DATA.map((fish) => {
                const isSelected = selectedSpecies.includes(fish.id);
                return (
                  <button
                    key={fish.id}
                    onClick={() => toggleSpecies(fish.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-300 hover:scale-[1.01] ${
                      isSelected 
                        ? 'bg-teal-500/12 border-teal-400/50 shadow-[0_0_15px_rgba(0,212,188,0.1)]' 
                        : 'bg-white/5 border-white/8 hover:border-white/20'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 mt-0.5 border border-white/8">
                      <img 
                        src={fish.image} 
                        alt={fish.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-white/75 truncate">{fish.name}</span>
                        {isSelected && (
                          <span className="h-4 w-4 rounded-full bg-teal-400 flex items-center justify-center text-black text-[10px] font-bold shrink-0 ml-1">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-teal-300/80 block leading-tight mt-1 capitalize bg-black/50/80 px-2 py-0.5 rounded border border-white/5 max-w-fit">
                        {fish.category === 'offshore' ? 'Offshore Pelagic' : 'Inshore Reef'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* STEP 2: FISHING TYPE SELECTOR */}
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-teal-300 block mb-3 font-semibold">
                Step 2: Preferred Fishing Type
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'offshore', label: 'Offshore Trolling', desc: 'Deep canyons & billfish' },
                  { id: 'inshore', label: 'Inshore Casting', desc: 'Reefs, structures & Roosters' },
                  { id: 'both', label: 'Full Combo Package', desc: 'Best of both oceanic zones' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFishingType(type.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                      fishingType === type.id
                        ? 'bg-teal-500/15 border-teal-400/50 shadow-[0_0_10px_rgba(0,212,188,0.08)]'
                        : 'bg-white/5 border-white/5 hover:border-white/18'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-white/75">{type.label}</span>
                      <Compass size={12} className={fishingType === type.id ? 'text-teal-300' : 'text-teal-300/30'} />
                    </div>
                    <p className="text-[10px] text-white/75/60 mt-0.5">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: EXPERIENCE LEVEL SELECTOR */}
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-teal-300 block mb-3 font-semibold">
                Step 3: Desired Experience Level
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'novice', label: 'Scenic / Novice', desc: 'Family-safe light-tackle fun' },
                  { id: 'intermediate', label: 'Active / Intermediate', desc: 'Stand-up trolling & hookups' },
                  { id: 'pro', label: 'Elite / Saltwater Pro', desc: 'Extreme battle & record hunts' }
                ].map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setExperienceLevel(level.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                      experienceLevel === level.id
                        ? 'bg-teal-500/15 border-teal-400/50 shadow-[0_0_10px_rgba(0,212,188,0.08)]'
                        : 'bg-white/5 border-white/5 hover:border-white/18'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-white/75">{level.label}</span>
                      <Award size={12} className={experienceLevel === level.id ? 'text-teal-300' : 'text-teal-300/30'} />
                    </div>
                    <p className="text-[10px] text-white/75/60 mt-0.5">{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* STEP 4: PARTY SIZE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-widest text-teal-300 font-semibold">
                Step 4: Angler Guest Count
              </label>
              <span className="font-mono text-xs text-teal-300 bg-ocean-900/90 border border-white/8 px-2.5 py-0.5 rounded leading-none">
                {guestCount} Guests
              </span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/8 rounded-xl p-3.5">
              <input
                type="range"
                min="1"
                max="6"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer h-1 rounded-lg bg-black/50 appearance-auto"
              />
              <div className="flex justify-between w-24 text-[10px] font-mono text-teal-300/70">
                <span>Max Capacity: 6</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Dynamic Recommendation Blueprint (5 Columns) */}
        <div className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={recommendedCharter.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-ocean-900 border border-white/12 rounded-2xl p-5 lg:p-6 flex flex-col justify-between h-full relative shadow-xl"
            >
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-teal-300 bg-teal-500/10 border border-white/12 px-2.5 py-0.5 rounded">
                      Match Rating: 99% Perfect
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400">
                      Available
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-white font-medium mt-3">
                    {recommendedCharter.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-mono text-teal-300 font-bold">{recommendedCharter.price}</span>
                    <span className="text-[10px] font-mono text-teal-300/50 uppercase tracking-wider">base day-charter rate</span>
                  </div>
                </div>

                {/* Why recommended explanation */}
                <div className="bg-white/5 border border-white/8 rounded-xl p-3.5 mb-5 space-y-1">
                  <span className="text-[9px] font-mono text-teal-300 uppercase tracking-widest block font-semibold flex items-center gap-1">
                    <Sparkles size={10} className="text-teal-300" /> Recommendation Thesis
                  </span>
                  <p className="text-[11px] text-white/75/85 leading-relaxed">
                    {/* Render helper text with mock-bold translation for rendering */}
                    {recommendationExplanation.replace(/\*\*/g, '')}
                  </p>
                </div>

                {/* Best seasons for chosen fish */}
                <div className="mb-5 space-y-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-teal-300 block font-semibold flex items-center gap-1">
                    <Calendar size={10} className="text-teal-300" /> Species Season Peaks
                  </span>
                  <div className="space-y-1.5">
                    {matchingSpeciesData.map((fish) => (
                      <div key={fish.id} className="text-[11px] bg-black/50 px-2.5 py-1.5 rounded border border-white/5 flex justify-between items-center">
                        <span className="font-serif text-white font-normal">{fish.name}</span>
                        <span className="text-[9px] font-mono text-teal-300 text-right">{fish.seasonText.split('.')[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optimal duration highlight */}
                <div className="mb-5 space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-teal-300 block font-semibold flex items-center gap-1">
                    <Clock size={10} className="text-teal-300" /> Suggestion Duration Matrix
                  </span>
                  <p className="text-[11px] text-white/75/90 leading-relaxed font-sans bg-black/50 p-2.5 rounded border border-white/5">
                    {optimalDurationText}
                  </p>
                </div>

                {/* Included Luxury Amenities */}
                <div className="mb-5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-teal-300 block mb-1.5 font-semibold">
                    Included Luxury Amenities
                  </span>
                  <ul className="space-y-1">
                    {recommendedCharter.included.slice(0, 3).map((inc, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] text-white">
                        <Check size={10} className="text-teal-300 mt-1 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Book Callout CTA */}
              <div className="space-y-3 pt-4 border-t border-white/8">
                <a 
                  href={`mailto:Vefilm@gmail.com?subject=Sportfishing%20Charter%20Reservation%20Proposal&body=Hi%20Captain,%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(recommendedCharter.name)}%20for%20a%20party%20of%20${guestCount}%20guests.%20Our%20experience%20level%20is%20${experienceLevel}.`}
                  className="w-full bg-teal-500 hover:bg-teal-400 text-white font-display text-base tracking-widest text-center py-3.5 rounded-xl block transition-all duration-300 hover:scale-[1.01] shadow-[0_4px_20px_rgba(0,180,160,0.25)] uppercase"
                >
                  Secure Charter Reservation
                </a>
                <span className="text-[9px] font-mono text-teal-300/50 block text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={11} /> All permits, premium open bar, and top-tier Shimano gear fully covered.
                </span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
