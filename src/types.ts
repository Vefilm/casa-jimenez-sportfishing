export interface Species {
  id: string;
  name: string;
  scientificName: string;
  category: 'offshore' | 'inshore';
  habitat: string;
  seasonText: string;
  peakMonths: number[]; // 0 for Jan, 11 for Dec
  bestBait: string;
  tactics: string;
  fightingStyle: string;
  image: string;
  description: string;
  conservationStatus: string;
}

export interface CharterTrip {
  id: string;
  name: string;
  category: 'offshore' | 'inshore';
  duration: 'Full-Day (8h)' | 'Half-Day (4h)' | 'Extended Offshore (10h)';
  price: string;
  bestFor: string;
  capacity: string;
  included: string[];
  description: string;
}

export interface BoatHotspot {
  id: string;
  name: string;
  x: number; // Percentage X on the boat model (0-100)
  y: number; // Percentage Y on the boat model (0-100)
  title: string;
  subtitle: string;
  stats: Record<string, string>;
  description: string;
  imageUrl: string;
  importance: string; // Its importance for sportfishing
}

export interface CatchReport {
  id: string;
  speciesId: string;
  speciesName: string;
  guestName: string;
  month: string;
  year: number;
  weight: string;
  length?: string;
  location: string;
  captainQuote: string;
  image: string;
}

export interface SolunarReport {
  date: string;
  moonPhase: string;
  moonIllustration: string; // Emoji or visual representation
  moonIllumination: number; // 0 to 100
  solunarRating: 'Excellent' | 'Good' | 'Average' | 'Slow';
  majorFeedingTimes: string[];
  minorFeedingTimes: string[];
  bestBiteWindow: string;
  speciesMultiplier: Record<string, number>; // Factor out of 100 for biting probability
}

export interface TideEvent {
  time: string;
  height: string;
  type: 'High' | 'Low';
  timestamp: Date;
}
