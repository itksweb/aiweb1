import React from 'react';
import { BedDouble, Utensils, MapPin, ShieldCheck, Car, ChevronRight } from 'lucide-react';

interface HighlightsBarProps {
  onHighlightSelect?: (category: string) => void;
}

export const HighlightsBar: React.FC<HighlightsBarProps> = ({ onHighlightSelect }) => {
  const highlights = [
    {
      id: 'bedrooms',
      title: '3–4 Bedrooms',
      subtitle: 'Spacious Master Suites',
      icon: BedDouble,
    },
    {
      id: 'kitchen',
      title: 'Modern Kitchen',
      subtitle: 'Premium Chef Layouts',
      icon: Utensils,
    },
    {
      id: 'location',
      title: 'Prime Location',
      subtitle: 'Panoramic & Accessible',
      icon: MapPin,
    },
    {
      id: 'security',
      title: '24/7 Security',
      subtitle: 'Round-The-Clock Patrol',
      icon: ShieldCheck,
    },
    {
      id: 'parking',
      title: 'Private Parking',
      subtitle: 'Dedicated Enclosed Bays',
      icon: Car,
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Banner from flyer: "MODERN SPACES DESIGNED FOR COMFORTABLE LIVING" */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden">
        {/* Top Announcement Bar */}
        <div className="bg-[#0e382c] px-6 py-3.5 text-center text-white border-b border-[#1b5e43]">
          <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-emerald-200">
            Modern Spaces Designed For Comfortable Living
          </h2>
        </div>

        {/* 5 Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 p-2 sm:p-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onHighlightSelect?.(item.id)}
                className="group p-4 flex flex-col items-center text-center hover:bg-[#f6faf8] transition-colors rounded-xl cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eef7f2] group-hover:bg-[#1b5e43] text-[#1b5e43] group-hover:text-white flex items-center justify-center transition-all duration-300 mb-3 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-semibold text-sm text-slate-900 group-hover:text-[#0e382c] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
