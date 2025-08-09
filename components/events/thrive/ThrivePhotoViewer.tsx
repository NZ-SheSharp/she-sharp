'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, ExternalLink } from 'lucide-react'
import { ThrivePhoto } from './ThrivePhotoGrid'

interface ThrivePhotoViewerProps {
  photo: ThrivePhoto | null
  isOpen: boolean
  onClose: () => void
}

export function ThrivePhotoViewer({ 
  photo, 
  isOpen, 
  onClose 
}: ThrivePhotoViewerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Prevent body scroll when viewer is open
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setImageLoaded(false)
    } else {
      document.body.style.overflow = ''
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !photo) return null

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* View original button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-16 z-50 text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm rounded-full"
        onClick={() => window.open(photo.url, '_blank')}
        title="View full size in new tab"
      >
        <ExternalLink className="h-5 w-5" />
      </Button>

      {/* Main image container - Full screen */}
      <div 
        className="relative w-screen h-screen flex items-center justify-center cursor-pointer"
        onClick={onClose}
      >
        {/* Loading spinner */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/20 border-t-white"></div>
          </div>
        )}
        
        {/* Image wrapper - Prevents click through */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.url}
            alt={photo.caption || 'Event photo'}
            fill
            className="object-contain"
            sizes="100vw"
            quality={95}
            priority
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>
      </div>

      {/* Photo info overlay - Compact and non-intrusive */}
      {(photo.caption || photo.photographer) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 text-white pointer-events-none">
          <div className="max-w-4xl mx-auto">
            {photo.caption && (
              <h3 className="text-base md:text-lg font-medium mb-1 drop-shadow-lg">
                {photo.caption}
              </h3>
            )}
            {photo.photographer && (
              <p className="text-xs md:text-sm opacity-80 drop-shadow-lg">
                Photo by {photo.photographer}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}