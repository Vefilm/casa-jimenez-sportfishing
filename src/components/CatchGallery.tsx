import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  MapPin, 
  Quote, 
  Calendar, 
  User, 
  Filter,
  CheckCircle2,
  X
} from 'lucide-react';
import { CATCH_REPORTS } from '../data';
import { CatchReport } from '../types';

export default function CatchGallery() {
  const [filter, setFilter] = useState<'all' | 'offshore' | 'inshore'>('all');
  const [activeModalReport, setActiveModalReport] = useState<CatchReport | null>(null);

  // Filter logic
  const filteredReports = CATCH_REPORTS.filter((report) => {
    if (filter === 'all') return true;
    if (filter === 'offshore') return ['sailfish-marlin', 'yellowfin-tuna', 'dorado-mahi'].includes(report.speciesId);
    if (filter === 'inshore') return report.speciesId === 'roosterfish';
    return true;
  });

  return (
    <div className="relative overflow-hidden">
      {/* Visual top grid decor */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-teal-400/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Title section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs font-mono tracking-wider uppercase text-teal-400 block mb-1">Unedited Guest Landings</span>
          <h3 className="font-display text-[52px] lg:text-[64px] text-white leading-none tracking-wide">CATCH OF THE MONTH</h3>
          <p className="text-sm text-white/45 mt-1 max-w-xl">
            Live photographic proof that the bite is hot right now. Browse our real recent trophy landings logged directly by our first mate in Costa Rica.
          </p>
        </div>

        {/* Categories toggler */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-xl self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 font-mono text-[11px] rounded-lg tracking-wider uppercase transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-teal-500 text-white font-semibold' 
                : 'text-white/40 hover:text-white hover:bg-white/8'
            }`}
          >
            All Catches
          </button>
          <button
            onClick={() => setFilter('offshore')}
            className={`px-3 py-1.5 font-mono text-[11px] rounded-lg tracking-wider uppercase transition-all duration-300 ${
              filter === 'offshore' 
                ? 'bg-teal-500 text-white font-semibold' 
                : 'text-white/40 hover:text-white hover:bg-white/8'
            }`}
          >
            Offshore Big Game
          </button>
          <button
            onClick={() => setFilter('inshore')}
            className={`px-3 py-1.5 font-mono text-[11px] rounded-lg tracking-wider uppercase transition-all duration-300 ${
              filter === 'inshore' 
                ? 'bg-teal-500 text-white font-semibold' 
                : 'text-white/40 hover:text-white hover:bg-white/8'
            }`}
          >
            Inshore Kings
          </button>
        </div>
      </div>

      {/* Masonry-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReports.map((report) => (
            <motion.div
              layout
              key={report.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-black/5"
            >
              
              {/* Photo Box container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/8 border-b border-black/8">
                <img 
                  src={report.image} 
                  alt={report.speciesName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badges over the image */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-black/70 text-[10px] font-mono font-medium text-white border border-white/10 px-2.5 py-0.5 rounded backdrop-blur">
                    {report.weight}
                  </span>
                  {report.speciesId === 'roosterfish' && (
                    <span className="bg-emerald-500/85 text-[8px] font-mono font-bold text-white uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur">
                      Released ✓
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 text-[9px] font-mono text-white/80 border border-white/10 px-2 py-0.5 rounded backdrop-blur flex items-center gap-1">
                  <Camera size={10} className="text-teal-300" />
                  Verified
                </div>
              </div>

              {/* Photo Caption Details info structure */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[10px] text-teal-600 uppercase tracking-wider font-mono">
                    <Calendar size={10} />
                    <span>{report.month} {report.year}</span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-black mt-1 mb-1">
                    {report.speciesName}
                  </h4>
                  <div className="text-xs text-black/55 line-clamp-3 leading-relaxed italic border-l-2 border-teal-400/40 pl-2.5 my-3 font-serif">
                    &ldquo;{report.captainQuote}&rdquo;
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-black/50 mt-2 border-t border-black/8 pt-3">
                    <User size={12} className="text-teal-600" />
                    <span>Guest: {report.guestName}</span>
                  </div>
                  
                  {/* Action Link trigger modal */}
                  <button
                    onClick={() => setActiveModalReport(report)}
                    className="w-full mt-4 bg-black/5 border border-black/10 text-[10px] font-mono text-black/50 uppercase tracking-wider text-center py-2.5 rounded-xl block transition-all duration-300 hover:bg-teal-500/10 hover:border-teal-400/30 hover:text-teal-700"
                  >
                    View Captain’s Log Entry
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Captain's Log Dialog Modal */}
      <AnimatePresence>
        {activeModalReport && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden max-w-xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setActiveModalReport(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/8 text-black/50 hover:text-black hover:scale-105 border border-black/10 transition-all z-10"
              >
                <X size={16} />
              </button>

              <div className="aspect-[16/9] w-full relative">
                <img 
                  src={activeModalReport.image} 
                  alt={activeModalReport.speciesName} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-teal-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full">
                    {activeModalReport.weight} Landing
                  </span>
                  <h3 className="font-display text-3xl text-black mt-1.5">{activeModalReport.speciesName}</h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                
                {/* Meteorological metadata specs */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-black/8 pb-5">
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-teal-600 block mb-0.5">Date Caught</label>
                    <span className="text-xs font-mono text-black/80">{activeModalReport.month} {activeModalReport.year}</span>
                  </div>
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-teal-600 block mb-0.5">Angler</label>
                    <span className="text-xs font-mono text-black/80">{activeModalReport.guestName}</span>
                  </div>
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-wider text-teal-600 block mb-0.5">Physical specs</label>
                    <span className="text-xs font-mono text-black/80">{activeModalReport.length || 'N/A Length'} • {activeModalReport.weight}</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-black/55">
                    <MapPin size={14} className="text-teal-600" />
                    <span>Coordinates: {activeModalReport.location}</span>
                  </div>

                  <div className="relative bg-black/4 p-5 rounded-xl border border-black/8">
                    <Quote className="absolute right-4 top-4 text-black/8" size={32} />
                    <p className="font-serif text-sm text-black/70 italic leading-relaxed">
                      &ldquo;{activeModalReport.captainQuote}&rdquo;
                    </p>
                    <span className="block text-[10px] font-mono text-teal-600 uppercase tracking-widest mt-3.5 text-right">
                      — Captain Carlos, Elite Command Tower
                    </span>
                  </div>
                </div>

                {/* Catch and release certification */}
                <div className="bg-teal-500/5 rounded-xl p-4 border border-teal-400/20 flex gap-3 text-xs text-black/60">
                  <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-black/55">Costa Rica INCOPESCA Regulated:</strong> 
                    {' '} This landing adheres fully to local billfish safety regulations. Released specimens are handled strictly alongside the hull for maximum oxygen survival recovery.
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
