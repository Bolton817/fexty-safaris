'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface GalleryGridClientProps {
  images: string[];
}

export default function GalleryGridClient({ images }: GalleryGridClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrevImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(prev => 
      prev === null ? null : (prev === 0 ? images.length - 1 : prev - 1)
    );
  }, [selectedImageIndex, images.length]);

  const showNextImage = useCallback(() => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(prev => 
      prev === null ? null : (prev === images.length - 1 ? 0 : prev + 1)
    );
  }, [selectedImageIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, showPrevImage, showNextImage]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImageIndex]);

  const selectedImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;

  return (
    <div className="w-full">
      {/* Pinterest-Style Masonry Columns */}
      <div className="container mx-auto px-4 max-w-7xl mb-24">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer bg-sand-200 shadow-sm hover:shadow-[0_16px_32px_-8px_rgba(15,98,98,0.18)] transition-all duration-500 ease-out transform hover:-translate-y-1.5 ring-1 ring-black/5 hover:ring-2 hover:ring-sunset-400/50"
            >
              <img
                src={src}
                alt="Gallery photo"
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-104 transition-transform duration-700 ease-out will-change-transform"
              />
              
              {/* Sleek Floating Expand Badge in Corner (no image blur) */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 ease-out">
                <div className="w-10 h-10 rounded-full bg-white/95 text-savanna-950 flex items-center justify-center shadow-lg border border-sand-200/60 hover:bg-sunset-500 hover:text-white transition-colors duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Subtle bottom shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-savanna-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Focused View Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            aria-label="Close view"
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-200 hover:rotate-90 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 left-6 z-50 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-medium tracking-wider">
            {(selectedImageIndex ?? 0) + 1} / {images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-sunset-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl backdrop-blur-sm"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            aria-label="Next photo"
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-sunset-500 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl backdrop-blur-sm"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Focused Image Container */}
          <div 
            className="relative max-w-5xl max-h-[90vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Gallery photo focused view"
              className="max-h-[88vh] max-w-[90vw] w-auto h-auto object-contain rounded-2xl select-none animate-in zoom-in-95 duration-200 shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
