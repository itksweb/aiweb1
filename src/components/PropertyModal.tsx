import React, { useState } from 'react';
import { Property } from '../data/properties';
import {
  X,
  BedDouble,
  Bath,
  Square,
  Car,
  MapPin,
  ShieldCheck,
  Utensils,
  CheckCircle2,
  Send,
  Loader2,
  Phone,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'details' | 'enquire';
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
  initialMode = 'details',
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mode, setMode] = useState<'details' | 'enquire'>(initialMode);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website_bot_check: '', // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    mode?: string;
  } | null>(null);

  if (!isOpen || !property) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Property Inquiry: ${property.title}`,
          propertyTitle: property.title,
          message: formData.message || `I am inquiring about ${property.title} listed at ${property.priceDisplay}. Please contact me with more information.`,
          website_bot_check: formData.website_bot_check,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          mode: data.mode,
        });
        setFormData({ name: '', email: '', phone: '', message: '', website_bot_check: '' });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Failed to submit inquiry. Please try again.',
        });
      }
    } catch (err) {
      setSubmitResult({
        success: false,
        message: 'Could not connect to the server. Please check your network or call directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto border border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0e382c] text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
              Roof Real Estate Property Details
            </span>
            <h2 className="font-editorial text-xl sm:text-2xl font-bold leading-tight">
              {property.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Gallery View */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-900 shadow-md">
              <img
                src={property.gallery[activeImageIndex] || property.image}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md font-mono">
                {activeImageIndex + 1} / {property.gallery.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {property.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#1b5e43] scale-102 shadow-sm'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className="bg-[#f8faf9] rounded-xl p-4 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Price</span>
              <span className="text-xl font-bold text-[#0e382c] tabular-nums">{property.priceDisplay}</span>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Bedrooms</span>
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-base mt-1">
                <BedDouble className="w-4 h-4 text-[#1b5e43]" />
                <span>{property.bedrooms}</span>
              </div>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Bathrooms</span>
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-base mt-1">
                <Bath className="w-4 h-4 text-[#1b5e43]" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
            <div className="p-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Living Area</span>
              <div className="flex items-center justify-center gap-1.5 font-bold text-slate-800 text-base mt-1">
                <Square className="w-4 h-4 text-[#1b5e43]" />
                <span>{property.areaSqFt.toLocaleString()} sq ft</span>
              </div>
            </div>
          </div>

          {/* Location & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-[#1b5e43]" />
              <span>{property.location}</span>
            </div>
            <h4 className="font-editorial text-2xl font-bold text-slate-900">
              About This Residence
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {property.fullDescription}
            </p>
          </div>

          {/* Key Flyer Amenities Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0e382c]">
                <Utensils className="w-4 h-4 text-[#1b5e43]" />
                <span>Modern Kitchen</span>
              </div>
              <p className="text-xs text-slate-600">
                {property.amenities.kitchenDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0e382c]">
                <ShieldCheck className="w-4 h-4 text-[#1b5e43]" />
                <span>24/7 Security</span>
              </div>
              <p className="text-xs text-slate-600">
                {property.amenities.securityDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0e382c]">
                <Car className="w-4 h-4 text-[#1b5e43]" />
                <span>Private Parking</span>
              </div>
              <p className="text-xs text-slate-600">
                {property.amenities.parkingDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0e382c]">
                <MapPin className="w-4 h-4 text-[#1b5e43]" />
                <span>Prime Location</span>
              </div>
              <p className="text-xs text-slate-600">
                {property.amenities.locationDesc}
              </p>
            </div>
          </div>

          {/* Additional Features List */}
          <div className="pt-2">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Property Features & Inclusions
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {property.amenities.featuresList.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1b5e43] shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Property Inquiry Form */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-[#f4f7f5] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-editorial text-xl font-bold text-[#0e382c]">
                  Enquire Directly About This Property
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Send a direct message to the Roof Real Estate owner regarding {property.title}.
                </p>
              </div>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#1b5e43] hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
            </div>

            {submitResult ? (
              <div
                className={`p-4 rounded-xl text-xs ${
                  submitResult.success
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                <p className="font-bold text-sm mb-1">
                  {submitResult.success ? 'Inquiry Successfully Transmitted' : 'Submission Issue'}
                </p>
                <p>{submitResult.message}</p>
                {submitResult.success && (
                  <button
                    onClick={() => setSubmitResult(null)}
                    className="mt-3 px-3 py-1 bg-white text-emerald-800 rounded font-semibold text-xs border border-emerald-300"
                  >
                    Send Another Message
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="website_bot_check"
                  value={formData.website_bot_check}
                  onChange={(e) => setFormData({ ...formData, website_bot_check: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. eleanor@example.com"
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message to Owner *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={`Hello, I would like to schedule a viewing or inquire about ${property.title}...`}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#0e382c] hover:bg-[#1b5e43] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Inquiry to Owner...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Property Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
