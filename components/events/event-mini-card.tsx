'use client';

import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EventMiniCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image: string;
    type: 'online' | 'in-person' | 'workshop';
    spotsLeft?: number;
    isNew?: boolean;
  };
  className?: string;
}

export function EventMiniCard({ event, className }: EventMiniCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="block group">
      <div className={cn(
        "relative overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-shadow duration-150",
        "border border-periwinkle-light dark:border-periwinkle-dark/30",
        className
      )}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-opacity duration-150"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-navy-dark/20" />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {event.isNew && (
              <Badge className="bg-mint-dark text-navy-dark border-0 text-xs">
                New
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={cn(
                "backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 text-xs",
                event.type === 'online' && "border-blue text-blue",
                event.type === 'in-person' && "border-purple-dark text-purple-dark",
                event.type === 'workshop' && "border-periwinkle-dark text-periwinkle-dark"
              )}
            >
              {event.type === 'online' ? 'Online' : event.type === 'in-person' ? 'In Person' : 'Workshop'}
            </Badge>
          </div>

          {/* Date overlay */}
          <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded px-2 py-1">
            <p className="text-xs font-semibold text-navy-dark dark:text-white">{event.date}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-navy-dark dark:text-white group-hover:text-purple-dark transition-colors line-clamp-2">
            {event.title}
          </h3>

          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-periwinkle-dark" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            {event.spotsLeft !== undefined && (
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-periwinkle-dark" />
                <span className={cn(
                  event.spotsLeft < 10 && "text-error font-medium"
                )}>
                  {event.spotsLeft} spots left
                </span>
              </div>
            )}
          </div>

          {/* Ticket perforation decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-around items-center h-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-white dark:bg-gray-950 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}