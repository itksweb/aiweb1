import React from 'react';
import { Property } from '../data/properties';
import { BedDouble, Bath, Square, MapPin, ArrowUpRight, MessageSquareText } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onEnquire,
}) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#1b5e43]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Property Photography */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Price Tag badge */}
        <div className="absolute bottom-3 left-3 bg-[#0e382c]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-lg border border-white/20 shadow-md">
          <span className="text-[10px] uppercase tracking-wider block text-emerald-300 font-medium">Price</span>
          <span className="text-base font-bold tabular-nums leading-none">{property.priceDisplay}</span>
        </div>

        {/* Property Type / Tag */}
        {property.tag && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0e382c] px-2.5 py-1 rounded-md text-xs font-semibold shadow-xs">
            {property.tag}
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#1b5e43] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(property)}
            className="font-editorial text-xl font-bold text-slate-900 group-hover:text-[#0e382c] transition-colors cursor-pointer line-clamp-1"
          >
            {property.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 font-medium">
            <BedDouble className="w-4 h-4 text-[#1b5e43]" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Bath className="w-4 h-4 text-[#1b5e43]" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div className="flex items-center gap-1.5 font-medium">
            <Square className="w-4 h-4 text-[#1b5e43]" />
            <span>{property.areaSqFt.toLocaleString()} sq ft</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onViewDetails(property)}
            className="py-2.5 px-3 rounded-lg border border-slate-200 text-slate-700 hover:text-[#0e382c] hover:bg-[#f6faf8] hover:border-[#1b5e43]/40 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Property</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onEnquire(property)}
            className="py-2.5 px-3 rounded-lg bg-[#0e382c] hover:bg-[#1b5e43] text-white text-xs font-semibold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </article>
  );
};
