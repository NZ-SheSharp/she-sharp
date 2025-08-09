'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X, Download, ExternalLink } from 'lucide-react'
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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white/80 hover:text-white hover:bg-white/10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* View original button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-16 z-50 text-white/80 hover:text-white hover:bg-white/10"
        onClick={() => window.open(photo.url, '_blank')}
        title="View original"
      >
        <ExternalLink className="h-5 w-5" />
      </Button>

      {/* Main image container */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-8 cursor-pointer"
        onClick={onClose}
      >
        <div 
          className="relative max-w-full max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.url}
            alt={photo.caption || 'Event photo'}
            width={1920}
            height={1080}
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            quality={90}
            priority
          />
        </div>
      </div>

      {/* Photo info */}
      {(photo.caption || photo.photographer) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          {photo.caption && (
            <h3 className="text-lg font-medium mb-1">{photo.caption}</h3>
          )}
          {photo.photographer && (
            <p className="text-sm opacity-80">Photo by {photo.photographer}</p>
          )}
        </div>
      )}
    </div>
  )
}