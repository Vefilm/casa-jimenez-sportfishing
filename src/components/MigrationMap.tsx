import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ChevronDown, Calendar, Fish, Waves, Ship, Thermometer, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SPECIES_DATA, CHARTER_TRIPS } from '../data';

// Fish photos used as map markers for each species
// Using live fish photos (not cleaned/dead ones) for tuna and dorado
// @ts-ignore
import fishTunaPhoto from '../assets/images/real/yellowfin_tuna_2.jpg';
// @ts-ignore
import fishTunaAlt from '../assets/images/real/yellowfin_tuna_1.jpg';
// @ts-ignore
import fishSailfishPhoto from '../assets/images/blue_marlin_1781200358551.jpg';
// @ts-ignore
import fishDoradoPhoto from '../assets/images/dorado_mahi_1781200329038.jpg';
// @ts-ignore
import fishDoradoAlt from '../assets/images/real/fish_dorado_inner.jpg';
// @ts-ignore
import fishRoosterPhoto from '../assets/images/rooster_fish_1781200344379.jpg';
// @ts-ignore
import fishPargoPhoto from '../assets/images/rooster_fish_1781200344379.jpg';
// @ts-ignore
import fishAmberjackPhoto from '../assets/images/yellowfin_tuna_1781200373236.jpg';

const FISH_MARKER_MAP: Record<string, string> = {
  'yellowfin-tuna':  fishTunaPhoto,
  'sailfish-marlin': fishSailfishPhoto,
  'dorado-mahi':     fishDoradoPhoto,
  'roosterfish':     fishRoosterPhoto,
  'pargo':           fishPargoPhoto,
  'amberjack':       fishAmberjackPhoto,
};

// Alternate "second view" images for the markers (swaps on interaction)
const FISH_MARKER_ALT: Record<string, string> = {
  'yellowfin-tuna':  fishTunaAlt,
  'dorado-mahi':     fishDoradoAlt,
};

// ────────────────────────────────────────────────────────────
// Mapbox token — from env var (set in .env, not committed)
// ────────────────────────────────────────────────────────────
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
interface MigrationRoute {
  speciesId: string;
  coordinates: [number, number][];
  color: string;
}

interface HeatAnchor {
  lng: number;
  lat: number;
}

// ────────────────────────────────────────────────────────────
// Migration Route Definitions  (lng, lat)
// Routes designed so that ~50% progress = near Osa Peninsula
// ────────────────────────────────────────────────────────────
const MIGRATION_ROUTES: MigrationRoute[] = [
  {
    // Yellowfin Tuna — coastal route, south to north
    speciesId: 'yellowfin-tuna',
    color: '#10b981',
    coordinates: [
      [-82.5, 7.2],
      [-82.8, 7.6],
      [-83.0, 7.9],
      [-83.2, 8.2],
      [-83.35, 8.35],
      [-83.5, 8.45],
      [-83.65, 8.55],
      [-83.8, 8.7],
      [-84.0, 9.0],
      [-84.3, 9.3],
      [-84.6, 9.7],
      [-85.0, 10.2],
    ],
  },
  {
    // Sailfish & Blue Marlin — offshore pelagic loop
    speciesId: 'sailfish-marlin',
    color: '#3b82f6',
    coordinates: [
      [-86.8, 5.8],
      [-87.0, 6.8],
      [-86.8, 7.6],
      [-86.4, 8.2],
      [-86.0, 8.5],
      [-85.6, 8.6],
      [-85.3, 8.5],
      [-85.0, 8.3],
      [-84.7, 8.5],
      [-84.4, 8.9],
      [-84.0, 9.4],
      [-83.5, 9.8],
      [-83.0, 10.2],
    ],
  },
  {
    // Dorado/Mahi-Mahi — warm current route, offshore to coast
    speciesId: 'dorado-mahi',
    color: '#f97316',
    coordinates: [
      [-87.5, 4.8],
      [-87.2, 5.8],
      [-86.8, 6.6],
      [-86.4, 7.3],
      [-86.0, 7.8],
      [-85.5, 8.2],
      [-85.0, 8.3],
      [-84.6, 8.2],
      [-84.2, 8.1],
      [-83.8, 8.3],
      [-83.5, 8.4],
    ],
  },
  {
    // Roosterfish — inshore coastal, short-range resident
    speciesId: 'roosterfish',
    color: '#d97706',
    coordinates: [
      [-83.8, 8.0],
      [-83.7, 8.1],
      [-83.55, 8.15],
      [-83.45, 8.25],
      [-83.35, 8.35],
      [-83.3, 8.45],
      [-83.25, 8.55],
      [-83.2, 8.65],
      [-83.15, 8.75],
      [-83.1, 8.85],
      [-83.0, 9.0],
    ],
  },
  {
    // Pargo — inshore reef, short-range resident
    speciesId: 'pargo',
    color: '#ef4444',
    coordinates: [
      [-83.7, 8.2],
      [-83.6, 8.3],
      [-83.5, 8.35],
      [-83.4, 8.45],
      [-83.3, 8.35],
      [-83.2, 8.5],
      [-83.1, 8.65],
      [-83.0, 8.8],
    ],
  },
  {
    // Amberjack — offshore structure, mid-range
    speciesId: 'amberjack',
    color: '#8b5cf6',
    coordinates: [
      [-84.5, 7.8],
      [-84.3, 8.0],
      [-84.0, 8.2],
      [-83.8, 8.3],
      [-83.6, 8.4],
      [-83.5, 8.5],
      [-83.4, 8.6],
      [-83.3, 8.7],
      [-83.2, 8.85],
      [-83.0, 9.1],
    ],
  },
];

// ────────────────────────────────────────────────────────────
// Heat-map anchor points by species (with peak-month ranges)
// ────────────────────────────────────────────────────────────
const HEAT_ANCHORS: Record<string, { points: HeatAnchor[]; peakMonths: number[] }> = {
  'yellowfin-tuna': {
    peakMonths: [4, 5, 6, 7, 8, 9],
    points: [
      { lng: -83.55, lat: 8.48 },
      { lng: -83.70, lat: 8.55 },
      { lng: -83.35, lat: 8.35 },
      { lng: -84.00, lat: 9.00 },
      { lng: -84.40, lat: 9.40 },
      { lng: -82.90, lat: 7.90 },
    ],
  },
  'sailfish-marlin': {
    peakMonths: [11, 0, 1, 2, 3],
    points: [
      { lng: -85.30, lat: 8.50 },
      { lng: -85.00, lat: 8.30 },
      { lng: -86.00, lat: 8.50 },
      { lng: -84.50, lat: 8.90 },
      { lng: -86.50, lat: 7.50 },
      { lng: -84.80, lat: 8.60 },
    ],
  },
  'dorado-mahi': {
    peakMonths: [8, 9, 10, 11],
    points: [
      { lng: -85.20, lat: 8.20 },
      { lng: -84.60, lat: 8.30 },
      { lng: -85.80, lat: 7.80 },
      { lng: -84.00, lat: 8.40 },
      { lng: -84.80, lat: 8.70 },
      { lng: -83.80, lat: 8.25 },
    ],
  },
  'roosterfish': {
    peakMonths: [4, 5, 6],
    points: [
      { lng: -83.35, lat: 8.40 },
      { lng: -83.50, lat: 8.50 },
      { lng: -83.28, lat: 8.55 },
      { lng: -83.60, lat: 8.35 },
      { lng: -83.40, lat: 8.60 },
      { lng: -83.20, lat: 8.70 },
    ],
  },
  'pargo': {
    peakMonths: [2, 3, 4, 5, 6],
    points: [
      { lng: -83.50, lat: 8.50 },
      { lng: -83.40, lat: 8.45 },
      { lng: -83.30, lat: 8.55 },
      { lng: -83.60, lat: 8.35 },
      { lng: -83.45, lat: 8.60 },
      { lng: -83.20, lat: 8.50 },
    ],
  },
  'amberjack': {
    peakMonths: [4, 5, 6, 7],
    points: [
      { lng: -84.00, lat: 8.30 },
      { lng: -83.80, lat: 8.50 },
      { lng: -83.50, lat: 8.60 },
      { lng: -84.20, lat: 8.10 },
      { lng: -83.60, lat: 8.40 },
      { lng: -83.30, lat: 8.80 },
    ],
  },
};

// ────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────
function routeLength(coords: [number, number][]): number {
  let d = 0;
  for (let i = 1; i < coords.length; i++) {
    d += Math.sqrt(
      (coords[i][0] - coords[i - 1][0]) ** 2 +
        (coords[i][1] - coords[i - 1][1]) ** 2,
    );
  }
  return d;
}

function interpolateAlong(
  coords: [number, number][],
  t: number,
): [number, number] {
  if (coords.length === 0) return [0, 0];
  if (coords.length === 1) return coords[0];
  const clamped = Math.max(0, Math.min(1, t));
  const dists: number[] = [0];
  for (let i = 1; i < coords.length; i++) {
    dists.push(
      dists[i - 1] +
        Math.sqrt(
          (coords[i][0] - coords[i - 1][0]) ** 2 +
            (coords[i][1] - coords[i - 1][1]) ** 2,
        ),
    );
  }
  const total = dists[dists.length - 1];
  const target = clamped * total;
  for (let i = 1; i < coords.length; i++) {
    if (dists[i] >= target) {
      const seg = (target - dists[i - 1]) / (dists[i] - dists[i - 1]);
      return [
        coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * seg,
        coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * seg,
      ];
    }
  }
  return coords[coords.length - 1];
}

/** Map month (1–12) to route progress (0–1) based on peak window. */
function monthToProgress(month: number, peakMonths: number[]): number {
  // Treat months as circular relative to the peak window
  const sorted = [...peakMonths].sort((a, b) => a - b);
  const peakStart = sorted[0];
  const peakEnd = sorted[sorted.length - 1];

  // Build a mapping: months before peak window → 0..0.3, peak window → 0.3..0.7, after → 0.7..1.0
  if (peakEnd >= peakStart) {
    if (month >= peakStart && month <= peakEnd) {
      // Inside peak window → middle of route
      const span = peakEnd - peakStart || 1;
      return 0.3 + ((month - peakStart) / span) * 0.4;
    } else if (month < peakStart) {
      // Before peak → approaching
      return (month / peakStart) * 0.3;
    } else {
      // After peak → departing
      return 0.7 + ((month - peakEnd) / (12 - peakEnd)) * 0.3;
    }
  }
  return 0.5;
}

/** Generate GeoJSON heat points for one species. */
function generateHeatPoints(
  speciesId: string,
  month: number,
  limit = 60,
): GeoJSON.FeatureCollection {
  const anchor = HEAT_ANCHORS[speciesId];
  if (!anchor) return { type: 'FeatureCollection', features: [] };

  const { points, peakMonths } = anchor;
  const isPeak = peakMonths.includes(month);
  const isShoulder =
    !isPeak && peakMonths.some((pm) => Math.abs(pm - month) <= 2);
  const baseWeight = isPeak ? 0.9 : isShoulder ? 0.45 : 0.08;

  const perPoint = Math.max(1, Math.floor(limit / points.length));
  const features: GeoJSON.Feature[] = [];

  for (const p of points) {
    for (let i = 0; i < perPoint; i++) {
      const jitterLng = (Math.random() - 0.5) * 0.35;
      const jitterLat = (Math.random() - 0.5) * 0.25;
      const weight = Math.min(1, baseWeight + Math.random() * 0.15);
      features.push({
        type: 'Feature',
        properties: { species: speciesId, weight },
        geometry: {
          type: 'Point',
          coordinates: [p.lng + jitterLng, p.lat + jitterLat],
        },
      });
    }
  }
  return { type: 'FeatureCollection', features };
}

/** Build the charter-suggestion object from month + species. */
function getCharterSuggestion(month: number, speciesId: string) {
  const species = SPECIES_DATA.find((s) => s.id === speciesId);
  if (!species) return null;

  // Find which charters match this species category
  const matching = CHARTER_TRIPS.filter(
    (t) =>
      t.category === species.category &&
      (t.id !== 'combo-day' || species.category === 'offshore'),
  );

  // Check if species is in peak
  const isPeak = species.peakMonths.includes(month);

  // Recommend based on the combo
  let recommended = matching[0] || null;
  // Tuna mission for tuna-focused trips
  if (speciesId === 'yellowfin-tuna' && isPeak) {
    recommended = CHARTER_TRIPS.find((t) => t.id === 'tuna-mission') || recommended;
  }
  // Offshore billfish
  if (speciesId === 'sailfish-marlin' && isPeak) {
    recommended =
      CHARTER_TRIPS.find((t) => t.id === 'offshore-full') || recommended;
  }
  // Combo for mixed seasons
  if (isPeak && month >= 4 && month <= 8) {
    const combo = CHARTER_TRIPS.find((t) => t.id === 'combo-day');
    if (combo) recommended = combo;
  }

  // List all species in peak this month
  const alsoInSeason = SPECIES_DATA.filter(
    (s) => s.id !== speciesId && s.peakMonths.includes(month),
  ).map((s) => s.name);

  return { species, isPeak, recommended, alsoInSeason };
}

// ────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────
export default function MigrationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const animRef = useRef<number>(0);
  const fishMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const fishMarkerImgRef = useRef<HTMLImageElement | null>(null);

  // Refs to keep animation loop in sync without stale closures
  const speciesRef = useRef('yellowfin-tuna');
  const monthRef = useRef(6);

  const [selectedSpecies, setSelectedSpecies] = useState('yellowfin-tuna');
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [showHeat, setShowHeat] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Keep refs in sync
  useEffect(() => { speciesRef.current = selectedSpecies; }, [selectedSpecies]);
  useEffect(() => { monthRef.current = selectedMonth; }, [selectedMonth]);

  // Peak-month helper for the active species
  const speciesRoute = MIGRATION_ROUTES.find(
    (r) => r.speciesId === selectedSpecies,
  );
  const heatAnchor = HEAT_ANCHORS[selectedSpecies];
  const peakMonths = heatAnchor?.peakMonths ?? [];
  const suggestion = getCharterSuggestion(selectedMonth, selectedSpecies);

  // ── Init map ──────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const m = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-83.55, 8.35],
      zoom: 7.2,
      attributionControl: false,
      cooperativeGestures: false,
    });

    m.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-left');
    m.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'bottom-right',
    );

    m.on('load', () => {
      // ── Route sources & layers ──
      for (const route of MIGRATION_ROUTES) {
        const geojson: GeoJSON.Feature = {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: route.coordinates },
        };

        m.addSource(`route-${route.speciesId}`, {
          type: 'geojson',
          data: geojson,
        });

        // Background guide line
        m.addLayer({
          id: `route-bg-${route.speciesId}`,
          type: 'line',
          source: `route-${route.speciesId}`,
          layout: { visibility: 'none' },
          paint: {
            'line-color': route.color,
            'line-opacity': 0.2,
            'line-width': 4,
            'line-blur': 2,
          },
        });

        // Glow line behind the active track
        m.addLayer({
          id: `route-glow-${route.speciesId}`,
          type: 'line',
          source: `route-${route.speciesId}`,
          layout: { visibility: 'none' },
          paint: {
            'line-color': route.color,
            'line-opacity': 0.5,
            'line-width': 2.5,
            'line-blur': 4,
          },
        });

        // Bright active line
        m.addLayer({
          id: `route-line-${route.speciesId}`,
          type: 'line',
          source: `route-${route.speciesId}`,
          layout: { visibility: 'none' },
          paint: {
            'line-color': route.color,
            'line-opacity': 0.85,
            'line-width': 1.5,
          },
        });

        // Moving dot source (empty initially)
        m.addSource(`dot-${route.speciesId}`, {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });

        // Pulsing glow behind the fish photo marker
        m.addLayer({
          id: `dot-glow-${route.speciesId}`,
          type: 'circle',
          source: `dot-${route.speciesId}`,
          layout: { visibility: 'none' },
          paint: {
            'circle-radius': 22,
            'circle-color': route.color,
            'circle-opacity': 0.2,
            'circle-blur': 6,
          },
        });
      }

      // ── Heat map source & layer ──
      m.addSource('heat', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });

      m.addLayer(
        {
          id: 'heat-layer',
          type: 'heatmap',
          source: 'heat',
          layout: { visibility: 'none' },
          paint: {
            'heatmap-radius': 30,
            'heatmap-weight': ['get', 'weight'],
            'heatmap-intensity': 0.8,
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(0,0,0,0)',
              0.1,
              '#10b981',
              0.3,
              '#fbbf24',
              0.6,
              '#f97316',
              0.9,
              '#ef4444',
            ],
            'heatmap-opacity': 0.6,
          },
        },
        'water',
      );

      // ── Create fish photo marker on the map ──
      const defaultRoute = MIGRATION_ROUTES.find((r) => r.speciesId === selectedSpecies);
      if (defaultRoute) {
        const startPos = interpolateAlong(defaultRoute.coordinates, 0.45);
        const markerEl = document.createElement('div');
        markerEl.className = 'fish-photo-tracker';
        markerEl.style.cssText = `
          width: 52px; height: 52px; border-radius: 50%; overflow: hidden;
          border: 3px solid rgba(255,255,255,0.95);
          box-shadow: 0 0 24px rgba(16,185,129,0.5), 0 4px 16px rgba(0,0,0,0.6);
          background: #0a0a0a;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: border-color 0.3s;
        `;

        const markerImg = document.createElement('img');
        markerImg.src = FISH_MARKER_MAP[selectedSpecies] || FISH_MARKER_MAP['yellowfin-tuna'];
        markerImg.alt = 'Tracking fish';
        markerImg.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;border-radius:50%;';
        markerEl.appendChild(markerImg);
        fishMarkerImgRef.current = markerImg;

        // Click marker to swap to alternate fish image
        markerEl.addEventListener('click', () => {
          const alt = FISH_MARKER_ALT[speciesRef.current];
          if (alt && markerImg.src.indexOf(alt) === -1) {
            markerImg.src = alt;
          } else if (FISH_MARKER_MAP[speciesRef.current]) {
            markerImg.src = FISH_MARKER_MAP[speciesRef.current];
          }
        });

        fishMarkerRef.current = new mapboxgl.Marker({ element: markerEl })
          .setLngLat(startPos)
          .addTo(m);
      }

      // ── Show initial species ──
      setMapReady(true);
      updateMapVisibility(m, selectedSpecies, showHeat, selectedMonth);
    });

    m.on('error', (e) => console.warn('Mapbox error:', e));

    mapRef.current = m;

    return () => {
      cancelAnimationFrame(animRef.current);
      if (fishMarkerRef.current) fishMarkerRef.current.remove();
      m.remove();
      mapRef.current = null;
      fishMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update visibility when controls change ──
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;
    updateMapVisibility(mapRef.current, selectedSpecies, showHeat, selectedMonth);
  }, [selectedSpecies, showHeat, selectedMonth, mapReady]);

  // ── Animation loop ──
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const animate = () => {
      const m = mapRef.current;
      if (!m) return;

      const id = speciesRef.current;
      const route = MIGRATION_ROUTES.find((r) => r.speciesId === id);
      if (!route) { animRef.current = requestAnimationFrame(animate); return; }

      const peak = HEAT_ANCHORS[id]?.peakMonths ?? [];
      const baseProgress = monthToProgress(monthRef.current, peak);

      // Gentle oscillation so the dot "breathes"
      const breathe = Math.sin(Date.now() / 4000) * 0.03;
      const t = Math.max(0, Math.min(1, baseProgress + breathe));

      const pos = interpolateAlong(route.coordinates, t);

      // Move the fish photo marker
      if (fishMarkerRef.current) {
        fishMarkerRef.current.setLngLat(pos);
      }

      // Also update the GeoJSON glow source
      const geojson: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: pos } }],
      };
      try {
        const dotSource = m.getSource(`dot-${id}`) as mapboxgl.GeoJSONSource;
        if (dotSource) dotSource.setData(geojson);
      } catch {
        // Source not ready yet
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mapReady]);

  // ── Resize map on mount ──
  useEffect(() => {
    if (!mapReady) return;
    const timer = setTimeout(() => mapRef.current?.resize(), 300);
    return () => clearTimeout(timer);
  }, [mapReady]);

  return (
    <section
      id="migration"
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #020d0a 0%, #041510 40%, #070e08 100%)',
      }}
    >
      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '256px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest uppercase text-teal-300">
              Interactive Migration Intelligence
            </span>
          </div>
          <h3 className="font-display text-[48px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
            PACIFIC MIGRATION
          </h3>
          <h3 className="font-display text-[48px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide -mt-2 sm:-mt-4">
            CORRIDORS
          </h3>
          <p className="text-sm text-white/40 font-light mt-4 max-w-2xl leading-relaxed">
            Explore the migratory paths of Osa Peninsula's premier gamefish
            across the Eastern Pacific. Toggle species, pick a month, and see
            exactly where the bite moves through the year.
          </p>
        </div>

        {/* ── Controls Bar ── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Species toggles */}
          <div className="flex flex-wrap gap-1.5">
            {SPECIES_DATA.map((s) => {
              const route = MIGRATION_ROUTES.find((r) => r.speciesId === s.id);
              const isActive = selectedSpecies === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecies(s.id)}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all duration-300 border ${
                    isActive
                      ? 'text-white font-semibold border-white/30 bg-white/10 shadow-lg'
                      : 'text-white/40 border-white/8 hover:text-white/70 hover:border-white/20 bg-white/3'
                  }`}
                  style={
                    isActive && route
                      ? { borderColor: route.color + '60', color: route.color }
                      : {}
                  }
                >
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full mr-1.5 align-middle"
                    style={{ backgroundColor: route?.color ?? '#666' }}
                  />
                  {s.name.split(' (')[0]}
                </button>
              );
            })}
          </div>

          <span className="text-white/15 mx-1 hidden sm:inline">|</span>

          {/* Heat map toggle */}
          <button
            onClick={() => setShowHeat(!showHeat)}
            className={`px-3.5 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all duration-300 border flex items-center gap-1.5 ${
              showHeat
                ? 'bg-orange-500/15 border-orange-500/40 text-orange-300 font-semibold'
                : 'text-white/40 border-white/8 hover:text-white/70 hover:border-white/20 bg-white/3'
            }`}
          >
            <Thermometer size={12} />
            Density Heat
          </button>
        </div>

        {/* ── Month Slider ── */}
        <div className="mb-6 p-4 rounded-xl bg-white/4 border border-white/8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
              <Calendar size={12} className="inline mr-1.5 -mt-0.5" />
              Select Month
            </span>
            <span className="font-display text-lg text-white">
              {[
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
              ][selectedMonth - 1] || 'Jun'}
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={12}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="w-full h-1.5 appearance-none bg-white/10 rounded-full accent-teal-400 cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-teal-400
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:shadow-teal-400/30
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-teal-400
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer"
          />

          {/* Month tick labels */}
          <div className="flex justify-between mt-1.5 px-0.5">
            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map(
              (l, i) => {
                const isActive = selectedMonth === i + 1;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedMonth(i + 1)}
                    className={`text-[9px] font-mono w-5 text-center transition-colors cursor-pointer ${
                      isActive ? 'text-teal-300 font-semibold' : 'text-white/25 hover:text-white/50'
                    }`}
                  >
                    {l}
                  </button>
                );
              },
            )}
          </div>

          {/* Peak indicator bar */}
          {peakMonths.length > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <Fish size={11} className="text-teal-400 shrink-0" />
              <div className="flex-1 h-1.5 rounded-full bg-white/6 overflow-hidden flex">
                {Array.from({ length: 12 }, (_, i) => {
                  const isPeak = peakMonths.includes(i);
                  const isCurrent = selectedMonth === i + 1;
                  return (
                    <div
                      key={i}
                      className={`flex-1 transition-all duration-300 ${
                        isPeak
                          ? isCurrent
                            ? 'bg-teal-400'
                            : 'bg-teal-500/40'
                          : 'bg-transparent'
                      }`}
                    />
                  );
                })}
              </div>
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-wider whitespace-nowrap">
                Peak season
              </span>
            </div>
          )}
        </div>

        {/* ── Map Container ── */}
        <div
          ref={containerRef}
          className="w-full h-[480px] sm:h-[580px] lg:h-[680px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative"
        />

        {/* ── Charter Suggestion Panel ── */}
        <AnimatePresence mode="wait">
          {suggestion && (
            <motion.div
              key={`${suggestion.species.id}-${selectedMonth}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mt-6 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                {/* Species status */}
                <div className="md:col-span-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                    {suggestion.isPeak ? '● Peak Season' : '○ Off Season'}
                  </span>
                  <h4 className="font-display text-xl text-white">
                    {suggestion.species.name.toUpperCase()}
                  </h4>
                  <p className="text-[11px] text-white/40 font-light mt-1">
                    {suggestion.isPeak
                      ? `In peak season now — prime conditions for ${suggestion.species.name}.`
                      : `Not in peak — consider targeting in-season species below.`}
                  </p>
                </div>

                {/* Recommended charter */}
                <div className="md:col-span-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-teal-400 block mb-1">
                    <Ship size={11} className="inline mr-1 -mt-0.5" />
                    Recommended Charter
                  </span>
                  {suggestion.recommended ? (
                    <>
                      <h5 className="font-sans text-sm font-semibold text-white">
                        {suggestion.recommended.name}
                      </h5>
                      <p className="text-[11px] text-white/40 font-light">
                        {suggestion.recommended.duration} —{' '}
                        {suggestion.recommended.price}
                      </p>
                    </>
                  ) : (
                    <p className="text-[11px] text-white/40 font-light">
                      Contact us to plan your trip
                    </p>
                  )}
                </div>

                {/* Also in season */}
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-1">
                    Also Active
                  </span>
                  {suggestion.alsoInSeason.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {suggestion.alsoInSeason.map((name) => (
                        <span
                          key={name}
                          className="px-2 py-0.5 rounded-md bg-white/8 text-[9px] font-mono text-white/50 border border-white/8"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-white/25 font-mono">
                      —
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────
// Map visibility helper (runs outside React render cycle)
// ────────────────────────────────────────────────────────────
function updateMapVisibility(
  map: mapboxgl.Map,
  speciesId: string,
  heatOn: boolean,
  month: number,
) {
  // Toggle route layers
  for (const route of MIGRATION_ROUTES) {
    const isActive = route.speciesId === speciesId;
    const vis = isActive ? 'visible' : 'none';

    try {
      [
        `route-bg-${route.speciesId}`,
        `route-glow-${route.speciesId}`,
        `route-line-${route.speciesId}`,
        `dot-glow-${route.speciesId}`,
      ].forEach((id) => {
        const layer = map.getLayer(id);
        if (layer) map.setLayoutProperty(id, 'visibility', vis);
      });
    } catch {
      // Layer may not exist yet
    }
  }

  // Swap fish photo on the marker when species changes
  try {
    const img = document.querySelector('.fish-photo-tracker img') as HTMLImageElement | null;
    if (img && FISH_MARKER_MAP[speciesId]) {
      img.src = FISH_MARKER_MAP[speciesId];
    }
  } catch {
    // Marker not ready
  }

  // Update heat map
  try {
    const heatLayer = map.getLayer('heat-layer');
    if (heatLayer) {
      map.setLayoutProperty(
        'heat-layer',
        'visibility',
        heatOn ? 'visible' : 'none',
      );
    }

    if (heatOn) {
      const heatData = generateHeatPoints(speciesId, month);
      const heatSource = map.getSource('heat') as mapboxgl.GeoJSONSource;
      if (heatSource) heatSource.setData(heatData);
    }
  } catch {
    // Layers not ready
  }

  // Style the heat layer per species
  const route = MIGRATION_ROUTES.find((r) => r.speciesId === speciesId);
  if (route && heatOn) {
    try {
      map.setPaintProperty('heat-layer', 'heatmap-color', [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(0,0,0,0)',
        0.1,
        route.color + '40',
        0.3,
        route.color + '99',
        0.6,
        route.color,
        0.9,
        '#ffffff',
      ]);
    } catch {
      // Not ready
    }
  }
}
