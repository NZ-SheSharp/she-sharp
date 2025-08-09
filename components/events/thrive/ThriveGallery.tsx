'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'
import { ThrivePhotoGrid, ThrivePhoto } from './ThrivePhotoGrid'
import { ThrivePhotoViewer } from './ThrivePhotoViewer'
import { ThriveGooglePhotosLink } from './ThriveGooglePhotosLink'

// Mock data - Replace with actual Cloudinary URLs later
const mockPhotos: ThrivePhoto[] = [
  {
    id: 'thrive-1',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Opening Keynote by Kathryn Sandford',
    photographer: 'Event Team',
    category: 'keynote'
  },
  {
    id: 'thrive-2',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Panel Discussion on Industry Resilience',
    photographer: 'Event Team',
    category: 'panel'
  },
  {
    id: 'thrive-3',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Speed Mentoring Session',
    photographer: 'Event Team',
    category: 'mentoring'
  },
  {
    id: 'thrive-4',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Networking and Conversations',
    photographer: 'Event Team',
    category: 'networking'
  },
  {
    id: 'thrive-5',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'CV Review with Industry Experts',
    photographer: 'Event Team',
    category: 'mentoring'
  },
  {
    id: 'thrive-6',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Group Photo with All Participants',
    photographer: 'Event Team',
    category: 'group'
  },
  {
    id: 'thrive-7',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'HPE Venue - Level 19 PWC Tower',
    photographer: 'Event Team',
    category: 'venue'
  },
  {
    id: 'thrive-8',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Registration and Welcome',
    photographer: 'Event Team',
    category: 'registration'
  },
  {
    id: 'thrive-9',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Mentor Certificate Presentation',
    photographer: 'Event Team',
    category: 'ceremony'
  },
  {
    id: 'thrive-10',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Interactive Q&A Session',
    photographer: 'Event Team',
    category: 'panel'
  },
  {
    id: 'thrive-11',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Closing Remarks and Networking',
    photographer: 'Event Team',
    category: 'networking'
  },
  {
    id: 'thrive-12',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'She Sharp and TechBabesNZ Teams',
    photographer: 'Event Team',
    category: 'team'
  },
  {
    id: 'thrive-13',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Attendees Engaged in Discussion',
    photographer: 'Event Team',
    category: 'networking'
  },
  {
    id: 'thrive-14',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Mock Interview Practice',
    photographer: 'Event Team',
    category: 'mentoring'
  },
  {
    id: 'thrive-15',
    url: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    thumbnail: 'https://lxd4dc8r8oetlgua.public.blob.vercel-storage.com/670c6faa065093d7fd557a81_66b08c577a2a3900c4c635f8_GEC23%20%281%29.jpg',
    caption: 'Event Success Celebration',
    photographer: 'Event Team',
    category: 'celebration'
  }
]

interface ThriveGalleryProps {
  googlePhotosUrl?: string
}

export function ThriveGallery({ 
  googlePhotosUrl = 'https://photos.app.goo.gl/uFDurrb7TtarkGS67' 
}: ThriveGalleryProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<ThrivePhoto | null>(null)

  const handlePhotoClick = (photo: ThrivePhoto, index: number) => {
    setSelectedPhoto(photo)
    setViewerOpen(true)
  }

  return (
    <div className="py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <Badge className="mb-4 bg-purple-light/20 text-purple-dark border-purple-light">
          <Sparkles className="h-3 w-3 mr-1" />
          Event Gallery
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-navy-dark dark:text-white mb-4">
          THRIVE Memories
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Relive the inspiring moments from THRIVE: Your Career, Your Story. 
          90 professionals came together for an evening of growth and connection.
        </p>
      </div>

      {/* Photo Grid */}
      <ThrivePhotoGrid 
        photos={mockPhotos}
        onPhotoClick={handlePhotoClick}
        initialCount={12}
        loadMoreCount={6}
      />

      {/* Photo Viewer */}
      <ThrivePhotoViewer
        photo={selectedPhoto}
        isOpen={viewerOpen}
        onClose={() => {
          setViewerOpen(false)
          setSelectedPhoto(null)
        }}
      />

      {/* Google Photos Links */}
      <ThriveGooglePhotosLink
        albumUrl={googlePhotosUrl}
        totalPhotos={200}
        contributors={15}
      />
    </div>
  )
}