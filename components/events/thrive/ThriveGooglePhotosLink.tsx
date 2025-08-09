'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, ExternalLink, Upload, Users, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface ThriveGooglePhotosLinkProps {
  albumUrl: string
  totalPhotos?: number
  contributors?: number
}

export function ThriveGooglePhotosLink({ 
  albumUrl, 
  totalPhotos = 200,
  contributors = 15 
}: ThriveGooglePhotosLinkProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-12">
      {/* View Full Album Card */}
      <Card className="border-purple-light hover:border-purple-dark transition-colors duration-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-light/20 rounded-full flex items-center justify-center">
              <ImageIcon className="h-6 w-6 text-purple-dark" />
            </div>
            <CardTitle className="text-xl">View Complete Album</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              {totalPhotos}+ Photos
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {contributors} Contributors
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400">
            Explore the complete collection of photos from THRIVE event, 
            including candid moments, networking sessions, and behind-the-scenes shots.
          </p>
          
          <Button asChild className="w-full bg-purple-dark hover:bg-purple-mid">
            <Link href={albumUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in Google Photos
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Share Your Photos Card */}
      <Card className="border-mint-light hover:border-mint-dark transition-colors duration-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-mint-light/20 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-mint-dark" />
            </div>
            <CardTitle className="text-xl">Share Your Photos</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Were you at THRIVE? We'd love to see your photos! 
            Share your memories with the community by adding them to our collaborative album.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              How to contribute:
            </p>
            <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-4">
              <li>1. Click the button below</li>
              <li>2. Sign in with your Google account</li>
              <li>3. Add your photos to the album</li>
              <li>4. Photos will be reviewed and added</li>
            </ol>
          </div>
          
          <Button asChild variant="outline" className="w-full border-mint-dark text-mint-dark hover:bg-mint-light/20">
            <Link href={albumUrl} target="_blank" rel="noopener noreferrer">
              <Camera className="mr-2 h-4 w-4" />
              Contribute Your Photos
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}