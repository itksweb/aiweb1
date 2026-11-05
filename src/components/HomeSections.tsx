import React from 'react';
import { Property, PROPERTIES } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { COMPANY_INFO } from '../data/company';
import {
  Compass,
  Home,
  MapPin,
  ShieldCheck,
  Car,
  Headphones,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface HomeFeaturedProps {
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
  onViewAllProperties: () => void;
}

export const HomeFeaturedSection: React.FC<HomeFeaturedProps> = ({
  onViewDetails,
  onEnquire,
  onViewAllProperties,
}) => {
  // Show top featured properties
  const featured = PROPERTIES.slice(0, 3);

  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
              Curated Portfolio
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
              Featured Residential Properties
            </h2>
            <p className="text-sm text-slate-600">
              Handpicked residences combining modern architectural form, thoughtful layouts, and verified security standards.
            </p>
          </div>

          <button
            onClick={onViewAllProperties}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0e382c] hover:text-[#1b5e43] bg-white border border-slate-200 hover:border-[#1b5e43] px-5 py-3 rounded-lg transition-all shadow-2xs hover:shadow-sm cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            <span>Explore All {PROPERTIES.length} Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={onViewDetails}
              onEnquire={onEnquire}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface HomeAboutBriefProps {
  onLearnMore: () => void;
  onContact: () => void;
}

export const HomeAboutBrief: React.FC<HomeAboutBriefProps> = ({
  onLearnMore,
  onContact,
}) => {
  return (
    <section className="py-20 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Imagery Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-4/3 shadow-xl border border-slate-200">
              <img
                src="/src/assets/images/estate_modern_kitchen_1793865076392.jpg"
                alt="Modern luxury kitchen interior"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Inset Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0e382c] text-white p-5 rounded-xl shadow-xl max-w-xs border border-[#1b5e43]/50">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#e5ca80] block mb-1">
                The Roof Standard
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                Modern kitchens, 3–4 bedrooms, 24/7 security, and private parking guaranteed in our portfolio.
              </p>
            </div>
          </div>

          {/* Copy from Brief */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
              About Roof Real Estate
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              A Rewarding Experience In Finding Your Next Home
            </h2>
            <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic border-l-2 border-[#1b5e43] pl-4">
              "{COMPANY_INFO.aboutText}"
            </blockquote>
            <p className="text-sm text-slate-600 leading-relaxed">
              We focus on delivering genuine architectural value and reliable service. Whether you are stepping into your first modern duplex starting from $50,000 or acquiring an executive hillside villa, our team provides honest guidance, transparent documentation, and direct owner accessibility.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onLearnMore}
                className="px-6 py-3 bg-[#0e382c] hover:bg-[#1b5e43] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Read More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContact}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUsSection: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Compass,
    Home,
    MapPin,
    ShieldCheck,
    Car,
    Headphones,
  };

  return (
    <section className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
            Why Choose Us
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Exceptional Standards For Modern Living
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every property selected by Roof Real Estate adheres to our strict criteria of design integrity, occupant comfort, prime accessibility, and robust security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMPANY_INFO.whyChooseUs.map((pillar, idx) => {
            const Icon = iconMap[pillar.iconName] || Home;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-[#1b5e43]/40 shadow-xs hover:shadow-lg transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface HomeCTAProps {
  onContactClick: () => void;
}

export const HomeCTASection: React.FC<HomeCTAProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#07221a] via-[#0e382c] to-[#124a3a] text-white p-8 sm:p-14 lg:p-16 shadow-2xl">
          {/* Background architectural photo with high opacity scrim */}
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
            <img
              src="/src/assets/images/penthouse_terrace_view_1793865076844.jpg"
              alt="Penthouse terrace architectural view"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold tracking-[0.25em] text-[#e5ca80] uppercase block">
              Direct Owner Consultation
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Let us help you take the next step towards owning your dream property. Reach out directly to discuss available options or schedule an exclusive walkthrough.
            </p>
            <div className="pt-3">
              <button
                onClick={onContactClick}
                className="px-8 py-3.5 bg-white text-[#0e382c] hover:bg-[#eef7f2] font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>Talk to Us Today</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
