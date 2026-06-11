import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Waves, 
  Activity, 
  HelpCircle, 
  Compass, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { SolunarReport, TideEvent } from '../types';

export default function SolunarDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2026-06-11'));
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Cycle date helper
  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const formattedDateString = useMemo(() => {
    return selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDate]);

  // Pure deterministic calculations for moon state & tides based on selected date
  const calculations = useMemo(() => {
    // Reference date: New Moon on Jan 1 st, 2026
    const refNewMoon = new Date('2026-01-17T12:00:00Z');
    const diffMs = selectedDate.getTime() - refNewMoon.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const lunarCycle = 29.53059;
    const phaseValue = ((diffDays % lunarCycle) + lunarCycle) % lunarCycle;
    const normalizedPhase = phaseValue / lunarCycle; // 0 to 1

    let phaseName = 'New Moon';
    let phaseIllustration = '🌑';
    let illumination = 0;

    if (normalizedPhase < 0.03 || normalizedPhase > 0.97) {
      phaseName = 'New Moon';
      phaseIllustration = '🌑';
      illumination = 0;
    } else if (normalizedPhase < 0.22) {
      phaseName = 'Waxing Crescent';
      phaseIllustration = '🌒';
      illumination = Math.round(normalizedPhase * 100);
    } else if (normalizedPhase < 0.28) {
      phaseName = 'First Quarter';
      phaseIllustration = '🌓';
      illumination = 50;
    } else if (normalizedPhase < 0.47) {
      phaseName = 'Waxing Gibbous';
      phaseIllustration = '🌔';
      illumination = Math.round(normalizedPhase * 100);
    } else if (normalizedPhase < 0.53) {
      phaseName = 'Full Moon';
      phaseIllustration = '🌕';
      illumination = 100;
    } else if (normalizedPhase < 0.72) {
      phaseName = 'Waning Gibbous';
      phaseIllustration = '🌖';
      illumination = Math.round((1 - normalizedPhase) * 100);
    } else if (normalizedPhase < 0.78) {
      phaseName = 'Third Quarter';
      phaseIllustration = '🌗';
      illumination = 50;
    } else {
      phaseName = 'Waning Crescent';
      phaseIllustration = '🌘';
      illumination = Math.round((1 - normalizedPhase) * 100);
    }

    // Solunar rating based on proximity to Full Moon or New Moon (best bite conditions)
    const isSpecialMoon = illumination > 85 || illumination < 15;
    const isMediumMoon = (illumination >= 15 && illumination <= 40) || (illumination >= 60 && illumination <= 85);
    const dayOfWeek = selectedDate.getDay();

    let rating: 'Excellent' | 'Good' | 'Average' | 'Slow' = 'Good';
    if (isSpecialMoon) {
      rating = dayOfWeek % 2 === 0 ? 'Excellent' : 'Good';
    } else if (isMediumMoon) {
      rating = 'Good';
    } else {
      rating = dayOfWeek % 3 === 0 ? 'Average' : 'Slow';
    }

    // High and Low Tide calculation
    // High tides occur roughly every 12h 25m, locked deterministically to the day
    const baseHour = (selectedDate.getDate() * 41) % 60; // pseudo-random shift
    const baseMin = (selectedDate.getDate() * 11) % 60;
    
    // Low tides are roughly 6h 12m after high tides
    const formatTime = (hour: number, minute: number) => {
      const h = Math.floor(hour) % 24;
      const m = Math.floor(minute) % 60;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 || 12;
      const displayM = m < 10 ? '0' + m : m;
      return `${displayH}:${displayM} ${ampm}`;
    };

    const tide1Hour = (5 + (baseHour / 12)) % 24;
    const tide1Min = baseMin;
    const tide2Hour = (tide1Hour + 6.2) % 24;
    const tide2Min = (tide1Min + 12) % 60;
    const tide3Hour = (tide2Hour + 6.2) % 24;
    const tide3Min = (tide2Min + 12) % 60;
    const tide4Hour = (tide3Hour + 6.2) % 24;
    const tide4Min = (tide3Min + 12) % 60;

    // Arrange chronological order
    const tides: TideEvent[] = [
      { time: formatTime(tide1Hour, tide1Min), height: isSpecialMoon ? '2.8m' : '2.1m', type: 'High' as const, timestamp: new Date(selectedDate.setHours(tide1Hour, tide1Min)) },
      { time: formatTime(tide2Hour, tide2Min), height: isSpecialMoon ? '0.2m' : '0.6m', type: 'Low' as const, timestamp: new Date(selectedDate.setHours(tide2Hour, tide2Min)) },
      { time: formatTime(tide3Hour, tide3Min), height: isSpecialMoon ? '2.9m' : '2.2m', type: 'High' as const, timestamp: new Date(selectedDate.setHours(tide3Hour, tide3Min)) },
      { time: formatTime(tide4Hour, tide4Min), height: isSpecialMoon ? '0.1m' : '0.5m', type: 'Low' as const, timestamp: new Date(selectedDate.setHours(tide4Hour, tide4Min)) },
    ].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    // Major / Minor feeding windows based on solar peak and tides
    const feedingWindowStart = (tide1Hour + 1) % 24;
    const feedingWindowEnd = (tide1Hour + 3.5) % 24;
    const majorFeedingTime1 = `${formatTime(feedingWindowStart, 0)} - ${formatTime(feedingWindowEnd, 30)}`;

    const secondaryWindowStart = (tide3Hour + 1) % 24;
    const secondaryWindowEnd = (tide3Hour + 3) % 24;
    const majorFeedingTime2 = `${formatTime(secondaryWindowStart, 0)} - ${formatTime(secondaryWindowEnd, 15)}`;

    const minorFeeding1 = `${formatTime((tide2Hour - 1.5 + 24) % 24, 0)} - ${formatTime((tide2Hour + 24) % 24, 15)}`;
    const minorFeeding2 = `${formatTime((tide4Hour - 1.5 + 24) % 24, 0)} - ${formatTime((tide4Hour + 24) % 24, 15)}`;

    const multiplierMap: Record<string, number> = {
      'billfish': isSpecialMoon ? 98 : rating === 'Good' ? 82 : rating === 'Average' ? 65 : 45,
      'dorado': rating === 'Excellent' ? 92 : rating === 'Good' ? 85 : rating === 'Average' ? 70 : 60,
      'roosterfish': rating === 'Excellent' ? 95 : rating === 'Good' ? 88 : rating === 'Average' ? 78 : 65,
      'tuna': rating === 'Excellent' ? 90 : rating === 'Good' ? 80 : rating === 'Average' ? 72 : 55,
    };

    return {
      moonPhase: phaseName,
      moonIllustration: phaseIllustration,
      moonIllumination: illumination,
      solunarRating: rating,
      majorFeedingTimes: [majorFeedingTime1, majorFeedingTime2],
      minorFeedingTimes: [minorFeeding1, minorFeeding2],
      bestBiteWindow: `Early Rising Tide: ${formatTime((tide1Hour - 2), 0)} to ${formatTime(tide1Hour, 0)}`,
      tides,
      multiplierMap,
    };
  }, [selectedDate]);

  return (
    <div className="relative overflow-hidden">
      {/* Ambient teal glows for depth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-800/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-teal-400">Live · Puerto Jiménez · Osa Peninsula</span>
          </div>
          <h3 className="font-display text-[56px] lg:text-[72px] text-white tracking-wide leading-none">SOLUNAR &amp; TIDES</h3>
          <p className="text-sm text-white/40 font-mono mt-2">Pacific coastal forecast · Gulf of Dulce tidal data</p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 self-start">
          <button onClick={handlePrevDay} className="p-2 hover:bg-white/8 rounded-lg text-white/50 hover:text-white transition-all duration-200">
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-2 px-4 font-mono text-xs text-white/70 font-medium">
            <Calendar size={12} className="text-teal-400" />
            <span>{formattedDateString}</span>
          </div>
          <button onClick={handleNextDay} className="p-2 hover:bg-white/8 rounded-lg text-white/50 hover:text-white transition-all duration-200">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 3 white info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10">

        {/* Card 1: Moon Phase */}
        <motion.div layout className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-black/35">Lunar Influence</span>
            <Moon className="text-black/25" size={16} />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{calculations.moonIllustration}</div>
            <div>
              <div className="font-serif text-xl text-black font-semibold leading-tight">{calculations.moonPhase}</div>
              <div className="text-xs text-black/45 font-mono mt-1">{calculations.moonIllumination}% Illuminated</div>
            </div>
          </div>
          <div className="pt-4 border-t border-black/8 text-[11px] text-black/55 leading-relaxed">
            <span className="text-teal-600 font-semibold">Captain's Tip —</span> Full &amp; New Moon phases drive the strongest current swings and most aggressive billfish bite windows off the Osa shelf.
          </div>
        </motion.div>

        {/* Card 2: Solunar Feed Rating */}
        <motion.div layout className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-black/35">Solunar Activity</span>
            <Activity className="text-black/25" size={16} />
          </div>
          <div className={`font-display text-[52px] leading-none mb-1 ${
            calculations.solunarRating === 'Excellent' ? 'text-emerald-500' :
            calculations.solunarRating === 'Good' ? 'text-teal-500' :
            calculations.solunarRating === 'Average' ? 'text-amber-500' : 'text-rose-500'
          }`}>
            {calculations.solunarRating.toUpperCase()}
          </div>
          <div className="text-[11px] text-black/50 font-mono mb-4">
            Optimal: <span className="text-black/80 font-medium">{calculations.bestBiteWindow}</span>
          </div>
          <div className="pt-4 border-t border-black/8 flex flex-col gap-1.5 text-[11px] text-black/55">
            <div><span className="text-teal-600 font-semibold">Major Feeds: </span><span className="font-mono">{calculations.majorFeedingTimes.join(' · ')}</span></div>
            <div><span className="text-black/40 font-semibold">Minor Feeds: </span><span className="font-mono">{calculations.minorFeedingTimes.join(' · ')}</span></div>
          </div>
        </motion.div>

        {/* Card 3: Species Bite Probabilities */}
        <motion.div layout className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-black/35">Bite Probabilities</span>
            <Info className="text-black/25" size={16} />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Billfish', pct: calculations.multiplierMap.billfish },
              { label: 'Roosterfish', pct: calculations.multiplierMap.roosterfish },
              { label: 'Dorado / Tuna', pct: calculations.multiplierMap.dorado },
            ].map(({ label, pct }) => (
              <div key={label}>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-black/60">{label}</span>
                  <span className="text-black font-semibold">{pct}%</span>
                </div>
                <div className="w-full bg-black/6 rounded-full h-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-700 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tide cards — dramatic display font */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Waves size={14} className="text-teal-400" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Pacific Tidal Swings · Gulf of Dulce</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {calculations.tides.map((tide, idx) => {
            const [timePart, ampm] = tide.time.split(' ');
            return (
              <div
                key={idx}
                className={`rounded-2xl p-5 flex flex-col justify-between min-h-[140px] relative overflow-hidden border ${
                  tide.type === 'High'
                    ? 'bg-white border-white/0 shadow-lg'
                    : 'bg-white/6 border-white/10'
                }`}
              >
                {/* Label */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${tide.type === 'High' ? 'text-teal-600' : 'text-white/40'}`}>
                    {tide.type} Tide
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    tide.type === 'High' ? 'bg-teal-500/15 text-teal-600' : 'bg-white/8 text-white/50'
                  }`}>
                    {tide.height}
                  </span>
                </div>

                {/* Time — Bebas Neue */}
                <div>
                  <div className={`font-display leading-none ${tide.type === 'High' ? 'text-black' : 'text-white'}`} style={{ fontSize: '52px' }}>
                    {timePart}
                  </div>
                  <div className={`font-serif text-sm font-medium mt-0.5 ${tide.type === 'High' ? 'text-black/45' : 'text-white/35'}`}>
                    {ampm}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tidal guidance — white cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h5 className="font-serif text-black text-sm font-semibold mb-2 flex items-center gap-2">
              <Waves size={14} className="text-teal-500" /> Inshore Feeding Guidelines
            </h5>
            <p className="text-[12px] text-black/55 leading-relaxed">
              Roosterfish and snapper feed aggressively during <span className="text-teal-600 font-semibold">rising tides</span>. Coastal structures, volcanic ledges, and river mouth shelves compress schooling sardines — triggering a hard bite window.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h5 className="font-serif text-black text-sm font-semibold mb-2 flex items-center gap-2">
              <Compass size={14} className="text-teal-500" /> Offshore Feeding Guidelines
            </h5>
            <p className="text-[12px] text-black/55 leading-relaxed">
              Pelagic species rely on <span className="text-teal-600 font-semibold">strong current swings</span>. At peak High Tide, nutrient convergence at bathymetric contours makes trolling the shelf drop-off extremely productive for raised bills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
