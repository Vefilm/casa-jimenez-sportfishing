import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, Camera, Image as ImageIcon } from 'lucide-react';

// Import all gallery images via Vite glob
// @ts-ignore
const galleryContext = import.meta.glob('../assets/images/gallery/gallery_*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const galleryImages: string[] = (Object.entries(galleryContext) as [string, unknown][])
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string);

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setActiveIndex(idx), []);
  const closeLightbox = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((p) => (p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);

  const next = useCallback(() => {
    setActiveIndex((p) => (p !== null ? (p + 1) % galleryImages.length : null));
  }, []);

  React.useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeIndex, closeLightbox, prev, next]);

  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <section
      id="boat-gallery"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #030303 0%, #050808 30%, #0a0c08 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4">
            <Camera size={10} className="text-white/40" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-white/40">
              {galleryImages.length} Photos · Onboard the Kaylee
            </span>
          </div>
          <h3 className="font-display text-[48px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
            ON THE KAYLEE
          </h3>
          <p className="text-sm text-white/40 font-light mt-4 max-w-2xl leading-relaxed">
            Real catches and real days on the water. Photos from charters out of Puerto Jiménez.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {galleryImages.map((src, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 10) * 0.03 }}
              onClick={() => openLightbox(idx)}
              className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/8 group cursor-pointer hover:border-teal-400/40 transition-all duration-300"
            >
              <img
                src={src}
                alt={`Gallery photo ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ImageIcon size={18} className="text-white/0 group-hover:text-white/70 transition-all duration-300" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button onClick={closeLightbox} className="absolute top-6 right-6 p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all z-10">
                <X size={20} />
              </button>
              <span className="absolute top-6 left-6 text-[11px] font-mono text-white/50 tracking-wider">
                {activeIndex + 1} / {galleryImages.length}
              </span>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 sm:left-8 p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <ChevronLeft size={24} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 sm:right-8 p-2 rounded-full bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <ChevronRight size={24} />
              </button>
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryImages[activeIndex]}
                  alt={`Gallery photo ${activeIndex + 1}`}
                  className="w-full h-full object-contain max-h-[85vh]"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
