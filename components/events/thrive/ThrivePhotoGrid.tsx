'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ThrivePhoto {
  id: string
  url: string
  thumbnail: string
  caption?: string
  photographer?: string
  category?: string
  width?: number
  height?: number
}

interface ThrivePhotoGridProps {
  photos: ThrivePhoto[]
  onPhotoClick: (photo: ThrivePhoto, index: number) => void
  initialCount?: number
  loadMoreCount?: number
}

export function ThrivePhotoGrid({ 
  photos, 
  onPhotoClick,
  initialCount = 12,
  loadMoreCount = 6 
}: ThrivePhotoGridProps) {
  const [displayCount, setDisplayCount] = useState(initialCount)
  
  const visiblePhotos = photos.slice(0, displayCount)
  const hasMore = displayCount < photos.length

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + loadMoreCount, photos.length))
  }

  // Masonry layout pattern
  const getGridSpan = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-2',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
    ]
    return patterns[index % patterns.length]
  }

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {visiblePhotos.map((photo, index) => (
          <div
            key={photo.id}
            className={cn(
              getGridSpan(index),
              "relative group cursor-pointer overflow-hidden rounded-lg",
              "hover:shadow-xl transition-all duration-300"
            )}
            onClick={() => onPhotoClick(photo, index)}
          >
            <Image
              src={photo.thumbnail || photo.url}
              alt={photo.caption || `Event photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading={index < 4 ? "eager" : "lazy"}
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Caption on hover */}
            {(photo.caption || photo.photographer) && (
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {photo.caption && (
                  <p className="text-sm font-medium mb-1 line-clamp-2">
                    {photo.caption}
                  </p>
                )}
                {photo.photographer && (
                  <p className="text-xs opacity-80">
                    Photo by {photo.photographer}
                  </p>
                )}
              </div>
            )}

            {/* Click indicator */}
            <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Load More / Photo Count */}
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Showing {visiblePhotos.length} of {photos.length} photos
        </p>
        
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-purple-dark hover:bg-purple-mid text-white rounded-lg transition-colors duration-200 font-medium"
          >
            Load More Photos
          </button>
        )}
      </div>
    </div>
  )
}