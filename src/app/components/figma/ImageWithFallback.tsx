import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Image, ImageOff, Cpu, Network } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Texte alternatif si l'image ne charge pas */
  fallbackText?: string;
  /** Type de fallback : 'icon' | 'text' | 'minimal' | 'platform' */
  fallbackType?: 'icon' | 'text' | 'minimal' | 'platform';
  /** Icône à afficher si fallbackType='icon' */
  fallbackIcon?: 'image' | 'cpu' | 'network';
  /** Couleur d'accent pour le fallback */
  accentColor?: string;
  /** Afficher une animation de chargement */
  showLoading?: boolean;
}

// SVG de fallback encodé en base64 adapté au thème sombre
const DARK_ERROR_IMG_SRC =
  'data:image/svg+xml;base64,' + btoa(`
<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="12" fill="#0f0f23" opacity="0.8"/>
  <rect x="20" y="20" width="80" height="80" rx="8" fill="none" stroke="#00d9ff" stroke-width="2" stroke-dasharray="8 4" opacity="0.4"/>
  <path d="M45 55 L55 45 L65 60 L75 50" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
  <circle cx="70" cy="42" r="5" fill="#00d9ff" opacity="0.5"/>
  <text x="60" y="100" text-anchor="middle" fill="#6b7280" font-size="10" font-family="sans-serif">Image non disponible</text>
</svg>
`);

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(props.showLoading ?? true);

  const handleError = () => {
    setDidError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const {
    src,
    alt,
    style,
    className,
    fallbackText = 'Image non disponible',
    fallbackType = 'platform',
    fallbackIcon = 'image',
    accentColor = '#00d9ff',
    showLoading = true,
    ...rest
  } = props;

  // Fallback Icon Component
  const FallbackIconComponent = fallbackIcon === 'cpu' ? Cpu : fallbackIcon === 'network' ? Network : Image;

  // Loading State
  if (isLoading && !didError && showLoading) {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#0f0f23]/60 border border-[#00d9ff]/10 rounded-lg ${className ?? ''}`}
        style={style}
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >
          <Cpu className="w-8 h-8 text-[#00d9ff]/50" />
          <span className="text-xs text-[#6b7280]">Chargement...</span>
        </motion.div>
      </div>
    );
  }

  // Error State
  if (didError) {
    // Type: Platform (adapté au design system)
    if (fallbackType === 'platform') {
      return (
        <div
          className={`inline-flex items-center justify-center bg-gradient-to-br from-[#0f0f23]/90 to-[#0f0f23]/60 border border-[#00d9ff]/20 rounded-xl backdrop-blur-sm overflow-hidden ${className ?? ''}`}
          style={style}
        >
          <div className="flex flex-col items-center gap-3 p-6 text-center">
            {/* Cercle décoratif */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <ImageOff className="w-8 h-8" style={{ color: accentColor, opacity: 0.6 }} />
              </div>
              {/* Anneau animé */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed"
                style={{ borderColor: `${accentColor}30` }}
              />
            </div>
            
            {/* Texte */}
            <div>
              <p className="text-sm text-[#e8e9f3] font-semibold" style={{ fontFamily: 'var(--font-body)' }}>
                {alt || fallbackText}
              </p>
              <p className="text-xs text-[#6b7280] mt-1">Image non disponible</p>
            </div>

            {/* Badge URL */}
            {src && (
              <div className="px-3 py-1 rounded-full bg-[#0f0f23]/80 border border-[#00d9ff]/10">
                <p className="text-[10px] text-[#6b7280] truncate max-w-[150px]" title={src}>
                  {src.length > 30 ? src.substring(0, 30) + '...' : src}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Type: Icon (simple icône)
    if (fallbackType === 'icon') {
      return (
        <div
          className={`inline-flex items-center justify-center bg-[#0f0f23]/40 rounded-lg ${className ?? ''}`}
          style={style}
        >
          <FallbackIconComponent className="w-8 h-8 text-[#6b7280]" />
        </div>
      );
    }

    // Type: Text (texte simple)
    if (fallbackType === 'text') {
      return (
        <div
          className={`inline-flex items-center justify-center bg-[#0f0f23]/40 rounded-lg px-4 py-2 ${className ?? ''}`}
          style={style}
        >
          <span className="text-xs text-[#6b7280]">{fallbackText}</span>
        </div>
      );
    }

    // Type: Minimal (SVG encodé)
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#0f0f23]/20 rounded-lg ${className ?? ''}`}
        style={style}
      >
        <img
          src={DARK_ERROR_IMG_SRC}
          alt={fallbackText}
          {...rest}
          data-original-url={src}
          className="opacity-50"
        />
      </div>
    );
  }

  // Success State
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

// ========== COMPOSANT SPÉCIFIQUE POUR AVATARS UTILISATEUR ==========
interface UserAvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function UserAvatar({ src, name, size = 'md', className = '' }: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl'
  };

  const colors = ['#00d9ff', '#8b5cf6', '#fbbf24', '#10b981', '#ef4444', '#f97316', '#ec4899', '#6366f1'];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];

  // Initiales
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleError = () => {
    setImgError(true);
    setImgLoading(false);
  };

  const handleLoad = () => {
    setImgLoading(false);
  };

  // Loading
  if (imgLoading && src && !imgError) {
    return (
      <div className={`${sizeMap[size]} rounded-full flex items-center justify-center bg-[#0f0f23]/60 border border-[#00d9ff]/10 ${className}`}>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1/2 h-1/2 rounded-full bg-[#00d9ff]/20"
        />
      </div>
    );
  }

  // Image OK
  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeMap[size]} rounded-full object-cover border-2 border-[#00d9ff]/20 ${className}`}
        onError={handleError}
        onLoad={handleLoad}
      />
    );
  }

  // Fallback: Initiales
  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-bold border-2 border-[#00d9ff]/10 ${className}`}
      style={{
        backgroundColor: `${bgColor}25`,
        color: bgColor
      }}
      title={name}
    >
      {initials}
    </div>
  );
}

// ========== COMPOSANT POUR CARTES/ILLUSTRATIONS ==========
interface AIPlaceholderImageProps {
  width?: number;
  height?: number;
  type?: 'ai' | 'data' | 'security' | 'network' | 'generic';
  className?: string;
}

export function AIPlaceholderImage({ width = 400, height = 300, type = 'ai', className = '' }: AIPlaceholderImageProps) {
  const getPattern = () => {
    switch (type) {
      case 'ai':
        return (
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="300" fill="#0a0a1a" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="#00d9ff" strokeWidth="1" opacity="0.2" />
            <circle cx="200" cy="150" r="50" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="150" r="20" fill="#00d9ff" opacity="0.1" />
            <line x1="100" y1="150" x2="300" y2="150" stroke="#00d9ff" strokeWidth="0.5" opacity="0.1" />
            <line x1="200" y1="50" x2="200" y2="250" stroke="#00d9ff" strokeWidth="0.5" opacity="0.1" />
            <text x="200" y="160" textAnchor="middle" fill="#00d9ff" fontSize="14" fontFamily="monospace" opacity="0.6">AI</text>
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={i}
                cx={Math.random() * 300 + 50}
                cy={Math.random() * 200 + 50}
                r="2"
                fill="#8b5cf6"
                opacity={Math.random() * 0.3 + 0.1}
              />
            ))}
          </svg>
        );
      case 'data':
        return (
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="300" fill="#0a0a1a" />
            {[50, 100, 150, 200, 250, 300].map((x, i) => (
              <rect key={i} x={x} y={80} width="30" height="140" fill="none" stroke="#00d9ff" strokeWidth="1" opacity={0.1 + i * 0.05} rx="2" />
            ))}
            <polyline points="50,200 100,180 150,160 200,150 250,130 300,100 350,120" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.6" />
            <circle cx="200" cy="150" r="4" fill="#00d9ff" opacity="0.8" />
          </svg>
        );
      case 'security':
        return (
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="300" fill="#0a0a1a" />
            <path d="M200 60 L280 90 L280 180 C280 230 200 260 200 260 C200 260 120 230 120 180 L120 90 Z"
              fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.3" />
            <path d="M200 100 L250 115 L250 175 C250 210 200 235 200 235 C200 235 150 210 150 175 L150 115 Z"
              fill="none" stroke="#00d9ff" strokeWidth="1.5" opacity="0.4" />
            <circle cx="200" cy="160" r="8" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.6" />
            <path d="M196 160 L200 165 L208 152" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.8" />
          </svg>
        );
      case 'network':
        return (
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="300" fill="#0a0a1a" />
            {[
              { x: 100, y: 100 }, { x: 300, y: 80 }, { x: 200, y: 200 },
              { x: 80, y: 220 }, { x: 320, y: 200 }
            ].map((point, i) => (
              <React.Fragment key={i}>
                <circle cx={point.x} cy={point.y} r="12" fill="#0a0a1a" stroke="#00d9ff" strokeWidth="1" opacity="0.5" />
                <circle cx={point.x} cy={point.y} r="4" fill="#00d9ff" opacity="0.6" />
              </React.Fragment>
            ))}
            <line x1="100" y1="100" x2="300" y2="80" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
            <line x1="100" y1="100" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
            <line x1="300" y1="80" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
            <line x1="80" y1="220" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
            <line x1="320" y1="200" x2="200" y2="200" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="300" fill="#0a0a1a" />
            <rect x="100" y="80" width="200" height="140" fill="none" stroke="#00d9ff" strokeWidth="1" opacity="0.2" rx="8" />
            <circle cx="200" cy="150" r="30" fill="none" stroke="#8b5cf6" strokeWidth="2" opacity="0.4" />
            <path d="M185 150 L195 160 L215 135" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.6" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ width, height }}>
      {getPattern()}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="text-[10px] text-[#6b7280] bg-[#0a0a1a]/80 px-2 py-1 rounded-full">
          {type === 'ai' ? 'AI Generated' : type === 'data' ? 'Data Visualization' : type === 'security' ? 'Security' : type === 'network' ? 'Network Architecture' : 'Placeholder'}
        </span>
      </div>
    </div>
  );
}