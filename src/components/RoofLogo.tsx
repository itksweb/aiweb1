import React from 'react';

interface RoofLogoProps {
  variant?: 'light' | 'dark' | 'emerald';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RoofLogo: React.FC<RoofLogoProps> = ({
  variant = 'dark',
  className = '',
  showText = true,
  size = 'md',
}) => {
  // Styles based on variant
  const iconStroke =
    variant === 'light'
      ? '#ffffff'
      : variant === 'emerald'
      ? '#1b5e43'
      : '#0e382c';

  const textColorTop =
    variant === 'light'
      ? 'text-white'
      : variant === 'emerald'
      ? 'text-[#1b5e43]'
      : 'text-[#0e382c]';

  const textColorBottom =
    variant === 'light'
      ? 'text-white/85'
      : variant === 'emerald'
      ? 'text-[#166534]'
      : 'text-[#1b5e43]';

  const sizeClasses = {
    sm: { icon: 'w-7 h-7', title: 'text-sm', sub: 'text-[11px]' },
    md: { icon: 'w-9 h-9', title: 'text-base', sub: 'text-xs' },
    lg: { icon: 'w-12 h-12', title: 'text-xl', sub: 'text-sm' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Recreated Logo Mark from the Flyer: Twin gable roof house with window grid */}
      <div className={`relative ${sizeClasses.icon} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-xs"
        >
          {/* Main House Outline with Gable Peak */}
          <path
            d="M8 22L24 8L40 22V42H8V22Z"
            stroke={iconStroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Second overlapping peak roofline (as on the flyer) */}
          <path
            d="M18 13.5L24 8L30 13.5"
            stroke={iconStroke}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Centered 4-pane architectural window */}
          <rect
            x="18"
            y="26"
            width="12"
            height="10"
            rx="1"
            stroke={iconStroke}
            strokeWidth="2.5"
          />
          <line
            x1="24"
            y1="26"
            x2="24"
            y2="36"
            stroke={iconStroke}
            strokeWidth="2"
          />
          <line
            x1="18"
            y1="31"
            x2="30"
            y2="31"
            stroke={iconStroke}
            strokeWidth="2"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight uppercase ${sizeClasses.title} ${textColorTop}`}>
            Roof Real
          </span>
          <span className={`font-medium tracking-wider uppercase mt-0.5 ${sizeClasses.sub} ${textColorBottom}`}>
            Estate
          </span>
        </div>
      )}
    </div>
  );
};
