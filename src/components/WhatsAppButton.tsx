import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/company';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    COMPANY_INFO.whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick message tooltip popup */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-fadeIn text-xs text-slate-800">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div className="flex items-center gap-2 font-bold text-[#0e382c]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Roof Real Estate Chat</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600 mb-3 leading-relaxed">
            Connect with our property team directly on WhatsApp for instant inquiries, floorplans, or viewing schedules.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-300/40"
        aria-label="Chat on WhatsApp with Roof Real Estate"
        title="Chat with Roof Real Estate"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};
