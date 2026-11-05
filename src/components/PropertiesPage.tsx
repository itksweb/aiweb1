import React, { useState, useMemo } from 'react';
import { Property, PROPERTIES } from '../data/properties';
import { PropertyCard } from './PropertyCard';
import { Search, Filter, SlidersHorizontal, RotateCcw, Building2 } from 'lucide-react';

interface PropertiesPageProps {
  onViewDetails: (property: Property) => void;
  onEnquire: (property: Property) => void;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onViewDetails,
  onEnquire,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'beds'>('featured');

  // Extract unique neighborhoods and property types
  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    PROPERTIES.forEach((p) => set.add(p.neighborhood));
    return Array.from(set);
  }, []);

  const propertyTypes = useMemo(() => {
    const set = new Set<string>();
    PROPERTIES.forEach((p) => set.add(p.propertyType));
    return Array.from(set);
  }, []);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((item) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      // Property Type
      if (selectedType !== 'all' && item.propertyType !== selectedType) {
        return false;
      }

      // Bedrooms
      if (selectedBedrooms !== 'all') {
        const beds = parseInt(selectedBedrooms, 10);
        if (beds === 4 && item.bedrooms < 4) return false;
        if (beds === 3 && item.bedrooms !== 3) return false;
        if (beds === 5 && item.bedrooms < 5) return false;
      }

      // Neighborhood
      if (selectedNeighborhood !== 'all' && item.neighborhood !== selectedNeighborhood) {
        return false;
      }

      // Price Range
      if (selectedPriceRange !== 'all') {
        if (selectedPriceRange === 'under-100k' && item.price >= 100000) return false;
        if (selectedPriceRange === '100k-300k' && (item.price < 100000 || item.price > 300000)) return false;
        if (selectedPriceRange === '300k-500k' && (item.price < 300000 || item.price > 500000)) return false;
        if (selectedPriceRange === 'above-500k' && item.price <= 500000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'beds') return b.bedrooms - a.bedrooms;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, selectedType, selectedBedrooms, selectedNeighborhood, selectedPriceRange, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedBedrooms('all');
    setSelectedNeighborhood('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedType !== 'all' ||
    selectedBedrooms !== 'all' ||
    selectedNeighborhood !== 'all' ||
    selectedPriceRange !== 'all';

  return (
    <div className="py-12 bg-[#f8faf9] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
            Residential Portfolio
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-slate-900">
            Discover Roof Real Estate Properties
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Explore our curated residential catalog spanning modern entry duplexes starting from $50,000 to bespoke architectural hillside estates.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 p-5 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, location, or feature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-slate-500 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
              </select>
            </div>
          </div>

          {/* Filtering Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
            {/* Property Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#1b5e43] outline-hidden"
              >
                <option value="all">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Bedrooms
              </label>
              <select
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#1b5e43] outline-hidden"
              >
                <option value="all">Any Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Price Range
              </label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#1b5e43] outline-hidden"
              >
                <option value="all">All Prices</option>
                <option value="under-100k">Under $100,000</option>
                <option value="100k-300k">$100,000 – $300,000</option>
                <option value="300k-500k">$300,000 – $500,000</option>
                <option value="above-500k">Above $500,000</option>
              </select>
            </div>

            {/* Neighborhood / Location */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Location
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="w-full text-xs py-2 px-3 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#1b5e43] outline-hidden"
              >
                <option value="all">All Locations</option>
                {neighborhoods.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset Filters Option */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-2 text-xs">
              <span className="text-slate-500">
                Found {filteredProperties.length} matching {filteredProperties.length === 1 ? 'property' : 'properties'}
              </span>
              <button
                onClick={resetFilters}
                className="text-[#1b5e43] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={onViewDetails}
                onEnquire={onEnquire}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#f0f5f2] text-[#1b5e43] flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-slate-800">
              No Properties Found
            </h3>
            <p className="text-xs text-slate-600">
              We couldn't find any listings matching your active filters. Try broadening your criteria or reset filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-[#0e382c] hover:bg-[#1b5e43] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
