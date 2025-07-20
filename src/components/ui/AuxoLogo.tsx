'use client';

interface AuxoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AuxoLogo({ size = 'md', className = '' }: AuxoLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`grid grid-cols-2 gap-px ${sizeClasses[size]} ${className}`} style={{ aspectRatio: '1/1' }}>
      {/* A */}
      <div className="bg-auxo-green flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
        <span className={`font-bold text-rich-black ${textSizeClasses[size]}`}>A</span>
      </div>
      {/* U */}
      <div className="bg-auxo-green flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
        <span className={`font-bold text-rich-black ${textSizeClasses[size]}`}>U</span>
      </div>
      {/* X */}
      <div className="bg-auxo-green flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
        <span className={`font-bold text-rich-black ${textSizeClasses[size]}`}>X</span>
      </div>
      {/* O */}
      <div className="bg-auxo-green flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
        <span className={`font-bold text-rich-black ${textSizeClasses[size]}`}>O</span>
      </div>
    </div>
  );
}