import React from 'react';
import { motion } from 'motion/react';
import { Fish, Clock, TrendingUp, Flame } from 'lucide-react';
import { useT } from '../translations';

// @ts-ignore
import img1 from '../assets/images/gallery/gallery_02.jpg';
// @ts-ignore
import img2 from '../assets/images/gallery/gallery_06.jpg';
// @ts-ignore
import img3 from '../assets/images/gallery/gallery_11.jpg';
// @ts-ignore
import img4 from '../assets/images/gallery/gallery_20.jpg';

const REPORT_DATE = 'Week of June 9–12, 2026';

const CATCHES = [
  {
    date: 'Jun 11',
    species: 'Yellowfin Tuna',
    detail: '2 fish, 138 lbs & 121 lbs — Full Day Offshore',
    status: 'KEPT — fillets packed on ice',
    heat: 'hot',
    img: img1,
    depth: '~45 miles out · Spinner Dolphin School',
    method: 'Live sardine under dolphins',
  },
  {
    date: 'Jun 10',
    species: 'Roosterfish',
    detail: 'Trophy fish, 68 lbs — Gulf of Dulce Reef',
    status: 'RELEASED — perfect condition',
    heat: 'hot',
    img: img2,
    depth: 'Gulf of Dulce · Volcanic Reef Structure',
    method: 'Live lookdown on circle hook',
  },
  {
    date: 'Jun 9',
    species: 'Dorado / Mahi-Mahi',
    detail: '6 fish, best at 44 lbs — Combo Day',
    status: '4 KEPT · 2 RELEASED',
    heat: 'warm',
    img: img3,
    depth: '30 miles out · Current edge / debris line',
    method: 'Bird daisy chain troll',
  },
  {
    date: 'Jun 7',
    species: 'Pacific Sailfish',
    detail: 'Double hookup — two boats out, both raised sail',
    status: 'BOTH RELEASED — healthy',
    heat: 'warm',
    img: img4,
    depth: 'Offshore Pacific · Blue water canyon edge',
    method: 'Rigged ballyhoo',
  },
];

const HEAT_COLORS: Record<string, string> = {
  hot: 'text-orange-400 border-orange-400/30 bg-orange-400/8',
  warm: 'text-amber-400 border-amber-400/30 bg-amber-400/8',
  cool: 'text-teal-400 border-teal-400/30 bg-teal-400/8',
};

const HEAT_LABELS: Record<string, string> = {
  hot: 'ON FIRE',
  warm: 'ACTIVE',
  cool: 'SPOTTED',
};

export default function FishingReport() {
  const t = useT();
  return (
    <section className="bg-[#030a07] border-t border-white/6 py-24 lg:py-28 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <span className="text-[10px] font-mono tracking-[3px] uppercase text-orange-400/70 block mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse inline-block" />
              {t('reportBadge')}
            </span>
            <h3 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
              {t('reportTitle1')}
              <br />
              <span className="text-white/30">{t('reportTitle2')}</span>
            </h3>
          </div>
          <div className="pb-3 space-y-1">
            <div className="flex items-center gap-2 text-white/40">
              <Clock size={12} className="text-orange-400/60" />
              <span className="font-mono text-[10px] tracking-wider uppercase">{REPORT_DATE}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={12} className="text-orange-400" />
              <span className="font-mono text-[10px] text-orange-300 tracking-wider uppercase">{t('reportPeak')}</span>
            </div>
          </div>
        </div>

        {/* Catch grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATCHES.map((c, i) => (
            <motion.div
              key={c.date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 hover:border-white/18 transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.species}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                {/* Heat badge */}
                <span className={`absolute top-3 right-3 text-[9px] font-mono tracking-widest font-bold px-2 py-1 rounded-full border ${HEAT_COLORS[c.heat]} flex items-center gap-1`}>
                  <Flame size={9} />
                  {HEAT_LABELS[c.heat]}
                </span>
                {/* Date */}
                <span className="absolute bottom-3 left-3 font-mono text-[10px] text-white/60 tracking-wider">
                  {c.date}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 bg-[#07100b] space-y-2">
                <p className="font-sans text-sm font-semibold text-white leading-none">{c.species}</p>
                <p className="font-mono text-[11px] text-white/55 leading-snug">{c.detail}</p>
                <div className="pt-2 border-t border-white/6 space-y-1">
                  <p className="text-[10px] font-mono text-white/30">{c.depth}</p>
                  <p className="text-[10px] font-mono text-teal-400/60">{c.method}</p>
                </div>
                <div className={`inline-block text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${c.status.includes('RELEASED') ? 'border-teal-500/25 text-teal-400/70 bg-teal-500/5' : 'border-amber-500/25 text-amber-400/70 bg-amber-500/5'}`}>
                  {c.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Report footer */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6">
          <p className="text-xs text-white/30 font-light">
            {t('reportFooter')}
          </p>
          <a
            href="mailto:cabinasjimenez@gmail.com?subject=Fishing Report Question — What's Biting?&body=Hello Captain Jorge, I saw the weekly report on the Kaylee and wanted to ask about current conditions and availability..."
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-orange-500/10 border border-orange-500/25 text-orange-300 text-xs font-mono tracking-widest uppercase rounded-xl hover:bg-orange-500/18 transition-colors"
          >
            <Fish size={12} />
            {t('reportCta')}
          </a>
        </div>

      </div>
    </section>
  );
}
