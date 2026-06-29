'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  accentColor?: string;
  primaryColor?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  accentColor  = '#C9A96E',
  primaryColor = '#FAF8F5',
  fill         = true,
  className    = 'object-cover object-center',
  sizes        = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority     = false,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src || src === '') {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3 animate-fade-in"
        style={{ backgroundColor: primaryColor }}
        aria-label={`${alt} — image coming soon`}
      >
        {/* Elegant diamond placeholder */}
        <svg
          width="48" height="48" viewBox="0 0 48 48"
          fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.2 }}
        >
          <path
            d="M24 4L44 24L24 44L4 24L24 4Z"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M24 12L36 24L24 36L12 24L24 12Z"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
          />
        </svg>
        <span
          className="text-xs tracking-widest uppercase font-light"
          style={{ color: accentColor, opacity: 0.35 }}
        >
          {alt}
        </span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={className}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}
