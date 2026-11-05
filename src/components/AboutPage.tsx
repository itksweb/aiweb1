import React from 'react';
import { COMPANY_INFO } from '../data/company';
import {
  Compass,
  Home,
  MapPin,
  ShieldCheck,
  Car,
  Headphones,
  CheckCircle,
  ArrowRight,
  Shield,
  Eye,
  Target,
  Sparkles,
} from 'lucide-react';
import { RoofLogo } from './RoofLogo';

interface AboutPageProps {
  onExploreProperties: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreProperties,
  onContactClick,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    Compass,
    Home,
    MapPin,
    ShieldCheck,
    Car,
    Headphones,
  };

  return (
    <div className="py-12 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Hero Banner */}
        <div className="bg-[#0e382c] rounded-3xl overflow-hidden text-white p-8 sm:p-14 lg:p-20 relative">
          <div className="max-w-3xl space-y-6 relative z-10">
            <RoofLogo variant="light" size="lg" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#e5ca80] uppercase block">
              About Roof Real Estate
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Modern Spaces Designed For Comfortable Living
            </h1>
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal">
              "{COMPANY_INFO.aboutText}"
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={onExploreProperties}
                className="px-6 py-3 bg-[#1b5e43] hover:bg-[#237a56] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Available Homes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContactClick}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors border border-white/20 cursor-pointer"
              >
                Connect With Us
              </button>
            </div>
          </div>

          {/* Decorative Subtle Architecture Geometric Backdrop */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden lg:block overflow-hidden">
            <img
              src="/public/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png"
              alt="Architecture aesthetic"
              className="w-full h-full object-cover object-left"
            />
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#0e382c]">
              Our Mission
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.mission}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#0e382c]">
              Our Vision
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {COMPANY_INFO.vision}
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
              Guiding Principles
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
              Core Values That Define Roof Real Estate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="text-xs font-bold text-[#1b5e43] font-mono">
                  0{idx + 1}.
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  {val.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Roof Real Estate - The 6 Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
              The Roof Advantage
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
              Why Choose Roof Real Estate?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Every property we represent reflects our firm commitment to architectural distinction, comfort, security, and transparent client care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPANY_INFO.whyChooseUs.map((pillar, index) => {
              const Icon = iconMap[pillar.iconName] || Home;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#1b5e43]/40 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="bg-gradient-to-r from-[#0e382c] to-[#144f3e] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-editorial text-3xl font-bold">
              Ready to Find Your Perfect Home?
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Let us help you take the next step towards owning your dream property. Speak directly with our team today.
            </p>
          </div>
          <button
            onClick={onContactClick}
            className="px-8 py-3.5 bg-white text-[#0e382c] hover:bg-[#eef7f2] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md whitespace-nowrap shrink-0"
          >
            Talk to Us Today
          </button>
        </div>
      </div>
    </div>
  );
};
