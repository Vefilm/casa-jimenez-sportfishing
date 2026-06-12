import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useT } from '../translations';

// @ts-ignore
import img1 from '../assets/images/gallery/gallery_01.jpg';
// @ts-ignore
import img2 from '../assets/images/gallery/gallery_04.jpg';
// @ts-ignore
import img3 from '../assets/images/gallery/gallery_08.jpg';
// @ts-ignore
import img4 from '../assets/images/gallery/gallery_12.jpg';
// @ts-ignore
import img5 from '../assets/images/gallery/gallery_22.jpg';
// @ts-ignore
import img6 from '../assets/images/gallery/gallery_35.jpg';

const TESTIMONIALS = [
  {
    name: 'Dave & Linda M.',
    location: 'Chicago, IL',
    date: 'May 2026',
    species: 'Yellowfin Tuna — 143 lbs',
    rating: 5,
    photo: img1,
    text: "Absolutely unreal. Jorge put us on a school of 140lb yellowfin before 8am — we were riding right into a spinner dolphin feed and the rods bent instantly. We've fished all over the world and this is the most electric we've ever felt on a boat. The Gulf of Dulce is something else entirely.",
  },
  {
    name: 'Scott R.',
    location: 'Houston, TX',
    date: 'January 2026',
    species: 'Pacific Sailfish × 2 Released',
    rating: 5,
    photo: img2,
    text: "Two sailfish released by 9am. Released them both healthy. Jorge handles these fish with total respect — circle hooks, fast releases, no stress on the animal. The aerial fight on the second one went 20 minutes. My hands were shaking for an hour. Worth every penny of that $1,400.",
  },
  {
    name: 'The Peterson Family',
    location: 'Denver, CO',
    date: 'March 2026',
    species: 'Roosterfish + Dorado',
    rating: 5,
    photo: img3,
    text: "We came with two teenagers who had never fished saltwater. They left as completely converted anglers. My 14-year-old fought a roosterfish for 35 minutes on the Gulf of Dulce Explorer half-day. Scarlet macaws on the shoreline, humpback whales in the distance. Jorge is a natural with first-time fishers — patient and knowledgeable.",
  },
  {
    name: 'Tom B.',
    location: 'Toronto, Canada',
    date: 'October 2025',
    species: 'Yellowfin Tuna — Full Combo Day',
    rating: 5,
    photo: img4,
    text: "This was my second trip with Jorge and it was better than the first. We did the Full Combo Day — tuna offshore in the morning, roosterfish on the inshore reefs in the afternoon. Filleted our tuna dockside and had it at a restaurant in Puerto Jiménez that night. If you're on the fence about the 10-hour day — book it.",
  },
  {
    name: 'Jen & Carlos V.',
    location: 'Miami, FL',
    date: 'September 2025',
    species: 'Dorado × 8 — Tuna Mission',
    rating: 5,
    photo: img5,
    text: "We came for yellowfin and ended up in a dorado blitz under a trash line 30 miles out. Eight mahi-mahi in two hours. Jorge found the birds circling from half a mile away — he reads the ocean like nobody I've ever fished with. The wildlife is insane: dolphins surfing the bow wave the whole ride home.",
  },
  {
    name: 'Mark S.',
    location: 'Austin, TX',
    date: 'June 2025',
    species: 'Roosterfish — Gulf of Dulce',
    rating: 5,
    photo: img6,
    text: "The roosterfish will ruin you for every other fish. That comb fin coming up behind the live bait in clear water — and then the run when it hits — I've never experienced that anywhere else. Jorge knows every rock and reef in the Gulf by memory. The Osa Peninsula is a special place and Casa Jimenez is the right way to see it from the water.",
  },
];

export default function Testimonials() {
  const t = useT();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const prev = () => goTo((activeIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((activeIndex + 1) % TESTIMONIALS.length);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section className="bg-[#050d0a] border-t border-white/6 py-24 lg:py-32 px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <span className="text-[10px] font-mono tracking-[3px] uppercase text-teal-400/70 block mb-3">
            {t('testimonialsBadge')}
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h3 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
              {t('testimonialsTitle')}
            </h3>
            <div className="flex items-center gap-2 pb-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-xs text-white/40">
                5.0 · {TESTIMONIALS.length} {t('testimonialsTrips')}
              </span>
            </div>
          </div>
        </div>

        {/* Main testimonial + photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">

          {/* Catch Photo — left column */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[280px] lg:h-auto min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={testimonial.photo}
                alt={`${testimonial.name} — ${testimonial.species}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block bg-black/60 border border-white/15 backdrop-blur-sm text-white/80 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full">
                {testimonial.species}
              </span>
            </div>
          </div>

          {/* Testimonial content — right column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="text-teal-400/30 mb-4">
                  <Quote size={40} />
                </div>
                <p className="font-serif text-lg sm:text-xl lg:text-[22px] text-white/80 leading-relaxed font-normal italic">
                  {testimonial.text}
                </p>
                <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-between">
                  <div>
                    <p className="font-sans text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="font-mono text-[10px] text-white/35 tracking-wider mt-0.5">
                      {testimonial.location} · {testimonial.date}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'w-6 bg-teal-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="h-10 w-10 rounded-xl border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="h-10 w-10 rounded-xl border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35 font-light">
            {t('testimonialsFooter')}
          </p>
          <a
            href="mailto:cabinasjimenez@gmail.com?subject=Fishing Charter Inquiry&body=Hello Captain Jorge, I'd like to book a charter..."
            className="px-6 py-2.5 bg-teal-600/15 border border-teal-500/30 text-teal-300 text-xs font-mono tracking-widest uppercase rounded-xl hover:bg-teal-600/25 hover:border-teal-500/50 transition-colors"
          >
            {t('testimonialsCta')}
          </a>
        </div>

      </div>
    </section>
  );
}
