import React from 'react';
import { X, ExternalLink, Download } from 'lucide-react';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const flyerPath = '/public/assets/aistudio/Green_Modern_Luxury_Real_Estate_Sale_Flyer_f80aa634.png';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-5 py-3.5 bg-[#0e382c] text-white flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider">
            Original Promotional Flyer Reference
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            aria-label="Close flyer modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex items-center justify-center bg-slate-100">
          <img
            src={flyerPath}
            alt="Roof Real Estate Original Promotional Flyer"
            className="max-h-[75vh] w-auto object-contain rounded-lg shadow-md border border-slate-300"
          />
        </div>

        <div className="p-3 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
          Roof Real Estate promotional flyer — source of colors, logo, typography and property standards.
        </div>
      </div>
    </div>
  );
};
