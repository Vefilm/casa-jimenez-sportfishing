import React, { useState } from 'react';
import { Species } from '../types';

interface FishFlipCardProps {
  species: Species;
  outerImage: string;
  innerImage: string;
  accentColor: string;
  badgeClass: string;
  onSelect: () => void;
  isActive: boolean;
}

export default function FishFlipCard({
  species,
  outerImage,
  innerImage,
  accentColor,
  badgeClass,
  onSelect,
  isActive,
}: FishFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`group cursor-pointer relative`}
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={onSelect}
    >
      {/* Flip container */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          position: 'relative',
          height: '320px',
        }}
      >
        {/* FRONT — realistic fish photo */}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-gold-900/20 shadow-xl"
        >
          <img
            src={outerImage}
            alt={species.name}
            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <span className={`text-[9px] font-mono tracking-widest uppercase ${accentColor} mb-1 block`}>
              {species.category === 'offshore' ? 'Offshore Pelagic' : 'Inshore Species'}
            </span>
            <h3 className="font-serif text-xl text-white font-medium leading-tight">{species.name}</h3>
            <p className="text-[10px] text-white/50 font-mono italic mt-0.5">{species.scientificName}</p>
          </div>

          {/* Hover hint */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[9px] font-mono text-white/60 bg-black/50 px-2 py-1 rounded-full tracking-wider">
              HOVER TO REVEAL
            </span>
          </div>

          {/* Active indicator */}
          {isActive && (
            <div className="absolute top-4 left-4">
              <span className={`text-[9px] font-mono ${badgeClass} px-2 py-1 rounded-full tracking-wider border`}>
                SELECTED
              </span>
            </div>
          )}
        </div>

        {/* BACK — second fish photo with season/conservation info */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className="absolute inset-0 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black"
        >
          <img
            src={innerImage}
            alt={`${species.name}`}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />

          {/* Conservation badge top-right */}
          <div className="absolute top-4 right-4">
            <span className={`text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-full ${
              species.conservationStatus.includes('Release')
                ? 'text-amber-300 bg-black/60 border border-amber-500/30'
                : 'text-teal-300 bg-black/60 border border-teal-500/30'
            }`}>
              {species.conservationStatus.includes('Release') ? 'C&R ONLY' : 'TABLE FARE'}
            </span>
          </div>

          {/* Bottom info on back */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-serif text-xl text-white font-medium">{species.name}</h3>
            <p className="text-[10px] text-white/55 font-mono mt-1 leading-relaxed line-clamp-2">
              {species.seasonText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
