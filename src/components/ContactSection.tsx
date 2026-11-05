import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/company';
import { PROPERTIES } from '../data/properties';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Globe,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Settings,
  Inbox,
  Navigation,
} from 'lucide-react';

interface ContactSectionProps {
  preselectedProperty?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedProperty = '',
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    propertyTitle: preselectedProperty,
    message: '',
    website_bot_check: '', // honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    mode?: string;
    note?: string;
  } | null>(null);

  // System status & inquiries modal for owner/testing
  const [systemStatus, setSystemStatus] = useState<{
    smtpConfigured: boolean;
    ownerEmail: string;
    smtpHost: string;
    antiSpamEnabled: boolean;
  } | null>(null);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [inquiriesList, setInquiriesList] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Map settings simulation
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  useEffect(() => {
    // Fetch backend configuration status
    fetch('/api/config-status')
      .then((res) => res.json())
      .then((data) => setSystemStatus(data))
      .catch(() => {});
  }, []);

  const handleOpenOwnerModal = async () => {
    setShowOwnerModal(true);
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success) {
        setInquiriesList(data.inquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: data.message,
          mode: data.mode,
          note: data.note,
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          propertyTitle: '',
          message: '',
          website_bot_check: '',
        });
      } else {
        setResult({
          success: false,
          message: data.error || 'Failed to send message. Please review your input and try again.',
        });
      }
    } catch (err) {
      setResult({
        success: false,
        message: 'Unable to connect to the server. Please check your internet connection or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-[#f8faf9]" id="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-[0.2em] text-[#1b5e43] uppercase block">
            Direct Communication
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-slate-900">
            Contact Roof Real Estate
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Have a question about one of our properties or looking to explore residential opportunities? Reach out directly to the company owner below.
          </p>
        </div>

        {/* Main Grid: Form (Left) & Company Details + Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-[#0e382c]">
                  Send a Direct Message
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Your message will be delivered directly to the owner. All submissions are validated and protected against spam.
                </p>
              </div>

              {/* Status Indicator */}
              <button
                onClick={handleOpenOwnerModal}
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-[#0e382c] border border-slate-200 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
                title="View Owner Configuration & Inquiries Inbox"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Owner Inbox</span>
              </button>
            </div>

            {/* Submission Feedback Banner */}
            {result && (
              <div
                className={`p-4 rounded-xl text-xs space-y-1 ${
                  result.success
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-red-50 text-red-900 border border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {result.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{result.success ? 'Message Successfully Sent' : 'Message Not Sent'}</span>
                </div>
                <p className="leading-relaxed pl-6">{result.message}</p>
                {result.note && (
                  <p className="pl-6 text-[11px] text-slate-500 italic mt-1">
                    {result.note}
                  </p>
                )}
                {result.success && (
                  <div className="pl-6 pt-2">
                    <button
                      onClick={() => setResult(null)}
                      className="px-3 py-1 bg-white border border-emerald-300 rounded font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam Honeypot Field (invisible to regular users) */}
              <input
                type="text"
                name="website_bot_check"
                value={formData.website_bot_check}
                onChange={(e) => setFormData({ ...formData, website_bot_check: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* 1. Full Name & 2. Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Michael Harris"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. michael.harris@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* 3. Phone Number & 4. Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +1 (555) 012-3456"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Private Viewing Request"
                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* 5. Property of Interest (Dropdown populated from properties) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Property of Interest <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={formData.propertyTitle}
                  onChange={(e) => setFormData({ ...formData, propertyTitle: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors"
                >
                  <option value="">General Property Inquiry / Custom Request</option>
                  {PROPERTIES.map((prop) => (
                    <option key={prop.id} value={prop.title}>
                      {prop.title} ({prop.priceDisplay} - {prop.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe what you are looking for, preferred move-in timeline, or any specific questions regarding our properties..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-slate-300 focus:border-[#1b5e43] focus:ring-1 focus:ring-[#1b5e43] outline-hidden transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#0e382c] hover:bg-[#1b5e43] text-white text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing & Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Direct reply sent to your email</span>
                <span>Protected with honeypot & IP rate-limit</span>
              </div>
            </form>
          </div>

          {/* Right Column: Company Details & Configurable Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            {/* Company Contact Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-6 space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-[#0e382c]">
                Company Contact Information
              </h2>

              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone (From Flyer Placeholder)</span>
                    <a
                      href={`tel:${COMPANY_INFO.phoneRaw}`}
                      className="text-slate-900 font-bold hover:text-[#1b5e43] text-sm tabular-nums"
                    >
                      {COMPANY_INFO.phone}
                    </a>
                    <span className="block text-[11px] text-slate-400 mt-0.5">
                      Direct click-to-call enabled
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Official Email</span>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="text-slate-900 font-semibold hover:text-[#1b5e43]"
                    >
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                {/* Social Media Handle */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Social Media Handle</span>
                    <span className="text-slate-900 font-semibold">
                      {COMPANY_INFO.socialHandle}
                    </span>
                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href={COMPANY_INFO.socialUrls.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-md bg-slate-100 hover:bg-[#1b5e43] text-slate-600 hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={COMPANY_INFO.socialUrls.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-md bg-slate-100 hover:bg-[#1b5e43] text-slate-600 hover:text-white transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={COMPANY_INFO.socialUrls.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-md bg-slate-100 hover:bg-[#1b5e43] text-slate-600 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={COMPANY_INFO.socialUrls.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-md bg-slate-100 hover:bg-[#1b5e43] text-slate-600 hover:text-white transition-colors"
                        aria-label="Twitter / X"
                      >
                        <Twitter className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Office Address</span>
                    <span className="text-slate-900 font-medium">
                      {COMPANY_INFO.address.street}, {COMPANY_INFO.address.area}
                    </span>
                    <span className="block text-slate-500 text-[11px]">
                      {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
                    </span>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] text-[#1b5e43] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 block">Working Hours</span>
                    <span className="text-slate-900 font-medium">
                      {COMPANY_INFO.officeHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Location Placeholder (Configurable) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden space-y-0">
              <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-[#1b5e43]" />
                  <span>Google Maps Location</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMapType('roadmap')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      mapType === 'roadmap' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Map
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                      mapType === 'satellite' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'
                    }`}
                  >
                    Satellite
                  </button>
                </div>
              </div>

              {/* Interactive Stylized Real Estate Map Canvas */}
              <div className="relative h-64 bg-slate-200 overflow-hidden flex items-center justify-center">
                {/* Visual grid / road simulation */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    mapType === 'satellite' ? 'bg-[#1a2d26]' : 'bg-[#e5ece8]'
                  }`}
                >
                  {/* Stylized vector map grid */}
                  <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#257857" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {/* Simulated arterial avenues */}
                    <line x1="0" y1="120" x2="600" y2="120" stroke="#166534" strokeWidth="6" />
                    <line x1="200" y1="0" x2="200" y2="300" stroke="#166534" strokeWidth="5" />
                    <line x1="380" y1="0" x2="380" y2="300" stroke="#166534" strokeWidth="4" />
                  </svg>
                </div>

                {/* Map Pin Landmark */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="w-10 h-10 rounded-full bg-[#0e382c] border-2 border-white shadow-xl flex items-center justify-center text-white">
                    <MapPin className="w-5 h-5 text-[#e5ca80]" />
                  </div>
                  <div className="mt-1 px-3 py-1 bg-white/95 backdrop-blur-md rounded-md shadow-md text-[11px] font-bold text-[#0e382c] whitespace-nowrap border border-slate-200">
                    Roof Real Estate HQ
                  </div>
                </div>

                {/* Configurable Address note overlay */}
                <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md p-2 rounded-lg text-[10px] text-slate-600 flex items-center justify-between border border-slate-200">
                  <span className="truncate">
                    100 Grand Panorama Ridge, Metropolis Vista
                  </span>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent('100 Grand Panorama Ridge, Metropolis Vista')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#1b5e43] font-semibold flex items-center gap-1 hover:underline ml-2 whitespace-nowrap"
                  >
                    <span>Directions</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Inbox & Configuration Inspector Modal */}
      {showOwnerModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            <div className="px-6 py-4 bg-[#0e382c] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-emerald-300" />
                <h3 className="font-bold text-base">Owner Inbox & System Status</h3>
              </div>
              <button
                onClick={() => setShowOwnerModal(false)}
                className="text-white/70 hover:text-white text-xs font-semibold px-2 py-1 bg-white/10 rounded"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              {/* Configuration Status */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">System Backend Configuration</h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="font-semibold block text-slate-800">Target Owner Email:</span>
                    <span>{systemStatus?.ownerEmail || 'owner@roofrealestate.com'}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800">SMTP Host Relay:</span>
                    <span>{systemStatus?.smtpHost || 'Waiting for .env credentials'}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800">Anti-Spam Rate Limit:</span>
                    <span className="text-emerald-700 font-semibold">Active (5 req / 10 min window)</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-slate-800">Honeypot Trap:</span>
                    <span className="text-emerald-700 font-semibold">Active (`website_bot_check`)</span>
                  </div>
                </div>
              </div>

              {/* Recorded Inquiries */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">
                    Inquiries Received ({inquiriesList.length})
                  </h4>
                  <button
                    onClick={handleOpenOwnerModal}
                    className="text-xs text-[#1b5e43] font-semibold hover:underline"
                  >
                    Refresh
                  </button>
                </div>

                {loadingInquiries ? (
                  <div className="py-8 text-center text-slate-400">Loading inquiries...</div>
                ) : inquiriesList.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500">
                    No inquiries recorded yet. Submit the contact form to see real submissions appear here in real-time.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {inquiriesList.map((item: any) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-2"
                      >
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>{item.name} ({item.email})</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {new Date(item.submittedAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          <span className="font-semibold text-slate-700">Subject:</span> {item.subject} ·{' '}
                          <span className="font-semibold text-slate-700">Property:</span> {item.propertyTitle} ·{' '}
                          <span className="font-semibold text-slate-700">Phone:</span> {item.phone}
                        </div>
                        <p className="bg-slate-50 p-2.5 rounded text-slate-700 whitespace-pre-wrap">
                          {item.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
