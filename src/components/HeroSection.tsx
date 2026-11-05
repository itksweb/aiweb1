import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface HeroSectionProps {
  onExploreProperties: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProperties,
  onContactClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0a2920] text-white">
      {/* Background Photography with Sophisticated Dark Forest Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/villa_horizon_dusk_1793865076409.jpg"
          alt="Roof Real Estate Modern Architectural Residence at Twilight"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrims ensuring WCAG AA legibility across all screens */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072119]/95 via-[#0b2f24]/85 to-[#0b2f24]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#072119] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36 min-h-[640px] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy & CTAs */}
          <div className="lg:col-span-8 space-y-6">
            {/* Flyer-inspired Price Badge */}
            <div className="inline-flex items-center gap-3">
              <div className="bg-[#1b5e43] text-white px-4 py-2 rounded-lg font-bold tracking-wider text-xs uppercase flex items-center gap-2 border border-emerald-400/30 shadow-lg">
                <span className="text-emerald-200 text-[10px] tracking-widest font-medium">START FROM</span>
                <span className="text-sm font-extrabold text-white tracking-normal tabular-nums">$50,000</span>
              </div>
              <span className="text-xs text-emerald-200/90 font-medium tracking-wide">
                Quality residential homes & estates
              </span>
            </div>

            {/* Flyer Headline Lockup: Flowing Script + Majestic Serif */}
            <div className="space-y-1">
              <span className="font-script text-4xl sm:text-5xl md:text-6xl text-[#e5ca80] block -mb-2 transform -rotate-1 select-none">
                Your Perfect
              </span>
              <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                PROPERTY AWAITS
              </h1>
            </div>

            {/* Supporting Text from the Flyer */}
            <p className="text-lg sm:text-xl text-slate-200/95 font-normal max-w-2xl leading-relaxed tracking-wide">
              {COMPANY_INFO.tagline.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}.
              {' '}Discover quality residential properties combining modern design, comfort, security, and exceptional long-term value.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProperties}
                className="px-7 py-3.5 bg-[#1b5e43] hover:bg-[#237a56] text-white font-semibold text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2.5"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onContactClick}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-lg backdrop-blur-md border border-white/25 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#e5ca80]" />
                <span>Contact Us</span>
              </button>
            </div>

            {/* Editorial Trust Markers */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Direct Owner Communication</span>
              </div>
              <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Verified Architectural Listings</span>
              </div>
              <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>24/7 Security & Private Parking</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Interactive Feature Window / Flyer Reference Showcase */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md p-5 shadow-2xl space-y-4">
              <div className="relative rounded-xl overflow-hidden aspect-4/3 group">
                <img
                  src="/src/assets/images/residence_living_room_1793865077101.jpg"
                  alt="Modern architectural living room interior"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-[#e5ca80] uppercase tracking-wider block">
                    Modern Architectural Standard
                  </span>
                  <p className="text-xs text-white/90 font-medium">
                    Double-height open living with panoramic glazing
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Property Range</span>
                  <span className="font-semibold text-white tabular-nums">$50,000 – $495,000+</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-300">Bedrooms Available</span>
                  <span className="font-semibold text-white">3 – 4 Bedrooms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Security Standard</span>
                  <span className="font-semibold text-emerald-300">24/7 Monitored</span>
                </div>
              </div>

              <button
                onClick={onExploreProperties}
                className="w-full py-2.5 text-center text-xs font-semibold text-[#0a2920] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View All Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
