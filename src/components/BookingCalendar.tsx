import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, Zap, Mail } from 'lucide-react';
import { useT } from '../translations';

// Peak species windows by month (0 = Jan, 11 = Dec)
const PEAK_MONTHS: Record<number, { label: string; color: string; species: string }> = {
  0:  { label: 'Sailfish Peak', color: '#3b82f6', species: 'Sailfish & Marlin' },
  1:  { label: 'Sailfish Peak', color: '#3b82f6', species: 'Sailfish & Marlin' },
  2:  { label: 'Billfish Season', color: '#3b82f6', species: 'Sailfish, Pargo' },
  3:  { label: 'Pargo Season', color: '#ef4444', species: 'Pargo & Roosterfish' },
  4:  { label: 'Prime Tuna', color: '#10b981', species: 'Yellowfin Tuna + Roosterfish' },
  5:  { label: 'Prime Tuna', color: '#10b981', species: 'Yellowfin Tuna + Roosterfish' },
  6:  { label: 'Prime Tuna', color: '#10b981', species: 'Yellowfin Tuna + Dorado' },
  7:  { label: 'Tuna & Amberjack', color: '#10b981', species: 'Yellowfin Tuna + Amberjack' },
  8:  { label: 'Dorado Blitz', color: '#f97316', species: 'Dorado + Yellowfin Tuna' },
  9:  { label: 'Dorado Peak', color: '#f97316', species: 'Dorado + Tuna + Marlin' },
  10: { label: 'Dorado Peak', color: '#f97316', species: 'Dorado + Marlin' },
  11: { label: 'Sailfish Run', color: '#3b82f6', species: 'Sailfish & Blue Marlin' },
};

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_ABBR = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

interface CalendarMonthProps {
  year: number;
  month: number;
  selectedDate: string | null;
  onSelectDate: (dateStr: string) => void;
  todayYear: number;
  todayMonth: number;
  todayDay: number;
}

function CalendarMonth({ year, month, selectedDate, onSelectDate, todayYear, todayMonth, todayDay }: CalendarMonthProps) {
  const peak = PEAK_MONTHS[month];
  const days = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="flex-1 min-w-0">
      {/* Month header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-sans text-sm font-semibold text-white">{MONTH_NAMES[month]} {year}</span>
          <span
            className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full border"
            style={{ color: peak.color, borderColor: peak.color + '50', background: peak.color + '12' }}
          >
            {peak.label.toUpperCase()}
          </span>
        </div>
        <p className="text-[10px] font-mono text-white/35">{peak.species}</p>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1.5">
        {DAY_ABBR.map(d => (
          <div key={d} className="text-center text-[9px] font-mono text-white/25 tracking-wider py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const isPast = year < todayYear
            || (year === todayYear && month < todayMonth)
            || (year === todayYear && month === todayMonth && day < todayDay);

          const isToday = year === todayYear && month === todayMonth && day === todayDay;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              disabled={isPast}
              onClick={() => onSelectDate(dateStr)}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-[11px] font-mono transition-all duration-150
                ${isPast ? 'text-white/15 cursor-not-allowed' : 'cursor-pointer'}
                ${isSelected ? 'text-black font-bold' : ''}
                ${isToday && !isSelected ? 'border font-semibold' : ''}
                ${!isPast && !isSelected && !isToday ? 'hover:bg-white/8 text-white/65' : ''}
              `}
              style={
                isSelected
                  ? { background: peak.color, color: '#000' }
                  : isToday
                  ? { borderColor: peak.color + '80', color: peak.color }
                  : undefined
              }
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingCalendar() {
  const t = useT();
  const TODAY = new Date(2026, 5, 12); // June 12 2026
  const [viewYear, setViewYear] = useState(2026);
  const [viewMonth, setViewMonth] = useState(5); // June

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const month2 = viewMonth === 11 ? 0 : viewMonth + 1;
  const year2 = viewMonth === 11 ? viewYear + 1 : viewYear;

  const isPastNav = viewYear < TODAY.getFullYear()
    || (viewYear === TODAY.getFullYear() && viewMonth <= TODAY.getMonth());

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
  };

  const emailLink = selectedDate
    ? `mailto:cabinasjimenez@gmail.com?subject=Charter Booking — ${formatDate(selectedDate)}&body=Hello Captain Jorge,%0A%0AI'd like to inquire about booking a charter for ${formatDate(selectedDate)}.%0A%0AParty size:%0ACharter type (Half-Day, Full Day, Combo):%0ASpecies interested in:%0A%0AThank you!`
    : 'mailto:cabinasjimenez@gmail.com?subject=Charter Booking Inquiry&body=Hello Captain Jorge, I would like to book a charter...';

  const QUICK_PICKS = [
    { label: t('calQuick1'), date: '2026-06-14' },
    { label: t('calQuick2'), date: '2026-06-22' },
    { label: t('calQuick3'), date: '2026-07-03' },
  ];

  return (
    <section id="booking-calendar" className="bg-[#04090d] border-t border-white/6 py-24 lg:py-28 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <span className="text-[10px] font-mono tracking-[3px] uppercase text-teal-400/70 block mb-3 flex items-center gap-2">
              <Calendar size={10} className="text-teal-400" />
              {t('calLabel')}
            </span>
            <h3 className="font-display text-[52px] sm:text-[72px] lg:text-[88px] text-white leading-none tracking-wide">
              {t('calTitle1')}
              <br />
              <span className="text-white/30">{t('calTitle2')}</span>
            </h3>
          </div>
          <div className="pb-3 space-y-2 max-w-xs">
            <p className="text-sm text-white/45 font-light leading-relaxed">
              {t('calDesc')}
            </p>
            <p className="font-mono text-[10px] text-teal-400/60 tracking-wider uppercase">
              {t('calIncluded')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

          {/* Calendar panel */}
          <div className="xl:col-span-9">
            <div className="bg-[#07110d] border border-white/8 rounded-2xl p-6">

              {/* Month nav */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  disabled={isPastNav}
                  className="h-8 w-8 rounded-lg border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase">
                  {MONTH_NAMES[viewMonth]} – {MONTH_NAMES[month2]} {year2}
                </span>
                <button
                  onClick={nextMonth}
                  className="h-8 w-8 rounded-lg border border-white/12 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors"
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* Two months side by side */}
              <div className="flex flex-col sm:flex-row gap-8">
                <CalendarMonth
                  year={viewYear}
                  month={viewMonth}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  todayYear={TODAY.getFullYear()}
                  todayMonth={TODAY.getMonth()}
                  todayDay={TODAY.getDate()}
                />
                <div className="hidden sm:block w-px bg-white/6 self-stretch" />
                <CalendarMonth
                  year={year2}
                  month={month2}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  todayYear={TODAY.getFullYear()}
                  todayMonth={TODAY.getMonth()}
                  todayDay={TODAY.getDate()}
                />
              </div>
            </div>

            {/* Season legend */}
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                { color: '#10b981', label: 'Yellowfin Tuna Prime' },
                { color: '#f97316', label: 'Dorado Season' },
                { color: '#3b82f6', label: 'Sailfish/Marlin Run' },
                { color: '#ef4444', label: 'Pargo & Roosterfish' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-[9px] font-mono text-white/35 tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="xl:col-span-3 flex flex-col gap-4">

            {/* Quick picks */}
            <div className="bg-[#07110d] border border-white/8 rounded-2xl p-5">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/35 mb-3">{t('calRatesTitle') === 'Tarifas de Charter' ? 'Acceso Rápido' : 'Quick Picks'}</p>
              <div className="space-y-2">
                {QUICK_PICKS.map(q => (
                  <button
                    key={q.label}
                    onClick={() => setSelectedDate(q.date)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-mono transition-colors ${
                      selectedDate === q.date
                        ? 'border-teal-500/50 bg-teal-500/10 text-teal-300'
                        : 'border-white/8 text-white/50 hover:border-white/20 hover:text-white/70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Zap size={10} className="text-teal-400 shrink-0" />
                      <div>
                        <p className="font-semibold">{q.label}</p>
                        <p className="text-[9px] text-white/30 mt-0.5">{formatDate(q.date)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Send inquiry */}
            <div className="bg-[#07110d] border border-white/8 rounded-2xl p-5 flex flex-col gap-3">
              {selectedDate ? (
                <>
                  <div className="bg-teal-500/8 border border-teal-500/20 rounded-xl px-3 py-2.5">
                    <p className="text-[9px] font-mono text-teal-400/70 tracking-wider uppercase mb-0.5">{t('calSelectedLabel')}</p>
                    <p className="text-sm font-semibold text-white">{formatDate(selectedDate)}</p>
                    <p className="text-[10px] font-mono text-teal-400/60 mt-0.5">
                      {PEAK_MONTHS[new Date(selectedDate).getMonth()].species}
                    </p>
                  </div>
                  <a
                    href={emailLink}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-sans font-bold text-xs tracking-widest uppercase rounded-xl hover:bg-teal-400 transition-colors"
                  >
                    <Mail size={12} />
                    {t('calSendBtn')}
                  </a>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-[10px] font-mono text-white/25 hover:text-white/50 transition-colors text-center"
                  >
                    {t('calClear')}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-xs text-white/40 font-light leading-relaxed">
                    Select a date on the calendar to send Jorge a booking inquiry with your date pre-filled.
                  </p>
                  <a
                    href="mailto:cabinasjimenez@gmail.com?subject=Charter Booking Inquiry&body=Hello Captain Jorge, I'd like to book a charter..."
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-white/15 text-white/50 font-sans text-xs tracking-widest uppercase rounded-xl hover:border-white/30 hover:text-white/80 transition-colors"
                  >
                    <Mail size={12} />
                    {t('calGeneralBtn')}
                  </a>
                </>
              )}
            </div>

            {/* Charter price reminder */}
            <div className="bg-[#07110d] border border-white/8 rounded-2xl p-5 space-y-3">
              <p className="text-[10px] font-mono tracking-widest uppercase text-white/30">{t('calRatesTitle')}</p>
              {[
                { name: 'Gulf Explorer', duration: '4h Half-Day', price: '$650' },
                { name: 'Offshore Run', duration: '8h Full Day', price: '$1,400' },
                { name: 'Tuna Mission', duration: '8h Full Day', price: '$1,400' },
                { name: 'Full Combo', duration: '10h Extended', price: '$1,800' },
              ].map(c => (
                <div key={c.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/65 font-sans">{c.name}</p>
                    <p className="text-[9px] font-mono text-white/30">{c.duration}</p>
                  </div>
                  <span className="font-mono text-xs text-teal-400 font-semibold">{c.price}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
